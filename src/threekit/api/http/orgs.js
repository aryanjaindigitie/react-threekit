import connection from '../connection';
import { threekitRequest } from './utils';

const ORGS_API_ROUTE = `/api/orgs`;

export const getOrg = () => {
  const { orgId } = connection.getConnection();
  return threekitRequest(`${ORGS_API_ROUTE}/${orgId}`);
};

export const putOrg = (data) => {
  const { orgId } = connection.getConnection();
  return threekitRequest({
    method: 'PUT',
    url: `${ORGS_API_ROUTE}/${orgId}`,
    data,
  });
};
