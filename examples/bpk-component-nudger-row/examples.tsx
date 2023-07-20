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

import BpkNudgerRow from '../../packages/bpk-component-nudger-row';

const DefaultExample = () => {
  const [value, setValue] = useState(1);
  return (
    <BpkNudgerRow
      title="Title"
      nudgerId="my-nudger"
      min={1}
      max={99}
      value={value}
      onChange={(val: number) => setValue(val)}
      decreaseButtonLabel="Decrease"
      increaseButtonLabel="Increase"
    />
  );
};

const WithSubtitleExample = () => {
  const [value, setValue] = useState(1);
  return (
    <BpkNudgerRow
      title="Title"
      subtitle="Subtitle"
      nudgerId="my-nudger"
      min={1}
      max={99}
      value={value}
      onChange={(val: number) => setValue(val)}
      decreaseButtonLabel="Decrease"
      increaseButtonLabel="Increase"
    />
  );
};

export { DefaultExample, WithSubtitleExample };
