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
// @ts-nocheck

import type { ReactNode } from 'react';

import { cssModules } from '../../bpk-react-utils';

import STYLES from './BpkVisuallyHidden.module.scss';

const getClassName = cssModules(STYLES);

export type VisuallyHiddenElement =
  | 'span'
  | 'div'
  | 'p'
  | 'strong'
  | 'em'
  | 'small'
  | 'legend'
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6';

export type Props = {
  as?: VisuallyHiddenElement;
  children: ReactNode;
};

const BpkVisuallyHidden = ({
  as: Element = 'span',
  children,
}: Props) => {
  const classNames = getClassName('bpk-visually-hidden');

  return (
    // Allowed, Element is always a dom element.
    // eslint-disable-next-line @skyscanner/rules/forbid-component-props
    <Element className={classNames}>
      {children}
    </Element>
  );
};

export default BpkVisuallyHidden;
