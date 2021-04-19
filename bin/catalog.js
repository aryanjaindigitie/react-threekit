import api from '../src/threekit/api';
import chalk from 'chalk';
// import Table from 'cli-table';
import { Select } from 'enquirer';

export const listTags = async () => {
  const tagsData = await api.catalog.fetchTags();
  tagsData.forEach((tag) => console.log(`${tag.tags} (${tag.count})`));
};

export const listItemsByTag = async () => {
  const tagsData = await api.catalog.fetchTags();

  const prompt = new Select({
    name: 'query-by-tag',
    message: 'Which tag would you like to see the Catalog Items for?',
    choices: tagsData.map((tag) => tag.tags),
  });
  const answer = await prompt.run();

  const data = await api.catalog.fetchItemsByTags(answer);
  data.map((el) => console.log(el.name));
};

export const queryByTag = async () => {
  const tagsData = await api.catalog.fetchTags();

  const prompt1 = new Select({
    name: 'query-by-tag',
    message: 'Which tag would you like to see the Catalog Items for?',
    choices: tagsData.map((tag) => tag.tags),
  });
  const answer1 = await prompt1.run();

  const data = await api.catalog.fetchItemsByTags(answer1);

  const prompt2 = new Select({
    name: 'choose-item',
    message: 'Choose an item to see?',
    choices: data.map((el) => el.name),
  });
  const answer2 = await prompt2.run();
  const item = data.find((el) => el.name === answer2);
  Object.entries(item).forEach(([key, value]) => {
    console.log(
      `${chalk.blue(chalk.bold(key + ':'))}  ${
        typeof value === 'object' ? JSON.stringify(value) : value
      }`
    );
  });
};

export const getItemById = async (assetId) => {
  const data = await api.catalog.fetchById(assetId);
  console.log(data);
};
