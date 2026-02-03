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
// @ts-nocheck

import BpkButton, { BUTTON_TYPES } from '../../../bpk-component-button';
import {
  withButtonAlignment,
  withRtlSupport,
} from '../../../bpk-component-icon';
import ChevronDown from '../../../bpk-component-icon/sm/chevron-down';
import ChevronUp from '../../../bpk-component-icon/sm/chevron-up';

import type { ExpandProps } from '../common-types';

const AlignedChevronDownIcon = withButtonAlignment(withRtlSupport(ChevronDown));
const AlignedChevronUpIcon = withButtonAlignment(withRtlSupport(ChevronUp));

const ExpandAccessoryContent = ({
  children,
  collapsed,
  onExpandToggle,
}: ExpandProps) => (
    <BpkButton
      data-testid="bpk-card-list__accessory-expand-button"
      type={BUTTON_TYPES.link}
      onClick={onExpandToggle}
      aria-expanded={!collapsed}
      implicit
    >
      {children}
      {collapsed ? <AlignedChevronDownIcon /> : <AlignedChevronUpIcon />}
    </BpkButton>
  );

export default ExpandAccessoryContent;
