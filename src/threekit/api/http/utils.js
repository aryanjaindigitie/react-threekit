import axios from 'axios';
import { getConnection } from '../connect';

const objectToQueryStr = (obj) =>
  Object.entries(obj).reduce((output, [key, val], i) => {
    if (i) output += '&';
    if (val !== undefined) output += `${key}=${val}`;
    return output;
  }, '?');

export const threekitRequest = (request) => {
  const { url, method, data, params, config } = Object.assign(
    {
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

  const query = objectToQueryStr({
    bearer_token: connectionObj.authToken,
    ...params,
  });
  const urlPrepped = `${urlRaw}${query}`;

  switch (method) {
    case 'GET':
      return axios.get(urlPrepped, config);
    case 'POST':
      return axios.post(urlPrepped, data, config);
    default:
      return;
  }
};
