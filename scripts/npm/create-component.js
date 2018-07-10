/*
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2018 Skyscanner Ltd
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/* eslint-disable no-console */

const { execSync } = require('child_process');
const prompt = require('prompt');
const fs = require('fs');
const colors = require('colors');
const { Transform } = require('stream');
const path = require('path');
const _ = require('lodash');
const globby = require('globby');

const STORYBOOK_CONFIG_SPLIT_POINT_1 = 'configure(() => {';
const STORYBOOK_CONFIG_SPLIT_POINT_2 = '}, module);';

const schema = {
  properties: {
    platform: {
      description: 'native or web?',
      default: 'native',
      pattern: /^(native|web)$/,
      message: 'Enter "native" or "web"',
    },
    name: {
      description: "Enter the component name, e.g. 'banner-alert'",
      pattern: /^[a-z-]+$/,
      message: 'Use snake case, e.g. "banner-alert".',
      required: true,
    },
  },
};

_.mixin({
  pascalCase: _.flow(
    _.camelCase,
    _.upperFirst,
  ),
});

// Util to recursively make dirs
const mkdirp = dir =>
  path
    .resolve(dir)
    .split(path.sep)
    .reduce((acc, cur) => {
      const currentPath = path.normalize(acc + path.sep + cur);
      try {
        fs.statSync(currentPath);
      } catch (e) {
        if (e.code === 'ENOENT') {
          fs.mkdirSync(currentPath);
        } else {
          throw e;
        }
      }
      return currentPath;
    }, '');

const Replacer = (source, destination) =>
  new Transform({
    transform(chunk, enc, cb) {
      const data = chunk.toString();
      this.push(data.replace(new RegExp(source, 'g'), destination));
      cb();
    },
  });

const sortLines = (lineA, lineB) => {
  const trimmedA = lineA.trim();
  const trimmedB = lineB.trim();
  if (trimmedA < trimmedB) {
    return -1;
  }
  if (trimmedA > trimmedB) {
    return 1;
  }
  return 0;
};

const createComponent = async (err, { platform, name }) => {
  if (err) {
    console.error(err);
    return;
  }

  let boilerplateComponentPath = `packages/bpk-component-boilerplate`;
  let newComponentPath = `packages/bpk-component-${name}`;
  let storybookConfigFile = `.storybook/config.js`;
  let storybookImport = `require('./../${newComponentPath}/stories');`;

  if (platform === 'native') {
    boilerplateComponentPath = `native/packages/react-native-bpk-component-boilerplate`;
    newComponentPath = `native/packages/react-native-bpk-component-${name}`;
    storybookConfigFile = `native/storybook/storybook.js`;
    storybookImport = `require('../packages/react-native-bpk-component-${name}/stories');`;
  }

  const pascalCaseName = _.pascalCase(name);

  const boilerPlateFilePaths = await globby([
    `${boilerplateComponentPath}/**`,
    `!**/node_modules/**`,
  ]);

  const processBoilerPlateFiles = boilerPlateFilePath => {
    const newFilePath = boilerPlateFilePath
      .split('boilerplate')
      .join(name)
      .split('Boilerplate')
      .join(pascalCaseName);

    mkdirp(path.dirname(newFilePath));

    return new Promise((resolve, reject) => {
      fs.createReadStream(boilerPlateFilePath)
        .pipe(Replacer('boilerplate', name))
        .pipe(Replacer('Boilerplate', pascalCaseName))
        .pipe(fs.createWriteStream(newFilePath))
        .on('finish', resolve)
        .on('error', reject);
    });
  };

  const componentCreationProcess = async directoryAlreadyExists => {
    if (directoryAlreadyExists) {
      console.error(
        colors.red(
          `Directory ${newComponentPath} already exists. New components must have a unique name.`,
        ),
      );
      return;
    }

    console.log(colors.yellow(`Creating ${newComponentPath}…`));

    await Promise.all(
      boilerPlateFilePaths.map(_.unary(processBoilerPlateFiles)),
    );

    // Add the new component to storybook config:
    const storybookConfigContent = fs
      .readFileSync(storybookConfigFile)
      .toString();

    const storybookConfigContentImports = storybookConfigContent
      .split(STORYBOOK_CONFIG_SPLIT_POINT_1)[1]
      .split(STORYBOOK_CONFIG_SPLIT_POINT_2)[0]
      .split('\n')
      .filter(s => !_.isEmpty(s));

    storybookConfigContentImports.push(storybookImport);

    const newStorybookConfigContent = `${
      storybookConfigContent.split(STORYBOOK_CONFIG_SPLIT_POINT_1)[0]
    }${STORYBOOK_CONFIG_SPLIT_POINT_1}\n${storybookConfigContentImports
      .sort(sortLines)
      .join('\n')}\n${STORYBOOK_CONFIG_SPLIT_POINT_2}${
      storybookConfigContent.split(STORYBOOK_CONFIG_SPLIT_POINT_2)[1]
    }`;

    fs.writeFileSync(storybookConfigFile, newStorybookConfigContent, 'utf8');

    // Fix eslint errors and run Prettier.
    execSync(`npx eslint --fix ${newComponentPath} ${storybookConfigFile}`);

    console.log(colors.green(`${newComponentPath} has been created! 👍\n`));

    if (platform === 'web') {
      console.log(`Run tests with ${colors.cyan(`npm test`)}`);
      console.log(`Run Storybook with ${colors.cyan(`npm start`)}`);
    } else {
      console.log(`Run tests with ${colors.cyan(`npm run test:native`)}`);
      console.log(
        `Run Storybook with ${colors.cyan(
          `npm run native`,
        )}, then in another terminal run ${colors.cyan(
          `npm run ios`,
        )} and ${colors.cyan(`npm run android`)}`,
      );
    }
  };

  fs.exists(newComponentPath, componentCreationProcess);
};

prompt.start();
prompt.get(schema, createComponent);
