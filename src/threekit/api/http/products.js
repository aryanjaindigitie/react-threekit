import axios from 'axios';
import { getConnection } from '../connect';
import { threekitRequest } from './utils';

const PRODUCTS_API_ROUTE = `/api/products`;

export const getAllItems = () => {
  const connectionObj = getConnection();
  if (!connectionObj) throw new Error('Please connect to threekit');
  const url = `${
    connectionObj.threekitEnv
  }${PRODUCTS_API_ROUTE}/export/${'json'}`;
  return axios.get(url, {
    headers: {
      authorization: `Bearer ${connectionObj.authToken}`,
    },
  });
};

export const getItemById = (itemId) => {
  const connectionObj = getConnection();
  if (!connectionObj) throw new Error('Please connect to threekit');
  // return axios.get()
};

export const populateItems = (data) => {
  const connectionObj = getConnection();
  if (!connectionObj) throw new Error('Please connect to threekit');
  const url = `${connectionObj.threekitEnv}${PRODUCTS_API_ROUTE}/import?orgId=${connectionObj.orgId}`;
  return axios({
    method: 'post',
    data,
    url,
    maxContentLength: Infinity,
    maxBodyLength: Infinity,
    headers: {
      'content-type': `multipart/form-data; boundary=${data._boundary}`,
      authorization: `Bearer ${connectionObj.authToken}`,
    },
  });
};

export const getTranslations = () =>
  threekitRequest(`${PRODUCTS_API_ROUTE}/translations`);
