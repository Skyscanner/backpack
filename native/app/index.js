/* eslint-disable import/no-unresolved */

// ../storybook doesn't contain an index.js file.
// However, it has index.android.js and index.ios.js.
// The build process is able to intelligently choose one of these, based
// on the platform being built.
// However, eslint doesn't know about this, which is why a rule is disabled
// in this file.

export default from '../storybook';
