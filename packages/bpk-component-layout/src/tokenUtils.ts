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

import StackOptionKeys from './BpkStack.constant';
import { getSpacingValue } from './theme';
import {
  isValidSpacingValue,
  isValidSizeValue,
  isValidPositionValue,
  isPercentage,
} from './tokens';

export type BpkLayoutComponentName = 'BpkBox' | 'BpkFlex' | 'BpkGrid' | 'BpkStack';

type BpkResponsivePropGroups = {
  container: readonly string[];
  item?: readonly string[];
};

export const BPK_RESPONSIVE_PROP_GROUPS_BY_COMPONENT: Record<
  BpkLayoutComponentName,
  BpkResponsivePropGroups
> = {
  BpkBox: {
    container: [
      'display',
      'flexDirection',
      'flexWrap',
      'justifyContent',
      'alignItems',
      'alignContent',
      'gridTemplateColumns',
      'gridTemplateRows',
      'gridTemplateAreas',
      'gridAutoFlow',
      'gridAutoRows',
      'gridAutoColumns',
    ],
    item: [
      'flex',
      'flexGrow',
      'flexShrink',
      'flexBasis',
      'order',
      'alignSelf',
      'justifySelf',
      'gridColumn',
      'gridRow',
    ],
  },
  BpkFlex: {
    container: [
      'flexDirection',
      'justifyContent',
      'alignItems',
      'flexWrap',
    ],
    item: [
      'flexGrow',
      'flexShrink',
      'flexBasis',
    ],
  },
  BpkGrid: {
    container: [
      'justifyContent',
      'alignItems',
      'gridTemplateColumns',
      'gridTemplateRows',
      'gridTemplateAreas',
      'gridAutoFlow',
      'gridAutoRows',
      'gridAutoColumns',
    ],
    item: [
      'gridColumn',
      'gridRow',
    ],
  },
  BpkStack: {
    container: StackOptionKeys as unknown as readonly string[],
  },
};

export const BPK_RESPONSIVE_PROP_KEYS_BY_COMPONENT: Record<
  BpkLayoutComponentName,
  readonly string[]
> = {
  BpkBox: [
    ...BPK_RESPONSIVE_PROP_GROUPS_BY_COMPONENT.BpkBox.container,
    ...(BPK_RESPONSIVE_PROP_GROUPS_BY_COMPONENT.BpkBox.item ?? []),
  ],
  BpkFlex: [
    ...BPK_RESPONSIVE_PROP_GROUPS_BY_COMPONENT.BpkFlex.container,
    ...(BPK_RESPONSIVE_PROP_GROUPS_BY_COMPONENT.BpkFlex.item ?? []),
  ],
  BpkGrid: [
    ...BPK_RESPONSIVE_PROP_GROUPS_BY_COMPONENT.BpkGrid.container,
    ...(BPK_RESPONSIVE_PROP_GROUPS_BY_COMPONENT.BpkGrid.item ?? []),
  ],
  BpkStack: [...BPK_RESPONSIVE_PROP_GROUPS_BY_COMPONENT.BpkStack.container],
};

export type ProcessBpkComponentPropsOptions = {
  component: BpkLayoutComponentName;
  responsiveProps?: Record<string, any>;
  propNameMap?: Record<string, string>;
};

function filterToAllowlist(
  props: Record<string, any>,
  allowlist: readonly string[],
): Record<string, any> {
  const allowed = new Set(allowlist);
  const result: Record<string, any> = {};
  Object.keys(props).forEach((key) => {
    if (allowed.has(key) && props[key] !== undefined) {
      result[key] = props[key];
    }
  });
  return result;
}

/**
 * Converts Backpack spacing token to actual rem value.
 *
 * @param {string} value - The spacing token string
 * @returns {string} The resolved rem value
 */
export function convertBpkSpacingToValue(value: string): string {
  if (isPercentage(value)) {
    return value;
  }

  const spacingValue = getSpacingValue(value);
  if (spacingValue !== undefined) {
    return spacingValue;
  }

  if (process.env.NODE_ENV !== 'production') {
    // eslint-disable-next-line no-console
    console.warn(
      `Spacing token "${value}" not found in theme. Returning as-is.`
    );
  }
  return value;
}

export function processResponsiveValue(
  value: any,
  converter: (v: string) => string,
  validator: (v: string) => boolean,
  propName: string
): any {
  if (value === undefined || value === null) {
    return value;
  }

  if (Array.isArray(value)) {
    if (process.env.NODE_ENV !== 'production') {
      // eslint-disable-next-line no-console
      console.warn(
        `Array-based responsive values are not supported for prop "${propName}". ` +
        `Please use Backpack breakpoint keys instead.`
      );
    }
    return undefined;
  }

  if (typeof value === 'object') {
    // For inline styles, we can only apply the base value.
    // Responsive breakpoint values require CSS media queries and
    // will be supported via a CSS-based approach in a future iteration.
    const baseValue = value.base;
    if (baseValue !== undefined) {
      return processResponsiveValue(baseValue, converter, validator, propName);
    }
    // If no base value, try the smallest breakpoint
    const fallbackKey = Object.keys(value)[0];
    if (fallbackKey !== undefined) {
      return processResponsiveValue(value[fallbackKey], converter, validator, propName);
    }
    return undefined;
  }

  const strValue = String(value);
  if (!validator(strValue)) {
    if (process.env.NODE_ENV !== 'production') {
      // eslint-disable-next-line no-console
      console.warn(
        `Invalid value "${strValue}" for prop "${propName}". ` +
        `Only Backpack tokens are allowed.`
      );
    }
    return undefined;
  }

  return converter(strValue);
}

export function processSpacingProps<T extends Record<string, any>>(
  props: T
): Record<string, any> {
  const spacingKeys = [
    'padding', 'paddingTop', 'paddingRight', 'paddingBottom', 'paddingLeft',
    'paddingStart', 'paddingEnd', 'paddingInline',
    'margin', 'marginTop', 'marginRight', 'marginBottom', 'marginLeft',
    'marginStart', 'marginEnd', 'marginInline',
    'gap', 'spacing',
    'rowGap', 'columnGap',
    'width', 'height', 'minWidth', 'minHeight', 'maxWidth', 'maxHeight',
    'top', 'right', 'bottom', 'left',
  ];

  const processed: Record<string, any> = { ...props };

  spacingKeys.forEach((key) => {
    if (key in processed && processed[key] !== undefined) {
      const sizeKeys = ['width', 'height', 'minWidth', 'minHeight', 'maxWidth', 'maxHeight'];
      const positionKeys = ['top', 'right', 'bottom', 'left'];

      const isSizeProp = sizeKeys.includes(key);
      const isPositionProp = positionKeys.includes(key);

      let converter: (v: string) => string;
      if (isSizeProp || isPositionProp) {
        converter = (v: string) => v;
      } else {
        converter = convertBpkSpacingToValue;
      }

      let validator: (v: string) => boolean;
      if (isSizeProp) {
        validator = isValidSizeValue;
      } else if (isPositionProp) {
        validator = isValidPositionValue;
      } else {
        validator = isValidSpacingValue;
      }

      const processedValue = processResponsiveValue(
        processed[key],
        converter,
        validator,
        key
      );

      if (processedValue !== undefined) {
        processed[key] = processedValue;
      } else {
        delete processed[key];
      }
    }
  });

  return processed;
}

export function processBpkProps<T extends Record<string, any>>(
  props: T
): Record<string, any> {
  const { className, style, ...cleanProps } = props;

  if (className !== undefined && process.env.NODE_ENV !== 'production') {
    // eslint-disable-next-line no-console
    console.warn(
      'className prop is not allowed on Backpack layout components. ' +
      'It has been removed to maintain design system consistency.'
    );
  }

  if (style !== undefined && process.env.NODE_ENV !== 'production') {
    // eslint-disable-next-line no-console
    console.warn(
      'style prop is not allowed on Backpack layout components. ' +
      'It has been removed to maintain design system consistency.'
    );
  }

  return processSpacingProps(cleanProps);
}

export function processResponsiveStringProp(value: any, propName: string): any {
  return processResponsiveValue(
    value,
    (v: string) => v,
    () => true,
    propName
  );
}

export function processResponsiveProps(
  props: Record<string, any>,
  propNameMap?: Record<string, string>
): Record<string, any> {
  const processed: Record<string, any> = {};
  Object.keys(props).forEach((key) => {
    if (props[key] !== undefined) {
      const targetPropName = propNameMap ? propNameMap[key] || key : key;
      processed[targetPropName] = processResponsiveStringProp(
        props[key],
        targetPropName
      );
    }
  });
  return processed;
}

/**
 * Process a component's props:
 * - strip className/style
 * - process spacing/size/position props (including breakpoint mapping + token conversion)
 * - process allowlisted non-spacing responsive layout props (breakpoint mapping only)
 *
 * @param {T} props - The component props to process
 * @param {ProcessBpkComponentPropsOptions} options - Processing options
 * @returns {object} Processed styles and HTML props
 */
export function processBpkComponentProps<T extends Record<string, any>>(
  props: T,
  options: ProcessBpkComponentPropsOptions,
): { styles: Record<string, any>; htmlProps: Record<string, any> } {
  const processed = processBpkProps(props);

  const allowlist = BPK_RESPONSIVE_PROP_KEYS_BY_COMPONENT[options.component];
  const responsiveSource = options.responsiveProps
    ? filterToAllowlist(options.responsiveProps, allowlist)
    : filterToAllowlist(processed, allowlist);

  const styles: Record<string, any> = {};
  const htmlProps: Record<string, any> = {};

  const styleKeys = new Set([
    'padding', 'paddingTop', 'paddingRight', 'paddingBottom', 'paddingLeft',
    'paddingStart', 'paddingEnd', 'paddingInline',
    'margin', 'marginTop', 'marginRight', 'marginBottom', 'marginLeft',
    'marginStart', 'marginEnd', 'marginInline',
    'gap', 'spacing', 'rowGap', 'columnGap',
    'width', 'height', 'minWidth', 'minHeight', 'maxWidth', 'maxHeight',
    'top', 'right', 'bottom', 'left',
    ...allowlist,
  ]);

  Object.keys(processed).forEach((key) => {
    if (allowlist.includes(key)) {
      // Skip - will be processed via responsive pipeline below
    } else if (styleKeys.has(key)) {
      styles[key] = processed[key];
    } else {
      htmlProps[key] = processed[key];
    }
  });

  if (Object.keys(responsiveSource).length > 0) {
    const responsiveProcessed = processResponsiveProps(
      responsiveSource,
      options.propNameMap,
    );

    Object.keys(responsiveProcessed).forEach((key) => {
      if (responsiveProcessed[key] !== undefined) {
        styles[key] = responsiveProcessed[key];
      }
    });
  }

  return { styles, htmlProps };
}
