import connection from './connect';
import api from './api';
import * as tools from './tools';
import * as controller from './controller';
export * from './api';

const { connect } = connection;

export { connect, tools, controller };

export default { connect, ...api, controller, tools };
