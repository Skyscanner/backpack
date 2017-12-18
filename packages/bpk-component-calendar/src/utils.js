/*
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2017 Skyscanner Ltd
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
} from 'bpk-tokens/tokens/base.es6';

const remToPx = value => {
  let parsed = null;

  if (/rem$/.test(value)) {
    parsed = parseFloat(value.replace(/rem/, '')) * 16;
  }

  return parsed || null;
};

export const getCalendarGridWidth = () =>
  7 * (remToPx(calendarDaySize) + remToPx(calendarDaySpacing));

export const getTransformStyles = transformValue => {
  const transform = `translateX(${transformValue}px)`;
  return {
    transform,
    msTransform: transform,
    MozTransform: transform,
    WebkitTransform: transform,
  };
};

export const getScriptDirection = () => {
  const html = document.querySelector('html');
  return window.getComputedStyle(html, null).getPropertyValue('direction');
};

export const isTransitionEndSupported = () =>
  !!(typeof window !== 'undefined' && 'TransitionEvent' in window);
