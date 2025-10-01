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


import { BpkFallbackComponent, SCRIPTS } from './examples';

import type { Meta, StoryObj } from '@storybook/react';


const meta: Meta<typeof BpkFallbackComponent> = {
  title: 'bpk-fallback-font',
  tags: ['!autodocs'],
  component: BpkFallbackComponent,
  argTypes: {
    script: {
      control: { type: 'inline-radio' },
      options: Object.values(SCRIPTS),
    },
    weight: {
      control: { type: 'select' },
      options: [800], // Can be extended to 400/500/700/900
    },
    size: { control: { type: 'number', min: 14, max: 48, step: 1 } },
    forceFallback: { control: 'boolean' },
  },
};
export default meta;

type Story = StoryObj<React.ComponentProps<typeof BpkFallbackComponent>>;

export const Default: Story = {
  args: { script: SCRIPTS.LATIN, weight: 800, size: 22, forceFallback: false },
};

export const ForcedFallback: Story = {
  args: { script: SCRIPTS.CYRILLIC, weight: 800, size: 22, forceFallback: true },
};

export const Matrix: Story = {
  args: { weight: 800, size: 20, forceFallback: false },
  render: (args) => {
    const scripts = Object.values(SCRIPTS);
    return (
      <div style={{ display: 'grid', gap: 16 }}>
        {scripts.map((s) => (
          <div key={s} style={{ display: 'grid', gap: 8 }}>
            <div style={{ fontSize: 12, opacity: 0.6 }}>{s} — primary</div>
            <BpkFallbackComponent {...args} script={s} forceFallback={false} />
            <div style={{ fontSize: 12, opacity: 0.6 }}>{s} — fallback</div>
            <BpkFallbackComponent {...args} script={s} forceFallback />
          </div>
        ))}
      </div>
    );
  },
};
