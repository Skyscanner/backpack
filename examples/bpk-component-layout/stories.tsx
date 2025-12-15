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

import { ArgTypes, Title, Markdown } from '@storybook/addon-docs/blocks';

import type { ReactNode } from 'react';
import { useState } from 'react';

import { BpkProvider, BpkBox, BpkSpacing } from '../../packages/bpk-component-layout';

const Tabs = ({
  tabs,
}: {
  tabs: Array<{ id: string; label: string; content: ReactNode }>;
}) => {
  const [activeId, setActiveId] = useState(tabs[0]?.id ?? '');
  const active = tabs.find((t) => t.id === activeId) ?? tabs[0];

  return (
    <div>
      <div style={{ display: 'flex', gap: 8, marginBottom: 12, flexWrap: 'wrap' }}>
        {tabs.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setActiveId(t.id)}
            style={{
              padding: '6px 10px',
              borderRadius: 6,
              border: '1px solid #d9d9d9',
              background: t.id === activeId ? '#f3f3f3' : 'white',
              cursor: 'pointer',
            }}
          >
            {t.label}
          </button>
        ))}
      </div>
      <div>{active?.content}</div>
    </div>
  );
};

export default {
  title: 'bpk-component-layout',
  component: BpkProvider,
  parameters: {
    docs: {
      page: () => (
        <>
          <Title />
          <ArgTypes exclude={['zoomEnabled']} />
          <Tabs
            tabs={[
              {
                id: 'overview',
                label: 'Overview',
                content: (
                  <Markdown>
                    {`BpkProvider is the root provider for Backpack layout primitives.

Wrap your app (or Storybook) with \`BpkProvider\` so layout tokens and responsive values resolve correctly.`}
                  </Markdown>
                ),
              },
              {
                id: 'usage',
                label: 'Usage',
                content: (
                  <Markdown>
                    {`Typical usage:

\`\`\`tsx
import { BpkProvider, BpkBox, BpkSpacing } from '@skyscanner/backpack-web/bpk-component-layout';

export function App() {
  return (
    <BpkProvider>
      <BpkBox padding={BpkSpacing.MD}>Hello</BpkBox>
    </BpkProvider>
  );
}
\`\`\``}
                  </Markdown>
                ),
              },
              {
                id: 'responsive',
                label: 'Responsive',
                content: (
                  <Markdown>
                    {`Responsive values are keyed by Backpack breakpoints (object form only). Arrays are intentionally not supported.

\`\`\`tsx
<BpkBox
  padding={{
    mobile: BpkSpacing.SM,
    tablet: BpkSpacing.MD,
    desktop: BpkSpacing.LG,
  }}
/>
\`\`\``}
                  </Markdown>
                ),
              },
              {
                id: 'constraints',
                label: 'Constraints',
                content: (
                  <Markdown>
                    {`These layout primitives are intentionally structural:

- Spacing values: Backpack spacing tokens or percentages
- No \`className\` / \`style\` on layout primitives
- Visual props (colors/borders/shadows) are not part of the public layout surface`}
                  </Markdown>
                ),
              },
            ]}
          />
        </>
      )
    },
  },
};
export const ProviderExample = () => (
  <BpkProvider>
    <BpkBox padding={BpkSpacing.MD}>
      Provider example (wraps layout primitives)
    </BpkBox>
  </BpkProvider>
);
