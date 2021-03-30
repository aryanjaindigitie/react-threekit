import React from 'react';
import { ThreekitProvider } from '../threekit';
import App from './App';

const threekitConfig = {
  threekitEnv: 'preview',
  orgId: '<ORG ID>', //  Enter your organizations Id
  authToken: '<AUTH TOKEN>', //  Enter the auth token for dev (http://localhost:3000) / production
  assetId: '<ASSET ID>', //  Enter the asseId for the item you wish to initalize the player with
};

const DemoProject = () => {
  return (
    <ThreekitProvider config={threekitConfig}>
      <App />
    </ThreekitProvider>
  );
};

export default DemoProject;
