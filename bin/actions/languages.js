import api from '../../src/threekit/api';
import fs from 'fs';
import chalk from 'chalk';
import Table from 'cli-table';
import { Select } from 'enquirer';
import { PATHS } from '../constants';

const DEFAULT_FILE = `${PATHS.translations}/translations`;

export const downloadTranslations = async (config) => {
  let { format, filepath } = Object.assign(
    {
      format: 'csv',
      filepath: DEFAULT_FILE,
    },
    config
  );

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

  if (!config.filepath) filepath += `.${format}`;
  let dir = !config.filepath
    ? PATHS.translations
    : filepath
        .split('/')
        .slice(0, filepath.split('/').length - 1)
        .join('/');

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

export const uploadTranslation = async (customFilepath) => {
  const formats = ['json', 'csv'];
  let filepath = customFilepath;
  let format = customFilepath?.split('.')[customFilepath.split('.').length - 1];

  if (!filepath)
    for (let i = 0; !filepath && i < formats.length; i++) {
      const testPath = `${DEFAULT_FILE}.${formats[i]}`;
      const fileExists = fs.existsSync(testPath);
      if (!fileExists) continue;
      format = formats[i];
      filepath = testPath;
    }

  if (!filepath) return console.log(chalk.red('No translations file found.'));

  const file = fs.readFileSync(filepath, 'utf-8');

  switch (format) {
    case 'csv':
      api.products.uploadTranslation(file);
      break;
    case 'json':
      break;
    default:
      return console.log(chalk.red('Unknown file format.'));
  }

  console.log(chalk.green('Language file successfully uploaded!'));
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
