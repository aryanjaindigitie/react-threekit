import axios from 'axios';
import connection from '../connection';

export const objectToQueryStr = (obj) => {
  if (!obj || !Object.keys(obj).length) return '';
  return Object.entries(obj).reduce((output, [key, val], i) => {
    if (i) output += '&';
    if (val !== undefined) output += `${key}=${val}`;
    return output;
  }, '?');
};

export const threekitRequest = (request) => {
  if (!request) throw new Error('Request missing');
  const {
    url,
    method,
    data,
    formData,
    params,
    config,
    includeOrgId,
  } = Object.assign(
    {
      method: 'GET',
      params: {},
      includeOrgId: false,
    },
    typeof request === 'string' ? { url: request } : request
  );

  const {
    authToken,
    orgId,
    threekitEnv,
    isServerEnv,
  } = connection.getConnection();

  const urlRaw = `${threekitEnv}${url}`;

  const query = objectToQueryStr(
    Object.assign({}, includeOrgId ? { orgId } : {}, params)
  );
  let urlPrepped = `${urlRaw}${query}`;
  let configPrepped = { ...config };

  if (isServerEnv)
    configPrepped.headers = Object.assign({}, configPrepped.headers || {}, {
      authorization: `Bearer ${authToken}`,
    });
  if (formData)
    configPrepped.headers = Object.assign({}, configPrepped.headers || {}, {
      'content-type': `multipart/form-data; boundary=${formData._boundary}`,
    });
  else urlPrepped += `${query.length ? `&` : `?`}bearer_token=${authToken}`;

  switch (method) {
    case 'GET':
    case 'get':
      return axios.get(urlPrepped, configPrepped);
    case 'POST':
    case 'post':
      return axios.post(urlPrepped, formData || data, configPrepped);
    case 'put':
    case 'PUT':
      return axios.put(urlPrepped, formData || data, configPrepped);
    case 'delete':
    case 'DELETE':
      return axios.delete(urlPrepped, configPrepped);
    default:
      return;
  }
};
