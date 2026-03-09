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

import type { BpkCardV2BodyProps } from '../common-types';

/**
 * Parse a columns string like "1fr 2fr 1fr" into an array of numeric ratios.
 * Only supports `fr` units.
 *
 * @param {string} columns - Space-separated fr values (e.g. "1fr 2fr 1fr")
 * @returns {number[]} Array of numeric ratios, e.g. [1, 2, 1]
 */
const parseColumns = (columns: string): number[] =>
  columns
    .trim()
    .split(/\s+/)
    .map((part) => {
      const match = part.match(/^(\d+(?:\.\d+)?)fr$/);
      if (!match) {
        throw new Error(
          `BpkCardV2.Body: Invalid column value "${part}". Only fr units are supported (e.g. "1fr 2fr 1fr").`,
        );
      }
      return parseFloat(match[1]);
    });

/**
 * Body subcomponent for BpkCardV2.
 *
 * Renders the main content area of the card as a BpkFlex container.
 * Defaults to vertical (column) direction with base padding.
 * Supports multi-column layouts using Section subcomponents with the columns prop.
 * Place `<BpkCardV2.Divider />` between Section children where you want dividers.
 * All BpkFlex props can be used to customise the layout.
 *
 * @example
 * // Simple body
 * <BpkCardV2.Body>Content here</BpkCardV2.Body>
 *
 * @example
 * // Multi-column layout with fractions
 * <BpkCardV2.Body columns="1fr 2fr 1fr">
 *   <BpkCardV2.Section>Left</BpkCardV2.Section>
 *   <BpkCardV2.Section>Center (2x wide)</BpkCardV2.Section>
 *   <BpkCardV2.Section>Right</BpkCardV2.Section>
 * </BpkCardV2.Body>
 *
 * @example
 * // Multi-column with selective divider
 * <BpkCardV2.Body columns="7fr 3fr">
 *   <BpkCardV2.Section>Main content</BpkCardV2.Section>
 *   <BpkCardV2.Divider />
 *   <BpkCardV2.Section>Sidebar</BpkCardV2.Section>
 * </BpkCardV2.Body>
 *
 * @returns {JSX.Element} Body component
 */
const Body = ({
  children,
  columns,
  direction,
  padding,
  ...rest
}: BpkCardV2BodyProps) => {
  const isMultiColumn = !!columns;

  const resolvedDirection = direction ?? (isMultiColumn
    ? { base: 'column' as const, tablet: 'row' as const }
    : 'column' as const);

  const resolvedPadding = padding ?? (isMultiColumn ? BpkSpacing.None : BpkSpacing.Base);

  let processedChildren: ReactNode = children;

  if (isMultiColumn) {
    // Multi-column: parse fractions and inject flex ratios into Section children.
    // Dividers are NOT auto-inserted — place <BpkCardV2.Divider /> explicitly
    // between Section children where you want them.
    const ratios = parseColumns(columns);
    const childArray = Children.toArray(children).filter(isValidElement);
    let sectionIndex = 0;

    processedChildren = childArray.map((child) => {
      const isSection = (child.type as { displayName?: string })?.displayName === 'BpkCardV2.Section';

      if (isSection) {
        const ratio = ratios[sectionIndex];
        sectionIndex += 1;

        if (ratio !== undefined) {
          const childElement = child as ReactElement<{ flex?: unknown }>;
          return cloneElement(childElement, {
            key: child.key ?? `section-${sectionIndex}`,
            // On mobile: full width (stacked). On tablet+: flex ratio for proportional sizing.
            flex: childElement.props.flex ?? { base: '1 1 auto', tablet: `${ratio} 1 0%` },
          });
        }
      }

      return child;
    });
  }

  return (
    <BpkFlex
      direction={resolvedDirection}
      padding={resolvedPadding}
      grow="1"
      {...getDataComponentAttribute('CardV2.Body')}
      {...rest}
    >
      {processedChildren}
    </BpkFlex>
  );
};

Body.displayName = 'BpkCardV2.Body';

export default Body;
