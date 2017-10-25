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

import React from 'react';
import { storiesOf } from '@storybook/react';
import { colors } from '../bpk-tokens/tokens/base.es6';

import BpkTile from './index';

storiesOf('bpk-component-tile', module)
  .add('Using Icons in Code', () => (
    <BpkTile
      heading="Using icons in code."
      imageSource="https://www.w3schools.com/css/trolltunga.jpg"
      backgroundColor={colors.colorGreen500}
      dark
    />
  ))
  .add('Using icons in sketch.', () => (
    <BpkTile
      heading="Using icons in sketch."
      imageSource="https://www.w3schools.com/css/trolltunga.jpg"
      backgroundColor={colors.colorRed500}
    />
  ))
  .add('Illustration', () => (
    <BpkTile
      heading="Illustration guidelines and best practices."
      imageSource="https://www.w3schools.com/css/trolltunga.jpg"
      backgroundColor={colors.colorwhite}
    />
  ))
  .add('Illustration examples', () => (
    <BpkTile
      heading="Illustration examples"
      imageSource="https://www.w3schools.com/css/trolltunga.jpg"
      backgroundColor={colors.colorwhite}
    />
  ))
  .add('Copywriting', () => (
    <BpkTile
      heading="Illustration guidelines and best practices"
      imageSource="https://www.w3schools.com/css/trolltunga.jpg"
      backgroundColor={colors.colorYellow500}
    />
  ));
