import './constants';
import { Command } from 'commander';
import actions from './actions';

const {
  printTranslations,
  downloadTranslations,
  uploadTranslation,
  listLanguages,
  addLanguage,
  removeLanguage,
} = actions.languages;

const program = new Command();

program
  .command('ls')
  .description('List all languages')
  .action(() => listLanguages());

program
  .command('print')
  .description('Prints out the translations')
  .action(() => printTranslations());

program
  .command('download')
  .option('-f, --format <format>', 'File format')
  .option('-p, --path <filepath>', 'Path to download file')
  .description('Download the translations file')
  .action((options) => downloadTranslations(options));

program
  .command('upload')
  .option('-p, --path <filepath>', 'Path to download file')
  .description('Upload a translations file')
  .action((options) => uploadTranslation(options.filepath));

program
  .command('add')
  .option('-n, --name <name>', 'Language Name')
  .option('-s, --shortname <shortname>', 'Two letter language code')
  .description('Add a new language')
  .action(() => addLanguage());

program
  .command('remove [language]')
  .description('remove an existing language')
  .action((language) => removeLanguage(language));

program.parse(process.argv);
