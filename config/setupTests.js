import 'core-js/stable';
import 'regenerator-runtime/runtime';
import { connect } from '../src/threekit/api/connect';
import dotenv from 'dotenv';
dotenv.config({ path: '.env.test' });

connect({
  assetId: process.env.THREEKIT_ASSET_ID,
  orgId: process.env.THREEKIT_ORG_ID,
  authToken: process.env.THREEKIT_AUTH_TOKEN,
  threekitEnv: process.env.THREEKIT_ENV,
});
