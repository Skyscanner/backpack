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

// Variant examples for BpkCheckboxCard
import { useState } from 'react';
import BpkCheckboxCard, { CHECKBOX_CARD_VARIANTS } from '../BpkCheckboxCard';

export const WithBackgroundVariant = () => {
  const [selected, setSelected] = useState(false);

  return (
    <BpkCheckboxCard
      checked={selected}
      onChange={(checked) => setSelected(checked)}
      label="With background"
      description="This variant has a visible background"
      price="£100"
      variant={CHECKBOX_CARD_VARIANTS.withBackground}
    />
  );
};

export const NoBackgroundVariant = () => {
  const [selected, setSelected] = useState(false);

  return (
    <BpkCheckboxCard
      checked={selected}
      onChange={(checked) => setSelected(checked)}
      label="No background"
      description="This variant has a transparent background with border"
      price="£85"
      variant={CHECKBOX_CARD_VARIANTS.noBackground}
    />
  );
};

export const AllVariantsComparison = () => {
  const [selectedWith, setSelectedWith] = useState(false);
  const [selectedNo, setSelectedNo] = useState(false);

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
      <BpkCheckboxCard
        checked={selectedWith}
        onChange={(checked) => setSelected With(checked)}
        label="With background"
        price="£100"
        variant="with-background"
      />
      <BpkCheckboxCard
        checked={selectedNo}
        onChange={(checked) => setSelectedNo(checked)}
        label="No background"
        price="£100"
        variant="no-background"
      />
    </div>
  );
};

export const BothVariantsSelected = () => {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
      <BpkCheckboxCard
        checked={true}
        onChange={() => {}}
        label="Selected with background"
        price="£100"
        variant="with-background"
      />
      <BpkCheckboxCard
        checked={true}
        onChange={() => {}}
        label="Selected no background"
        price="£100"
        variant="no-background"
      />
    </div>
  );
};
