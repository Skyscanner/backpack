/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */

// ../storybook doesn't contain an index.js file.
// However, it has index.android.js and index.ios.js.
// The build process is able to intelligently choose one of these, based
// on the platform being built.
// However, eslint doesn't know about this, which is why some rules are disabled
// in this file.

import StorybookUI from '../storybook';

export default StorybookUI;
