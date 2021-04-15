// import axios from 'axios';
// import { getConnection } from '../api/connect';
import { threekitRequest } from './utils';

const FILES_API_ROUTE = `/api/files`;

// export const postFile = (file) =>
//   threekitRequest({ method: 'POST', url: FILES_API_ROUTE });

export const getFile = (fileId) =>
  threekitRequest({
    method: 'GET',
    url: `${FILES_API_ROUTE}/${fileId}`,
    params: { bearer_token: undefined },
  });
