import { threekitRequest } from './utils';
import { getConnection } from '../connect';

const ASSETS_API_ROUTE = `/api/assets`;

export const putAsset = (assetId, data, orgId) => {
  const connectionObj = getConnection();
  if (!connectionObj) throw new Error('Please connect to threekit');
  if (!orgId && !connectionObj.orgId) throw new Error('Org ID is missing');
  return threekitRequest({
    method: 'PUT',
    url: `${ASSETS_API_ROUTE}/${assetId}`,
    data: { orgId: orgId || connectionObj.orgId, ...data },
  });
};

export const deleteAsset = (assetId, orgId) => {
  const connectionObj = getConnection();
  if (!connectionObj) throw new Error('Please connect to threekit');
  if (!orgId && !connectionObj.orgId) throw new Error('Org ID is missing');
  return threekitRequest({
    method: 'DELETE',
    url: `${ASSETS_API_ROUTE}/${assetId}`,
    params: { orgId: orgId || connectionObj.orgId },
  });
};

export const getTags = (orgId) => {
  const connectionObj = getConnection();
  if (!connectionObj) throw new Error('Please connect to threekit');
  if (!orgId && !connectionObj.orgId) throw new Error('Org ID is missing');
  return threekitRequest({
    method: 'GET',
    url: `${ASSETS_API_ROUTE}/tags`,
    params: { orgId: orgId || connectionObj.orgId },
  });
};
