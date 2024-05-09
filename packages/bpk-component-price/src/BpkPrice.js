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
};

const getClassName = cssModules(STYLES);

const BpkPrice = (props: Props) => {
  const {
    align,
    className,
    leadingClassName,
    leadingText,
    previousPrice,
    price,
    size,
    trailingText,
    ...rest
  } = props;

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
      <div
        className={getClassName(
          previousPrice && 'bpk-price__leading',
          isAlignRight && 'bpk-price__leading--right',
          leadingClassName,
        )}
      >
        {previousPrice && (
          <span className={getClassName('bpk-price__previous-price')}>
            <BpkText
              textStyle={isSmall ? TEXT_STYLES.xs : TEXT_STYLES.sm}
              tagName="span"
            >
              {previousPrice}
            </BpkText>
          </span>
        )}
        {previousPrice && leadingText && (
          <span className={getClassName('bpk-price__separator')}>
            <BpkText
              textStyle={isSmall ? TEXT_STYLES.xs : TEXT_STYLES.sm}
              tagName="span"
            >
              &#67871;
            </BpkText>
          </span>
        )}

        {leadingText && (
          <BpkText
            textStyle={isSmall ? TEXT_STYLES.xs : TEXT_STYLES.sm}
            tagName="span"
          >
            {leadingText}
          </BpkText>
        )}
      </div>
      <div
        className={getClassName(isAlignRight && 'bpk-price__column-container')}
      >
        <span className={getClassName('bpk-price__price', !isAlignRight && 'bpk-price__spacing')}>
          <BpkText
            textStyle={isSmall ? TEXT_STYLES.heading4 : TEXT_STYLES.xxl}
            tagName="span"
          >
            {price}
          </BpkText>
        </span>
        {trailingText && (
          <span className={getClassName('bpk-price__trailing')}>
            <BpkText
              textStyle={isSmall ? TEXT_STYLES.xs : TEXT_STYLES.sm}
              tagName="span"
            >
              {trailingText}
            </BpkText>
          </span>
        )}
      </div>
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
