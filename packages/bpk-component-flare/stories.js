/*
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2016-2021 Skyscanner Ltd
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
import BpkText from 'bpk-component-text';
import { cssModules } from 'bpk-react-utils';

import { BpkFlareBar, BpkContentBubble } from './index';

// eslint-disable-next-line import/order
import STYLES from './stories.scss';

const getClassName = cssModules(STYLES);

const contentShort = (
  <div className={getClassName('bpk-flare-stories__content')}>
    <BpkText tagName="h1" textStyle="xxl">
      Love planet. Will travel.
      <BpkText tagName="p" textStyle="base">
        Lorem ipsum dolor sit amet!
      </BpkText>
    </BpkText>
  </div>
);
const content = (
  <div className={getClassName('bpk-flare-stories__content')}>
    <BpkText tagName="h1" textStyle="xxl">
      Love planet. Will travel.
      <BpkText tagName="p" textStyle="base">
        Lorem ipsum dolor sit amet consectetur adipiscing elit, volutpat tellus
        massa taciti platea auctor, accumsan egestas cubilia ultricies lacus
        consequat. Vulputate quisque dignissim habitant urna accumsan tempor
        praesent, quam torquent sem nascetur cubilia odio, convallis dapibus
        senectus natoque sociis ante. Cras interdum feugiat quisque per dis
        lacus cubilia sem, orci sodales mauris a quis mollis duis nam curabitur,
        laoreet ad eros class aliquet sagittis rutrum. Rhoncus integer mi platea
        suscipit dictum facilisis, sociis nam enim tincidunt conubia. Himenaeos
        eros ornare vestibulum laoreet in accumsan, eleifend interdum tellus
        ligula suspendisse nisl, hac magna conubia habitasse nunc. Ligula mattis
        euismod libero volutpat ut taciti tincidunt parturient class elementum
        pellentesque porta, proin magnis fringilla sociosqu rutrum placerat nec
        lacus tempor fusce netus etiam, cubilia tellus facilisi duis leo morbi
        mauris at augue varius nunc. Lorem ipsum dolor sit amet consectetur
        adipiscing elit, volutpat tellus massa taciti platea auctor, accumsan
        egestas cubilia ultricies lacus consequat. Vulputate quisque dignissim
        habitant urna accumsan.
      </BpkText>
    </BpkText>
  </div>
);

storiesOf('bpk-component-flare', module)
  .add('BpkFlareBar - default', () => (
    <BpkFlareBar
      className={getClassName('bpk-flare-stories__flare-bar')}
      svgClassName={getClassName('bpk-flare-stories__flare-bar--svg')}
    />
  ))
  .add('BpkFlareBar - rounded', () => (
    <BpkFlareBar
      className={getClassName('bpk-flare-stories__flare-bar')}
      rounded
      svgClassName={getClassName('bpk-flare-stories__flare-bar--svg')}
    />
  ))
  .add('BpkContentBubble - Full width with background image', () => (
    <BpkContentBubble
      className={[
        getClassName('bpk-flare-stories__content-bubble'),
        getClassName('bpk-flare-stories__content-bubble--image'),
        getClassName('bpk-flare-stories__content-bubble--full-width'),
        getClassName('bpk-flare-stories__content-bubble--fixed-height--large'),
      ].join(' ')}
      rounded={false}
    />
  ))
  .add('BpkContentBubble - full width with content', () => (
    <BpkContentBubble
      className={[
        getClassName('bpk-flare-stories__content-bubble'),
        getClassName('bpk-flare-stories__content-bubble--full-width'),
      ].join(' ')}
      rounded={false}
      content={content}
    />
  ))
  .add('BpkContentBubble - standalone', () => (
    <BpkContentBubble
      className={getClassName('bpk-flare-stories__content-bubble')}
      content={content}
    />
  ))
  .add('BpkContentBubble - fixed height', () => (
    <BpkContentBubble
      className={[
        getClassName('bpk-flare-stories__content-bubble'),
        getClassName('bpk-flare-stories__content-bubble--fixed-height'),
      ].join(' ')}
      flareProps={{
        trailingBlockClassName: getClassName(
          'stories__flare-bar--block--small',
        ),
      }}
      content={contentShort}
    />
  ))
  .add('BpkContentBubble - pointer hidden', () => (
    <BpkContentBubble
      className={[
        getClassName('bpk-flare-stories__content-bubble'),
        getClassName('bpk-flare-stories__content-bubble--image'),
        getClassName('bpk-flare-stories__content-bubble--full-width'),
        getClassName('bpk-flare-stories__content-bubble--fixed-height'),
      ].join(' ')}
      style={{ height: '45rem' }}
      rounded={false}
      showPointer={false}
    />
  ));
