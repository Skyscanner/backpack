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

import type { Meta, StoryObj } from '@storybook/react';

import BpkProgressRing from '../../packages/bpk-component-progress-ring/src/BpkProgressRing';

import examples from './examples';

const meta: Meta<typeof BpkProgressRing> = {
  title: 'bpk-component-progress-ring',
  component: BpkProgressRing,
  parameters: {
    docs: {
      description: {
        component: 'A circular progress indicator component that displays progress as a ring.',
      },
    },
  },
  argTypes: {
    value: {
      description: 'The current progress value',
      control: { type: 'range', min: 0, max: 100, step: 1 },
    },
    max: {
      description: 'The maximum value for progress calculation',
      control: { type: 'number', min: 1 },
    },
    size: {
      description: 'The size of the progress ring',
      control: { type: 'select' },
      options: ['small', 'default', 'large'],
    },
    children: {
      description: 'Content to display in the center of the ring',
      control: { type: 'text' },
    },
    'aria-label': {
      description: 'Accessible label for the progress ring',
      control: { type: 'text' },
    },
  },
  args: {
    value: 50,
    max: 100,
    size: 'default',
    'aria-label': 'Progress indicator',
  },
};

export default meta;

type Story = StoryObj<typeof BpkProgressRing>;

export const Default: Story = {
  render: (args) => <BpkProgressRing {...args} />,
};

export const WithContent: Story = {
  args: {
    value: 75,
    children: '75%',
    'aria-label': '75% complete',
  },
  render: (args) => <BpkProgressRing {...args} />,
};

export const Sizes: Story = {
  render: () => {
    const SizesExample = examples.find((example) => example.id === 'sizes')?.render;
    return SizesExample ? <SizesExample /> : <div>Example not found</div>;
  },
};

export const CustomMax: Story = {
  render: () => {
    const CustomMaxExample = examples.find((example) => example.id === 'custom-max')?.render;
    return CustomMaxExample ? <CustomMaxExample /> : <div>Example not found</div>;
  },
};

export const Animated: Story = {
  render: () => {
    const AnimatedExample = examples.find((example) => example.id === 'animated')?.render;
    return AnimatedExample ? <AnimatedExample /> : <div>Example not found</div>;
  },
};

export const AllExamples: Story = {
  render: () => (
    <div>
      {examples.map((example) => {
        const ExampleComponent = example.render;
        return (
          <div key={example.id}>
            <ExampleComponent />
          </div>
        );
      })}
    </div>
  ),
};

// Visual test story for automated testing
export const VisualTest: Story = {
  render: () => {
    const DefaultExample = examples.find((example) => example.id === 'default')?.render;
    return DefaultExample ? <DefaultExample /> : <div>Example not found</div>;
  },
  parameters: {
    chromatic: {
      disableSnapshot: false,
    },
  },
};

export const VisualTestWithZoom: Story = {
  render: () => {
    const DefaultExample = examples.find((example) => example.id === 'default')?.render;
    return DefaultExample ? <DefaultExample /> : <div>Example not found</div>;
  },
  parameters: {
    chromatic: {
      disableSnapshot: false,
    },
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
};