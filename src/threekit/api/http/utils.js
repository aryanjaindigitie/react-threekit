import axios from 'axios';
import { getConnection } from '../connect';

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
  const { url, authToken, method, data, params, config } = Object.assign(
    {
      authToken: undefined,
      method: 'GET',
      params: {},
      config: undefined,
    },
    typeof request === 'string' ? { url: request } : request
  );

  const connectionObj = getConnection();
  if (!connectionObj) throw new Error('Please connect to threekit');

  const urlRaw = url.startsWith('http')
    ? url
    : `${connectionObj.threekitEnv}${url}`;

  const token = authToken || connectionObj.authToken;

  const query = objectToQueryStr(params);
  let urlPrepped = `${urlRaw}${query}`;
  let configPrepped = { ...config };

  if (connectionObj.isServerEnv)
    configPrepped.headers = Object.assign({}, configPrepped.headers || {}, {
      authorization: `Bearer ${token}`,
    });
  else urlPrepped += (query.length ? `&` : `?`) + `bearer_token=${token}`;

  switch (method) {
    case 'GET':
    case 'get':
      return axios.get(urlPrepped, configPrepped);
    case 'POST':
    case 'post':
      return axios.post(urlPrepped, data, configPrepped);
    case 'put':
    case 'PUT':
      return axios.put(urlPrepped, data, configPrepped);
    case 'delete':
    case 'DELETE':
      return axios.delete(urlPrepped, configPrepped);
    default:
      return;
  }
};
