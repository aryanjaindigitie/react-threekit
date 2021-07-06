import React from 'react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { launch } from '../../store/threekit';
import store from '../../store';

import { Provider } from 'react-redux';

import { ThemeProvider } from 'styled-components';
import theme from '../../theme';

const App = (props) => {
  const assetId = props.assetId || process.env.THREEKIT_ASSET_ID;
  const orgId = props.orgId || process.env.THREEKIT_ORG_ID;
  const authToken = props.authToken || process.env.THREEKIT_AUTH_TOKEN;
  const threekitEnv = props.threekitEnv || process.env.THREEKIT_ENV;

  const config = Object.assign(
    {},
    {
      assetId,
      orgId,
      authToken,
      threekitEnv,
    },
    props.config
  );

  const dispatch = useDispatch();
  useEffect(() => {
    (() => dispatch(launch(config)))();
    return;
  }, []);

  return props?.children || null;
};

const ThreekitProvider = (props) => {
  const config = Object.assign(
    {
      theme: {},
      hooks: {},
    },
    props.config
  );
  return (
    <Provider store={store}>
      <ThemeProvider theme={Object.assign(theme, config.theme)}>
        <App config={config}>{props.children}</App>
      </ThemeProvider>
    </Provider>
  );
};

export default ThreekitProvider;
