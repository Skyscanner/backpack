/*
 * Shared Backpack token definitions.
 * Each definition points to the canonical Backpack foundations key
 * so we never duplicate raw values in this package.
 */

export const spacingTokenDefinitions = [
  { name: 'None', token: 'bpk-spacing-none', foundationKey: 'spacingNone' },
  { name: 'Sm', token: 'bpk-spacing-sm', foundationKey: 'spacingSm' },
  { name: 'Base', token: 'bpk-spacing-base', foundationKey: 'spacingBase' },
  { name: 'Md', token: 'bpk-spacing-md', foundationKey: 'spacingMd' },
  { name: 'Lg', token: 'bpk-spacing-lg', foundationKey: 'spacingLg' },
  { name: 'Xl', token: 'bpk-spacing-xl', foundationKey: 'spacingXl' },
  { name: 'Xxl', token: 'bpk-spacing-xxl', foundationKey: 'spacingXxl' },
] as const;

export const colorTokenDefinitions = [
  { name: 'TextPrimary', token: 'bpk-text-primary-day', foundationKey: 'textPrimaryDay' },
  { name: 'TextSecondary', token: 'bpk-text-secondary-day', foundationKey: 'textSecondaryDay' },
  { name: 'TextDisabled', token: 'bpk-text-disabled-day', foundationKey: 'textDisabledDay' },
  { name: 'TextOnDark', token: 'bpk-text-on-dark-day', foundationKey: 'textOnDarkDay' },
  { name: 'TextLink', token: 'bpk-text-link-day', foundationKey: 'textLinkDay' },
  { name: 'TextError', token: 'bpk-text-error-day', foundationKey: 'textErrorDay' },
  { name: 'TextSuccess', token: 'bpk-text-success-day', foundationKey: 'textSuccessDay' },
  { name: 'TextHero', token: 'bpk-text-hero-day', foundationKey: 'textHeroDay' },
  { name: 'Canvas', token: 'bpk-canvas-day', foundationKey: 'canvasDay' },
  { name: 'CanvasContrast', token: 'bpk-canvas-contrast-day', foundationKey: 'canvasContrastDay' },
  { name: 'SurfaceHighlight', token: 'bpk-surface-highlight-day', foundationKey: 'surfaceHighlightDay' },
  { name: 'SurfaceDefault', token: 'bpk-surface-default-day', foundationKey: 'surfaceDefaultDay' },
  { name: 'SurfaceElevated', token: 'bpk-surface-elevated-day', foundationKey: 'surfaceElevatedDay' },
  { name: 'CorePrimary', token: 'bpk-core-primary-day', foundationKey: 'corePrimaryDay' },
  { name: 'CoreAccent', token: 'bpk-core-accent-day', foundationKey: 'coreAccentDay' },
  { name: 'Line', token: 'bpk-line-day', foundationKey: 'lineDay' },
  { name: 'LineOnDark', token: 'bpk-line-on-dark-day', foundationKey: 'lineOnDarkDay' },
] as const;

export const breakpointTokenDefinitions = [
  {
    name: 'SmallMobile',
    simplifiedKey: 'small-mobile',
    foundationKey: 'breakpointQuerySmallMobile',
  },
  {
    name: 'Mobile',
    simplifiedKey: 'mobile',
    foundationKey: 'breakpointQueryMobile',
  },
  {
    name: 'SmallTablet',
    simplifiedKey: 'small-tablet',
    foundationKey: 'breakpointQuerySmallTablet',
  },
  {
    name: 'Tablet',
    simplifiedKey: 'tablet',
    foundationKey: 'breakpointQueryTablet',
  },
  {
    name: 'Desktop',
    simplifiedKey: 'desktop',
    foundationKey: 'breakpointQueryAboveTablet',
  },
  {
    name: 'LargeDesktop',
    simplifiedKey: 'large-desktop',
    foundationKey: 'breakpointQueryAboveDesktop',
  },
] as const;

