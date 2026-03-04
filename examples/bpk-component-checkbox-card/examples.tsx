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

import { statusSuccessSpotDay } from '@skyscanner/bpk-foundations-web/tokens/base.es6';

import { BpkCheckboxCard, BpkCheckboxCardSimple, CHECKBOX_CARD_THEME_ATTRIBUTES, CHECKBOX_CARD_VARIANTS, CHECKBOX_CARD_RADIUS, CHECKBOX_CARD_SIZES, createCheckboxCardTheme } from '../../packages/bpk-component-checkbox-card';
import AirportsIconLg from '../../packages/bpk-component-icon/lg/airports';
import CityIconLg from '../../packages/bpk-component-icon/lg/city';
import LandmarkIconLg from '../../packages/bpk-component-icon/lg/landmark';
import TrendDownIconLg from '../../packages/bpk-component-icon/lg/trend--down';
import BpkImage from '../../packages/bpk-component-image';
import { BpkVStack, BpkHStack } from '../../packages/bpk-component-layout';
// @ts-expect-error Untyped import. See `decisions/imports-ts-suppressions.md`.
import BpkPrice from '../../packages/bpk-component-price';
// @ts-expect-error Untyped import. See `decisions/imports-ts-suppressions.md`.
import BpkThemeProvider from '../../packages/bpk-theming';

/**
 * New Compound Component API - Basic Example
 *
 * @returns {JSX.Element} Rendered basic compound API example.
 */
export const BasicExample = () => {
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
 *
 * @returns {JSX.Element} Rendered compound API example with multiple content slots.
 */
export const WithMultiContentExample = () => {
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
          <BpkVStack gap="bpk-spacing-md" align="center" width="100%">
            <LandmarkIconLg />
            <BpkVStack gap="bpk-spacing-sm" align="center" width="100%">
              <BpkCheckboxCard.Label>City Centre</BpkCheckboxCard.Label>
              <BpkCheckboxCard.Description>
                Central location with easy access to attractions
              </BpkCheckboxCard.Description>
            </BpkVStack>
            <BpkPrice price="£85" />
          </BpkVStack>
        </BpkCheckboxCard.Content>
      </BpkCheckboxCard.Root>
    </div>
  );
};

/**
 * New Compound Component API - All Variants
 *
 * @returns {JSX.Element} Rendered compound API examples for all variants.
 */
export const AllVariantsExample = () => {
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
 *
 * @returns {JSX.Element} Rendered compound API example with image content.
 */
export const WithImageExample = () => {
  const [selected, setSelected] = useState(false);

  return (
    <div style={{ padding: '24px' }}>
      <BpkCheckboxCard.Root
        checked={selected}
        onCheckedChange={setSelected}
        variant={CHECKBOX_CARD_VARIANTS.onCanvasDefault}
        width={200}
      >
        <BpkCheckboxCard.Control />
        <BpkCheckboxCard.Content>
          <BpkVStack gap="bpk-spacing-md" align="center" width="100%">
            <BpkImage
              src="https://content.skyscnr.com/m/c9a57fbf76030f2/original/March-25-B2-IT-Spiagge-Liguria_1B_1.jpg"
              altText="Car"
              aspectRatio={16/9}
              style={{ width: '100%' }}
            />
            <BpkCheckboxCard.Label>Economy</BpkCheckboxCard.Label>
            <BpkPrice price="£74" leadingText="from" />
          </BpkVStack>
        </BpkCheckboxCard.Content>
      </BpkCheckboxCard.Root>
    </div>
  );
};

/**
 * New Compound Component API - With Inline Layout
 *
 * @returns {JSX.Element} Rendered compound API example with inline layout.
 */
export const WithInlineLayoutExample = () => {
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
          <BpkHStack gap="bpk-spacing-sm" align="center" width="100%">
            <LandmarkIconLg />
            <BpkCheckboxCard.Label>City Centre</BpkCheckboxCard.Label>
          </BpkHStack>
        </BpkCheckboxCard.Content>
      </BpkCheckboxCard.Root>
    </div>
  );
};

/**
 * New Compound Component API - With Corner Indicator
 *
 * Demonstrates the corner indicator variant: a visual checkbox in the
 * top-right corner, ideal for image/icon-heavy cards where inline
 * checkbox placement would compete with the content.
 *
 * @returns {JSX.Element} Rendered compound API example with corner indicator.
 */
export const WithIndicatorExample = () => {
  const options = [
    { id: 'city', label: 'City Centre', description: 'Best for sightseeing', icon: CityIconLg, price: '£85' },
    { id: 'landmark', label: 'Old Town', description: 'Best for culture', icon: LandmarkIconLg, price: '£78' },
    { id: 'airport', label: 'Airport Area', description: 'Best for transit', icon: AirportsIconLg, price: '£60', disabled: true },
  ];

  const [selected, setSelected] = useState<string[]>(['city']);

  const toggle = (id: string) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );
  };

  const indicatorTheme = createCheckboxCardTheme({
    checkboxCardBgChecked: '#FFFFFF',
    checkboxCardFgChecked: '#111236',
    checkboxCardBorderChecked: '#111236',
    checkboxCardIndicatorColor: '#111236',
  });

  return (
    <div style={{ padding: '24px' }}>
      <p style={{ marginBottom: '16px', fontWeight: 600 }}>Select neighbourhoods</p>
      <BpkThemeProvider theme={indicatorTheme} themeAttributes={CHECKBOX_CARD_THEME_ATTRIBUTES}>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          {options.map(({ description, disabled, icon: CardIcon, id, label, price }) => (
            <BpkCheckboxCard.Root
              key={id}
              checked={selected.includes(id)}
              onCheckedChange={() => toggle(id)}
              variant={CHECKBOX_CARD_VARIANTS.onCanvasDefault}
              disabled={disabled}
              width={140}
            >
              <BpkCheckboxCard.Control />
              <BpkCheckboxCard.Indicator />
              <BpkCheckboxCard.Content>
                <BpkVStack gap="bpk-spacing-sm" align="center" width="100%">
                  <CardIcon />
                  <BpkVStack gap="bpk-spacing-sm" align="center" width="100%">
                    <BpkCheckboxCard.Label>{label}</BpkCheckboxCard.Label>
                    <BpkCheckboxCard.Description>{description}</BpkCheckboxCard.Description>
                  </BpkVStack>
                  <BpkPrice price={price} leadingText="from" />
                </BpkVStack>
              </BpkCheckboxCard.Content>
            </BpkCheckboxCard.Root>
          ))}
        </div>
      </BpkThemeProvider>
    </div>
  );
};

/**
 * New Compound Component API - Size Variants
 *
 * @returns {JSX.Element} Rendered compound API example demonstrating sm/md/lg sizes.
 */
export const WithSizesExample = () => {
  const [selected, setSelected] = useState<string>('md');

  const sizes = [
    { id: CHECKBOX_CARD_SIZES.sm, label: 'Small', description: 'Compact', price: '£60' },
    { id: CHECKBOX_CARD_SIZES.md, label: 'Medium', description: 'Standard', price: '£85' },
    { id: CHECKBOX_CARD_SIZES.lg, label: 'Large', description: 'Spacious', price: '£120' },
  ];

  return (
    <div style={{ padding: '24px' }}>
      <p style={{ marginBottom: '16px', fontWeight: 600 }}>Select size</p>
      <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'flex-start' }}>
        {sizes.map(({ description, id, label, price }) => (
          <BpkCheckboxCard.Root
            key={id}
            checked={selected === id}
            onCheckedChange={() => setSelected(id)}
            variant={CHECKBOX_CARD_VARIANTS.onCanvasDefault}
            size={id}
            width={140}
          >
            <BpkCheckboxCard.Control />
            <BpkCheckboxCard.Content>
              <BpkVStack gap="bpk-spacing-sm" align="center" width="100%">
                <LandmarkIconLg />
                <BpkCheckboxCard.Label>{label}</BpkCheckboxCard.Label>
                <BpkCheckboxCard.Description>{description}</BpkCheckboxCard.Description>
                <BpkPrice price={price} />
              </BpkVStack>
            </BpkCheckboxCard.Content>
          </BpkCheckboxCard.Root>
        ))}
      </div>
    </div>
  );
};

/**
 * New Compound Component API - With Custom Theme
 *
 * @returns {JSX.Element} Rendered compound API example with custom theme overrides.
 */
export const WithCustomThemeExample = () => {
  const [selected1, setSelected1] = useState(false);
  const [selected2, setSelected2] = useState(true);

  const customTheme = createCheckboxCardTheme({
    checkboxCardFgDefault: '#111236',
    checkboxCardFgSecondary: '#68697F',
    checkboxCardBgHover: '#F1F2F8',
    checkboxCardBorderDefault: '#B2B2BF',
    checkboxCardBorderHover: '#68697F',
    checkboxCardBgChecked: '#FF6B35',
    checkboxCardBgDisabled: '#F1F2F8',
    checkboxCardFgDisabled: '#B2B2BF',
  });

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
              <BpkVStack gap="bpk-spacing-md" align="center" width="100%">
                <LandmarkIconLg />
                <BpkCheckboxCard.Label>City Centre</BpkCheckboxCard.Label>
                <BpkPrice price="£85" />
              </BpkVStack>
            </BpkCheckboxCard.Content>
          </BpkCheckboxCard.Root>

          <BpkCheckboxCard.Root
            checked={selected2}
            onCheckedChange={setSelected2}
            variant={CHECKBOX_CARD_VARIANTS.onCanvasDefault}
          >
            <BpkCheckboxCard.Control />
            <BpkCheckboxCard.Content>
              <BpkVStack gap="bpk-spacing-md" align="center" width="100%">
                <LandmarkIconLg />
                <BpkCheckboxCard.Label>Waterfront</BpkCheckboxCard.Label>
                <BpkPrice price="£95" />
              </BpkVStack>
            </BpkCheckboxCard.Content>
          </BpkCheckboxCard.Root>
        </div>
      </BpkThemeProvider>
    </div>
  );
};

/**
 * BpkCheckboxCardSimple - Simple Props API
 *
 * @returns {JSX.Element} Rendered simple API examples.
 */
export const SimpleAPIExample = () => {
  const [selected1, setSelected1] = useState(false);
  const [selected2, setSelected2] = useState(true);
  const [selected3, setSelected3] = useState(false);

  return (
    <div style={{ padding: '24px', display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
      <BpkCheckboxCardSimple
        checked={selected1}
        onChange={setSelected1}
        label="City Centre"
        description="Best for sightseeing"
        price={<BpkPrice price="£85" leadingText="from" />}
      />
      <BpkCheckboxCardSimple
        checked={selected2}
        onChange={setSelected2}
        label="Airport Area"
        description="Best for transit"
        price={<BpkPrice price="£60" leadingText="from" />}
      />
      <BpkCheckboxCardSimple
        checked={selected3}
        onChange={setSelected3}
        label="Old Town"
        description="Cannot be booked"
        price={<BpkPrice price="£78" leadingText="from" />}
        disabled
      />
    </div>
  );
};

/**
 * Neighbourhood card example — compact location card with price trend,
 * similar to a map overlay chip.
 *
 * @returns {JSX.Element} Rendered neighbourhood card examples.
 */
export const NeighbourhoodCardExample = () => {
  const neighbourhoods = [
    { id: 'westminster', name: 'City Of Westminster', count: 158, avgPrice: '£85', trend: 'down' as const },
    { id: 'shoreditch', name: 'Shoreditch', count: 94, avgPrice: '£72', trend: 'down' as const },
    { id: 'mayfair', name: 'Mayfair', count: 42, avgPrice: '£120', trend: 'down' as const },
  ];

  const [selected, setSelected] = useState<string[]>(['westminster']);

  const toggle = (id: string) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );
  };

  return (
    <div style={{ padding: '24px', display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
      {neighbourhoods.map(({ avgPrice, count, id, name }) => (
        <BpkCheckboxCard.Root
          key={id}
          checked={selected.includes(id)}
          onCheckedChange={() => toggle(id)}
          variant={CHECKBOX_CARD_VARIANTS.onCanvasDefault}
        >
          <BpkCheckboxCard.Control />
          <BpkCheckboxCard.Content>
            <BpkVStack gap="bpk-spacing-sm" align="start" width="100%">
              <BpkCheckboxCard.Label>{`${name} (${count})`}</BpkCheckboxCard.Label>
              <BpkHStack gap="bpk-spacing-sm" align="center">
                <TrendDownIconLg style={{ color: statusSuccessSpotDay, width: '16px', height: '16px' }} />
                <span style={{ color: statusSuccessSpotDay, fontSize: '12px', fontWeight: 600 }}>{avgPrice} avg.</span>
              </BpkHStack>
            </BpkVStack>
          </BpkCheckboxCard.Content>
        </BpkCheckboxCard.Root>
      ))}
    </div>
  );
};
