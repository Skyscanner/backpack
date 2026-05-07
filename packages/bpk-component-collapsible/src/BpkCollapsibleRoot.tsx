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

import { Collapsible } from '@ark-ui/react';

import { cssModules, getDataComponentAttribute } from '../../bpk-react-utils';

import STYLES from './BpkCollapsible.module.scss';

const getClassName = cssModules(STYLES);

type ElementIds = Partial<{ root: string; trigger: string; content: string }>;

export type BpkCollapsibleOpenChangeDetails = { open: boolean };
export type BpkCollapsibleVariant = 'default' | 'onContrast';

export type BpkCollapsibleRootProps = {
  children: ReactNode;
  collapsedHeight?: string | number;
  defaultOpen?: boolean;
  disabled?: boolean;
  ids?: ElementIds;
  lazyMount?: boolean;
  onExitComplete?: () => void;
  onOpenChange?: (details: BpkCollapsibleOpenChangeDetails) => void;
  open?: boolean;
  unmountOnExit?: boolean;
  variant?: BpkCollapsibleVariant;
};

const BpkCollapsibleRoot = ({
  children,
  collapsedHeight,
  defaultOpen,
  disabled = false,
  ids,
  lazyMount,
  onExitComplete,
  onOpenChange,
  open,
  unmountOnExit,
  variant = 'default',
}: BpkCollapsibleRootProps) => {
  const variantModifier = variant === 'onContrast' ? 'on-contrast' : 'default';
  const rootClassName = getClassName(
    'bpk-collapsible',
    `bpk-collapsible--${variantModifier}`,
  );

  return (
    <Collapsible.Root
      className={rootClassName}
      collapsedHeight={collapsedHeight}
      defaultOpen={defaultOpen}
      disabled={disabled}
      ids={ids}
      lazyMount={lazyMount}
      onExitComplete={onExitComplete}
      onOpenChange={onOpenChange}
      open={open}
      unmountOnExit={unmountOnExit}
      {...getDataComponentAttribute('Collapsible')}
    >
      {children}
    </Collapsible.Root>
  );
};

export default BpkCollapsibleRoot;
