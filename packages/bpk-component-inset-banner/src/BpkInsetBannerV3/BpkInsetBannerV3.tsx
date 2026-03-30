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

import { forwardRef } from 'react';
import type { ComponentPropsWithoutRef, MouseEvent, ReactNode, Ref } from 'react';

import { cssModules, getDataComponentAttribute } from '../../../bpk-react-utils';

import STYLES from './BpkInsetBannerV3.module.scss';

const getClassName = cssModules(STYLES);

// ─── Body ────────────────────────────────────────────────────────────────────

export type BodyProps = {
  children: ReactNode;
  bleed?: boolean;
  backgroundColor?: string;
};

const Body = ({ backgroundColor, bleed, children }: BodyProps) => (
  <div
    {...getDataComponentAttribute('InsetBannerV3.Body')}
    className={getClassName(
      'bpk-inset-banner-v3__body',
      bleed && 'bpk-inset-banner-v3__body--bleed',
    )}
    style={backgroundColor ? { backgroundColor } : undefined}
  >
    {children}
  </div>
);

Body.displayName = 'BpkInsetBannerV3.Body';

// ─── Root ────────────────────────────────────────────────────────────────────

export type RootProps = Omit<
  ComponentPropsWithoutRef<'div'>,
  'className' | 'style' | 'children'
> & {
  children: ReactNode;
  backgroundColor?: string;
  textVariant?: 'on-light' | 'on-dark';
};

const Root = forwardRef<HTMLDivElement, RootProps>(
  ({ backgroundColor, children, textVariant = 'on-light', ...rest }, ref) => (
    <div
      ref={ref}
      {...getDataComponentAttribute('InsetBannerV3')}
      {...rest}
      className={getClassName(
        'bpk-inset-banner-v3',
        `bpk-inset-banner-v3--${textVariant}`,
      )}
      style={backgroundColor ? { backgroundColor } : undefined}
    >
      {children}
    </div>
  ),
);

Root.displayName = 'BpkInsetBannerV3.Root';

// ─── Header ──────────────────────────────────────────────────────────────────

export type HeaderProps = {
  children: ReactNode;
  layout?: 'horizontal' | 'vertical';
};

const Header = ({ children, layout }: HeaderProps) => (
  <div
    {...getDataComponentAttribute('InsetBannerV3.Header')}
    className={getClassName(
      'bpk-inset-banner-v3__header',
      layout === 'horizontal' && 'bpk-inset-banner-v3__header--horizontal',
      layout === 'vertical' && 'bpk-inset-banner-v3__header--vertical',
    )}
  >
    {children}
  </div>
);

Header.displayName = 'BpkInsetBannerV3.Header';

// ─── LeadingAccessory ────────────────────────────────────────────────────────

export type LeadingAccessoryProps = {
  children: ReactNode;
};

const LeadingAccessory = ({ children }: LeadingAccessoryProps) => (
  <div
    {...getDataComponentAttribute('InsetBannerV3.LeadingAccessory')}
    className={getClassName('bpk-inset-banner-v3__leading-accessory')}
  >
    {children}
  </div>
);

LeadingAccessory.displayName = 'BpkInsetBannerV3.LeadingAccessory';

// ─── Content ─────────────────────────────────────────────────────────────────

export type ContentProps = {
  children: ReactNode;
};

const Content = ({ children }: ContentProps) => (
  <div
    {...getDataComponentAttribute('InsetBannerV3.Content')}
    className={getClassName('bpk-inset-banner-v3__content')}
  >
    {children}
  </div>
);

Content.displayName = 'BpkInsetBannerV3.Content';

// ─── TrailingAccessory ───────────────────────────────────────────────────────

type InteractiveTrailingAccessoryProps = {
  children: ReactNode;
  onClick: (event: MouseEvent<HTMLButtonElement>) => void;
  'aria-label': string;
};

type StaticTrailingAccessoryProps = {
  children: ReactNode;
  onClick?: never;
};

export type TrailingAccessoryProps =
  | InteractiveTrailingAccessoryProps
  | StaticTrailingAccessoryProps;

const TrailingAccessory = forwardRef<HTMLElement, TrailingAccessoryProps>(
  (props, ref) => {
    if ('onClick' in props && props.onClick) {
      const { 'aria-label': ariaLabel, children, onClick } = props as InteractiveTrailingAccessoryProps;
      return (
        <button
          ref={ref as Ref<HTMLButtonElement>}
          type="button"
          aria-label={ariaLabel}
          {...getDataComponentAttribute('InsetBannerV3.TrailingAccessory')}
          className={getClassName('bpk-inset-banner-v3__trailing-accessory', 'bpk-inset-banner-v3__trailing-accessory--interactive')}
          onClick={onClick}
        >
          {children}
        </button>
      );
    }

    const { children } = props;
    return (
      <div
        ref={ref as Ref<HTMLDivElement>}
        {...getDataComponentAttribute('InsetBannerV3.TrailingAccessory')}
        className={getClassName('bpk-inset-banner-v3__trailing-accessory')}
      >
        {children}
      </div>
    );
  },
);

TrailingAccessory.displayName = 'BpkInsetBannerV3.TrailingAccessory';

// ─── Namespace export ─────────────────────────────────────────────────────────

const BpkInsetBannerV3 = {
  Root,
  Header,
  LeadingAccessory,
  Content,
  Body,
  TrailingAccessory,
};

export default BpkInsetBannerV3;
