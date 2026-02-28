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

import BpkThinking, {
  THINKING_TYPES,
} from '../../packages/bpk-component-thinking/src/BpkThinking';
import { cssModules } from '../../packages/bpk-react-utils';
import {
  BpkDarkExampleWrapper,
  // @ts-expect-error Untyped import. See `decisions/imports-ts-suppressions.md`.
} from '../bpk-storybook-utils';

import STYLES from './examples.module.scss';

const getClassName = cssModules(STYLES);

export const DefaultExample = () => (
  <div className={getClassName('bpk-thinking-examples')}>
    <BpkThinking content="AI is thinking" />
  </div>
);

export const CustomContentExample = () => (
  <div className={getClassName('bpk-thinking-examples')}>
    <BpkThinking
      content="Processing your request..."
    />
  </div>
);

export const LongContentExample = () => (
  <div className={getClassName('bpk-thinking-examples')}>
    <BpkThinking
      content="We're searching through thousands of flight options to find the best deals for your trip"
    />
  </div>
);

export const MultipleExample = () => (
  <div className={getClassName('bpk-thinking-examples__multiple')}>
    <BpkThinking content="Analyzing options..." />
    <BpkThinking content="Comparing prices..." />
    <BpkThinking content="Almost done..." />
  </div>
);

export const MixedExample = () => (
  <div className={getClassName('bpk-thinking-examples__mixed')}>
    <BpkThinking content="Loading..." />
    <BpkThinking content="Finding the best options for you" />
    <BpkThinking content="We're checking availability across multiple airlines and travel providers to ensure you get the most comprehensive results" />
  </div>
);

export const OnDarkExample = () => (
  <BpkDarkExampleWrapper>
    <div className={getClassName('bpk-thinking-examples')}>
      <BpkThinking
        content="AI is thinking"
        type={THINKING_TYPES.onDark}
      />
    </div>
  </BpkDarkExampleWrapper>
);

export const OnDarkWithContentExample = () => (
  <BpkDarkExampleWrapper>
    <div className={getClassName('bpk-thinking-examples')}>
      <BpkThinking
        type={THINKING_TYPES.onDark}
        content="Finding the best flights for you..."
      />
    </div>
  </BpkDarkExampleWrapper>
);
