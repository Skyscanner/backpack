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

import React from 'react';
import { cssModules } from 'bpk-react-utils';
import { storiesOf } from '@storybook/react';

import STYLES from './carousel.scss';

import BpkCarousel from './index';

const getClassName = cssModules(STYLES);

storiesOf('bpk-component-carousel', module).add('Default', () => (
  <BpkCarousel>
    <div className={getClassName('bpk-carousel-story__item')}>
      Bacon ipsum dolor amet brisket leberkas landjaeger salami pork belly
      turducken chuck drumstick cow. Strip steak spare ribs ham hock biltong,
      frankfurter pancetta tri-tip landjaeger chicken beef porchetta leberkas
      sirloin andouille burgdoggen. Fatback capicola pork belly short loin
      picanha ham. T-bone pork chop pork loin bacon. Shankle venison hamburger
      rump kevin spare ribs pork loin meatloaf salami pork pork chop ground
      round tri-tip boudin landjaeger.
    </div>
    <div className={getClassName('bpk-carousel-story__item')}>Item 2</div>
    <div className={getClassName('bpk-carousel-story__item')}>Item 3</div>
    <div className={getClassName('bpk-carousel-story__item')}>Item 4</div>

    <div className={getClassName('bpk-carousel-story__item')}>
      Bacon ipsum dolor amet brisket leberkas landjaeger salami pork belly
      turducken chuck drumstick cow. Strip steak spare ribs ham hock biltong,
      frankfurter pancetta tri-tip landjaeger chicken beef porchetta leberkas
      sirloin andouille burgdoggen. Fatback capicola pork belly short loin
      picanha ham. T-bone pork chop pork loin bacon. Shankle venison hamburger
      rump kevin spare ribs pork loin meatloaf salami pork pork chop ground
      round tri-tip boudin landjaeger.
    </div>
    <div className={getClassName('bpk-carousel-story__item')}>Item 6</div>
    <div className={getClassName('bpk-carousel-story__item')}>Item 7</div>
    <div className={getClassName('bpk-carousel-story__item')}>Item 8</div>
  </BpkCarousel>
));
