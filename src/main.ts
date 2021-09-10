import chalk from 'chalk';
import fs from 'fs';
import ncp from 'ncp';
import path from 'path';
import { promisify } from 'util';
import OptionList from './types/option-list';
import execa from 'execa';
import Listr from 'listr';
import { install } from 'pkg-install';
import {packages, packagesDev} from "./custom-packages/packages";
import { PACKAGE_MANAGER_DEFAULT_ANSWER } from './questions';

const TEMPLATES: string = 'templates';
const ERROR: string = 'ERROR:';
const ERROR_TEMPLATE_NAME = 'must to specified the project name. Example: "create-project  project_name"';

const access: (path: fs.PathLike, mode?: number) => Promise<void> = promisify(fs.access);

const copy: (source: string, destination: string, options?: ncp.Options) => Promise<void> = promisify(ncp);

async function initGit(options: OptionList) {
  const result: execa.ExecaReturnValue<string> = await execa('git', ['init'], {
    cwd: options.targetDirectory,
  });
  if (result.failed) {
    return Promise.reject(new Error('Failed to initialize git'));
  }
  return;
}

async function initReactNative(options: OptionList) {
  const installReactNativeCMD: string = `npx react-native init ${options.proyectName} --version 0.65.1 --skip-install --template react-native-template-typescript`;

  const result: execa.ExecaReturnValue<string> = await execa.command(installReactNativeCMD, {
    cwd: options.targetDirectory,
  });

  if (result.failed) {

    return Promise.reject(new Error('Failed installing dependencies.'));

  }

  return;
}

async function InstallCutomDependecies(options: OptionList) {

  const installDefaults = {
    prefer: options.packageManager as any,
    cwd: options.targetCopyDirectory
  }

  const execute = options.packageManager === PACKAGE_MANAGER_DEFAULT_ANSWER ? 'npm i' : 'yarn';

  const result = await execa.command(`cd ./${options.proyectName} && ${execute}`)

  if (result.failed) {

    return Promise.reject(new Error('Failed installing dependencies.'));

  }

  await install(packagesDev,
    {
      dev: true,
      ...installDefaults,
    })

  await install(packages, installDefaults)
}

const copyTemplateFiles = async (options: OptionList) => {
  const ocpOption: ncp.Options = { clobber: false }
  return copy(options.templateDirectory, options.targetCopyDirectory, ocpOption);
}

const replaceSettingFile = async (options: OptionList) => {
  const RemoveFIlesCMD: string = `rm -rf babel.config.js tsconfig.json App.tsx index.js __tests__`;

  const result: execa.ExecaReturnValue<string> = await execa.command(RemoveFIlesCMD, {
    cwd: options.targetCopyDirectory,
  });

  if (result.failed) {
    return Promise.reject(new Error('Failed installing dependencies.'));
  }

  const pathCopyFrom: string = path.resolve(__dirname, TEMPLATES, "settings");
  const ocpOption: ncp.Options = { clobber: false }
  return copy(pathCopyFrom, options.targetCopyDirectory, ocpOption);
}

const returnTemplatePath = (template: string) => {
  return path.resolve(
    __dirname,
    TEMPLATES,
    template.toLowerCase()
  );
}

export const createProject = async (options: OptionList) => {
  if (!options.proyectName) {
    console.error(`%s ${ERROR_TEMPLATE_NAME}.`, chalk.red.bold(ERROR));
    process.exit(1);
  }

  options = {
    ...options,
    targetDirectory: options.targetDirectory || process.cwd()
  };

  const copyTemplateToDirectory: string = path.resolve(
    process.cwd(), options.proyectName
  );
  options.templateDirectory = returnTemplatePath(options.template);
  options.targetCopyDirectory = copyTemplateToDirectory;

  try {
    await access(options.templateDirectory, fs.constants.R_OK);
  } catch (err) {
    console.error('%s Invalid template name', chalk.red.bold(ERROR));
    process.exit(1);
  }

  const tasks = new Listr([
    {
      title: 'Initialize React-Native',
      task: () => initReactNative(options)
    },
    {
      title: 'Copy forder structure and files',
      task: () => copyTemplateFiles(options),
    },
    {
      title: 'Copy customs settings',
      task: () => replaceSettingFile(options)
    },
    {
      title: 'Initialize git',
      task: () => initGit(options),
      enabled: () => options.git,
    },
    {
      title: 'Install customs dependencies',
      task: () => InstallCutomDependecies(options),
      enabled: () => options.runInstall
    },
  ]);

  await tasks.run();
  console.log('%s Project ready', chalk.green.bold('DONE: :)'));
  return true;
}