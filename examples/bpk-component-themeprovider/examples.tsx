import { useState } from 'react';

import { BpkButtonV2 } from '../../packages/bpk-component-button';
import { BpkDropdownChip } from '../../packages/bpk-component-chip';
// @ts-expect-error Untyped import. See `decisions/imports-ts-suppressions.md`.
import BpkThemeProvider from '../../packages/bpk-theming';

const customTheme = {
  'button-corner-radius': '999px',
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
  'chip-corner-radius': '999px',
  'chip-default-border-color': 'none',
  'chip-default-hover-border-color': '0 0 0 1px #0062E3 inset',
  'chip-default-selected-background-color': '#0062E3',
};


const DefaultExample = () => {
  const [selected, setSelected] = useState(false);
  const toggleSelected = () => setSelected(!selected);

  return (<>
    <div style={{ display: 'flex', gap: '.5rem', marginBottom: '1rem' }}>
      <BpkButtonV2>Primary</BpkButtonV2>
      <BpkButtonV2 type="secondary">Secondary</BpkButtonV2>
      <BpkButtonV2 type="destructive">Destructive</BpkButtonV2>
    </div>
    <BpkThemeProvider theme={customTheme}
                      themeAttributes={Object.keys(customTheme)}>
      <div style={{ display: 'flex', gap: '.5rem', marginBottom: '1rem' }}>
        <BpkButtonV2>Primary</BpkButtonV2>
        <BpkButtonV2 type="secondary">Secondary</BpkButtonV2>
        <BpkButtonV2 type="destructive">Destructive</BpkButtonV2>
      </div>
    </BpkThemeProvider>


    {/* eslint-disable-next-line backpack/use-tokens */}
    <div style={{ display: 'flex', gap: '.5rem', padding: '.5rem', backgroundColor: '#EFF3F8' }}>
      <BpkDropdownChip
        accessibilityLabel="Toggle chip"
        selected={selected}
        onClick={toggleSelected}>London</BpkDropdownChip>
      <BpkDropdownChip
        accessibilityLabel="Toggle chip"
        selected={!selected}
        onClick={toggleSelected}>Barcelona</BpkDropdownChip>
    </div>

    <BpkThemeProvider theme={customTheme}
                      themeAttributes={Object.keys(customTheme)}>
      {/* eslint-disable-next-line backpack/use-tokens */}
      <div style={{ display: 'flex', gap: '.5rem', padding: '.5rem', backgroundColor: '#EFF3F8' }}>
        <BpkDropdownChip
          accessibilityLabel="Toggle chip"
          selected={selected}
          onClick={toggleSelected}>London</BpkDropdownChip>

        <BpkDropdownChip
          accessibilityLabel="Toggle chip"
          selected={!selected}
          onClick={toggleSelected}>Barcelona</BpkDropdownChip>
      </div>
    </BpkThemeProvider>
  </>);
};


export {
  DefaultExample,
};
