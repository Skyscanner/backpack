/*
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2016-2020 Skyscanner Ltd
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

import STYLES from './stories.scss';

import BpkCarousel from './index';

const getClassName = cssModules(STYLES);

const carouselItems = Array(10)
  .fill(0)
  .map((_, index) => (
    <div className={getClassName('bpk-carousel-story__item')}>
      Item {index + 1}
    </div>
  ));

storiesOf('bpk-component-carousel', module)
  .add('Default', () => <BpkCarousel>{carouselItems}</BpkCarousel>)
  .add('Tall Carousel Items', () => (
    <BpkCarousel>
      <div className={getClassName('bpk-carousel-story__item')}>
        Bacon ipsum dolor amet kielbasa tail burgdoggen hamburger jerky, alcatra
        tongue flank spare ribs buffalo. Frankfurter picanha turkey pork loin
        beef ribs doner rump salami corned beef pig short ribs ham hock alcatra
        tongue filet mignon.
      </div>
      <div className={getClassName('bpk-carousel-story__item')}>
        Short loin spare ribs burgdoggen pig cupim drumstick doner tail, corned
        beef meatball tongue. Sirloin drumstick t-bone tri-tip brisket. Rump
        swine drumstick spare ribs, meatloaf ham frankfurter corned beef cow
        shank leberkas tail bresaola ribeye kielbasa.
      </div>
      <div className={getClassName('bpk-carousel-story__item')}>
        Frankfurter shankle doner chuck, buffalo short loin cupim tongue tail
        ground round chislic leberkas bacon. Flank capicola doner sirloin
        tri-tip biltong. Burgdoggen buffalo ham hock short ribs jowl sausage
        prosciutto alcatra bresaola landjaeger. Cupim tongue t-bone, tri-tip
        chuck flank pastrami chicken picanha.
      </div>
      <div className={getClassName('bpk-carousel-story__item')}>
        Frankfurter shankle doner chuck, buffalo short loin cupim tongue tail
        ground round chislic leberkas bacon. Flank capicola doner sirloin
        tri-tip biltong. Burgdoggen buffalo ham hock short ribs jowl sausage
        prosciutto alcatra bresaola landjaeger. Cupim tongue t-bone, tri-tip
        chuck flank pastrami chicken picanha.
      </div>
    </BpkCarousel>
  ))
  .add('Single Carousel Item', () => (
    <BpkCarousel>
      <div className={getClassName('bpk-carousel-story__item')}>
        Bacon ipsum dolor amet kielbasa tail burgdoggen hamburger jerky, alcatra
        tongue flank spare ribs buffalo. Frankfurter picanha turkey pork loin
        beef ribs doner rump salami corned beef pig short ribs ham hock alcatra
        tongue filet mignon.
      </div>
    </BpkCarousel>
  ))
  .add('Two Carousel Items', () => (
    <BpkCarousel>
      <div className={getClassName('bpk-carousel-story__item')}>
        Bacon ipsum dolor amet kielbasa tail burgdoggen hamburger jerky, alcatra
        tongue flank spare ribs buffalo. Frankfurter picanha turkey pork loin
        beef ribs doner rump salami corned beef pig short ribs ham hock alcatra
        tongue filet mignon.
      </div>
      <div className={getClassName('bpk-carousel-story__item')}>
        Bacon ipsum dolor amet kielbasa tail burgdoggen hamburger jerky, alcatra
        tongue flank spare ribs buffalo. Frankfurter picanha turkey pork loin
        beef ribs doner rump salami corned beef pig short ribs ham hock alcatra
        tongue filet mignon.
      </div>
    </BpkCarousel>
  ));
