import { threekitRequest } from './utils';

const PRODUCTS_API_ROUTE = `/api/products`;

export const downloadAllItems = () =>
  threekitRequest({
    method: 'GET',
    url: `${PRODUCTS_API_ROUTE}/export/json`,
    includeOrgId: true,
  });

export const uploadItems = (formData) =>
  threekitRequest({
    method: 'POST',
    url: `${PRODUCTS_API_ROUTE}/import`,
    formData,
    includeOrgId: true,
  });

export const getAllItems = () =>
  threekitRequest(`${PRODUCTS_API_ROUTE}/export/${'json'}`);

export const getItemById = (itemId) => {};

export const populateItems = (formData) => {
  if (!formData) throw new Error('Requires items FormData');
  return threekitRequest({
    method: 'POST',
    url: `${PRODUCTS_API_ROUTE}/import`,
    formData,
    includeOrgId: true,
  });
};

export const getTranslations = () =>
  threekitRequest(`${PRODUCTS_API_ROUTE}/translations`);

export const postTranslations = (formData) => {
  if (!formData) throw new Error('Requires Translations FormData');
  return threekitRequest({
    method: 'POST',
    url: `${PRODUCTS_API_ROUTE}/translations`,
    formData,
    includeOrgId: true,
  });
};
