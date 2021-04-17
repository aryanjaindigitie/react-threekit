import { threekitRequest } from './utils';

const ORGS_API_ROUTE = `/api/orgs`;

export const getOrgById = (orgId) => {
  if (!orgId) throw new Error('Requires Org ID');
  return threekitRequest(`${ORGS_API_ROUTE}/${orgId}`);
};

export const updateOrgById = (orgId, data) => {
  if (!orgId) throw new Error('Requires Org ID');
  return threekitRequest({
    method: 'PUT',
    url: `${ORGS_API_ROUTE}/${orgId}`,
    data,
  });
};
