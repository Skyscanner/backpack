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

import { useState } from 'react';

import BpkCard from '../../packages/bpk-component-card';
import BpkCardList from '../../packages/bpk-component-card-list';
import { LAYOUTS } from '../../packages/bpk-component-card-list/src/common-types';
import BpkImage from '../../packages/bpk-component-image';
import BpkText, {
  TEXT_STYLES,
} from '../../packages/bpk-component-text/src/BpkText';

import STYLES from './examples.module.scss';

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

type ExampleCard = typeof DestinationCard;

const cards = (cardType: ExampleCard) => {
  const cardList = [];
  for (let i = 0; i < 14; i += 1) {
    cardList.push(cardType(i));
  }
  return cardList;
};

type PageContainerProb = {
  children: React.ReactNode;
}

const PageContainer = ({ children }: PageContainerProb) => (
  <div style = {{width: 1000}}>
      {children}
  </div>
);

const BasicExample = () => (
  <BpkCardList
    title="Must-visit spots"
    description="Check out these world-famous destinations perfect for visiting in spring."
    buttonText="Explore More"
    buttonHref=""
    onButtonClick={() => null}
    cardList={cards(DestinationCard)}
    layoutDesktop={LAYOUTS.grid}
    layoutMobile={LAYOUTS.stack}
  />
);

const RowToRailExample = () => (
  <PageContainer>
    <BpkCardList
      title="Must-visit spots"
      description="Check out these world-famous destinations perfect for visiting in spring."
      cardList={cards(DestinationCard)}
      layoutDesktop={LAYOUTS.row}
      layoutMobile={LAYOUTS.rail}
      onButtonClick={() => null}
      accessory="pagination"
      buttonText="Explore more"
    />
  </PageContainer>
);

const GridToStackExample = () => (
  <BpkCardList
    title="Must-visit spots"
    description="Check out these world-famous destinations perfect for visiting in spring."
    cardList={cards(DestinationCard)}
    layoutDesktop={LAYOUTS.grid}
    layoutMobile={LAYOUTS.stack}
    onButtonClick={() => null}
    accessory="button"
    buttonText="Explore more"
  />
);

const GridToStackWithExpandExample = () => {
  const [expandText, setExpandText] = useState('Show more');

  return (
    <BpkCardList
      title="Must-visit spots"
      description="Check out these world-famous destinations perfect for visiting in spring."
      cardList={cards(DestinationCard)}
      layoutDesktop={LAYOUTS.grid}
      layoutMobile={LAYOUTS.stack}
      onButtonClick={() =>
        setExpandText(expandText === 'Show more' ? 'Show less' : 'Show more')
      }
      accessory="expand"
      buttonText="Explore more"
      expandText={expandText}
    />
  );
};

export { BasicExample, RowToRailExample, GridToStackExample, GridToStackWithExpandExample };
