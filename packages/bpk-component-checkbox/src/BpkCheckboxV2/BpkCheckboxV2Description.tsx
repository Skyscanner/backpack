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

import type { HTMLAttributes, ReactNode } from 'react';

import { cssModules } from '../../../bpk-react-utils';

import STYLES from './BpkCheckboxV2.module.scss';

const getClassName = cssModules(STYLES);

// `className` and `style` are intentionally blocked — Backpack owns the
// visual layer.
type BpkCheckboxV2DescriptionSafePassThroughProps = Omit<
  HTMLAttributes<HTMLSpanElement>,
  'className' | 'style' | 'children'
>;

export type BpkCheckboxV2DescriptionProps =
  BpkCheckboxV2DescriptionSafePassThroughProps & {
    children: ReactNode;
  };

// Description renders as a <span> inside the Checkbox.Root <label>.
// Being inside the <label> element means screen readers announce its text
// as part of the checkbox's accessible name.
const BpkCheckboxV2Description = ({
  children,
  ...rest
}: BpkCheckboxV2DescriptionProps) => {
  const { className, style, ...safeProps } = rest as typeof rest & {
    className?: unknown;
    style?: unknown;
  };

  if (process.env.NODE_ENV !== 'production' && (className || style)) {
    // eslint-disable-next-line no-console
    console.warn(
      '[BpkCheckboxV2.Description] `className` and `style` are not supported.',
    );
  }

  return (
    <span
      {...safeProps}
      className={getClassName('bpk-checkbox-v2__description')}
    >
      {children}
    </span>
  );
};

export default BpkCheckboxV2Description;
