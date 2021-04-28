import dotenv from 'dotenv';
import { connection } from '../src/threekit/api';

dotenv.config();

export const PATHS = {
  base: process.env.THREEKIT_BASE_PATH,
  translations: process.env.THREEKIT_TRANSLATIONS_PATH,
  datatables: process.env.THREEKIT_DATATABLES_PATH,
  //  init.js + demo.js
  packageJson: './package.json',
  indexHtml: './public/index.html',
  env: './.env',
  template: './bin/template/',
};

export const ASSET_ID = process.env.THREEKIT_ASSET_ID;
export const ORG_ID = process.env.THREEKIT_ORG_ID;
export const AUTH_TOKEN = process.env.THREEKIT_PRIVATE_TOKEN;
export const THREEKIT_ENV = process.env.THREEKIT_ENV;

if (AUTH_TOKEN)
  connection.connect({
    assetId: ASSET_ID,
    orgId: ORG_ID,
    authToken: AUTH_TOKEN,
    threekitEnv: THREEKIT_ENV,
  });
