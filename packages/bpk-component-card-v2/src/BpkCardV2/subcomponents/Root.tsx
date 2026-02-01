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

import { cssModules } from '../../../../bpk-react-utils';

import type { BpkCardV2Props } from '../common-types';

import STYLES from '../BpkCardV2.module.scss';

const getClassName = cssModules(STYLES);

/**
 * BpkCardV2.Root is the root container for the card component.
 *
 * It supports explicit multi-section composition (Header, Body, Footer), flexible
 * split layouts (Primary/Secondary), and customizable surface colors. The component
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
 * // Split layout (70/30 on desktop, stacked on mobile)
 * <BpkCardV2.Root bgColor="surfaceElevated">
 *   <BpkCardV2.Body split splitRatio={70}>
 *     <BpkCardV2.Primary>Main content</BpkCardV2.Primary>
 *     <BpkCardV2.Secondary>Sidebar</BpkCardV2.Secondary>
 *   </BpkCardV2.Body>
 * </BpkCardV2.Root>
 */
const Root = forwardRef<HTMLDivElement, BpkCardV2Props>(
  (
    {
      ariaLabel,
      ariaLabelledBy,
      bgColor = 'surfaceDefault',
      children,
      variant = 'default',
    },
    ref,
  ) => (
    <div
      ref={ref}
      className={getClassName('bpk-card-v2', `bpk-card-v2--${variant}`)}
      data-bg-color={bgColor}
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledBy}
    >
      {children}
    </div>
  ),
);

Root.displayName = 'BpkCardV2.Root';

export default Root;
