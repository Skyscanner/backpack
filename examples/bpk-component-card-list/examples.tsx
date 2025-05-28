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

import type { ReactNode} from 'react';
import { useState} from 'react';

import BpkCard from '../../packages/bpk-component-card';
import BpkCardList from '../../packages/bpk-component-card-list';
import {
  LAYOUTS,
  ACCESSORY_DESKTOP_TYPES,
  ACCESSORY_MOBILE_TYPES,
} from '../../packages/bpk-component-card-list/src/common-types';
import BpkImage from '../../packages/bpk-component-image';
// @ts-expect-error Untyped import. See `decisions/imports-ts-suppressions.md`.
import BpkLink from '../../packages/bpk-component-link';
import BpkSnippet from '../../packages/bpk-component-snippet/src/BpkSnippet';
import BpkText, {
  TEXT_STYLES,
} from '../../packages/bpk-component-text/src/BpkText';
import { BpkChipGroupRail } from '../bpk-component-chip-group/examples';

import STYLES from './examples.module.scss';

const imageUrlsDestination = [
  'https://content.skyscnr.com/m/c9a57fbf76030f2/original/March-25-B2-IT-Spiagge-Liguria_1B_1.jpg',
  'https://content.skyscnr.com/m/54f5c2e091ec6e4c/original/March-25-B2-IT-Croazia-Auto_1B_1.jpg',
  'https://content.skyscnr.com/m/5e987526c2309d27/original/sync_207352798_Albaicin_Viewpoint_207352798_1413.jpg',
  'https://content.skyscnr.com/m/08ab12ef4f2e4c0c/original/sync_206570010_Viking_Cave_206570010_992.jpg',
];

const snippetProps = {
  altText: 'image description',
  headline: 'Title of the section',
  subheading: 'Subheading',
  bodyText:
    'Lorem ipsum dolor sit amet consectetur. Tristique at pharetra tincidunt elementum vulputate varius sit euismod hac. Dignissim hendrerit enim eros nisi diam. Elit arcu mattis cum in id varius vitae augue neque. Quisque in semper malesuada lacus ut etiam elementum.',
  buttonText: 'Call to Action',
  onClick: () => window.open('https://www.skyscanner.net/flights', '_blank'),
};

const DestinationCard = (i: number) => (
  // Usage Suggestion: define minWidth from consumer side
  <BpkCard style={{ minWidth: '250px' }} href="/" padded={false}>
    <div className={STYLES['bpk-destination']}>
      <BpkImage
        aspectRatio={3000 / 1400}
        altText="card image"
        src={imageUrlsDestination[i % 4]}
      />

      <div className={STYLES['bpk-destination__bottom']}>
        <div className={STYLES['bpk-destination__name']}>
          <BpkText textStyle={TEXT_STYLES.heading4}>
            {`Destination Name ${i}`}
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
            <BpkLink
              tabIndex={0}
              href="#"
            >
              {/* A11y test for table objects inside a card */}
              <BpkText textStyle={TEXT_STYLES.heading5}>£100</BpkText>
            </BpkLink>
          </div>
        </div>
      </div>
    </div>
  </BpkCard>
);

const Snippet = (i: number) => (
  // Usage Suggestion: set desktopLayout="vertical" for cases with more than 1 snippet
  <BpkSnippet
    desktopLayout="vertical"
    src={imageUrlsDestination[i % 4]}
    {...snippetProps}
  />
);

type ExampleCard = typeof DestinationCard | typeof Snippet;

const makeList = (cardType: ExampleCard) => {
  const cardList = [];
  for (let i = 0; i < 9; i += 1) {
    cardList.push(cardType(i));
  }
  return cardList;
};

type PageContainerProb = {
  children: ReactNode;
};

const PageContainer = ({ children }: PageContainerProb) => (
  <div style={{ maxWidth: '1200px', margin: '0 auto' }}>{children}</div>
);

const BasicExample= () => (
  <BpkCardList
    title="Must-visit spots"
    description="Check out these world-famous destinations perfect for visiting in spring."
    buttonText="Explore More"
    buttonHref="https://www.skyscanner.net/"
    onButtonClick={() => null}
    cardList={makeList(DestinationCard)}
    layoutDesktop={LAYOUTS.grid}
    layoutMobile={LAYOUTS.stack}
  />
);

// const RowToRailForCardsExample = () => (
//   <PageContainer>
//     <BpkCardList
//       title="Must-visit spots"
//       description="Check out these world-famous destinations perfect for visiting in spring."
//       chipGroup={BpkChipGroupRail()}
//       initiallyShownCards={3}
//       cardList={makeList(DestinationCard)}
//       layoutDesktop={LAYOUTS.row}
//       layoutMobile={LAYOUTS.rail}
//       accessoryDesktop={ACCESSORY_DESKTOP_TYPES.Pagination}
//       buttonText="Explore more"
//     />
//   </PageContainer>
// );

// const RowToRailForSnippetsExample = () => (
//   <PageContainer>
//     <BpkCardList
//       title="Must-visit spots"
//       description="Check out these world-famous destinations perfect for visiting in spring."
//       chipGroup={BpkChipGroupRail()}
//       initiallyShownCards={2}
//       cardList={makeList(Snippet)}
//       layoutDesktop={LAYOUTS.row}
//       layoutMobile={LAYOUTS.rail}
//       onButtonClick={() => null}
//       accessoryDesktop={ACCESSORY_DESKTOP_TYPES.Pagination}
//     />
//   </PageContainer>
// );

// const RowToStackForCardsWithExpandExample = () => {
//   const [expandText, setExpandText] = useState('Show more');

//   return (
//     <PageContainer>
//       <BpkCardList
//         title="Must-visit spots"
//         description="Check out these world-famous destinations perfect for visiting in spring."
//         chipGroup={BpkChipGroupRail()}
//         cardList={makeList(DestinationCard)}
//         layoutDesktop={LAYOUTS.row}
//         layoutMobile={LAYOUTS.stack}
//         onButtonClick={() =>
//           setExpandText(expandText === 'Show more' ? 'Show less' : 'Show more')
//         }
//         accessoryDesktop={ACCESSORY_DESKTOP_TYPES.Pagination}
//         accessoryMobile={ACCESSORY_MOBILE_TYPES.Expand}
//         expandText={expandText}
//       />
//     </PageContainer>
//   );
// };

// const RowToStackForSnippetsWithExpandExample = () => {
//   const [expandText, setExpandText] = useState('Show more');

//   return (
//     <PageContainer>
//       <BpkCardList
//         title="Must-visit spots"
//         description="Check out these world-famous destinations perfect for visiting in spring."
//         chipGroup={BpkChipGroupRail()}
//         initiallyShownCards={2}
//         cardList={makeList(Snippet)}
//         layoutDesktop={LAYOUTS.row}
//         layoutMobile={LAYOUTS.stack}
//         onButtonClick={() =>
//           setExpandText(expandText === 'Show more' ? 'Show less' : 'Show more')
//         }
//         accessoryDesktop={ACCESSORY_DESKTOP_TYPES.Pagination}
//         accessoryMobile={ACCESSORY_MOBILE_TYPES.Expand}
//         expandText={expandText}
//       />
//     </PageContainer>
//   );
// };

// const GridToRailForCardsWithExpandExample = () => {
//   const [expandText, setExpandText] = useState('Show more');

//   return (
//     <PageContainer>
//       <BpkCardList
//         title="Must-visit spots"
//         description="Check out these world-famous destinations perfect for visiting in spring."
//         chipGroup={BpkChipGroupRail()}
//         cardList={makeList(DestinationCard)}
//         layoutDesktop={LAYOUTS.grid}
//         layoutMobile={LAYOUTS.rail}
//         onButtonClick={() =>
//           setExpandText(expandText === 'Show more' ? 'Show less' : 'Show more')
//         }
//         accessoryDesktop={ACCESSORY_DESKTOP_TYPES.Expand}
//         expandText={expandText}
//       />
//     </PageContainer>
//   );
// };

const GridToStackExample = () => (
  <PageContainer>
    <BpkCardList
      title="Must-visit spots"
      description="Check out these world-famous destinations perfect for visiting in spring."
      chipGroup={BpkChipGroupRail()}
      cardList={makeList(DestinationCard)}
      layoutDesktop={LAYOUTS.grid}
      layoutMobile={LAYOUTS.stack}
      onButtonClick={() => {
        console.log('Button clicked');
      }}
      accessoryDesktop={ACCESSORY_DESKTOP_TYPES.Button}
      accessoryMobile={ACCESSORY_MOBILE_TYPES.Button}
      buttonText="Explore more"
    />
  </PageContainer>
);

const GridToStackWithExpandExample = () => {
  const [expandText, setExpandText] = useState('Show more');

  return (
    <PageContainer>
      <BpkCardList
        title="Must-visit spots"
        description="Check out these world-famous destinations perfect for visiting in spring."
        chipGroup={BpkChipGroupRail()}
        cardList={makeList(DestinationCard)}
        layoutDesktop={LAYOUTS.grid}
        layoutMobile={LAYOUTS.stack}
        onExpandClick={() =>
          setExpandText(expandText === 'Show more' ? 'Show less' : 'Show more')
        }
        onButtonClick={() => {
          console.log('Button clicked');
        }}
        accessoryDesktop={ACCESSORY_DESKTOP_TYPES.Expand}
        accessoryMobile={ACCESSORY_MOBILE_TYPES.Expand}
        expandText={expandText}
        buttonText='Explore more'
        buttonHref='https://www.skyscanner.net'
      />
    </PageContainer>
  );
};

export {
  BasicExample,
  // RowToRailForCardsExample,
  // RowToRailForSnippetsExample,
  // RowToStackForCardsWithExpandExample,
  // RowToStackForSnippetsWithExpandExample,
  // GridToRailForCardsWithExpandExample,
  GridToStackExample,
  GridToStackWithExpandExample,
};
