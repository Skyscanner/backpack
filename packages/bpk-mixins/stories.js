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
import { cssModules } from 'bpk-react-utils';

import STYLES from './stories.css';

const getClassName = cssModules(STYLES);

storiesOf('bpk-mixins', module)
  .add('bpk-icon-lg mixin', () => (
    <span className={getClassName('bpk-icon-lg__chart')} />
  ))
  .add('bpk-icon-sm mixin', () => (
    <span className={getClassName('bpk-icon-sm__chart')} />
  ))
  .add('bpk-icon mixin (small)', () => (
    <span className={getClassName('bpk-icon__chart--small')} />
  ))
  .add('bpk-icon mixin (large)', () => (
    <span className={getClassName('bpk-icon__chart--large')} />
  ))
  .add('bpk-breakpoint-*', () => (
    <div>
      <div className={getClassName('bpk-breakpoint-mobile')}>MOBILE</div>
      <div className={getClassName('bpk-breakpoint-tablet')}>TABLET</div>
      <div className={getClassName('bpk-breakpoint-tablet-only')}>
        TABLET ONLY
      </div>
      <div className={getClassName('bpk-breakpoint-above-mobile')}>
        ABOVE MOBILE
      </div>
      <div className={getClassName('bpk-breakpoint-above-tablet')}>
        ABOVE TABLET
      </div>
    </div>
  ));
