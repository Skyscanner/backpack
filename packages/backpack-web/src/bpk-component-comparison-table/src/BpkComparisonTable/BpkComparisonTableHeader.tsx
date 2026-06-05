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

import { BpkBox, BpkSpacing } from '../../../bpk-component-layout';
import { BpkModalV3 } from '../../../bpk-component-modal';
import BpkVisuallyHidden from '../../../bpk-component-visually-hidden';

import type { BpkComparisonTableHeaderProps } from './common-types';

const BpkComparisonTableHeader = ({ children, strings, title }: BpkComparisonTableHeaderProps) => (
  <>
    <BpkModalV3.Header>
      <BpkModalV3.Title>
        {title ?? <BpkVisuallyHidden>{strings.accessibleLabel}</BpkVisuallyHidden>}
      </BpkModalV3.Title>
      <BpkModalV3.CloseTrigger label={strings.closeLabel} />
    </BpkModalV3.Header>
    {children && (
      <BpkBox paddingBottom={BpkSpacing.MD} paddingInline={BpkSpacing.Base}>
        {children}
      </BpkBox>
    )}
  </>
);

export default BpkComparisonTableHeader;
