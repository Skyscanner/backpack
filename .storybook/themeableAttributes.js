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

/* @flow */

import { themeAttributes as badgeThemeAttributes } from '../packages/backpack-web/src/bpk-component-badge';
import { themeAttributes as bannerAlertThemeAttributes } from '../packages/backpack-web/src/bpk-component-banner-alert';
import { themeAttributes as barchartThemeAttributes } from '../packages/backpack-web/src/bpk-component-barchart';
import { themeAttributes as blockquoteThemeAttributes } from '../packages/backpack-web/src/bpk-component-blockquote';
import {
  buttonThemeAttributes,
  primaryThemeAttributes,
  secondaryThemeAttributes,
  featuredThemeAttributes,
  destructiveThemeAttributes,
} from '../packages/backpack-web/src/bpk-component-button';
import { themeAttributes as calendarThemeAttributes } from '../packages/backpack-web/src/bpk-component-calendar';
import { themeAttributes as checkboxThemeAttributes } from '../packages/backpack-web/src/bpk-component-checkbox';
import { themeAttributes as chipThemeAttributes } from '../packages/backpack-web/src/bpk-component-chip';
import { themeAttributes as datepickerThemeAttributes } from '../packages/backpack-web/src/bpk-component-datepicker';
import { themeAttributes as drawerThemeAttributes } from '../packages/backpack-web/src/bpk-component-drawer';
import { themeAttributes as fieldsetThemeAttributes } from '../packages/backpack-web/src/bpk-component-fieldset';
import { themeAttributes as formValidationThemeAttributes } from '../packages/backpack-web/src/bpk-component-form-validation';
import { themeAttributes as horizontalNavThemeAttributes } from '../packages/backpack-web/src/bpk-component-horizontal-nav';
import { themeAttributes as inputThemeAttributes } from '../packages/backpack-web/src/bpk-component-input';
import {
  linkAlternateThemeAttributes,
  themeAttributes as linkThemeAttributes,
} from '../packages/backpack-web/src/bpk-component-link';
import {
  defaultIconMarkerThemeAttributes,
  priceMarkerThemeAttributes,
} from '../packages/backpack-web/src/bpk-component-map';
import { themeAttributes as modalThemeAttributes } from '../packages/backpack-web/src/bpk-component-modal';
import { themeAttributes as navigationBarThemeAttributes } from '../packages/backpack-web/src/bpk-component-navigation-bar';
import { themeAttributes as nudgerThemeAttributes } from '../packages/backpack-web/src/bpk-component-nudger';
import { themeAttributes as paginationThemeAttributes } from '../packages/backpack-web/src/bpk-component-pagination';
import { themeAttributes as popoverThemeAttributes } from '../packages/backpack-web/src/bpk-component-popover';
import { themeAttributes as progressThemeAttributes } from '../packages/backpack-web/src/bpk-component-progress';
import { themeAttributes as radioThemeAttributes } from '../packages/backpack-web/src/bpk-component-radio';
import { themeAttributes as selectThemeAttributes } from '../packages/backpack-web/src/bpk-component-select';
import { themeAttributes as skipLinkThemeAttributes } from '../packages/backpack-web/src/bpk-component-skip-link';
import { themeAttributes as sliderThemeAttributes } from '../packages/backpack-web/src/bpk-component-slider';
import { themeAttributes as spinnerThemeAttributes } from '../packages/backpack-web/src/bpk-component-spinner';
import { themeAttributes as starRatingThemeAttributes } from '../packages/backpack-web/src/bpk-component-star-rating';
import { themeAttributes as switchThemeAttributes } from '../packages/backpack-web/src/bpk-component-switch';
import { themeAttributes as textareaThemeAttributes } from '../packages/backpack-web/src/bpk-component-textarea';

const storybookAttributes = ['primaryColor', 'themeName', 'logoFillColor'];

export default [
  ...badgeThemeAttributes,
  ...bannerAlertThemeAttributes,
  ...barchartThemeAttributes,
  ...blockquoteThemeAttributes,
  ...buttonThemeAttributes,
  ...primaryThemeAttributes,
  ...secondaryThemeAttributes,
  ...featuredThemeAttributes,
  ...destructiveThemeAttributes,
  ...calendarThemeAttributes,
  ...checkboxThemeAttributes,
  ...chipThemeAttributes,
  ...datepickerThemeAttributes,
  ...drawerThemeAttributes,
  ...fieldsetThemeAttributes,
  ...formValidationThemeAttributes,
  ...horizontalNavThemeAttributes,
  ...inputThemeAttributes,
  ...linkThemeAttributes,
  ...linkAlternateThemeAttributes,
  ...modalThemeAttributes,
  ...nudgerThemeAttributes,
  ...paginationThemeAttributes,
  ...popoverThemeAttributes,
  ...progressThemeAttributes,
  ...radioThemeAttributes,
  ...selectThemeAttributes,
  ...skipLinkThemeAttributes,
  ...sliderThemeAttributes,
  ...spinnerThemeAttributes,
  ...starRatingThemeAttributes,
  ...switchThemeAttributes,
  ...textareaThemeAttributes,
  ...navigationBarThemeAttributes,
  ...defaultIconMarkerThemeAttributes,
  ...priceMarkerThemeAttributes,
  ...storybookAttributes,
];
