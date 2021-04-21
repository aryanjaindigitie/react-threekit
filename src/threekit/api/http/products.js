import axios from 'axios';
import { getConnection } from '../connect';
import { threekitRequest } from './utils';

const PRODUCTS_API_ROUTE = `/api/products`;

export const downloadAllItems = (orgId) => {
  const connectionObj = getConnection();
  if (!connectionObj) throw new Error('Please connect to threekit');
  if (!orgId && !connectionObj.orgId) throw new Error('Org ID is missing');
  return threekitRequest({
    method: 'GET',
    url: `${PRODUCTS_API_ROUTE}/export/json`,
    params: { orgId: orgId || connectionObj.orgId },
  });
};

export const uploadItems = (formData, orgId) => {
  const connectionObj = getConnection();
  if (!connectionObj) throw new Error('Please connect to threekit');
  if (!orgId && !connectionObj.orgId) throw new Error('Org ID is missing');
  return threekitRequest({
    method: 'POST',
    url: `${PRODUCTS_API_ROUTE}/import`,
    params: { orgId: orgId || connectionObj.orgId },
    data: formData,
    config: {
      headers: {
        'content-type': `multipart/form-data; boundary=${formData._boundary}`,
      },
    },
  });
};

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

export const postTranslations = (data) => {
  if (!data) throw new Error('Requires Translations Data');
  return threekitRequest({
    method: 'POST',
    url: `${PRODUCTS_API_ROUTE}/translations`,
    data,
    config: {
      headers: {
        'content-type': `multipart/form-data; boundary=${data._boundary}`,
      },
    },
  });
};
