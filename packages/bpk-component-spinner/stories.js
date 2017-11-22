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

import SpinnerLayout from './SpinnerLayout';
import { BpkSpinner, BpkLargeSpinner, BpkExtraLargeSpinner, SPINNER_TYPES } from './index';


storiesOf('bpk-component-spinner', module)
  .add('Small', () => (
    <SpinnerLayout>
      <BpkSpinner />
      <BpkSpinner type={SPINNER_TYPES.light} />
      <BpkSpinner type={SPINNER_TYPES.dark} />
    </SpinnerLayout>
  ))
  .add('Large', () => (
    <SpinnerLayout>
      <BpkLargeSpinner />
      <BpkLargeSpinner type={SPINNER_TYPES.light} />
      <BpkLargeSpinner type={SPINNER_TYPES.dark} />
    </SpinnerLayout>
  ))
  .add('Extra large', () => (
    <SpinnerLayout>
      <BpkExtraLargeSpinner />
      <BpkExtraLargeSpinner type={SPINNER_TYPES.light} />
      <BpkExtraLargeSpinner type={SPINNER_TYPES.dark} />
    </SpinnerLayout>
  ));
