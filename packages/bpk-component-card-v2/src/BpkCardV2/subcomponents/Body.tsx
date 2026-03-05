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

import type { ReactElement, ReactNode } from 'react';
import { Children, cloneElement, isValidElement } from 'react';

import { BpkFlex, BpkSpacing } from '../../../../bpk-component-layout';
import { getDataComponentAttribute } from '../../../../bpk-react-utils';

import Divider from './Divider';

import type { BpkCardV2BodyProps } from '../common-types';


/**
 * Body subcomponent for BpkCardV2.
 *
 * Renders the main content area of the card as a BpkFlex container.
 * Defaults to vertical (column) direction with base padding.
 * Supports optional two-column split layout using Primary and Secondary subcomponents.
 * All BpkFlex props can be used to customise the layout.
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
 *
 * @returns {JSX.Element} Body component
 */
const Body = ({
  children,
  direction,
  padding,
  split = false,
  splitRatio = 70,
  ...rest
}: BpkCardV2BodyProps) => {
  const resolvedDirection = direction ?? (split
    ? { base: 'column' as const, tablet: 'row' as const }
    : 'column' as const);

  const resolvedPadding = padding ?? (split ? BpkSpacing.None : BpkSpacing.Base);

  // In split layout, inject responsive width into Primary/Secondary children
  // and insert a divider between them
  const processedChildren = split
    ? Children.toArray(children).reduce<ReactNode[]>((acc, child, index) => {
        if (isValidElement(child)) {
          const isPrimary = child.type && (child.type as { displayName?: string }).displayName === 'BpkCardV2.Primary';
          const isSecondary = child.type && (child.type as { displayName?: string }).displayName === 'BpkCardV2.Secondary';

          if (isPrimary) {
            acc.push(
              cloneElement(child as ReactElement, {
                key: child.key ?? 'primary',
                width: child.props.width ?? { base: '100%', tablet: `${splitRatio}%` },
              }),
            );
          } else if (isSecondary) {
            acc.push(
              cloneElement(child as ReactElement, {
                key: child.key ?? 'secondary',
                width: child.props.width ?? { base: '100%', tablet: `${100 - splitRatio}%` },
              }),
            );
          } else {
            acc.push(child);
          }

          // Insert divider after first child if there's a next child
          if (index === 0 && Children.count(children) > 1) {
            acc.push(<Divider key="bpk-card-v2-divider" />);
          }
        } else {
          acc.push(child);
        }
        return acc;
      }, [])
    : children;

  return (
    <BpkFlex
      direction={resolvedDirection}
      padding={resolvedPadding}
      flex="1"
      {...getDataComponentAttribute('CardV2.Body')}
      {...rest}
    >
      {processedChildren}
    </BpkFlex>
  );
};

Body.displayName = 'BpkCardV2.Body';

export default Body;
