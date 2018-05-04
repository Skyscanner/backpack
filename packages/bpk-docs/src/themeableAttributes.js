/*
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2018 Skyscanner Ltd
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

import { themeAttributes as accordionThemeAttributes } from 'bpk-component-accordion';
import { themeAttributes as barchartThemeAttributes } from 'bpk-component-barchart';
import { themeAttributes as blockquoteThemeAttributes } from 'bpk-component-blockquote';
import {
  primaryThemeAttributes,
  secondaryThemeAttributes,
} from 'bpk-component-button';
import { themeAttributes as calendarThemeAttributes } from 'bpk-component-calendar';
import { themeAttributes as checkboxThemeAttributes } from 'bpk-component-checkbox';
import { themeAttributes as datepickerThemeAttributes } from 'bpk-component-datepicker';
import { themeAttributes as drawerThemeAttributes } from 'bpk-component-drawer';
import { themeAttributes as horizontalNavThemeAttributes } from 'bpk-component-horizontal-nav';
import {
  linkAlternateThemeAttributes,
  themeAttributes as linkThemeAttributes,
} from 'bpk-component-link';
import { themeAttributes as modalThemeAttributes } from 'bpk-component-modal';
import { themeAttributes as nudgerThemeAttributes } from 'bpk-component-nudger';
import { themeAttributes as paginationThemeAttributes } from 'bpk-component-pagination';
import { themeAttributes as popoverThemeAttributes } from 'bpk-component-popover';
import { themeAttributes as progressThemeAttributes } from 'bpk-component-progress';
import { themeAttributes as radioThemeAttributes } from 'bpk-component-radio';
import { themeAttributes as sliderThemeAttributes } from 'bpk-component-slider';
import { themeAttributes as spinnerThemeAttributes } from 'bpk-component-spinner';
import { themeAttributes as navigationBarThemeAttributes } from 'bpk-component-navigation-bar';

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
  ...linkAlternateThemeAttributes,
  ...modalThemeAttributes,
  ...nudgerThemeAttributes,
  ...paginationThemeAttributes,
  ...popoverThemeAttributes,
  ...progressThemeAttributes,
  ...radioThemeAttributes,
  ...sliderThemeAttributes,
  ...spinnerThemeAttributes,
  ...navigationBarThemeAttributes,
];
