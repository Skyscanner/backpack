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

import { BpkModalV3 } from '../../../bpk-component-modal';
import { cssModules } from '../../../bpk-react-utils';

import type { BpkCompareModalHeaderProps } from './common-types';

import STYLES from './BpkCompareModal.module.scss';

const getClassName = cssModules(STYLES);

function BpkCompareModalHeader({ children, title, translations }: BpkCompareModalHeaderProps) {
  return (
    <>
      <BpkModalV3.Header>
        {title && <BpkModalV3.Title>{title}</BpkModalV3.Title>}
        <BpkModalV3.CloseTrigger label={translations.closeLabel} />
      </BpkModalV3.Header>
      {children && (
        <div className={getClassName('bpk-compare-modal__header-slot')}>
          {children}
        </div>
      )}
    </>
  );
}

export default BpkCompareModalHeader;
