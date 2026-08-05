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
  createContext,
  useContext,
  useId,
  type ComponentType,
  type ElementType,
  type ReactNode,
} from 'react';

import { themeToVars, type BpkTheme, type BpkThemedValue } from './generated/BpkTheme';

export type { BpkTheme, BpkThemedValue };

// ─── Context ─────────────────────────────────────────────────────────────────

const BpkThemeContext = createContext<BpkTheme | null>(null);

export const useBpkTheme = (): BpkTheme | null => useContext(BpkThemeContext);

// ─── Mode-specific value helpers ──────────────────────────────────────────────

function isModeValue(v: unknown): v is { light?: string; dark?: string } {
  if (typeof v !== 'object' || v === null) return false;
  const { dark, light } = v as { light?: unknown; dark?: unknown };
  return typeof light === 'string' || typeof dark === 'string';
}

function buildModeStyleTag(
  id: string,
  modeEntries: Array<[cssVar: string, light?: string, dark?: string]>,
): string {
  if (modeEntries.length === 0) return '';

  const lightRules = modeEntries
    .filter(([, light]) => light !== undefined)
    .map(([v, light]) => `  ${v}: ${light};`)
    .join('\n');
  const darkRules = modeEntries
    .filter(([, , dark]) => dark !== undefined)
    .map(([v, , dark]) => `  ${v}: ${dark};`)
    .join('\n');

  const parts: string[] = [];
  if (lightRules && darkRules) {
    // Both modes specified — light is the unscoped default, dark overrides it
    parts.push(`#${id} {\n${lightRules}\n}`);
    parts.push(`:root[data-theme="dark"] #${id} {\n${darkRules}\n}`);
  } else {
    // Single-mode: scope tightly so the other mode is unaffected
    if (lightRules) parts.push(`:root:not([data-theme="dark"]) #${id} {\n${lightRules}\n}`);
    if (darkRules) parts.push(`:root[data-theme="dark"] #${id} {\n${darkRules}\n}`);
  }
  return parts.join('\n');
}

// ─── Props ───────────────────────────────────────────────────────────────────

export interface BpkThemeProviderV2Props {
  children: ReactNode;
  theme?: BpkTheme;
  /** Override the wrapper element type. Defaults to "div". */
  as?: ElementType | ComponentType<any> | string;
  /**
   * @deprecated Legacy prop — no longer used. Kept for backwards compatibility
   * with existing components that still pass themeAttributes. Remove alongside
   * the per-component themeAttributes migration.
   */
  themeAttributes?: readonly string[] | string[][];
  /**
   * @deprecated Use the `as` prop instead.
   */
  component?: ElementType | ComponentType<any> | string;
  /** Additional inline styles applied to the wrapper element. */
  style?: Record<string, string>;
  [key: string]: unknown;
}

// ─── Component ───────────────────────────────────────────────────────────────

const BpkThemeProviderV2 = ({
  as: WrapperComponent = 'div',
  children,
  component,
  style: userStyle,
  theme,
  themeAttributes: _themeAttributes,
  ...rest
}: BpkThemeProviderV2Props) => {
  const resolvedComponent = component ?? WrapperComponent;
  const id = useId().replace(/:/g, '');
  const Wrapper = resolvedComponent as ElementType;

  if (!theme) {
    return (
      <BpkThemeContext.Provider value={null}>
        <Wrapper style={userStyle} {...rest}>
          {children}
        </Wrapper>
      </BpkThemeContext.Provider>
    );
  }

  const inlineVars = themeToVars(theme);
  const modeEntries = extractModeEntries(theme);
  const styleTagContent = buildModeStyleTag(`bpk-theme-${id}`, modeEntries);

  return (
    <BpkThemeContext.Provider value={theme}>
      {styleTagContent && (
        // eslint-disable-next-line react/no-danger
        <style dangerouslySetInnerHTML={{ __html: styleTagContent }} />
      )}
      <Wrapper
        id={styleTagContent ? `bpk-theme-${id}` : undefined}
        style={{ ...userStyle, ...inlineVars }}
        {...rest}
      >
        {children}
      </Wrapper>
    </BpkThemeContext.Provider>
  );
};

// ─── Mode entry extractor ─────────────────────────────────────────────────────

function extractModeEntries(
  theme: BpkTheme,
): Array<[cssVar: string, light?: string, dark?: string]> {
  const entries: Array<[string, string | undefined, string | undefined]> = [];
  const t = theme as Record<string, unknown>;
  const sentinel = '__bpk_probe__';

  Object.entries(t).forEach(([key, value]) => {
    if (isModeValue(value)) {
      // Flat semantic key (e.g. corePrimary, textPrimary)
      const probe = themeToVars({ [key]: sentinel } as BpkTheme);
      const cssVar = Object.keys(probe)[0];
      if (cssVar) {
        entries.push([cssVar, value.light, value.dark]);
      }
    } else if (value && typeof value === 'object' && !Array.isArray(value)) {
      // Namespaced component key (e.g. button.bgPrimary)
      const nsObj = value as Record<string, BpkThemedValue>;
      Object.entries(nsObj).forEach(([nsKey, nsValue]) => {
        if (!isModeValue(nsValue)) return;
        const probe = themeToVars({ [key]: { [nsKey]: sentinel } } as BpkTheme);
        const cssVar = Object.keys(probe)[0];
        if (cssVar) {
          entries.push([cssVar, nsValue.light, nsValue.dark]);
        }
      });
    }
  });

  return entries;
}

export default BpkThemeProviderV2;
