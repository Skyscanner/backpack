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

import { forwardRef } from 'react';

import { Stack, VStack, HStack } from '@chakra-ui/react/stack';

import { cssModules, getDataComponentAttribute } from '../../bpk-react-utils';

import { processBpkComponentProps } from './tokenUtils';

import type { BpkStackProps } from './types';

import STYLES from './BpkLayout.module.scss';


const getClassName = cssModules(STYLES);

export const BpkStack = forwardRef<HTMLDivElement, BpkStackProps>(({ backgroundColor, children, color, ...props }, ref) => {
  const processedProps = processBpkComponentProps(props, { component: 'BpkStack' });
  const classNames = (color || backgroundColor)
    ? getClassName(
        'bpk-layout',
        color ? `bpk-layout--${color}` : '',
        backgroundColor ? `bpk-layout--${backgroundColor}` : '',
      )
    : undefined;
  return (
    // eslint-disable-next-line @skyscanner/rules/forbid-component-props
    <Stack ref={ref} className={classNames} {...getDataComponentAttribute('Stack')} {...processedProps}>
      {children}
    </Stack>
  );
});

BpkStack.displayName = 'BpkStack';

export const BpkHStack = forwardRef<HTMLDivElement, BpkStackProps>(({ backgroundColor, children, color, ...props }, ref) => {
  const processedProps = processBpkComponentProps(props, { component: 'BpkStack' });
  const classNames = (color || backgroundColor)
    ? getClassName(
        'bpk-layout',
        color ? `bpk-layout--${color}` : '',
        backgroundColor ? `bpk-layout--${backgroundColor}` : '',
      )
    : undefined;
  return (
    // eslint-disable-next-line @skyscanner/rules/forbid-component-props
    <HStack ref={ref} className={classNames} {...getDataComponentAttribute('HStack')} {...processedProps}>
      {children}
    </HStack>
  );
});

BpkHStack.displayName = 'BpkHStack';

export const BpkVStack = forwardRef<HTMLDivElement, BpkStackProps>(({ backgroundColor, children, color, ...props }, ref) => {
  const processedProps = processBpkComponentProps(props, { component: 'BpkStack' });
  const classNames = (color || backgroundColor)
    ? getClassName(
        'bpk-layout',
        color ? `bpk-layout--${color}` : '',
        backgroundColor ? `bpk-layout--${backgroundColor}` : '',
      )
    : undefined;
  return (
    // eslint-disable-next-line @skyscanner/rules/forbid-component-props
    <VStack ref={ref} className={classNames} {...getDataComponentAttribute('VStack')} {...processedProps}>
      {children}
    </VStack>
  );
});

BpkVStack.displayName = 'BpkVStack';

export type { BpkStackProps };

