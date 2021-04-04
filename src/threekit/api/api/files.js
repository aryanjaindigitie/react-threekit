import { validate as uuidValidate } from 'uuid';
import { connect } from './connect';
import http from '../http';

export const saveFiles = (files, options) =>
  new Promise((resolve) => {
    //   if (!AUTH_TOKEN && !options?.connection?.authToken) {
    //     console.error('Please connect to threekit');
    //     return resolve(false);
    //   }
    //   if (!AUTH_TOKEN) connect(options.connection);
  });

export const fetchFiles = (fileIds, options) =>
  new Promise(async (resolve) => {
    // if (!AUTH_TOKEN && !options?.connection?.authToken)
    //   return console.log('Please connect to threekit');
    // if (!AUTH_TOKEN) connect(options.connection);

    if (!fileIds?.length) return console.error('no file id(s) provided');

    const fileRequests = (typeof fileIds === 'string' ? [fileIds] : fileIds)
      .filter((id) => {
        if (uuidValidate(id)) return true;
        console.error(`${id} is not a valid uuid`);
        return false;
      })
      .map((id) => http.files.getFile(id));

    if (!fileRequests.length) return console.log('no valid files ids provided');

    const fileRepsonse = await Promise.all(fileRequests);
  });
