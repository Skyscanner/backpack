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
import { useState } from 'react';

import BpkSaveButton, { STYLE_TYPES, SIZE_TYPES } from '../../packages/bpk-component-save-button';
import type { SizeType, StyleType } from '../../packages/bpk-component-save-button/src/BpkSaveButton';
// @ts-expect-error Untyped import. See `decisions/imports-ts-suppressions.md`.
import { BpkDarkExampleWrapper } from '../bpk-storybook-utils';

type Props = {
  size?: SizeType;
  style?: StyleType;
}
const SaveButtonContainer = ({
                               size,
                               style,
                             }: Props) => {
  const [checked, setChecked] = useState(false);

  const onCheckedChange = () => {
    setChecked(!checked);
  };

  return <BpkSaveButton
    checked={checked} accessibilityLabel={`Click to ${checked ? 'remove save' : 'save'}`}
    onCheckedChange={onCheckedChange}
    size={size}
    style={style}
  />;
};
const DefaultExample = () => <SaveButtonContainer
/>;

const ContainedExample = () => <BpkDarkExampleWrapper>
  <SaveButtonContainer
    style={STYLE_TYPES.contained}
  />
</BpkDarkExampleWrapper>;

const OnDarkExample = () =>
  <BpkDarkExampleWrapper>
    <SaveButtonContainer
      style={STYLE_TYPES.onDark}
    />
  </BpkDarkExampleWrapper>;

const SmallDefaultExample = () => <SaveButtonContainer
  size={SIZE_TYPES.small}
/>;

const SmallContainedExample = () =>
  <BpkDarkExampleWrapper>
    <SaveButtonContainer
      size={SIZE_TYPES.small}
      style={STYLE_TYPES.contained}
    />
  </BpkDarkExampleWrapper>
;

const SmallOnDarkExample = () =>   <BpkDarkExampleWrapper>
  <SaveButtonContainer
    size={SIZE_TYPES.small}
    style={STYLE_TYPES.onDark}
  />
</BpkDarkExampleWrapper>

const VisualTestExample = () =>
<>
  <DefaultExample />
  <ContainedExample />
  <OnDarkExample />
  <SmallDefaultExample />
  <SmallContainedExample />
  <SmallOnDarkExample />
</>;

export {
  DefaultExample,
  ContainedExample,
  OnDarkExample,
  SmallDefaultExample,
  SmallContainedExample,
  SmallOnDarkExample,
  VisualTestExample,
};
