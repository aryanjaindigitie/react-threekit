import http from '../http';
import { validate as uuidValidate } from 'uuid';
import FormData from 'form-data';

export const save = ({
  assetId,
  customerId,
  configuration,
  metadata,
  productVersion,
  thumbnail,
}) =>
  new Promise(async (resolve) => {
    if (!assetId || !uuidValidate(assetId) || !configuration) {
      console.error('no asset Id / configuration');
      return resolve(false);
    }
    const fd = new FormData();
    fd.append('productId', assetId);
    fd.append('variant', JSON.stringify(configuration));
    fd.append('productVersion', productVersion);
    if (metadata && Object.keys(metadata))
      fd.append('metadata', JSON.stringify(metadata));
    if (customerId) fd.append('customerId', customerId);
    if (thumbnail) fd.append('thumbnail', thumbnail);

    try {
      const response = await http.configurations.postConfiguration(fd);
      if (response.status !== 200) {
        console.error('something went wrong with the product rest request');
        console.error(response.data);
        return resolve(false);
      }
      resolve(response.data);
    } catch (err) {
      console.error(err);
      resolve(false);
    }
  });

export const fetch = (configurationId) =>
  new Promise(async (resolve, reject) => {
    if (!configurationId || !uuidValidate(configurationId)) {
      console.error('no asset Id / configuration');
      reject();
    }

    try {
      const response = await http.configurations.getSavedConfiguration(
        configurationId
      );
      if (response.status !== 200) {
        console.error('something went wrong with the product rest request');
        console.error(response.data);
        reject();
      }
      resolve(response.data);
    } catch (err) {
      console.error(err);
      reject();
    }
  });
