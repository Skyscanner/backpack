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

import type { BpkModalV3Type } from './common-types';

import STYLES from './BpkModalV3.module.scss';

const getClassName = cssModules(STYLES);

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
  type = 'default',
}: BpkModalV3RootProps) => (
  <Dialog.Root
    {...(open !== undefined && { open })}
    {...(onOpenChange !== undefined && { onOpenChange })}
  >
    <div
      className={getClassName(
        'bpk-modal-v3',
        `bpk-modal-v3--${type}`,
      )}
      data-type={type}
      {...getDataComponentAttribute('ModalV3')}
    >
      {children}
    </div>
  </Dialog.Root>
);

export default BpkModalV3Root;
export type { BpkModalV3RootProps };
