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

import {
  calendarDaySize,
  calendarDaySpacing,
} from '@skyscanner/bpk-foundations-web/tokens/base.es6';

const CSS_UNIT_REGEX = /(^[+-]?(?:\d*\.)?\d+)(.+)/i;

const splitToken = (value) => {
  const match = value.match(CSS_UNIT_REGEX);
  if (!match) {
    throw new Error(
      `Invalid token value. Expecting a valid css unit, got ${value}`,
    );
  }
  const [_, val, unit] = match; // eslint-disable-line no-unused-vars
  return [parseFloat(val), unit];
};

export const getCalendarGridWidth = (multiplier = 1) => {
  const [sizeValue, sizeUnit] = splitToken(calendarDaySize);
  const [spacingValue, spacingUnit] = splitToken(calendarDaySpacing);

  if (sizeUnit !== spacingUnit) {
    throw new Error(
      `'calendarDaySize' and 'calendarDaySpacing' must use the same unit. Got ${sizeUnit} and ${spacingUnit}`,
    );
  }
  const width = multiplier * (7 * (sizeValue + 2 * spacingValue));
  return `${width}${sizeUnit}`;
};

export const getTransformStyles = (transformValue) => {
  const transform = `translateX(${transformValue})`;
  return {
    transform,
    msTransform: transform,
    MozTransform: transform,
    WebkitTransform: transform,
  };
};

export const isTransitionEndSupported = () =>
  !!(typeof window !== 'undefined' && 'TransitionEvent' in window);
