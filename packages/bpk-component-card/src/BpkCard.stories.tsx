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

import { Fragment } from 'react';


import {
  coreAccentDay,
  surfaceHighlightDay,
} from '@skyscanner/bpk-foundations-web/tokens/base.es6';

import BpkText, { TEXT_STYLES } from '../../bpk-component-text';
import { cssModules } from '../../bpk-react-utils';

import BpkCard from './BpkCard';
import BpkCardWrapper from './BpkCardWrapper';
import BpkDividedCard, { ORIENTATION } from './BpkDividedCard';

import type { Meta } from '@storybook/react';

import STYLES from './BpkCard.stories.module.scss';

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
    <BpkText tagName="span" textStyle={TEXT_STYLES.label1}>
      Wrapper title
    </BpkText>
  </div>
);

const longContent = (
  <Fragment>
    <BpkText
      tagName="h3"
      textStyle={TEXT_STYLES.heading5}
      style={{ marginBottom: '8px' }}
    >
      Let&#39;s explore
    </BpkText>
    <BpkText tagName="p">
      It&#39;s your world and we&#39;ll help you explore it. Find the best
      prices across millions of flights, hotels and car hire options to create
      your perfect trip.
      <br />
    </BpkText>
  </Fragment>
);

const meta = {
  title: 'bpk-component-card',
  component: BpkCard,
  subcomponents: {
    BpkDividedCard,
    BpkCardWrapper,
  },
} satisfies Meta;

export default meta;


export const Default = {
  render: () => (
    <BpkCard onClick={() => window.open('https://www.skyscanner.net/')}>
      {shortContent}
    </BpkCard>
  ),
};

export const WithHref = {
  render: () => (
    <BpkCard href="https://skyscanner.net">{shortContent}</BpkCard>
  ),
};

export const WithoutPadding = {
  render: () => (
    <BpkCard
      padded={false}
      onClick={() => window.open('https://www.skyscanner.net/')}
    >
      {shortContent}
    </BpkCard>
  ),
};

export const NonAtomic = {
  render: () => (
    <BpkCard
      atomic={false}
      onClick={() => window.open('https://www.skyscanner.net/')}
    >
      {longContent}
    </BpkCard>
  ),
};

export const NonAtomicWithHref = {
  render: () => (
    <BpkCard atomic={false} href="https://www.skyscanner.net/">
      {longContent}
    </BpkCard>
  ),
};

export const DefaultDividedCard = {
  render: () => (
    <BpkDividedCard
      primaryContent={longMessage}
      secondaryContent={shortContent}
    />
  ),
};

export const VerticalDividedCard = {
  render: () => (
    <BpkDividedCard
      primaryContent={longMessage}
      secondaryContent={shortContent}
      orientation={ORIENTATION.vertical}
    />
  ),
};

export const WithHrefDividedCard = {
  render: () => (
    <BpkDividedCard
      primaryContent={longMessage}
      secondaryContent={shortContent}
      href="https://www.skyscanner.net/"
    />
  ),
};

export const NonElevatedDividedCard = {
  render: () => (
    <BpkDividedCard
      primaryContent={longMessage}
      secondaryContent={shortContent}
      orientation={ORIENTATION.vertical}
      isElevated={false}
    />
  ),
};

export const CardWrapper = {
  render: () => (
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
  ),
};

export const DividedCardWrapper = {
  render: () => (
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
  ),
};

export const WithClassNameWrapper = {
  render: () => (
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
  ),
};

export const VisualTest = {
  render: () => (
    <div>
      <BpkCard onClick={() => window.open('https://www.skyscanner.net/')}>
        {shortContent}
      </BpkCard>
      <br />
      <BpkCard
        padded={false}
        onClick={() => window.open('https://www.skyscanner.net/')}
      >
        {shortContent}
      </BpkCard>
      <br />
      <BpkDividedCard
        primaryContent={longMessage}
        secondaryContent={shortContent}
      />
      <br />
      <BpkDividedCard
        primaryContent={longMessage}
        secondaryContent={shortContent}
        orientation={ORIENTATION.vertical}
      />
      <br />
      <BpkDividedCard
        primaryContent={longMessage}
        secondaryContent={shortContent}
        orientation={ORIENTATION.vertical}
        isElevated={false}
      />
      <br />
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
      <br />
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
      <br />
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
    </div>
  ),
};

export const VisualTestWithZoom = {
  ...VisualTest,
  args: {
    zoomEnabled: true,
  },
};
