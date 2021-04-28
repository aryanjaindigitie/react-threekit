import http from '../http';
import FormData from 'form-data';

export const downloadAll = () =>
  new Promise(async (resolve) => {
    const response = await http.products.downloadAllItems();
    resolve(response.data);
  });

export const uploadItems = (items) =>
  new Promise(async (resolve) => {
    const form = new FormData();
    form.append('file', Buffer.from(JSON.stringify(items)), {
      filename: 'products-upload.json',
    });
    const response = await http.products.uploadItems(form);
    resolve(response.data);
  });

export const editItem = (assetId, data) =>
  new Promise(async (resolve) => {
    const response = await http.assets.putAsset(assetId, data);
    resolve(response.data);
  });

export const deleteItems = (assetIds) =>
  new Promise(async (resolve) => {
    if (!assetIds?.length) resolve();
    const assets = Array.isArray(assetIds) ? assetIds : [assetIds];
    await Promise.all(assets.map((id) => http.assets.deleteAsset(id)));
    resolve();
  });

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
