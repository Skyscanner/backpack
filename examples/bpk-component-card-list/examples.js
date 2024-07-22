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

import { useState } from 'react';

import BpkCard from '../../packages/bpk-component-card';
import BpkCardList from '../../packages/bpk-component-card-list';
import BpkImage from '../../packages/bpk-component-image';
import BpkLink from '../../packages/bpk-component-link';
import BpkText, { TEXT_STYLES } from '../../packages/bpk-component-text';

import STYLES from './examples.module.scss';

const DealsCard = (i) => (
  <BpkCard atomic={false} onClick={() => null}>
    <BpkText
      tagName="h3"
      textStyle={TEXT_STYLES.heading5}
      style={{ marginBottom: '8px' }}
    >
      {`Let's explore Deal ${i}`}
    </BpkText>
    <BpkText tagName="p">
      {`It's your world and we'll help you explore it. Find the best prices across millions of flights, hotels and car hire options to create your perfect trip.`}
      <br />
    </BpkText>
  </BpkCard>
);
const DestinationCard = (i) => (
  <BpkCard href="/" className={STYLES['bpk-destinationCard']} padded={false}>
    <BpkImage
      aspectRatio={3000 / 1800}
      className={STYLES['bpk-destinationCard-image']}
      src="https://content.skyscnr.com/7adba3a46af3ca29695f96937d19fcf1/GettyImages-149127892.jpg?crop=960px:640px&quality=100"
    />

    <div className={STYLES['bpk-bottom']}>
      <div className={STYLES['bpk-column']}>
        <BpkText textStyle={TEXT_STYLES.heading4}>
          {`Destination Name ${i}`}
        </BpkText>
        <BpkText>Country</BpkText>
      </div>

      <div className={STYLES['bpk-column']}>
        <BpkText>Direct</BpkText>
        <BpkText textStyle={TEXT_STYLES.heading4}>£100</BpkText>
      </div>
    </div>
  </BpkCard>
);
const InternalLinkCard = (i) => (
  <BpkCard href="/" className={STYLES['bpk-internalLinkCard']} padded={false}>
    <BpkImage
      className={STYLES['bpk-image']}
      aspectRatio={1000 / 1000}
      src="https://content.skyscnr.com/fa0912c6ed6f75f0607dfc080359a021/amsterdam.jpg?crop=100px:100px&quality=90"
    />

    <div className={STYLES['bpk-info']}>
      <BpkText
        textStyle={TEXT_STYLES.heading5}
      >{`Amsterdam Schiphol ${i}`}</BpkText>

      <div className={STYLES['bpk-verticalLinks']}>
        <BpkLink href="#">Flights</BpkLink>
        <span aria-hidden className={STYLES['bpk-verticalLinks_bullet']}>
          {'\u2022'}
        </span>
        <BpkLink href="#">Hotels</BpkLink>
        <span aria-hidden className={STYLES['bpk-verticalLinks_bullet']}>
          {'\u2022'}
        </span>
        <BpkLink href="#">Car Hire</BpkLink>
      </div>
    </div>
  </BpkCard>
);
const cards = (cardType) => [...Array(14).keys()].map((i) => cardType(i));

const title = 'Must-visit spots';
const description =
  'Check out these world-famous destinations perfect for visiting in spring.';

const GridToRailExample = () => {
  const [collapsed, setCollapsed] = useState(true);
  const expandText = 'Show More';
  const collapseText = 'Show Less';

  const onButtonClick = () => {
    setCollapsed(!collapsed);
  };

  return (
    <BpkCardList
      cardList={cards(InternalLinkCard)}
      accessory="expand"
      layoutDesktop="grid"
      layoutMobile="rail"
      title={title}
      onButtonClick={onButtonClick}
      description={description}
      expandText={collapsed ? expandText : collapseText}
    />
  );
};

const GridToStackExample = () => {
  const [collapsed, setCollapsed] = useState(true);
  const expandText = 'Show More';
  const collapseText = 'Show Less';

  const onButtonClick = () => {
    setCollapsed(!collapsed);
  };

  return (
    <BpkCardList
      cardList={cards(DealsCard)}
      accessory="expand"
      layoutDesktop="grid"
      layoutMobile="stack"
      title={title}
      description={description}
      initiallyShownCards={4}
      expandText={collapsed ? expandText : collapseText}
      onButtonClick={onButtonClick}
    />
  );
};

const GridToStackWithButtonExample = () => (
  <BpkCardList
    cardList={cards(DestinationCard)}
    accessory="button"
    layoutDesktop="grid"
    layoutMobile="stack"
    title={title}
    description={description}
    buttonText="Explore More"
  />
);

const RowToRailWith5InitiallyShownCardsExample = () => (
  <BpkCardList
    cardList={cards(DealsCard)}
    accessory="pagination"
    layoutDesktop="row"
    layoutMobile="rail"
    title={title}
    description={description}
    initiallyShownCards={5}
    buttonText="Explore more"
  />
);
const RowToRailExample = () => (
  <BpkCardList
    cardList={cards(DealsCard)}
    accessory="pagination"
    layoutDesktop="row"
    layoutMobile="rail"
    title={title}
    description={description}
  />
);
const RowToStackExample = () => (
  <BpkCardList
    cardList={cards(DestinationCard)}
    accessory="pagination"
    layoutDesktop="row"
    layoutMobile="stack"
    title={title}
    description={description}
  />
);

export {
  RowToRailExample,
  RowToRailWith5InitiallyShownCardsExample,
  GridToRailExample,
  GridToStackWithButtonExample,
  RowToStackExample,
  GridToStackExample,
};
