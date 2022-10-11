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
import BpkText, { TEXT_STYLES } from '../../bpk-component-text';

import STYLES from './BpkPrice.module.scss';
import { SIZES, ALIGNS } from './common-types';

type Props = {
  title: string,
  size: $Values<typeof SIZES>,
  align: $Values<typeof ALIGNS>,
  className: ?string,
  subtitle: ?string,
  description: ?string,
};

const getClassName = cssModules(STYLES);

const BpkPrice = (props: Props) => {
  const { align, className, description, size, subtitle, title, ...rest } =
    props;

  const isSmall = size === SIZES.small;
  const isAlignRight = align === ALIGNS.right;

  return (
    <div
      className={getClassName(
        'bpk-price',
        isAlignRight && 'bpk-price--right',
        className,
      )}
      // $FlowFixMe[cannot-spread-inexact] - inexact rest. See 'decisions/flowfixme.md'.
      {...rest}
    >
      {subtitle && (
        <BpkText
          className={getClassName('bpk-price__subtitle')}
          textStyle={isSmall ? TEXT_STYLES.xs : TEXT_STYLES.sm}
          tagName="span"
        >
          {subtitle}
        </BpkText>
      )}
      <div
        className={isAlignRight && getClassName('bpk-price__column-container')}
      >
        <BpkText
          textStyle={isSmall ? TEXT_STYLES.heading4 : TEXT_STYLES.xxl}
          className={getClassName(
            'bpk-price__title',
            !isAlignRight && 'bpk-price__spacing',
          )}
          tagName="span"
        >
          {title}
        </BpkText>
        {description && (
          <BpkText
            textStyle={isSmall ? TEXT_STYLES.xs : TEXT_STYLES.sm}
            tagName="span"
            className={getClassName('bpk-price__description')}
          >
            {description}
          </BpkText>
        )}
      </div>
    </div>
  );
};

BpkPrice.propTypes = {
  title: PropTypes.string.isRequired,
  size: PropTypes.oneOf(Object.keys(SIZES)),
  align: PropTypes.oneOf(Object.keys(ALIGNS)),
  className: PropTypes.string,
  subtitle: PropTypes.string,
  description: PropTypes.string,
};

BpkPrice.defaultProps = {
  size: SIZES.small,
  align: ALIGNS.left,
  className: null,
  subtitle: null,
  description: null,
};

export default BpkPrice;
