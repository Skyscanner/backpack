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
import {
  horizontalNavLinkColor,
  horizontalNavLinkHoverColor,
  horizontalNavLinkActiveColor,
  calendarDayHoverColor,
  calendarDayActiveColor,
  colorGray100,
  colorWhite,
} from 'bpk-tokens/tokens/base.es6';

const generateTheme = ({
  primaryColor300,
  primaryColor500,
  primaryColor600,
  primaryColor700,
  secondaryColor500,
  secondaryColor600,
  secondaryColor700,
  docsSidebarBackground,
  docsSidebarLink,
  docsSidebarLinkBorder,
  docsSidebarSelectedArrowColor,
  themeName,
}) => ({
  themeName,
  accordionActiveColor: primaryColor700,
  accordionColor: primaryColor500,
  accordionHoverColor: primaryColor600,

  barchartBarBackgroundColor: primaryColor300,
  barchartBarHoverBackgroundColor: primaryColor500,
  barchartBarActiveBackgroundColor: primaryColor600,
  barchartBarSelectedBackgroundColor: primaryColor700,

  blockquoteBarColor: primaryColor500,

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
  buttonSecondaryBorderColor: colorGray100,
  buttonSecondaryHoverBorderColor: primaryColor600,
  buttonSecondaryActiveBorderColor: primaryColor700,
  buttonSecondaryBackgroundColor: colorWhite,
  buttonSecondaryHoverBackgroundColor: colorWhite,
  buttonSecondaryActiveBackgroundColor: colorWhite,

  linkColor: primaryColor300,
  linkHoverColor: primaryColor500,
  linkActiveColor: primaryColor600,
  linkVisitedColor: primaryColor700,

  linkAlternateColor: colorWhite,
  linkAlternateHoverColor: colorWhite,
  linkAlternateActiveColor: colorGray100,
  linkAlternateVisitedColor: colorWhite,

  logoFillColor: primaryColor500,

  horizontalNavBarSelectedColor: primaryColor500,
  horizontalNavLinkSelectedColor: primaryColor500,
  horizontalNavLinkColor,
  horizontalNavLinkHoverColor,
  horizontalNavLinkActiveColor,

  spinnerPrimaryColor: primaryColor500,

  sliderBarColor: primaryColor500,

  paginationNudgerActiveColor: primaryColor500,
  paginationNudgerColor: primaryColor500,
  paginationNudgerHoverColor: primaryColor700,
  paginationSelectedBackgroundColor: primaryColor700,

  progressBarFillColor: primaryColor500,

  calendarDateTextColor: primaryColor500,
  calendarDateTextHoverColor: calendarDayHoverColor,
  calendarDateTextActiveColor: calendarDayActiveColor,
  calendarDateTextFocusColor: primaryColor500,
  calendarDateTextSelectedColor: colorWhite,
  calendarDateSelectedBackgroundColor: primaryColor700,
  calendarDateFocusedBorderColor: primaryColor500,
  calendarNudgerIconColor: primaryColor500,
  calendarNudgerIconHoverColor: primaryColor600,
  calendarNudgerIconActiveColor: primaryColor700,

  checkboxCheckedColor: primaryColor700,
  radioCheckedColor: primaryColor700,

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

const londonTheme = {
  primaryColor300: '#F28494',
  primaryColor500: '#ED1B28',
  primaryColor600: '#D11622',
  primaryColor700: '#B1121C',
  secondaryColor300: '#6889AB',
  secondaryColor500: '#013A76',
  secondaryColor600: '#002F61',
  secondaryColor700: '#00254B',
  docsSidebarBackground: '#013A76',
  docsSidebarLink: '#6889AB',
  docsSidebarLinkBorder: '#6889AB',
  docsSidebarSelectedArrowColor: '#ED1B28',
  themeName: 'London',
};

const hongKongTheme = {
  primaryColor300: '#108685',
  primaryColor500: '#006463',
  primaryColor600: '#024D4D',
  primaryColor700: '#013838',
  secondaryColor300: '#686868',
  secondaryColor500: '#4C4C4C',
  secondaryColor600: '#3C3C3C',
  secondaryColor700: '#2A2A2A',
  docsSidebarBackground: '#4C4C4C',
  docsSidebarLink: '#686868',
  docsSidebarLinkBorder: '#686868',
  docsSidebarSelectedArrowColor: '#108685',
  themeName: 'HongKong',
};

const dohaTheme = {
  primaryColor300: '#BF3671',
  primaryColor500: '#9B104C',
  primaryColor600: '#7F083B',
  primaryColor700: '#5E072C',
  secondaryColor300: '#ffd54f',
  secondaryColor500: '#ffc107',
  secondaryColor600: '#ffb300',
  secondaryColor700: '#ffa000',
  docsSidebarBackground: '#5E072C',
  docsSidebarLink: '#BF3671',
  docsSidebarLinkBorder: '#BF3671',
  docsSidebarSelectedArrowColor: '#BF3671',
  themeName: 'Doha',
};

const bpkCustomThemes = {
  London: generateTheme(londonTheme),
  'Hong Kong': generateTheme(hongKongTheme),
  Doha: generateTheme(dohaTheme),
};

export default bpkCustomThemes;
