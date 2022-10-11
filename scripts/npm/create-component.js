/*
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2016 Skyscanner Ltd
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
const fs = require('fs');
const { Transform } = require('stream');
const path = require('path');

const colors = require('colors');
const prompt = require('prompt');
const _ = require('lodash');
const globby = require('globby');

const schema = {
  properties: {
    name: {
      description: "Enter the component name, e.g. 'banner-alert'",
      pattern: /^[a-z-]+$/,
      message: 'Use snake case, e.g. "banner-alert".',
      required: true,
    },
  },
};

_.mixin({
  pascalCase: _.flow(_.camelCase, _.upperFirst),
});

// Util to recursively make dirs
const mkdirp = (dir) =>
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

const createComponent = async (err, { name }) => {
  if (err) {
    console.error(err);
    return;
  }

  const boilerplateComponentPath = `packages/bpk-component-boilerplate`;
  const newComponentPath = `packages/bpk-component-${name}`;

  const pascalCaseName = _.pascalCase(name);

  const boilerPlateFilePaths = await globby([
    `${boilerplateComponentPath}/**`,
    `!**/node_modules/**`,
  ]);

  const processBoilerPlateFiles = (boilerPlateFilePath) => {
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

  const componentCreationProcess = async (directoryAlreadyExists) => {
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

    // Link everything up with Lerna.
    console.log(colors.yellow(`Bootsrapping Lerna..`));
    execSync(`npm run lerna bootstrap`);

    // Fix eslint errors and run Prettier.
    console.log(colors.yellow(`Formatting code using eslint..`));
    execSync(`npx eslint --fix ${newComponentPath}`);

    console.log(colors.green(`${newComponentPath} has been created! 👍\n`));

    console.log(`Run tests with ${colors.cyan(`npm test`)}`);
    console.log(`Run Storybook with ${colors.cyan(`npm start`)}`);
  };

  fs.exists(newComponentPath, componentCreationProcess);
};

prompt.start();
prompt.get(schema, createComponent);
