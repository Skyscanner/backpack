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
import React from 'react';

import { cssModules } from '../../bpk-react-utils';
import BpkCard from '../../bpk-component-card';

import STYLES from './BpkDividedCard.module.scss';

const getClassName = cssModules(STYLES);

export const ORIENTATION = {
  horizontal: 'horizontal',
  vertical: 'vertical',
};

export type Props = {
  primaryContent: Node,
  secondaryContent: Node,
  isPrimaryContentPadded: ?boolean,
  isSecondaryContentPadded: ?boolean,
  orientation: $Values<typeof ORIENTATION>,
  href: ?string,
  className: ?string,
};
const BpkDividedCard = (props: Props) => {
  const {
    className,
    href,
    isPrimaryContentPadded,
    isSecondaryContentPadded,
    orientation,
    primaryContent,
    secondaryContent,
    ...rest
  } = props;
  const isVertical = orientation === ORIENTATION.vertical;
  const classNames = getClassName(
    'bpk-divided-card',
    isVertical ? 'bpk-divided-card--vertical' : 'bpk-divided-card--horizontal',
    className,
  );

  return (
    // $FlowFixMe[cannot-spread-inexact] - inexact rest. See 'decisions/flowfixme.md'.
    <BpkCard className={classNames} href={href} padded={false} {...rest}>
      <div
        className={getClassName(
          isVertical ? null : 'bpk-divided-card__primary--horizontal',
          isPrimaryContentPadded && 'bpk-divided-card__primary--padded',
        )}
      >
        {primaryContent}
      </div>
      <div
        className={getClassName(
          isVertical
            ? 'bpk-divided-card__secondary--vertical'
            : 'bpk-divided-card__secondary--horizontal',
          isSecondaryContentPadded && 'bpk-divided-card__secondary--padded',
        )}
      >
        {secondaryContent}
      </div>
    </BpkCard>
  );
};

BpkDividedCard.propTypes = {
  primaryContent: PropTypes.node.isRequired,
  secondaryContent: PropTypes.node.isRequired,
  isPrimaryContentPadded: PropTypes.bool,
  isSecondaryContentPadded: PropTypes.bool,
  orientation: PropTypes.oneOf(Object.keys(ORIENTATION)),
  href: PropTypes.string,
  className: PropTypes.string,
};

BpkDividedCard.defaultProps = {
  isPrimaryContentPadded: true,
  isSecondaryContentPadded: true,
  orientation: ORIENTATION.horizontal,
  href: null,
  className: null,
};

export default BpkDividedCard;
