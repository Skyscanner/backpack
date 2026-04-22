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

/** A single row entry within a comparison column. */
export type BpkCompareRow = {
  /** Stable unique identifier used to align rows across columns. */
  rowId: string;
  /** Cell content — consumer-controlled ReactNode. */
  cell: ReactNode;
};

/** Data for one filled comparison column. */
export type BpkCompareColumn = {
  /** Stable unique identifier used for removal callbacks. */
  itemId: string;
  /** When true, renders a BpkBadge type=brand overlaying the top-left of the image area. */
  bestTag?: boolean;
  /** Image src for the header image area. */
  imageSrc?: string;
  /** Alt text for the header image. */
  imageAlt?: string;
  /** Consumer-owned slot rendered below the image area (name, description, price, CTA...). */
  headerContent: ReactNode;
  /** Row data — must match rowId sequences across all columns. */
  rows: BpkCompareRow[];
  /** Accessible label for the Remove button (e.g. "Remove rentalcars.com deal"). */
  removeA11yLabel: string;
};

/** All strings required by BpkCompareModal. */
export type BpkCompareModalTranslations = {
  /** Accessible label for the modal close button. */
  closeLabel: string;
  /** Visible label for the Remove button in each column header. */
  removeLabel: string;
  /** Text inside the BpkBadge when bestTag=true (e.g. "Best"). */
  bestTagLabel: string;
  /** Description text inside the placeholder column. */
  addMoreDescription: string;
  /** Link text inside the placeholder column. */
  addMoreLinkText: string;
};

/** Props for BpkCompareModal.Root — modal shell only. */
export type BpkCompareModalRootProps = {
  /** Controls whether the modal is open. */
  isOpen: boolean;
  /** Called when the modal close trigger is activated or Escape is pressed. */
  onClose: () => void;
  /** BpkCompareModal.Header and BpkCompareModal.Content. */
  children: ReactNode;
};

/** Props for BpkCompareModal.Header — modal header + optional AiBlurb slot. */
export type BpkCompareModalHeaderProps = {
  /** Optional modal title rendered via BpkModalV3.Title. */
  title?: string;
  translations: BpkCompareModalTranslations;
  /** Optional slot for AI blurb or any content below the title/close row. */
  children?: ReactNode;
};

/** Props for BpkCompareModal.Content — modal body with the comparison table. */
export type BpkCompareModalContentProps = {
  /** 1–3 filled columns. Component pads to 3 with placeholder cells automatically. */
  columns: BpkCompareColumn[];
  /** Called when a Remove button is clicked, with the column's itemId. */
  onRemove: (itemId: string) => void;
  /** Called when the Add more link in a placeholder column is clicked. */
  onAddMoreClick: () => void;
  translations: BpkCompareModalTranslations;
};

/** Namespace type covering all BpkCompareModal subcomponents. */
export type BpkCompareModalNamespace = {
  Root: (props: BpkCompareModalRootProps) => ReactNode;
  Header: (props: BpkCompareModalHeaderProps) => ReactNode;
  Content: (props: BpkCompareModalContentProps) => ReactNode;
};
