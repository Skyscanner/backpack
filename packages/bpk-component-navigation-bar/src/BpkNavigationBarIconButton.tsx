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

import type { ComponentType, MouseEvent, ReactNode } from 'react';
import PropTypes from 'prop-types';

// @ts-expect-error Untyped import. See `decisions/imports-ts-suppressions.md`.
import BpkIconButton from '../../bpk-component-close-button';
import { cssModules } from '../../bpk-react-utils';

import STYLES from './BpkNavigationBarIconButton.module.scss';
import { BAR_STYLES, type BarStyle } from './BpkNavigationBar';

const getClassName = cssModules(STYLES);

export type Props = {
  icon: ComponentType<any>,
  label: string,
  onClick: (event: MouseEvent<HTMLElement>) => void,
  className?: string,
  barStyle?: BarStyle,
  children?: ReactNode,
};

const BpkNavigationBarIconButton = ({ barStyle, className, icon, ...rest }: Props) => (
  <BpkIconButton
    customIcon={icon}
    className={getClassName(
      'bpk-navigation-bar-icon-button',
      `bpk-navigation-bar-icon-button--${barStyle}`,
      className
    )}
    {...rest}
  />
);

BpkNavigationBarIconButton.propTypes = {
  icon: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  className: PropTypes.string,
  barStyle: PropTypes.oneOf(Object.values(BAR_STYLES)),
};

BpkNavigationBarIconButton.defaultProps = {
  className: null,
  barStyle: BAR_STYLES.default,
};

export default BpkNavigationBarIconButton;
