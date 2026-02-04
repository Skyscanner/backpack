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

import BpkInputV2 from '../../packages/bpk-component-input/src/BpkInputV2';
import { cssModules } from '../../packages/bpk-react-utils';


import STYLES from './examples.module.scss';

const getClassName = cssModules(STYLES);
const BpkInput = BpkInputV2;

export const DefaultExample = () => {
  const [value, setValue] = useState('');

  return (
    <BpkInput.Root>
      <BpkInput.Input
        id="default"
        name="default"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Enter text"
      />
    </BpkInput.Root>
  );
};

export const WithStartAdornmentExample = () => {
  const [value, setValue] = useState('100');

  return (
    <BpkInput.Root  >
      <BpkInput.InputAdornment>$</BpkInput.InputAdornment>
      <BpkInput.Input
        id="price"
        name="price"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        type="number"
      />
    </BpkInput.Root>
  );
};

export const WithEndAdornmentExample = () => {
  const [value, setValue] = useState('75');

  return (
    <BpkInput.Root  >
      <BpkInput.Input
        id="weight"
        name="weight"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        type="number"
      />
      <BpkInput.InputAdornment>kg</BpkInput.InputAdornment>
    </BpkInput.Root>
  );
};

export const WithBothAdornmentsExample = () => {
  const [value, setValue] = useState('100');

  return (
    <BpkInput.Root>
      <BpkInput.InputAdornment>$</BpkInput.InputAdornment>
      <BpkInput.Input
        id="amount"
        name="amount"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        type="number"
      />
      <BpkInput.InputAdornment>USD</BpkInput.InputAdornment>
    </BpkInput.Root>
  );
};

export const ValidStateExample = () => {
  const [value, setValue] = useState('user@example.com');

  return (
    <BpkInput.Root>
      <BpkInput.Input
        id="email"
        name="email"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        type="email"
        valid
      />
    </BpkInput.Root>
  );
};

export const InvalidStateExample = () => {
  const [value, setValue] = useState('invalid');

  return (
    <BpkInput.Root>
      <BpkInput.Input
        id="email"
        name="email"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        type="email"
        valid={false}
      />
    </BpkInput.Root>
  );
};

export const DockedInputGroupExample = () => {
  const [from, setFrom] = useState('Edinburgh');
  const [to, setTo] = useState('London');

  return (
    <BpkInput.Root>
      <BpkInput.Input
        id="from"
        name="from"
        value={from}
        onChange={(e) => setFrom(e.target.value)}
        placeholder="From"
      />
      <BpkInput.Input
        id="to"
        name="to"
        value={to}
        onChange={(e) => setTo(e.target.value)}
        placeholder="To"
      />
    </BpkInput.Root>
  );
};

export const DockedInputGroupThreeExample = () => {
  const [departure, setDeparture] = useState('Edinburgh');
  const [layover, setLayover] = useState('Amsterdam');
  const [arrival, setArrival] = useState('Tokyo');

  return (
    <BpkInput.Root>
      <BpkInput.Input
        id="departure"
        name="departure"
        value={departure}
        onChange={(e) => setDeparture(e.target.value)}
        placeholder="Departure"
        className={getClassName('bpk-input-v2-examples__input--equal-width')}
      />
      <BpkInput.Input
        id="layover"
        name="layover"
        value={layover}
        onChange={(e) => setLayover(e.target.value)}
        placeholder="Layover"
        className={getClassName('bpk-input-v2-examples__input--equal-width')}
      />
      <BpkInput.Input
        id="arrival"
        name="arrival"
        value={arrival}
        onChange={(e) => setArrival(e.target.value)}
        placeholder="Arrival"
        className={getClassName('bpk-input-v2-examples__input--equal-width')}
      />
    </BpkInput.Root>
  );
};

export const DockedInputGroupWithAdornmentsExample = () => {
  const [from, setFrom] = useState('Edinburgh');
  const [to, setTo] = useState('London');

  return (
    <BpkInput.Root>
      <BpkInput.InputAdornment>✈️</BpkInput.InputAdornment>
      <BpkInput.Input
        id="from-adorned"
        name="from-adorned"
        value={from}
        onChange={(e) => setFrom(e.target.value)}
        placeholder="From"
      />
      <BpkInput.InputAdornment>🛬</BpkInput.InputAdornment>
      <BpkInput.Input
        id="to-adorned"
        name="to-adorned"
        value={to}
        onChange={(e) => setTo(e.target.value)}
        placeholder="To"
      />
    </BpkInput.Root>
  );
};

export const LargeVariantExample = () => {
  const [value, setValue] = useState('100');

  return (
    <BpkInput.Root   large>
      <BpkInput.InputAdornment>$</BpkInput.InputAdornment>
      <BpkInput.Input
        id="price-large"
        name="price-large"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        type="number"
      />
      <BpkInput.InputAdornment>USD</BpkInput.InputAdornment>
    </BpkInput.Root>
  );
};

export const CustomGapExample = () => {
  const [value, setValue] = useState('user@example.com');

  return (
    <BpkInput.Root gap="1rem">
      <BpkInput.InputAdornment>📧</BpkInput.InputAdornment>
      <BpkInput.Input
        id="email-gap"
        name="email-gap"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        type="email"
      />
    </BpkInput.Root>
  );
};

export const DisabledStateExample = () => (
  <BpkInput.Root>
    <BpkInput.InputAdornment>$</BpkInput.InputAdornment>
    <BpkInput.Input id="price-disabled" name="price-disabled" value="100" disabled />
  </BpkInput.Root>
);

export const RTLModeExample = () => {
  const [value, setValue] = useState('100');

  return (
    <div dir="rtl">
      <BpkInput.Root  >
        <BpkInput.InputAdornment>$</BpkInput.InputAdornment>
        <BpkInput.Input
          id="price-rtl"
          name="price-rtl"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          type="number"
        />
        <BpkInput.InputAdornment>USD</BpkInput.InputAdornment>
      </BpkInput.Root>
    </div>
  );
};

export const MultipleEndAdornmentsExample = () => {
  const [value, setValue] = useState('100');

  return (
    <BpkInput.Root  >
      <BpkInput.Input
        id="multi-end"
        name="multi-end"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        type="number"
      />
      <BpkInput.InputAdornment>kg</BpkInput.InputAdornment>
      <BpkInput.InputAdornment>📦</BpkInput.InputAdornment>
    </BpkInput.Root>
  );
};

export const ZeroGapExample = () => {
  const [value, setValue] = useState('compact');

  return (
    <BpkInput.Root gap="0">
      <BpkInput.InputAdornment>→</BpkInput.InputAdornment>
      <BpkInput.Input
        id="zero-gap"
        name="zero-gap"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <BpkInput.InputAdornment>←</BpkInput.InputAdornment>
    </BpkInput.Root>
  );
};

export const GapComparisonExample = () => {
  const [value, setValue] = useState('compare');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <BpkInput.Root gap="0.25rem">
        <BpkInput.InputAdornment>📌</BpkInput.InputAdornment>
        <BpkInput.Input
          id="gap-small"
          name="gap-small"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="gap: 0.25rem"
        />
      </BpkInput.Root>
      <BpkInput.Root  >
        <BpkInput.InputAdornment>📌</BpkInput.InputAdornment>
        <BpkInput.Input
          id="gap-medium"
          name="gap-medium"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="gap: 0.5rem (default)"
        />
      </BpkInput.Root>
      <BpkInput.Root gap="1rem">
        <BpkInput.InputAdornment>📌</BpkInput.InputAdornment>
        <BpkInput.Input
          id="gap-large"
          name="gap-large"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="gap: 1rem"
        />
      </BpkInput.Root>
    </div>
  );
};

export const ValidStateWithStartAdornmentExample = () => {
  const [value, setValue] = useState('100');

  return (
    <BpkInput.Root>
      <BpkInput.InputAdornment>$</BpkInput.InputAdornment>
      <BpkInput.Input
        id="price-valid"
        name="price-valid"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        type="number"
        valid
      />
    </BpkInput.Root>
  );
};

export const InvalidStateWithEndAdornmentExample = () => {
  const [value, setValue] = useState('invalid');

  return (
    <BpkInput.Root>
      <BpkInput.Input
        id="email-invalid"
        name="email-invalid"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        type="email"
        valid={false}
      />
      <BpkInput.InputAdornment>@</BpkInput.InputAdornment>
    </BpkInput.Root>
  );
};

export const ValidStateWithBothAdornmentsExample = () => {
  const [value, setValue] = useState('100.00');

  return (
    <BpkInput.Root>
      <BpkInput.InputAdornment>$</BpkInput.InputAdornment>
      <BpkInput.Input
        id="amount-valid"
        name="amount-valid"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        type="number"
        valid
      />
      <BpkInput.InputAdornment>USD</BpkInput.InputAdornment>
    </BpkInput.Root>
  );
};

export const ClearableAlwaysExample = () => {
  const [value, setValue] = useState('Clearable text');

  return (
    <BpkInput.Root>
      <BpkInput.Input
        id="clearable-always"
        name="clearable-always"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        clearButtonMode="always"
        clearButtonLabel="Clear input"
        onClear={() => setValue('')}
        placeholder="Always shows clear button when there's text"
      />
    </BpkInput.Root>
  );
};

export const ClearableWhileEditingExample = () => {
  const [value, setValue] = useState('Focus to see clear button');

  return (
    <BpkInput.Root>
      <BpkInput.Input
        id="clearable-while-editing"
        name="clearable-while-editing"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        clearButtonMode="whileEditing"
        clearButtonLabel="Clear input"
        onClear={() => setValue('')}
        placeholder="Clear button shows on focus"
      />
    </BpkInput.Root>
  );
};

export const ClearableWithValidationExample = () => {
  const [value, setValue] = useState('valid@example.com');

  return (
    <BpkInput.Root>
      <BpkInput.Input
        id="clearable-valid"
        name="clearable-valid"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        type="email"
        valid
        clearButtonMode="always"
        clearButtonLabel="Clear email"
        onClear={() => setValue('')}
        placeholder="Clear button has priority over validation icon"
      />
    </BpkInput.Root>
  );
};

export const ValidationIconWithoutClearableExample = () => {
  const [value, setValue] = useState('valid@example.com');

  return (
    <BpkInput.Root>
      <BpkInput.Input
        id="valid-no-clear"
        name="valid-no-clear"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        type="email"
        valid
        clearButtonMode="never"
        placeholder="Validation icon shows when no clear button"
      />
    </BpkInput.Root>
  );
};

export const ClearableWithAdornmentsExample = () => {
  const [value, setValue] = useState('100');

  return (
    <BpkInput.Root>
      <BpkInput.InputAdornment>$</BpkInput.InputAdornment>
      <BpkInput.Input
        id="clearable-with-adornments"
        name="clearable-with-adornments"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        type="number"
        clearButtonMode="always"
        clearButtonLabel="Clear amount"
        onClear={() => setValue('')}
      />
      <BpkInput.InputAdornment>USD</BpkInput.InputAdornment>
    </BpkInput.Root>
  );
};

export const ClearableWithAllFeaturesExample = () => {
  const [value, setValue] = useState('test@example.com');

  return (
    <BpkInput.Root>
      <BpkInput.InputAdornment>📧</BpkInput.InputAdornment>
      <BpkInput.Input
        id="clearable-all-features"
        name="clearable-all-features"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        type="email"
        valid
        clearButtonMode="always"
        clearButtonLabel="Clear email"
        onClear={() => setValue('')}
        placeholder="All features combined"
      />
    </BpkInput.Root>
  );
};
