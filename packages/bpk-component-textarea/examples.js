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
import { action } from 'bpk-storybook-utils';

import BpkTextarea from './index';

const loremIpsum = `Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptate repellat assumenda
necessitatibus reiciendis, porro temporibus expedita excepturi! Nostrum pariatur odit porro, dolorem dignissimos
laudantium quis, tempore iste non, nam magnam.`;

const DefaultExample = () => (
  <BpkTextarea
    id="default"
    name="default"
    value={loremIpsum}
    onChange={action('input changed')}
    placeholder="Please enter some text"
  />
);

const PlaceholderExample = () => (
  <BpkTextarea
    id="placeholder"
    name="placeholder"
    value=""
    onChange={action('input changed')}
    placeholder="Please enter some text"
  />
);

const DisabledExample = () => (
  <BpkTextarea
    id="disabled"
    name="disabled"
    value=""
    onChange={action('input changed')}
    placeholder="Please enter some text"
    disabled
  />
);

const InvalidExample = () => (
  <BpkTextarea
    id="disabled"
    name="disabled"
    value=""
    onChange={action('input changed')}
    placeholder="Please enter some text"
    valid={false}
  />
);

export { DefaultExample, PlaceholderExample, DisabledExample, InvalidExample };
