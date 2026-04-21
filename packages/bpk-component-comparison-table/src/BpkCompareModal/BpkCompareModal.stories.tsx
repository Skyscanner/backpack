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

import type { ReactNode } from 'react';
import { useEffect, useRef, useState } from 'react';

import BpkAiBlurb from '../../../bpk-component-ai-blurb';
import BpkButton, { BUTTON_TYPES } from '../../../bpk-component-button';
import { BpkBox, BpkProvider, BpkSpacing, BpkVStack, BpkHStack } from '../../../bpk-component-layout';
// @ts-ignore - bpk-component-price has no TypeScript declarations
import BpkPrice, { SIZES as PRICE_SIZES, ALIGNS as PRICE_ALIGNS } from '../../../bpk-component-price';
import BpkText, { TEXT_STYLES } from '../../../bpk-component-text';
import BpkComparisonTray from '../BpkComparisonTray/BpkComparisonTray';

import BpkCompareModal from './BpkCompareModal';

import type { BpkCompareColumnData } from './common-types';
import type { BpkComparisonItem } from '../BpkComparisonTray/common-types';
import type { Meta } from '@storybook/react';

// ─── Shared helpers ───────────────────────────────────────────────────────────

type AiState = 'thinking' | 'aiResponse';

const makeRows = (cancellation: string, stars: string, rating: string, included: string): BpkCompareColumnData['rows'] => [
  { rowId: 'cancellation', cell: <BpkText textStyle={TEXT_STYLES.footnote}>{cancellation}</BpkText> },
  { rowId: 'stars', cell: <BpkText textStyle={TEXT_STYLES.footnote}>{stars}</BpkText> },
  { rowId: 'rating', cell: <BpkText textStyle={TEXT_STYLES.footnote}>{rating}</BpkText> },
  { rowId: 'included', cell: <BpkText textStyle={TEXT_STYLES.footnote}>✓ {included}</BpkText> },
  { rowId: 'fuel', cell: <BpkText textStyle={TEXT_STYLES.footnote}>Full to full</BpkText> },
  { rowId: 'mileage', cell: <BpkText textStyle={TEXT_STYLES.footnote}>Unlimited mileage</BpkText> },
  { rowId: 'doors', cell: <BpkText textStyle={TEXT_STYLES.footnote}>5 doors</BpkText> },
  { rowId: 'transmission', cell: <BpkText textStyle={TEXT_STYLES.footnote}>Manual</BpkText> },
  { rowId: 'age', cell: <BpkText textStyle={TEXT_STYLES.footnote}>Min. age 21</BpkText> },
  { rowId: 'deposit', cell: <BpkText textStyle={TEXT_STYLES.footnote}>£200 deposit</BpkText> },
  { rowId: 'insurance', cell: <BpkText textStyle={TEXT_STYLES.footnote}>Third party</BpkText> },
  { rowId: 'pickup', cell: <BpkText textStyle={TEXT_STYLES.footnote}>Airport pickup</BpkText> },
  { rowId: 'extra', cell: <BpkText textStyle={TEXT_STYLES.footnote}>Placeholder</BpkText> },
];

const makeHeader = (name: string, description: string, price: string) => (
  <BpkVStack gap={BpkSpacing.Base} alignItems="flex-start">
    <BpkVStack gap={BpkSpacing.None} alignItems="flex-start">
      <BpkText textStyle={TEXT_STYLES.label1}>{name}</BpkText>
      <BpkText textStyle={TEXT_STYLES.caption}>{description}</BpkText>
    </BpkVStack>
    <BpkVStack gap={BpkSpacing.SM} alignItems="flex-start" width="100%">
      <BpkPrice
        price={price}
        size={PRICE_SIZES.small}
        align={PRICE_ALIGNS.left}
        trailingText="total"
      />
      <BpkButton type={BUTTON_TYPES.primary} size="small" fullWidth>Go to site</BpkButton>
    </BpkVStack>
  </BpkVStack>
);

const makeAiBlurbSummaryState = (aiState: AiState) =>
  aiState === 'thinking'
    ? ({ state: 'thinking', thinkingText: 'Analysing' } as const)
    : ({
        state: 'aiResponse',
        aiResponseText: (
          <BpkText textStyle={TEXT_STYLES.caption}>
            The first rentalcars.com deal includes free cancellation and is rated slightly higher. Choose it if flexibility matters.
          </BpkText>
        ),
      } as const);

const AI_BLURB_TRANSLATIONS = {
  aiBlurbHeadingLabel: 'Summarized by AI',
  aiBlurbFeedbackText: 'Was this helpful?',
  aiBlurbThankYouText: 'Thanks for your feedback!',
  aiBlurbThumbsUpLabel: 'Thumbs up',
  aiBlurbThumbsDownLabel: 'Thumbs down',
};

const TRANSLATIONS = {
  closeLabel: 'Close comparison',
  removeLabel: 'Remove',
  bestTagLabel: 'Best',
  addMoreDescription: 'Add up to 3 deals to compare your favourites',
  addMoreLinkText: 'Add more',
};

// ─── Standalone modal story ───────────────────────────────────────────────────

const INITIAL_TABLE_COLUMNS: BpkCompareColumnData[] = [
  {
    itemId: 'rentalcars-1',
    bestTag: true,
    imageSrc: 'https://picsum.photos/seed/rentalcars1/240/83',
    imageAlt: 'Citroen C1',
    header: makeHeader('rentalcars.com', 'Citroen C1 o similar economy', '£71'),
    rows: makeRows('Free cancellation', '3.5 / 5', '4.5 — Excellent', 'Free cancellation'),
    removeA11yLabel: 'Remove rentalcars.com deal',
  },
  {
    itemId: 'rentalcars-2',
    imageSrc: 'https://picsum.photos/seed/rentalcars2/240/83',
    imageAlt: 'Citroen C1',
    header: makeHeader('rentalcars.com', 'Citroen C1 o similar economy', '£71'),
    rows: makeRows('No free cancellation', '4 / 5', '3.8 — Good', 'GPS included'),
    removeA11yLabel: 'Remove second rentalcars.com deal',
  },
];

const StandaloneExample = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [columns, setColumns] = useState<BpkCompareColumnData[]>(INITIAL_TABLE_COLUMNS);
  const [aiState, setAiState] = useState<AiState>('aiResponse');

  const handleRemove = (itemId: string) => {
    setColumns((prev) => prev.filter((col) => col.itemId !== itemId));
  };

  return (
    <BpkVStack gap={BpkSpacing.LG}>
      <BpkHStack gap={BpkSpacing.Base}>
        <BpkButton onClick={() => setIsOpen(true)}>Open comparison modal</BpkButton>
      </BpkHStack>

      <BpkHStack gap={BpkSpacing.Base}>
        <BpkText textStyle={TEXT_STYLES.footnote}>AI blurb state:</BpkText>
        {(['thinking', 'aiResponse'] as AiState[]).map((s) => (
          <BpkButton
            key={s}
            type={aiState === s ? BUTTON_TYPES.primary : BUTTON_TYPES.secondary}
            onClick={() => setAiState(s)}
          >
            {s}
          </BpkButton>
        ))}
      </BpkHStack>

      <BpkCompareModal.Root isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <BpkCompareModal.Header title="Modal Headline (Optional)" translations={TRANSLATIONS}>
          <BpkAiBlurb.Root>
            <BpkAiBlurb.Header title={AI_BLURB_TRANSLATIONS.aiBlurbHeadingLabel} />
            <BpkAiBlurb.Summary {...makeAiBlurbSummaryState(aiState)} />
            {aiState === 'aiResponse' && (
              <BpkAiBlurb.Feedback
                feedbackText={AI_BLURB_TRANSLATIONS.aiBlurbFeedbackText}
                thankYouText={AI_BLURB_TRANSLATIONS.aiBlurbThankYouText}
                thumbsUpLabel={AI_BLURB_TRANSLATIONS.aiBlurbThumbsUpLabel}
                thumbsDownLabel={AI_BLURB_TRANSLATIONS.aiBlurbThumbsDownLabel}
                onFeedback={() => {}}
              />
            )}
          </BpkAiBlurb.Root>
        </BpkCompareModal.Header>
        <BpkCompareModal.Content
          columns={columns}
          onRemove={handleRemove}
          onAddMoreClick={() => setIsOpen(false)}
          translations={TRANSLATIONS}
        />
      </BpkCompareModal.Root>
    </BpkVStack>
  );
};

// ─── Combined tray + modal story ─────────────────────────────────────────────

const SAMPLE_ITEMS: BpkComparisonItem[] = [
  { id: 'vip-cars', label: 'VIP Cars', image: 'https://picsum.photos/seed/vipcars/120/60', imageAlt: 'VIP Cars' },
  { id: 'hertz', label: 'Hertz', image: 'https://picsum.photos/seed/hertz/120/60', imageAlt: 'Hertz' },
  { id: 'avis', label: 'Avis', image: 'https://picsum.photos/seed/avis/120/60', imageAlt: 'Avis' },
  { id: 'enterprise', label: 'Enterprise', image: 'https://picsum.photos/seed/enterprise/120/60', imageAlt: 'Enterprise' },
];

// Per-item row data (mirrors what a real consumer would derive from their API).
const ITEM_ROWS: Record<string, { cancellation: string; stars: string; rating: string; included: string; price: string }> = {
  'vip-cars':   { cancellation: 'Free cancellation', stars: '3.5 / 5', rating: '4.5 — Excellent', included: 'Free cancellation', price: '£71' },
  hertz:        { cancellation: 'No free cancellation', stars: '4 / 5', rating: '3.8 — Good', included: 'GPS included', price: '£85' },
  avis:         { cancellation: 'Free cancellation', stars: '4.5 / 5', rating: '4.2 — Great', included: 'Child seat', price: '£79' },
  enterprise:   { cancellation: 'No free cancellation', stars: '3 / 5', rating: '3.5 — Average', included: 'Unlimited mileage', price: '£68' },
};

const itemToColumn = (item: BpkComparisonItem, index: number): BpkCompareColumnData => {
  const data = ITEM_ROWS[item.id] ?? { cancellation: '—', stars: '—', rating: '—', included: '—', price: '—' };
  return {
    itemId: item.id,
    bestTag: index === 0,
    imageSrc: `https://picsum.photos/seed/${item.id}/240/83`,
    imageAlt: item.imageAlt ?? item.label,
    header: makeHeader(item.label, 'Citroen C1 o similar economy', data.price),
    rows: makeRows(data.cancellation, data.stars, data.rating, data.included),
    removeA11yLabel: `Remove ${item.label}`,
  };
};

const CombinedExample = () => {
  const [items, setItems] = useState<BpkComparisonItem[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [aiState, setAiState] = useState<AiState>('aiResponse');
  const pendingFocusIndexRef = useRef<number | null>(null);

  const columns = items.map(itemToColumn);

  // Auto-close modal when no items remain.
  useEffect(() => {
    if (isModalOpen && items.length === 0) {
      setIsModalOpen(false);
    }
  }, [items, isModalOpen]);

  const addItem = (newItem: BpkComparisonItem) => {
    if (items.length < 3 && !items.some((i) => i.id === newItem.id)) {
      setItems((prev) => [...prev, newItem]);
    }
  };

  const removeItem = (id: string) => {
    const removedIndex = items.findIndex((item) => item.id === id);
    const remaining = items.filter((item) => item.id !== id);
    if (remaining.length > 0) {
      pendingFocusIndexRef.current = removedIndex < remaining.length ? removedIndex : removedIndex - 1;
    }
    setItems(remaining);
  };

  useEffect(() => {
    if (pendingFocusIndexRef.current === null) return;
    const idx = pendingFocusIndexRef.current;
    pendingFocusIndexRef.current = null;
    const tray = document.querySelector('[data-backpack-ds-component="ComparisonTray"]');
    const removeButtons = tray?.querySelectorAll<HTMLButtonElement>('button[aria-label^="Remove"]');
    removeButtons?.[idx]?.focus();
  }, [items]);

  const isAdded = (id: string) => items.some((i) => i.id === id);
  const isFull = items.length >= 3;

  return (
    <BpkVStack gap={BpkSpacing.LG}>
      <BpkText tagName="p" textStyle={TEXT_STYLES.bodyDefault}>
        Add at least 2 cars to the tray, then click Compare to open the modal.
      </BpkText>

      <BpkHStack gap={BpkSpacing.Base}>
        <BpkText textStyle={TEXT_STYLES.footnote}>AI blurb state:</BpkText>
        {(['thinking', 'aiResponse'] as AiState[]).map((s) => (
          <BpkButton
            key={s}
            type={aiState === s ? BUTTON_TYPES.primary : BUTTON_TYPES.secondary}
            onClick={() => setAiState(s)}
          >
            {s}
          </BpkButton>
        ))}
      </BpkHStack>

      <BpkHStack gap={BpkSpacing.Base}>
        {SAMPLE_ITEMS.map((item) =>
          isAdded(item.id) ? (
            <BpkButton key={item.id} type={BUTTON_TYPES.destructive} onClick={() => removeItem(item.id)}>
              Remove {item.label}
            </BpkButton>
          ) : (
            <BpkButton key={item.id} type={BUTTON_TYPES.secondary} disabled={isFull} onClick={() => addItem(item)}>
              Add {item.label}
            </BpkButton>
          ),
        )}
      </BpkHStack>

      <BpkBox>
        {items.length > 0 && (
          <BpkComparisonTray.Root
            items={items}
            ariaLabel="Comparison tray"
            compareLabel="Compare"
            removeLabel="Remove"
            onRemove={removeItem}
            onCompare={() => setIsModalOpen(true)}
          />
        )}
      </BpkBox>

      <BpkCompareModal.Root isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <BpkCompareModal.Header title="Modal Headline (Optional)" translations={TRANSLATIONS}>
          <BpkAiBlurb.Root>
            <BpkAiBlurb.Header title={AI_BLURB_TRANSLATIONS.aiBlurbHeadingLabel} />
            <BpkAiBlurb.Summary {...makeAiBlurbSummaryState(aiState)} />
            {aiState === 'aiResponse' && (
              <BpkAiBlurb.Feedback
                feedbackText={AI_BLURB_TRANSLATIONS.aiBlurbFeedbackText}
                thankYouText={AI_BLURB_TRANSLATIONS.aiBlurbThankYouText}
                thumbsUpLabel={AI_BLURB_TRANSLATIONS.aiBlurbThumbsUpLabel}
                thumbsDownLabel={AI_BLURB_TRANSLATIONS.aiBlurbThumbsDownLabel}
                onFeedback={() => {}}
              />
            )}
          </BpkAiBlurb.Root>
        </BpkCompareModal.Header>
        <BpkCompareModal.Content
          columns={columns}
          onRemove={removeItem}
          onAddMoreClick={() => setIsModalOpen(false)}
          translations={TRANSLATIONS}
        />
      </BpkCompareModal.Root>
    </BpkVStack>
  );
};

// ─── Meta ─────────────────────────────────────────────────────────────────────

const meta = {
  title: 'bpk-component-comparison-table',
  component: BpkCompareModal.Root,
  decorators: [(story: () => ReactNode) => <BpkProvider>{story()}</BpkProvider>],
} satisfies Meta;

export default meta;

export const CompareModalExample = {
  name: 'BpkCompareModal',
  render: () => <StandaloneExample />,
};

export const CompareModalWithTray = {
  name: 'BpkCompareModal + BpkComparisonTray',
  render: () => <CombinedExample />,
};
