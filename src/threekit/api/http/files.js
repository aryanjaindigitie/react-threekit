import axios from 'axios';
import { getConnection } from '../api/connect';

const FILES_API_ROUTE = `/api/files`;

// export const postFile = (file) => {
//     const connectionObj = getConnection()
//     if (!connectionObj) throw new Error('Please connect to threekit')
//     const url = `${connectionObj.threekitEnv}${FILES_API_ROUTE}`
//     return axios.post(url)
// }

export const getFile = (fileId) => {
  const connectionObj = getConnection();
  if (!connectionObj) throw new Error('Please connect to threekit');
  const url = `${connectionObj.threekitEnv}${FILES_API_ROUTE}/${fileId}`;
  return axios.get(url);
};
