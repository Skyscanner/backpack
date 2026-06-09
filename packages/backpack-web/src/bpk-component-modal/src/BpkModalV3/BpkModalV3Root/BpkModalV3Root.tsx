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

import { getDataComponentAttribute, portalLock, useBodyLock } from '../../../../bpk-react-utils';
import { focusScope } from '../../../../bpk-scrim-utils';
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

  // When this modal opens, pause the active focusScope (used by legacy withScrim
  // components such as BpkDrawer) and lock the Portal event handlers so legacy
  // overlays do not respond to clicks/Esc while the modal is visible.
  //
  // focusScope: prevents an infinite focus-redirect loop — both systems listen
  //   to 'focusin' on document and would fight each other without this guard.
  // portalLock: prevents legacy Portal (BpkDrawer/BpkModal/BpkDialog) from
  //   starting their close animation simultaneously, which causes a visible flash.
  //
  // bodyLockOpen (rather than isOpen) is used as the dependency so that the
  // locks stay active for the full exit-animation duration (durationBase ms)
  // after isOpen becomes false. Without the delay, events fired during the
  // exit animation (e.g. the mousedown that triggered the close falling through
  // to a BpkScrim below) would reach legacy overlays and cause a flash.
  //
  // The cleanup function runs both on bodyLockOpen→false AND on unmount-while-open,
  // ensuring the locks are always released.
  //
  // TODO: CLOV-1643 Remove once BpkDrawer, BpkModal, BpkDialog are deprecated.
  useEffect(() => {
    if (!bodyLockOpen) return undefined;
    focusScope.pauseFocus();
    portalLock.lock();
    return () => {
      focusScope.resumeFocus();
      portalLock.unlock();
    };
  }, [bodyLockOpen]);

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
