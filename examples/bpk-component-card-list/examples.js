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

// import BpkText, { TEXT_STYLES } from '../../packages/bpk-component-text';
import BpkCardList from '../../packages/bpk-component-card-list';

// import STYLES from './examples.module.scss';

// const getClassName = cssModules(STYLES);

const RowToRailExample = () => (
  <BpkCardList
    cardList={[]}
    layoutDesktop="row"
    layoutMobile="rail"
    title="Card List Component"
  />
);

const GridToRailExample = () => (
  <BpkCardList
    cardList={[]}
    layoutDesktop="grid"
    layoutMobile="rail"
    title="Card List Component"
  />
);

const RowToStackExample = () => (
  <BpkCardList
    cardList={[]}
    layoutDesktop="row"
    layoutMobile="stack"
    title="Card List Component"
  />
);

const GridToStackExample = () => (
  <BpkCardList
    cardList={[]}
    layoutDesktop="grid"
    layoutMobile="stack"
    title="Card List Component"
  />
);

export {
  RowToRailExample,
  GridToRailExample,
  RowToStackExample,
  GridToStackExample,
};
