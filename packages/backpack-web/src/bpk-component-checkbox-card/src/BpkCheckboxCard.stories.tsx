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

import { useState, Component } from 'react';
import type { ReactNode } from 'react';

import { canvasContrastDay, colorWhite, lineDay, statusSuccessSpotDay, surfaceContrastDay, textPrimaryDay, textSecondaryDay } from '@skyscanner/bpk-foundations-web/tokens/base.es6';

import BpkButton from '../../bpk-component-button';
import AirportsIconLg from '../../bpk-component-icon/lg/airports';
import CityIconLg from '../../bpk-component-icon/lg/city';
import LandmarkIconLg from '../../bpk-component-icon/lg/landmark';
import TrendDownIconLg from '../../bpk-component-icon/lg/trend--down';
import BpkImage from '../../bpk-component-image';
import { BpkBox, BpkVStack, BpkHStack, BpkProvider } from '../../bpk-component-layout';
// @ts-expect-error Untyped import. See `decisions/imports-ts-suppressions.md`.
import BpkPrice from '../../bpk-component-price';
import BpkText, { TEXT_COLORS, TEXT_STYLES } from '../../bpk-component-text';
// @ts-expect-error Untyped import. See `decisions/imports-ts-suppressions.md`.
import BpkThemeProvider from '../../bpk-theming';

import { BpkCheckboxCard, CHECKBOX_CARD_VARIANTS, CHECKBOX_CARD_RADIUS, useCheckboxCardContext } from './BpkCheckboxCard';
import CHECKBOX_CARD_THEME_ATTRIBUTES, { createCheckboxCardTheme } from './themeAttributes';

import type { Meta } from '@storybook/react';

const BasicExample = () => {
  const [selected1, setSelected1] = useState(false);
  const [selected2, setSelected2] = useState(true);

  return (
    <BpkHStack padding="bpk-spacing-lg" gap="bpk-spacing-base" wrap="wrap">
      <BpkBox width="9.375rem" height="9.375rem">
        <BpkCheckboxCard.Root
          checked={selected1}
          onCheckedChange={setSelected1}
          variant={CHECKBOX_CARD_VARIANTS.onCanvasDefault}
        >
          <BpkCheckboxCard.HiddenInput />
          <BpkCheckboxCard.Content>
            {/* Empty content - no icon, label, or price */}
          </BpkCheckboxCard.Content>
        </BpkCheckboxCard.Root>
      </BpkBox>

      <BpkBox width="9.375rem" height="9.375rem">
        <BpkCheckboxCard.Root
          checked={selected2}
          onCheckedChange={setSelected2}
          variant={CHECKBOX_CARD_VARIANTS.onCanvasDefault}
          radius={CHECKBOX_CARD_RADIUS.square}
        >
          <BpkCheckboxCard.HiddenInput />
          <BpkCheckboxCard.Content>
            {/* Empty content - no icon, label, or price */}
          </BpkCheckboxCard.Content>
        </BpkCheckboxCard.Root>
      </BpkBox>

      <BpkBox width="9.375rem" height="9.375rem">
        <BpkCheckboxCard.Root
          checked={false}
          variant={CHECKBOX_CARD_VARIANTS.onCanvasDefault}
          disabled
        >
          <BpkCheckboxCard.HiddenInput />
          <BpkCheckboxCard.Content>
            {/* Empty content - no icon, label, or price */}
          </BpkCheckboxCard.Content>
        </BpkCheckboxCard.Root>
      </BpkBox>
    </BpkHStack>
  );
};

const WithMultiContentExample = () => {
  const [selected, setSelected] = useState(false);

  return (
    <BpkHStack padding="bpk-spacing-lg" gap="bpk-spacing-base">
      <BpkBox width="9.375rem">
        <BpkCheckboxCard.Root
          checked={selected}
          onCheckedChange={setSelected}
          variant={CHECKBOX_CARD_VARIANTS.onCanvasDefault}
        >
          <BpkCheckboxCard.HiddenInput />
          <BpkCheckboxCard.Content>
            <BpkVStack gap="bpk-spacing-md" align="center" width="100%">
              <LandmarkIconLg fill={selected ? 'white' : undefined} />
              <BpkVStack gap="bpk-spacing-sm" align="center" width="100%">
                <BpkCheckboxCard.Label>City Centre</BpkCheckboxCard.Label>
                <BpkCheckboxCard.Description>
                  Central location with easy access to attractions
                </BpkCheckboxCard.Description>
              </BpkVStack>
              <BpkText textStyle={TEXT_STYLES.heading5} tagName="span" color={selected ? TEXT_COLORS.textOnDark : undefined}>
                £85
              </BpkText>
            </BpkVStack>
          </BpkCheckboxCard.Content>
        </BpkCheckboxCard.Root>
      </BpkBox>
    </BpkHStack>
  );
};

const AllVariantsExample = () => {
  const [selected1, setSelected1] = useState(false);
  const [selected2, setSelected2] = useState(false);
  const [selected3, setSelected3] = useState(false);
  const [selected4, setSelected4] = useState(false);

  return (
    <BpkVStack gap="bpk-spacing-lg" padding="bpk-spacing-lg" align="start">
      {/* onCanvasDefault */}
      <BpkVStack gap="bpk-spacing-md" align="start">
        <BpkText tagName="h4" textStyle={TEXT_STYLES.heading4}>On Canvas Default</BpkText>
        <BpkBox width="9.375rem" height="9.375rem">
          <BpkCheckboxCard.Root
            checked={selected1}
            onCheckedChange={setSelected1}
            variant={CHECKBOX_CARD_VARIANTS.onCanvasDefault}
          >
            <BpkCheckboxCard.HiddenInput />
            <BpkCheckboxCard.Content>
              {/* Empty content - no icon, label, or price */}
            </BpkCheckboxCard.Content>
          </BpkCheckboxCard.Root>
        </BpkBox>
      </BpkVStack>

      {/* onCanvasContrast */}
      <BpkVStack gap="bpk-spacing-md" align="start">
        <BpkText tagName="h4" textStyle={TEXT_STYLES.heading4}>On Canvas Contrast</BpkText>
        <div style={{ background: canvasContrastDay, padding: '1.5rem' }}>
          <BpkBox width="9.375rem" height="9.375rem">
            <BpkCheckboxCard.Root
              checked={selected2}
              onCheckedChange={setSelected2}
              variant={CHECKBOX_CARD_VARIANTS.onCanvasContrast}
            >
              <BpkCheckboxCard.HiddenInput />
              <BpkCheckboxCard.Content>
                {/* Empty content - no icon, label, or price */}
              </BpkCheckboxCard.Content>
            </BpkCheckboxCard.Root>
          </BpkBox>
        </div>
      </BpkVStack>

      {/* onSurfaceContrast */}
      <BpkVStack gap="bpk-spacing-md" align="start">
        <BpkText tagName="h4" textStyle={TEXT_STYLES.heading4}>On Surface Contrast (Dark)</BpkText>
        <div style={{ background: surfaceContrastDay, padding: '1.5rem' }}>
          <BpkBox width="9.375rem" height="9.375rem">
            <BpkCheckboxCard.Root
              checked={selected3}
              onCheckedChange={setSelected3}
              variant={CHECKBOX_CARD_VARIANTS.onSurfaceContrast}
            >
              <BpkCheckboxCard.HiddenInput />
              <BpkCheckboxCard.Content>
                {/* Empty content - no icon, label, or price */}
              </BpkCheckboxCard.Content>
            </BpkCheckboxCard.Root>
          </BpkBox>
        </div>
      </BpkVStack>

      {/* cars */}
      <BpkVStack gap="bpk-spacing-md" align="start">
        <BpkText tagName="h4" textStyle={TEXT_STYLES.heading4}>Cars</BpkText>
        <BpkBox width="9.375rem" height="9.375rem">
          <BpkCheckboxCard.Root
            checked={selected4}
            onCheckedChange={setSelected4}
            variant={CHECKBOX_CARD_VARIANTS.cars}
          >
            <BpkCheckboxCard.HiddenInput />
            <BpkCheckboxCard.Content>
              {/* Empty content - no icon, label, or price */}
            </BpkCheckboxCard.Content>
          </BpkCheckboxCard.Root>
        </BpkBox>
      </BpkVStack>
    </BpkVStack>
  );
};

const WithImageExample = () => {
  const [selected, setSelected] = useState(false);

  return (
    <BpkVStack padding="bpk-spacing-lg" align="start">
      <BpkBox width="12.5rem">
        <BpkCheckboxCard.Root
          checked={selected}
          onCheckedChange={setSelected}
          variant={CHECKBOX_CARD_VARIANTS.onCanvasDefault}
        >
          <BpkCheckboxCard.HiddenInput />
          <BpkCheckboxCard.Content>
            <BpkVStack gap="bpk-spacing-md" align="center" width="100%">
              <BpkImage
                src="https://content.skyscnr.com/m/c9a57fbf76030f2/original/March-25-B2-IT-Spiagge-Liguria_1B_1.jpg"
                altText="Car"
                aspectRatio={16/9}
                style={{ width: '100%' }}
              />
              <BpkCheckboxCard.Label>Economy</BpkCheckboxCard.Label>
              <BpkText textStyle={TEXT_STYLES.xs} tagName="span" color={selected ? TEXT_COLORS.textOnDark : undefined}>from</BpkText>
              <BpkText textStyle={TEXT_STYLES.heading5} tagName="span" color={selected ? TEXT_COLORS.textOnDark : undefined}>£74</BpkText>
            </BpkVStack>
          </BpkCheckboxCard.Content>
        </BpkCheckboxCard.Root>
      </BpkBox>
    </BpkVStack>
  );
};

const WithInlineLayoutExample = () => {
  const [selected, setSelected] = useState(false);

  return (
    <BpkVStack padding="bpk-spacing-lg" align="stretch">
      <BpkCheckboxCard.Root
        checked={selected}
        onCheckedChange={setSelected}
        variant={CHECKBOX_CARD_VARIANTS.onCanvasDefault}
      >
        <BpkCheckboxCard.HiddenInput />
        <BpkCheckboxCard.Content>
          <BpkHStack gap="bpk-spacing-sm" align="center" width="100%">
            <LandmarkIconLg fill={selected ? 'white' : undefined} />
            <BpkCheckboxCard.Label>City Centre</BpkCheckboxCard.Label>
          </BpkHStack>
        </BpkCheckboxCard.Content>
      </BpkCheckboxCard.Root>
    </BpkVStack>
  );
};

const WithIndicatorExample = () => {
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
    checkboxCardCheckedBackgroundColor: colorWhite,
    checkboxCardCheckedTextColor: textPrimaryDay,
    checkboxCardCheckedBorderColor: textPrimaryDay,
    checkboxCardIndicatorBackgroundColor: textPrimaryDay,
  });

  return (
    <BpkVStack padding="bpk-spacing-lg" align="start" gap="bpk-spacing-md">
      <BpkText tagName="p" textStyle={TEXT_STYLES.label1}>Select neighbourhoods</BpkText>
      <BpkThemeProvider theme={indicatorTheme} themeAttributes={CHECKBOX_CARD_THEME_ATTRIBUTES}>
        <BpkHStack gap="bpk-spacing-md" wrap="wrap" align="stretch">
          {options.map(({ description, disabled, icon: CardIcon, id, label, price }) => (
            <BpkBox key={id} width="8.75rem">
            <BpkCheckboxCard.Root
              checked={selected.includes(id)}
              onCheckedChange={() => toggle(id)}
              variant={CHECKBOX_CARD_VARIANTS.onCanvasDefault}
              disabled={disabled}
            >
              <BpkCheckboxCard.HiddenInput />
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
            </BpkBox>
          ))}
        </BpkHStack>
      </BpkThemeProvider>
    </BpkVStack>
  );
};

const WithCustomThemeExample = () => {
  const [selected1, setSelected1] = useState(false);
  const [selected2, setSelected2] = useState(true);

  const customTheme = createCheckboxCardTheme({
    checkboxCardDefaultTextColor: textPrimaryDay,
    checkboxCardSecondaryTextColor: textSecondaryDay,
    checkboxCardHoverBackgroundColor: canvasContrastDay,
    checkboxCardDefaultBorderColor: lineDay,
    checkboxCardHoverBorderColor: textSecondaryDay,
    checkboxCardCheckedBackgroundColor: '#FF6B35',
    checkboxCardDisabledBackgroundColor: canvasContrastDay,
    checkboxCardDisabledTextColor: lineDay,
  });

  return (
    <BpkVStack padding="bpk-spacing-lg" align="start">
      <BpkThemeProvider theme={customTheme} themeAttributes={CHECKBOX_CARD_THEME_ATTRIBUTES}>
        <BpkHStack gap="bpk-spacing-base" wrap="wrap">
          <BpkBox width="9.375rem">
            <BpkCheckboxCard.Root
              checked={selected1}
              onCheckedChange={setSelected1}
              variant={CHECKBOX_CARD_VARIANTS.onCanvasDefault}
            >
              <BpkCheckboxCard.HiddenInput />
              <BpkCheckboxCard.Content>
                <BpkVStack gap="bpk-spacing-md" align="center" width="100%">
                  <LandmarkIconLg fill={selected1 ? 'white' : undefined} />
                  <BpkCheckboxCard.Label>City Centre</BpkCheckboxCard.Label>
                  <BpkText textStyle={TEXT_STYLES.heading5} tagName="span" color={selected1 ? TEXT_COLORS.textOnDark : undefined}>£85</BpkText>
                </BpkVStack>
              </BpkCheckboxCard.Content>
            </BpkCheckboxCard.Root>
          </BpkBox>

          <BpkBox width="9.375rem">
            <BpkCheckboxCard.Root
              checked={selected2}
              onCheckedChange={setSelected2}
              variant={CHECKBOX_CARD_VARIANTS.onCanvasDefault}
            >
              <BpkCheckboxCard.HiddenInput />
              <BpkCheckboxCard.Content>
                <BpkVStack gap="bpk-spacing-md" align="center" width="100%">
                  <LandmarkIconLg fill={selected2 ? 'white' : undefined} />
                  <BpkCheckboxCard.Label>Waterfront</BpkCheckboxCard.Label>
                  <BpkText textStyle={TEXT_STYLES.heading5} tagName="span" color={selected2 ? TEXT_COLORS.textOnDark : undefined}>£95</BpkText>
                </BpkVStack>
              </BpkCheckboxCard.Content>
            </BpkCheckboxCard.Root>
          </BpkBox>
        </BpkHStack>
      </BpkThemeProvider>
    </BpkVStack>
  );
};

const WithCarVariantExample = () => {
  const carTypes = [
    { id: 'small', label: 'Small', price: '£35', src: 'https://content.skyscnr.com/m/c9a57fbf76030f2/original/March-25-B2-IT-Spiagge-Liguria_1B_1.jpg' },
    { id: 'medium', label: 'Medium', price: '£52', src: 'https://content.skyscnr.com/m/c9a57fbf76030f2/original/March-25-B2-IT-Spiagge-Liguria_1B_1.jpg' },
    { id: 'large', label: 'Large', price: '£78', src: 'https://content.skyscnr.com/m/c9a57fbf76030f2/original/March-25-B2-IT-Spiagge-Liguria_1B_1.jpg' },
  ];

  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<string[]>([]);

  const toggle = (id: string) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );
  };

  return (
    <BpkVStack padding="bpk-spacing-lg" align="start" gap="bpk-spacing-md">
      <BpkText tagName="p" textStyle={TEXT_STYLES.label1}>Select car type</BpkText>
      <BpkHStack gap="bpk-spacing-md" wrap="wrap">
        {carTypes.map(({ id, label, price, src }) => (
          <BpkBox key={id} width="7.25rem">
            <BpkCheckboxCard.Root
              checked={selected.includes(id)}
              onCheckedChange={() => toggle(id)}
              variant={CHECKBOX_CARD_VARIANTS.cars}
              loading={loading}
            >
              <BpkCheckboxCard.HiddenInput />
              <BpkCheckboxCard.Content>
                <BpkVStack gap="bpk-spacing-sm" align="center" width="100%">
                  <BpkImage
                    src={src}
                    altText={`${label} car`}
                    aspectRatio={100 / 66}
                    style={{ width: '100%' }}
                  />
                  <BpkCheckboxCard.Label>{label}</BpkCheckboxCard.Label>
                  <BpkCheckboxCard.Price price={price} />
                </BpkVStack>
              </BpkCheckboxCard.Content>
            </BpkCheckboxCard.Root>
          </BpkBox>
        ))}
      </BpkHStack>
      <BpkButton onClick={() => setLoading((prev) => !prev)}>
        {loading ? 'Simulate loading' : 'Simulate prices loaded'}
      </BpkButton>
    </BpkVStack>
  );
};

function VariantBadge() {
  const { variant } = useCheckboxCardContext();

  if (variant !== CHECKBOX_CARD_VARIANTS.onCanvasContrast) {
    return null;
  }

  return (
    <BpkText textStyle={TEXT_STYLES.xs} tagName="span">
      Best value
    </BpkText>
  );
}

class ErrorBoundary extends Component<{ children: ReactNode }, { error: string | null }> {
  constructor(props: { children: ReactNode }) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { error: error.message };
  }

  render() {
    if (this.state.error) {
      return (
        <BpkText textStyle={TEXT_STYLES.bodyDefault} tagName="p">
          Caught error: {this.state.error}
        </BpkText>
      );
    }
    return this.props.children;
  }
}

const WithContextOutsideRootExample = () => (
  <BpkVStack padding="bpk-spacing-lg" align="start" gap="bpk-spacing-md">
    <BpkText tagName="p" textStyle={TEXT_STYLES.label1}>
      VariantBadge rendered outside Root — should show error:
    </BpkText>
    <ErrorBoundary>
      <VariantBadge />
    </ErrorBoundary>
  </BpkVStack>
);

const WithMetadataExample = () => {
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
    <BpkHStack padding="bpk-spacing-lg" gap="bpk-spacing-md" wrap="wrap">
      {neighbourhoods.map(({ avgPrice, count, id, name }) => {
        const isChecked = selected.includes(id);
        const trendColor = isChecked ? colorWhite : statusSuccessSpotDay;

        return (
          <BpkCheckboxCard.Root
            key={id}
            checked={isChecked}
            onCheckedChange={() => toggle(id)}
            variant={CHECKBOX_CARD_VARIANTS.onCanvasDefault}
          >
            <BpkCheckboxCard.HiddenInput />
            <BpkCheckboxCard.Content>
              <BpkVStack gap="bpk-spacing-sm" align="start" width="100%">
                <BpkCheckboxCard.Label>{`${name} (${count})`}</BpkCheckboxCard.Label>
                <BpkHStack gap="bpk-spacing-sm" align="center">
                  <TrendDownIconLg fill={trendColor} style={{ width: '1rem', height: '1rem' }} />
                  <BpkText textStyle={TEXT_STYLES.label2} tagName="span" color={isChecked ? TEXT_COLORS.textOnDark : undefined}>{avgPrice} avg.</BpkText>
                </BpkHStack>
              </BpkVStack>
            </BpkCheckboxCard.Content>
          </BpkCheckboxCard.Root>
        );
      })}
    </BpkHStack>
  );
};

const meta = {
  title: 'bpk-component-checkbox-card',
  component: BpkCheckboxCard,
  decorators: [(Story: any) => <BpkProvider><Story /></BpkProvider>],
} satisfies Meta;

export default meta;

export const Basic = {
  render: () => <BasicExample />,
};

export const WithMultiContent = {
  render: () => <WithMultiContentExample />,
};

export const AllVariants = {
  render: () => <AllVariantsExample />,
};

export const WithImage = {
  render: () => <WithImageExample />,
};

export const WithIndicator = {
  render: () => <WithIndicatorExample />,
};

export const WithInlineLayout = {
  render: () => <WithInlineLayoutExample />,
};

export const WithCustomTheme = {
  render: () => <WithCustomThemeExample />,
};

export const WithMetadata = {
  render: () => <WithMetadataExample />,
};

export const WithCarVariant = {
  render: () => <WithCarVariantExample />,
};

export const WithContextOutsideRoot = {
  render: () => <WithContextOutsideRootExample />,
};

export const VisualTest = {
  render: () => (
    <>
      <BasicExample />
      <AllVariantsExample />
      <WithMultiContentExample />
    </>
  ),
};

export const VisualTestWithZoom = {
  render: () => (
    <>
      <BasicExample />
      <AllVariantsExample />
      <WithMultiContentExample />
    </>
  ),
  args: {
    zoomEnabled: true,
  },
};
