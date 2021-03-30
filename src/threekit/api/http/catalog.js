import axios from 'axios';
import { getConnection } from '../api/connect';

const CATALOG_API_ROUTE = `/api/catalog/products`;

export const getAllItems = () => {
  const connectionObj = getConnection();
  if (!connectionObj) throw new Error('Please connect to threekit');
  const url = `${connectionObj.threekitEnv}${CATALOG_API_ROUTE}?bearer_token=${connectionObj.authToken}`;
  return axios.get(url);
};

export const getItemById = (catalogId) => {
  const connectionObj = getConnection();
  if (!connectionObj) throw new Error('Please connect to threekit');
  const url = `${connectionObj.threekitEnv}${CATALOG_API_ROUTE}/${catalogId}?bearer_token=${connectionObj.authToken}`;
  return axios.get(url);
};
