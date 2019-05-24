/*
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2016-2019 Skyscanner Ltd
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
/* eslint-disable no-await-in-loop */
/* eslint-disable consistent-return */

const path = require('path');
const fs = require('fs');
const readline = require('readline');

let readMoreFiles = true;
const svgFiles = [];

const processSvg = file =>
  new Promise((resolve, reject) => {
    const fileName = path.basename(file);
    const newFile = path.join('./packages/bpk-svgs/src/icons/', fileName);

    fs.readFile(file, 'utf8', (err, data) => {
      if (err) {
        return reject(err);
      }
      let result = data.replace(/\s+/g, ' ');
      const pathRegex = /path d="(.*)"/gm;
      const fileConstituents = pathRegex.exec(result);
      if (fileConstituents && fileConstituents.length > 1) {
        const svgPath = fileConstituents[1];
        result = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="${svgPath}"/></svg>`;
      }

      fs.writeFile(newFile, result, 'utf8', err2 => {
        if (err2) return reject(err2);
        resolve();
      });
    });
  });

const questionAsync = (rl, question) =>
  new Promise(resolve => {
    rl.question(question, answer => {
      resolve(answer);
    });
  });

const readFilenames = async rl => {
  const input = await questionAsync(
    rl,
    `SVGs: ${
      svgFiles.length
    }\nWhen you've added files, hit return. When you've got no more to add, just hit return with no files specified.\n`,
  );
  if (input === '') {
    readMoreFiles = false;
    return;
  }
  const fileNames = input.split(/(?<!\\)\s/);
  fileNames.forEach(f => {
    if (f !== '') {
      svgFiles.push(f.split('\\').join(''));
    }
  });
};

console.log(
  `What SVG(s) would you like to add?\nTIP 💡 You can drag file(s) here from Finder instead of typing the paths yourself!\n`,
);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

(async () => {
  while (readMoreFiles) {
    await readFilenames(rl);
  }
  const newSvgCount = svgFiles.length;
  if (newSvgCount === 0) {
    console.log(`No SVGs? No worries 😉`);
    process.exit(0);
  }
  console.log(`svgFiles`, svgFiles);
  console.log(
    `Awesome! Adding ${
      newSvgCount === 1 ? 'the SVG' : `all ${newSvgCount} SVGs`
    } now 👍`,
  );
  const svgFilesProcesses = svgFiles.map(
    f =>
      new Promise(resolve => {
        processSvg(f).then(() => resolve());
      }),
  );
  Promise.all(svgFilesProcesses).then(() => {
    console.log(`Done yo 👍`);
    process.exit(0);
  });
})();
