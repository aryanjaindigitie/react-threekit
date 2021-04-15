import React from 'react';
import { ThreekitProvider } from '../threekit';
import App from './App';

const threekitConfig = {
  threekitEnv: process.env.THREEKIT_ENV || 'admin-fts',
  orgId: process.env.THREEKIT_ORG_ID, //  Enter your organizations Id
  authToken: process.env.THREEKIT_AUTH_TOKEN, //  Enter the auth token for dev (http://localhost:3000) / production
  assetId: process.env.THREEKIT_ASSET_ID, //  Enter the asseId for the item you wish to initalize the player with
};

const DemoProject = () => {
  return (
    <ThreekitProvider config={threekitConfig}>
      <App />
    </ThreekitProvider>
  );
};

export default DemoProject;
