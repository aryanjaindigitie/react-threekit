import http from '../http';
import FormData from 'form-data';
import { dataURItoBlob } from '../utils';

export const save = (data) =>
  new Promise(async (resolve) => {
    let message;
    if (!data) message = 'Requires Data';
    if (message) return [undefined, { message }];

    const blob = typeof data === 'string' ? dataURItoBlob(data) : data;

    const fd = new FormData();
    const file = new File([blob], 'test_image.png');
    fd.append('files', file, 'test_image.png');

    const [fileResponse, error] = await http.files.postFile(fd);
    if (error) resolve([undefined, error]);
    resolve([fileResponse, undefined]);
  });
