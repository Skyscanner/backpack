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

import BpkList from './BpkList';
import BpkListItem from './BpkListItem';

import type { Meta } from '@storybook/react';

const UnorderedExample = () => (
  <BpkList>
    <BpkListItem>Flights</BpkListItem>
    <BpkListItem>Hotels</BpkListItem>
    <BpkListItem>Car Hire</BpkListItem>
  </BpkList>
);

const OrderedExample = () => (
  <BpkList ordered>
    <BpkListItem>Car Hire</BpkListItem>
    <BpkListItem>Flights</BpkListItem>
    <BpkListItem>Hotels</BpkListItem>
  </BpkList>
);

const NestedExample = () => (
  <BpkList>
    <BpkListItem>Flights</BpkListItem>
    <BpkListItem>
      Hotels
      <BpkList ordered>
        <BpkListItem>Barcelona Hotels</BpkListItem>
        <BpkListItem>Edinburgh Hotels</BpkListItem>
        <BpkListItem>London Hotels</BpkListItem>
      </BpkList>
    </BpkListItem>
    <BpkListItem>Car Hire</BpkListItem>
  </BpkList>
);

const meta = {
  title: 'bpk-component-list',
  component: BpkList,
  subcomponents: {
    BpkListItem,
  },
} satisfies Meta;

export default meta;

export const Unordered = {
  render: () => <UnorderedExample />,
};

export const Ordered = {
  render: () => <OrderedExample />,
};

export const Nested = {
  render: () => <NestedExample />,
};

export const VisualTest = {
  render: () => <NestedExample />,
};

export const VisualTestWithZoom = {
  render: () => <NestedExample />,
  args: {
    zoomEnabled: true,
  },
};
