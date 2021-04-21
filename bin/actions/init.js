import api from '../../src/threekit/api';
import { prompt } from 'enquirer';
import fs from 'fs';
import chalk from 'chalk';
import dotenv from 'dotenv';
import { PATHS } from '../constants';

const attributesMap = {
  Asset: 'RadioButtons',
};

const createComponentType = {
  Asset: (attributeName) =>
    `        <RadioButtons attribute="${attributeName}" showAttributeTitle />`,
};

const createImportStatement = (attributes) => {
  const components = attributes.reduce((output, attr) => {
    output.add(attributesMap[attr.type]);
    return output;
  }, new Set([]));

  return `const { ${[...components].join(', ')} } = components`;
};

const updatePackageJson = (name) => {
  const packageJsonStr = fs.readFileSync(PATHS.packageJson, 'utf-8');
  const packageJson = JSON.parse(packageJsonStr);
  if (packageJson.name !== 'threekit-react-development-kit')
    packageJson.name = name;
  fs.writeFileSync(PATHS.packageJson, JSON.stringify(packageJson));
};

const updateIndexHtml = (name) => {
  const indexHtml = fs.readFileSync(PATHS.indexHtml, 'utf-8');
  const updated = indexHtml.replace('Threekit React Development Kit', name);
  fs.writeFileSync(PATHS.indexHtml, updated);
};

const createProjectDir = (projectFolder) =>
  fs.mkdirSync(projectFolder, {
    recursive: true,
  });

const createIndexJs = (projectFolder) => {
  createProjectDir(projectFolder);
  const fileExists = fs.existsSync(`${projectFolder}/index.js`);
  if (fileExists) return;
  fs.copyFileSync(`${PATHS.template}/index.js`, `${projectFolder}/index.js`);
};

const createAppJs = async (projectFolder, product) => {
  createProjectDir(projectFolder);
  const fileExists = fs.existsSync(`${projectFolder}/App.js`);
  if (fileExists) return console.log(chalk.yellow('File already exists'));
  const appJs = fs.readFileSync(`${PATHS.template}/App.js`, 'utf-8');
  const importComponents = createImportStatement(product.attributes);

  const components = product.attributes
    .map((attr) => createComponentType[attr.type](attr.name))
    .join(`\n`);

  let preppedAppJs = appJs.replace('/* import components */', importComponents);
  preppedAppJs = preppedAppJs.replace(
    `{/* components */}`,
    `\n${components}\n      `
  );
  fs.writeFileSync(`${projectFolder}/App.js`, preppedAppJs);
};

const updateEnv = (project) => {
  const envFile = fs.existsSync(PATHS.env);
  if (!envFile) {
    const envTemplate = fs.readFileSync(
      `${PATHS.template}.env.template`,
      'utf-8'
    );
    let prepped = envTemplate.replace(
      'THREEKIT_ENV=',
      `THREEKIT_ENV=${project.threekitEnv}`
    );
    prepped = prepped.replace(
      'THREEKIT_ORG_ID=',
      `THREEKIT_ORG_ID=${project.orgId}`
    );
    prepped = prepped.replace(
      'THREEKIT_AUTH_TOKEN=',
      `THREEKIT_AUTH_TOKEN=${project.authToken}`
    );
    prepped = prepped.replace(
      'THREEKIT_ASSET_ID=',
      `THREEKIT_ASSET_ID=${project.assetId}`
    );
    fs.writeFileSync(PATHS.env, prepped);
  }
};

const form = () =>
  prompt({
    message: 'Please provide the following information:',
    name: 'project',
    type: 'form',
    choices: [
      {
        initial: 'New Project',
        message: 'Project Name',
        name: 'name',
      },
      {
        initial: 'preview',
        message: 'Threekit Env',
        name: 'threekitEnv',
      },
      {
        message: 'Asset Id',
        name: 'assetId',
      },
      {
        message: 'Org Id',
        name: 'orgId',
      },
      {
        message: 'Public Auth Token',
        name: 'authToken',
      },
      {
        message: 'Private Auth Token',
        name: 'privateToken',
      },
    ],
  });

const init = async () => {
  const name = 'Hobbes Project';
  // const { project } = await form();
  // const name = project.name;
  const nameKebabCase = name.toLowerCase().replace(/\s/g, '-');
  const projectFolder = `./src/${nameKebabCase}`;

  const project = {
    assetId: process.env.THREEKIT_ASSET_ID,
    orgId: process.env.THREEKIT_ORG_ID,
    authToken: process.env.THREEKIT_PRIVATE_TOKEN,
    threekitEnv: process.env.THREEKIT_ENV,
  };

  api.connect({
    assetId: project.assetId,
    orgId: project.orgId,
    authToken: project.authToken,
    threekitEnv: project.threekitEnv,
  });

  dotenv.config();

  createIndexJs(projectFolder);
  const products = await api.catalog.downloadAll();
  const product = products.find((el) => el.query.id === project.assetId);
  createAppJs(projectFolder, product.product);

  updatePackageJson(nameKebabCase);
  updateIndexHtml(name);
  updateEnv(project);

  console.log(chalk.green('Project Initialized!'));
};

export default init;
