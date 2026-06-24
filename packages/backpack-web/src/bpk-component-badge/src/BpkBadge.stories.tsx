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

// @ts-expect-error Untyped import. See `decisions/imports-ts-suppressions.md`.
import { BpkDarkExampleWrapper } from 'bpk-storybook-utils';

import BpkSmallExclamationIcon from '../../bpk-component-icon/sm/exclamation';
import BpkSmallHelpCircleIcon from '../../bpk-component-icon/sm/help-circle';
import BpkSmallTickIcon from '../../bpk-component-icon/sm/tick-circle';
import { cssModules } from '../../bpk-react-utils';
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

const SubtleExample = () => (
  <BadgeLayout>
    <BpkBadge type={BADGE_TYPES.subtle}>Subtle</BpkBadge>
    &nbsp;
    <BpkBadge type={BADGE_TYPES.subtle}>
      <BpkSmallTickIcon />
      &nbsp;Subtle
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

const ALL_BADGE_ROWS: Array<{
  type: (typeof BADGE_TYPES)[keyof typeof BADGE_TYPES];
  label: string;
  dark?: boolean;
}> = [
  { type: BADGE_TYPES.normal, label: 'Normal' },
  { type: BADGE_TYPES.warning, label: 'Warning' },
  { type: BADGE_TYPES.success, label: 'Success' },
  { type: BADGE_TYPES.critical, label: 'Critical' },
  { type: BADGE_TYPES.strong, label: 'Strong' },
  { type: BADGE_TYPES.brand, label: 'Brand' },
  { type: BADGE_TYPES.inverse, label: 'Inverse', dark: true },
  { type: BADGE_TYPES.outline, label: 'Outline', dark: true },
  { type: BADGE_TYPES.subtle, label: 'Subtle' },
];

const BadgeRow = ({
  dark,
  label,
  type,
}: (typeof ALL_BADGE_ROWS)[number]) => {
  const badge = <BpkBadge type={type}>{label}</BpkBadge>;
  return dark ? (
    <BpkDarkExampleWrapper>
      <BadgeLayout>{badge}</BadgeLayout>
    </BpkDarkExampleWrapper>
  ) : (
    <BadgeLayout>{badge}</BadgeLayout>
  );
};

const ThemedExample = () => (
  <div className={getClassName('bpk-badge-layout__themed-grid')}>
    <div className={getClassName('bpk-badge-layout__themed-col')}>
      <div className={getClassName('bpk-badge-layout__themed-col-label')}>
        Default
      </div>
      {ALL_BADGE_ROWS.map((row) => (
        <BadgeRow key={row.label} {...row} />
      ))}
    </div>
    <BpkThemeProvider
      theme={{
        privateBadgeColourBgDefault: 'rgba(0, 0, 0, 0)',
        privateBadgeDimensionPaddingHorizontalDefault: '0',
      }}
      themeAttributes={[
        'privateBadgeColourBgDefault',
        'privateBadgeDimensionPaddingHorizontalDefault',
      ]}
    >
      <div className={getClassName('bpk-badge-layout__themed-col')}>
        <div className={getClassName('bpk-badge-layout__themed-col-label')}>
          Themed
        </div>
        {ALL_BADGE_ROWS.map((row) => (
          <BadgeRow key={row.label} {...row} />
        ))}
      </div>
    </BpkThemeProvider>
  </div>
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
    <SubtleExample />
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

export const Subtle = {
  render: () => <SubtleExample />,
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

export const Themed = {
  render: () => <ThemedExample />,
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
