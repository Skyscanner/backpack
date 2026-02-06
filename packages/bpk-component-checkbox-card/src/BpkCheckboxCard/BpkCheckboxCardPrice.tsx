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

// @ts-expect-error Untyped import. See `decisions/imports-ts-suppressions.md`.
import BpkPrice from '../../../bpk-component-price';
import { cssModules } from '../../../bpk-react-utils';

import STYLES from './BpkCheckboxCard.module.scss';

const getClassName = cssModules(STYLES);

export type BpkCheckboxCardPriceProps = {
  /**
   * Price value to display (e.g., "85", "£85")
   */
  price: string;

  /**
   * Optional leading text (e.g., "from")
   */
  leadingText?: string;

  /**
   * Price size
   * @default "small"
   */
  size?: 'xsmall' | 'small' | 'medium' | 'large';

  /**
   * Price alignment
   * @default "left"
   */
  align?: 'left' | 'right';
};

/**
 * BpkCheckboxCard.Price - Price slot component
 *
 * Displays price information using BpkPrice component internally.
 *
 * @returns {JSX.Element} Rendered price slot content.
 *
 * @example Basic usage
 * <BpkCheckboxCard.Price price="£85" />
 *
 * @example With leading text
 * <BpkCheckboxCard.Price price="£85" leadingText="from" />
 */
export function BpkCheckboxCardPrice({
  align = 'left',
  leadingText,
  price,
  size = 'small',
}: BpkCheckboxCardPriceProps) {
  const className = getClassName('bpk-checkbox-card-price');

  return (
    <div className={className}>
      <BpkPrice
        price={price}
        leadingText={leadingText}
        size={size}
        align={align}
      />
    </div>
  );
}
