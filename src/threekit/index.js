import connection from './connection';
import api from './api';
import { hooks, components } from './react';
import * as tools from './tools';
import http from './http';

const { ThreekitProvider } = components;

export { connection, api, hooks, components, ThreekitProvider, tools };

export default {
  connection,
  api,
  hooks,
  components,
  ThreekitProvider,
  tools,
  http,
};
