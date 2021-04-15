module.exports = async () => ({
  bail: 1,
  verbose: true,
  rootDir: './src',
  setupFiles: ['../config/setupTests.js'],
});
