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

import {
  BpkFlareBar,
  BpkContentBubble,
} from "..";
import BpkText, { TEXT_STYLES } from '../../bpk-component-text';
import { cssModules } from '../../bpk-react-utils';

import STYLES from './examples.module.scss';

const getClassName = cssModules(STYLES);

const contentShort = (
  <div className={getClassName('bpk-flare-stories__content')}>
    <BpkText tagName="h1" textStyle="xxl">
      Love planet. Will travel.
      <BpkText tagName="p" textStyle={TEXT_STYLES.bodyDefault}>
        Go discover a new adventure.
      </BpkText>
    </BpkText>
  </div>
);
const content = (
  <div className={getClassName('bpk-flare-stories__content')}>
    <BpkText tagName="h1" textStyle="xxl">
      Love planet. Will travel.
      <BpkText tagName="p" textStyle={TEXT_STYLES.bodyDefault}>
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

const FlareBarExample = () => (
  <BpkFlareBar
    className={getClassName('bpk-flare-stories__flare-bar')}
    svgClassName={getClassName('bpk-flare-stories__flare-bar--svg')}
  />
);

const ContentBubbleFullWithImageExample = () => (
  <BpkContentBubble
    className={getClassName(
      'bpk-flare-stories__content-bubble',
      'bpk-flare-stories__content-bubble--image',
      'bpk-flare-stories__content-bubble--full-width',
      'bpk-flare-stories__content-bubble--fixed-height--large',
    )}
    rounded={false}
  />
);

const ContentBubbleFullWithContentExample = () => (
  <BpkContentBubble
    className={getClassName(
      'bpk-flare-stories__content-bubble',
      'bpk-flare-stories__content-bubble--full-width',
    )}
    rounded={false}
    content={content}
  />
);

const ContentBubbleRoundedExample = () => (
  <div className={getClassName('bpk-flare-stories__container')}>
    <BpkContentBubble
    className={getClassName(
      'bpk-flare-stories__content-bubble',
    )}
    rounded
    flareProps={{svgClassName: getClassName('bpk-flare-stories__flare-bar--svg')}}
    content={content}
  />
</div>
);

const ContentBubbleStandaloneExample = () => (
  <BpkContentBubble
    className={getClassName('bpk-flare-stories__content-bubble')}
    showPointer
    rounded={false}
    content={content}
  />
);

const ContentBubbleFixedHeightExample = () => (
  <BpkContentBubble
    className={getClassName(
      'bpk-flare-stories__content-bubble',
      'bpk-flare-stories__content-bubble--fixed-height',
    )}
    rounded={false}
    content={contentShort}
  />
);

const ContentBubblePointerHiddenRoundedExample = () => (
  <BpkContentBubble
    className={getClassName(
      'bpk-flare-stories__content-bubble',
      'bpk-flare-stories__content-bubble--image',
      'bpk-flare-stories__content-bubble--full-width',
      'bpk-flare-stories__content-bubble--fixed-height',
    )}
    style={{ height: '45rem' }}
    rounded
    showPointer={false}
    content={contentShort}
  />
);

const MixedExample = () => (
  <div>
    <ContentBubbleRoundedExample />
    <ContentBubbleFixedHeightExample />
    <ContentBubbleFullWithContentExample />
  </div>
);

export {
  FlareBarExample,
  ContentBubbleFullWithImageExample,
  ContentBubbleFullWithContentExample,
  ContentBubbleRoundedExample,
  ContentBubbleStandaloneExample,
  ContentBubbleFixedHeightExample,
  ContentBubblePointerHiddenRoundedExample,
  MixedExample,
};
