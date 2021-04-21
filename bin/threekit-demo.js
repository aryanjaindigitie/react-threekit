import './constants';
import { Command } from 'commander';
import actions from './actions';

const { uploadDemoCatalog, deleteDemoCatalog } = actions.demo;

const program = new Command();

program
  .command('init')
  .description('Sets up a demo project')
  .action(() => uploadDemoCatalog());

program
  .command('delete')
  .description('Deletes a demo Project')
  .action(() => deleteDemoCatalog());

program.parse(process.argv);
