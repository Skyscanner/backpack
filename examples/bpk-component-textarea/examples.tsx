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

import BpkLabel from '../../packages/bpk-component-label';
import BpkTextarea from '../../packages/bpk-component-textarea';
import { action } from '../bpk-storybook-utils';

const loremIpsum = `Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptate repellat assumenda
necessitatibus reiciendis, porro temporibus expedita excepturi! Nostrum pariatur odit porro, dolorem dignissimos
laudantium quis, tempore iste non, nam magnam.`;

const DefaultExample = () => (
  <form>
    // @ts-expect-error TS(2304) FIXME: Cannot find name 'children'.
    // @ts-expect-error TS(2322): Type '{ children: string; htmlFor: string; }' is n... Remove this comment to see the full error message
    // @ts-expect-error TS(2322) FIXME: Type '{ children: string; htmlFor: string; }' is n... Remove this comment to see the full error message
    <BpkLabel htmlFor="default">Textarea</BpkLabel>
    <BpkTextarea
      id="default"
      name="default"
      value={loremIpsum}
      // @ts-expect-error TS(2322) FIXME: Type '{ id: string; name: string; value: string; o... Remove this comment to see the full error message
      onChange={action('input changed')}
      placeholder="Please enter some text"
    />
  </form>
);

const PlaceholderExample = () => (
  <form>
    // @ts-expect-error TS(2304) FIXME: Cannot find name 'children'.
    // @ts-expect-error TS(2322): Type '{ children: string; htmlFor: string; }' is n... Remove this comment to see the full error message
    // @ts-expect-error TS(2322) FIXME: Type '{ children: string; htmlFor: string; }' is n... Remove this comment to see the full error message
    <BpkLabel htmlFor="placeholder">Textarea</BpkLabel>
    <BpkTextarea
      id="placeholder"
      name="placeholder"
      value=""
      // @ts-expect-error TS(2322) FIXME: Type '{ id: string; name: string; value: string; o... Remove this comment to see the full error message
      onChange={action('input changed')}
      placeholder="Please enter some text"
    />
  </form>
);

const DisabledExample = () => (
  <form>
    // @ts-expect-error TS(2304) FIXME: Cannot find name 'children'.
    // @ts-expect-error TS(2322): Type '{ children: string; htmlFor: string; }' is n... Remove this comment to see the full error message
    // @ts-expect-error TS(2322) FIXME: Type '{ children: string; htmlFor: string; }' is n... Remove this comment to see the full error message
    <BpkLabel htmlFor="disabled">Textarea</BpkLabel>
    <BpkTextarea
      id="disabled"
      name="disabled"
      value=""
      // @ts-expect-error TS(2322) FIXME: Type '{ id: string; name: string; value: string; o... Remove this comment to see the full error message
      onChange={action('input changed')}
      placeholder="Please enter some text"
      disabled
    />
  </form>
);

const InvalidExample = () => (
  <form>
    // @ts-expect-error TS(2304) FIXME: Cannot find name 'children'.
    // @ts-expect-error TS(2322): Type '{ children: string; htmlFor: string; }' is n... Remove this comment to see the full error message
    // @ts-expect-error TS(2322) FIXME: Type '{ children: string; htmlFor: string; }' is n... Remove this comment to see the full error message
    <BpkLabel htmlFor="invalid">Textarea</BpkLabel>
    <BpkTextarea
      id="invalid"
      name="invalid"
      value=""
      // @ts-expect-error TS(2322) FIXME: Type '{ id: string; name: string; value: string; o... Remove this comment to see the full error message
      onChange={action('input changed')}
      placeholder="Please enter some text"
      valid={false}
    />
  </form>
);

const LargeExample = () => (
  <form>
    // @ts-expect-error TS(2304) FIXME: Cannot find name 'children'.
    // @ts-expect-error TS(2322): Type '{ children: string; htmlFor: string; }' is n... Remove this comment to see the full error message
    // @ts-expect-error TS(2322) FIXME: Type '{ children: string; htmlFor: string; }' is n... Remove this comment to see the full error message
    <BpkLabel htmlFor="large">Textarea</BpkLabel>
    <BpkTextarea
      id="large"
      name="large"
      large
      value={loremIpsum}
      // @ts-expect-error TS(2322) FIXME: Type '{ id: string; name: string; large: true; val... Remove this comment to see the full error message
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
