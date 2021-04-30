import { threekitRequest } from './utils';

const PRODUCTS_API_ROUTE = `/api/products`;

export const getTranslations = () =>
  threekitRequest(`${PRODUCTS_API_ROUTE}/translations`);
