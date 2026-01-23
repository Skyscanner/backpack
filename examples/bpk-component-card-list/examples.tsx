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

import type { ReactNode } from 'react';
import { useState } from 'react';

import BpkCard from '../../packages/bpk-component-card';
import BpkCardList from '../../packages/bpk-component-card-list';
import {
  LAYOUTS,
  ACCESSORY_DESKTOP_TYPES,
  ACCESSORY_MOBILE_TYPES,
} from '../../packages/bpk-component-card-list/src/common-types';
import BpkMultiSelectChipGroup, {
  CHIP_GROUP_TYPES,
} from '../../packages/bpk-component-chip-group';
import BpkImage from '../../packages/bpk-component-image';
import BpkLink from '../../packages/bpk-component-link';
import BpkSnippet, {
  DESKTOP_LAYOUT as SNIPPET_DESKTOP_LAYOUT,
} from '../../packages/bpk-component-snippet/src/BpkSnippet';
import BpkText, {
  TEXT_STYLES,
} from '../../packages/bpk-component-text/src/BpkText';

import type { MultiSelectProps } from '../../packages/bpk-component-chip-group';

import STYLES from './examples.module.scss';

const imageUrlsDestination = [
  'https://content.skyscnr.com/m/c9a57fbf76030f2/original/March-25-B2-IT-Spiagge-Liguria_1B_1.jpg',
  'https://content.skyscnr.com/m/54f5c2e091ec6e4c/original/March-25-B2-IT-Croazia-Auto_1B_1.jpg',
  'https://content.skyscnr.com/m/5e987526c2309d27/original/sync_207352798_Albaicin_Viewpoint_207352798_1413.jpg',
  'https://content.skyscnr.com/m/08ab12ef4f2e4c0c/original/sync_206570010_Viking_Cave_206570010_992.jpg',
];

const BpkMultiSelectChipGroupState = ({ chips, ...rest }: MultiSelectProps) => {
  const [selectedChips, setSelectedChips] = useState(
    chips.map((c) => Boolean(c.selected)),
  );

  const statefulChips = chips.map(
    (chip, index) =>
      chip && {
        ...chip,
        selected: selectedChips[index],
        onClick: (selected: boolean, selectedIndex: number) => {
          if (chip.onClick) {
            chip.onClick(selected, selectedIndex);
          }

          const nextSelectedChips = [...selectedChips];
          nextSelectedChips[selectedIndex] = selected;
          setSelectedChips(nextSelectedChips);
        },
      },
  );

  return <BpkMultiSelectChipGroup chips={statefulChips} {...rest} />;
};

const chips = [
  {
    text: 'London',
  },
  {
    text: 'Liguria',
    selected: true,
  },
  {
    text: 'Florence',
  },
  {
    text: 'Stockholm',
  },
  {
    text: 'Copenhagen',
  },
  {
    text: 'Salzburg',
  },
  {
    text: 'Graz',
  },
  {
    text: 'Lanzarote',
  },
  {
    text: 'Valencia',
  },
  {
    text: 'Reykjavik',
  },
  {
    text: 'Tallinn',
  },
  {
    text: 'Sofia',
  },
];

const commonProps = {
  title: 'We think you’ll like',
  description: 'Check out these destinations for a spring getaway',
  chipGroup: (
    <BpkMultiSelectChipGroupState
      type={CHIP_GROUP_TYPES.rail}
      chips={chips}
      ariaLabel="Select cities"
      leadingNudgerLabel="Scroll back"
      trailingNudgerLabel="Scroll forward"
    />
  ),
  buttonContent: 'See more',
  buttonHref: 'https://www.skyscanner.net/',
  accessibilityLabels: {
    indicatorLabel: 'Go to slide',
    prevNavLabel: 'Previous slide',
    nextNavLabel: 'Next slide',
    carouselLabel: (initiallyShownCards: number, childrenLength: number) =>
      `Entering Carousel with ${initiallyShownCards} slides shown at a time, ${childrenLength} slides in total. Please use Pagination below with the Previous and Next buttons to navigate, or the slide dot buttons at the end to jump to slides.`,
    slideLabel: (index: number, childrenLength: number) =>
      `slide ${index + 1} of ${childrenLength}`,
  },
};

const snippetProps = {
  altText: 'image description',
  headline: 'Title of the section',
  subheading: 'Subheading',
  bodyText:
    'Lorem ipsum dolor sit amet consectetur. Tristique at pharetra tincidunt elementum vulputate varius sit euismod hac. Dignissim hendrerit enim eros nisi diam. Elit arcu mattis cum in id varius vitae augue neque. Quisque in semper malesuada lacus ut etiam elementum.',
  buttonContent: 'Call to Action',
  onClick: () => window.open('https://www.skyscanner.net/flights', '_blank'),
};

const myCard = (
  <BpkCard className={STYLES['bpk-card']} href="/" padded={false}>
    <div className={STYLES['bpk-destination']}>
      <BpkImage
        aspectRatio={3000 / 1400}
        altText="card image"
        src={imageUrlsDestination[1]}
      />

      <div className={STYLES['bpk-destination__bottom']}>
        <div className={STYLES['bpk-destination__name']}>
          <BpkText textStyle={TEXT_STYLES.heading4}>
            {`Destination ${1}`}
          </BpkText>
        </div>
        <div className={STYLES['bpk-destination__row']}>
          <BpkText textStyle={TEXT_STYLES.heading5}>Flight</BpkText>
          <div className={STYLES['bpk-destination__column']}>
            <BpkText textStyle={TEXT_STYLES.heading5}>£150</BpkText>
          </div>
        </div>
      </div>
    </div>
  </BpkCard>
);

const DestinationCard = (i: number) => (
  <BpkCard
    key={`card-${i}`}
    className={STYLES['bpk-card']}
    href="/"
    padded={false}
  >
    <div className={STYLES['bpk-destination']}>
      <BpkImage
        aspectRatio={3000 / 1400}
        altText="card image"
        src={imageUrlsDestination[i % 4]}
      />

      <div className={STYLES['bpk-destination__bottom']}>
        <div className={STYLES['bpk-destination__name']}>
          <BpkText textStyle={TEXT_STYLES.heading4}>
            {`Destination ${i}`}
          </BpkText>
        </div>
        <div className={STYLES['bpk-destination__row']}>
          <BpkText textStyle={TEXT_STYLES.heading5}>Flight</BpkText>
          <div className={STYLES['bpk-destination__column']}>
            <BpkText textStyle={TEXT_STYLES.heading5}>£150</BpkText>
          </div>
        </div>
        <div className={STYLES['bpk-destination__row']}>
          <BpkText textStyle={TEXT_STYLES.heading5}>Hotel</BpkText>
          <div className={STYLES['bpk-destination__column']}>
            <BpkLink tabIndex={0} href="#">
              {/* A11y test for tabable objects inside a card */}
              <BpkText textStyle={TEXT_STYLES.heading5}>£100</BpkText>
            </BpkLink>
          </div>
        </div>
      </div>
    </div>
  </BpkCard>
);

const Snippet = (i: number, vertical?: boolean) => (
  // Usage Suggestion: set desktopLayout="vertical" for cases with more than 1 snippet
  <BpkSnippet
    desktopLayout={vertical ? SNIPPET_DESKTOP_LAYOUT.vertical : undefined}
    src={imageUrlsDestination[i % 4]}
    {...snippetProps}
    key={`snippet-${i}`}
  />
);

type ExampleCard = typeof DestinationCard | typeof Snippet;

const makeList = (
  cardType: ExampleCard,
  number: number = 15,
  vertical: boolean = false,
) => {
  const cardList = [];
  for (let i = 0; i < number; i += 1) {
    cardList.push(cardType(i, vertical));
  }
  return cardList;
};

type PageContainerProp = {
  children: ReactNode;
};

const PageContainer = ({ children }: PageContainerProp) => (
  <div style={{ maxWidth: '1200px', margin: '0 auto' }}>{children}</div>
);

const BasicExample = () => (
  <BpkCardList
    {...commonProps}
    cardList={makeList(DestinationCard)}
    layoutDesktop={LAYOUTS.grid}
    layoutMobile={LAYOUTS.stack}
  />
);

const RowToRailExample = () => (
  <PageContainer>
    <BpkCardList
      {...commonProps}
      cardList={[myCard, ...makeList(DestinationCard)]}
      layoutDesktop={LAYOUTS.row}
      layoutMobile={LAYOUTS.rail}
      accessoryDesktop={ACCESSORY_DESKTOP_TYPES.pagination}
    />
  </PageContainer>
);

const RowToStackExample = () => (
  <PageContainer>
    <BpkCardList
      {...commonProps}
      cardList={makeList(DestinationCard)}
      layoutDesktop={LAYOUTS.row}
      layoutMobile={LAYOUTS.stack}
      accessoryDesktop={ACCESSORY_DESKTOP_TYPES.pagination}
    />
  </PageContainer>
);

const GridToRailExample = () => (
  <PageContainer>
    <BpkCardList
      {...commonProps}
      cardList={makeList(DestinationCard, 6)}
      layoutDesktop={LAYOUTS.grid}
      layoutMobile={LAYOUTS.rail}
      accessoryDesktop={ACCESSORY_DESKTOP_TYPES.button}
      accessoryMobile={ACCESSORY_MOBILE_TYPES.button}
    />
  </PageContainer>
);

const GridToStackExample = () => (
  <PageContainer>
    <BpkCardList
      {...commonProps}
      cardList={makeList(DestinationCard, 6)}
      layoutDesktop={LAYOUTS.grid}
      layoutMobile={LAYOUTS.stack}
      accessoryDesktop={ACCESSORY_DESKTOP_TYPES.button}
      accessoryMobile={ACCESSORY_MOBILE_TYPES.button}
    />
  </PageContainer>
);

const RowToStackWithExpandExample = () => {
  const [expandText, setExpandText] = useState('Show more');

  return (
    <PageContainer>
      <BpkCardList
        {...commonProps}
        cardList={makeList(DestinationCard)}
        layoutDesktop={LAYOUTS.row}
        layoutMobile={LAYOUTS.stack}
        accessoryDesktop={ACCESSORY_DESKTOP_TYPES.pagination}
        accessoryMobile={ACCESSORY_MOBILE_TYPES.expand}
        expandText={expandText}
        onExpandClick={() =>
          setExpandText(expandText === 'Show more' ? 'Show less' : 'Show more')
        }
        buttonHref={undefined} // render <button> instead of <a>
      />
    </PageContainer>
  );
};

const GridToStackWithExpandExample = () => {
  const [expandText, setExpandText] = useState('Show more');

  return (
    <PageContainer>
      <BpkCardList
        {...commonProps}
        cardList={makeList(DestinationCard)}
        layoutDesktop={LAYOUTS.grid}
        layoutMobile={LAYOUTS.stack}
        accessoryDesktop={ACCESSORY_DESKTOP_TYPES.expand}
        accessoryMobile={ACCESSORY_MOBILE_TYPES.expand}
        expandText={expandText}
        onExpandClick={() =>
          setExpandText(expandText === 'Show more' ? 'Show less' : 'Show more')
        }
      />
    </PageContainer>
  );
};

const RowToRailForSnippetsExample = () => (
  <PageContainer>
    <BpkCardList
      {...commonProps}
      initiallyShownCardsDesktop={2}
      initiallyShownCardsMobile={1}
      cardList={makeList(Snippet, 15, true)} // vertical snippets
      layoutDesktop={LAYOUTS.row}
      layoutMobile={LAYOUTS.rail}
      accessoryDesktop={ACCESSORY_DESKTOP_TYPES.pagination}
      buttonContent={undefined}
    />
  </PageContainer>
);

const RowToRailWithoutTitleExample = () => (
  <PageContainer>
    <BpkCardList
      {...commonProps}
      title={undefined}
      description={undefined}
      cardList={makeList(DestinationCard)}
      layoutDesktop={LAYOUTS.row}
      layoutMobile={LAYOUTS.rail}
      accessoryDesktop={ACCESSORY_DESKTOP_TYPES.pagination}
    />
  </PageContainer>
);

const MultiComponentsScrollingTestExample = () => (
  <PageContainer>
    <RowToRailExample />
    <br />
    <RowToRailForSnippetsExample />
    <br />
    <RowToStackWithExpandExample />
    <br />
    <RowToRailExample />
    <br />
    <RowToRailForSnippetsExample />
    <br />
    <RowToStackWithExpandExample />
    <br />
    <RowToRailExample />
    <br />
    <RowToRailForSnippetsExample />
    <br />
    <RowToStackWithExpandExample />
    <br />
    <GridToStackWithExpandExample />
  </PageContainer>
);

export {
  BasicExample,
  RowToRailExample,
  RowToStackExample,
  GridToRailExample,
  GridToStackExample,
  RowToStackWithExpandExample,
  GridToStackWithExpandExample,
  RowToRailForSnippetsExample,
  RowToRailWithoutTitleExample,
  MultiComponentsScrollingTestExample,
};
