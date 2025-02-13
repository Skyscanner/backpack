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
import type { Node } from 'react';

import BpkText, { TEXT_STYLES } from '../../bpk-component-text';
import { cssModules } from '../../bpk-react-utils';

import { SIZES, ALIGNS } from './common-types';

import STYLES from './BpkPrice.module.scss';

type Props = {
  price: string,
  size: $Values<typeof SIZES>,
  align: $Values<typeof ALIGNS>,
  className: ?string,
  leadingText: ?string,
  /**
   * **Experimental** This prop is experimental and subject to change.
   * Use with caution.
   */
  leadingClassName: ?string,
  trailingText: ?string,
  previousPrice: ?string,
  icon?: Node,
};

const getClassName = cssModules(STYLES);

const getPriceTextStyle = (size: $Values<typeof SIZES>) => {
  if (size === SIZES.small) {
    return TEXT_STYLES.heading4;
  }

  if (size === SIZES.large) {
    return TEXT_STYLES.xxl;
  }

  return TEXT_STYLES.heading5;
};

const getDefaultTextStyle = (size: $Values<typeof SIZES>) => {
  if (size === SIZES.large) {
    return TEXT_STYLES.sm;
  }

  return TEXT_STYLES.xs;
};

const BpkPrice = (props: Props) => {
  const {
    align,
    className,
    icon,
    leadingClassName,
    leadingText,
    previousPrice,
    price,
    size,
    trailingText,
    ...rest
  } = props;

  const defaultTextStyle = getDefaultTextStyle(size);
  const priceTextStyle = getPriceTextStyle(size);
  const isAlignRight = align === ALIGNS.right;

  const getTrailingTextNode = () => {
    if (!trailingText) {
      return null;
    }
    const textNode = (
      <BpkText textStyle={defaultTextStyle} tagName="span">
        {trailingText}
      </BpkText>
    );
    // When aligned right, use a <div> as the text appears on a separate line.
    // When aligned left, use a <span> as the test is inline.
    return isAlignRight ? (
      <div className={getClassName('bpk-price__trailing')}>{textNode}</div>
    ) : (
      <span className={getClassName('bpk-price__trailing')}>{textNode}</span>
    );
  };

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
      <div
        className={getClassName(
          previousPrice && 'bpk-price__leading',
          isAlignRight && 'bpk-price__leading--right',
          leadingClassName,
        )}
      >
        {previousPrice && (
          <span className={getClassName('bpk-price__previous-price')}>
            <BpkText textStyle={defaultTextStyle} tagName="span">
              {previousPrice}
            </BpkText>
          </span>
        )}
        {previousPrice && leadingText && (
          <span className={getClassName('bpk-price__separator')}>
            <BpkText textStyle={defaultTextStyle} tagName="span">
              &#67871;
            </BpkText>
          </span>
        )}
        {leadingText && (
          <BpkText textStyle={defaultTextStyle} tagName="span">
            {leadingText}
          </BpkText>
        )}
      </div>
      <div className={getClassName(isAlignRight && 'bpk-price__main--right')}>
        <span
          className={getClassName(
            'bpk-price__price',
            // When aligning right, we use the gap property to add space between the price and the icon.
            // When aligning left, we use the ::after pseudo-element instead to achieve the desired wrapping behaviour.
            !isAlignRight && 'bpk-price__spacing',
          )}
        >
          <BpkText textStyle={priceTextStyle} tagName="span">
            {price}
          </BpkText>
        </span>
        {icon && (
          <span
            className={getClassName(
              'bpk-price__icon',
              !isAlignRight && 'bpk-price__spacing',
            )}
          >
            {icon}
          </span>
        )}
        {!isAlignRight && getTrailingTextNode()}
      </div>
      {isAlignRight && getTrailingTextNode()}
    </div>
  );
};

BpkPrice.propTypes = {
  price: PropTypes.string.isRequired,
  size: PropTypes.oneOf(Object.keys(SIZES)),
  align: PropTypes.oneOf(Object.keys(ALIGNS)),
  className: PropTypes.string,
  leadingText: PropTypes.string,
  trailingText: PropTypes.string,
  previousPrice: PropTypes.string,
  leadingClassName: PropTypes.string,
};

BpkPrice.defaultProps = {
  size: SIZES.small,
  align: ALIGNS.left,
  className: null,
  leadingText: null,
  trailingText: null,
  previousPrice: null,
  leadingClassName: null,
};

export default BpkPrice;
