/*
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2016-2021 Skyscanner Ltd
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

import React from 'react';

import { BpkList, BpkListItem } from './index';

const UnorderedExample = () => (
  <BpkList>
    <BpkListItem>Apples</BpkListItem>
    <BpkListItem>Oranges</BpkListItem>
    <BpkListItem>Pears</BpkListItem>
  </BpkList>
);

const OrderedExample = () => (
  <BpkList ordered>
    <BpkListItem>Apples</BpkListItem>
    <BpkListItem>Oranges</BpkListItem>
    <BpkListItem>Pears</BpkListItem>
  </BpkList>
);

const NestedExample = () => (
  <BpkList>
    <BpkListItem>Apples</BpkListItem>
    <BpkListItem>
      Oranges
      <BpkList ordered>
        <BpkListItem>Tangerines</BpkListItem>
        <BpkListItem>Nectarines</BpkListItem>
        <BpkListItem>Satsuma</BpkListItem>
      </BpkList>
    </BpkListItem>
    <BpkListItem>Pears</BpkListItem>
  </BpkList>
);

export { UnorderedExample, OrderedExample, NestedExample };
