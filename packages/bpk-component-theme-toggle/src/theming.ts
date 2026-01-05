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
import {
  colorSkyGrayTint02,
  colorSkyGrayTint06,
  colorWhite,
  colorMonteverde,
  textPrimaryDay,
} from '@skyscanner/bpk-foundations-web/tokens/base.es6';

type ThemeConfig = {
  docsSidebarBackground: string;
  docsSidebarLink: string;
  docsSidebarLinkBorder: string;
  docsSidebarSelectedArrowColor: string;
  fontSize: string;
  primaryColor300: string;
  primaryColor500: string;
  primaryColor600: string;
  primaryColor700: string;
  secondaryColor500: string;
  secondaryColor600: string;
  secondaryColor700: string;
  themeName: string;
};

export type Theme = {
  themeName: string;
  primaryColor: string;
  logoFillColor: string;
  accordionActiveColor: string;
  accordionColor: string;
  accordionHoverColor: string;
  badgeBackgroundColor: string;
  badgeSuccessBackgroundColor: string;
  badgeDestructiveBackgroundColor: string;
  bannerAlertPrimaryColor: string;
  bannerAlertSuccessColor: string;
  bannerAlertWarnColor: string;
  bannerAlertErrorColor: string;
  barchartBarBackgroundColor: string;
  barchartBarHoverBackgroundColor: string;
  barchartBarActiveBackgroundColor: string;
  barchartBarSelectedBackgroundColor: string;
  blockquoteBarColor: string;
  buttonFontSize: string;
  buttonPrimaryTextColor: string;
  buttonPrimaryHoverTextColor: string;
  buttonPrimaryActiveTextColor: string;
  buttonPrimaryGradientStartColor: string;
  buttonPrimaryGradientEndColor: string;
  buttonPrimaryBackgroundColor: string;
  buttonPrimaryHoverBackgroundColor: string;
  buttonPrimaryActiveBackgroundColor: string;
  buttonSecondaryTextColor: string;
  buttonSecondaryHoverTextColor: string;
  buttonSecondaryActiveTextColor: string;
  buttonSecondaryBorderColor: string;
  buttonSecondaryHoverBorderColor: string;
  buttonSecondaryActiveBorderColor: string;
  buttonSecondaryBackgroundColor: string;
  buttonSecondaryHoverBackgroundColor: string;
  buttonSecondaryActiveBackgroundColor: string;
  buttonFeaturedTextColor: string;
  buttonFeaturedHoverTextColor: string;
  buttonFeaturedActiveTextColor: string;
  buttonFeaturedGradientStartColor: string;
  buttonFeaturedGradientEndColor: string;
  buttonFeaturedBackgroundColor: string;
  buttonFeaturedHoverBackgroundColor: string;
  buttonFeaturedActiveBackgroundColor: string;
  buttonDestructiveTextColor: string;
  buttonDestructiveHoverTextColor: string;
  buttonDestructiveActiveTextColor: string;
  buttonDestructiveBorderColor: string;
  buttonDestructiveHoverBorderColor: string;
  buttonDestructiveActiveBorderColor: string;
  buttonDestructiveBackgroundColor: string;
  buttonDestructiveHoverBackgroundColor: string;
  buttonDestructiveActiveBackgroundColor: string;
  chipDefaultSelectedBackgroundColor: string;
  chipDefaultSelectedTextColor: string;
  chipOnDarkSelectedBackgroundColor: string;
  chipOnDarkSelectedTextColor: string;
  chipOnImageSelectedBackgroundColor: string;
  chipOnImageSelectedHoverBackgroundColor: string;
  chipOnImageSelectedActiveBackgroundColor: string;
  chipOnImageSelectedTextColor: string;
  fieldsetLabelTextColor: string;
  formValidationIconFill: string;
  formValidationTextColor: string;
  inputInvalidBorderColor: string;
  linkColor: string;
  linkHoverColor: string;
  linkActiveColor: string;
  linkVisitedColor: string;
  linkAlternateColor: string;
  linkAlternateHoverColor: string;
  linkAlternateActiveColor: string;
  linkAlternateVisitedColor: string;
  horizontalNavBarSelectedColor: string;
  horizontalNavLinkSelectedColor: string;
  horizontalNavLinkColor: string;
  horizontalNavLinkHoverColor: string;
  horizontalNavLinkActiveColor: string;
  selectInvalidBorderColor: string;
  spinnerPrimaryColor: string;
  starRatingFilledColor: string;
  sliderBarColor: string;
  textareaInvalidBorderColor: string;
  paginationNudgerActiveColor: string;
  paginationNudgerColor: string;
  paginationNudgerHoverColor: string;
  paginationSelectedBackgroundColor: string;
  progressBarFillColor: string;
  calendarDateTextColor: string;
  calendarDateTextHoverColor: string;
  calendarDateTextActiveColor: string;
  calendarDateTextFocusColor: string;
  calendarDateTextSelectedColor: string;
  calendarDateSelectedBackgroundColor: string;
  calendarDateFocusedBorderColor: string;
  calendarNudgerIconColor: string;
  calendarNudgerIconHoverColor: string;
  calendarNudgerIconActiveColor: string;
  checkboxCheckedColor: string;
  radioCheckedColor: string;
  switchCheckedColor: string;
  ratingHighTextColor: string;
  ratingHighColor: string;
  ratingMediumTextColor: string;
  ratingMediumColor: string;
  ratingLowColor: string;
  iconMarkerDefaultBackgroundColor: string;
  iconMarkerDefaultSelectedColor: string;
  iconMarkerDefaultDisabledColor: string;
  iconMarkerDefaultDisabledBackgroundColor: string;
  priceMarkerBackgroundColor: string;
  priceMarkerSelectedBorderColor: string;
  priceMarkerSelectedColor: string;
  priceMarkerViewedBackgroundColor: string;
  priceMarkerViewedBorderColor: string;
  priceMarkerViewedColor: string;
  skipLinkBackgroundColor: string;
  navigationBarIconButtonColor: string;
  navigationBarIconButtonHoverColor: string;
  navigationBarIconButtonActiveColor: string;
  navigationBarButtonLinkColor: string;
  navigationBarButtonLinkHoverColor: string;
  navigationBarButtonLinkActiveColor: string;
  navigationBarButtonLinkVisitedColor: string;
  navigationBarTitleColor: string;
  navigationBarBackgroundColor: string;
  docsSidebarBackground: string;
  docsSidebarLink: string;
  docsSidebarLinkBorder: string;
  docsSidebarSelectedArrowColor: string;
};

const generateTheme = ({
  docsSidebarBackground,
  docsSidebarLink,
  docsSidebarLinkBorder,
  docsSidebarSelectedArrowColor,
  fontSize,
  primaryColor300,
  primaryColor500,
  primaryColor600,
  primaryColor700,
  secondaryColor500,
  secondaryColor600,
  secondaryColor700,
  themeName,
}: ThemeConfig): Theme => ({
  themeName,

  primaryColor: primaryColor500,
  logoFillColor: primaryColor500,

  accordionActiveColor: primaryColor700,
  accordionColor: primaryColor500,
  accordionHoverColor: primaryColor600,

  badgeBackgroundColor: primaryColor500,
  badgeSuccessBackgroundColor: secondaryColor500,
  badgeDestructiveBackgroundColor: colorSkyGrayTint02,

  bannerAlertPrimaryColor: colorMonteverde,
  bannerAlertSuccessColor: secondaryColor500,
  bannerAlertWarnColor: 'orange',
  bannerAlertErrorColor: primaryColor500,

  barchartBarBackgroundColor: primaryColor300,
  barchartBarHoverBackgroundColor: primaryColor500,
  barchartBarActiveBackgroundColor: primaryColor600,
  barchartBarSelectedBackgroundColor: primaryColor700,

  blockquoteBarColor: primaryColor500,

  buttonFontSize: fontSize,

  buttonPrimaryTextColor: colorWhite,
  buttonPrimaryHoverTextColor: colorWhite,
  buttonPrimaryActiveTextColor: colorWhite,
  buttonPrimaryGradientStartColor: secondaryColor500,
  buttonPrimaryGradientEndColor: secondaryColor600,
  buttonPrimaryBackgroundColor: secondaryColor600,
  buttonPrimaryHoverBackgroundColor: secondaryColor600,
  buttonPrimaryActiveBackgroundColor: secondaryColor700,

  buttonSecondaryTextColor: primaryColor500,
  buttonSecondaryHoverTextColor: primaryColor600,
  buttonSecondaryActiveTextColor: primaryColor700,
  buttonSecondaryBorderColor: colorSkyGrayTint06,
  buttonSecondaryHoverBorderColor: primaryColor600,
  buttonSecondaryActiveBorderColor: primaryColor700,
  buttonSecondaryBackgroundColor: colorWhite,
  buttonSecondaryHoverBackgroundColor: colorWhite,
  buttonSecondaryActiveBackgroundColor: colorWhite,

  buttonFeaturedTextColor: colorWhite,
  buttonFeaturedHoverTextColor: colorWhite,
  buttonFeaturedActiveTextColor: colorWhite,
  buttonFeaturedGradientStartColor: primaryColor500,
  buttonFeaturedGradientEndColor: primaryColor600,
  buttonFeaturedBackgroundColor: primaryColor600,
  buttonFeaturedHoverBackgroundColor: primaryColor600,
  buttonFeaturedActiveBackgroundColor: primaryColor700,

  buttonDestructiveTextColor: secondaryColor500,
  buttonDestructiveHoverTextColor: secondaryColor600,
  buttonDestructiveActiveTextColor: secondaryColor700,
  buttonDestructiveBorderColor: colorSkyGrayTint06,
  buttonDestructiveHoverBorderColor: secondaryColor500,
  buttonDestructiveActiveBorderColor: secondaryColor500,
  buttonDestructiveBackgroundColor: colorWhite,
  buttonDestructiveHoverBackgroundColor: colorWhite,
  buttonDestructiveActiveBackgroundColor: colorWhite,

  chipDefaultSelectedBackgroundColor: primaryColor500,
  chipDefaultSelectedTextColor: colorWhite,

  chipOnDarkSelectedBackgroundColor: primaryColor500,
  chipOnDarkSelectedTextColor: colorWhite,

  chipOnImageSelectedBackgroundColor: primaryColor500,
  chipOnImageSelectedHoverBackgroundColor: primaryColor500,
  chipOnImageSelectedActiveBackgroundColor: primaryColor500,
  chipOnImageSelectedTextColor: colorWhite,

  fieldsetLabelTextColor: secondaryColor500,

  formValidationIconFill: secondaryColor500,
  formValidationTextColor: secondaryColor500,

  inputInvalidBorderColor: secondaryColor500,

  linkColor: primaryColor300,
  linkHoverColor: primaryColor500,
  linkActiveColor: primaryColor600,
  linkVisitedColor: primaryColor700,

  linkAlternateColor: colorWhite,
  linkAlternateHoverColor: colorWhite,
  linkAlternateActiveColor: colorSkyGrayTint06,
  linkAlternateVisitedColor: colorWhite,

  horizontalNavBarSelectedColor: primaryColor500,
  horizontalNavLinkSelectedColor: primaryColor500,
  horizontalNavLinkColor: primaryColor500,
  horizontalNavLinkHoverColor: primaryColor500,
  horizontalNavLinkActiveColor: primaryColor500,

  selectInvalidBorderColor: secondaryColor500,

  spinnerPrimaryColor: primaryColor500,

  starRatingFilledColor: primaryColor500,

  sliderBarColor: primaryColor500,

  textareaInvalidBorderColor: secondaryColor500,

  paginationNudgerActiveColor: primaryColor500,
  paginationNudgerColor: primaryColor500,
  paginationNudgerHoverColor: primaryColor700,
  paginationSelectedBackgroundColor: primaryColor700,

  progressBarFillColor: primaryColor500,

  calendarDateTextColor: primaryColor500,
  calendarDateTextHoverColor: textPrimaryDay,
  calendarDateTextActiveColor: textPrimaryDay,
  calendarDateTextFocusColor: primaryColor500,
  calendarDateTextSelectedColor: colorWhite,
  calendarDateSelectedBackgroundColor: primaryColor700,
  calendarDateFocusedBorderColor: primaryColor500,
  calendarNudgerIconColor: primaryColor500,
  calendarNudgerIconHoverColor: primaryColor600,
  calendarNudgerIconActiveColor: primaryColor700,

  checkboxCheckedColor: primaryColor700,
  radioCheckedColor: primaryColor700,
  switchCheckedColor: primaryColor700,

  ratingHighTextColor: 'black',
  ratingHighColor: primaryColor500,
  ratingMediumTextColor: colorWhite,
  ratingMediumColor: secondaryColor500,
  ratingLowColor: colorSkyGrayTint02,

  iconMarkerDefaultBackgroundColor: primaryColor500,
  iconMarkerDefaultSelectedColor: primaryColor500,
  iconMarkerDefaultDisabledColor: primaryColor700,
  iconMarkerDefaultDisabledBackgroundColor: primaryColor300,

  priceMarkerBackgroundColor: primaryColor700,

  priceMarkerSelectedBorderColor: primaryColor700,
  priceMarkerSelectedColor: primaryColor700,

  priceMarkerViewedBackgroundColor: primaryColor300,
  priceMarkerViewedBorderColor: primaryColor300,
  priceMarkerViewedColor: colorWhite,

  skipLinkBackgroundColor: secondaryColor500,

  navigationBarIconButtonColor: colorWhite,
  navigationBarIconButtonHoverColor: colorWhite,
  navigationBarIconButtonActiveColor: colorWhite,
  navigationBarButtonLinkColor: colorWhite,
  navigationBarButtonLinkHoverColor: colorWhite,
  navigationBarButtonLinkActiveColor: colorWhite,
  navigationBarButtonLinkVisitedColor: colorWhite,
  navigationBarTitleColor: colorWhite,
  navigationBarBackgroundColor: primaryColor500,
  docsSidebarBackground,
  docsSidebarLink,
  docsSidebarLinkBorder,
  docsSidebarSelectedArrowColor,
});

const londonTheme: ThemeConfig = {
  primaryColor300: '#F28494',
  primaryColor500: '#ED1B28',
  primaryColor600: '#D11622',
  primaryColor700: '#B1121C',
  secondaryColor500: '#013A76',
  secondaryColor600: '#002F61',
  secondaryColor700: '#00254B',
  fontSize: '1.2rem',
  docsSidebarBackground: '#013A76',
  docsSidebarLink: '#6889AB',
  docsSidebarLinkBorder: '#6889AB',
  docsSidebarSelectedArrowColor: '#ED1B28',
  themeName: 'London',
};

const hongKongTheme: ThemeConfig = {
  primaryColor300: '#108685',
  primaryColor500: '#006463',
  primaryColor600: '#024D4D',
  primaryColor700: '#013838',
  secondaryColor500: '#4C4C4C',
  secondaryColor600: '#3C3C3C',
  secondaryColor700: '#2A2A2A',
  fontSize: '1.2rem',
  docsSidebarBackground: '#4C4C4C',
  docsSidebarLink: '#686868',
  docsSidebarLinkBorder: '#686868',
  docsSidebarSelectedArrowColor: '#108685',
  themeName: 'HongKong',
};

const dohaTheme: ThemeConfig = {
  primaryColor300: '#BF3671',
  primaryColor500: '#9B104C',
  primaryColor600: '#7F083B',
  primaryColor700: '#5E072C',
  secondaryColor500: '#ffc107',
  secondaryColor600: '#ffb300',
  secondaryColor700: '#ffa000',
  fontSize: '1.2rem',
  docsSidebarBackground: '#5E072C',
  docsSidebarLink: '#BF3671',
  docsSidebarLinkBorder: '#BF3671',
  docsSidebarSelectedArrowColor: '#BF3671',
  themeName: 'Doha',
};

const bpkCustomThemes: { [key: string]: Theme } = {
  London: generateTheme(londonTheme),
  'Hong Kong': generateTheme(hongKongTheme),
  Doha: generateTheme(dohaTheme),
};

export default bpkCustomThemes;
