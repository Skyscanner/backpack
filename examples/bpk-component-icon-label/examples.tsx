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

import { background } from 'storybook/theming';

import {
  textColors,
  spacings,
  colors,
  surfaceColors,
} from '@skyscanner/bpk-foundations-web/tokens/base.es6';

import CarsIcon from '../../packages/bpk-component-icon/sm/cars';
import FlightIcon from '../../packages/bpk-component-icon/sm/flight';
import HotelsIcon from '../../packages/bpk-component-icon/sm/hotels';
import InformationCircleIcon from '../../packages/bpk-component-icon/sm/information-circle';
import BpkIconLabel, {
  LABEL_STYLE,
} from '../../packages/bpk-component-icon-label';
import {
  iconLabelThemeAttributes,
  iconLabelOnDarkThemeAttributes,
} from '../../packages/bpk-component-icon-label/src/themeAttributes';
import BpkLink from '../../packages/bpk-component-link';
import linkThemeAttributes, {
  linkAlternateThemeAttributes,
} from '../../packages/bpk-component-link/src/themeAttributes';
import BpkThemeProvider from '../../packages/bpk-theming';
import { BpkDarkExampleWrapper } from '../bpk-storybook-utils';

// Combined theme for both BpkIconLabel and BpkLink
const combinedTheme = {
  // BpkIconLabel theme attributes
  iconLabelTextColor: colors.colorSkyBlue,
  // BpkLink theme attributes
  linkColor: colors.colorSkyBlue, // sky blue
  linkHoverColor: colors.colorSkyBlue, // grey on hover
  linkActiveColor: colors.colorSkyBlue, // grey when active
  linkVisitedColor: colors.colorSkyBlue, // grey for visited
};

const combinedOnDarkTheme = {
  // BpkIconLabel on-dark theme attributes
  iconLabelOnDarkTextColor: colors.colorSystemGreen, // green
  // BpkLink alternate (on-dark) theme attributes
  linkAlternateColor: colors.colorSystemGreen, // green
  linkAlternateHoverColor: colors.colorSystemGreen, // green on hover
  linkAlternateActiveColor: colors.colorSystemGreen, // green when active
  linkAlternateVisitedColor: colors.colorSystemGreen, // green for visited
};

export const DefaultExample = () => (
  <div
    style={{
      display: 'flex',
      flexDirection: 'column',
      gap: spacings.spacingIconText,
    }}
  >
    <BpkIconLabel.Root>
      <BpkIconLabel.Icon>
        <FlightIcon />
      </BpkIconLabel.Icon>
      <BpkIconLabel.Text>
        This is an information message with default styling
      </BpkIconLabel.Text>
    </BpkIconLabel.Root>

    <BpkIconLabel.Root>
      <BpkIconLabel.Icon>
        <FlightIcon />
      </BpkIconLabel.Icon>
      <BpkIconLabel.Text>
        Learn more about our{' '}
        <BpkLink href="https://www.skyscanner.net/privacy">
          privacy policy
        </BpkLink>{' '}
        and how we handle your data
      </BpkIconLabel.Text>
    </BpkIconLabel.Root>

    <BpkIconLabel.Root>
      <BpkIconLabel.Text>
        This is a text-only message without an icon
      </BpkIconLabel.Text>
    </BpkIconLabel.Root>
  </div>
);

export const LongTextExample = () => (
  <div style={{ maxWidth: '400px' }}>
    <BpkIconLabel.Root>
      <BpkIconLabel.Icon>
        <FlightIcon />
      </BpkIconLabel.Icon>
      <BpkIconLabel.Text>
        This is a longer information message that demonstrates how the component
        handles text wrapping. The icon stays aligned to the first line while
        the text wraps naturally across multiple lines, maintaining proper
        spacing and readability.
      </BpkIconLabel.Text>
    </BpkIconLabel.Root>
  </div>
);

export const TypeVariantsExample = () => (
  <div
    style={{
      display: 'flex',
      flexDirection: 'column',
      gap: spacings.spacingIconText,
    }}
  >
    <BpkIconLabel.Root type={LABEL_STYLE.body}>
      <BpkIconLabel.Icon>
        <FlightIcon />
      </BpkIconLabel.Icon>
      <BpkIconLabel.Text>Body typography (16px regular)</BpkIconLabel.Text>
    </BpkIconLabel.Root>

    <BpkIconLabel.Root type={LABEL_STYLE.label1}>
      <BpkIconLabel.Icon>
        <HotelsIcon />
      </BpkIconLabel.Icon>
      <BpkIconLabel.Text>Label 1 typography (16px bold)</BpkIconLabel.Text>
    </BpkIconLabel.Root>

    <BpkIconLabel.Root type={LABEL_STYLE.footnote}>
      <BpkIconLabel.Icon>
        <CarsIcon />
      </BpkIconLabel.Icon>
      <BpkIconLabel.Text>Footnote typography (14px regular)</BpkIconLabel.Text>
    </BpkIconLabel.Root>
  </div>
);

export const OnDarkExample = () => (
  <BpkDarkExampleWrapper>
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: spacings.spacingIconText,
      }}
    >
      <BpkIconLabel.Root onDark>
        <BpkIconLabel.Icon>
          <FlightIcon />
        </BpkIconLabel.Icon>
        <BpkIconLabel.Text>
          This message appears on a dark background
        </BpkIconLabel.Text>
      </BpkIconLabel.Root>

      <BpkIconLabel.Root onDark>
        <BpkIconLabel.Icon>
          <FlightIcon />
        </BpkIconLabel.Icon>
        <BpkIconLabel.Text>
          Visit our{' '}
          <BpkLink href="https://www.skyscanner.net" alternate>
            website
          </BpkLink>{' '}
          to learn more
        </BpkIconLabel.Text>
      </BpkIconLabel.Root>
    </div>
  </BpkDarkExampleWrapper>
);

export const AllVariantsExample = () => (
  <div
    style={{
      display: 'flex',
      flexDirection: 'column',
      gap: spacings.spacingIconText,
    }}
  >
    <div>
      <h3>Default Style</h3>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: spacings.spacingIconText,
        }}
      >
        <BpkIconLabel.Root type={LABEL_STYLE.body}>
          <BpkIconLabel.Icon>
            <FlightIcon />
          </BpkIconLabel.Icon>
          <BpkIconLabel.Text>Body typography (default)</BpkIconLabel.Text>
        </BpkIconLabel.Root>

        <BpkIconLabel.Root type={LABEL_STYLE.label1}>
          <BpkIconLabel.Icon>
            <HotelsIcon />
          </BpkIconLabel.Icon>
          <BpkIconLabel.Text>Label 1 typography (default)</BpkIconLabel.Text>
        </BpkIconLabel.Root>

        <BpkIconLabel.Root type={LABEL_STYLE.footnote}>
          <BpkIconLabel.Icon>
            <CarsIcon />
          </BpkIconLabel.Icon>
          <BpkIconLabel.Text>Footnote typography (default)</BpkIconLabel.Text>
        </BpkIconLabel.Root>
      </div>
    </div>

    <BpkDarkExampleWrapper>
      <div>
        <h3 style={{ color: textColors.textOnDarkDay }}>On-Dark Style</h3>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: spacings.spacingIconText,
          }}
        >
          <BpkIconLabel.Root type={LABEL_STYLE.body} onDark>
            <BpkIconLabel.Icon>
              <FlightIcon />
            </BpkIconLabel.Icon>
            <BpkIconLabel.Text>Body typography (on-dark)</BpkIconLabel.Text>
          </BpkIconLabel.Root>

          <BpkIconLabel.Root type={LABEL_STYLE.label1} onDark>
            <BpkIconLabel.Icon>
              <HotelsIcon />
            </BpkIconLabel.Icon>
            <BpkIconLabel.Text>Label 1 typography (on-dark)</BpkIconLabel.Text>
          </BpkIconLabel.Root>

          <BpkIconLabel.Root type={LABEL_STYLE.footnote} onDark>
            <BpkIconLabel.Icon>
              <CarsIcon />
            </BpkIconLabel.Icon>
            <BpkIconLabel.Text>Footnote typography (on-dark)</BpkIconLabel.Text>
          </BpkIconLabel.Root>
        </div>
      </div>
    </BpkDarkExampleWrapper>
  </div>
);

export const MultipleMessagesExample = () => (
  <div
    style={{
      display: 'flex',
      flexDirection: 'column',
      gap: spacings.spacingIconText,
    }}
  >
    <BpkIconLabel.Root type={LABEL_STYLE.footnote}>
      <BpkIconLabel.Icon>
        <CarsIcon />
      </BpkIconLabel.Icon>
      <BpkIconLabel.Text>
        Free cancellation available up to 24 hours before departure
      </BpkIconLabel.Text>
    </BpkIconLabel.Root>

    <BpkIconLabel.Root type={LABEL_STYLE.footnote}>
      <BpkIconLabel.Icon>
        <CarsIcon />
      </BpkIconLabel.Icon>
      <BpkIconLabel.Text>
        Baggage allowance: 1 carry-on bag and 1 personal item
      </BpkIconLabel.Text>
    </BpkIconLabel.Root>

    <BpkIconLabel.Root type={LABEL_STYLE.footnote}>
      <BpkIconLabel.Icon>
        <CarsIcon />
      </BpkIconLabel.Icon>
      <BpkIconLabel.Text>
        Check-in opens 24 hours before your flight
      </BpkIconLabel.Text>
    </BpkIconLabel.Root>
  </div>
);

export const VisualTestExample = AllVariantsExample;

export const ThemedExample = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
    <div>
      <h3>Default Theme</h3>
      <BpkIconLabel.Root>
        <BpkIconLabel.Icon>
          <FlightIcon />
        </BpkIconLabel.Icon>
        <BpkIconLabel.Text>
          Default colors with{' '}
          <BpkLink href="https://www.skyscanner.net">default link</BpkLink>
        </BpkIconLabel.Text>
      </BpkIconLabel.Root>
    </div>

    <div>
      <h3>Custom Theme</h3>
      <BpkThemeProvider
        theme={combinedTheme}
        themeAttributes={[
          ...iconLabelThemeAttributes,
          ...linkThemeAttributes,
        ]}
      >
        <BpkIconLabel.Root>
          <BpkIconLabel.Icon>
            <FlightIcon />
          </BpkIconLabel.Icon>
          <BpkIconLabel.Text>
            Blue icon and text with{' '}
            <BpkLink href="https://www.skyscanner.net">blue link</BpkLink>{' '}
            (hover to see effects)
          </BpkIconLabel.Text>
        </BpkIconLabel.Root>
      </BpkThemeProvider>
    </div>
  </div>
);

export const ThemedOnDarkExample = () => (
  <BpkDarkExampleWrapper>
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
        padding: '20px',
      }}
    >
      <div>
        <h3 style={{ color: textColors.textOnDarkDay }}>Default Theme</h3>
        <BpkIconLabel.Root onDark>
          <BpkIconLabel.Icon>
            <FlightIcon />
          </BpkIconLabel.Icon>
          <BpkIconLabel.Text>
            Default on-dark colors with{' '}
            <BpkLink href="https://www.skyscanner.net" alternate>
              default link
            </BpkLink>
          </BpkIconLabel.Text>
        </BpkIconLabel.Root>
      </div>

      <div>
        <h3 style={{ color: textColors.textOnDarkDay }}>
          Custom Theme
        </h3>
        <BpkThemeProvider
          theme={combinedOnDarkTheme}
          themeAttributes={[
            ...iconLabelOnDarkThemeAttributes,
            ...linkAlternateThemeAttributes,
          ]}
        >
          <BpkIconLabel.Root onDark>
            <BpkIconLabel.Icon>
              <FlightIcon />
            </BpkIconLabel.Icon>
            <BpkIconLabel.Text>
              Green icon and text with{' '}
              <BpkLink href="https://www.skyscanner.net" alternate>
                green link
              </BpkLink>{' '}
              (hover to see effects)
            </BpkIconLabel.Text>
          </BpkIconLabel.Root>
        </BpkThemeProvider>
      </div>
    </div>
  </BpkDarkExampleWrapper>
);
