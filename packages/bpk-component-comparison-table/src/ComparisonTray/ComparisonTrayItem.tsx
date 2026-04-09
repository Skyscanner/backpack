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

import CloseIcon from '../../../bpk-component-icon/sm/close';
import BpkImage from '../../../bpk-component-image';
import { cssModules } from '../../../bpk-react-utils';

import type { ComparisonTrayItemProps } from './common-types';

import STYLES from './ComparisonTray.module.scss';

const getClassName = cssModules(STYLES);

function ComparisonTrayItem({ item, onRemove, removeLabel }: ComparisonTrayItemProps) {
  return (
    <div className={getClassName('bpk-comparison-tray__item')}>
      <div className={getClassName('bpk-comparison-tray__item-image-container')}>
        <BpkImage
          src={item.image}
          altText={item.imageAlt ?? item.label}
          aspectRatio={62 / 28}
        />
      </div>
      <button
        type="button"
        className={getClassName('bpk-comparison-tray__item-close')}
        aria-label={removeLabel}
        onClick={() => onRemove(item.id)}
      >
        <CloseIcon />
      </button>
    </div>
  );
}

export default ComparisonTrayItem;
