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

// @ts-expect-error Untyped import. See `decisions/imports-ts-suppressions.md`.
import { BpkDarkExampleWrapper } from 'bpk-storybook-utils';

import BpkText, { TEXT_STYLES } from '../../bpk-component-text';

import BpkDivider from './BpkDivider';

import type { Meta } from '@storybook/react';

const DividerExample = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', width: '20rem' }}>
    <div>
      <BpkText tagName="p" textStyle={TEXT_STYLES.label1}>
        Horizontal
      </BpkText>
      <BpkText tagName="p" textStyle={TEXT_STYLES.footnote}>
        Content above the divider
      </BpkText>
      <BpkDivider />
      <BpkText tagName="p" textStyle={TEXT_STYLES.footnote}>
        Content below the divider
      </BpkText>
    </div>
    <div>
      <BpkText tagName="p" textStyle={TEXT_STYLES.label1}>
        Vertical
      </BpkText>
      <div style={{ display: 'flex', height: '1.5rem' }}>
        <BpkText tagName="span" textStyle={TEXT_STYLES.footnote}>
          Content before
        </BpkText>
        <BpkDivider orientation="vertical" spacing="base" />
        <BpkText tagName="span" textStyle={TEXT_STYLES.footnote}>
          Content after
        </BpkText>
      </div>
    </div>
  </div>
);

const DividerOnDarkExample = () => (
  <BpkDarkExampleWrapper>
    <DividerExample />
  </BpkDarkExampleWrapper>
);

const SpacingExample = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', width: '20rem' }}>
    {(['none', 'base', 'lg'] as const).map((spacing) => (
      <div key={spacing}>
        <BpkText tagName="p" textStyle={TEXT_STYLES.label1}>
          spacing=&quot;{spacing}&quot; (horizontal)
        </BpkText>
        <BpkText tagName="p" textStyle={TEXT_STYLES.footnote}>
          Content above the divider
        </BpkText>
        <BpkDivider spacing={spacing} />
        <BpkText tagName="p" textStyle={TEXT_STYLES.footnote}>
          Content below the divider
        </BpkText>
      </div>
    ))}
    {(['none', 'base', 'lg'] as const).map((spacing) => (
      <div key={spacing}>
        <BpkText tagName="p" textStyle={TEXT_STYLES.label1}>
          spacing=&quot;{spacing}&quot; (vertical)
        </BpkText>
        <div style={{ display: 'flex', height: '1.5rem' }}>
          <BpkText tagName="span" textStyle={TEXT_STYLES.footnote}>
            Content before
          </BpkText>
          <BpkDivider orientation="vertical" spacing={spacing} />
          <BpkText tagName="span" textStyle={TEXT_STYLES.footnote}>
            Content after
          </BpkText>
        </div>
      </div>
    ))}
  </div>
);

const WeightExample = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', width: '20rem' }}>
    {(['default', 'bold'] as const).map((weight) => (
      <div key={weight}>
        <BpkText tagName="p" textStyle={TEXT_STYLES.label1}>
          weight=&quot;{weight}&quot;
        </BpkText>
        <BpkText tagName="p" textStyle={TEXT_STYLES.footnote}>
          Content above the divider
        </BpkText>
        <BpkDivider weight={weight} spacing="base" />
        <BpkText tagName="p" textStyle={TEXT_STYLES.footnote}>
          Content below the divider
        </BpkText>
      </div>
    ))}
  </div>
);

const MixedExample = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
    <DividerExample />
    <SpacingExample />
    <WeightExample />
  </div>
);

const meta = {
  title: 'bpk-component-divider',
  component: BpkDivider,
} satisfies Meta;

export default meta;

export const Default = {
  render: () => <DividerExample />,
  parameters: { bpkTheme: 'light' },
};

export const OnDark = {
  render: () => <DividerOnDarkExample />,
  parameters: { bpkTheme: 'dark' },
  tags: ['dark-mode-compatible'],
};

export const Spacing = {
  render: () => <SpacingExample />,
};

export const Weight = {
  render: () => <WeightExample />,
};

export const VisualTest = {
  render: () => <MixedExample />,
};
