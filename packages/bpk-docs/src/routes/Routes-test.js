import fs from 'fs';

// In order to serve a zip-file containing all icon SVGs, the `zip-it-loader` loader
// must be provided with an empty file within the Icons directory.

// If Icons.js is not empty, then it will be served instead of the SVGs

describe('Icons.js', () => {
  it('Icons.js file should be empty', () => {
    const iconsJsFileContents = fs.readFileSync(
      'packages/bpk-svgs/src/icons/icons.js',
    );
    expect(iconsJsFileContents.toString()).toEqual('');
  });
});
