import { threekitRequest } from './utils';
import { getConnection } from '../connect';

const ASSETS_API_ROUTE = `/api/assets/tags`;

export const getTags = (orgId) => {
  const connectionObj = getConnection();
  if (!connectionObj) throw new Error('Please connect to threekit');
  if (!orgId && !connectionObj.orgId) throw new Error('Org ID is missing');
  return threekitRequest({
    method: 'GET',
    url: ASSETS_API_ROUTE,
    params: { orgId: orgId || connectionObj.orgId },
  });
};
