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

import BpkButton, { BUTTON_TYPES, SIZE_TYPES } from '../../../bpk-component-button';
import { BpkFlex, BpkSpacing } from '../../../bpk-component-layout';
import BpkText, { TEXT_COLORS, TEXT_STYLES } from '../../../bpk-component-text';
import { cssModules } from '../../../bpk-react-utils';

import STYLES from './BpkCompareModal.module.scss';

const getClassName = cssModules(STYLES);

type BpkCompareModalColumnPlaceholderProps = {
  addMoreDescription: string;
  addMoreLinkText: string;
  onAddMoreClick: () => void;
};

function BpkCompareModalColumnPlaceholder({
  addMoreDescription,
  addMoreLinkText,
  onAddMoreClick,
}: BpkCompareModalColumnPlaceholderProps) {
  return (
    <BpkFlex
      direction="column"
      align="center"
      gap={BpkSpacing.MD}
      paddingTop={BpkSpacing.LG}
      paddingInline={BpkSpacing.XL}
    >
      <div className={getClassName('bpk-compare-modal__placeholder-text')}>
        <BpkText
          tagName="p"
          textStyle={TEXT_STYLES.bodyDefault}
          color={TEXT_COLORS.textSecondary}
        >
          {addMoreDescription}
        </BpkText>
      </div>
      <BpkButton
        type={BUTTON_TYPES.link}
        size={SIZE_TYPES.small}
        onClick={onAddMoreClick}
      >
        {addMoreLinkText}
      </BpkButton>
    </BpkFlex>
  );
}

export default BpkCompareModalColumnPlaceholder;
