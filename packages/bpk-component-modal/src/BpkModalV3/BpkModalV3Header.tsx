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

import { cssModules, getDataComponentAttribute } from '../../../bpk-react-utils';

import { useModalType } from './BpkModalV3Context';

import STYLES from './BpkModalV3.module.scss';

const getClassName = cssModules(STYLES);

type BpkModalV3HeaderProps = {
  children: ReactNode;
};

const BpkModalV3Header = ({ children }: BpkModalV3HeaderProps) => {
  const type = useModalType();
  return (
    <div
      className={getClassName(
        'bpk-modal-v3__header',
        `bpk-modal-v3__header--${type}`,
      )}
      {...getDataComponentAttribute('ModalV3Header')}
    >
      {children}
    </div>
  );
};

export default BpkModalV3Header;
export type { BpkModalV3HeaderProps };
