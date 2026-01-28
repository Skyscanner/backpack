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

import {
  BpkSaveButton,
  STYLE_TYPES,
  SIZE_TYPES,
} from "..";
// @ts-expect-error Untyped import. See `decisions/imports-ts-suppressions.md`.
import { BpkDarkExampleWrapper } from '../../bpk-storybook-utils';

import type {
  SizeType,
  StyleType,
} from './BpkSaveButton';

type Props = {
  checked?: boolean;
  size?: SizeType;
  style?: StyleType;
  asyncWithError?: boolean;
};
const SaveButtonContainer = ({
  asyncWithError = false,
  checked = false,
  size,
  style,
}: Props) => {
  const [checkedStatus, setCheckedStatus] = useState(checked);

  const onCheckedChange = () => {
    setCheckedStatus(!checkedStatus);
  };

  const onSyncCheckedChange = async () => {
    try {
      await Promise.reject(new Error('mocked example error'));
      setCheckedStatus(!checkedStatus);
    } catch (e) {
      console.log('save button async error: ', e); // eslint-disable-line no-console
    }
  };

  return (
    <BpkSaveButton
      checked={checkedStatus}
      accessibilityLabel="Save Amsterdam hostel"
      onCheckedChange={asyncWithError ? onSyncCheckedChange : onCheckedChange}
      size={size}
      style={style}
    />
  );
};
const DefaultExample = () => <SaveButtonContainer />;

const ContainedExample = () => (
  <BpkDarkExampleWrapper>
    <SaveButtonContainer style={STYLE_TYPES.contained} />
  </BpkDarkExampleWrapper>
);

const OnDarkExample = () => (
  <BpkDarkExampleWrapper>
    <SaveButtonContainer style={STYLE_TYPES.onDark} />
  </BpkDarkExampleWrapper>
);

const CheckedExample = () => <SaveButtonContainer checked />;

const AsyncWithErrorCheckedExample = () => (
  <SaveButtonContainer checked asyncWithError />
);

const SmallDefaultExample = () => (
  <SaveButtonContainer size={SIZE_TYPES.small} />
);

const SmallContainedExample = () => (
  <BpkDarkExampleWrapper>
    <SaveButtonContainer
      size={SIZE_TYPES.small}
      style={STYLE_TYPES.contained}
    />
  </BpkDarkExampleWrapper>
);

const SmallOnDarkExample = () => (
  <BpkDarkExampleWrapper>
    <SaveButtonContainer size={SIZE_TYPES.small} style={STYLE_TYPES.onDark} />
  </BpkDarkExampleWrapper>
);

const SmallCheckedExample = () => (
  <SaveButtonContainer checked size={SIZE_TYPES.small} />
);

const VisualTestExample = () => (
  <>
    <DefaultExample />
    <ContainedExample />
    <OnDarkExample />
    <CheckedExample />
    <br />
    <SmallDefaultExample />
    <SmallContainedExample />
    <SmallOnDarkExample />
    <SmallCheckedExample />
  </>
);

export {
  DefaultExample,
  ContainedExample,
  OnDarkExample,
  CheckedExample,
  SmallDefaultExample,
  SmallContainedExample,
  SmallOnDarkExample,
  VisualTestExample,
  SmallCheckedExample,
  AsyncWithErrorCheckedExample,
};
