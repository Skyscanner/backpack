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

// GENERATED — do not edit by hand. Run: pnpm -w run build:theme-types

export type BpkThemedValue = string | { light?: string; dark?: string };

export interface BpkAutosuggestTheme {
  /** --bpk-private-autosuggest-colour-bg-default */
  colourBgDefault?: BpkThemedValue;
  /** --bpk-private-autosuggest-colour-bg-hover */
  colourBgHover?: BpkThemedValue;
  /** --bpk-private-autosuggest-colour-border-default */
  colourBorderDefault?: BpkThemedValue;
  /** --bpk-private-autosuggest-colour-text-close */
  colourTextClose?: BpkThemedValue;
}

export interface BpkBadgeTheme {
  /** --bpk-private-badge-colour-bg-default */
  colourBgDefault?: BpkThemedValue;
  /** --bpk-private-badge-colour-bg-inverse */
  colourBgInverse?: BpkThemedValue;
  /** --bpk-private-badge-colour-bg-outline */
  colourBgOutline?: BpkThemedValue;
  /** --bpk-private-badge-colour-bg-subtle */
  colourBgSubtle?: BpkThemedValue;
  /** --bpk-private-badge-colour-stroke-outline */
  colourStrokeOutline?: BpkThemedValue;
  /** --bpk-private-badge-dimension-padding-horizontal-default */
  dimensionPaddingHorizontalDefault?: BpkThemedValue;
  /** --bpk-private-badge-dimension-padding-horizontal-subtle */
  dimensionPaddingHorizontalSubtle?: BpkThemedValue;
}

export interface BpkButtonTheme {
  /** --bpk-private-button-colour-bg-destructive */
  colourBgDestructive?: BpkThemedValue;
  /** --bpk-private-button-colour-bg-destructive-pressed */
  colourBgDestructivePressed?: BpkThemedValue;
  /** --bpk-private-button-colour-bg-disabled */
  colourBgDisabled?: BpkThemedValue;
  /** --bpk-private-button-colour-bg-feature-pressed */
  colourBgFeaturePressed?: BpkThemedValue;
  /** --bpk-private-button-colour-bg-featured */
  colourBgFeatured?: BpkThemedValue;
  /** --bpk-private-button-colour-bg-footer */
  colourBgFooter?: BpkThemedValue;
  /** --bpk-private-button-colour-bg-footer-pressed */
  colourBgFooterPressed?: BpkThemedValue;
  /** --bpk-private-button-colour-bg-primary */
  colourBgPrimary?: BpkThemedValue;
  /** --bpk-private-button-colour-bg-primary-pressed */
  colourBgPrimaryPressed?: BpkThemedValue;
  /** --bpk-private-button-colour-bg-primary-on-dark */
  colourBgPrimaryOnDark?: BpkThemedValue;
  /** --bpk-private-button-colour-bg-primary-on-dark-pressed */
  colourBgPrimaryOnDarkPressed?: BpkThemedValue;
  /** --bpk-private-button-colour-bg-primary-on-light */
  colourBgPrimaryOnLight?: BpkThemedValue;
  /** --bpk-private-button-colour-bg-primary-on-light-pressed */
  colourBgPrimaryOnLightPressed?: BpkThemedValue;
  /** --bpk-private-button-colour-bg-secondary */
  colourBgSecondary?: BpkThemedValue;
  /** --bpk-private-button-colour-bg-secondary-pressed */
  colourBgSecondaryPressed?: BpkThemedValue;
  /** --bpk-private-button-colour-bg-secondary-on-contrast */
  colourBgSecondaryOnContrast?: BpkThemedValue;
  /** --bpk-private-button-colour-bg-secondary-on-contrast-pressed */
  colourBgSecondaryOnContrastPressed?: BpkThemedValue;
  /** --bpk-private-button-colour-bg-secondary-on-dark */
  colourBgSecondaryOnDark?: BpkThemedValue;
  /** --bpk-private-button-colour-bg-secondary-on-dark-disabled */
  colourBgSecondaryOnDarkDisabled?: BpkThemedValue;
  /** --bpk-private-button-colour-bg-secondary-on-dark-pressed */
  colourBgSecondaryOnDarkPressed?: BpkThemedValue;
  /** --bpk-private-button-colour-text-destructive */
  colourTextDestructive?: BpkThemedValue;
  /** --bpk-private-button-colour-text-feature */
  colourTextFeature?: BpkThemedValue;
  /** --bpk-private-button-colour-text-footer */
  colourTextFooter?: BpkThemedValue;
  /** --bpk-private-button-colour-text-link-on-dark */
  colourTextLinkOnDark?: BpkThemedValue;
  /** --bpk-private-button-colour-text-secondary */
  colourTextSecondary?: BpkThemedValue;
  /** --bpk-private-button-dimension-radius */
  dimensionRadius?: BpkThemedValue;
  /** --bpk-private-button-dimension-min-height-default */
  dimensionMinHeightDefault?: BpkThemedValue;
  /** --bpk-private-button-dimension-padding-horizontal-default */
  dimensionPaddingHorizontalDefault?: BpkThemedValue;
  /** --bpk-private-button-dimension-padding-horizontal-large */
  dimensionPaddingHorizontalLarge?: BpkThemedValue;
  /** --bpk-private-button-colour-text-destructive-pressed */
  colourTextDestructivePressed?: BpkThemedValue;
  /** --bpk-private-button-colour-text-disabled */
  colourTextDisabled?: BpkThemedValue;
  /** --bpk-private-button-colour-text-link */
  colourTextLink?: BpkThemedValue;
  /** --bpk-private-button-colour-text-primary */
  colourTextPrimary?: BpkThemedValue;
  /** --bpk-private-button-colour-text-primary-on-dark */
  colourTextPrimaryOnDark?: BpkThemedValue;
  /** --bpk-private-button-colour-text-primary-on-light */
  colourTextPrimaryOnLight?: BpkThemedValue;
  /** --bpk-private-button-colour-text-secondary-on-dark */
  colourTextSecondaryOnDark?: BpkThemedValue;
  /** --bpk-private-button-dimension-min-height-large */
  dimensionMinHeightLarge?: BpkThemedValue;
}

export interface BpkCardButtonTheme {
  /** --bpk-private-card-button-contained-fill */
  containedFill?: BpkThemedValue;
  /** --bpk-private-card-button-max-height */
  maxHeight?: BpkThemedValue;
}

export interface BpkCarouselTriggerTheme {
  /** --bpk-private-carousel-trigger-bg-default */
  bgDefault?: BpkThemedValue;
  /** --bpk-private-carousel-trigger-bg-default-hover */
  bgDefaultHover?: BpkThemedValue;
}

export interface BpkCheckboxTheme {
  /** --bpk-private-checkbox-bg-default-checked */
  bgDefaultChecked?: BpkThemedValue;
  /** --bpk-private-checkbox-bg-default-intermediate */
  bgDefaultIntermediate?: BpkThemedValue;
  /** --bpk-private-checkbox-bg-on-contrast-checked */
  bgOnContrastChecked?: BpkThemedValue;
  /** --bpk-private-checkbox-bg-on-contrast-intermediate */
  bgOnContrastIntermediate?: BpkThemedValue;
  /** --bpk-private-checkbox-border-default-disabled */
  borderDefaultDisabled?: BpkThemedValue;
  /** --bpk-private-checkbox-border-default-not-checked */
  borderDefaultNotChecked?: BpkThemedValue;
  /** --bpk-private-checkbox-border-on-contrast-disabled */
  borderOnContrastDisabled?: BpkThemedValue;
  /** --bpk-private-checkbox-border-on-contrast-not-checked */
  borderOnContrastNotChecked?: BpkThemedValue;
  /** --bpk-private-checkbox-icon-on-contrast */
  iconOnContrast?: BpkThemedValue;
  /** --bpk-private-checkbox-stroke */
  stroke?: BpkThemedValue;
}

export interface BpkChipGroupFilterTheme {
  /** --bpk-private-chip-group-filter-colour-bg-icon-hover-on-image */
  colourBgIconHoverOnImage?: BpkThemedValue;
  /** --bpk-private-chip-group-filter-colour-bg-icon-off-on-image */
  colourBgIconOffOnImage?: BpkThemedValue;
  /** --bpk-private-chip-group-filter-colour-bg-icon-on-default */
  colourBgIconOnDefault?: BpkThemedValue;
  /** --bpk-private-chip-group-filter-colour-bg-icon-on-on-dark */
  colourBgIconOnOnDark?: BpkThemedValue;
  /** --bpk-private-chip-group-filter-colour-bg-icon-on-on-image */
  colourBgIconOnOnImage?: BpkThemedValue;
  /** --bpk-private-chip-group-filter-colour-stroke-icon-hover-default */
  colourStrokeIconHoverDefault?: BpkThemedValue;
  /** --bpk-private-chip-group-filter-colour-stroke-icon-hover-on-dark */
  colourStrokeIconHoverOnDark?: BpkThemedValue;
  /** --bpk-private-chip-group-filter-colour-stroke-icon-off-default */
  colourStrokeIconOffDefault?: BpkThemedValue;
  /** --bpk-private-chip-group-filter-colour-stroke-icon-off-on-dark */
  colourStrokeIconOffOnDark?: BpkThemedValue;
  /** --bpk-private-chip-group-filter-dimensions-min-height */
  dimensionsMinHeight?: BpkThemedValue;
}

export interface BpkChipTheme {
  /** --bpk-private-chip-colour-bg-default-dismissible-hover */
  colourBgDefaultDismissibleHover?: BpkThemedValue;
  /** --bpk-private-chip-colour-bg-default-hover */
  colourBgDefaultHover?: BpkThemedValue;
  /** --bpk-private-chip-colour-bg-default-off */
  colourBgDefaultOff?: BpkThemedValue;
  /** --bpk-private-chip-colour-bg-default-on */
  colourBgDefaultOn?: BpkThemedValue;
  /** --bpk-private-chip-colour-bg-disabled */
  colourBgDisabled?: BpkThemedValue;
  /** --bpk-private-chip-colour-bg-on-contrast-hover */
  colourBgOnContrastHover?: BpkThemedValue;
  /** --bpk-private-chip-colour-bg-on-contrast-on */
  colourBgOnContrastOn?: BpkThemedValue;
  /** --bpk-private-chip-colour-bg-on-dark-dismissible-hover */
  colourBgOnDarkDismissibleHover?: BpkThemedValue;
  /** --bpk-private-chip-colour-bg-on-dark-hover */
  colourBgOnDarkHover?: BpkThemedValue;
  /** --bpk-private-chip-colour-bg-on-dark-off */
  colourBgOnDarkOff?: BpkThemedValue;
  /** --bpk-private-chip-colour-bg-on-dark-on */
  colourBgOnDarkOn?: BpkThemedValue;
  /** --bpk-private-chip-colour-bg-on-image-dismissible-hover */
  colourBgOnImageDismissibleHover?: BpkThemedValue;
  /** --bpk-private-chip-colour-bg-on-image-on */
  colourBgOnImageOn?: BpkThemedValue;
  /** --bpk-private-chip-colour-border-default-dismissible-hover */
  colourBorderDefaultDismissibleHover?: BpkThemedValue;
  /** --bpk-private-chip-colour-border-default-hover */
  colourBorderDefaultHover?: BpkThemedValue;
  /** --bpk-private-chip-colour-border-default-off */
  colourBorderDefaultOff?: BpkThemedValue;
  /** --bpk-private-chip-colour-border-on-contrast-off */
  colourBorderOnContrastOff?: BpkThemedValue;
  /** --bpk-private-chip-colour-border-on-contrast-on */
  colourBorderOnContrastOn?: BpkThemedValue;
  /** --bpk-private-chip-colour-border-on-dark-dismissible-hover */
  colourBorderOnDarkDismissibleHover?: BpkThemedValue;
  /** --bpk-private-chip-colour-border-on-dark-hover */
  colourBorderOnDarkHover?: BpkThemedValue;
  /** --bpk-private-chip-colour-border-on-dark-off */
  colourBorderOnDarkOff?: BpkThemedValue;
  /** --bpk-private-chip-colour-stroke-off-on-canvas-contrast-new */
  colourStrokeOffOnCanvasContrastNew?: BpkThemedValue;
  /** --bpk-private-chip-colour-text-default-dismissible-hover */
  colourTextDefaultDismissibleHover?: BpkThemedValue;
  /** --bpk-private-chip-colour-text-dismissible-on-icon */
  colourTextDismissibleOnIcon?: BpkThemedValue;
  /** --bpk-private-chip-colour-text-on */
  colourTextOn?: BpkThemedValue;
  /** --bpk-private-chip-colour-text-on-image */
  colourTextOnImage?: BpkThemedValue;
  /** --bpk-private-chip-colour-text-on-image-dismissible-icon */
  colourTextOnImageDismissibleIcon?: BpkThemedValue;
  /** --bpk-private-chip-colour-text-on-dark */
  colourTextOnDark?: BpkThemedValue;
  /** --bpk-private-chip-colour-text-on-dark-dismissible-hover */
  colourTextOnDarkDismissibleHover?: BpkThemedValue;
  /** --bpk-private-chip-colour-text-on-dark-dismissible-icon */
  colourTextOnDarkDismissibleIcon?: BpkThemedValue;
  /** --bpk-private-chip-dimension-border */
  dimensionBorder?: BpkThemedValue;
  /** --bpk-private-chip-dimension-min-height-width */
  dimensionMinHeightWidth?: BpkThemedValue;
  /** --bpk-private-chip-dimension-radius */
  dimensionRadius?: BpkThemedValue;
}

export interface BpkDateSelectorTheme {
  /** --bpk-private-date-selector-cheapest-month-highlight */
  cheapestMonthHighlight?: BpkThemedValue;
  /** --bpk-private-date-selector-flexible-date-card */
  flexibleDateCard?: BpkThemedValue;
}

export interface BpkInfoBannerTheme {
  /** --bpk-private-info-banner-default */
  default?: BpkThemedValue;
  /** --bpk-private-info-banner-on-contrast */
  onContrast?: BpkThemedValue;
}

export interface BpkMapTheme {
  /** --bpk-private-map-cluster-pin */
  clusterPin?: BpkThemedValue;
  /** --bpk-private-map-cluster-pin-previous-selection */
  clusterPinPreviousSelection?: BpkThemedValue;
  /** --bpk-private-map-marker-viewed */
  markerViewed?: BpkThemedValue;
  /** --bpk-private-map-poi-pin */
  poiPin?: BpkThemedValue;
  /** --bpk-private-map-previous-selection */
  previousSelection?: BpkThemedValue;
}

export interface BpkNavigationTabsTheme {
  /** --bpk-private-navigation-tabs-hover */
  hover?: BpkThemedValue;
  /** --bpk-private-navigation-tabs-outline */
  outline?: BpkThemedValue;
  /** --bpk-private-navigation-tabs-selected */
  selected?: BpkThemedValue;
}

export interface BpkRadioTheme {
  /** --bpk-private-radio-bg-default-disabled */
  bgDefaultDisabled?: BpkThemedValue;
  /** --bpk-private-radio-bg-default-on */
  bgDefaultOn?: BpkThemedValue;
  /** --bpk-private-radio-bg-on-contrast-off */
  bgOnContrastOff?: BpkThemedValue;
  /** --bpk-private-radio-bg-on-contrast-on */
  bgOnContrastOn?: BpkThemedValue;
  /** --bpk-private-radio-border */
  border?: BpkThemedValue;
  /** --bpk-private-radio-border-default-off */
  borderDefaultOff?: BpkThemedValue;
}

export interface BpkRatingBarTheme {
  /** --bpk-private-rating-bar-default */
  default?: BpkThemedValue;
  /** --bpk-private-rating-bar-on-contrast */
  onContrast?: BpkThemedValue;
}

export interface BpkSegmentedControlTheme {
  /** --bpk-private-segmented-control-colour-bg-on-canvas-default-default */
  colourBgOnCanvasDefaultDefault?: BpkThemedValue;
  /** --bpk-private-segmented-control-colour-bg-on-surface-contrast-default */
  colourBgOnSurfaceContrastDefault?: BpkThemedValue;
  /** --bpk-private-segmented-control-colour-bg-on-surface-contrast-selected */
  colourBgOnSurfaceContrastSelected?: BpkThemedValue;
  /** --bpk-private-segmented-control-colour-bg-selected */
  colourBgSelected?: BpkThemedValue;
  /** --bpk-private-segmented-control-colour-divider-default */
  colourDividerDefault?: BpkThemedValue;
  /** --bpk-private-segmented-control-colour-divider-on-surface-contrast */
  colourDividerOnSurfaceContrast?: BpkThemedValue;
  /** --bpk-private-segmented-control-dimension-bg-indicator-radius */
  dimensionBgIndicatorRadius?: BpkThemedValue;
  /** --bpk-private-segmented-control-dimension-bg-track-radius */
  dimensionBgTrackRadius?: BpkThemedValue;
  /** --bpk-private-segmented-control-dimension-min-height */
  dimensionMinHeight?: BpkThemedValue;
  /** --bpk-private-segmented-control-dimension-track-padding */
  dimensionTrackPadding?: BpkThemedValue;
}

export interface BpkShadowTheme {
  /** --bpk-private-shadow-large-blur */
  largeBlur?: BpkThemedValue;
  /** --bpk-private-shadow-large-color */
  largeColor?: BpkThemedValue;
  /** --bpk-private-shadow-large-position-x */
  largePositionX?: BpkThemedValue;
  /** --bpk-private-shadow-large-position-y */
  largePositionY?: BpkThemedValue;
  /** --bpk-private-shadow-large-spread */
  largeSpread?: BpkThemedValue;
  /** --bpk-private-shadow-small-blur */
  smallBlur?: BpkThemedValue;
  /** --bpk-private-shadow-small-color */
  smallColor?: BpkThemedValue;
  /** --bpk-private-shadow-small-position-x */
  smallPositionX?: BpkThemedValue;
  /** --bpk-private-shadow-small-position-y */
  smallPositionY?: BpkThemedValue;
  /** --bpk-private-shadow-small-spread */
  smallSpread?: BpkThemedValue;
  /** --bpk-private-shadow-xl-blur */
  xLBlur?: BpkThemedValue;
  /** --bpk-private-shadow-xl-color */
  xLColor?: BpkThemedValue;
  /** --bpk-private-shadow-xl-position-x */
  xLPositionX?: BpkThemedValue;
  /** --bpk-private-shadow-xl-position-y */
  xLPositionY?: BpkThemedValue;
  /** --bpk-private-shadow-xl-spread */
  xLSpread?: BpkThemedValue;
}

export interface BpkSkeletonTheme {
  /** --bpk-private-skeleton-on-dark */
  onDark?: BpkThemedValue;
}

export interface BpkSliderTheme {
  /** --bpk-private-slider-bg-knob */
  bgKnob?: BpkThemedValue;
  /** --bpk-private-slider-bg-track */
  bgTrack?: BpkThemedValue;
}

export interface BpkSpeechBubbleTheme {
  /** --bpk-private-speech-bubble-colour-bg-contrast */
  colourBgContrast?: BpkThemedValue;
  /** --bpk-private-speech-bubble-colour-bg-default */
  colourBgDefault?: BpkThemedValue;
}

export interface BpkSwitchTheme {
  /** --bpk-private-switch-android-switch-default-disabled */
  androidSwitchDefaultDisabled?: BpkThemedValue;
  /** --bpk-private-switch-android-switch-knob-disabled */
  androidSwitchKnobDisabled?: BpkThemedValue;
  /** --bpk-private-switch-android-switch-on-contrast-off */
  androidSwitchOnContrastOff?: BpkThemedValue;
  /** --bpk-private-switch-android-switch-on-contrast-fill-disabled */
  androidSwitchOnContrastFillDisabled?: BpkThemedValue;
  /** --bpk-private-switch-ios-switch-default-off */
  iosSwitchDefaultOff?: BpkThemedValue;
  /** --bpk-private-switch-ios-switch-disabled */
  iosSwitchDisabled?: BpkThemedValue;
  /** --bpk-private-switch-ios-switch-on-contrast-off */
  iosSwitchOnContrastOff?: BpkThemedValue;
}

export interface BpkTripAdvisorTheme {
  /** --bpk-private-trip-advisor */
  value?: BpkThemedValue;
}

export interface BpkTheme {
  /** --bpk-canvas-contrast */
  canvasContrast?: BpkThemedValue;
  /** --bpk-canvas-default */
  canvasDefault?: BpkThemedValue;
  /** --bpk-core-accent */
  coreAccent?: BpkThemedValue;
  /** --bpk-core-eco */
  coreEco?: BpkThemedValue;
  /** --bpk-core-primary */
  corePrimary?: BpkThemedValue;
  /** --bpk-other-overlay */
  otherOverlay?: BpkThemedValue;
  /** --bpk-other-scrim */
  otherScrim?: BpkThemedValue;
  /** --bpk-other-shadow */
  otherShadow?: BpkThemedValue;
  /** --bpk-other-line-default */
  otherLineDefault?: BpkThemedValue;
  /** --bpk-other-line-on-contrast */
  otherLineOnContrast?: BpkThemedValue;
  /** --bpk-other-line-subtle */
  otherLineSubtle?: BpkThemedValue;
  /** --bpk-status-danger-spot */
  statusDangerSpot?: BpkThemedValue;
  /** --bpk-status-success-spot */
  statusSuccessSpot?: BpkThemedValue;
  /** --bpk-status-warning-spot */
  statusWarningSpot?: BpkThemedValue;
  /** --bpk-surface-contrast */
  surfaceContrast?: BpkThemedValue;
  /** --bpk-surface-danger-fill */
  surfaceDangerFill?: BpkThemedValue;
  /** --bpk-surface-default */
  surfaceDefault?: BpkThemedValue;
  /** --bpk-surface-elevated */
  surfaceElevated?: BpkThemedValue;
  /** --bpk-surface-hero */
  surfaceHero?: BpkThemedValue;
  /** --bpk-surface-highlight */
  surfaceHighlight?: BpkThemedValue;
  /** --bpk-surface-low-contrast */
  surfaceLowContrast?: BpkThemedValue;
  /** --bpk-surface-subtle */
  surfaceSubtle?: BpkThemedValue;
  /** --bpk-surface-success-fill */
  surfaceSuccessFill?: BpkThemedValue;
  /** --bpk-surface-tint */
  surfaceTint?: BpkThemedValue;
  /** --bpk-surface-warning-fill */
  surfaceWarningFill?: BpkThemedValue;
  /** --bpk-surface-promo */
  surfacePromo?: BpkThemedValue;
  /** --bpk-text-disabled */
  textDisabled?: BpkThemedValue;
  /** --bpk-text-disabled-on-dark */
  textDisabledOnDark?: BpkThemedValue;
  /** --bpk-text-error */
  textError?: BpkThemedValue;
  /** --bpk-text-inverse */
  textInverse?: BpkThemedValue;
  /** --bpk-text-on-dark */
  textOnDark?: BpkThemedValue;
  /** --bpk-text-on-light */
  textOnLight?: BpkThemedValue;
  /** --bpk-text-primary */
  textPrimary?: BpkThemedValue;
  /** --bpk-text-secondary */
  textSecondary?: BpkThemedValue;
  /** --bpk-text-secondary-on-contrast */
  textSecondaryOnContrast?: BpkThemedValue;
  /** --bpk-text-success */
  textSuccess?: BpkThemedValue;
  /** --bpk-text-deprecated-link */
  textDEPRECATEDLink?: BpkThemedValue;
  /** --bpk-text-hero */
  textHero?: BpkThemedValue;
  autosuggest?: BpkAutosuggestTheme;
  badge?: BpkBadgeTheme;
  button?: BpkButtonTheme;
  cardButton?: BpkCardButtonTheme;
  carouselTrigger?: BpkCarouselTriggerTheme;
  checkbox?: BpkCheckboxTheme;
  chipGroupFilter?: BpkChipGroupFilterTheme;
  chip?: BpkChipTheme;
  dateSelector?: BpkDateSelectorTheme;
  infoBanner?: BpkInfoBannerTheme;
  map?: BpkMapTheme;
  navigationTabs?: BpkNavigationTabsTheme;
  radio?: BpkRadioTheme;
  ratingBar?: BpkRatingBarTheme;
  segmentedControl?: BpkSegmentedControlTheme;
  shadow?: BpkShadowTheme;
  skeleton?: BpkSkeletonTheme;
  slider?: BpkSliderTheme;
  speechBubble?: BpkSpeechBubbleTheme;
  switch?: BpkSwitchTheme;
  tripAdvisor?: BpkTripAdvisorTheme;
}

/**
 * Maps a BpkTheme object to a flat Record of CSS custom property overrides.
 * Plain string values are returned directly.
 * Mode-specific `{ light, dark }` values are excluded — BpkThemeProvider
 * injects those via a `<style>` tag keyed to a generated ID.
 * @param {BpkTheme} theme - The BpkTheme object to map.
 * @returns {Record<string, string>} A flat record of CSS custom property overrides.
 */
export const themeToVars = (theme: BpkTheme): Record<string, string> => {
  const vars: Record<string, string> = {};
  const t = theme as Record<string, unknown>;
  if (typeof t.canvasContrast === 'string') vars['--bpk-canvas-contrast'] = t.canvasContrast as string;
  if (typeof t.canvasDefault === 'string') vars['--bpk-canvas-default'] = t.canvasDefault as string;
  if (typeof t.coreAccent === 'string') vars['--bpk-core-accent'] = t.coreAccent as string;
  if (typeof t.coreEco === 'string') vars['--bpk-core-eco'] = t.coreEco as string;
  if (typeof t.corePrimary === 'string') vars['--bpk-core-primary'] = t.corePrimary as string;
  if (typeof t.otherOverlay === 'string') vars['--bpk-other-overlay'] = t.otherOverlay as string;
  if (typeof t.otherScrim === 'string') vars['--bpk-other-scrim'] = t.otherScrim as string;
  if (typeof t.otherShadow === 'string') vars['--bpk-other-shadow'] = t.otherShadow as string;
  if (typeof t.otherLineDefault === 'string') vars['--bpk-other-line-default'] = t.otherLineDefault as string;
  if (typeof t.otherLineOnContrast === 'string') vars['--bpk-other-line-on-contrast'] = t.otherLineOnContrast as string;
  if (typeof t.otherLineSubtle === 'string') vars['--bpk-other-line-subtle'] = t.otherLineSubtle as string;
  if (typeof t.statusDangerSpot === 'string') vars['--bpk-status-danger-spot'] = t.statusDangerSpot as string;
  if (typeof t.statusSuccessSpot === 'string') vars['--bpk-status-success-spot'] = t.statusSuccessSpot as string;
  if (typeof t.statusWarningSpot === 'string') vars['--bpk-status-warning-spot'] = t.statusWarningSpot as string;
  if (typeof t.surfaceContrast === 'string') vars['--bpk-surface-contrast'] = t.surfaceContrast as string;
  if (typeof t.surfaceDangerFill === 'string') vars['--bpk-surface-danger-fill'] = t.surfaceDangerFill as string;
  if (typeof t.surfaceDefault === 'string') vars['--bpk-surface-default'] = t.surfaceDefault as string;
  if (typeof t.surfaceElevated === 'string') vars['--bpk-surface-elevated'] = t.surfaceElevated as string;
  if (typeof t.surfaceHero === 'string') vars['--bpk-surface-hero'] = t.surfaceHero as string;
  if (typeof t.surfaceHighlight === 'string') vars['--bpk-surface-highlight'] = t.surfaceHighlight as string;
  if (typeof t.surfaceLowContrast === 'string') vars['--bpk-surface-low-contrast'] = t.surfaceLowContrast as string;
  if (typeof t.surfaceSubtle === 'string') vars['--bpk-surface-subtle'] = t.surfaceSubtle as string;
  if (typeof t.surfaceSuccessFill === 'string') vars['--bpk-surface-success-fill'] = t.surfaceSuccessFill as string;
  if (typeof t.surfaceTint === 'string') vars['--bpk-surface-tint'] = t.surfaceTint as string;
  if (typeof t.surfaceWarningFill === 'string') vars['--bpk-surface-warning-fill'] = t.surfaceWarningFill as string;
  if (typeof t.surfacePromo === 'string') vars['--bpk-surface-promo'] = t.surfacePromo as string;
  if (typeof t.textDisabled === 'string') vars['--bpk-text-disabled'] = t.textDisabled as string;
  if (typeof t.textDisabledOnDark === 'string') vars['--bpk-text-disabled-on-dark'] = t.textDisabledOnDark as string;
  if (typeof t.textError === 'string') vars['--bpk-text-error'] = t.textError as string;
  if (typeof t.textInverse === 'string') vars['--bpk-text-inverse'] = t.textInverse as string;
  if (typeof t.textOnDark === 'string') vars['--bpk-text-on-dark'] = t.textOnDark as string;
  if (typeof t.textOnLight === 'string') vars['--bpk-text-on-light'] = t.textOnLight as string;
  if (typeof t.textPrimary === 'string') vars['--bpk-text-primary'] = t.textPrimary as string;
  if (typeof t.textSecondary === 'string') vars['--bpk-text-secondary'] = t.textSecondary as string;
  if (typeof t.textSecondaryOnContrast === 'string') vars['--bpk-text-secondary-on-contrast'] = t.textSecondaryOnContrast as string;
  if (typeof t.textSuccess === 'string') vars['--bpk-text-success'] = t.textSuccess as string;
  if (typeof t.textDEPRECATEDLink === 'string') vars['--bpk-text-deprecated-link'] = t.textDEPRECATEDLink as string;
  if (typeof t.textHero === 'string') vars['--bpk-text-hero'] = t.textHero as string;
  let ns: Record<string, BpkThemedValue> | undefined;
  ns = t.autosuggest as Record<string, BpkThemedValue> | undefined;
  if (ns) {
    if (typeof ns.colourBgDefault === 'string') vars['--bpk-private-autosuggest-colour-bg-default'] = ns.colourBgDefault as string;
    if (typeof ns.colourBgHover === 'string') vars['--bpk-private-autosuggest-colour-bg-hover'] = ns.colourBgHover as string;
    if (typeof ns.colourBorderDefault === 'string') vars['--bpk-private-autosuggest-colour-border-default'] = ns.colourBorderDefault as string;
    if (typeof ns.colourTextClose === 'string') vars['--bpk-private-autosuggest-colour-text-close'] = ns.colourTextClose as string;
  }
  ns = t.badge as Record<string, BpkThemedValue> | undefined;
  if (ns) {
    if (typeof ns.colourBgDefault === 'string') vars['--bpk-private-badge-colour-bg-default'] = ns.colourBgDefault as string;
    if (typeof ns.colourBgInverse === 'string') vars['--bpk-private-badge-colour-bg-inverse'] = ns.colourBgInverse as string;
    if (typeof ns.colourBgOutline === 'string') vars['--bpk-private-badge-colour-bg-outline'] = ns.colourBgOutline as string;
    if (typeof ns.colourBgSubtle === 'string') vars['--bpk-private-badge-colour-bg-subtle'] = ns.colourBgSubtle as string;
    if (typeof ns.colourStrokeOutline === 'string') vars['--bpk-private-badge-colour-stroke-outline'] = ns.colourStrokeOutline as string;
    if (typeof ns.dimensionPaddingHorizontalDefault === 'string') vars['--bpk-private-badge-dimension-padding-horizontal-default'] = ns.dimensionPaddingHorizontalDefault as string;
    if (typeof ns.dimensionPaddingHorizontalSubtle === 'string') vars['--bpk-private-badge-dimension-padding-horizontal-subtle'] = ns.dimensionPaddingHorizontalSubtle as string;
  }
  ns = t.button as Record<string, BpkThemedValue> | undefined;
  if (ns) {
    if (typeof ns.colourBgDestructive === 'string') vars['--bpk-private-button-colour-bg-destructive'] = ns.colourBgDestructive as string;
    if (typeof ns.colourBgDestructivePressed === 'string') vars['--bpk-private-button-colour-bg-destructive-pressed'] = ns.colourBgDestructivePressed as string;
    if (typeof ns.colourBgDisabled === 'string') vars['--bpk-private-button-colour-bg-disabled'] = ns.colourBgDisabled as string;
    if (typeof ns.colourBgFeaturePressed === 'string') vars['--bpk-private-button-colour-bg-feature-pressed'] = ns.colourBgFeaturePressed as string;
    if (typeof ns.colourBgFeatured === 'string') vars['--bpk-private-button-colour-bg-featured'] = ns.colourBgFeatured as string;
    if (typeof ns.colourBgFooter === 'string') vars['--bpk-private-button-colour-bg-footer'] = ns.colourBgFooter as string;
    if (typeof ns.colourBgFooterPressed === 'string') vars['--bpk-private-button-colour-bg-footer-pressed'] = ns.colourBgFooterPressed as string;
    if (typeof ns.colourBgPrimary === 'string') vars['--bpk-private-button-colour-bg-primary'] = ns.colourBgPrimary as string;
    if (typeof ns.colourBgPrimaryPressed === 'string') vars['--bpk-private-button-colour-bg-primary-pressed'] = ns.colourBgPrimaryPressed as string;
    if (typeof ns.colourBgPrimaryOnDark === 'string') vars['--bpk-private-button-colour-bg-primary-on-dark'] = ns.colourBgPrimaryOnDark as string;
    if (typeof ns.colourBgPrimaryOnDarkPressed === 'string') vars['--bpk-private-button-colour-bg-primary-on-dark-pressed'] = ns.colourBgPrimaryOnDarkPressed as string;
    if (typeof ns.colourBgPrimaryOnLight === 'string') vars['--bpk-private-button-colour-bg-primary-on-light'] = ns.colourBgPrimaryOnLight as string;
    if (typeof ns.colourBgPrimaryOnLightPressed === 'string') vars['--bpk-private-button-colour-bg-primary-on-light-pressed'] = ns.colourBgPrimaryOnLightPressed as string;
    if (typeof ns.colourBgSecondary === 'string') vars['--bpk-private-button-colour-bg-secondary'] = ns.colourBgSecondary as string;
    if (typeof ns.colourBgSecondaryPressed === 'string') vars['--bpk-private-button-colour-bg-secondary-pressed'] = ns.colourBgSecondaryPressed as string;
    if (typeof ns.colourBgSecondaryOnContrast === 'string') vars['--bpk-private-button-colour-bg-secondary-on-contrast'] = ns.colourBgSecondaryOnContrast as string;
    if (typeof ns.colourBgSecondaryOnContrastPressed === 'string') vars['--bpk-private-button-colour-bg-secondary-on-contrast-pressed'] = ns.colourBgSecondaryOnContrastPressed as string;
    if (typeof ns.colourBgSecondaryOnDark === 'string') vars['--bpk-private-button-colour-bg-secondary-on-dark'] = ns.colourBgSecondaryOnDark as string;
    if (typeof ns.colourBgSecondaryOnDarkDisabled === 'string') vars['--bpk-private-button-colour-bg-secondary-on-dark-disabled'] = ns.colourBgSecondaryOnDarkDisabled as string;
    if (typeof ns.colourBgSecondaryOnDarkPressed === 'string') vars['--bpk-private-button-colour-bg-secondary-on-dark-pressed'] = ns.colourBgSecondaryOnDarkPressed as string;
    if (typeof ns.colourTextDestructive === 'string') vars['--bpk-private-button-colour-text-destructive'] = ns.colourTextDestructive as string;
    if (typeof ns.colourTextFeature === 'string') vars['--bpk-private-button-colour-text-feature'] = ns.colourTextFeature as string;
    if (typeof ns.colourTextFooter === 'string') vars['--bpk-private-button-colour-text-footer'] = ns.colourTextFooter as string;
    if (typeof ns.colourTextLinkOnDark === 'string') vars['--bpk-private-button-colour-text-link-on-dark'] = ns.colourTextLinkOnDark as string;
    if (typeof ns.colourTextSecondary === 'string') vars['--bpk-private-button-colour-text-secondary'] = ns.colourTextSecondary as string;
    if (typeof ns.dimensionRadius === 'string') vars['--bpk-private-button-dimension-radius'] = ns.dimensionRadius as string;
    if (typeof ns.dimensionMinHeightDefault === 'string') vars['--bpk-private-button-dimension-min-height-default'] = ns.dimensionMinHeightDefault as string;
    if (typeof ns.dimensionPaddingHorizontalDefault === 'string') vars['--bpk-private-button-dimension-padding-horizontal-default'] = ns.dimensionPaddingHorizontalDefault as string;
    if (typeof ns.dimensionPaddingHorizontalLarge === 'string') vars['--bpk-private-button-dimension-padding-horizontal-large'] = ns.dimensionPaddingHorizontalLarge as string;
    if (typeof ns.colourTextDestructivePressed === 'string') vars['--bpk-private-button-colour-text-destructive-pressed'] = ns.colourTextDestructivePressed as string;
    if (typeof ns.colourTextDisabled === 'string') vars['--bpk-private-button-colour-text-disabled'] = ns.colourTextDisabled as string;
    if (typeof ns.colourTextLink === 'string') vars['--bpk-private-button-colour-text-link'] = ns.colourTextLink as string;
    if (typeof ns.colourTextPrimary === 'string') vars['--bpk-private-button-colour-text-primary'] = ns.colourTextPrimary as string;
    if (typeof ns.colourTextPrimaryOnDark === 'string') vars['--bpk-private-button-colour-text-primary-on-dark'] = ns.colourTextPrimaryOnDark as string;
    if (typeof ns.colourTextPrimaryOnLight === 'string') vars['--bpk-private-button-colour-text-primary-on-light'] = ns.colourTextPrimaryOnLight as string;
    if (typeof ns.colourTextSecondaryOnDark === 'string') vars['--bpk-private-button-colour-text-secondary-on-dark'] = ns.colourTextSecondaryOnDark as string;
    if (typeof ns.dimensionMinHeightLarge === 'string') vars['--bpk-private-button-dimension-min-height-large'] = ns.dimensionMinHeightLarge as string;
  }
  ns = t.cardButton as Record<string, BpkThemedValue> | undefined;
  if (ns) {
    if (typeof ns.containedFill === 'string') vars['--bpk-private-card-button-contained-fill'] = ns.containedFill as string;
    if (typeof ns.maxHeight === 'string') vars['--bpk-private-card-button-max-height'] = ns.maxHeight as string;
  }
  ns = t.carouselTrigger as Record<string, BpkThemedValue> | undefined;
  if (ns) {
    if (typeof ns.bgDefault === 'string') vars['--bpk-private-carousel-trigger-bg-default'] = ns.bgDefault as string;
    if (typeof ns.bgDefaultHover === 'string') vars['--bpk-private-carousel-trigger-bg-default-hover'] = ns.bgDefaultHover as string;
  }
  ns = t.checkbox as Record<string, BpkThemedValue> | undefined;
  if (ns) {
    if (typeof ns.bgDefaultChecked === 'string') vars['--bpk-private-checkbox-bg-default-checked'] = ns.bgDefaultChecked as string;
    if (typeof ns.bgDefaultIntermediate === 'string') vars['--bpk-private-checkbox-bg-default-intermediate'] = ns.bgDefaultIntermediate as string;
    if (typeof ns.bgOnContrastChecked === 'string') vars['--bpk-private-checkbox-bg-on-contrast-checked'] = ns.bgOnContrastChecked as string;
    if (typeof ns.bgOnContrastIntermediate === 'string') vars['--bpk-private-checkbox-bg-on-contrast-intermediate'] = ns.bgOnContrastIntermediate as string;
    if (typeof ns.borderDefaultDisabled === 'string') vars['--bpk-private-checkbox-border-default-disabled'] = ns.borderDefaultDisabled as string;
    if (typeof ns.borderDefaultNotChecked === 'string') vars['--bpk-private-checkbox-border-default-not-checked'] = ns.borderDefaultNotChecked as string;
    if (typeof ns.borderOnContrastDisabled === 'string') vars['--bpk-private-checkbox-border-on-contrast-disabled'] = ns.borderOnContrastDisabled as string;
    if (typeof ns.borderOnContrastNotChecked === 'string') vars['--bpk-private-checkbox-border-on-contrast-not-checked'] = ns.borderOnContrastNotChecked as string;
    if (typeof ns.iconOnContrast === 'string') vars['--bpk-private-checkbox-icon-on-contrast'] = ns.iconOnContrast as string;
    if (typeof ns.stroke === 'string') vars['--bpk-private-checkbox-stroke'] = ns.stroke as string;
  }
  ns = t.chipGroupFilter as Record<string, BpkThemedValue> | undefined;
  if (ns) {
    if (typeof ns.colourBgIconHoverOnImage === 'string') vars['--bpk-private-chip-group-filter-colour-bg-icon-hover-on-image'] = ns.colourBgIconHoverOnImage as string;
    if (typeof ns.colourBgIconOffOnImage === 'string') vars['--bpk-private-chip-group-filter-colour-bg-icon-off-on-image'] = ns.colourBgIconOffOnImage as string;
    if (typeof ns.colourBgIconOnDefault === 'string') vars['--bpk-private-chip-group-filter-colour-bg-icon-on-default'] = ns.colourBgIconOnDefault as string;
    if (typeof ns.colourBgIconOnOnDark === 'string') vars['--bpk-private-chip-group-filter-colour-bg-icon-on-on-dark'] = ns.colourBgIconOnOnDark as string;
    if (typeof ns.colourBgIconOnOnImage === 'string') vars['--bpk-private-chip-group-filter-colour-bg-icon-on-on-image'] = ns.colourBgIconOnOnImage as string;
    if (typeof ns.colourStrokeIconHoverDefault === 'string') vars['--bpk-private-chip-group-filter-colour-stroke-icon-hover-default'] = ns.colourStrokeIconHoverDefault as string;
    if (typeof ns.colourStrokeIconHoverOnDark === 'string') vars['--bpk-private-chip-group-filter-colour-stroke-icon-hover-on-dark'] = ns.colourStrokeIconHoverOnDark as string;
    if (typeof ns.colourStrokeIconOffDefault === 'string') vars['--bpk-private-chip-group-filter-colour-stroke-icon-off-default'] = ns.colourStrokeIconOffDefault as string;
    if (typeof ns.colourStrokeIconOffOnDark === 'string') vars['--bpk-private-chip-group-filter-colour-stroke-icon-off-on-dark'] = ns.colourStrokeIconOffOnDark as string;
    if (typeof ns.dimensionsMinHeight === 'string') vars['--bpk-private-chip-group-filter-dimensions-min-height'] = ns.dimensionsMinHeight as string;
  }
  ns = t.chip as Record<string, BpkThemedValue> | undefined;
  if (ns) {
    if (typeof ns.colourBgDefaultDismissibleHover === 'string') vars['--bpk-private-chip-colour-bg-default-dismissible-hover'] = ns.colourBgDefaultDismissibleHover as string;
    if (typeof ns.colourBgDefaultHover === 'string') vars['--bpk-private-chip-colour-bg-default-hover'] = ns.colourBgDefaultHover as string;
    if (typeof ns.colourBgDefaultOff === 'string') vars['--bpk-private-chip-colour-bg-default-off'] = ns.colourBgDefaultOff as string;
    if (typeof ns.colourBgDefaultOn === 'string') vars['--bpk-private-chip-colour-bg-default-on'] = ns.colourBgDefaultOn as string;
    if (typeof ns.colourBgDisabled === 'string') vars['--bpk-private-chip-colour-bg-disabled'] = ns.colourBgDisabled as string;
    if (typeof ns.colourBgOnContrastHover === 'string') vars['--bpk-private-chip-colour-bg-on-contrast-hover'] = ns.colourBgOnContrastHover as string;
    if (typeof ns.colourBgOnContrastOn === 'string') vars['--bpk-private-chip-colour-bg-on-contrast-on'] = ns.colourBgOnContrastOn as string;
    if (typeof ns.colourBgOnDarkDismissibleHover === 'string') vars['--bpk-private-chip-colour-bg-on-dark-dismissible-hover'] = ns.colourBgOnDarkDismissibleHover as string;
    if (typeof ns.colourBgOnDarkHover === 'string') vars['--bpk-private-chip-colour-bg-on-dark-hover'] = ns.colourBgOnDarkHover as string;
    if (typeof ns.colourBgOnDarkOff === 'string') vars['--bpk-private-chip-colour-bg-on-dark-off'] = ns.colourBgOnDarkOff as string;
    if (typeof ns.colourBgOnDarkOn === 'string') vars['--bpk-private-chip-colour-bg-on-dark-on'] = ns.colourBgOnDarkOn as string;
    if (typeof ns.colourBgOnImageDismissibleHover === 'string') vars['--bpk-private-chip-colour-bg-on-image-dismissible-hover'] = ns.colourBgOnImageDismissibleHover as string;
    if (typeof ns.colourBgOnImageOn === 'string') vars['--bpk-private-chip-colour-bg-on-image-on'] = ns.colourBgOnImageOn as string;
    if (typeof ns.colourBorderDefaultDismissibleHover === 'string') vars['--bpk-private-chip-colour-border-default-dismissible-hover'] = ns.colourBorderDefaultDismissibleHover as string;
    if (typeof ns.colourBorderDefaultHover === 'string') vars['--bpk-private-chip-colour-border-default-hover'] = ns.colourBorderDefaultHover as string;
    if (typeof ns.colourBorderDefaultOff === 'string') vars['--bpk-private-chip-colour-border-default-off'] = ns.colourBorderDefaultOff as string;
    if (typeof ns.colourBorderOnContrastOff === 'string') vars['--bpk-private-chip-colour-border-on-contrast-off'] = ns.colourBorderOnContrastOff as string;
    if (typeof ns.colourBorderOnContrastOn === 'string') vars['--bpk-private-chip-colour-border-on-contrast-on'] = ns.colourBorderOnContrastOn as string;
    if (typeof ns.colourBorderOnDarkDismissibleHover === 'string') vars['--bpk-private-chip-colour-border-on-dark-dismissible-hover'] = ns.colourBorderOnDarkDismissibleHover as string;
    if (typeof ns.colourBorderOnDarkHover === 'string') vars['--bpk-private-chip-colour-border-on-dark-hover'] = ns.colourBorderOnDarkHover as string;
    if (typeof ns.colourBorderOnDarkOff === 'string') vars['--bpk-private-chip-colour-border-on-dark-off'] = ns.colourBorderOnDarkOff as string;
    if (typeof ns.colourStrokeOffOnCanvasContrastNew === 'string') vars['--bpk-private-chip-colour-stroke-off-on-canvas-contrast-new'] = ns.colourStrokeOffOnCanvasContrastNew as string;
    if (typeof ns.colourTextDefaultDismissibleHover === 'string') vars['--bpk-private-chip-colour-text-default-dismissible-hover'] = ns.colourTextDefaultDismissibleHover as string;
    if (typeof ns.colourTextDismissibleOnIcon === 'string') vars['--bpk-private-chip-colour-text-dismissible-on-icon'] = ns.colourTextDismissibleOnIcon as string;
    if (typeof ns.colourTextOn === 'string') vars['--bpk-private-chip-colour-text-on'] = ns.colourTextOn as string;
    if (typeof ns.colourTextOnImage === 'string') vars['--bpk-private-chip-colour-text-on-image'] = ns.colourTextOnImage as string;
    if (typeof ns.colourTextOnImageDismissibleIcon === 'string') vars['--bpk-private-chip-colour-text-on-image-dismissible-icon'] = ns.colourTextOnImageDismissibleIcon as string;
    if (typeof ns.colourTextOnDark === 'string') vars['--bpk-private-chip-colour-text-on-dark'] = ns.colourTextOnDark as string;
    if (typeof ns.colourTextOnDarkDismissibleHover === 'string') vars['--bpk-private-chip-colour-text-on-dark-dismissible-hover'] = ns.colourTextOnDarkDismissibleHover as string;
    if (typeof ns.colourTextOnDarkDismissibleIcon === 'string') vars['--bpk-private-chip-colour-text-on-dark-dismissible-icon'] = ns.colourTextOnDarkDismissibleIcon as string;
    if (typeof ns.dimensionBorder === 'string') vars['--bpk-private-chip-dimension-border'] = ns.dimensionBorder as string;
    if (typeof ns.dimensionMinHeightWidth === 'string') vars['--bpk-private-chip-dimension-min-height-width'] = ns.dimensionMinHeightWidth as string;
    if (typeof ns.dimensionRadius === 'string') vars['--bpk-private-chip-dimension-radius'] = ns.dimensionRadius as string;
  }
  ns = t.dateSelector as Record<string, BpkThemedValue> | undefined;
  if (ns) {
    if (typeof ns.cheapestMonthHighlight === 'string') vars['--bpk-private-date-selector-cheapest-month-highlight'] = ns.cheapestMonthHighlight as string;
    if (typeof ns.flexibleDateCard === 'string') vars['--bpk-private-date-selector-flexible-date-card'] = ns.flexibleDateCard as string;
  }
  ns = t.infoBanner as Record<string, BpkThemedValue> | undefined;
  if (ns) {
    if (typeof ns.default === 'string') vars['--bpk-private-info-banner-default'] = ns.default as string;
    if (typeof ns.onContrast === 'string') vars['--bpk-private-info-banner-on-contrast'] = ns.onContrast as string;
  }
  ns = t.map as Record<string, BpkThemedValue> | undefined;
  if (ns) {
    if (typeof ns.clusterPin === 'string') vars['--bpk-private-map-cluster-pin'] = ns.clusterPin as string;
    if (typeof ns.clusterPinPreviousSelection === 'string') vars['--bpk-private-map-cluster-pin-previous-selection'] = ns.clusterPinPreviousSelection as string;
    if (typeof ns.markerViewed === 'string') vars['--bpk-private-map-marker-viewed'] = ns.markerViewed as string;
    if (typeof ns.poiPin === 'string') vars['--bpk-private-map-poi-pin'] = ns.poiPin as string;
    if (typeof ns.previousSelection === 'string') vars['--bpk-private-map-previous-selection'] = ns.previousSelection as string;
  }
  ns = t.navigationTabs as Record<string, BpkThemedValue> | undefined;
  if (ns) {
    if (typeof ns.hover === 'string') vars['--bpk-private-navigation-tabs-hover'] = ns.hover as string;
    if (typeof ns.outline === 'string') vars['--bpk-private-navigation-tabs-outline'] = ns.outline as string;
    if (typeof ns.selected === 'string') vars['--bpk-private-navigation-tabs-selected'] = ns.selected as string;
  }
  ns = t.radio as Record<string, BpkThemedValue> | undefined;
  if (ns) {
    if (typeof ns.bgDefaultDisabled === 'string') vars['--bpk-private-radio-bg-default-disabled'] = ns.bgDefaultDisabled as string;
    if (typeof ns.bgDefaultOn === 'string') vars['--bpk-private-radio-bg-default-on'] = ns.bgDefaultOn as string;
    if (typeof ns.bgOnContrastOff === 'string') vars['--bpk-private-radio-bg-on-contrast-off'] = ns.bgOnContrastOff as string;
    if (typeof ns.bgOnContrastOn === 'string') vars['--bpk-private-radio-bg-on-contrast-on'] = ns.bgOnContrastOn as string;
    if (typeof ns.border === 'string') vars['--bpk-private-radio-border'] = ns.border as string;
    if (typeof ns.borderDefaultOff === 'string') vars['--bpk-private-radio-border-default-off'] = ns.borderDefaultOff as string;
  }
  ns = t.ratingBar as Record<string, BpkThemedValue> | undefined;
  if (ns) {
    if (typeof ns.default === 'string') vars['--bpk-private-rating-bar-default'] = ns.default as string;
    if (typeof ns.onContrast === 'string') vars['--bpk-private-rating-bar-on-contrast'] = ns.onContrast as string;
  }
  ns = t.segmentedControl as Record<string, BpkThemedValue> | undefined;
  if (ns) {
    if (typeof ns.colourBgOnCanvasDefaultDefault === 'string') vars['--bpk-private-segmented-control-colour-bg-on-canvas-default-default'] = ns.colourBgOnCanvasDefaultDefault as string;
    if (typeof ns.colourBgOnSurfaceContrastDefault === 'string') vars['--bpk-private-segmented-control-colour-bg-on-surface-contrast-default'] = ns.colourBgOnSurfaceContrastDefault as string;
    if (typeof ns.colourBgOnSurfaceContrastSelected === 'string') vars['--bpk-private-segmented-control-colour-bg-on-surface-contrast-selected'] = ns.colourBgOnSurfaceContrastSelected as string;
    if (typeof ns.colourBgSelected === 'string') vars['--bpk-private-segmented-control-colour-bg-selected'] = ns.colourBgSelected as string;
    if (typeof ns.colourDividerDefault === 'string') vars['--bpk-private-segmented-control-colour-divider-default'] = ns.colourDividerDefault as string;
    if (typeof ns.colourDividerOnSurfaceContrast === 'string') vars['--bpk-private-segmented-control-colour-divider-on-surface-contrast'] = ns.colourDividerOnSurfaceContrast as string;
    if (typeof ns.dimensionBgIndicatorRadius === 'string') vars['--bpk-private-segmented-control-dimension-bg-indicator-radius'] = ns.dimensionBgIndicatorRadius as string;
    if (typeof ns.dimensionBgTrackRadius === 'string') vars['--bpk-private-segmented-control-dimension-bg-track-radius'] = ns.dimensionBgTrackRadius as string;
    if (typeof ns.dimensionMinHeight === 'string') vars['--bpk-private-segmented-control-dimension-min-height'] = ns.dimensionMinHeight as string;
    if (typeof ns.dimensionTrackPadding === 'string') vars['--bpk-private-segmented-control-dimension-track-padding'] = ns.dimensionTrackPadding as string;
  }
  ns = t.shadow as Record<string, BpkThemedValue> | undefined;
  if (ns) {
    if (typeof ns.largeBlur === 'string') vars['--bpk-private-shadow-large-blur'] = ns.largeBlur as string;
    if (typeof ns.largeColor === 'string') vars['--bpk-private-shadow-large-color'] = ns.largeColor as string;
    if (typeof ns.largePositionX === 'string') vars['--bpk-private-shadow-large-position-x'] = ns.largePositionX as string;
    if (typeof ns.largePositionY === 'string') vars['--bpk-private-shadow-large-position-y'] = ns.largePositionY as string;
    if (typeof ns.largeSpread === 'string') vars['--bpk-private-shadow-large-spread'] = ns.largeSpread as string;
    if (typeof ns.smallBlur === 'string') vars['--bpk-private-shadow-small-blur'] = ns.smallBlur as string;
    if (typeof ns.smallColor === 'string') vars['--bpk-private-shadow-small-color'] = ns.smallColor as string;
    if (typeof ns.smallPositionX === 'string') vars['--bpk-private-shadow-small-position-x'] = ns.smallPositionX as string;
    if (typeof ns.smallPositionY === 'string') vars['--bpk-private-shadow-small-position-y'] = ns.smallPositionY as string;
    if (typeof ns.smallSpread === 'string') vars['--bpk-private-shadow-small-spread'] = ns.smallSpread as string;
    if (typeof ns.xLBlur === 'string') vars['--bpk-private-shadow-xl-blur'] = ns.xLBlur as string;
    if (typeof ns.xLColor === 'string') vars['--bpk-private-shadow-xl-color'] = ns.xLColor as string;
    if (typeof ns.xLPositionX === 'string') vars['--bpk-private-shadow-xl-position-x'] = ns.xLPositionX as string;
    if (typeof ns.xLPositionY === 'string') vars['--bpk-private-shadow-xl-position-y'] = ns.xLPositionY as string;
    if (typeof ns.xLSpread === 'string') vars['--bpk-private-shadow-xl-spread'] = ns.xLSpread as string;
  }
  ns = t.skeleton as Record<string, BpkThemedValue> | undefined;
  if (ns) {
    if (typeof ns.onDark === 'string') vars['--bpk-private-skeleton-on-dark'] = ns.onDark as string;
  }
  ns = t.slider as Record<string, BpkThemedValue> | undefined;
  if (ns) {
    if (typeof ns.bgKnob === 'string') vars['--bpk-private-slider-bg-knob'] = ns.bgKnob as string;
    if (typeof ns.bgTrack === 'string') vars['--bpk-private-slider-bg-track'] = ns.bgTrack as string;
  }
  ns = t.speechBubble as Record<string, BpkThemedValue> | undefined;
  if (ns) {
    if (typeof ns.colourBgContrast === 'string') vars['--bpk-private-speech-bubble-colour-bg-contrast'] = ns.colourBgContrast as string;
    if (typeof ns.colourBgDefault === 'string') vars['--bpk-private-speech-bubble-colour-bg-default'] = ns.colourBgDefault as string;
  }
  ns = t.switch as Record<string, BpkThemedValue> | undefined;
  if (ns) {
    if (typeof ns.androidSwitchDefaultDisabled === 'string') vars['--bpk-private-switch-android-switch-default-disabled'] = ns.androidSwitchDefaultDisabled as string;
    if (typeof ns.androidSwitchKnobDisabled === 'string') vars['--bpk-private-switch-android-switch-knob-disabled'] = ns.androidSwitchKnobDisabled as string;
    if (typeof ns.androidSwitchOnContrastOff === 'string') vars['--bpk-private-switch-android-switch-on-contrast-off'] = ns.androidSwitchOnContrastOff as string;
    if (typeof ns.androidSwitchOnContrastFillDisabled === 'string') vars['--bpk-private-switch-android-switch-on-contrast-fill-disabled'] = ns.androidSwitchOnContrastFillDisabled as string;
    if (typeof ns.iosSwitchDefaultOff === 'string') vars['--bpk-private-switch-ios-switch-default-off'] = ns.iosSwitchDefaultOff as string;
    if (typeof ns.iosSwitchDisabled === 'string') vars['--bpk-private-switch-ios-switch-disabled'] = ns.iosSwitchDisabled as string;
    if (typeof ns.iosSwitchOnContrastOff === 'string') vars['--bpk-private-switch-ios-switch-on-contrast-off'] = ns.iosSwitchOnContrastOff as string;
  }
  ns = t.tripAdvisor as Record<string, BpkThemedValue> | undefined;
  if (ns) {
    if (typeof ns.value === 'string') vars['--bpk-private-trip-advisor'] = ns.value as string;
  }
  return vars;
};
