const fs = require('fs-extra');
const path = require('path');
const paths = require('./paths');
const chalk = require('react-dev-utils/chalk');
const webpack = require('webpack');
const formatWebpackMessages = require('react-dev-utils/formatWebpackMessages');
const FileSizeReporter = require('react-dev-utils/FileSizeReporter');
const printHostingInstructions = require('react-dev-utils/printHostingInstructions');
const printBuildError = require('react-dev-utils/printBuildError');

const configFactory = require('./webpack.prod');

const useYarn = fs.existsSync(paths.yarnLockFile);

// These sizes are pretty large. We'll warn for bundles exceeding them.
const WARN_AFTER_BUNDLE_GZIP_SIZE = 512 * 1024;
const WARN_AFTER_CHUNK_GZIP_SIZE = 1024 * 1024;

const printFileSizesAfterBuild = FileSizeReporter.printFileSizesAfterBuild;
const measureFileSizesBeforeBuild =
  FileSizeReporter.measureFileSizesBeforeBuild;

const argv = process.argv.slice(2);
const compactBuild = argv.indexOf('--compact') !== -1;

console.log('Creating an optimized production build...');

const config = configFactory(compactBuild ? 'compact' : 'default');
const compiler = webpack(config);

function copyPublicFolder() {
  fs.copySync(paths.appPublic, paths.appBuild, {
    dereference: true,
    filter: (file) => file !== paths.appHtml,
  });
}

measureFileSizesBeforeBuild(paths.appBuild).then((previousFileSizes) => {
  fs.emptyDirSync(paths.appBuild);
  copyPublicFolder();

  compiler.run(async (err, stats) => {
    let messages;
    if (err) {
      if (!err.message) {
        throw new Error(err);
      }

      let errMessage = err.message;

      // Add additional information for postcss errors
      if (Object.prototype.hasOwnProperty.call(err, 'postcssNode')) {
        errMessage +=
          '\nCompileError: Begins at CSS selector ' +
          err['postcssNode'].selector;
      }

      messages = formatWebpackMessages({
        errors: [errMessage],
        warnings: [],
      });
    } else {
      const statsJson = stats.toJson({
        all: false,
        warnings: true,
        errors: true,
      });
      messages = formatWebpackMessages({
        errors: statsJson.errors,
        warnings: statsJson.warnings,
      });
    }
    if (messages.errors.length) {
      // Only keep the first error. Others are often indicative
      // of the same problem, but confuse the reader with noise.
      if (messages.errors.length > 1) {
        messages.errors.length = 1;
      }
      throw new Error(messages.errors.join('\n\n'));
    }
    if (
      process.env.CI &&
      (typeof process.env.CI !== 'string' ||
        process.env.CI.toLowerCase() !== 'false') &&
      messages.warnings.length
    ) {
      console.log(
        chalk.yellow(
          '\nTreating warnings as errors because process.env.CI = true.\n' +
            'Most CI servers set it automatically.\n'
        )
      );
      throw new Error(messages.warnings.join('\n\n'));
    }

    if (false)
      fs.writeFileSync(
        paths.appBuild + '/bundle-stats.json',
        JSON.stringify(stats.toJson())
      );

    if (messages.warnings.length) {
      console.log(chalk.yellow('Compiled with warnings.\n'));
      console.log(messages.warnings.join('\n\n'));
      console.log(
        '\nSearch for the ' +
          chalk.underline(chalk.yellow('keywords')) +
          ' to learn more about each warning.'
      );
      console.log(
        'To ignore, add ' +
          chalk.cyan('// eslint-disable-next-line') +
          ' to the line before.\n'
      );
    } else {
      console.log(chalk.green('Compiled successfully.\n'));
    }

    console.log('File sizes after gzip:\n');
    printFileSizesAfterBuild(
      stats,
      previousFileSizes,
      paths.appBuild,
      WARN_AFTER_BUNDLE_GZIP_SIZE,
      WARN_AFTER_CHUNK_GZIP_SIZE
    );
    console.log();

    const appPackage = require(paths.appPackageJson);
    const publicUrl = paths.publicUrlOrPath;
    const publicPath = config.output.publicPath;
    const buildFolder = path.relative(process.cwd(), paths.appBuild);
    printHostingInstructions(
      appPackage,
      publicUrl,
      publicPath,
      buildFolder,
      useYarn
    );
  });
});
