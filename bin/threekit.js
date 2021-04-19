#!/usr/bin/env babel-node

import { connect } from '../src/threekit/api';
import {
  printTranslations,
  downloadTranslations,
  uploadTranslation,
  listLanguages,
  addLanguage,
  removeLanguage,
} from './languages';
import {
  printDatatable,
  uploadDatatable,
  listDatatables,
  downloadDatatable,
} from './datatables';
import { printConfigurations, countConfigurations } from './configurations';
import { getItemById, queryByTag, listTags, listItemsByTag } from './catalog';
import init from './init';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import chalk from 'chalk';
import { ASSET_ID, ORG_ID, AUTH_TOKEN, THREEKIT_ENV } from './constants';

connect({
  assetId: ASSET_ID,
  orgId: ORG_ID,
  authToken: AUTH_TOKEN,
  threekitEnv: THREEKIT_ENV,
});

yargs(hideBin(process.argv))
  .scriptName('threekit')
  // .usage('$0 <section> [args]')
  .command({
    command: 'init',
    desc: 'setups up project repo',
    handler: (argv) => {
      init();
    },
  })
  .command({
    command: 'languages cmd [options]',
    desc: 'manage languages and translations',
    builder: (yargs) => {
      yargs
        .positional('cmd', {
          type: 'string',
          describe: 'command',
          choices: ['ls', 'print', 'download', 'upload', 'add', 'remove'],
        })
        .positional('options', {
          type: 'string',
          // describe: 'path to export file',
        })
        .option('p', {
          alias: 'path',
          type: 'string',
          default: undefined,
          describe: 'path to export file',
        })
        .option('f', {
          alias: 'format',
          type: 'string',
          default: 'csv',
          describe: 'output format for file',
          choices: ['csv', 'json'],
        })
        .option('n', {
          alias: 'name',
          type: 'string',
          describe: 'language label',
        })
        .option('s', {
          alias: 'shortname',
          type: 'string',
          describe: 'language shortname identifier',
        });
    },
    handler: (argv) => {
      let filepath = argv.path;

      switch (argv.cmd) {
        case 'ls':
          listLanguages();
          break;
        case 'print':
          printTranslations();
          break;
        case 'download':
          downloadTranslations(filepath, argv.format);
          break;
        case 'upload':
          uploadTranslation(
            filepath + (filepath === './data/translations' ? '.csv' : '')
          );
          break;
        case 'add':
          if (!argv.name?.length || !argv.shortname?.length)
            return console.log(
              chalk.yellow(`Requires a 'name' and 'shortname'.`)
            );
          addLanguage({ label: argv.name, shortname: argv.shortname });
          break;
        case 'remove':
          removeLanguage(argv.options);
        default:
          break;
      }
    },
  })
  .command({
    command: 'datatables <cmd> [options]',
    desc: 'manage datatables',
    builder: (yargs) => {
      yargs
        .positional('cmd', {
          type: 'string',
          describe: 'command',
        })
        .positional('options', {
          type: 'string',
          describe: 'options',
        })
        .option('p', {
          alias: 'path',
          type: 'string',
          describe: 'path to file',
        })
        .option('f', {
          alias: 'format',
          type: 'string',
          default: 'csv',
          describe: 'file format',
        });
    },
    handler: (argv) => {
      switch (argv.cmd) {
        case 'print':
          printDatatable(argv.options);
          break;
        case 'upload':
          uploadDatatable({ name: argv.options, filepath: argv.path });
          break;
        case 'download':
          downloadDatatable({ name: argv.options, format: argv.format });
          break;
        case 'ls':
          listDatatables();
          break;
        default:
          break;
      }
    },
  })
  .command({
    command: 'configurations <cmd> [options]',
    desc: 'manage saved configurations',
    builder: (yargs) => {
      yargs
        .positional('cmd', {
          type: 'string',
          describe: 'command',
        })
        .positional('options', {
          type: 'string',
          describe: 'options',
        });
    },
    handler: (argv) => {
      switch (argv.cmd) {
        case 'print':
          printConfigurations(argv.options);
        case 'count':
          countConfigurations();
          break;
        default:
          break;
      }
    },
  })
  .command({
    command: 'catalog <cmd> [options]',
    desc: 'manage your catalog',
    builder: (yargs) => {
      yargs.positional('cmd', {
        type: 'string',
        describe: 'command',
      });
      yargs.positional('options', {
        type: 'string',
        describe: 'Catalog id of item to get',
      });
    },
    handler: (argv) => {
      switch (argv.cmd) {
        case 'get':
          // getItemById(argv.options);
          console.log(chalk.yellow('Feature coming soon.'));
          break;
        case 'tags':
          switch (argv.options) {
            case 'ls':
              listTags();
              break;
            case 'items':
              listItemsByTag();
              break;
            case 'query':
              queryByTag();
              break;
            default:
              break;
          }
          break;
        default:
          break;
      }
    },
  })
  .help().argv;
