import api from '../../src/threekit/api';
import chalk from 'chalk';
// import Table from 'cli-table';
import { Select } from 'enquirer';

export const listTags = async () => {
  const tagsData = await api.catalog.fetchTags();
  tagsData.forEach((tag) =>
    console.log(chalk.blue(tag.tags) + chalk.grey(` [${tag.count}]`))
  );
};

export const listItemsByTag = async (tag) => {
  const tagsData = await api.catalog.fetchTags();
  if (!tagsData.length) return console.log(chalk.yellow('No tags found'));

  let tagName = tag;

  if (!tagName) {
    const prompt = new Select({
      name: 'query-by-tag',
      message: 'Which tag would you like to see the Catalog Items for?',
      choices: tagsData.map((tag) => tag.tags),
    });
    tagName = await prompt.run();
  }

  const data = await api.catalog.fetchItemsByTags(tagName);
  data.map((el) => console.log(chalk.blue(el.name)));
};

export const queryByTag = async (tag) => {
  const tagsData = await api.catalog.fetchTags();
  if (!tagsData.length) return console.log(chalk.yellow('No tags found'));

  let tagName = tag;

  if (!tagName) {
    const prompt1 = new Select({
      name: 'query-by-tag',
      message: 'Which tag would you like to see the Catalog Items for?',
      choices: tagsData.map((tag) => tag.tags),
    });
    tagName = await prompt1.run();
  }

  const data = await api.catalog.fetchItemsByTags(tagName);

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
