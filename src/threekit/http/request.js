import axios from 'axios';
import connection from '../connection';

const objectToQueryStr = (obj) => {
  if (!obj || !Object.keys(obj).length) return '';
  return Object.entries(obj).reduce((output, [key, val], i) => {
    if (i) output += '&';
    if (val !== undefined) output += `${key}=${val}`;
    return output;
  }, '?');
};

const threekitRequest = (request) => {
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
  else urlPrepped += `${query.length ? `&` : `?`}bearer_token=${authToken}`;

  if (formData)
    configPrepped.headers = Object.assign({}, configPrepped.headers || {}, {
      'content-type': `multipart/form-data; boundary=${formData._boundary}`,
    });

  return new Promise(async (resolve) => {
    let response;
    try {
      switch (method) {
        case 'GET':
        case 'get':
          response = await axios.get(urlPrepped, configPrepped);
          break;
        case 'POST':
        case 'post':
          response = await axios.post(
            urlPrepped,
            formData || data,
            configPrepped
          );
          break;
        case 'put':
        case 'PUT':
          response = await axios.put(
            urlPrepped,
            formData || data,
            configPrepped
          );
          break;
        case 'delete':
        case 'DELETE':
          response = await axios.delete(urlPrepped, configPrepped);
        default:
          return resolve([
            undefined,
            { message: `Unknown request method: ${method}` },
          ]);
      }
      resolve([response.data, undefined]);
    } catch (e) {
      resolve([undefined, e]);
    }
  });
};

export default threekitRequest;
