import { threekitRequest } from './utils';

const CONFIGURATIONS_API_ROUTE = `/api/configurations`;

export const postConfiguration = (formData) =>
  threekitRequest({
    method: 'POST',
    url: CONFIGURATIONS_API_ROUTE,
    data: formData,
    config: {
      headers: {
        'content-type': `multipart/form-data; boundary=${formData._boundary}`,
      },
    },
  });

export const getSavedConfiguration = (configurationId) =>
  threekitRequest(`${CONFIGURATIONS_API_ROUTE}/${configurationId}`);
