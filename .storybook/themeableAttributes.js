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

import { themeAttributes as badgeThemeAttributes } from '@backpack/badge';
import { themeAttributes as bannerAlertThemeAttributes } from '../packages/bpk-component-banner-alert';
import { themeAttributes as barchartThemeAttributes } from '../packages/bpk-component-barchart';
import { themeAttributes as blockquoteThemeAttributes } from '../packages/bpk-component-blockquote';
import {
  buttonThemeAttributes,
  primaryThemeAttributes,
  secondaryThemeAttributes,
  featuredThemeAttributes,
  destructiveThemeAttributes,
} from '../packages/bpk-component-button';
import { themeAttributes as calendarThemeAttributes } from '../packages/bpk-component-calendar';
import { themeAttributes as checkboxThemeAttributes } from '../packages/bpk-component-checkbox';
import { themeAttributes as chipThemeAttributes } from '../packages/bpk-component-chip';
import { themeAttributes as datepickerThemeAttributes } from '../packages/bpk-component-datepicker';
import { themeAttributes as drawerThemeAttributes } from '../packages/bpk-component-drawer';
import { themeAttributes as fieldsetThemeAttributes } from '../packages/bpk-component-fieldset';
import { themeAttributes as formValidationThemeAttributes } from '../packages/bpk-component-form-validation';
import { themeAttributes as horizontalNavThemeAttributes } from '../packages/bpk-component-horizontal-nav';
import { themeAttributes as inputThemeAttributes } from '../packages/bpk-component-input';
import {
  linkAlternateThemeAttributes,
  themeAttributes as linkThemeAttributes,
} from '../packages/bpk-component-link';
import {
  defaultIconMarkerThemeAttributes,
  priceMarkerThemeAttributes,
} from '../packages/bpk-component-map';
import { themeAttributes as modalThemeAttributes } from '../packages/bpk-component-modal';
import { themeAttributes as navigationBarThemeAttributes } from '../packages/bpk-component-navigation-bar';
import { themeAttributes as nudgerThemeAttributes } from '../packages/bpk-component-nudger';
import { themeAttributes as paginationThemeAttributes } from '../packages/bpk-component-pagination';
import { themeAttributes as popoverThemeAttributes } from '../packages/bpk-component-popover';
import { themeAttributes as progressThemeAttributes } from '../packages/bpk-component-progress';
import { themeAttributes as radioThemeAttributes } from '../packages/bpk-component-radio';
import { themeAttributes as selectThemeAttributes } from '../packages/bpk-component-select';
import { themeAttributes as skipLinkThemeAttributes } from '../packages/bpk-component-skip-link';
import { themeAttributes as sliderThemeAttributes } from '../packages/bpk-component-slider';
import { themeAttributes as spinnerThemeAttributes } from '../packages/bpk-component-spinner';
import { themeAttributes as starRatingThemeAttributes } from '../packages/bpk-component-star-rating';
import { themeAttributes as switchThemeAttributes } from '../packages/bpk-component-switch';
import { themeAttributes as textareaThemeAttributes } from '../packages/bpk-component-textarea';

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
