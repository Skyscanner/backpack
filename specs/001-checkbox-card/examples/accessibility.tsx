// Accessibility examples for BpkCheckboxCard
import { useState } from 'react';
import BpkCheckboxCard from '../BpkCheckboxCard';
import { LandmarkIconSm } from '@skyscanner/backpack-web/bpk-component-icon';

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
        <BpkCheckboxCard
          checked={selected1}
          onChange={(checked) => setSelected1(checked)}
          label="First card"
          description="Tab to focus, Space/Enter to select"
          price="£100"
        />
        <BpkCheckboxCard
          checked={selected2}
          onChange={(checked) => setSelected2(checked)}
          label="Second card"
          description="Tab to focus, Space/Enter to select"
          price="£85"
        />
        <BpkCheckboxCard
          checked={selected3}
          onChange={(checked) => setSelected3(checked)}
          label="Third card"
          description="Tab to focus, Space/Enter to select"
          price="£122"
        />
      </div>
    </div>
  );
};

export const ScreenReaderSupport = () => {
  const [selected, setSelected] = useState(false);

  return (
    <div>
      <p style={{ marginBottom: '16px' }}>
        This example demonstrates proper ARIA attributes for screen readers
      </p>
      <BpkCheckboxCard
        checked={selected}
        onChange={(checked) => setSelected(checked)}
        label="Accessible checkbox card"
        description="This card announces its label, state, and price to screen readers"
        price="£100"
        ariaLabel="Select accommodation option for £100 per night"
      />
    </div>
  );
};

export const WithoutVisibleLabel = () => {
  const [selected, setSelected] = useState(false);

  return (
    <div>
      <p style={{ marginBottom: '16px' }}>
        Card with icon and price but no visible label - uses ariaLabel for accessibility
      </p>
      <BpkCheckboxCard
        checked={selected}
        onChange={(checked) => setSelected(checked)}
        icon={<LandmarkIconSm />}
        price="£100"
        ariaLabel="Select city centre location for £100 per night"
      />
    </div>
  );
};

export const DisabledAccessibility = () => {
  return (
    <div>
      <p style={{ marginBottom: '16px' }}>
        Disabled cards are properly announced and skipped in tab order
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <BpkCheckboxCard
          checked={false}
          onChange={() => {}}
          label="Enabled card"
          description="Can be focused with Tab"
          price="£100"
        />
        <BpkCheckboxCard
          checked={false}
          onChange={() => {}}
          label="Disabled card"
          description="Skipped in tab order"
          price="£100"
          disabled={true}
        />
        <BpkCheckboxCard
          checked={false}
          onChange={() => {}}
          label="Another enabled card"
          description="Tab from first card goes directly here"
          price="£100"
        />
      </div>
    </div>
  );
};

export const FormIntegration = () => {
  const [selected, setSelected] = useState<string[]>([]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const entries = Object.fromEntries(formData.entries());
    alert(`Form submitted: ${JSON.stringify(entries, null, 2)}`);
  };

  const handleChange = (id: string) => {
    setSelected((prev) =>
      prev.includes(id)
        ? prev.filter((x) => x !== id)
        : [...prev, id]
    );
  };

  return (
    <form onSubmit={handleSubmit}>
      <p style={{ marginBottom: '16px' }}>
        Checkbox cards work in native HTML forms
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '16px' }}>
        <BpkCheckboxCard
          name="accommodation"
          value="option1"
          checked={selected.includes('option1')}
          onChange={() => handleChange('option1')}
          label="Option 1"
          price="£100"
        />
        <BpkCheckboxCard
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
