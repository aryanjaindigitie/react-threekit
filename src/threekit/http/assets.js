import { threekitRequest } from './utils';
import connection from '../connection';

const ASSETS_API_ROUTE = `/api/assets`;

export const putAsset = (assetId, data) => {
  if (!assetId) throw new Error('Requires Asset ID');
  if (!data) throw new Error('Requires Data');
  const { orgId } = connection.getConnection();
  return threekitRequest({
    method: 'PUT',
    url: `${ASSETS_API_ROUTE}/${assetId}`,
    data: { orgId, ...data },
  });
};

export const deleteAsset = (assetId) => {
  if (!assetId) throw new Error('Requires Asset ID');
  threekitRequest({
    method: 'DELETE',
    url: `${ASSETS_API_ROUTE}/${assetId}`,
    includeOrgId: true,
  });
};

export const getTags = () =>
  threekitRequest({
    method: 'GET',
    url: `${ASSETS_API_ROUTE}/tags`,
    includeOrgId: true,
  });
