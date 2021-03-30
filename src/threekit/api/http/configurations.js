import axios from 'axios';
import { getConnection } from '../api/connect';

const CONFIGURATIONS_API_ROUTE = `/api/configurations`;

export const postConfiguration = (data) => {
  const connectionObj = getConnection();
  if (!connectionObj) throw new Error('Please connect to threekit');
  const url = `${connectionObj.threekitEnv}${CONFIGURATIONS_API_ROUTE}?bearer_token=${connectionObj.authToken}`;
  return axios.post(url, data, {
    headers: {
      'content-type': `multipart/form-data; boundary=${data._boundary}`,
    },
  });
};

export const getSavedConfiguration = (configurationId) => {
  const connectionObj = getConnection();
  if (!connectionObj) throw new Error('Please connect to threekit');
  const url = `${connectionObj.threekitEnv}${CONFIGURATIONS_API_ROUTE}/${configurationId}?bearer_token=${connectionObj.authToken}`;
  return axios.get(url);
};
