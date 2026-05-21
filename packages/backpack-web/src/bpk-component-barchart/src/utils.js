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

// Using Function here as scale refers to the d3-scale 3rd party library
const center = (scale: Function) => {
  let offset = scale.bandwidth() / 2;
  if (scale.round()) {
    offset = Math.round(offset);
  }
  return (d: number) => scale(d) + offset;
};

// Using any here as x can be any form see utils-test.js
const identity = (x: any) => x;

const remToPx = (value: string) => {
  let parsed = 0;

  if (/rem$/.test(value)) {
    parsed = parseFloat(value.replace(/rem/, '')) * 16;
  }

  return parsed;
};

export { center, identity, remToPx };
