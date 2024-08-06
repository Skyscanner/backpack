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
// @ts-ignore
import BpkLink from '../../packages/bpk-component-link';
import BpkText, { TEXT_STYLES } from '../../packages/bpk-component-text';

import STYLES from './examples.module.scss';

const DealsCard = (i: number) => (
  <BpkCard atomic={false} onClick={() => null}>
    <BpkText tagName="h3" textStyle={TEXT_STYLES.heading5}>
      {`Let's explore Deal ${i}`}
    </BpkText>
    <BpkText tagName="p">
      {`It's your world and we'll help you explore it. Find the best prices across millions of flights, hotels and car hire options to create your perfect trip.`}
      <br />
    </BpkText>
  </BpkCard>
);
const DestinationCard = (i: number) => (
  <BpkCard href="/" padded={false}>
    <div className={STYLES['bpkdocs-consumer-level']}>
      <BpkImage
        aspectRatio={3000 / 1800}
        altText="card image"
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
    </div>
  </BpkCard>
);
const InternalLinkCard = (i: number) => (
  <BpkCard href="/" padded={false}>
    <div className={STYLES['bpkdocs-consumer-level__internal-card']}>
      <div className={STYLES['bpkdocs-internal-link-img']}>
        <BpkImage
          aspectRatio={1}
          altText="card image"
          src="https://content.skyscnr.com/fa0912c6ed6f75f0607dfc080359a021/amsterdam.jpg?crop=100px:100px&quality=90"
        />
      </div>

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
    </div>
  </BpkCard>
);

type ExampleCard =
  | typeof InternalLinkCard
  | typeof DealsCard
  | typeof DestinationCard;
const cards = (cardType: ExampleCard) => {
  const cardList = [];
  for (let i = 0; i < 14; i += 1) {
    cardList.push(cardType(i));
  }
  return cardList;
};

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
      accessory="expand"
      cardList={cards(InternalLinkCard)}
      description={description}
      expandText={collapsed ? expandText : collapseText}
      layoutDesktop="grid"
      layoutMobile="rail"
      onButtonClick={onButtonClick}
      title={title}
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
      accessory="expand"
      cardList={cards(DealsCard)}
      description={description}
      expandText={collapsed ? expandText : collapseText}
      initiallyShownCards={4}
      layoutDesktop="grid"
      layoutMobile="stack"
      onButtonClick={onButtonClick}
      title={title}
    />
  );
};

const GridToStackWithButtonExample = () => (
  <BpkCardList
    accessory="button"
    buttonText="Explore More"
    cardList={cards(DestinationCard)}
    description={description}
    layoutDesktop="grid"
    layoutMobile="stack"
    onButtonClick={() => {}}
    title={title}
  />
);

const RowToRailWith5InitiallyShownCardsExample = () => (
  <BpkCardList
    accessory="pagination"
    ariaLabelIndicator="Go to page"
    ariaLabelNext="Next"
    ariaLabelPrev="Prev"
    buttonText="Explore more"
    cardList={cards(DealsCard)}
    description={description}
    initiallyShownCards={5}
    layoutDesktop="row"
    layoutMobile="rail"
    title={title}
  />
);
const RowToRailExample = () => (
  <BpkCardList
    accessory="pagination"
    ariaLabelIndicator="Go to page"
    ariaLabelNext="Next"
    ariaLabelPrev="Prev"
    cardList={cards(DealsCard)}
    description={description}
    layoutDesktop="row"
    layoutMobile="rail"
    title={title}
  />
);

// TODO: this use case is currently not available as proposed due the sturucture of the props
// Row layoutDesktop variant requires accesory of "pagination"
// Stack layoutMobile variant requires accesory of "button" or "expand"
// The component only supports one accessory prop value so cannot cross support 2 different types of accesories
const RowToStackExample = () => (
  <BpkCardList
    accessory="pagination"
    ariaLabelIndicator="Go to page"
    ariaLabelNext="Next"
    ariaLabelPrev="Prev"
    cardList={cards(DestinationCard)}
    description={description}
    layoutDesktop="row"
    layoutMobile={'stack' as any}
    title={title}
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
