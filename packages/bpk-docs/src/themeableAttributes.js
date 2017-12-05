/*
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2017 Skyscanner Ltd
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

import { primaryThemeAttributes, secondaryThemeAttributes } from 'bpk-component-button';

/* eslint-disable global-require */
export default [
  require('bpk-component-accordion').themeAttributes,
  require('bpk-component-barchart').themeAttributes,
  require('bpk-component-blockquote').themeAttributes,
  [...primaryThemeAttributes, ...secondaryThemeAttributes],
  require('bpk-component-calendar').themeAttributes,
  require('bpk-component-datepicker').themeAttributes,
  require('bpk-component-checkbox').themeAttributes,
  require('bpk-component-horizontal-nav').themeAttributes,
  require('bpk-component-link').themeAttributes,
  require('bpk-component-modal').themeAttributes,
  require('bpk-component-nudger').themeAttributes,
  require('bpk-component-popover').themeAttributes,
  require('bpk-component-progress').themeAttributes,
  require('bpk-component-radio').themeAttributes,
  require('bpk-component-spinner').themeAttributes,
].filter(attrs => !!attrs);
