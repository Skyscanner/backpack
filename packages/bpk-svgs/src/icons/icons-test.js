import fs from 'fs';
import path from 'path';

// In order for the docs site to serve a zip-file containing all icon SVGs, the `zip-it-loader` loader
// must be provided with an empty file within the icons directory.
// If icons.js is not empty, then it will be served instead of the SVGs
describe('icons.js', () => {
  it('icons.js file should be empty', () => {
    const iconsFile = path.join(__dirname, 'icons.js');
    const iconsJsFileContents = fs.readFileSync(iconsFile);

    expect(iconsJsFileContents.toString()).toEqual('');
  });
});
