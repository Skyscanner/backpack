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

// Basic usage example for BpkCheckboxCard
import { useState } from 'react';
import BpkCheckboxCard from '../BpkCheckboxCard';

export const BasicUsage = () => {
  const [selected, setSelected] = useState(false);

  return (
    <BpkCheckboxCard
      checked={selected}
      onChange={(checked) => setSelected(checked)}
      label="Select this option"
      price="£100"
    />
  );
};

export const WithDescription = () => {
  const [selected, setSelected] = useState(false);

  return (
    <BpkCheckboxCard
      checked={selected}
      onChange={(checked) => setSelected(checked)}
      label="Premium option"
      description="Includes breakfast and parking"
      price="£150"
    />
  );
};

export const MinimalContent = () => {
  const [selected, setSelected] = useState(false);

  return (
    <BpkCheckboxCard
      checked={selected}
      onChange={(checked) => setSelected(checked)}
      ariaLabel="Minimal card with price only"
      price="£100"
    />
  );
};

export const DisabledStates = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <BpkCheckboxCard
        checked={false}
        onChange={() => {}}
        label="Disabled unselected"
        price="£100"
        disabled={true}
      />
      <BpkCheckboxCard
        checked={true}
        onChange={() => {}}
        label="Disabled selected"
        price="£100"
        disabled={true}
      />
    </div>
  );
};
