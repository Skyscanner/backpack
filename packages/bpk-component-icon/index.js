import { lineHeightBase, iconSizeSm, lineHeightLg, iconSizeLg } from 'bpk-tokens/tokens/base.es6';

import withAlignment from './src/withAlignment';
import withRtlSupport from './src/withRtlSupport';

// Wrapper functions to provide backwards compatibility
function withButtonAlignment(WrappedComponent) {
  return withAlignment(WrappedComponent, lineHeightBase, iconSizeSm);
}

function withLargeButtonAlignment(WrappedComponent) {
  return withAlignment(WrappedComponent, lineHeightLg, iconSizeLg);
}

export {
  withButtonAlignment as alignToButton, // alias to maintain backwards compat, can be deprecated in due course
  withLargeButtonAlignment as alignToLargeButton, // alias to maintain backwards compat, can be deprecated in due course
  withButtonAlignment,
  withLargeButtonAlignment,
  withAlignment,
  withRtlSupport,
};
