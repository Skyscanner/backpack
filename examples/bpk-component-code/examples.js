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

import React from 'react';

import { BpkCode, BpkCodeBlock } from '../../packages/bpk-component-code';

const Inline = () => <BpkCode>npm install react --save</BpkCode>;
const InlineAlternate = () => (
  <BpkCode alternate>npm install react --save</BpkCode>
);
const Block = () => (
  <BpkCodeBlock>
    import React from &apos;react&apos;;
    <br />
    import ReactDOM from &apos;react-dom&apos;;
    <br />
    ReactDOM.render( ... );
  </BpkCodeBlock>
);
const BlockAlternate = () => (
  <BpkCodeBlock alternate>
    import React from &apos;react&apos;;
    <br />
    import ReactDOM from &apos;react-dom&apos;;
    <br />
    ReactDOM.render( ... );
  </BpkCodeBlock>
);

const MixedExample = () => (
  <div>
    <Inline />
    <InlineAlternate />
    <Block />
    <BlockAlternate />
  </div>
);

export { Inline, InlineAlternate, Block, BlockAlternate, MixedExample };
