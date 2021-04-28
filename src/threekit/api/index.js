import connection from './connection';
import api from './api';
import * as tools from './tools';
import * as controller from './controller';
export * from './api';

export { connection, tools, controller };

export default {
  connection,
  ...api,
  controller,
  tools,
};
