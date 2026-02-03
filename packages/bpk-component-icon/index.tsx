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
import type { ComponentType } from 'react';

import {
  iconSizeSm,
  iconSizeLg,
  privateButtonLineHeight,
} from '@skyscanner/bpk-foundations-web/tokens/base.es6';

import withAlignment from './src/withAlignment';
import withDescription from './src/withDescription';
import withRtlSupport from './src/withRtlSupport';

// Wrapper functions to provide backwards compatibility
function withButtonAlignment(WrappedComponent: ComponentType<any>) {
  return withAlignment(WrappedComponent, privateButtonLineHeight, iconSizeSm);
}

function withLargeButtonAlignment(WrappedComponent: ComponentType<any>) {
  return withAlignment(WrappedComponent, privateButtonLineHeight, iconSizeLg);
}

export {
  withButtonAlignment,
  withLargeButtonAlignment,
  withAlignment,
  withRtlSupport,
  withDescription,
};
