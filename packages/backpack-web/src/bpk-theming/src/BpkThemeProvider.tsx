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

import type { CSSProperties, ElementType, ReactNode } from 'react';

export interface Theme {
  [key: string]: string;
}

export type Props = {
  children: ReactNode;
  component?: ElementType;
  style?: CSSProperties | null;
  theme?: Theme | null;
  themeAttributes: Array<string | string[]>;
} & Record<string, unknown>;

const uniq = (arr: Array<string | string[]> = []): Array<string | string[]> => {
  const seen = new Set<string>();
  return arr.filter((item) => {
    const key = Array.isArray(item) ? JSON.stringify(item) : item;
    if (seen.has(key)) {
      return false;
    }
    seen.add(key);
    return true;
  });
};

const createStyle = (
  theme: Theme | null | undefined,
  themeAttributes: Array<string | string[]>,
): Record<string, string> => {
  if (!theme) {
    return {};
  }
  const flattenedThemeAttributes = ([] as string[]).concat(...themeAttributes);
  let style: Record<string, string> = {};
  const missingThemeAttributes: string[] = [];
  flattenedThemeAttributes.forEach((attribute) => {
    if (theme[attribute]) {
      const cssName = attribute
        .replace(/([A-Z])/g, (variable) => `-${variable.toLowerCase()}`)
        .replace(/([0-9])/, (variable) => `-${variable.toLowerCase()}`);
      const value = theme[attribute];
      style[`--bpk-${cssName}`] = value;
    } else {
      missingThemeAttributes.push(attribute);
    }
  });

  if (missingThemeAttributes.length > 0) {
    style = {};
  }

  return style;
};

const BpkThemeProvider = ({
  children,
  component: WrapperComponent = 'div',
  style: userStyle = null,
  theme = null,
  themeAttributes,
  ...rest
}: Props) => {
  const dedupedThemeAttributes = uniq(themeAttributes);
  const style = createStyle(theme, dedupedThemeAttributes);

  return (
    <WrapperComponent
      style={{ ...userStyle, ...style } as CSSProperties}
      {...rest}
    >
      {children}
    </WrapperComponent>
  );
};

function themeAttributesPropType(
  props: { theme?: Theme | null; themeAttributes?: Array<string | string[]> },
  propName: string,
  componentName: string,
): Error | null {
  const { theme } = props;
  const { themeAttributes } = props;
  if (!theme) {
    return null;
  }
  // Validate types.
  if (!themeAttributes) {
    return new Error(`${componentName}: \`themeAttributes\` is required.`);
  }
  if (!Array.isArray(themeAttributes)) {
    return new Error(`${componentName}: \`themeAttributes\` must be an array.`);
  }

  const flatThemeAttributes: string[] = ([] as string[]).concat(...themeAttributes);
  const extraneousThemeAttributes: Theme = { ...theme };
  const missingThemeAttributes: string[] = [];
  flatThemeAttributes.forEach((attribute) => {
    if (theme[attribute]) {
      delete extraneousThemeAttributes[attribute];
    } else {
      missingThemeAttributes.push(attribute);
    }
  });
  const errors: string[] = [];
  if (missingThemeAttributes.length > 0) {
    errors.push(
      `${componentName}: To apply theming, the theme prop must include \`${flatThemeAttributes.join(
        ', ',
      )}\` (missing \`${missingThemeAttributes.join(', ')}\`)`,
    );
  }
  if (Object.keys(extraneousThemeAttributes).length > 0) {
    errors.push(
      `${componentName}: Extraneous theme attributes supplied: \`${Object.keys(
        extraneousThemeAttributes,
      ).join(', ')}\`.`,
    );
  }
  if (errors.length > 0) {
    return new Error(errors.join('\n'));
  }
  return null;
};

export { themeAttributesPropType };
export default BpkThemeProvider;
