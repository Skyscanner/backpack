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

import { Dialog } from '@ark-ui/react';

import {
  cssModules,
  getDataComponentAttribute,
} from '../../../../bpk-react-utils';
import { useModalType } from '../BpkModalV3Context';

import STYLES from './BpkModalV3Scrim.module.scss';

const getClassName = cssModules(STYLES);

// BpkModalV3Scrim renders the backdrop overlay behind the modal using Ark UI's Dialog.Backdrop.
// It applies type-specific styling (full or chatbot variants) based on the modal type from context.
const BpkModalV3Scrim = () => {
  const type = useModalType();
  return (
    <Dialog.Backdrop
      className={getClassName(
        'bpk-modal-v3__scrim',
        type === 'full' && 'bpk-modal-v3__scrim--full',
        type === 'chatbot' && 'bpk-modal-v3__scrim--chatbot',
      )}
      {...getDataComponentAttribute('ModalV3Scrim')}
    />
  );
};

export default BpkModalV3Scrim;
