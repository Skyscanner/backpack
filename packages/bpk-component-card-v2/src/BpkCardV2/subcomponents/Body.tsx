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

import type { ReactNode } from 'react';
import { Children, isValidElement } from 'react';

import type { BpkCardV2BodyProps } from '../common-types';

import STYLES from '../BpkCardV2.module.scss';

/**
 * Body subcomponent for BpkCardV2.
 *
 * Renders the main content area of the card. Supports optional two-column split
 * layout using Primary and Secondary subcomponents. On mobile (< 768px), the
 * layout stacks vertically. On desktop (>= 768px), splits horizontally with
 * Primary taking splitRatio% width and Secondary taking the remainder.
 *
 * @param props - Component props of type BpkCardV2BodyProps
 * @returns {ReactNode} Rendered body element with optional divider
 *
 * @example
 * // Simple body
 * <BpkCardV2.Body>Content here</BpkCardV2.Body>
 *
 * @example
 * // Split layout (70/30)
 * <BpkCardV2.Body split splitRatio={70}>
 *   <BpkCardV2.Primary>Main content (70%)</BpkCardV2.Primary>
 *   <BpkCardV2.Secondary>Sidebar (30%)</BpkCardV2.Secondary>
 * </BpkCardV2.Body>
 */
const Body = ({
  children,
  className,
  split = false,
  splitRatio = 70,
}: BpkCardV2BodyProps) => {
  const classNameList = [
    STYLES['bpk-card-v2__body'],
    split && STYLES['bpk-card-v2__body--split'],
    className,
  ];

  const bodyClassName = classNameList.filter(Boolean).join(' ');

  // Process children to insert divider between Primary and Secondary in split layout
  const processedChildren = split ? Children.toArray(children).reduce<ReactNode[]>((acc, child, index) => {
    acc.push(child);
    // Insert divider after first child (Primary) if there's a next child (Secondary)
    if (index === 0 && Children.count(children) > 1 && isValidElement(child)) {
      acc.push(
        <div key="bpk-card-v2-divider" className={STYLES['bpk-card-v2__divider']} />
      );
    }
    return acc;
  }, []) : children;

  return (
    <div
      className={bodyClassName}
      style={{
        '--bpk-card-v2-primary-width': split ? `${splitRatio}%` : undefined,
      } as React.CSSProperties}
    >
      {processedChildren}
    </div>
  );
};

Body.displayName = 'BpkCardV2.Body';

export default Body;
