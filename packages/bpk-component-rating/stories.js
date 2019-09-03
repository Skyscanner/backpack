/*
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2016-2019 Skyscanner Ltd
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

import React from 'react';
import { storiesOf } from '@storybook/react';

import BpkRating from './index';

storiesOf('bpk-component-rating', module).add('All ratings', () => (
  <div>
    <BpkRating
      ariaLabel="9 Excellent would recommend"
      title="Excellent"
      subtitle="This place was amazing"
      value={9}
    />
    <br />
    <BpkRating
      ariaLabel="6.7 Average might recommend"
      title="Average"
      subtitle="Might recommend"
      value={6.7}
    />
    <br />
    <BpkRating
      ariaLabel="2.3 Bad avoid here"
      title="Bad"
      subtitle="Avoid here"
      value={2.3}
    />
  </div>
));
