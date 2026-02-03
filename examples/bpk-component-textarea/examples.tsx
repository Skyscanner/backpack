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

import BpkLabel from '../../packages/bpk-component-label';
import BpkTextarea from '../../packages/bpk-component-textarea';
// @ts-expect-error Untyped import. See `decisions/imports-ts-suppressions.md`.
import { action } from '../bpk-storybook-utils';

const loremIpsum = `Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptate repellat assumenda
necessitatibus reiciendis, porro temporibus expedita excepturi! Nostrum pariatur odit porro, dolorem dignissimos
laudantium quis, tempore iste non, nam magnam.`;

const DefaultExample = () => (
  <form>
    <BpkLabel htmlFor="default">Textarea</BpkLabel>
    <BpkTextarea
      id="default"
      name="default"
      value={loremIpsum}
      onChange={action('input changed')}
      placeholder="Please enter some text"
    />
  </form>
);

const PlaceholderExample = () => (
  <form>
    <BpkLabel htmlFor="placeholder">Textarea</BpkLabel>
    <BpkTextarea
      id="placeholder"
      name="placeholder"
      value=""
      onChange={action('input changed')}
      placeholder="Please enter some text"
    />
  </form>
);

const DisabledExample = () => (
  <form>
    <BpkLabel htmlFor="disabled">Textarea</BpkLabel>
    <BpkTextarea
      id="disabled"
      name="disabled"
      value=""
      onChange={action('input changed')}
      placeholder="Please enter some text"
      disabled
    />
  </form>
);

const InvalidExample = () => (
  <form>
    <BpkLabel htmlFor="invalid">Textarea</BpkLabel>
    <BpkTextarea
      id="invalid"
      name="invalid"
      value=""
      onChange={action('input changed')}
      placeholder="Please enter some text"
      valid={false}
    />
  </form>
);

const LargeExample = () => (
  <form>
    <BpkLabel htmlFor="large">Textarea</BpkLabel>
    <BpkTextarea
      id="large"
      name="large"
      large
      value={loremIpsum}
      onChange={action('input changed')}
      placeholder="Please enter some text"
    />
  </form>
);

const MixedExample = () => (
  <div>
    <DefaultExample />
    <PlaceholderExample />
    <DisabledExample />
    <InvalidExample />
    <LargeExample />
  </div>
);

export {
  DefaultExample,
  PlaceholderExample,
  DisabledExample,
  InvalidExample,
  LargeExample,
  MixedExample,
};
