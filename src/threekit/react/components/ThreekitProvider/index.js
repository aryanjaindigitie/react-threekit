import React from 'react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { launch } from '../../store/threekit';
import store from '../../store';

import { Provider } from 'react-redux';

import { ThemeProvider } from 'styled-components';
import theme from '../../theme';

const Loader = (props) => {
  const assetId = props.assetId || process.env.THREEKIT_ASSET_ID;
  const orgId = props.orgId || process.env.THREEKIT_ORG_ID;
  const authToken = props.authToken || process.env.THREEKIT_AUTH_TOKEN;
  const threekitEnv = props.threekitEnv || process.env.THREEKIT_ENV;

  const config = Object.assign({}, props.config, {
    assetId,
    orgId,
    authToken,
    threekitEnv,
  });

  const dispatch = useDispatch();
  useEffect(() => {
    (() => dispatch(launch(config)))();
    return;
  }, []);

  return props?.children || null;
};

const ThreekitProvider = (props) => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={Object.assign(theme, props?.config?.theme)}>
        <Loader config={props.config}>{props.children}</Loader>
      </ThemeProvider>
    </Provider>
  );
};

export default ThreekitProvider;
