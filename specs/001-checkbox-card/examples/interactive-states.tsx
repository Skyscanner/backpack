// Interactive state examples for BpkCheckboxCard
import { useState } from 'react';
import BpkCheckboxCard from '../BpkCheckboxCard';

export const AllInteractiveStates = () => {
  const [selected1, setSelected1] = useState(false);
  const [selected2, setSelected2] = useState(true);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <BpkCheckboxCard
        checked={selected1}
        onChange={(checked) => setSelected1(checked)}
        label="Default (unselected)"
        description="Click to select"
        price="£100"
      />
      <BpkCheckboxCard
        checked={selected2}
        onChange={(checked) => setSelected2(checked)}
        label="Selected"
        description="Click to unselect"
        price="£100"
      />
      <BpkCheckboxCard
        checked={false}
        onChange={() => {}}
        label="Disabled (unselected)"
        description="Cannot interact"
        price="£100"
        disabled={true}
      />
      <BpkCheckboxCard
        checked={true}
        onChange={() => {}}
        label="Disabled (selected)"
        description="Cannot interact"
        price="£100"
        disabled={true}
      />
    </div>
  );
};

export const SingleSelection = () => {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const options = [
    { id: 'opt1', label: 'Option 1', price: '£100' },
    { id: 'opt2', label: 'Option 2', price: '£85' },
    { id: 'opt3', label: 'Option 3', price: '£122' },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {options.map((opt) => (
        <BpkCheckboxCard
          key={opt.id}
          name="hotel-option"
          value={opt.id}
          checked={selectedId === opt.id}
          onChange={() => setSelectedId(opt.id)}
          label={opt.label}
          description="Single selection pattern"
          price={opt.price}
        />
      ))}
    </div>
  );
};

export const MultiSelection = () => {
  const [selected, setSelected] = useState<string[]>([]);

  const handleChange = (id: string) => {
    setSelected((prev) =>
      prev.includes(id)
        ? prev.filter((x) => x !== id)
        : [...prev, id]
    );
  };

  const options = [
    { id: 'opt1', label: 'Option 1', price: '£100' },
    { id: 'opt2', label: 'Option 2', price: '£85' },
    { id: 'opt3', label: 'Option 3', price: '£122' },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {options.map((opt) => (
        <BpkCheckboxCard
          key={opt.id}
          name={`option-${opt.id}`}
          value={opt.id}
          checked={selected.includes(opt.id)}
          onChange={() => handleChange(opt.id)}
          label={opt.label}
          description="Multi-selection pattern"
          price={opt.price}
        />
      ))}
      <p>Selected: {selected.join(', ') || 'None'}</p>
    </div>
  );
};

export const HoverAndFocus = () => {
  const [selected, setSelected] = useState(false);

  return (
    <div style={{ padding: '32px' }}>
      <p style={{ marginBottom: '16px' }}>
        Hover over the card or use Tab key to focus it
      </p>
      <BpkCheckboxCard
        checked={selected}
        onChange={(checked) => setSelected(checked)}
        label="Interactive states"
        description="Hover to see elevation change, Tab to see focus indicator"
        price="£100"
      />
    </div>
  );
};
