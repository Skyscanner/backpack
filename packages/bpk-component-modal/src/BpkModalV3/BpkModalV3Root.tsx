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

import { Dialog } from '@ark-ui/react/dialog';

import { cssModules, getDataComponentAttribute } from '../../../bpk-react-utils';

import type { BpkModalV3Variant } from './common-types';

import STYLES from './BpkModalV3.module.scss';

const getClassName = cssModules(STYLES);

type BpkModalV3RootProps = {
  children: ReactNode;
  open: boolean;
  onOpenChange: (details: { open: boolean }) => void;
  variant?: BpkModalV3Variant;
  lazyMount?: boolean;
  unmountOnExit?: boolean;
};

const BpkModalV3Root = ({
  children,
  lazyMount,
  onOpenChange,
  open,
  unmountOnExit,
  variant = 'default',
}: BpkModalV3RootProps) => (
  <Dialog.Root
    open={open}
    onOpenChange={onOpenChange}
    lazyMount={lazyMount}
    unmountOnExit={unmountOnExit}
  >
    <div
      className={getClassName(
        'bpk-modal-v3',
        `bpk-modal-v3--${variant}`,
      )}
      data-variant={variant}
      {...getDataComponentAttribute('BpkModalV3')}
    >
      {children}
    </div>
  </Dialog.Root>
);

export default BpkModalV3Root;
export type { BpkModalV3RootProps };
