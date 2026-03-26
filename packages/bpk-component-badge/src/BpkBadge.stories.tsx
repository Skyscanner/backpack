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

import type { ReactNode } from 'react';

import {
  coreAccentDay,
  coreEcoDay,
  corePrimaryDay,
  fontSizeBase,
  fontWeightBold,
  lineHeightBase,
  statusDangerFillDay,
  statusDangerSpotDay,
  statusSuccessFillDay,
  statusSuccessSpotDay,
  statusWarningFillDay,
  statusWarningSpotDay,
} from '@skyscanner/bpk-foundations-web/tokens/base.es6';

// @ts-ignore Untyped import. See `decisions/imports-ts-suppressions.md`.
import { BpkDarkExampleWrapper } from '../../../examples/bpk-storybook-utils';
import BpkSmallExclamationIcon from '../../bpk-component-icon/sm/exclamation';
import BpkSmallHelpCircleIcon from '../../bpk-component-icon/sm/help-circle';
import BpkSmallTickIcon from '../../bpk-component-icon/sm/tick-circle';
import { cssModules } from '../../bpk-react-utils';
// @ts-ignore Untyped import. See `decisions/imports-ts-suppressions.md`.
import BpkThemeProvider from '../../bpk-theming';

import BpkBadge, { BADGE_TYPES } from './BpkBadge';

import type { Meta } from '@storybook/react';

import LAYOUT_STYLES from './BpkBadge.stories.module.scss';

const getClassName = cssModules(LAYOUT_STYLES);

type BadgeLayoutProps = {
  docked?: string | null;
  children: ReactNode;
};

const BadgeLayout = ({ children, docked = null }: BadgeLayoutProps) => {
  const classNames = getClassName(
    'bpk-badge-layout__container',
    docked && 'bpk-badge-layout__container--light',
  );

  return <div className={classNames}>{children}</div>;
};

const DefaultExample = () => (
  <BadgeLayout>
    <BpkBadge>Normal</BpkBadge>
    &nbsp;
    <BpkBadge>
      <BpkSmallTickIcon /> &nbsp;Normal
    </BpkBadge>
  </BadgeLayout>
);

const WarningExample = () => (
  <BadgeLayout>
    <BpkBadge type={BADGE_TYPES.warning}>Warning</BpkBadge>
    &nbsp;
    <BpkBadge type={BADGE_TYPES.warning}>
      <BpkSmallHelpCircleIcon /> &nbsp;Warning
    </BpkBadge>
  </BadgeLayout>
);

const SuccessExample = () => (
  <BadgeLayout>
    <BpkBadge type={BADGE_TYPES.success}>Success</BpkBadge>
    &nbsp;
    <BpkBadge type={BADGE_TYPES.success}>
      <BpkSmallTickIcon />
      &nbsp;Success
    </BpkBadge>
  </BadgeLayout>
);

const CriticalExample = () => (
  <BadgeLayout>
    <BpkBadge type={BADGE_TYPES.critical}>Critical</BpkBadge>
    &nbsp;
    <BpkBadge type={BADGE_TYPES.critical}>
      <BpkSmallExclamationIcon />
      &nbsp;Critical
    </BpkBadge>
  </BadgeLayout>
);

const InverseExample = () => (
  <BpkDarkExampleWrapper>
    <BadgeLayout>
      <BpkBadge type={BADGE_TYPES.inverse}>Inverse</BpkBadge>
      &nbsp;
      <BpkBadge type={BADGE_TYPES.inverse}>
        <BpkSmallTickIcon />
        &nbsp;Inverse
      </BpkBadge>
    </BadgeLayout>
  </BpkDarkExampleWrapper>
);

const OutlineExample = () => (
  <BpkDarkExampleWrapper>
    <BadgeLayout>
      <BpkBadge type={BADGE_TYPES.outline}>Outline</BpkBadge>
      &nbsp;
      <BpkBadge type={BADGE_TYPES.outline}>
        <BpkSmallTickIcon />
        &nbsp;Outline
      </BpkBadge>
    </BadgeLayout>
  </BpkDarkExampleWrapper>
);

const StrongExample = () => (
  <BadgeLayout>
    <BpkBadge type={BADGE_TYPES.strong}>Strong</BpkBadge>
    &nbsp;
    <BpkBadge type={BADGE_TYPES.strong}>
      <BpkSmallTickIcon />
      &nbsp;Strong
    </BpkBadge>
  </BadgeLayout>
);

const BrandExample = () => (
  <BadgeLayout>
    <BpkBadge type={BADGE_TYPES.brand}>Brand</BpkBadge>
    &nbsp;
    <BpkBadge type={BADGE_TYPES.brand}>
      <BpkSmallTickIcon />
      &nbsp;Brand
    </BpkBadge>
  </BadgeLayout>
);

const CenteredExample = () => (
  <BadgeLayout>
    <div>
      The badge is aligned to the centre of this text.{' '}
      <BpkBadge centered>Centered</BpkBadge>
    </div>
  </BadgeLayout>
);

const DockedLeadingExample = () => (
  <BadgeLayout docked="left">
    <BpkBadge docked="left">Advert</BpkBadge>
  </BadgeLayout>
);

const DockedTrailingExample = () => (
  <BadgeLayout docked="right">
    <BpkBadge docked="right">Advert</BpkBadge>
  </BadgeLayout>
);

const ThemedCornerRadiusExample = () => (
  <BpkThemeProvider
    theme={{ badgeBorderRadius: '999px' }}
    themeAttributes={['badgeBorderRadius']}
  >
    <BadgeLayout>
      <BpkBadge>Normal</BpkBadge>
      &nbsp;
      <BpkBadge type={BADGE_TYPES.strong}>Strong</BpkBadge>
      &nbsp;
      <BpkBadge type={BADGE_TYPES.brand}>Brand</BpkBadge>
    </BadgeLayout>
  </BpkThemeProvider>
);

const ThemedBackgroundColorExample = () => (
  <BadgeLayout>
    <BpkThemeProvider
      theme={{ badgeNormalBackgroundColor: coreAccentDay }}
      themeAttributes={['badgeNormalBackgroundColor']}
    >
      <BpkBadge type={BADGE_TYPES.normal}>Normal</BpkBadge>
    </BpkThemeProvider>
    &nbsp;
    <BpkThemeProvider
      theme={{ badgeWarningBackgroundColor: statusWarningFillDay }}
      themeAttributes={['badgeWarningBackgroundColor']}
    >
      <BpkBadge type={BADGE_TYPES.warning}>Warning</BpkBadge>
    </BpkThemeProvider>
    &nbsp;
    <BpkThemeProvider
      theme={{ badgeSuccessBackgroundColor: statusSuccessFillDay }}
      themeAttributes={['badgeSuccessBackgroundColor']}
    >
      <BpkBadge type={BADGE_TYPES.success}>Success</BpkBadge>
    </BpkThemeProvider>
    &nbsp;
    <BpkThemeProvider
      theme={{ badgeCriticalBackgroundColor: statusDangerFillDay }}
      themeAttributes={['badgeCriticalBackgroundColor']}
    >
      <BpkBadge type={BADGE_TYPES.critical}>Critical</BpkBadge>
    </BpkThemeProvider>
    &nbsp;
    <BpkThemeProvider
      theme={{ badgeStrongBackgroundColor: corePrimaryDay }}
      themeAttributes={['badgeStrongBackgroundColor']}
    >
      <BpkBadge type={BADGE_TYPES.strong}>Strong</BpkBadge>
    </BpkThemeProvider>
    &nbsp;
    <BpkThemeProvider
      theme={{ badgeBrandBackgroundColor: coreEcoDay }}
      themeAttributes={['badgeBrandBackgroundColor']}
    >
      <BpkBadge type={BADGE_TYPES.brand}>Brand</BpkBadge>
    </BpkThemeProvider>
  </BadgeLayout>
);

const ThemedIconColorExample = () => (
  <BadgeLayout>
    <BpkThemeProvider
      theme={{ badgeNormalIconColor: coreAccentDay }}
      themeAttributes={['badgeNormalIconColor']}
    >
      <BpkBadge type={BADGE_TYPES.normal}>
        <BpkSmallTickIcon />
        &nbsp;Normal
      </BpkBadge>
    </BpkThemeProvider>
    &nbsp;
    <BpkThemeProvider
      theme={{ badgeWarningIconColor: statusWarningSpotDay }}
      themeAttributes={['badgeWarningIconColor']}
    >
      <BpkBadge type={BADGE_TYPES.warning}>
        <BpkSmallHelpCircleIcon />
        &nbsp;Warning
      </BpkBadge>
    </BpkThemeProvider>
    &nbsp;
    <BpkThemeProvider
      theme={{ badgeSuccessIconColor: statusSuccessSpotDay }}
      themeAttributes={['badgeSuccessIconColor']}
    >
      <BpkBadge type={BADGE_TYPES.success}>
        <BpkSmallTickIcon />
        &nbsp;Success
      </BpkBadge>
    </BpkThemeProvider>
    &nbsp;
    <BpkThemeProvider
      theme={{ badgeCriticalIconColor: statusDangerSpotDay }}
      themeAttributes={['badgeCriticalIconColor']}
    >
      <BpkBadge type={BADGE_TYPES.critical}>
        <BpkSmallExclamationIcon />
        &nbsp;Critical
      </BpkBadge>
    </BpkThemeProvider>
  </BadgeLayout>
);

const ThemedTypographyExample = () => (
  <BpkThemeProvider
    theme={{
      badgeFontSize: fontSizeBase,
      badgeFontWeight: fontWeightBold,
      badgeLineHeight: lineHeightBase,
    }}
    themeAttributes={['badgeFontSize', 'badgeFontWeight', 'badgeLineHeight']}
  >
    <BadgeLayout>
      <BpkBadge>Normal</BpkBadge>
      &nbsp;
      <BpkBadge type={BADGE_TYPES.warning}>
        <BpkSmallHelpCircleIcon />
        &nbsp;Warning
      </BpkBadge>
      &nbsp;
      <BpkBadge type={BADGE_TYPES.success}>
        <BpkSmallTickIcon />
        &nbsp;Success
      </BpkBadge>
    </BadgeLayout>
  </BpkThemeProvider>
);

const MixedExample = () => (
  <div>
    <DefaultExample />
    <WarningExample />
    <SuccessExample />
    <CriticalExample />
    <StrongExample />
    <BrandExample />
    <InverseExample />
    <OutlineExample />
  </div>
);

const meta = {
  title: 'bpk-component-badge',
  component: BpkBadge,
} satisfies Meta;

export default meta;


export const Default = {
  render: () => <DefaultExample />,
};

export const Warning = {
  render: () => <WarningExample />,
};

export const Success = {
  render: () => <SuccessExample />,
};

export const Critical = {
  render: () => <CriticalExample />,
};

export const Strong = {
  render: () => <StrongExample />,
};

export const Brand = {
  render: () => <BrandExample />,
};

export const Inverse = {
  render: () => <InverseExample />,
};

export const Outline = {
  render: () => <OutlineExample />,
};

export const Centered = {
  render: () => <CenteredExample />,
};

export const DockedRight = {
  render: () => <DockedTrailingExample />,
};

export const DockedLeft = {
  render: () => <DockedLeadingExample />,
};

export const ThemedCornerRadius = {
  render: () => <ThemedCornerRadiusExample />,
};

export const ThemedBackgroundColor = {
  render: () => <ThemedBackgroundColorExample />,
};

export const ThemedIconColor = {
  render: () => <ThemedIconColorExample />,
};

export const ThemedTypography = {
  render: () => <ThemedTypographyExample />,
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
