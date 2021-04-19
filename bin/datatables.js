import api from '../src/threekit/api';
import fs from 'fs';
import chalk from 'chalk';
import Table from 'cli-table';
import { Select, prompt } from 'enquirer';
import { PATHS } from './constants';

export const uploadDatatable = async (config) => {
  const { name, filepath } = Object.assign(
    {
      name: undefined,
      filepath: undefined,
    },
    config
  );

  let filepathPrepped = filepath;

  if (!filepathPrepped) {
    const files = fs.readdirSync(PATHS.datatables);
    const filteredFiles = files.filter(
      (el) => el.includes('.json') || el.includes('csv')
    );

    const select1 = new Select({
      name: 'upload-datatable',
      message: 'Which datatable would you like to upload?',
      choices: filteredFiles,
    });
    const answer1 = await select1.run();
    filepathPrepped = `${PATHS.datatables}/${answer1}`;
  }

  const fileData = fs.readFileSync(filepathPrepped, 'utf8');
  let data;
  let columnInfo;
  let tableName = name;
  const format = filepathPrepped.split('.')[
    filepathPrepped.split('.').length - 1
  ];

  switch (format) {
    case 'json':
      const dataJson = JSON.parse(fileData);
      columnInfo = dataJson.columnInfo;
      if (!tableName) tableName = dataJson.name;
      const columnOrder = dataJson.columnInfo.map((el) => el.name);
      const rowsArr = dataJson.rows.map((row) => {
        return columnOrder.reduce((rowStr, col, i) => {
          if (!!i) rowStr += ',';
          rowStr += row[col] || '';
          return rowStr;
        }, '');
      });

      data = [columnOrder.join(','), ...rowsArr].join(`\n`);
      break;
    case 'csv':
      if (!tableName) {
        tableName = filepathPrepped.replace('.csv', '').split('/')[
          filepathPrepped.split('/').length - 1
        ];
      }
      const rows = fileData.split(`\n`);
      columnInfo = rows.slice(0, 2).reduce((output, row, i) => {
        row.split(',').forEach((el, j) => {
          if (!i) output.push({ name: el, type: undefined });
          else output[j].type = el;
        });

        return output;
      }, []);

      data = [...rows.slice(0, 1), ...rows.slice(2, rows.length)].join(`\n`);
      break;
    default:
      console.log(chalk.red('Unrecognized file format'));
      return;
  }

  try {
    await api.datatables.uploadDatatable({
      name: tableName,
      columnInfo,
      data,
    });
    console.log(chalk.green('Datatable uploaded!'));
  } catch (e) {
    if (e?.response?.data?.message?.includes('already exists')) {
      const select2 = new Select({
        name: 'datatable-exists',
        message: `'${tableName}' already exists. How would you like to proceed?`,
        choices: [
          'Overwrite existing datatable',
          'Upload as new datatable',
          'Cancel',
        ],
      });
      const answer2 = await select2.run();
      switch (answer2) {
        case 'Overwrite existing datatable':
          const list = await api.datatables.fetchList();
          const datatableId = list.find((el) => el.name === tableName).id;
          try {
            await api.datatables.updateDatatable({
              datatableId,
              name: tableName,
              columnInfo,
              data,
            });
            console.log(chalk.green(`'${tableName}' updated.`));
          } catch (e) {
            console.log(e);
          }
          break;
        case 'Upload as new datatable':
          const response = await prompt({
            type: 'input',
            name: 'name',
            message: 'New datatable name?',
          });
          try {
            await api.datatables.uploadDatatable({
              name: response.name,
              columnInfo,
              data,
            });
            console.log(chalk.green(`'${response.name}' created.`));
          } catch (e) {
            console.log(e);
          }
          break;
        case 'Cancel':
        default:
          break;
      }
    }
  }
};

export const listDatatables = async () => {
  const list = await api.datatables.fetchList();

  list.forEach((item) =>
    console.log(`${chalk.blue(item.name)}   ${chalk.grey(item.id)}`)
  );
};

export const downloadDatatable = async (config) => {
  const { name, format } = Object.assign(
    {
      name: undefined,
      format: 'json',
    },
    config
  );
  const list = await api.datatables.fetchList();
  const tablesMap = list.reduce(
    (output, table) => Object.assign(output, { [table.name]: table.id }),
    {}
  );

  let datatableId;
  let message;

  if (!name) message = 'Which datatable would you like to download?';
  else if (!tablesMap[name])
    message = `'${name}' does not exist. Pick another datatable to download...`;

  if (message) {
    const select = new Select({
      name: 'datatables',
      message,
      choices: Object.keys(tablesMap),
    });
    const answer = await select.run();
    datatableId = tablesMap[answer];
  } else {
    datatableId = tablesMap[name];
  }

  let datatableData;
  let filename;

  switch (format) {
    case 'json':
      const dataJSON = await api.datatables.fetchDatatable(datatableId, {
        format: 'json',
      });
      datatableData = JSON.stringify(dataJSON);
      filename = dataJSON.name;
      break;

    case 'csv':
    default:
      const dataCSV = await api.datatables.fetchDatatable(datatableId, {
        format: 'csv',
      });
      datatableData = dataCSV.data;
      filename = dataCSV.name;
      break;
  }

  const filepath = `${PATHS.datatables}/${filename}.${format}`;
  fs.mkdirSync(PATHS.datatables, { recursive: true });
  const writer = fs.createWriteStream(filepath);
  writer.write(datatableData);
  console.log(
    chalk.green(
      `Table '${filename}' was successfully downloaded to ${filepath}`
    )
  );
};

export const printDatatable = async (name) => {
  const list = await api.datatables.fetchList();
  const tablesMap = list.reduce(
    (output, table) => Object.assign(output, { [table.name]: table.id }),
    {}
  );

  let datatableId;
  let message;

  if (!name) message = 'Pick a table to print';
  else if (!tablesMap[name])
    message = `'${name}' does not exist. Pick a table to print`;

  if (message) {
    const select = new Select({
      name: 'datatables',
      message,
      choices: list.map((table) => table.name),
    });
    const answer = await select.run();
    datatableId = tablesMap[answer];
  } else {
    datatableId = tablesMap[name];
  }

  const dataCSV = await api.datatables.fetchDatatable(datatableId, {
    format: 'csv',
  });
  const rows = dataCSV.data.split(`\n`);
  const table = new Table({ head: rows[0].split(',') });
  rows.splice(2, rows.length).forEach((row) => table.push(row.split(',')));
  console.log(table.toString());
};
