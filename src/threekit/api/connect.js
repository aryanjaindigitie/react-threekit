import { validate as uuidValidate } from 'uuid';

const checkRuntime = new Function(
  'try { return this === window; } catch(e) { return false; }'
);

let AUTH_TOKEN;
let ORG_ID;
let THREEKIT_ENV = 'https://admin.threekit.com';
const IS_SERVER_ENV = !checkRuntime();

export const connect = (config) => {
  const { authToken, orgId, threekitEnv } = config;
  if (!authToken || !uuidValidate(authToken)) {
    throw new Error('requires valid auth token');
  }
  if (!orgId || !uuidValidate(orgId)) {
    throw new Error('requires valid org Id');
  }

  AUTH_TOKEN = authToken;
  ORG_ID = orgId;

  if (threekitEnv?.length)
    THREEKIT_ENV = threekitEnv.startsWith('http')
      ? threekitEnv
      : `https://${threekitEnv}.threekit.com`;
};

export const getConnection = (config) => {
  if (config !== undefined) connect(config);
  if (!AUTH_TOKEN) throw new Error('Connection is missing an Auth Token');
  return {
    authToken: AUTH_TOKEN,
    orgId: ORG_ID,
    threekitEnv: THREEKIT_ENV,
    isServerEnv: IS_SERVER_ENV,
  };
};

export default { connect, getConnection };
