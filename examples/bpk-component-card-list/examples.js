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

import BpkText, { TEXT_STYLES } from '../../packages/bpk-component-text';
import BpkCard from '../../packages/bpk-component-card';
import BpkCardList from '../../packages/bpk-component-card-list';
// import BpkImage, {
//   BORDER_RADIUS_STYLES,
// } from '../../packages/bpk-component-image';

// import STYLES from './examples.module.scss';

// const getClassName = cssModules(STYLES);

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
      It&#39;s your world and we&#39;ll help you explore it. Find the best
      prices across millions of flights, hotels and car hire options to create
      your perfect trip.
      <br />
    </BpkText>
  </BpkCard>
);
const RowToRailExample = () => (
  <BpkCardList
    cardList={[...Array(14).keys()].map((i) => DealsCard(i))}
    accessory="pagination"
    layoutDesktop="row"
    layoutMobile="rail"
    title="Card List Component"
  />
);

const RowToRailWithHeaderButtonExample = () => (
  <BpkCardList
    cardList={[...Array(14).keys()].map((i) => DealsCard(i))}
    accessory="pagination"
    layoutDesktop="row"
    layoutMobile="rail"
    title="Card List Component"
    buttonText="Header Button"
  />
);

const GridToRailExample = () => (
  <BpkCardList
    cardList={[...Array(15).keys()].map((i) => (
      <BpkCard href="#">
        {/* <BpkImage aspectRatio={3000/2318} src="https://content.skyscnr.com/a6b22ca74949a4d05d9f9df2bc986479/GettyImages-178610078.jpg" /> */}
        TEST {i}
      </BpkCard>
    ))}
    accessory="expand"
    layoutDesktop="grid"
    layoutMobile="rail"
    title="Card List Component"
  />
);

const RowToStackExample = () => (
  <BpkCardList
    cardList={[...Array(15).keys()].map((i) => (
      <BpkCard href="#">
        {/* <BpkImage aspectRatio={3000/2318} src="https://content.skyscnr.com/a6b22ca74949a4d05d9f9df2bc986479/GettyImages-178610078.jpg" /> */}
        TEST {i}
      </BpkCard>
    ))}
    accessory="pagination"
    layoutDesktop="row"
    layoutMobile="stack"
    title="Card List Component"
  />
);

const GridToStackExample = () => (
  <BpkCardList
    cardList={[...Array(15).keys()].map((i) => (
      <BpkCard href="#">
        {/* <BpkImage aspectRatio={3000/2318} src="https://content.skyscnr.com/a6b22ca74949a4d05d9f9df2bc986479/GettyImages-178610078.jpg" /> */}
        TEST {i}
      </BpkCard>
    ))}
    accessory="expand"
    layoutDesktop="grid"
    layoutMobile="stack"
    title="Card List Component"
  />
);

export {
  RowToRailExample,
  RowToRailWithHeaderButtonExample,
  GridToRailExample,
  RowToStackExample,
  GridToStackExample,
};
