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

// Edge case examples for BpkCheckboxCard
import { useState } from 'react';
import BpkCheckboxCard from '../BpkCheckboxCard';

export const ExtremelyLongText = () => {
  const [selected, setSelected] = useState(false);

  return (
    <BpkCheckboxCard
      checked={selected}
      onChange={(checked) => setSelected(checked)}
      label="This is an extremely long label that will definitely exceed the maximum line count and should be truncated with an ellipsis to prevent layout breaking"
      description="This is also a very long description that goes on and on and on and should also be truncated after a certain number of lines to maintain a consistent card height and prevent the layout from breaking when displaying multiple cards in a grid"
      price="£9,999"
    />
  );
};

export const MissingLabel = () => {
  const [selected, setSelected] = useState(false);

  return (
    <BpkCheckboxCard
      checked={selected}
      onChange={(checked) => setSelected(checked)}
      ariaLabel="Card with no visible label"
      price="£100"
    />
  );
};

export const MissingPrice = () => {
  const [selected, setSelected] = useState(false);

  return (
    <BpkCheckboxCard
      checked={selected}
      onChange={(checked) => setSelected(checked)}
      label="No price provided"
      description="This card has no price information"
    />
  );
};

export const OnlyLabel = () => {
  const [selected, setSelected] = useState(false);

  return (
    <BpkCheckboxCard
      checked={selected}
      onChange={(checked) => setSelected(checked)}
      label="Minimal content"
    />
  );
};

export const DisabledAndSelected = () => {
  return (
    <BpkCheckboxCard
      checked={true}
      onChange={() => {}}
      label="Disabled but selected"
      description="This card is selected but cannot be interacted with"
      price="£100"
      disabled={true}
    />
  );
};

export const SmallContainer = () => {
  const [selected, setSelected] = useState(false);

  return (
    <div style={{ width: '200px' }}>
      <BpkCheckboxCard
        checked={selected}
        onChange={(checked) => setSelected(checked)}
        label="Narrow container"
        description="This card is in a small container"
        price="£100"
      />
    </div>
  );
};

export const VeryLargePrice = () => {
  const [selected, setSelected] = useState(false);

  return (
    <BpkCheckboxCard
      checked={selected}
      onChange={(checked) => setSelected(checked)}
      label="Expensive option"
      description="This has a very large price"
      price="£99,999,999"
    />
  );
};
