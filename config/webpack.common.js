const paths = require('./paths');

// Common configuration, with extensions in webpack.dev.js and webpack.prod.js.
module.exports = {
  bail: true,
  context: __dirname,
  // entry: ['../src/index.js'],
  // output: {
  //   path: paths.appBuild,
  //   filename: 'threekit-embed.js',
  //   chunkFilename: '[id].js',
  //   publicPath: '',
  // },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  devServer: {
    writeToDisk: true,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        options: {
          babelrc: false,
          presets: ['@babel/preset-env', '@babel/preset-react'],
          plugins: [
            '@babel/plugin-transform-runtime',
            '@babel/plugin-proposal-class-properties',
            ['import', { libraryName: 'antd', style: true }],
          ],
        },
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: [
          { loader: 'style-loader' },
          {
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName: '[name]__[local]___[hash:base64:5]',
              },
            },
          },
        ],
      },
      {
        test: /\.less$/,
        include: /node_modules/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
          },
          {
            loader: 'less-loader',
            options: {
              lessOptions: {
                javascriptEnabled: true,
              },
            },
          },
        ],
      },
      {
        test: /\.(png|jpe?g|gif|webp|svg|ico)$/,
        use: ['file-loader?name=[name].[ext]'],
      },
    ],
  },
  performance: {
    hints: 'warning',
    maxAssetSize: 1024 * 300,
    maxEntrypointSize: 1024 * 300,
  },
  plugins: [],
};
