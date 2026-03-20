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

import { getDataComponentAttribute } from '../../../bpk-react-utils';

type BpkModalV3DescriptionProps = {
  children: ReactNode;
};

const BpkModalV3Description = ({ children }: BpkModalV3DescriptionProps) => (
  <Dialog.Description
    {...getDataComponentAttribute('ModalV3Description')}
  >
    {children}
  </Dialog.Description>
);

export default BpkModalV3Description;
export type { BpkModalV3DescriptionProps };
