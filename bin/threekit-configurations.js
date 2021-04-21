import './constants';
import { Command } from 'commander';
import actions from './actions';

const { listConfigurations, countConfigurations } = actions.configurations;

const program = new Command();

program
  .command('ls')
  .description('Lists all the saved configurations')
  .action(() => listConfigurations());

program
  .command('print [id]')
  .description('Prints a saved configuraiton')
  .action(() => console.log('coming soon'));

program
  .command('count')
  .description('Counts the saved configurations')
  .action(() => countConfigurations());

program.parse(process.argv);
