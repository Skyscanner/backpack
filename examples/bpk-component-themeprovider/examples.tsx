import { useState } from 'react';

import { BpkButtonV2, BUTTON_TYPES } from '../../packages/bpk-component-button';
import { BpkDropdownChip } from '../../packages/bpk-component-chip';
import BpkText from '../../packages/bpk-component-text';
// @ts-expect-error Untyped import. See `decisions/imports-ts-suppressions.md`.
import BpkThemeProvider from '../../packages/bpk-theming';
import BpkCheckbox from '../../packages/bpk-component-checkbox';

const customTheme = {
  'button-border-radius': '999px',
  'button-secondary-background-color': '#E3F0FF',
  'button-secondary-text-color': '#0062E3',
  'button-secondary-hover-background-color': '#B4D7FF',
  'button-secondary-active-background-color': '#B4D7FF',
  'button-secondary-hover-text-color': '#0062E3',
  'button-secondary-active-text-color': '#0062E3',
  'button-destructive-background-color': '#EFF3F8',
  'button-destructive-text-color': '#C80456',
  'button-destructive-hover-background-color': '#C80456',
  'button-destructive-active-background-color': '#C80456',

  // Chip
  'chip-default-background-color': '#fff',
  'chip-border-radius': '999px',
  'chip-default-border-color': 'none',
  'chip-default-hover-border-color': '0 0 0 1px #0062E3 inset',
  'chip-default-selected-background-color': '#0062E3',

  // Checkbox
  'checkbox-checked-color': '#05203C'
};

const DefaultExample = () => {
  const [selected, setSelected] = useState(false);
  const toggleSelected = () => setSelected(!selected);

  const example = (
    <>
      <div style={{ display: 'flex', gap: '.5rem', marginBottom: '1rem' }}>
        <BpkButtonV2>Primary</BpkButtonV2>
        <BpkButtonV2 type={BUTTON_TYPES.secondary}>Secondary</BpkButtonV2>
        <BpkButtonV2 type={BUTTON_TYPES.featured}>Featured</BpkButtonV2>
        <BpkButtonV2 type={BUTTON_TYPES.destructive}>Destructive</BpkButtonV2>
      </div>

      <div style={{ display: 'flex', gap: '.5rem', marginBottom: '1rem' }}>
        <BpkDropdownChip
          accessibilityLabel="Toggle chip"
          selected={selected}
          onClick={toggleSelected}>London</BpkDropdownChip>
        <BpkDropdownChip
          accessibilityLabel="Toggle chip"
          selected={!selected}
          onClick={toggleSelected}>Barcelona</BpkDropdownChip>
      </div>

      <div style={{ display: 'flex', gap: '.5rem', marginBottom: '1rem' }}>
        <BpkCheckbox label="Accept terms and conditions" name="checkbox" id="checkbox" checked={selected} />
        <BpkCheckbox label="Accept terms and conditions" name="checkbox" id="checkbox" checked={!selected} />
      </div>
    </>
  );

  return (
    <>
      <div style={{ marginBottom: '2rem' }}>
        <BpkText>Default</BpkText>
        {example}
      </div>

      <BpkThemeProvider theme={customTheme}
                        themeAttributes={Object.keys(customTheme)}>
        <BpkText>Themed</BpkText>
        {example}
      </BpkThemeProvider>
    </>);
};


export default DefaultExample;
