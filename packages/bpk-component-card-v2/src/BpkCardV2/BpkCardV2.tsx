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

import { cssModules } from '../../../bpk-react-utils';

import Body from './subcomponents/Body';
import Footer from './subcomponents/Footer';
import Header from './subcomponents/Header';
import Primary from './subcomponents/Primary';
import Secondary from './subcomponents/Secondary';

import type { BpkCardV2Component, BpkCardV2Props } from './common-types';

import STYLES from './BpkCardV2.module.scss';

const getClassName = cssModules(STYLES);

/**
 * BpkCardV2 is a composable, responsive card component for Backpack.
 *
 * It supports explicit multi-section composition (Header, Body, Footer), flexible
 * split layouts (Primary/Secondary), and customizable surface colors. The component
 * is mobile-first and automatically adapts layout across breakpoints.
 *
 * @example
 * // Basic card
 * <BpkCardV2>
 *   <BpkCardV2.Header>Title</BpkCardV2.Header>
 *   <BpkCardV2.Body>Content</BpkCardV2.Body>
 *   <BpkCardV2.Footer>Footer</BpkCardV2.Footer>
 * </BpkCardV2>
 *
 * @example
 * // Split layout (70/30 on desktop, stacked on mobile)
 * <BpkCardV2 bgColor="surfaceElevated">
 *   <BpkCardV2.Body split splitRatio={70}>
 *     <BpkCardV2.Primary>Main content</BpkCardV2.Primary>
 *     <BpkCardV2.Secondary>Sidebar</BpkCardV2.Secondary>
 *   </BpkCardV2.Body>
 * </BpkCardV2>
 */
const BpkCardV2Base = forwardRef<HTMLDivElement, BpkCardV2Props>(
  (
    {
      ariaLabel,
      ariaLabelledBy,
      bgColor = 'surfaceDefault',
      children,
      className,
      variant = 'default',
    },
    ref,
  ) => {
    const classNameFinal = getClassName(
      'bpk-card-v2',
      `bpk-card-v2--${variant}`,
      className,
    );

    return (
      <div
        ref={ref}
        className={classNameFinal}
        data-bg-color={bgColor}
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledBy}
      >
        {children}
      </div>
    );
  },
);

BpkCardV2Base.displayName = 'BpkCardV2';

// Attach subcomponents
(BpkCardV2Base as unknown as BpkCardV2Component).Header = Header;
(BpkCardV2Base as unknown as BpkCardV2Component).Body = Body;
(BpkCardV2Base as unknown as BpkCardV2Component).Primary = Primary;
(BpkCardV2Base as unknown as BpkCardV2Component).Secondary = Secondary;
(BpkCardV2Base as unknown as BpkCardV2Component).Footer = Footer;

const BpkCardV2 = BpkCardV2Base as unknown as BpkCardV2Component;

export default BpkCardV2;

export type { BpkCardV2Props } from './common-types';
