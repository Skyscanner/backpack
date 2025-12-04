import { spacingMap, colorMap, breakpointMap } from './theme';
import { BpkBreakpointToken } from './tokens';

export type LayoutPreset = 'default' | 'compact';
export type BreakpointPreset = 'default' | 'dense';
export type Brand = 'core' | 'partner';

type BreakpointBucket = 'base' | 'mobile' | 'desktop';

export interface LayoutConfig {
  spacingValues: Record<string, string>;
  colorValues: Record<string, string>;
  breakpointBuckets: Record<BreakpointBucket, BpkBreakpointToken[]>;
}

const spacingCssVarNames = Object.keys(spacingMap).reduce<Record<string, string>>((acc, token) => {
  acc[token] = `--bpk-${token.replace(/^bpk-/, '')}`;
  return acc;
}, {});

const colorCssVarNames = Object.keys(colorMap).reduce<Record<string, string>>((acc, token) => {
  acc[token] = `--bpk-${token.replace(/^bpk-/, '')}`;
  return acc;
}, {});

const breakpointCssVarNames = Object.keys(breakpointMap).reduce<Record<string, string>>((acc, token) => {
  acc[token] = `--bpk-breakpoint-${token}`;
  return acc;
}, {});

const breakpointBucketCssVarNames: Record<BreakpointBucket, string> = {
  base: '--bpk-breakpoint-bucket-base',
  mobile: '--bpk-breakpoint-bucket-mobile',
  desktop: '--bpk-breakpoint-bucket-desktop',
};

const toSpacingRecord = (source: Record<string, { value: string }>) => {
  const result: Record<string, string> = {};
  Object.entries(source).forEach(([token, { value }]) => {
    result[token] = value;
  });
  return result;
};

const spacingPresetValues: Record<LayoutPreset, Record<string, string>> = {
  default: toSpacingRecord(spacingMap),
  compact: toSpacingRecord(spacingMap), // Placeholder for future compact spacing values.
};

const breakpointBucketPresets: Record<BreakpointPreset, Record<BreakpointBucket, BpkBreakpointToken[]>> = {
  default: {
    base: ['small-mobile'],
    mobile: ['mobile', 'small-tablet', 'tablet'],
    desktop: ['desktop', 'large-desktop'],
  },
  dense: {
    base: ['small-mobile', 'mobile'],
    mobile: ['small-tablet', 'tablet'],
    desktop: ['desktop', 'large-desktop'],
  },
};

function resolveLayoutSpacing(preset: LayoutPreset): Record<string, string> {
  return spacingPresetValues[preset] ?? spacingPresetValues.default;
}

function resolveBreakpointBuckets(preset: BreakpointPreset): Record<BreakpointBucket, BpkBreakpointToken[]> {
  return breakpointBucketPresets[preset] ?? breakpointBucketPresets.default;
}

const brandColorValues: Record<Brand, Record<string, string>> = {
  core: colorMap,
  partner: colorMap,
};

export function resolveLayoutConfig(
  layoutPreset: LayoutPreset,
  breakpointPreset: BreakpointPreset,
  brand: Brand
): LayoutConfig {
  return {
    spacingValues: resolveLayoutSpacing(layoutPreset),
    colorValues: brandColorValues[brand] ?? colorMap,
    breakpointBuckets: resolveBreakpointBuckets(breakpointPreset),
  };
}

export function updateCssVariables(config: LayoutConfig) {
  if (typeof document === 'undefined') {
    return;
  }

  const root = document.documentElement;

  Object.entries(spacingMap).forEach(([token, { value }]) => {
    const cssVar = spacingCssVarNames[token];
    const override = config.spacingValues[token];
    root.style.setProperty(cssVar, override ?? value);
  });

  Object.entries(colorMap).forEach(([token, defaultValue]) => {
    const cssVar = colorCssVarNames[token];
    const override = config.colorValues[token];
    root.style.setProperty(cssVar, override ?? defaultValue);
  });

  Object.entries(breakpointMap).forEach(([token, query]) => {
    const cssVar = breakpointCssVarNames[token];
    root.style.setProperty(cssVar, query);
  });

  Object.entries(config.breakpointBuckets).forEach(([bucket, tokens]) => {
    const cssVar = breakpointBucketCssVarNames[bucket as BreakpointBucket];
    if (cssVar) {
      root.style.setProperty(cssVar, tokens.join(','));
    }
  });
}

