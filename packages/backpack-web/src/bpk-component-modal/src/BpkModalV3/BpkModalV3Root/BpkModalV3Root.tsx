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

import { useEffect, useState, type ReactNode } from 'react';

import { Dialog } from '@ark-ui/react';

import { durationBase } from '@skyscanner/bpk-foundations-web/tokens/base.es6';

import { getDataComponentAttribute, useBodyLock } from '../../../../bpk-react-utils';
import focusScope from '../../../../bpk-scrim-utils/src/focusScope';
import { ModalTypeProvider } from '../BpkModalV3Context';
import { MODAL_V3_TYPES, type BpkModalV3Type } from '../common-types';


type BpkModalV3RootProps = {
  children: ReactNode;
  open?: boolean;
  onOpenChange?: (details: { open: boolean }) => void;
  type?: BpkModalV3Type;
};

const BpkModalV3Root = ({
  children,
  onOpenChange,
  open,
  type = MODAL_V3_TYPES.default,
}: BpkModalV3RootProps) => {
  const [internalOpen, setInternalOpen] = useState(open ?? false);

  const isOpen = open ?? internalOpen;

  const [bodyLockOpen, setBodyLockOpen] = useState(isOpen);
  useEffect(() => {
    if (isOpen) {
      setBodyLockOpen(true);
    } else {
      const timer = setTimeout(() => setBodyLockOpen(false), parseInt(durationBase, 10));
      return () => clearTimeout(timer);
    }
    return undefined;
  }, [isOpen]);

  useBodyLock(type === MODAL_V3_TYPES.chatbot && bodyLockOpen);

  // When this modal opens, pause any active focusScope (used by legacy
  // withScrim components such as BpkDrawer). Both systems listen to 'focusin'
  // on document, and their simultaneous presence causes an infinite focus
  // redirect loop that overflows the call stack. The scope is resumed without
  // stealing focus when the modal closes, restoring the drawer's focus trap.
  // TODO: Remove once BpkDrawer is migrated to ark-ui.
  useEffect(() => {
    if (isOpen) {
      focusScope.pauseFocus();
    } else {
      focusScope.resumeFocus();
    }
  }, [isOpen]);

  const handleOpenChange = (details: { open: boolean }) => {
    if (open === undefined) {
      setInternalOpen(details.open);
    }
    onOpenChange?.(details);
  };

  return (
    <Dialog.Root
      {...(open !== undefined && { open })}
      onOpenChange={handleOpenChange}
    >
      <ModalTypeProvider value={type}>
        <div data-type={type} {...getDataComponentAttribute('ModalV3')}>
          {children}
        </div>
      </ModalTypeProvider>
    </Dialog.Root>
  );
};

export default BpkModalV3Root;
export type { BpkModalV3RootProps };
