import './constants';
import { Command } from 'commander';
import chalk from 'chalk';
import actions from './actions';

const { queryByTag, listTags, listItemsByTag } = actions.catalog;

const program = new Command();

program
  .command('tags [command] [query]')
  .description('Lists all the tags')
  .action((command, query) => {
    switch (command) {
      case 'ls':
      case undefined:
        listTags();
        break;
      case 'items':
        listItemsByTag(query);
        break;
      case 'query':
        queryByTag(query);
        break;
      default:
        return console.log(
          chalk.yellow(
            `error: unknown command '${command}'. See 'threekit catalog tags --help'.`
          )
        );
    }
  });

program.parse(process.argv);
