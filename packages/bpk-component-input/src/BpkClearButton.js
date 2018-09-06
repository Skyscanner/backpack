/*
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2018 Skyscanner Ltd
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
/* @flow */

import PropTypes from 'prop-types';
import React from 'react';
import ClearIcon from 'bpk-component-icon/sm/close-circle';
import { withButtonAlignment } from 'bpk-component-icon';
import { cssModules } from 'bpk-react-utils';

import STYLES from './bpk-clear-button.css';

const getClassName = cssModules(STYLES);

const ClearButtonIcon = withButtonAlignment(ClearIcon);

type Props = {
  label: string,
  onClick: (SyntheticEvent<HTMLButtonElement>) => mixed,
  className: ?string,
};

const BpkClearButton = (props: Props) => {
  const classNames = [getClassName('bpk-clear-button')];
  const { label, onClick, className, ...rest } = props;

  if (className) {
    classNames.push(className);
  }

  return (
    <button
      type="button"
      title={label}
      onClick={onClick}
      aria-label={label}
      className={classNames.join(' ')}
      {...rest}
    >
      <ClearButtonIcon className={getClassName('bpk-clear-button__icon')} />
    </button>
  );
};

BpkClearButton.propTypes = {
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  className: PropTypes.string,
};

BpkClearButton.defaultProps = {
  className: null,
};

export default BpkClearButton;
