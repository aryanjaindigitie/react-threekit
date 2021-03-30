import React from 'react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { launch } from '../../store/threekit';
import store from '../../store';

import { Provider } from 'react-redux';

const Loader = (props) => {
  const dispatch = useDispatch();
  useEffect(() => {
    (() => dispatch(launch(props.config)))();
    return;
  }, []);

  return props?.children || null;
};

const ThreekitProvider = (props) => {
  return (
    <Provider store={store}>
      <Loader config={props.config}>{props.children}</Loader>
    </Provider>
  );
};

export default ThreekitProvider;
