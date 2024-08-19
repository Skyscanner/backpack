/*
 *
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
 *
 */

// See http://danger.systems/js if you're not sure what this is.

import * as fs from 'fs';

import { danger, fail, markdown, warn } from 'danger';
import { commonFileWarnings } from 'danger-plugin-toolbox';

// Applies to js, css, scss and sh files that are not located in the dist folder.
const shouldContainLicensingInformation = (filePath: string) =>
  filePath.match(/\.(js|ts|tsx|css|scss|sh)$/) &&
  !filePath.includes('dist/') &&
  !filePath.includes('base.js');

const createdFiles = danger.git.created_files;
const modifiedFiles = danger.git.modified_files;
const fileChanges = [...modifiedFiles, ...createdFiles];

const componentChangedOrCreated = fileChanges.some((filePath) =>
  filePath.match(/packages\/bpk-component.+\/src\/.+\.(js|ts|tsx)$/),
);

if (componentChangedOrCreated) {
  markdown(`
  ## Browser support

  If this is a visual change, make sure you've tested it in multiple browsers.
  `);
}

// If source files have changed, the snapshots should have been updated.
const componentSourceFilesModified = fileChanges.some(
  (filePath) =>
    // packages/(one or more chars)/src/(one or more chars).(js or ts or tsx)
    filePath.match(/packages\/.*bpk-component.+\/src\/.+\.(js|ts|tsx)$/) &&
    !filePath.includes('-test.'),
);

const snapshotsModified = fileChanges.some(
  (filePath) =>
    filePath.endsWith('.js.snap') ||
    filePath.endsWith('.tsx.snap') ||
    filePath.endsWith('.ts.snap'),
);

if (componentSourceFilesModified && !snapshotsModified) {
  warn(
    "Package source files (e.g. `packages/package-name/src/Component.js`) were updated, but snapshots weren't. Have you checked that the tests still pass?",
  );
}

// If TS files have changed, the type files should have been updated.
const componentFilesModified = fileChanges.some(
  (filePath) =>
    // packages/(one or more chars)/src/(one or more chars).(js or ts or tsx)
    filePath.match(/packages\/.*bpk-component.+\/src\/.+\.(ts|tsx)$/) &&
    !filePath.includes('-test.') &&
    !filePath.endsWith('.d.ts'),
);

const typeFilesModified = fileChanges.some((filePath) =>
  filePath.endsWith('.d.ts'),
);

if (componentFilesModified && !typeFilesModified) {
  warn(
    "Package source files (e.g. `packages/package-name/src/Component.tsx`) were updated, but type files weren't. Have you checked that no types have changed?",
  );
}

// New files should include the Backpack license heading.
const unlicensedFiles = createdFiles.filter((filePath: string) => {
  if (shouldContainLicensingInformation(filePath)) {
    const fileContent = fs.readFileSync(filePath);
    return !fileContent.includes(
      'Licensed under the Apache License, Version 2.0 (the "License")',
    );
  }

  return false;
});

if (unlicensedFiles.length > 0) {
  fail(
    `These new files do not include the license heading: ${unlicensedFiles.join(
      ', ',
    )}`,
  );
}

const newComponentContainsClass = createdFiles.filter((filePath: string) => {
  if (filePath.match(/\.(js|ts|tsx|css|scss|sh)$/) &&
    !filePath.includes('dist/') &&
    !filePath.includes('base.js')) {
    const fileContent = fs.readFileSync(filePath);
    return fileContent.includes('className?: string | null');
  }
  return false;
});

if (newComponentContainsClass.length > 0) {
  warn(
    `These new files implement overriding className which is restricted: ${newComponentContainsClass.join(
      ', ',
    )}. Please update this component to remove the className prop.`,
  );
}

const nonModuleCssFiles = fileChanges.filter(
  (filePath) =>
    filePath.match(/bpk-component/) &&
    filePath.match(/\.s?css/) &&
    !filePath.match('_') &&
    !filePath.match(/\.module\.s?css/),
);

if (nonModuleCssFiles.length) {
  fail(
    `(S)CSS files must be named with the CSS Module convention - .module.(s)css. Please rename these files: ${nonModuleCssFiles.join(
      ', ',
    )}`,
  );
}

const linterWarnings = ["no-console", "no-undef", "@typescript-eslint/no-unused-vars", "jest/no-disabled-tests", "no-alert", "func-names", "react-hooks/exhaustive-deps"]
const invalidReactChild = ["Functions are not valid as a React child"];
const invalidFormField = ["You provided .* to a form field without"];
const components = ["<TestComponent />", "<TestComponent>", "<Nav />", "<Header />", "<Grid />", "<Grid>", "<Portal />", "<Portal>"];
const reactRecogniseProp = ["React does not recognize"]
const invalidTags = ["The tag <rect>", "The tag <g>", "The tag <text>"]
const passingTests = ["✓"]
const unknownEventHandler = ["Unknown event handler"]
const propType = ["Failed prop type", "Support for defaultProps will be removed from function components in a future major release. Use JavaScript default parameters instead.", 'A props object containing a "key" prop is being spread into JSX:']
const componentWillReceiveProps = ["componentWillReceiveProps"]
const invalidCSSProperties = ["is an invalid value for the .* css style property."]
const invalidProps = ["for a non-boolean attribute", "Invalid ARIA attribute"]
// TODO: Address tests being wrapped in act
const actTests = ["inside a test was not wrapped in act(...)"]
// TODO: Convert components that use CSSTransition to functional components and allow for using refs
const findDOMNode = ["findDOMNode is deprecated and will be removed in the next major release."];

const allIgnoredWarnings = linterWarnings
  .concat(invalidReactChild)
  .concat(invalidFormField)
  .concat(components)
  .concat(reactRecogniseProp)
  .concat(invalidTags)
  .concat(passingTests)
  .concat(unknownEventHandler)
  .concat(propType)
  .concat(componentWillReceiveProps)
  .concat(invalidCSSProperties)
  .concat(invalidProps)
  .concat(actTests)
  .concat(findDOMNode);

commonFileWarnings('logs/test.log', {
  logType: 'fail',
  ignoreRegex: new RegExp(allIgnoredWarnings.join("|"))
});
