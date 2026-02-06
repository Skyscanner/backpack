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

import LandmarkIconLg from '../../packages/bpk-component-icon/lg/landmark';
import BpkThemeProvider from '../../packages/bpk-theming';

import { BpkCheckboxCard, CHECKBOX_CARD_THEME_ATTRIBUTES } from '../../packages/bpk-component-checkbox-card';
import { CHECKBOX_CARD_VARIANTS, CHECKBOX_CARD_RADIUS } from '../../packages/bpk-component-checkbox-card/src/BpkCheckboxCard/common-types';

/**
 * New Compound Component API - Basic Example
 */
export const NewAPIBasicExample = () => {
  const [selected1, setSelected1] = useState(false);
  const [selected2, setSelected2] = useState(true);

  return (
    <div style={{ padding: '24px', display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
      <BpkCheckboxCard.Root
        checked={selected1}
        onCheckedChange={setSelected1}
        variant={CHECKBOX_CARD_VARIANTS.onCanvasDefault}
        width={150}
        height={150}
      >
        <BpkCheckboxCard.Control />
        <BpkCheckboxCard.Content>
          {/* Empty content - no icon, label, or price */}
        </BpkCheckboxCard.Content>
      </BpkCheckboxCard.Root>

      <BpkCheckboxCard.Root
        checked={selected2}
        onCheckedChange={setSelected2}
        variant={CHECKBOX_CARD_VARIANTS.onCanvasDefault}
        radius={CHECKBOX_CARD_RADIUS.square}
        width={150}
        height={150}
      >
        <BpkCheckboxCard.Control />
        <BpkCheckboxCard.Content>
          {/* Empty content - no icon, label, or price */}
        </BpkCheckboxCard.Content>
      </BpkCheckboxCard.Root>
    </div>
  );
};

/**
 * New Compound Component API - With Multi Content
 */
export const NewAPIWithMultiContentExample = () => {
  const [selected, setSelected] = useState(false);

  return (
    <div style={{ padding: '24px', display: 'flex', gap: '16px' }}>
      <BpkCheckboxCard.Root
        checked={selected}
        onCheckedChange={setSelected}
        variant={CHECKBOX_CARD_VARIANTS.onCanvasDefault}
        width={150}
      >
        <BpkCheckboxCard.Control />
        <BpkCheckboxCard.Content>
          <BpkCheckboxCard.Stack gap="md" align="center">
            <BpkCheckboxCard.Icon icon={LandmarkIconLg} size="lg" />
            <BpkCheckboxCard.Stack gap="sm" align="center">
              <BpkCheckboxCard.Label>City Centre</BpkCheckboxCard.Label>
              <BpkCheckboxCard.Description>
                Central location with easy access to attractions
              </BpkCheckboxCard.Description>
            </BpkCheckboxCard.Stack>
            <BpkCheckboxCard.Price price="£85" />
          </BpkCheckboxCard.Stack>
        </BpkCheckboxCard.Content>
      </BpkCheckboxCard.Root>
    </div>
  );
};

/**
 * New Compound Component API - All Variants
 */
export const NewAPIAllVariantsExample = () => {
  const [selected1, setSelected1] = useState(false);
  const [selected2, setSelected2] = useState(false);
  const [selected3, setSelected3] = useState(false);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', padding: '24px' }}>
      {/* onCanvasDefault */}
      <div>
        <h4 style={{ marginBottom: '12px' }}>On Canvas Default</h4>
        <BpkCheckboxCard.Root
          checked={selected1}
          onCheckedChange={setSelected1}
          variant={CHECKBOX_CARD_VARIANTS.onCanvasDefault}
          width={150}
          height={150}
        >
          <BpkCheckboxCard.Control />
          <BpkCheckboxCard.Content>
            {/* Empty content - no icon, label, or price */}
          </BpkCheckboxCard.Content>
        </BpkCheckboxCard.Root>
      </div>

      {/* onCanvasContrast */}
      <div>
        <h4 style={{ marginBottom: '12px' }}>On Canvas Contrast</h4>
        <BpkCheckboxCard.Root
          checked={selected2}
          onCheckedChange={setSelected2}
          variant={CHECKBOX_CARD_VARIANTS.onCanvasContrast}
          width={150}
          height={150}
        >
          <BpkCheckboxCard.Control />
          <BpkCheckboxCard.Content>
            {/* Empty content - no icon, label, or price */}
          </BpkCheckboxCard.Content>
        </BpkCheckboxCard.Root>
      </div>

      {/* onSurfaceContrast */}
      <div>
        <h4 style={{ marginBottom: '12px' }}>On Surface Contrast (Dark)</h4>
        <div style={{ background: '#05203C', padding: '24px' }}>
          <BpkCheckboxCard.Root
            checked={selected3}
            onCheckedChange={setSelected3}
            variant={CHECKBOX_CARD_VARIANTS.onSurfaceContrast}
            width={150}
            height={150}
          >
            <BpkCheckboxCard.Control />
            <BpkCheckboxCard.Content>
              {/* Empty content - no icon, label, or price */}
            </BpkCheckboxCard.Content>
          </BpkCheckboxCard.Root>
        </div>
      </div>
    </div>
  );
};

/**
 * New Compound Component API - With Image
 */
export const NewAPIWithImageExample = () => {
  const [selected, setSelected] = useState(false);

  return (
    <div style={{ padding: '24px' }}>
      <BpkCheckboxCard.Root
        checked={selected}
        onCheckedChange={setSelected}
        variant={CHECKBOX_CARD_VARIANTS.onCanvasDefault}
      >
        <BpkCheckboxCard.Control />
        <BpkCheckboxCard.Content>
          <BpkCheckboxCard.Stack gap="md" align="center">
            <BpkCheckboxCard.Image
              src="https://content.skyscnr.com/m/c9a57fbf76030f2/original/March-25-B2-IT-Spiagge-Liguria_1B_1.jpg"
              alt="Car"
              height={80}
              aspectRatio={16/9}
            />
            <BpkCheckboxCard.Label>Economy</BpkCheckboxCard.Label>
            <BpkCheckboxCard.Price price="£74" leadingText="from" />
          </BpkCheckboxCard.Stack>
        </BpkCheckboxCard.Content>
      </BpkCheckboxCard.Root>
    </div>
  );
};

/**
 * New Compound Component API - With Inline Layout
 */
export const NewAPIWithInlineLayoutExample = () => {
  const [selected, setSelected] = useState(false);

  return (
    <div style={{ padding: '24px' }}>
      <BpkCheckboxCard.Root
        checked={selected}
        onCheckedChange={setSelected}
        variant={CHECKBOX_CARD_VARIANTS.onCanvasDefault}
      >
        <BpkCheckboxCard.Control />
        <BpkCheckboxCard.Content>
          <BpkCheckboxCard.Inline gap="sm" align="center">
            <BpkCheckboxCard.Icon icon={LandmarkIconLg} size="lg" />
            <BpkCheckboxCard.Label>City Centre</BpkCheckboxCard.Label>
          </BpkCheckboxCard.Inline>
        </BpkCheckboxCard.Content>
      </BpkCheckboxCard.Root>
    </div>
  );
};

/**
 * New Compound Component API - With Custom Theme
 */
export const NewAPIWithCustomThemeExample = () => {
  const [selected1, setSelected1] = useState(false);
  const [selected2, setSelected2] = useState(true);

  // Custom theme with brand colors
  const customTheme = {
    checkboxCardBgDefault: '#FFFFFF',
    checkboxCardFgDefault: '#111236',
    checkboxCardFgSecondary: '#68697F',
    checkboxCardBgHover: '#F1F2F8',
    checkboxCardBorderDefault: '#B2B2BF',
    checkboxCardBorderHover: '#68697F',
    checkboxCardBgChecked: '#FF6B35',
    checkboxCardFgChecked: '#FFFFFF',
    checkboxCardBorderChecked: 'transparent',
    checkboxCardBgDisabled: '#F1F2F8',
    checkboxCardFgDisabled: '#B2B2BF',
  };

  return (
    <div style={{ padding: '24px' }}>
      <BpkThemeProvider theme={customTheme} themeAttributes={CHECKBOX_CARD_THEME_ATTRIBUTES}>
        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
          <BpkCheckboxCard.Root
            checked={selected1}
            onCheckedChange={setSelected1}
            variant={CHECKBOX_CARD_VARIANTS.onCanvasDefault}
          >
            <BpkCheckboxCard.Control />
            <BpkCheckboxCard.Content>
              <BpkCheckboxCard.Stack gap="md" align="center">
                <BpkCheckboxCard.Icon icon={LandmarkIconLg} size="lg" />
                <BpkCheckboxCard.Label>City Centre</BpkCheckboxCard.Label>
                <BpkCheckboxCard.Price price="£85" />
              </BpkCheckboxCard.Stack>
            </BpkCheckboxCard.Content>
          </BpkCheckboxCard.Root>

          <BpkCheckboxCard.Root
            checked={selected2}
            onCheckedChange={setSelected2}
            variant={CHECKBOX_CARD_VARIANTS.onCanvasDefault}
          >
            <BpkCheckboxCard.Control />
            <BpkCheckboxCard.Content>
              <BpkCheckboxCard.Stack gap="md" align="center">
                <BpkCheckboxCard.Icon icon={LandmarkIconLg} size="lg" />
                <BpkCheckboxCard.Label>Waterfront</BpkCheckboxCard.Label>
                <BpkCheckboxCard.Price price="£95" />
              </BpkCheckboxCard.Stack>
            </BpkCheckboxCard.Content>
          </BpkCheckboxCard.Root>
        </div>
      </BpkThemeProvider>
    </div>
  );
};
