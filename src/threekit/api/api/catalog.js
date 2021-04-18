import http from '../http';

export const fetchTags = () =>
  new Promise(async (resolve) => {
    const response = await http.assets.getTags();
    resolve(response.data.tags);
  });

export const fetchItemsByTags = (tag) =>
  new Promise(async (resolve) => {
    const response = await http.catalog.getItemsByTag(tag);
    resolve(response.data.products);
  });

export const fetchById = (id) =>
  new Promise(async (resolve) => {
    const response = await http.catalog.getItemById(id);
    resolve(response.data);
  });
