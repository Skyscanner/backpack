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

import { isRTL } from '../../bpk-react-utils';

const rtlConditionalValue = <T,>(ltrValue: T, rtlValue: T): T =>
  isRTL() ? rtlValue : ltrValue;

// Setting type as any as data which is passed to this function can be of any type
const applyArrayRTLTransform = <T,>(arr: T[]): T[] =>
  isRTL() ? arr.slice(0).reverse() : arr;

type MarginObject = {
  left: number;
  right: number;
  top: number;
  bottom: number;
};

const applyMarginRTLTransform = (obj: MarginObject): MarginObject => {
  if (!isRTL()) {
    return obj;
  }
  const { left, right, ...rest } = obj;
  // $FlowFixMe[cannot-spread-inexact] - inexact rest. See 'decisions/flowfixme.md'.
  return {
    left: right,
    right: left,
    ...rest,
  };
};

export {
  applyArrayRTLTransform,
  applyMarginRTLTransform,
  rtlConditionalValue,
  isRTL,
};
