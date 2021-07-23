const configFactory = require('./webpack.prod');
const webpack = require('webpack');

const config = configFactory();
const compiler = webpack(config);

compiler.run(async (err, stats) => {
  let messages;
  if (err) {
    if (!err.message) {
      throw new Error(err);
    }
  }
  console.log('Done!');
});
