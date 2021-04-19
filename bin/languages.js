import api from '../src/threekit/api';
import fs from 'fs';
import chalk from 'chalk';
import Table from 'cli-table';
import { Select } from 'enquirer';
import { PATHS } from './constants';

export const downloadTranslations = async (filePath, format = 'csv') => {
  let output;

  switch (format) {
    case 'json':
      const translation = await api.products.fetchTranslations('json');
      output = JSON.stringify(translation);
      break;
    case 'csv':
    default:
      output = await api.products.fetchTranslations('csv');
      break;
  }

  const filepath = filePath || `${PATHS.translations}/translations.${format}`;
  let dir = !filePath
    ? PATHS.translations
    : filepath
        .split('/')
        .slice(0, filepath.split('/').length - 1)
        .join('/');
  console.log(dir);
  fs.mkdirSync(dir, { recursive: true });
  const writer = fs.createWriteStream(filepath);
  writer.write(output);
  console.log(chalk.green(`Translation downloaded to location: ${filepath}`));
};

export const printTranslations = async () => {
  const trasnlationsCSV = await api.products.fetchTranslations('csv');

  const rows = trasnlationsCSV.split(`\n`);

  const table = new Table({
    head: rows[0].split(',').map((el) => el.substr(1, el.length - 2)),
  });
  rows
    .slice(1, rows.length)
    .forEach((row) =>
      table.push(row.split(',').map((el) => el.substr(1, el.length - 2)))
    );
  console.log(table.toString());
};

export const uploadTranslation = async (filePath) => {
  // const filename = filePath.split('/')[filePath.split('/').length - 1];
  // const fileFormat = filename.split('.')[filename.split('.').length - 1];
  const data = fs.readFileSync(filePath, 'utf8');
  api.products.uploadTranslation(data);
};

export const listLanguages = async () => {
  const { languages } = await api.orgs.fetchOrg();

  languages.values.forEach((language) =>
    console.log(
      `${language.value === languages.defaultValue ? '* ' : '  '}${
        language.label
      } ${chalk.grey(`[${language.value}]`)}`
    )
  );
};

export const addLanguage = async ({ label, shortname }) => {
  const { id, name, languages } = await api.orgs.fetchOrg();

  const shortnameExists = languages.values.find(
    (language) => language.value === shortname
  );
  if (shortnameExists)
    return console.log(
      chalk.red(`Shortname: '${shortname}' already exists. \n`)
    );

  const preppedLanguage = {
    ...languages,
    values: [...languages.values, { label, value: shortname }],
  };

  await api.orgs.updateOrg({
    id,
    name,
    languages: preppedLanguage,
  });
  console.log(chalk.green(`Language added! \n`));
};

export const removeLanguage = async (languageId) => {
  const { id, name, languages } = await api.orgs.fetchOrg();

  let lang = languageId;

  if (!lang) {
    const prompt = new Select({
      name: 'remove-language',
      message: 'Which language would you like to remove?',
      choices: languages.values.map(
        (table) => `${table.label} [${table.value}]`
      ),
    });
    const answer = await prompt.run();
    lang = answer.split(' [')[1].replace(']', '');
  }

  const languageList = languages.values.filter(
    (language) => !Object.values(language).includes(lang)
  );

  const preppedLanguage = {
    ...languages,
    values: languageList,
  };

  await api.orgs.updateOrg({
    id,
    name,
    languages: preppedLanguage,
  });
  console.log(chalk.green(`${lang} has been removed! \n`));
};
