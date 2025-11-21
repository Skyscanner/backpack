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

import { Spacer } from '@chakra-ui/react';

import { getClassName } from '../styleUtils';

import type { BpkSpacerProps } from './BpkSpacer.types';

import STYLES from './BpkSpacer.module.scss';

export type Props = BpkSpacerProps;

const getClass = getClassName(STYLES);

/**
 * BpkSpacer is a layout component that provides flexible spacing using Chakra UI's Spacer component
 * with CSS Modules styling. It uses Chakra UI for component logic but CSS Modules for all styling.
 *
 * **Key Features:**
 * - Uses Chakra UI's Spacer component (for `as` prop, component logic)
 * - All styling handled by CSS Modules (zero CSS-in-runtime)
 * - A flexible flex spacer that expands along the major axis of its containing flex layout
 * - Requires BpkProvider to disable Chakra UI's CSS-in-JS
 *
 * @param {Props} props - The component props
 * @returns {JSX.Element} The rendered BpkSpacer component
 * @example
 * ```tsx
 * <BpkFlex>
 *   <BpkBox>Left content</BpkBox>
 *   <BpkSpacer />
 *   <BpkBox>Right content</BpkBox>
 * </BpkFlex>
 * ```
 */
const BpkSpacer = ({
  as,
  ...rest
}: Props) => {
  return (
    <Spacer
      as={as}
      // Only pass className - no Chakra UI style props
      // This ensures CSS Modules handles all styling
      // Allowed, Component is always a dom element.
      // eslint-disable-next-line @skyscanner/rules/forbid-component-props
      className={getClass('bpk-spacer')}
      {...rest}
    />
  );
};

export default BpkSpacer;
