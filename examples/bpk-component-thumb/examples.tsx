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

import { useState } from 'react';

import {
  BpkHStack,
  BpkProvider,
  BpkSpacing,
  BpkVStack,
} from '../../packages/bpk-component-layout';
import BpkThumb from '../../packages/bpk-component-thumb/src/BpkThumb';

const noop = () => {};

export const DefaultExample = () => (
  <BpkProvider>
    <BpkHStack gap={BpkSpacing.Base} alignItems="center">
      <BpkThumb accessibilityLabel="Thumbs up" type="up" onClick={noop} />
      <BpkThumb accessibilityLabel="Thumbs down" type="down" onClick={noop} />
    </BpkHStack>
  </BpkProvider>
);

export const SelectedExample = () => (
  <BpkProvider>
    <BpkHStack gap={BpkSpacing.Base} alignItems="center">
      <BpkThumb accessibilityLabel="Thumbs up" type="up" selected onClick={noop} />
      <BpkThumb accessibilityLabel="Thumbs down" type="down" selected onClick={noop} />
    </BpkHStack>
  </BpkProvider>
);

export const InteractiveExample = () => {
  const [selectedThumb, setSelectedThumb] = useState<'up' | 'down' | null>(
    null,
  );

  return (
    <BpkProvider>
      <BpkHStack gap={BpkSpacing.Base} alignItems="center">
        <BpkThumb
          accessibilityLabel="Rate as helpful"
          type="up"
          onClick={(type) => setSelectedThumb(type === selectedThumb ? null : type)}
          selected={selectedThumb === 'up'}
        />
        <BpkThumb
          accessibilityLabel="Rate as not helpful"
          type="down"
          onClick={(type) => setSelectedThumb(type === selectedThumb ? null : type)}
          selected={selectedThumb === 'down'}
        />
      </BpkHStack>
    </BpkProvider>
  );
};

export const MixedExample = () => (
  <BpkProvider>
    <BpkVStack gap={BpkSpacing.MD}>
      <BpkHStack gap={BpkSpacing.Base} alignItems="center">
        <span>Default:</span>
        <BpkThumb accessibilityLabel="Thumbs up" type="up" onClick={noop} />
        <BpkThumb accessibilityLabel="Thumbs down" type="down" onClick={noop} />
      </BpkHStack>
      <BpkHStack gap={BpkSpacing.Base} alignItems="center">
        <span>Selected:</span>
        <BpkThumb accessibilityLabel="Thumbs up" type="up" selected onClick={noop} />
        <BpkThumb accessibilityLabel="Thumbs down" type="down" selected onClick={noop} />
      </BpkHStack>
    </BpkVStack>
  </BpkProvider>
);
