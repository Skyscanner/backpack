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

import { cssModules, getDataComponentAttribute } from '../../../../bpk-react-utils';

import type { BpkCardV2Props } from '../common-types';

import STYLES from '../BpkCardV2.module.scss';

const getClassName = cssModules(STYLES);

/**
 * BpkCardV2.Root is the root container for the card component.
 *
 * It supports explicit multi-section composition (Header, Body, Footer), flexible
 * multi-column layouts (Section/Divider), and customizable surface colors. The component
 * is mobile-first and automatically adapts layout across breakpoints.
 *
 * @example
 * <BpkCardV2.Root>
 *   <BpkCardV2.Header>Title</BpkCardV2.Header>
 *   <BpkCardV2.Body>Content</BpkCardV2.Body>
 *   <BpkCardV2.Footer>Footer</BpkCardV2.Footer>
 * </BpkCardV2.Root>
 *
 * @example
 * // Multi-column layout (70/30 on desktop, stacked on mobile)
 * <BpkCardV2.Root bgColor="surfaceElevated">
 *   <BpkCardV2.Body templateColumns={{ base: '1fr', tablet: '7fr auto 3fr' }}>
 *     <BpkCardV2.Section>Main content</BpkCardV2.Section>
 *     <BpkCardV2.Divider />
 *     <BpkCardV2.Section>Sidebar</BpkCardV2.Section>
 *   </BpkCardV2.Body>
 * </BpkCardV2.Root>
 */
const Root = forwardRef<HTMLDivElement, BpkCardV2Props>(
  (
    {
      bgColor = 'surfaceDefault',
      children,
      variant = 'default',
      ...rest
    },
    ref,
  ) => (
    <div
      ref={ref}
      className={getClassName('bpk-card-v2', `bpk-card-v2--${variant}`)}
      data-bg-color={bgColor}
      {...getDataComponentAttribute('CardV2')}
      {...rest}
    >
      {children}
    </div>
  ),
);

Root.displayName = 'BpkCardV2.Root';

export default Root;
