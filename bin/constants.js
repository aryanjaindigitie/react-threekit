import dotenv from 'dotenv';

dotenv.config();

export const PATHS = {
  base: process.env.THREEKIT_BASE_PATH,
  translations: process.env.THREEKIT_TRANSLATIONS_PATH,
  datatables: process.env.THREEKIT_DATATABLES_PATH,
};

export const ASSET_ID = process.env.THREEKIT_ASSET_ID;
export const ORG_ID = process.env.THREEKIT_ORG_ID;
export const AUTH_TOKEN = process.env.THREEKIT_PRIVATE_TOKEN;
export const THREEKIT_ENV = process.env.THREEKIT_ENV;
