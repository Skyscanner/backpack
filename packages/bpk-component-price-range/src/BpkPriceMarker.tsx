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

import type { ForwardedRef } from 'react';
import { forwardRef } from 'react';

import type { MarkerType } from './common-types';

import STYLES from './BpkPriceMarker.module.scss';

import BpkText, { TEXT_STYLES } from '@backpack/bpk-component-text/src/BpkText';
import { cssModules } from '@backpack/bpk-react-utils';



const getClassName = cssModules(STYLES);

type Props = {
  priceLabel: string;
  type: MarkerType;
};

const BpkPriceMarker = (
  { priceLabel, type }: Props,
  ref: ForwardedRef<HTMLDivElement>,
) => (
  <div
    className={getClassName('bpk-price-marker', `bpk-price-marker--${type}`)}
    ref={ref}
  >
    <BpkText textStyle={TEXT_STYLES.label2}>{priceLabel}</BpkText>
    <div className={getClassName('bpk-price-marker__arrow')} />
  </div>
);

export default forwardRef(BpkPriceMarker);
