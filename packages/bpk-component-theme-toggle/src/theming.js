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
import {
  horizontalNavLinkColor,
  horizontalNavLinkHoverColor,
  horizontalNavLinkActiveColor,
  calendarDayHoverColor,
  calendarDayActiveColor,
} from 'bpk-tokens/tokens/base.es6';

const theme = {
  primaryColor300: '#E57373',
  primaryColor500: '#F44336',
  primaryColor600: '#E53935',
  primaryColor700: '#D32F2F',
  secondaryColor300: '#7986CB',
  secondaryColor500: '#3F51B5',
  secondaryColor600: '#303F9F',
  secondaryColor700: '#263490',
  white: '#fff',
};

const bpkCustomTheme = {
  accordionActiveColor: theme.primaryColor700,
  accordionColor: theme.primaryColor500,
  accordionHoverColor: theme.primaryColor600,

  barchartBarBackgroundColor: theme.primaryColor300,
  barchartBarHoverBackgroundColor: theme.primaryColor500,
  barchartBarActiveBackgroundColor: theme.primaryColor600,
  barchartBarSelectedBackgroundColor: theme.primaryColor700,

  blockquoteBarColor: theme.primaryColor500,

  buttonPrimaryTextColor: theme.white,
  buttonPrimaryHoverTextColor: theme.white,
  buttonPrimaryActiveTextColor: theme.white,
  buttonPrimaryGradientStartColor: theme.secondaryColor500,
  buttonPrimaryGradientEndColor: theme.secondaryColor600,
  buttonPrimaryBackgroundColor: theme.secondaryColor600,
  buttonPrimaryHoverBackgroundColor: theme.secondaryColor600,
  buttonPrimaryActiveBackgroundColor: theme.secondaryColor700,

  buttonSecondaryTextColor: theme.primaryColor500,
  buttonSecondaryHoverTextColor: theme.primaryColor600,
  buttonSecondaryActiveTextColor: theme.primaryColor700,
  buttonSecondaryBorderColor: theme.primaryColor500,
  buttonSecondaryHoverBorderColor: theme.primaryColor600,
  buttonSecondaryActiveBorderColor: theme.primaryColor700,
  buttonSecondaryBackgroundColor: theme.white,
  buttonSecondaryHoverBackgroundColor: theme.white,
  buttonSecondaryActiveBackgroundColor: theme.white,

  linkColor: theme.primaryColor300,
  linkHoverColor: theme.primaryColor500,
  linkActiveColor: theme.primaryColor600,
  linkVisitedColor: theme.primaryColor700,

  horizontalNavBarSelectedColor: theme.primaryColor500,
  horizontalNavLinkSelectedColor: theme.primaryColor500,
  horizontalNavLinkColor,
  horizontalNavLinkHoverColor,
  horizontalNavLinkActiveColor,

  spinnerPrimaryColor: theme.primaryColor500,

  progressBarFillColor: theme.primaryColor500,

  calendarDateTextColor: theme.primaryColor500,
  calendarDateTextHoverColor: calendarDayHoverColor,
  calendarDateTextActiveColor: calendarDayActiveColor,
  calendarDateTextFocusColor: theme.primaryColor500,
  calendarDateTextSelectedColor: theme.white,
  calendarDateSelectedBackgroundColor: theme.primaryColor700,
  calendarDateFocusedBorderColor: theme.primaryColor500,
  calendarNudgerIconColor: theme.primaryColor500,
  calendarNudgerIconHoverColor: theme.primaryColor600,
  calendarNudgerIconActiveColor: theme.primaryColor700,

  checkboxCheckedColor: theme.primaryColor700,
  radioCheckedColor: theme.primaryColor700,
};

export default bpkCustomTheme;
