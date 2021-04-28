import http from '../http';

export const fetchOrg = () =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await http.orgs.getOrg();
      if (response.status !== 200) return reject(response.data);
      resolve(response.data);
    } catch (e) {
      reject(e);
    }
  });

export const updateOrg = (data) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await http.orgs.putOrg(data);
      if (response.status !== 200) return reject(response.data);
      resolve(response.data);
    } catch (e) {
      reject(e);
    }
  });
