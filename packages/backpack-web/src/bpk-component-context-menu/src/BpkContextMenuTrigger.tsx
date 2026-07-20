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

import { Menu } from '@ark-ui/react';

export type BpkContextMenuTriggerProps = {
  /**
   * The element that will open the menu when clicked.
   *
   * When `asChild` is true (default), the consumer's element (e.g. their own
   * heart button) becomes the trigger via slot composition — the Menu attaches
   * its click/keyboard handlers and ARIA attributes to that element instead of
   * rendering an additional wrapping button.
   */
  children: ReactNode;
  /**
   * When true, delegates trigger behaviour to the child element rather than
   * rendering a Backpack-owned button. Defaults to true because the context
   * menu is opened by a consumer-owned icon (e.g. a heart) that already has
   * its own visual state, saved-state, and analytics wiring.
   */
  asChild?: boolean;
};

const BpkContextMenuTrigger = ({
  asChild = true,
  children,
}: BpkContextMenuTriggerProps) => (
  <Menu.Trigger asChild={asChild}>{children}</Menu.Trigger>
);

export default BpkContextMenuTrigger;
