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

import { themeAttributes as accordionThemeAttributes } from './../packages/bpk-component-accordion';
import { themeAttributes as barchartThemeAttributes } from './../packages/bpk-component-barchart';
import { themeAttributes as blockquoteThemeAttributes } from './../packages/bpk-component-blockquote';
import { primaryThemeAttributes, secondaryThemeAttributes } from './../packages/bpk-component-button';
import { themeAttributes as calendarThemeAttributes } from './../packages/bpk-component-calendar';
import { themeAttributes as checkboxThemeAttributes } from './../packages/bpk-component-checkbox';
import { themeAttributes as datepickerThemeAttributes } from './../packages/bpk-component-datepicker';
import { themeAttributes as drawerThemeAttributes } from './../packages/bpk-component-drawer';
import { themeAttributes as horizontalNavThemeAttributes } from './../packages/bpk-component-horizontal-nav';
import { themeAttributes as linkThemeAttributes } from './../packages/bpk-component-link';
import { themeAttributes as modalThemeAttributes } from './../packages/bpk-component-modal';
import { themeAttributes as nudgerThemeAttributes } from './../packages/bpk-component-nudger';
import { themeAttributes as popoverThemeAttributes } from './../packages/bpk-component-popover';
import { themeAttributes as progressThemeAttributes } from './../packages/bpk-component-progress';
import { themeAttributes as radioThemeAttributes } from './../packages/bpk-component-radio';
import { themeAttributes as sliderThemeAttributes } from './../packages/bpk-component-slider';
import { themeAttributes as spinnerThemeAttributes } from './../packages/bpk-component-spinner';

export default [
  ...accordionThemeAttributes,
  ...barchartThemeAttributes,
  ...blockquoteThemeAttributes,
  ...primaryThemeAttributes,
  ...secondaryThemeAttributes,
  ...calendarThemeAttributes,
  ...checkboxThemeAttributes,
  ...datepickerThemeAttributes,
  ...drawerThemeAttributes,
  ...horizontalNavThemeAttributes,
  ...linkThemeAttributes,
  ...modalThemeAttributes,
  ...nudgerThemeAttributes,
  ...popoverThemeAttributes,
  ...progressThemeAttributes,
  ...radioThemeAttributes,
  ...sliderThemeAttributes,
  ...spinnerThemeAttributes,
];
