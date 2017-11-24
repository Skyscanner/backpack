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
  colorBlue500,
} from 'bpk-tokens/tokens/base.es6';

const theme = {
  primaryColor300: '#865f9e',
  primaryColor500: '#461962',
  primaryColor600: '#2d244c',
  primaryColor700: '#1a1331',
  secondaryColor300: '#feee8b',
  secondaryColor500: '#fce134',
  secondaryColor600: '#f8c42d',
  secondaryColor700: '#d99916',
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

  buttonPrimaryTextColor: theme.primaryColor600,
  buttonPrimaryHoverTextColor: theme.primaryColor600,
  buttonPrimaryActiveTextColor: theme.primaryColor600,
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

  horizontalNavBarSelectedColor: theme.primaryColor500,
  horizontalNavLinkActiveColor: theme.primaryColor600,
  horizontalNavLinkColor: colorBlue500,
  horizontalNavLinkHoverColor: colorBlue500,
  horizontalNavLinkSelectedColor: theme.primaryColor500,

  spinnerPrimaryColor: theme.primaryColor500,
};

export default bpkCustomTheme;
