import { prompt } from 'enquirer';
import fs from 'fs';
import chalk from 'chalk';

const init = async () => {
  const response = await prompt({
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
  const { project } = response;
  const projectName = project.name;
  const projectId = projectName.toLowerCase().replace(/\s/g, '-');

  const packageJsonStr = fs.readFileSync('./package.json', 'utf-8');
  const packageJson = JSON.parse(packageJsonStr);
  packageJson.name = projectId;
  fs.writeFileSync('./package.json', JSON.stringify(packageJson));

  const indexHtml = fs.readFileSync('./public/index.html', 'utf-8');
  const updated = indexHtml.replace(
    'Threekit React Development Kit',
    projectName
  );
  fs.writeFileSync('./public/index.html', updated);

  fs.mkdirSync(`./src/${projectId}`, {
    recursive: true,
  });

  const envFile = fs.existsSync('./.env');
  if (!envFile) {
    const envTemplate = fs.readFileSync('./config/.env.template', 'utf-8');
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
    fs.writeFileSync('./.env', prepped);
  }

  console.log(chalk.green('Project Initialized!'));
};

export default init;
