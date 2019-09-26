/*
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2016-2019 Skyscanner Ltd
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
  colorGray50,
  colorGray100,
  colorGray300,
  colorGray500,
  colorGray700,
  colorGray900,
} from 'bpk-tokens/tokens/base.es6';

const BRAND_COLORS = {
  // Blue
  skyBlue: '#0770E3',

  // Tints
  skyBlueTint01: '#6D9FEB',
  skyBlueTint02: '#9DC0F2',
  skyBlueTint03: '#CDDFF8',
  skyBlueTint03RGB: '205, 223, 248',

  // Shades
  skyBlueShade01: '#084EB2',
  skyBlueShade02: '#042759',
  skyBlueShade03: '#02122C',

  // Grays
  skyGrayTint07: '#F1F2F8',
  skyGrayTint06: '#DDDDE5',
  skyGrayTint05: '#CDCDD7',
  skyGrayTint04: '#B2B2BF',
  skyGrayTint03: '#8F90A0',
  skyGrayTint02: '#68697F',
  skyGrayTint01: '#444560',
  skyGray: '#111236',
  white: '#FFF',

  // Greens
  monteverde: '#00A698',
  glencoe: '#73CEC6',
  segano: '#D0EEEC',
  buttonPrimaryHoverBackgroundColor: '#00887D', // Don't use outside of buttons
  buttonPrimaryActiveBackgroundColor: '#006A61', // Don't use outside of buttons

  // Red
  panjin: '#D1435B',

  // Orange/Amber
  kolkata: '#ff9400',
  bunol: '#FF7B59',

  // Purple
  abisko: '#5A489B',
  bagan: '#ffebd0',

  // Yellows
  erfoud: '#ffb54d',
};

const azureTheme = {
  themeName: 'Azure',
  accordionColor: BRAND_COLORS.skyBlueShade03,
  accordionHoverColor: BRAND_COLORS.skyBlueShade03,
  accordionActiveColor: BRAND_COLORS.skyBlueShade03,
  barchartBarBackgroundColor: BRAND_COLORS.skyBlueTint01,
  barchartBarHoverBackgroundColor: BRAND_COLORS.skyBlue,
  barchartBarActiveBackgroundColor: BRAND_COLORS.skyBlueShade01,
  barchartBarSelectedBackgroundColor: BRAND_COLORS.skyBlueShade01,
  blockquoteBarColor: BRAND_COLORS.skyBlue,
  buttonBorderRadius: '4px',
  buttonFontSize: '1.2rem',
  buttonPrimaryTextColor: BRAND_COLORS.white,
  buttonPrimaryHoverTextColor: BRAND_COLORS.white,
  buttonPrimaryActiveTextColor: BRAND_COLORS.white,
  buttonPrimaryGradientStartColor: BRAND_COLORS.monteverde,
  buttonPrimaryGradientEndColor: BRAND_COLORS.monteverde,
  buttonPrimaryBackgroundColor: BRAND_COLORS.monteverde,
  buttonPrimaryHoverBackgroundColor:
    BRAND_COLORS.buttonPrimaryHoverBackgroundColor,
  buttonPrimaryActiveBackgroundColor:
    BRAND_COLORS.buttonPrimaryActiveBackgroundColor,
  buttonSecondaryTextColor: BRAND_COLORS.skyBlue,
  buttonSecondaryHoverTextColor: BRAND_COLORS.skyBlue,
  buttonSecondaryActiveTextColor: BRAND_COLORS.skyBlueShade01,
  buttonSecondaryBorderColor: BRAND_COLORS.skyGrayTint06,
  buttonSecondaryHoverBorderColor: BRAND_COLORS.skyBlue,
  buttonSecondaryActiveBorderColor: BRAND_COLORS.skyBlueShade01,
  buttonSecondaryBackgroundColor: BRAND_COLORS.white,
  buttonSecondaryHoverBackgroundColor: BRAND_COLORS.white,
  buttonSecondaryActiveBackgroundColor: BRAND_COLORS.white,
  buttonFeaturedTextColor: BRAND_COLORS.white,
  buttonFeaturedHoverTextColor: BRAND_COLORS.white,
  buttonFeaturedActiveTextColor: BRAND_COLORS.white,
  buttonFeaturedGradientStartColor: BRAND_COLORS.skyBlue,
  buttonFeaturedGradientEndColor: BRAND_COLORS.skyBlue,
  buttonFeaturedBackgroundColor: BRAND_COLORS.skyBlue,
  buttonFeaturedHoverBackgroundColor: BRAND_COLORS.skyBlueShade01,
  buttonFeaturedActiveBackgroundColor: BRAND_COLORS.skyBlueShade02,
  buttonDestructiveTextColor: BRAND_COLORS.panjin,
  buttonDestructiveHoverTextColor: BRAND_COLORS.panjin,
  buttonDestructiveActiveTextColor: BRAND_COLORS.panjin,
  buttonDestructiveBorderColor: BRAND_COLORS.skyGrayTint04,
  buttonDestructiveHoverBorderColor: BRAND_COLORS.panjin,
  buttonDestructiveActiveBorderColor: BRAND_COLORS.panjin,
  buttonDestructiveBackgroundColor: BRAND_COLORS.white,
  buttonDestructiveHoverBackgroundColor: BRAND_COLORS.white,
  buttonDestructiveActiveBackgroundColor: BRAND_COLORS.white,
  calendarDateTextColor: BRAND_COLORS.skyBlue,
  calendarDateTextHoverColor: BRAND_COLORS.skyGrayTint01,
  calendarDateTextActiveColor: BRAND_COLORS.skyGray,
  calendarDateTextFocusColor: BRAND_COLORS.skyBlue,
  calendarDateTextSelectedColor: BRAND_COLORS.white,
  calendarDateSelectedBackgroundColor: BRAND_COLORS.skyBlueShade01,
  calendarDateFocusedBorderColor: BRAND_COLORS.skyBlue,
  calendarNudgerIconColor: BRAND_COLORS.skyBlue,
  calendarNudgerIconHoverColor: BRAND_COLORS.skyBlueShade01,
  calendarNudgerIconActiveColor: BRAND_COLORS.skyBlueShade02,
  checkboxCheckedColor: BRAND_COLORS.skyBlue,
  linkColor: BRAND_COLORS.skyBlue,
  linkHoverColor: BRAND_COLORS.skyBlueShade01,
  linkActiveColor: BRAND_COLORS.skyBlueShade02,
  linkVisitedColor: BRAND_COLORS.skyBlue,
  horizontalNavLinkColor: BRAND_COLORS.skyGrayTint02,
  horizontalNavLinkHoverColor: BRAND_COLORS.skyGrayTint01,
  horizontalNavLinkActiveColor: BRAND_COLORS.skyGray,
  horizontalNavLinkSelectedColor: BRAND_COLORS.skyBlue,
  horizontalNavBarSelectedColor: BRAND_COLORS.skyBlue,
  linkAlternateColor: BRAND_COLORS.white,
  linkAlternateHoverColor: BRAND_COLORS.white,
  linkAlternateActiveColor: BRAND_COLORS.skyGrayTint06,
  linkAlternateVisitedColor: BRAND_COLORS.white,
  paginationNudgerActiveColor: BRAND_COLORS.skyBlue,
  paginationNudgerColor: BRAND_COLORS.skyBlue,
  paginationNudgerHoverColor: BRAND_COLORS.skyBlueShade02,
  paginationSelectedBackgroundColor: BRAND_COLORS.skyBlueShade02,
  progressBarFillColor: BRAND_COLORS.skyBlue,
  radioCheckedColor: BRAND_COLORS.skyBlue,
  sliderBarColor: BRAND_COLORS.skyBlueShade03,
  spinnerPrimaryColor: BRAND_COLORS.skyBlue,
  starRatingFilledColor: BRAND_COLORS.erfoud,
  navigationBarBackgroundColor: BRAND_COLORS.skyBlue,
  navigationBarTitleColor: BRAND_COLORS.white,
  navigationBarButtonLinkColor: BRAND_COLORS.white,
  navigationBarButtonLinkActiveColor: BRAND_COLORS.white,
  navigationBarButtonLinkHoverColor: BRAND_COLORS.white,
  navigationBarButtonLinkVisitedColor: BRAND_COLORS.white,
  navigationBarIconButtonColor: BRAND_COLORS.white,
  navigationBarIconButtonActiveColor: BRAND_COLORS.white,
  navigationBarIconButtonHoverColor: BRAND_COLORS.white,
  mapMarkerPrimaryBackgroundColor: BRAND_COLORS.skyBlue,
  mapMarkerSecondaryBackgroundColor: BRAND_COLORS.skyBlueShade02,
  docsSidebarBackground: BRAND_COLORS.skyBlueShade02,
  docsSidebarLink: BRAND_COLORS.skyGrayTint07,
  docsSidebarLinkBorder: BRAND_COLORS.skyGrayTint07,
  docsSidebarSelectedArrowColor: 'rgb(254,183,158)',
  primaryColor: BRAND_COLORS.skyBlue,
  colorGray50,
  colorGray100,
  colorGray300,
  colorGray500,
  colorGray700,
  colorGray900,

  ratingHighColor: BRAND_COLORS.monteverde,
  ratingMediumColor: BRAND_COLORS.kolkata,
  ratingLowColor: BRAND_COLORS.panjin,
  badgeBackgroundColor: BRAND_COLORS.erfoud,
  badgeSuccessBackgroundColor: BRAND_COLORS.monteverde,
  badgeDestructiveBackgroundColor: BRAND_COLORS.panjin,
  bannerAlertSuccessColor: BRAND_COLORS.monteverde,
  bannerAlertWarnColor: BRAND_COLORS.erfoud,
  bannerAlertErrorColor: BRAND_COLORS.panjin,
  fieldsetLabelTextColor: BRAND_COLORS.panjin,
  formValidationIconFill: BRAND_COLORS.panjin,
  formValidationTextColor: BRAND_COLORS.panjin,
  inputInvalidBorderColor: BRAND_COLORS.panjin,
  selectInvalidBorderColor: BRAND_COLORS.panjin,
  textareaInvalidBorderColor: BRAND_COLORS.panjin,
};

export default azureTheme;
