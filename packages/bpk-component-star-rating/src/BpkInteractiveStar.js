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

import React from 'react';
import PropTypes from 'prop-types';

import { cssModules } from '../../bpk-react-utils';

import { BpkStarNonRtl, STAR_TYPES } from './BpkStar';
import STYLES from './BpkInteractiveStar.module.scss';

const getClassName = cssModules(STYLES);

type Props = {
  label: string,
  name: string,
  onClick: () => mixed,
  onMouseEnter: () => mixed,
  type: typeof STAR_TYPES.EMPTY | typeof STAR_TYPES.FULL,
  value: number,
  selected: boolean,
};

const BpkInteractiveStar = (props: Props) => {
  const { label, name, onClick, onMouseEnter, selected, type, value, ...rest } =
    props;

  const buttonClassNames = getClassName(
    'bpk-interactive-star',
    selected && 'bpk-interactive-star--selected',
  );

  const iconClassNames = getClassName(
    'bpk-interactive-star__icon',
    selected && 'bpk-interactive-star__icon--selected',
  );

  // Note we use `BpkStarRatingNonRtl` here otherwise it already has `scaleX(-1)` applied in RTL.
  // That causes the scale animation to be a bit over the top.

  return (
    <button
      aria-label={label}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      className={buttonClassNames}
      aria-pressed={selected}
      type="button"
    >
      {/* $FlowFixMe[cannot-spread-inexact] - inexact rest. See decisions/flowfixme.md */}
      <BpkStarNonRtl className={iconClassNames} type={type} {...rest} />
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
