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
  BpkBox,
  BpkHStack,
  BpkProvider,
  BpkSpacing,
} from '../../bpk-component-layout';

import BpkThumbButton from './BpkThumbButton';

import type { Meta } from '@storybook/react';

const noop = () => {};

const InteractiveExample = () => {
  const [selectedThumb, setSelectedThumb] = useState<'up' | 'down' | null>(null);

  return (
    <BpkProvider>
      <BpkHStack gap={BpkSpacing.Base} alignItems="center">
        <BpkThumbButton
          accessibilityLabel="Rate as helpful"
          type="up"
          onClick={(type) => setSelectedThumb(type === selectedThumb ? null : type)}
          selected={selectedThumb === 'up'}
        />
        <BpkThumbButton
          accessibilityLabel="Rate as not helpful"
          type="down"
          onClick={(type) => setSelectedThumb(type === selectedThumb ? null : type)}
          selected={selectedThumb === 'down'}
        />
      </BpkHStack>
    </BpkProvider>
  );
};

const SmallExample = () => {
  const [selectedThumb, setSelectedThumb] = useState<'up' | 'down' | null>(null);

  return (
    <BpkProvider>
      <BpkHStack gap={BpkSpacing.Base} alignItems="center">
        <BpkThumbButton
          accessibilityLabel="Rate as helpful"
          type="up"
          size="small"
          onClick={(type) => setSelectedThumb(type === selectedThumb ? null : type)}
          selected={selectedThumb === 'up'}
        />
        <BpkThumbButton
          accessibilityLabel="Rate as not helpful"
          type="down"
          size="small"
          onClick={(type) => setSelectedThumb(type === selectedThumb ? null : type)}
          selected={selectedThumb === 'down'}
        />
      </BpkHStack>
    </BpkProvider>
  );
};

const MixedExample = () => (
  <BpkProvider>
    <BpkBox>
      <BpkHStack gap={BpkSpacing.Base}>
        <span>Default:</span>
        <BpkThumbButton accessibilityLabel="Thumbs up" type="up" onClick={noop} />
        <BpkThumbButton accessibilityLabel="Thumbs down" type="down" onClick={noop} />
      </BpkHStack>
      <BpkHStack gap={BpkSpacing.Base}>
        <span>Selected:</span>
        <BpkThumbButton accessibilityLabel="Thumbs up" type="up" selected onClick={noop} />
        <BpkThumbButton accessibilityLabel="Thumbs down" type="down" selected onClick={noop} />
      </BpkHStack>
      <BpkHStack gap={BpkSpacing.Base}>
        <span>Small:</span>
        <BpkThumbButton accessibilityLabel="Thumbs up" type="up" size="small" onClick={noop} />
        <BpkThumbButton accessibilityLabel="Thumbs down" type="down" size="small" onClick={noop} />
      </BpkHStack>
      <BpkHStack gap={BpkSpacing.Base}>
        <span>Small selected:</span>
        <BpkThumbButton accessibilityLabel="Thumbs up" type="up" size="small" selected onClick={noop} />
        <BpkThumbButton accessibilityLabel="Thumbs down" type="down" size="small" selected onClick={noop} />
      </BpkHStack>
    </BpkBox>
  </BpkProvider>
);

const meta = {
  title: 'bpk-component-thumb-button',
  component: BpkThumbButton,
} satisfies Meta;

export default meta;

export const Default = {
  render: () => <InteractiveExample />,
};

export const Small = {
  render: () => <SmallExample />,
};

export const VisualTest = {
  render: () => <MixedExample />,
};

export const VisualTestWithZoom = {
  render: () => <MixedExample />,
  args: {
    zoomEnabled: true,
  },
};
