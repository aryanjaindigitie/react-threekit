import api from '../../src/threekit/api';
import chalk from 'chalk';
import Table from 'cli-table';

export const listConfigurations = async () => {
  const configurations = await api.configurations.fetchAll();

  const table = new Table({
    head: ['Short ID', 'Created At', 'Metadata'],
  });
  configurations.forEach((el) => {
    table.push([el.shortId, el.createdAt, JSON.stringify(el.metadata)]);
  });
  console.log(table.toString());
};

export const countConfigurations = async () => {
  const configurations = await api.configurations.fetchAll();
  console.log(`Total Configurations: ` + chalk.blue(configurations.length));
};
