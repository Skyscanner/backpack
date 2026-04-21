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
  /** 1–3 BpkCompareModal.Column sub-components. Component pads to 3 with placeholder cells automatically. */
  children: ReactNode;
  /** Called when the Add more link in a placeholder column is clicked. */
  onAddMoreClick: () => void;
  translations: BpkCompareModalTranslations;
};

/**
 * Props for BpkCompareModal.Column — container for one comparison item.
 * Holds BpkCompareModal.ColumnHeader and BpkCompareModal.Rows as children.
 * Returns null — Content introspects its children to build the table structure.
 */
export type BpkCompareModalColumnProps = {
  /** Stable unique identifier for this column. */
  itemId: string;
  /** Called when the Remove button for this column is clicked. */
  onRemove: () => void;
  /** Accessible label for the Remove button (e.g. "Remove rentalcars.com deal"). */
  removeA11yLabel: string;
  /** BpkCompareModal.ColumnHeader and BpkCompareModal.Rows. */
  children: ReactNode;
};

/** Props for BpkCompareModal.ColumnHeader — visual header for one comparison column. */
export type BpkCompareModalColumnHeaderProps = {
  /** Consumer-owned content rendered below the image (name, description, price, CTA...). */
  children?: ReactNode;
  /** Image src for the header image area. */
  imageSrc?: string;
  /** Alt text for the header image. */
  imageAlt?: string;
  /** When true, renders a BpkBadge type=brand overlaying the image. */
  bestTag?: boolean;
};

/** Props for BpkCompareModal.Rows — cell data for one comparison column. */
export type BpkCompareModalRowsProps = {
  /**
   * Array of cell content in display order. Must have the same length across all columns.
   * BpkTable handles visual row alignment natively — positional order is what matters.
   */
  rows: ReactNode[];
};

/** Namespace type covering all BpkCompareModal subcomponents. */
export type BpkCompareModalNamespace = {
  Root: (props: BpkCompareModalRootProps) => ReactNode;
  Header: (props: BpkCompareModalHeaderProps) => ReactNode;
  Content: (props: BpkCompareModalContentProps) => ReactNode;
  Column: (props: BpkCompareModalColumnProps) => ReactNode;
  ColumnHeader: (props: BpkCompareModalColumnHeaderProps) => ReactNode;
  Rows: (props: BpkCompareModalRowsProps) => ReactNode;
};
