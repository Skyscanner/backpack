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

import React from 'react';
import PropTypes from 'prop-types';

import { cssModules } from 'bpk-react-utils';
import BpkStar, { STAR_TYPES } from './BpkStar';

import STYLES from './BpkInteractiveStar.css';

const getClassName = cssModules(STYLES);

const BpkInteractiveStar = props => {
  const {
    selected,
    type,
    name,
    value,
    onClick,
    onMouseEnter,
    label,
    ...rest
  } = props;
  const buttonClassNames = [getClassName('bpk-interactive-star')];
  const iconClassNames = [getClassName('bpk-interactive-star__icon')];

  if (selected) {
    buttonClassNames.push(getClassName('bpk-interactive-star--selected'));
    iconClassNames.push(getClassName('bpk-interactive-star__icon--selected'));
  }

  return (
    <button
      aria-label={label}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      className={buttonClassNames.join(' ')}
      aria-pressed={selected}
      type="button"
    >
      <BpkStar className={iconClassNames.join(' ')} type={type} {...rest} />
    </button>
  );
};

BpkInteractiveStar.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  onMouseEnter: PropTypes.func.isRequired,
  type: PropTypes.oneOf([STAR_TYPES.EMPTY, STAR_TYPES.FULL]).isRequired,
  value: PropTypes.number.isRequired,
  selected: PropTypes.bool,
};

BpkInteractiveStar.defaultProps = {
  selected: false,
};

export default BpkInteractiveStar;
