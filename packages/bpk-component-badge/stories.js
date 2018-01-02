/*
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2018 Skyscanner Ltd
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
import { colorGray700, spacingXxl } from 'bpk-tokens/tokens/base.es6';

import BpkBadge from './index';

const DockedContainer = props => (
  <div
    {...props}
    style={{
      backgroundColor: colorGray700,
      minHeight: spacingXxl,
      position: 'relative',
    }}
  />
);

storiesOf('bpk-component-badge', module)
  .add('Default', () => (
    <div>
      This is a badge <BpkBadge>Promocionado</BpkBadge>
    </div>
  ))
  .add('Centered', () => (
    <div>
      This is a badge <BpkBadge centered>Promocionado</BpkBadge>
    </div>
  ))
  .add('Docked right', () => (
    <DockedContainer>
      <BpkBadge docked="right">Promocionado</BpkBadge>
    </DockedContainer>
  ))
  .add('Docked left', () => (
    <DockedContainer>
      <BpkBadge docked="left">Promocionado</BpkBadge>
    </DockedContainer>
  ));
