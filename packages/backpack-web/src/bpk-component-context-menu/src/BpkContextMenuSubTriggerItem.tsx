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

import { BREAKPOINTS, useMediaQuery } from '../../bpk-component-breakpoint';
import { cssModules, getDataComponentAttribute } from '../../bpk-react-utils';

import { useBpkContextMenuNav } from './BpkContextMenuNavContext';

import STYLES from './BpkContextMenu.module.scss';

const getClassName = cssModules(STYLES);

export type BpkContextMenuTriggerItemProps = {
  children: ReactNode;
  /**
   * Optional trailing element rendered on the end side of the row.
   * Typically a chevron icon to indicate a nested menu.
   */
  endIcon?: ReactNode;
  /**
   * When inside a BpkContextMenu.PanelGroup, set this to the id of the
   * BpkContextMenu.Panel that should become active when this item is tapped
   * on mobile. Has no effect on desktop.
   */
  panelId?: string;
  /**
   * Desktop-only flyout content. Pass a BpkContextMenu.Content element here
   * and it will be shown as a side-by-side sub-menu on hover on desktop.
   * On mobile this is not rendered — the panel referenced by panelId is used
   * instead. When provided, this component manages the nested Menu.Root
   * internally so the consumer does not need to wrap in BpkContextMenu.Root.
   */
  desktopFlyout?: ReactNode;
};

const ItemContent = ({
  children,
  endIcon,
}: {
  children: ReactNode;
  endIcon?: ReactNode;
}) => (
  <>
    <span className={getClassName('bpk-context-menu__item-label')}>
      {children}
    </span>
    {endIcon && (
      <span className={getClassName('bpk-context-menu__item-icon')}>
        {endIcon}
      </span>
    )}
  </>
);

const BpkContextMenuSubTriggerItem = ({
  children,
  desktopFlyout,
  endIcon,
  panelId,
}: BpkContextMenuTriggerItemProps) => {
  const nav = useBpkContextMenuNav();
  const isMobile = useMediaQuery(BREAKPOINTS.MOBILE);

  if (nav && panelId && isMobile) {
    // Mobile inside a PanelGroup — navigate to the target panel.
    // Rendered as a plain Menu.Item in the parent menu context so it is
    // keyboard-navigable and never nested inside a sub-menu Root.
    return (
      <Menu.Item
        value={`_panel_${panelId}`}
        closeOnSelect={false}
        onSelect={() => nav.navigate(panelId)}
        className={getClassName('bpk-context-menu__item')}
        {...getDataComponentAttribute('ContextMenuSubTriggerItem')}
      >
        <ItemContent endIcon={endIcon}>{children}</ItemContent>
      </Menu.Item>
    );
  }

  if (desktopFlyout) {
    // Desktop with an explicit flyout — manage the nested Menu.Root
    // internally so the consumer doesn't need a BpkContextMenu.Root wrapper.
    return (
      <Menu.Root>
        <Menu.TriggerItem
          className={getClassName('bpk-context-menu__item')}
          {...getDataComponentAttribute('ContextMenuSubTriggerItem')}
        >
          <ItemContent endIcon={endIcon}>{children}</ItemContent>
        </Menu.TriggerItem>
        {desktopFlyout}
      </Menu.Root>
    );
  }

  // Fallback — Ark's TriggerItem; consumer manages the nested Menu.Root.
  return (
    <Menu.TriggerItem
      className={getClassName('bpk-context-menu__item')}
      {...getDataComponentAttribute('ContextMenuSubTriggerItem')}
    >
      <ItemContent endIcon={endIcon}>{children}</ItemContent>
    </Menu.TriggerItem>
  );
};

export default BpkContextMenuSubTriggerItem;
