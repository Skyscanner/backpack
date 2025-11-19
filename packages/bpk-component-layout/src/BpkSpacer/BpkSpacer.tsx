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

import type { ElementType } from 'react';

import { getClassName } from '../styleUtils';

import STYLES from './BpkSpacer.module.scss';

import type { BpkSpacerProps } from './BpkSpacer.types';

export type Props = BpkSpacerProps;

const getClass = getClassName(STYLES);

/**
 * BpkSpacer is a layout component that provides flexible spacing using CSS Modules.
 * It uses static CSS classes compiled at build time for optimal performance and SSR support.
 *
 * **Key Features:**
 * - A flexible flex spacer that expands along the major axis of its containing flex layout
 * - Uses CSS Modules for static CSS generation (no runtime CSS-in-JS)
 * - Supports SSR out of the box
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
  as = 'div',
  ...rest
}: Props) => {
  const Component = as as ElementType;

  return (
    <Component
      className={getClass('bpk-spacer')}
      {...rest}
    />
  );
};

export default BpkSpacer;
