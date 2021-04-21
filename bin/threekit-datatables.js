import './constants';
import { Command } from 'commander';
import actions from './actions';

const {
  printDatatable,
  uploadDatatable,
  listDatatables,
  downloadDatatable,
} = actions.datatables;

const program = new Command();

program
  .command('ls')
  .description('List all languages')
  .action(() => listDatatables());

program
  .command('print [tablename]')
  .description('List all the datatables')
  .action((tablename) => printDatatable(tablename));

program
  .command('download [tablename]')
  .option('-f, --format <format>', 'File format')
  .option('-p, --path <filepath>', 'Path to download file')
  .description('Download a datatable')
  .action((tablename, options) => downloadDatatable(tablename, options));

program
  .command('upload')
  .option('-n, --name <tablename>', 'Table name')
  .option('-p, --path <filepath>', 'Path to file to be uploaded')
  .description('Upload a translations file')
  .action((options) => uploadDatatable(options.filepath));

program.parse(process.argv);
