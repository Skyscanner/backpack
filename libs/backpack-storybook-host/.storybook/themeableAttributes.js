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

import { themeAttributes as badgeThemeAttributes } from '@skyscanner/backpack-web/bpk-component-badge';
import { themeAttributes as bannerAlertThemeAttributes } from '@skyscanner/backpack-web/bpk-component-banner-alert';
import { themeAttributes as barchartThemeAttributes } from '@skyscanner/backpack-web/bpk-component-barchart';
import { themeAttributes as blockquoteThemeAttributes } from '@skyscanner/backpack-web/bpk-component-blockquote';
import {
  buttonThemeAttributes,
  primaryThemeAttributes,
  secondaryThemeAttributes,
  featuredThemeAttributes,
  destructiveThemeAttributes,
} from '@skyscanner/backpack-web/bpk-component-button';
import { themeAttributes as calendarThemeAttributes } from '@skyscanner/backpack-web/bpk-component-calendar';
import { themeAttributes as checkboxThemeAttributes } from '@skyscanner/backpack-web/bpk-component-checkbox';
import { themeAttributes as chipThemeAttributes } from '@skyscanner/backpack-web/bpk-component-chip';
import { themeAttributes as datepickerThemeAttributes } from '@skyscanner/backpack-web/bpk-component-datepicker';
import { themeAttributes as drawerThemeAttributes } from '@skyscanner/backpack-web/bpk-component-drawer';
import { themeAttributes as fieldsetThemeAttributes } from '@skyscanner/backpack-web/bpk-component-fieldset';
import { themeAttributes as formValidationThemeAttributes } from '@skyscanner/backpack-web/bpk-component-form-validation';
import { themeAttributes as horizontalNavThemeAttributes } from '@skyscanner/backpack-web/bpk-component-horizontal-nav';
import { themeAttributes as inputThemeAttributes } from '@skyscanner/backpack-web/bpk-component-input';
import {
  linkAlternateThemeAttributes,
  themeAttributes as linkThemeAttributes,
} from '@skyscanner/backpack-web/bpk-component-link';
import {
  defaultIconMarkerThemeAttributes,
  priceMarkerThemeAttributes,
} from '@skyscanner/backpack-web/bpk-component-map';
import { themeAttributes as modalThemeAttributes } from '@skyscanner/backpack-web/bpk-component-modal';
import { themeAttributes as navigationBarThemeAttributes } from '@skyscanner/backpack-web/bpk-component-navigation-bar';
import { themeAttributes as nudgerThemeAttributes } from '@skyscanner/backpack-web/bpk-component-nudger';
import { themeAttributes as paginationThemeAttributes } from '@skyscanner/backpack-web/bpk-component-pagination';
import { themeAttributes as popoverThemeAttributes } from '@skyscanner/backpack-web/bpk-component-popover';
import { themeAttributes as progressThemeAttributes } from '@skyscanner/backpack-web/bpk-component-progress';
import { themeAttributes as radioThemeAttributes } from '@skyscanner/backpack-web/bpk-component-radio';
import { themeAttributes as selectThemeAttributes } from '@skyscanner/backpack-web/bpk-component-select';
import { themeAttributes as skipLinkThemeAttributes } from '@skyscanner/backpack-web/bpk-component-skip-link';
import { themeAttributes as sliderThemeAttributes } from '@skyscanner/backpack-web/bpk-component-slider';
import { themeAttributes as spinnerThemeAttributes } from '@skyscanner/backpack-web/bpk-component-spinner';
import { themeAttributes as starRatingThemeAttributes } from '@skyscanner/backpack-web/bpk-component-star-rating';
import { themeAttributes as switchThemeAttributes } from '@skyscanner/backpack-web/bpk-component-switch';
import { themeAttributes as textareaThemeAttributes } from '@skyscanner/backpack-web/bpk-component-textarea';

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
