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
