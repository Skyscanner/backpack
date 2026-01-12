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

const fs = require('fs');
const path = require('path');
const {pathToFileURL} = require("url");

const sass = require('sass-embedded');

const TEXT = `Backpack - Skyscanner's Design System

Copyright 2016 Skyscanner Ltd

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

  http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.`;

const licenseHeader = `/*
${TEXT.replace(/^/gm, ' * ')}
 */`;

async function compile(sassPath) {
  let result;
  try {
    result = await sass.compileAsync(sassPath, {
      style: 'compressed',
      loadPaths: ['node_modules'],
      importers: [
        {
          // An importer that redirects relative URLs starting with "~" to
          // `node_modules`.
          findFileUrl(url) {
            if (!url.startsWith('~')) return null;
            const nUrl = pathToFileURL(`node_modules/${url.substring(1)}`);
            return nUrl;
          },
        },
      ],
    });
  } catch (e) {
    console.error(e)
  }
  const cleanCss = result.css.toString().replace(/:global\((.*?)\)/g, '$1');
  const data = new Uint8Array(Buffer.from(`${licenseHeader}\n${cleanCss}`));
  const { dir, name } = path.parse(sassPath);
  const newPath = path.format({ dir, name, ext: '.css' });
  return fs.writeFileSync(newPath, data);
}

module.exports = { compile };
