#!/usr/bin/env babel-node

import actions from './actions';
import { Command } from 'commander';

const program = new Command();
program.version('0.0.1');

program
  .command('init')
  .description('Setup new project')
  .action(() => actions.init());

program
  .command('demo', 'Work with a demo project')
  .command('languages', 'Languages and translations')
  .command('datatables', 'Datatables Service')
  .command('configurations', 'Configurations Service')
  .command('catalog', 'Catalog Service')
  .parse(process.argv);
