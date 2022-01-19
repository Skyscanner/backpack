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

import {
  iconSizeSm,
  iconSizeLg,
  buttonLineHeight,
  buttonLargeLineHeight,
} from '@skyscanner/bpk-foundations-web/tokens/base.es6';

import withAlignment from './src/withAlignment';
import withRtlSupport from './src/withRtlSupport';
import withDescription from './src/withDescription';

// Wrapper functions to provide backwards compatibility
function withButtonAlignment(WrappedComponent) {
  return withAlignment(WrappedComponent, buttonLineHeight, iconSizeSm);
}

function withLargeButtonAlignment(WrappedComponent) {
  return withAlignment(WrappedComponent, buttonLargeLineHeight, iconSizeLg);
}

// alias to maintain backwards compat, can be deprecated in due course
// alias to maintain backwards compat, can be deprecated in due course
export {
  withButtonAlignment as alignToButton,
  withLargeButtonAlignment as alignToLargeButton,
  withButtonAlignment,
  withLargeButtonAlignment,
  withAlignment,
  withRtlSupport,
  withDescription,
};
