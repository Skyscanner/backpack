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

// New component packages must include a README.md (convention: all 95 existing
// component packages ship one). See CODE_REVIEW_GUIDELINES.md.
const newComponentPackages = Array.from(
  new Set(
    createdFiles
      .map((f) => f.match(/^(packages\/bpk-component-[^/]+)\//))
      .filter((m): m is RegExpMatchArray => m !== null)
      .map((m) => m[1]),
  ),
).filter((pkg) => createdFiles.includes(`${pkg}/package.json`));

const packagesMissingReadme = newComponentPackages.filter(
  (pkg) => !fs.existsSync(`${pkg}/README.md`),
);

if (packagesMissingReadme.length) {
  fail(
    `New component packages must include a README.md. Missing for: ${packagesMissingReadme.join(
      ', ',
    )}`,
  );
}

// New component packages must include an accessibility test. See
// decisions/accessibility-tests.md. Detects any `accessibility-test.*` file in src/.
const packagesMissingA11yTest = newComponentPackages.filter((pkg) => {
  const srcDir = `${pkg}/src`;
  if (!fs.existsSync(srcDir)) return true;
  return !fs
    .readdirSync(srcDir)
    .some((name) => /^accessibility-test\.(t|j)sx?$/.test(name));
});

if (packagesMissingA11yTest.length) {
  fail(
    `New component packages must include an accessibility test (src/accessibility-test.tsx using jest-axe). Missing for: ${packagesMissingA11yTest.join(
      ', ',
    )}`,
  );
}

// Stories must be colocated with source, not placed under examples/. See
// decisions/colocated-stories.md.
const storiesInExamples = fileChanges.filter((filePath) =>
  filePath.match(/^packages\/bpk-component-[^/]+\/examples\/.*\.stories\.(t|j)sx?$/),
);

if (storiesInExamples.length) {
  fail(
    `Stories must be colocated with the component source (packages/bpk-component-*/src/*.stories.tsx), not under examples/. Please move: ${storiesInExamples.join(
      ', ',
    )}`,
  );
}

// Physical CSS properties break RTL. See decisions/rtl-ark-localeprovider.md.
// Warn on newly-introduced physical properties in component module SCSS —
// scoped to added diff lines so existing violations don't block unrelated PRs.
// When the codebase is migrated, replace this with `stylelint-use-logical`.
const physicalPropertyPattern =
  /^\s*(left|right|margin-left|margin-right|padding-left|padding-right|border-left|border-right|border-top-left-radius|border-top-right-radius|border-bottom-left-radius|border-bottom-right-radius)\s*:/;
const physicalValuePattern = /^\s*(text-align|float|clear)\s*:\s*(left|right)\b/;

const scssChanged = fileChanges.filter((filePath) =>
  filePath.match(/^packages\/bpk-component-[^/]+\/src\/.+\.module\.scss$/),
);

Promise.all(
  scssChanged.map((filePath) =>
    danger.git
      .diffForFile(filePath)
      .then((diff) => {
        const offending = (diff?.added ?? '')
          .split('\n')
          .filter(
            (line) =>
              physicalPropertyPattern.test(line) ||
              physicalValuePattern.test(line),
          );
        return offending.length
          ? `- \`${filePath}\`:\n\`\`\`\n${offending.join('\n')}\n\`\`\``
          : null;
      })
      .catch(() => null),
  ),
).then((results) => {
  const physicalHits = results.filter((r): r is string => r !== null);
  if (physicalHits.length) {
    warn(
      `Physical CSS properties are not RTL-safe. Prefer logical equivalents (inset-inline-*, margin-inline-*, padding-inline-*, border-inline-*, border-start-start-radius, text-align: start/end). Offending additions:\n${physicalHits.join('\n')}`,
    );
  }
});

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
