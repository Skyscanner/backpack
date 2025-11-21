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

import type { ComponentType, ElementType, ReactNode } from 'react';

import { getClassName, processClassName } from './styleUtils';
import { transformBpkLayoutProps } from './useBpkLayoutProps';

import type { TransformBpkLayoutPropsOptions } from './useBpkLayoutProps';

/**
 * Options for creating a Bpk layout component
 */
export interface CreateBpkLayoutComponentOptions {
  /**
   * Component name for CSS class generation (e.g., 'box', 'flex', 'grid')
   */
  componentName: string;
  /**
   * Chakra UI component to use as the base
   */
  ChakraComponent: ComponentType<any>;
  /**
   * CSS Modules styles object
   */
  styles: Record<string, string>;
  /**
   * Additional options for transformBpkLayoutProps
   */
  transformOptions?: Omit<TransformBpkLayoutPropsOptions, 'componentName'>;
  /**
   * Optional prop transformer function to modify props before transformation
   */
  transformProps?: (props: Record<string, any>) => Record<string, any>;
}

/**
 * Creates a Bpk layout component with CSS Modules styling.
 * This factory function reduces code duplication across all layout components.
 *
 * @param {CreateBpkLayoutComponentOptions} options - Configuration options
 * @returns {ComponentType} The created Bpk layout component
 */
export function createBpkLayoutComponent<P extends Record<string, any>>(
  options: CreateBpkLayoutComponentOptions,
): ComponentType<P> {
  const {
    componentName,
    ChakraComponent,
    styles,
    transformOptions = {},
    transformProps,
  } = options;

  const getClass = getClassName(styles);

  const BpkComponent = ({
    as,
    children,
    ...rest
  }: P & { as?: ElementType; children?: ReactNode }) => {
    // Apply custom prop transformation if provided
    const propsToTransform = transformProps ? transformProps(rest) : rest;

    // Transform props to CSS Modules class names
    // Note: className is automatically filtered out by transformBpkLayoutProps
    // to prevent users from passing className directly (all styling via CSS Modules)
    const { className, restProps, style } = transformBpkLayoutProps(
      propsToTransform,
      {
        componentName,
        ...transformOptions,
      },
    );

    // Process className: split space-separated string and map through CSS Modules
    // This className is generated internally, not from user props
    const finalClassName = processClassName(getClass, className, `bpk-${componentName}`);

    return (
      <ChakraComponent
        as={as}
        // Only pass internally-generated className and style - no Chakra UI style props
        // className is NOT exposed in Props interface, only generated internally
        // This ensures CSS Modules handles all styling
        // Allowed, Component is always a dom element.
        // eslint-disable-next-line @skyscanner/rules/forbid-component-props
        className={finalClassName || undefined}
        style={style || undefined}
        {...restProps}
      >
        {children}
      </ChakraComponent>
    );
  };

  BpkComponent.displayName = `Bpk${componentName.charAt(0).toUpperCase() + componentName.slice(1)}`;

  return BpkComponent as ComponentType<P>;
}

