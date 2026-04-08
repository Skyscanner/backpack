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

/** A single item to be displayed in the ComparisonTray. */
export type ComparisonItem = {
  /** Stable unique identifier used for removal. */
  id: string;
  /** Accessible label for the item (used as image alt if imageAlt is not provided). */
  label: string;
  /** Image src URL. */
  image: string;
  /** Alt text for the image. Defaults to `label` if not provided. */
  imageAlt?: string;
};

/** Props for ComparisonTray.Root — the only consumer-facing API. */
export type ComparisonTrayRootProps = {
  /** Up to 3 items to display. Consumer owns and manages this state. */
  items: ComparisonItem[];
  /** Called when the ✕ button on an item is clicked, with the item's id. */
  onRemove: (id: string) => void;
  /** Called when the Compare button is clicked. */
  onCompare: () => void;
  /** Label for the Compare button. Defaults to "Compare". */
  compareLabel?: string;
  /** Accessible label for the tray region. */
  ariaLabel: string;
  /** Accessible label for the remove button (e.g. "Remove"). Composed with the item label internally. */
  removeLabel: string;
};

/** Props for ComparisonTray.Item — internal use only. */
export type ComparisonTrayItemProps = {
  item: ComparisonItem;
  onRemove: (id: string) => void;
  removeLabel: string;
};

/** Namespace type covering all ComparisonTray subcomponents. */
export type ComparisonTrayNamespace = {
  Root: { (props: ComparisonTrayRootProps): ReactNode; displayName?: string };
  Item: { (props: ComparisonTrayItemProps): ReactNode; displayName?: string };
  ItemPlaceholder: { (): ReactNode; displayName?: string };
};
