import { threekitRequest } from './utils';

const CATALOG_API_ROUTE = `/api/catalog/products`;

export const getAllItems = () => threekitRequest(CATALOG_API_ROUTE);

export const getItemById = (catalogId) =>
  threekitRequest(`${CATALOG_API_ROUTE}/${catalogId}`);
