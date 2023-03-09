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

import { Fragment } from 'react';
import {
  coreAccentDay,
  surfaceHighlightDay,
} from '@skyscanner/bpk-foundations-web/tokens/base.es6';

import { cssModules } from '../../packages/bpk-react-utils';
import BpkLink from '../../packages/bpk-component-link';
import BpkText, { TEXT_STYLES } from '../../packages/bpk-component-text';
import BpkCard, {
  BpkDividedCard,
  BpkCardWrapper,
  ORIENTATION,
} from '../../packages/bpk-component-card';

import STYLES from './examples.module.scss';

const getClassName = cssModules(STYLES);

const shortContent = 'Book your next trip on skyscanner.net.';
const longMessage = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque sagittis sagittis purus, id
blandit ipsum. Pellentesque nec diam nec erat condimentum dapibus. Nunc diam augue, egestas id egestas ut, facilisis
nec mi. Donec et congue odio, nec laoreet est. Integer rhoncus varius arcu, a fringilla libero laoreet at. Mauris
porta varius ullamcorper. Sed laoreet libero mauris, non pretium lectus accumsan et. Suspendisse vehicula ullamcorper
sapien, et dapibus mi aliquet non. Pellentesque auctor sagittis lectus vitae rhoncus. Fusce id enim porttitor, mattis
ante in, vestibulum nulla.`;
const headerContent = (
  <div className={getClassName('bpk-card-examples__header')}>
    <BpkText tagName="span">Here is header</BpkText>
  </div>
);
const longContent = (
  <Fragment>
    <BpkText tagName="h3" textStyle={TEXT_STYLES.bodyLongform}>
      Let&#39;s explore
    </BpkText>
    <BpkText tagName="p">
      It&#39;s your world and we&#39;ll help you explore it. Find the best
      prices across millions of flights, hotels and car hire options to create
      your perfect trip.
      <br />
      <BpkLink href="http://www.skyscanner.net/">Go to Skyscanner</BpkLink>
    </BpkText>
  </Fragment>
);

const DefaultExample = () => (
  <BpkCard onClick={() => window.open('https://www.skyscanner.net/')}>
    {shortContent}
  </BpkCard>
);

const WithHrefExample = () => (
  <BpkCard href="https://skyscanner.net">{shortContent}</BpkCard>
);

const WithoutPaddingExample = () => (
  <BpkCard
    padded={false}
    onClick={() => window.open('https://www.skyscanner.net/')}
  >
    {shortContent}
  </BpkCard>
);

const NonAtomicExample = () => (
  <BpkCard
    atomic={false}
    onClick={() => window.open('https://www.skyscanner.net/')}
  >
    {longContent}
  </BpkCard>
);

const NonAtomicHrefExample = () => (
  <BpkCard atomic={false} href="https://www.skyscanner.net/">
    {longContent}
  </BpkCard>
);

const DefaultDividedCardExample = () => (
  <BpkDividedCard
    primaryContent={longMessage}
    secondaryContent={shortContent}
  />
);

const VerticalDividedCardExample = () => (
  // eslint-disable-next-line backpack/use-tokens
  <div style={{ width: 343 }}>
    <BpkDividedCard
      primaryContent={longMessage}
      secondaryContent={shortContent}
      orientation={ORIENTATION.vertical}
    />
  </div>
);
const WithHrefDividedCardExample = () => (
  <BpkDividedCard
    primaryContent={longMessage}
    secondaryContent={shortContent}
    href="http://www.skyscanner.net/"
  />
);

const NonElevatedDividedCardExample = () => (
  // eslint-disable-next-line backpack/use-tokens
  <div style={{ width: 343 }}>
    <BpkDividedCard
      primaryContent={longMessage}
      secondaryContent={shortContent}
      orientation={ORIENTATION.vertical}
      isElevated={false}
    />
  </div>
);

const CardWrapperExample = () => (
  <BpkCardWrapper
    backgroundColor={coreAccentDay}
    card={
      <BpkCard
        atomic={false}
        onClick={() => window.open('https://www.skyscanner.net/')}
      >
        {longContent}
      </BpkCard>
    }
    header={headerContent}
  />
);

const DividedCardWrapperExample = () => (
  <BpkCardWrapper
    backgroundColor={coreAccentDay}
    card={
      <BpkDividedCard
        primaryContent={longMessage}
        secondaryContent={shortContent}
        isElevated={false}
      />
    }
    header={headerContent}
  />
);

const WithClassNameWrapperExample = () => (
  <BpkCardWrapper
    backgroundColor={surfaceHighlightDay}
    card={
      <BpkCard
        atomic={false}
        onClick={() => window.open('https://www.skyscanner.net/')}
      >
        {longContent}
      </BpkCard>
    }
    header={headerContent}
    className={getClassName('bpk-card-examples__wrapper')}
  />
);

const MixedExample = () => (
  <div>
    <DefaultExample />
    <br />
    <WithoutPaddingExample />
    <br />
    <DefaultDividedCardExample />
    <br />
    <VerticalDividedCardExample />
    <br />
    <NonElevatedDividedCardExample />
    <br />
    <CardWrapperExample />
    <br />
    <DividedCardWrapperExample />
    <br />
    <WithClassNameWrapperExample />
  </div>
);

export {
  DefaultExample,
  WithHrefExample,
  WithoutPaddingExample,
  NonAtomicExample,
  NonAtomicHrefExample,
  DefaultDividedCardExample,
  VerticalDividedCardExample,
  WithHrefDividedCardExample,
  NonElevatedDividedCardExample,
  CardWrapperExample,
  DividedCardWrapperExample,
  WithClassNameWrapperExample,
  MixedExample,
};
