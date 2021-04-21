import fs from 'fs';
import chalk from 'chalk';
import api from '../../src/threekit/api';
import { PATHS } from '../constants';

export const uploadDemoCatalog = async () => {
  const catalog = fs.readFileSync(
    `${PATHS.template}demo-catalog.json`,
    'utf-8'
  );
  const response = await api.catalog.uploadItems(JSON.parse(catalog));
  const demoCatalogItems = response.products.map((el) => el.id);
  fs.writeFileSync(
    `./bin/demo-catalog-ids.json`,
    JSON.stringify(demoCatalogItems)
  );

  await Promise.all(
    demoCatalogItems.map((id) =>
      api.catalog.editItem(id, { publishedAt: new Date().toISOString() })
    )
  );
  console.log(chalk.green('Demo uploaded!'));
};

export const deleteDemoCatalog = async () => {
  const catalog = fs.readFileSync(`./bin/demo-catalog-ids.json`, 'utf-8');
  if (!catalog) return console.log('No catalog ids found');

  await api.catalog.deleteItems(JSON.parse(catalog));

  fs.unlinkSync(`./bin/demo-catalog-ids.json`);
  console.log(chalk.green('Demo cleared!'));
};
