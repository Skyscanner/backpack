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


import { ArgTypes, Markdown } from '@storybook/addon-docs/blocks';

// @ts-expect-error Untyped import. See `decisions/imports-ts-suppressions.md`.
import { action, BpkDarkExampleWrapper } from 'bpk-storybook-utils';


import {
  withButtonAlignment,
  withLargeButtonAlignment,
  withRtlSupport,
} from '../../bpk-component-icon';
import LargeLightningIcon from '../../bpk-component-icon/lg/lightning';
import LargeLongArrowRightIcon from '../../bpk-component-icon/lg/long-arrow-right';
import SmallLightningIcon from '../../bpk-component-icon/sm/lightning';
import SmallLongArrowRightIcon from '../../bpk-component-icon/sm/long-arrow-right';
import {
  BpkHStack,
  BpkProvider,
  BpkSpacing,
  BpkVStack,
} from '../../bpk-component-layout';
import BpkText, { TEXT_STYLES } from '../../bpk-component-text';
import { cssModules } from '../../bpk-react-utils';
import BpkThemeProvider from '../../bpk-theming';
import readme from '../README.md';


import BpkButton from './BpkButton';
import { BUTTON_TYPES, SIZE_TYPES } from './common-types';

import type { BpkTheme } from '../../bpk-theming';
import type { Meta } from '@storybook/react';

import STYLES from './BpkButton.stories.module.scss';

const THEMED_BUTTON_THEME: BpkTheme = {
  button: {
    dimensionRadius: '999px',
    dimensionMinHeightDefault: '36px',
    dimensionPaddingHorizontalDefault: '16px',
    dimensionMinHeightLarge: '56px',
    dimensionPaddingHorizontalLarge: '24px',
    colourBgDisabled: '#e0e4e9',
    colourTextDisabled: 'rgba(0, 0, 0, 0.2)',
    colourBgPrimary: '#05203c',
    colourBgPrimaryPressed: '#154679',
    colourTextPrimary: '#ffffff',
    colourBgPrimaryOnDark: '#ffffff',
    colourBgPrimaryOnDarkPressed: '#c1c7cf',
    colourTextPrimaryOnDark: '#161616',
    colourBgPrimaryOnLight: '#05203c',
    colourBgPrimaryOnLightPressed: '#154679',
    colourTextPrimaryOnLight: '#ffffff',
    colourTextSecondary: '#161616',
    colourBgSecondary: '#e3f0ff',
    colourBgSecondaryPressed: '#b4d7ff',
    colourBgSecondaryOnDark: 'rgba(255, 255, 255, 0.1)',
    colourBgSecondaryOnDarkPressed: 'rgba(0, 0, 0, 0.5)',
    colourBgSecondaryOnDarkDisabled: '#0b121d',
    colourTextSecondaryOnDark: '#ffffff',
    colourTextFeature: '#ffffff',
    colourBgFeatured: '#0062e3',
    colourBgFeaturePressed: '#024daf',
    colourTextDestructive: '#e70866',
    colourTextDestructivePressed: '#ffffff',
    colourBgDestructive: '#e0e4e9',
    colourBgDestructivePressed: '#e70866',
    colourTextLink: '#161616',
    colourTextLinkOnDark: '#ffffff',
  },
};

const RtlSmallLongArrowRightIcon = withRtlSupport(SmallLongArrowRightIcon);
const RtlLargeLongArrowRightIcon = withRtlSupport(LargeLongArrowRightIcon);

const AlignedSmallLongArrowRightIcon = withButtonAlignment(
  withRtlSupport(SmallLongArrowRightIcon),
);
const AlignedLargeLongArrowRightIcon = withLargeButtonAlignment(
  withRtlSupport(LargeLongArrowRightIcon),
);

const getClassName = cssModules(STYLES);

type StoryProps = Omit<Parameters<typeof BpkButton>[0], 'children'> & {
  className?: string;
  wrapped: typeof BpkButton;
};

const ButtonStory = ({ className = undefined, wrapped, ...rest }: StoryProps) => {
  const Wrapped = wrapped;
  return (
    <div
      className={[getClassName('bpk-button-story-wrapper'), className].join(
        ' ',
      )}
    >
      &nbsp;
      <Wrapped onClick={action('Button clicked')} {...rest}>
        Button
      </Wrapped>
      &nbsp;
      <Wrapped trailingIcon={<RtlSmallLongArrowRightIcon />} onClick={action('Button clicked')} {...rest}>
        Button
      </Wrapped>
      &nbsp;
      <Wrapped leadingIcon={<SmallLightningIcon />} onClick={action('Button clicked')} {...rest}>
        Button
      </Wrapped>
      &nbsp;
      <Wrapped leadingIcon={<SmallLightningIcon />} trailingIcon={<RtlSmallLongArrowRightIcon />} onClick={action('Button clicked')} {...rest}>
        Button
      </Wrapped>
      &nbsp;
      <Wrapped loading onClick={action('THIS SHOULD NEVER HAPPEN')} {...rest}>
        Button
      </Wrapped>
      &nbsp;
      <Wrapped disabled onClick={action('THIS SHOULD NEVER HAPPEN')} {...rest}>
        Disabled
      </Wrapped>
      &nbsp;
      <Wrapped
        size={SIZE_TYPES.large}
        onClick={action('Button clicked')}
        {...rest}
      >
        Button
      </Wrapped>
      &nbsp;
      <Wrapped
        loading
        size={SIZE_TYPES.large}
        onClick={action('THIS SHOULD NEVER HAPPEN')}
        {...rest}
      >
        Button
      </Wrapped>
      &nbsp;
      <Wrapped
        size={SIZE_TYPES.large}
        trailingIcon={<RtlLargeLongArrowRightIcon />}
        onClick={action('Button clicked')}
        {...rest}
      >
        Button
      </Wrapped>
      &nbsp;
      <Wrapped
        size={SIZE_TYPES.large}
        leadingIcon={<LargeLightningIcon />}
        onClick={action('Button clicked')}
        {...rest}
      >
        Button
      </Wrapped>
      &nbsp;
      <Wrapped
        size={SIZE_TYPES.large}
        leadingIcon={<LargeLightningIcon />}
        trailingIcon={<RtlLargeLongArrowRightIcon />}
        onClick={action('Button clicked')}
        {...rest}
      >
        Button
      </Wrapped>
      &nbsp;
      <Wrapped
        size={SIZE_TYPES.large}
        disabled
        onClick={action('THIS SHOULD NEVER HAPPEN')}
        {...rest}
      >
        Disabled
      </Wrapped>
      &nbsp;
      <Wrapped
        iconOnly
        onClick={action('Button clicked')}
        aria-label="Button"
        {...rest}
      >
        <AlignedSmallLongArrowRightIcon />
      </Wrapped>
      &nbsp;
      <Wrapped
        loading
        iconOnly
        onClick={action('THIS SHOULD NEVER HAPPEN')}
        aria-label="Loading"
        {...rest}
      >
        <AlignedSmallLongArrowRightIcon />
      </Wrapped>
      &nbsp;
      <Wrapped
        iconOnly
        size={SIZE_TYPES.large}
        onClick={action('Button clicked')}
        aria-label="Button"
        {...rest}
      >
        <AlignedLargeLongArrowRightIcon />
      </Wrapped>
      &nbsp;
      <Wrapped
        loading
        iconOnly
        size={SIZE_TYPES.large}
        onClick={action('THIS SHOULD NEVER HAPPEN')}
        aria-label="Loading"
        {...rest}
      >
        <AlignedLargeLongArrowRightIcon />
      </Wrapped>
      &nbsp;
    </div>
  );
};



const PrimaryExample = (props: any) => (
  <ButtonStory wrapped={BpkButton} {...props} />
);
const PrimaryOnDarkExample = (props: any) => (
  <BpkDarkExampleWrapper>
    <ButtonStory
      type={BUTTON_TYPES.primaryOnDark}
      wrapped={BpkButton}
      {...props}
    />
  </BpkDarkExampleWrapper>
);
const PrimaryOnLightExample = (props: any) => (
  <ButtonStory
    type={BUTTON_TYPES.primaryOnLight}
    wrapped={BpkButton}
    {...props}
  />
);
const SecondaryExample = (props: any) => (
  <ButtonStory type={BUTTON_TYPES.secondary} wrapped={BpkButton} {...props} />
);
const SecondaryOnDarkExample = (props: any) => (
  <BpkDarkExampleWrapper>
    <ButtonStory
      type={BUTTON_TYPES.secondaryOnDark}
      wrapped={BpkButton}
      {...props}
    />
  </BpkDarkExampleWrapper>
);
const DestructiveExample = (props: any) => (
  <ButtonStory
    type={BUTTON_TYPES.destructive}
    wrapped={BpkButton}
    {...props}
  />
);
const FeaturedExample = (props: any) => (
  <ButtonStory type={BUTTON_TYPES.featured} wrapped={BpkButton} {...props} />
);
const LinkExample = (props: any) => (
  <div className={getClassName('bpk-button-story-wrapper')}>
    {/* Default Link */}
    <BpkButton type={BUTTON_TYPES.link} onClick={action('Link clicked')} {...props}>
      Button
    </BpkButton>
    &nbsp;
    {/* Link with trailing icon */}
    <BpkButton type={BUTTON_TYPES.link} trailingIcon={<RtlSmallLongArrowRightIcon />} onClick={action('Link clicked')} {...props}>
      Button
    </BpkButton>
    &nbsp;
    {/* Link with leading icon */}
    <BpkButton type={BUTTON_TYPES.link} leadingIcon={<SmallLightningIcon />} onClick={action('Link clicked')} {...props}>
      Button
    </BpkButton>
    &nbsp;
    {/* Link with leading and trailing icon */}
    <BpkButton type={BUTTON_TYPES.link} leadingIcon={<SmallLightningIcon />} trailingIcon={<RtlSmallLongArrowRightIcon />} onClick={action('Link clicked')} {...props}>
      Button
    </BpkButton>
    &nbsp;
    {/* Loading Link */}
    <BpkButton type={BUTTON_TYPES.link} loading onClick={action('THIS SHOULD NEVER HAPPEN')} {...props}>
      Button
    </BpkButton>
    &nbsp;
    {/* Implicit Link */}
    <BpkButton type={BUTTON_TYPES.link} implicit onClick={action('Link clicked')} {...props}>
      Button
    </BpkButton>
    &nbsp;
    {/* Implicit Link with trailing icon */}
    <BpkButton type={BUTTON_TYPES.link} implicit trailingIcon={<RtlSmallLongArrowRightIcon />} onClick={action('Link clicked')} {...props}>
      Button
    </BpkButton>
    &nbsp;
    {/* Implicit Link with leading icon */}
    <BpkButton type={BUTTON_TYPES.link} implicit leadingIcon={<SmallLightningIcon />} onClick={action('Link clicked')} {...props}>
      Button
    </BpkButton>
    &nbsp;
    {/* Implicit Link with leading and trailing icon */}
    <BpkButton type={BUTTON_TYPES.link} implicit leadingIcon={<SmallLightningIcon />} trailingIcon={<RtlSmallLongArrowRightIcon />} onClick={action('Link clicked')} {...props}>
      Button
    </BpkButton>
    &nbsp;
    {/* Disabled Link */}
    <BpkButton type={BUTTON_TYPES.link} disabled onClick={action('THIS SHOULD NEVER HAPPEN')} {...props}>
      Disabled
    </BpkButton>
    &nbsp;
    {/* Large Link */}
    <BpkButton type={BUTTON_TYPES.link} size={SIZE_TYPES.large} onClick={action('Link clicked')} {...props}>
      Button
    </BpkButton>
    &nbsp;
    {/* Large Link with trailing icon */}
    <BpkButton type={BUTTON_TYPES.link} size={SIZE_TYPES.large} trailingIcon={<RtlLargeLongArrowRightIcon />} onClick={action('Link clicked')} {...props}>
      Button
    </BpkButton>
    &nbsp;
    {/* Large Loading Link */}
    <BpkButton type={BUTTON_TYPES.link} loading size={SIZE_TYPES.large} onClick={action('THIS SHOULD NEVER HAPPEN')} {...props}>
      Button
    </BpkButton>
    &nbsp;
    {/* Large Link with leading icon */}
    <BpkButton type={BUTTON_TYPES.link} size={SIZE_TYPES.large} leadingIcon={<LargeLightningIcon />} onClick={action('Link clicked')} {...props}>
      Button
    </BpkButton>
    &nbsp;
    {/* Large Link with leading and trailing icon */}
    <BpkButton type={BUTTON_TYPES.link} size={SIZE_TYPES.large} leadingIcon={<LargeLightningIcon />} trailingIcon={<RtlLargeLongArrowRightIcon />} onClick={action('Link clicked')} {...props}>
      Button
    </BpkButton>
    &nbsp;
    {/* iconOnly Link */}
    <BpkButton type={BUTTON_TYPES.link} iconOnly onClick={action('Link clicked')} aria-label="Icon link" {...props}>
      <RtlSmallLongArrowRightIcon />
    </BpkButton>
    &nbsp;
    {/* Loading iconOnly Link */}
    <BpkButton type={BUTTON_TYPES.link} loading iconOnly onClick={action('THIS SHOULD NEVER HAPPEN')} aria-label="Loading icon link" {...props}>
      <RtlSmallLongArrowRightIcon />
    </BpkButton>
    &nbsp;
    {/* Large iconOnly Link */}
    <BpkButton type={BUTTON_TYPES.link} iconOnly size={SIZE_TYPES.large} onClick={action('Link clicked')} aria-label="Large icon link" {...props}>
      <RtlLargeLongArrowRightIcon />
    </BpkButton>
    &nbsp;
    {/* Large loading iconOnly Link */}
    <BpkButton type={BUTTON_TYPES.link} loading iconOnly size={SIZE_TYPES.large} onClick={action('THIS SHOULD NEVER HAPPEN')} aria-label="Large loading icon link" {...props}>
      <RtlLargeLongArrowRightIcon />
    </BpkButton>
  </div>
);

const LinkOnDarkExample = (props: any) => (
  <BpkDarkExampleWrapper>
    <div className={getClassName('bpk-button-story-wrapper')}>
      {/* Default LinkOnDark */}
      <BpkButton type={BUTTON_TYPES.linkOnDark} onClick={action('Link clicked')} {...props}>
        Button
      </BpkButton>
      &nbsp;
      {/* LinkOnDark with trailing icon */}
      <BpkButton type={BUTTON_TYPES.linkOnDark} trailingIcon={<RtlSmallLongArrowRightIcon />} onClick={action('Link clicked')} {...props}>
        Button
      </BpkButton>
      &nbsp;
      {/* LinkOnDark with leading icon */}
      <BpkButton type={BUTTON_TYPES.linkOnDark} leadingIcon={<SmallLightningIcon />} onClick={action('Link clicked')} {...props}>
        Button
      </BpkButton>
      &nbsp;
      {/* LinkOnDark with leading and trailing icon */}
      <BpkButton type={BUTTON_TYPES.linkOnDark} leadingIcon={<SmallLightningIcon />} trailingIcon={<RtlSmallLongArrowRightIcon />} onClick={action('Link clicked')} {...props}>
        Button
      </BpkButton>
      &nbsp;
      {/* Loading LinkOnDark */}
      <BpkButton type={BUTTON_TYPES.linkOnDark} loading onClick={action('THIS SHOULD NEVER HAPPEN')} {...props}>
        Button
      </BpkButton>
      &nbsp;
      {/* Implicit LinkOnDark */}
      <BpkButton type={BUTTON_TYPES.linkOnDark} implicit onClick={action('Link clicked')} {...props}>
        Button
      </BpkButton>
      &nbsp;
      {/* Implicit LinkOnDark with trailing icon */}
      <BpkButton type={BUTTON_TYPES.linkOnDark} implicit trailingIcon={<RtlSmallLongArrowRightIcon />} onClick={action('Link clicked')} {...props}>
        Button
      </BpkButton>
      &nbsp;
      {/* Implicit LinkOnDark with leading icon */}
      <BpkButton type={BUTTON_TYPES.linkOnDark} implicit leadingIcon={<SmallLightningIcon />} onClick={action('Link clicked')} {...props}>
        Button
      </BpkButton>
      &nbsp;
      {/* Implicit LinkOnDark with leading and trailing icon */}
      <BpkButton type={BUTTON_TYPES.linkOnDark} implicit leadingIcon={<SmallLightningIcon />} trailingIcon={<RtlSmallLongArrowRightIcon />} onClick={action('Link clicked')} {...props}>
        Button
      </BpkButton>
      &nbsp;
      {/* Disabled LinkOnDark */}
      <BpkButton type={BUTTON_TYPES.linkOnDark} disabled onClick={action('THIS SHOULD NEVER HAPPEN')} {...props}>
        Disabled
      </BpkButton>
      &nbsp;
      {/* Large LinkOnDark */}
      <BpkButton type={BUTTON_TYPES.linkOnDark} size={SIZE_TYPES.large} onClick={action('Link clicked')} {...props}>
        Button
      </BpkButton>
      &nbsp;
      {/* Large LinkOnDark with trailing icon */}
      <BpkButton type={BUTTON_TYPES.linkOnDark} size={SIZE_TYPES.large} trailingIcon={<RtlLargeLongArrowRightIcon />} onClick={action('Link clicked')} {...props}>
        Button
      </BpkButton>
      &nbsp;
      {/* Large Loading LinkOnDark */}
      <BpkButton type={BUTTON_TYPES.linkOnDark} loading size={SIZE_TYPES.large} onClick={action('THIS SHOULD NEVER HAPPEN')} {...props}>
        Button
      </BpkButton>
      &nbsp;
      {/* Large LinkOnDark with leading icon */}
      <BpkButton type={BUTTON_TYPES.linkOnDark} size={SIZE_TYPES.large} leadingIcon={<LargeLightningIcon />} onClick={action('Link clicked')} {...props}>
        Button
      </BpkButton>
      &nbsp;
      {/* Large LinkOnDark with leading and trailing icon */}
      <BpkButton type={BUTTON_TYPES.linkOnDark} size={SIZE_TYPES.large} leadingIcon={<LargeLightningIcon />} trailingIcon={<RtlLargeLongArrowRightIcon />} onClick={action('Link clicked')} {...props}>
        Button
      </BpkButton>
      &nbsp;
      {/* iconOnly LinkOnDark */}
      <BpkButton type={BUTTON_TYPES.linkOnDark} iconOnly onClick={action('Link clicked')} aria-label="Icon link" {...props}>
        <RtlSmallLongArrowRightIcon />
      </BpkButton>
      &nbsp;
      {/* Loading iconOnly LinkOnDark */}
      <BpkButton type={BUTTON_TYPES.linkOnDark} loading iconOnly onClick={action('THIS SHOULD NEVER HAPPEN')} aria-label="Loading icon link" {...props}>
        <RtlSmallLongArrowRightIcon />
      </BpkButton>
      &nbsp;
      {/* Large iconOnly LinkOnDark */}
      <BpkButton type={BUTTON_TYPES.linkOnDark} iconOnly size={SIZE_TYPES.large} onClick={action('Link clicked')} aria-label="Large icon link" {...props}>
        <RtlLargeLongArrowRightIcon />
      </BpkButton>
      &nbsp;
      {/* Large loading iconOnly LinkOnDark */}
      <BpkButton type={BUTTON_TYPES.linkOnDark} loading iconOnly size={SIZE_TYPES.large} onClick={action('THIS SHOULD NEVER HAPPEN')} aria-label="Large loading icon link" {...props}>
        <RtlLargeLongArrowRightIcon />
      </BpkButton>
    </div>
  </BpkDarkExampleWrapper>
);

const FullWidthExample = (props: any) => (
  <BpkButton fullWidth {...props}>
    Full Width Button
  </BpkButton>
);

const SubmitButtonExample = (props: any) => (
  <BpkButton submit {...props}>
    Submit Button
  </BpkButton>
);

const ThemedBorderRadiusExample = () => (
  <BpkThemeProvider theme={{ button: { dimensionRadius: '999px' } }}>
    <PrimaryExample />
  </BpkThemeProvider>
);

const ALL_BUTTON_ROWS: Array<{
  type: (typeof BUTTON_TYPES)[keyof typeof BUTTON_TYPES];
  label: string;
  dark?: boolean;
}> = [
  { type: BUTTON_TYPES.primary, label: 'Primary' },
  { type: BUTTON_TYPES.primaryOnDark, label: 'PrimaryOnDark', dark: true },
  { type: BUTTON_TYPES.primaryOnLight, label: 'PrimaryOnLight' },
  { type: BUTTON_TYPES.secondary, label: 'Secondary' },
  { type: BUTTON_TYPES.secondaryOnDark, label: 'SecondaryOnDark', dark: true },
  { type: BUTTON_TYPES.destructive, label: 'Destructive' },
  { type: BUTTON_TYPES.featured, label: 'Featured' },
  { type: BUTTON_TYPES.linkOnDark, label: 'LinkOnDark', dark: true },
];

const ButtonRow = ({ dark, label, type }: (typeof ALL_BUTTON_ROWS)[number]) => {
  const row = (
    <BpkHStack gap={BpkSpacing.XL} align="center" flexGrow={1}>
      <BpkButton type={type} size={SIZE_TYPES.large} onClick={action('Button clicked')}>
        {label}
      </BpkButton>
      <BpkThemeProvider theme={THEMED_BUTTON_THEME}>
        <BpkButton type={type} size={SIZE_TYPES.large} onClick={action('Button clicked')}>
          {label}
        </BpkButton>
      </BpkThemeProvider>
    </BpkHStack>
  );
  return dark ? (
    <BpkDarkExampleWrapper padded>{row}</BpkDarkExampleWrapper>
  ) : (
    row
  );
};

const ThemedExample = () => (
  <BpkProvider>
    <BpkVStack gap={BpkSpacing.SM}>
      <BpkHStack gap={BpkSpacing.XL}>
        <BpkText textStyle={TEXT_STYLES.caption}>Default</BpkText>
        <BpkText textStyle={TEXT_STYLES.caption}>Themed</BpkText>
      </BpkHStack>
      {ALL_BUTTON_ROWS.map((row) => (
        <ButtonRow key={row.label} {...row} />
      ))}
    </BpkVStack>
  </BpkProvider>
);

const LinksExamples = () => (
  <>
    <LinkExample />
    <LinkOnDarkExample />
  </>
);

const MixedExample = () => (
  <>
    <PrimaryExample />
    <PrimaryOnDarkExample />
    <PrimaryOnLightExample />
    <SecondaryExample />
    <SecondaryOnDarkExample />
    <DestructiveExample />
    <LinkExample />
    <LinkOnDarkExample />
    <FeaturedExample />
    <FullWidthExample />
    <SubmitButtonExample />
  </>
);

const AnchorTagsExample = () => (
  <>
    <PrimaryExample href="#" />
    <PrimaryOnDarkExample href="#" />
    <PrimaryOnLightExample href="#" />
    <SecondaryExample href="#" />
    <SecondaryOnDarkExample href="#" />
    <DestructiveExample href="#" />
    <FeaturedExample href="#" />
    <LinkExample />
    <LinkOnDarkExample />
  </>
);

const meta = {
  title: 'bpk-component-button',
  component: BpkButton,
  parameters: {
    docs: {
      page: () => (
        <>
          <Markdown>{readme}</Markdown>
          <ArgTypes exclude={['zoomEnabled']} />
        </>
      ),
    },
  },
  tags: ['dark-mode-compatible'],
} satisfies Meta;

export default meta;


export const BpkButtonPrimary = {
  render: () => <PrimaryExample />,
};

export const BpkButtonPrimaryOnDark = {
  render: () => <PrimaryOnDarkExample />,
  tags: ['dark-mode-compatible'],
};

export const BpkButtonPrimaryOnLight = {
  render: () => <PrimaryOnLightExample />,
};

export const BpkButtonSecondary = {
  render: () => <SecondaryExample />,
};

export const BpkButtonSecondaryOnDark = {
  render: () => <SecondaryOnDarkExample />,
  tags: ['dark-mode-compatible'],
};

export const BpkButtonDestructive = {
  render: () => <DestructiveExample />,
};

export const BpkButtonFeatured = {
  render: () => <FeaturedExample />,
};

export const BpkButtonLinkButton = {
  render: () => <LinkExample />,
};

export const BpkButtonLinkOnDarkButton = {
  render: () => <LinkOnDarkExample />,
  tags: ['dark-mode-compatible'],
};

export const BpkButtonLinks = {
  render: () => <LinksExamples />,
};

export const Mixture = {
  render: () => <MixedExample />,
};

export const AnchorTags = {
  render: () => <AnchorTagsExample />,
};

export const VisualTest = {
  render: () => <MixedExample />,
};

export const VisualTestWithZoom = {
  render: () => <MixedExample />,
  args: {
    zoomEnabled: true,
  },
};

export const SubmitButton = {
  render: () => <SubmitButtonExample />,
};

export const FullWidth = {
  render: () => <FullWidthExample />,
};

export const ThemedCornerRadius = {
  render: () => <ThemedBorderRadiusExample />,
};

export const Themed = {
  render: () => <ThemedExample />,
  tags: ['dark-mode-compatible'],
};
