import { threekitRequest } from './utils';

const FILES_API_ROUTE = `/api/files`;

// export const postFile = (file) =>
//   threekitRequest({ method: 'POST', url: FILES_API_ROUTE });

export const getFile = (fileId) => {
  if (!fileId) throw new Error('Requires File ID');
  threekitRequest({
    method: 'GET',
    url: `${FILES_API_ROUTE}/${fileId}`,
  });
};
