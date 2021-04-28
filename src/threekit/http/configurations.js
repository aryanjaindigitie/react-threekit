import { threekitRequest } from './utils';

const CONFIGURATIONS_API_ROUTE = `/api/configurations`;

export const postConfiguration = (formData) => {
  if (!formData) throw new Error('Requires Form Data');
  return threekitRequest({
    method: 'POST',
    url: CONFIGURATIONS_API_ROUTE,
    formData,
  });
};

export const getSavedConfiguration = (configurationId) => {
  if (!configurationId) throw new Error('Requires Configuration ID');
  return threekitRequest(`${CONFIGURATIONS_API_ROUTE}/${configurationId}`);
};

export const getConfigurations = () =>
  threekitRequest({
    method: 'GET',
    url: `${CONFIGURATIONS_API_ROUTE}`,
    includeOrgId: true,
  });
