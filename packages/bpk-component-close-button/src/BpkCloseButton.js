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

/* @flow strict */

import PropTypes from 'prop-types';
import type { StatelessFunctionalComponent } from 'react';

import CloseIcon from '../../bpk-component-icon/sm/close';
import { cssModules } from '../../bpk-react-utils';

import STYLES from './BpkCloseButton.module.scss';

const getClassName = cssModules(STYLES);

type Props = {
  label: string,
  onClick: (event: SyntheticEvent<>) => mixed,
  className: ?string,
  customIcon: ?StatelessFunctionalComponent<any>,
  onDark: Boolean,
};

const BpkCloseButton = (props: Props) => {
  const { className, customIcon, label, onClick, onDark, ...rest } = props;
  const classNames = [onDark ? getClassName('bpk_close_button__onDark') : getClassName('bpk_close_button__default')];
  const Icon = customIcon || CloseIcon;

  if (className) {
    classNames.push(className);
  }

  return (
    // $FlowFixMe[cannot-spread-inexact] - inexact rest. See decisions/flowfixme.md
    <button
      type="button"
      title={label}
      onClick={onClick}
      aria-label={label}
      className={classNames.join(' ')}
      {...rest}
    >
      <span className={getClassName('bpk_close_button__icon')}>
        <Icon/>
      </span>
    </button>
  );
};

BpkCloseButton.propTypes = {
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  className: PropTypes.string,
  customIcon: PropTypes.func,
  onDark: PropTypes.Boolean,
};

BpkCloseButton.defaultProps = {
  className: null,
  customIcon: null,
  onDark: false,
};

export default BpkCloseButton;
