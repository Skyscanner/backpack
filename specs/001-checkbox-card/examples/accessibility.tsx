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

// Accessibility examples for BpkCheckboxCard
import { useState } from 'react';

import { BpkCheckboxCard, BpkCheckboxCardSimple } from '../../../packages/bpk-component-checkbox-card';

export const KeyboardNavigation = () => {
  const [selected1, setSelected1] = useState(false);
  const [selected2, setSelected2] = useState(false);
  const [selected3, setSelected3] = useState(false);

  return (
    <div>
      <p style={{ marginBottom: '16px' }}>
        Use Tab to navigate between cards, Space or Enter to toggle selection
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <BpkCheckboxCardSimple
          checked={selected1}
          onChange={setSelected1}
          label="First card"
          description="Tab to focus, Space/Enter to select"
          price="£100"
        />
        <BpkCheckboxCardSimple
          checked={selected2}
          onChange={setSelected2}
          label="Second card"
          description="Tab to focus, Space/Enter to select"
          price="£85"
        />
        <BpkCheckboxCardSimple
          checked={selected3}
          onChange={setSelected3}
          label="Third card"
          description="Tab to focus, Space/Enter to select"
          price="£122"
        />
      </div>
    </div>
  );
};

export const WithAriaLabel = () => {
  const [selected, setSelected] = useState(false);

  return (
    <div>
      <p style={{ marginBottom: '16px' }}>
        Card with no visible label — uses aria-label for screen readers
      </p>
      <BpkCheckboxCard.Root
        checked={selected}
        onCheckedChange={setSelected}
        aria-label="Select city centre location for £100 per night"
      >
        <BpkCheckboxCard.Control />
        <BpkCheckboxCard.Content>
          <BpkCheckboxCard.Price price="£100" />
        </BpkCheckboxCard.Content>
      </BpkCheckboxCard.Root>
    </div>
  );
};

export const DisabledAccessibility = () => (
  <div>
    <p style={{ marginBottom: '16px' }}>
      Disabled cards are announced and skipped in tab order
    </p>
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <BpkCheckboxCardSimple
        checked={false}
        onChange={() => {}}
        label="Enabled card"
        description="Can be focused with Tab"
        price="£100"
      />
      <BpkCheckboxCardSimple
        checked={false}
        onChange={() => {}}
        label="Disabled card"
        description="Skipped in tab order"
        price="£100"
        disabled
      />
      <BpkCheckboxCardSimple
        checked={false}
        onChange={() => {}}
        label="Another enabled card"
        description="Tab from first card goes directly here"
        price="£100"
      />
    </div>
  </div>
);

export const FormIntegration = () => {
  const [selected, setSelected] = useState<string[]>([]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    alert(`Form submitted: ${JSON.stringify(Object.fromEntries(formData.entries()), null, 2)}`);
  };

  const handleChange = (id: string) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );
  };

  return (
    <form onSubmit={handleSubmit}>
      <p style={{ marginBottom: '16px' }}>Checkbox cards work in native HTML forms</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '16px' }}>
        <BpkCheckboxCardSimple
          name="accommodation"
          value="option1"
          checked={selected.includes('option1')}
          onChange={() => handleChange('option1')}
          label="Option 1"
          price="£100"
        />
        <BpkCheckboxCardSimple
          name="accommodation"
          value="option2"
          checked={selected.includes('option2')}
          onChange={() => handleChange('option2')}
          label="Option 2"
          price="£85"
        />
      </div>
      <button type="submit">Submit Form</button>
    </form>
  );
};
