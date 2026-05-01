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
import { BpkProvider, BpkSpacing, BpkVStack, BpkHStack } from '../../../bpk-component-layout';
// @ts-ignore - bpk-component-price has no TypeScript declarations
import BpkPrice, { SIZES as PRICE_SIZES, ALIGNS as PRICE_ALIGNS } from '../../../bpk-component-price';
import BpkText, { TEXT_STYLES } from '../../../bpk-component-text';
import BpkComparisonTray from '../BpkComparisonTray/BpkComparisonTray';

import BpkComparisonTable from './BpkComparisonTable';

import type { BpkCompareColumn } from './common-types';
import type { BpkComparisonItem } from '../BpkComparisonTray/common-types';
import type { Meta } from '@storybook/react';

// ─── Shared helpers ───────────────────────────────────────────────────────────

type AiState = 'thinking' | 'aiResponse';

const makeRows = (cancellation: string, stars: string, rating: string, included: string): BpkCompareColumn['rows'] => [
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

const AI_BLURB_STRINGS = {
  aiBlurbHeadingLabel: 'Summarized by AI',
  aiBlurbFeedbackText: 'Was this helpful?',
  aiBlurbThankYouText: 'Thanks for your feedback!',
  aiBlurbThumbsUpLabel: 'Thumbs up',
  aiBlurbThumbsDownLabel: 'Thumbs down',
};

const STRINGS = {
  accessibleLabel: 'Compare deals',
  closeLabel: 'Close comparison',
  removeLabel: 'Remove',
  bestTagLabel: 'Best',
  addMoreDescription: 'Add up to 3 deals to compare your favourites',
  addMoreLinkText: 'Add more',
};

// ─── Standalone modal story ───────────────────────────────────────────────────

const CAR_IMAGE_BASE = 'https://logos.skyscnr.com/images/carhire/sippmaps/';

const CAR_IMAGES = [
  `${CAR_IMAGE_BASE}14942_cc2400_032_N1.png`,
  `${CAR_IMAGE_BASE}43518_cc2400_032_FRD.png`,
  `${CAR_IMAGE_BASE}53101_cc2400_032_695.png`,
  `${CAR_IMAGE_BASE}13070_cc2400_032_YZ.png`,
];

const INITIAL_TABLE_COLUMNS: BpkCompareColumn[] = [
  {
    itemId: 'rentalcars-1',
    bestTag: true,
    imageSrc: CAR_IMAGES[0],
    imageAlt: 'Citroen C1',
    headerContent: makeHeader('rentalcars.com', 'Citroen C1 o similar economy', '£71'),
    rows: makeRows('Free cancellation', '3.5 / 5', '4.5 — Excellent', 'Free cancellation'),
    removeA11yLabel: 'Remove rentalcars.com deal',
  },
  {
    itemId: 'rentalcars-2',
    imageSrc: CAR_IMAGES[1],
    imageAlt: 'Ford Fiesta',
    headerContent: makeHeader('rentalcars.com', 'Ford Fiesta o similar economy', '£71'),
    rows: makeRows('No free cancellation', '4 / 5', '3.8 — Good', 'GPS included'),
    removeA11yLabel: 'Remove second rentalcars.com deal',
  },
];

const StandaloneExample = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [columns, setColumns] = useState<BpkCompareColumn[]>(INITIAL_TABLE_COLUMNS);
  const [aiState, setAiState] = useState<AiState>('aiResponse');

  const handleRemove = (itemId: string) => {
    setColumns((prev) => prev.filter((column) => column.itemId !== itemId));
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

      <BpkComparisonTable.Root
        isOpen={isOpen}
        onClose={() => {
          // eslint-disable-next-line no-console
          console.log('[BpkComparisonTable] onClose fired');
          setIsOpen(false);
        }}
        // eslint-disable-next-line no-console
        onOpen={() => console.log('[BpkComparisonTable] onOpen fired')}
      >
        <BpkComparisonTable.Header title="Modal Headline (Optional)" strings={STRINGS}>
          <BpkAiBlurb.Root>
            <BpkAiBlurb.Header title={AI_BLURB_STRINGS.aiBlurbHeadingLabel} />
            <BpkAiBlurb.Summary {...makeAiBlurbSummaryState(aiState)} />
            {aiState === 'aiResponse' && (
              <BpkAiBlurb.Feedback
                feedbackText={AI_BLURB_STRINGS.aiBlurbFeedbackText}
                thankYouText={AI_BLURB_STRINGS.aiBlurbThankYouText}
                thumbsUpLabel={AI_BLURB_STRINGS.aiBlurbThumbsUpLabel}
                thumbsDownLabel={AI_BLURB_STRINGS.aiBlurbThumbsDownLabel}
                onFeedback={() => {}}
              />
            )}
          </BpkAiBlurb.Root>
        </BpkComparisonTable.Header>
        <BpkComparisonTable.Content
          columns={columns}
          onRemove={handleRemove}
          onAddMoreClick={() => setIsOpen(false)}
          strings={STRINGS}
        />
      </BpkComparisonTable.Root>
    </BpkVStack>
  );
};

// ─── Combined tray + modal story ─────────────────────────────────────────────

const SAMPLE_ITEMS: BpkComparisonItem[] = [
  { id: 'hertz', label: 'Hertz', image: CAR_IMAGES[0], imageAlt: 'Hertz' },
  { id: 'avis', label: 'Avis', image: CAR_IMAGES[1], imageAlt: 'Avis' },
  { id: 'budget', label: 'Budget', image: CAR_IMAGES[2], imageAlt: 'Budget' },
  { id: 'europcar', label: 'Europcar', image: CAR_IMAGES[3], imageAlt: 'Europcar' },
];

// Per-item row data (mirrors what a real consumer would derive from their API).
const ITEM_ROWS: Record<string, { cancellation: string; stars: string; rating: string; included: string; price: string }> = {
  hertz:     { cancellation: 'Free cancellation',    stars: '3.5 / 5', rating: '4.5 — Excellent', included: 'Free cancellation', price: '£71' },
  avis:      { cancellation: 'No free cancellation', stars: '4 / 5',   rating: '3.8 — Good',      included: 'GPS included',      price: '£85' },
  budget:    { cancellation: 'Free cancellation',    stars: '4.5 / 5', rating: '4.2 — Great',     included: 'Child seat',        price: '£79' },
  europcar:  { cancellation: 'No free cancellation', stars: '3 / 5',   rating: '3.5 — Average',   included: 'Unlimited mileage', price: '£68' },
};

const itemToColumn = (item: BpkComparisonItem, index: number): BpkCompareColumn => {
  const data = ITEM_ROWS[item.id] ?? { cancellation: '—', stars: '—', rating: '—', included: '—', price: '—' };
  return {
    itemId: item.id,
    bestTag: index === 0,
    imageSrc: item.image,
    imageAlt: item.imageAlt ?? item.label,
    headerContent: makeHeader(item.label, 'Citroen C1 o similar economy', data.price),
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

  // Story-only: DOM query is a pragmatic way for focus restoration since BpkComparisonTray doesn't expose refs for individual items. In a real integration the consumer would handle focus management in whatever way suits their service.
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

      <BpkComparisonTable.Root isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <BpkComparisonTable.Header title="Modal Headline (Optional)" strings={STRINGS}>
          <BpkAiBlurb.Root>
            <BpkAiBlurb.Header title={AI_BLURB_STRINGS.aiBlurbHeadingLabel} />
            <BpkAiBlurb.Summary {...makeAiBlurbSummaryState(aiState)} />
            {aiState === 'aiResponse' && (
              <BpkAiBlurb.Feedback
                feedbackText={AI_BLURB_STRINGS.aiBlurbFeedbackText}
                thankYouText={AI_BLURB_STRINGS.aiBlurbThankYouText}
                thumbsUpLabel={AI_BLURB_STRINGS.aiBlurbThumbsUpLabel}
                thumbsDownLabel={AI_BLURB_STRINGS.aiBlurbThumbsDownLabel}
                onFeedback={() => {}}
              />
            )}
          </BpkAiBlurb.Root>
        </BpkComparisonTable.Header>
        <BpkComparisonTable.Content
          columns={columns}
          onRemove={removeItem}
          onAddMoreClick={() => setIsModalOpen(false)}
          strings={STRINGS}
        />
      </BpkComparisonTable.Root>
    </BpkVStack>
  );
};

// ─── Meta ─────────────────────────────────────────────────────────────────────

const meta = {
  title: 'bpk-component-comparison-table',
  component: BpkComparisonTable.Root,
  decorators: [(story: () => ReactNode) => <BpkProvider>{story()}</BpkProvider>],
} satisfies Meta;

export default meta;

export const CompareModalExample = {
  name: 'BpkComparisonTable',
  render: () => <StandaloneExample />,
};

export const CompareModalWithTray = {
  name: 'BpkComparisonTable + BpkComparisonTray',
  render: () => <CombinedExample />,
};
