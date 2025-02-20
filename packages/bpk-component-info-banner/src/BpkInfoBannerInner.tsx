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

/* This is an internal component to Backpack that powers `BpkInfoBanner`,
 * `BpkInfoBannerDismissable` and `BpkInfoBannerExpandable`.
 */

import type { ReactNode, FunctionComponent, SVGProps } from 'react';

import { durationSm } from '@skyscanner/bpk-foundations-web/tokens/base.es6';

// @ts-expect-error Untyped import. See `decisions/imports-ts-suppressions.md`.
import BpkAnimateHeight from '../../bpk-animate-height';
// @ts-expect-error Untyped import. See `decisions/imports-ts-suppressions.md`.
import BpkCloseButton from '../../bpk-component-close-button';
import { withButtonAlignment } from '../../bpk-component-icon';
import ChevronDownIcon from '../../bpk-component-icon/sm/chevron-down';
import ChevronUpIcon from '../../bpk-component-icon/sm/chevron-up';
import InfoCircleIcon from '../../bpk-component-icon/sm/information-circle';
import TickCircleIcon from '../../bpk-component-icon/sm/tick-circle';
// @ts-expect-error Untyped import. See `decisions/imports-ts-suppressions.md`.
import BpkLink from '../../bpk-component-link';
import { cssModules } from '../../bpk-react-utils';

import AnimateAndFade from './AnimateAndFade';
import { ALERT_TYPES, STYLE_TYPES } from './common-types';

import type {
  AlertTypeValue,
  CommonProps,
  OnDismissHandler,
  OnExpandToggleHandler,
  ExpandableBannerAction,
} from './common-types';

import STYLES from './BpkInfoBanner.module.scss';

const getClassName = cssModules(STYLES);

const ExpandIcon = withButtonAlignment(ChevronDownIcon);
const CollapseIcon = withButtonAlignment(ChevronUpIcon);

export const CONFIGURATION = {
  NONE: 'none',
  DISMISSABLE: 'dismissable',
  EXPANDABLE: 'expandable',
} as const;

const getIconForType = (
  type: AlertTypeValue,
  CustomIcon?: FunctionComponent<any> | null,
) => {
  const classMap: { [K in AlertTypeValue]: string } = {
    [ALERT_TYPES.SUCCESS]: getClassName('bpk-info-banner__success-icon'),
    [ALERT_TYPES.WARNING]: getClassName('bpk-info-banner__warning-icon'),
    [ALERT_TYPES.ERROR]: getClassName('bpk-info-banner__error-icon'),
    [ALERT_TYPES.INFO]: getClassName('bpk-info-banner__info-icon'),
  } as const;
  const className = classMap[type];
  const componentMap: {
    [K in AlertTypeValue]: FunctionComponent<SVGProps<SVGSVGElement>>;
  } = {
    [ALERT_TYPES.SUCCESS]: TickCircleIcon,
    [ALERT_TYPES.WARNING]: InfoCircleIcon,
    [ALERT_TYPES.ERROR]: InfoCircleIcon,
    [ALERT_TYPES.INFO]: InfoCircleIcon,
  } as const;
  const Icon = CustomIcon || componentMap[type];
  const AlignedIcon = withButtonAlignment(Icon);

  return <div className={className}><AlignedIcon/></div>;
};

type ToggleButtonProps = {
  label?: string;
  expanded: boolean;
};

const ToggleButton = (props: ToggleButtonProps) => (
    <div
      className={getClassName('bpk-info-banner__toggle-button')}
      title={props.label}
    >
      {props.expanded ? <CollapseIcon /> : <ExpandIcon />}
    </div>
  );

type Props = CommonProps & {
  action?: ExpandableBannerAction;
  configuration?: (typeof CONFIGURATION)[keyof typeof CONFIGURATION];

  // Only relevant when configuration == CONFIGURATION.EXPANDABLE
  children?: ReactNode | string;
  expanded?: boolean;
  toggleButtonLabel?: string;
  onExpandToggle?: OnExpandToggleHandler;

  // Only relevant when configuration == CONFIGURATION.DISMISSABLE
  dismissButtonLabel?: string;
  onDismiss?: OnDismissHandler;
};

const BpkInfoBannerInner = ({
  action = null,
  animateOnEnter = false,
  animateOnLeave = false,
  bannerClassName,
  children = null,
  configuration,
  dismissButtonLabel = '',
  expanded = false,
  icon = null,
  message,
  onDismiss = null,
  onExpandToggle = null,
  show = true,
  style = STYLE_TYPES.DEFAULT,
  toggleButtonLabel = '',
  type = ALERT_TYPES.INFO,
  ...rest
}: Props) => {
  const onBannerExpandToggle = () => {
    if (onExpandToggle) {
      onExpandToggle(!expanded);
    }
  };

  const onBannerDismiss = () => {
    if (onDismiss) {
      onDismiss();
    }
  };

  const isExpandable = configuration === CONFIGURATION.EXPANDABLE;
  const dismissable = configuration === CONFIGURATION.DISMISSABLE;
  const showChildren = isExpandable && expanded;

  const sectionClassNames = getClassName(
    'bpk-info-banner',
   `bpk-info-banner--${type}`,
   `bpk-info-banner--style-${style}`,
   bannerClassName && bannerClassName
   );

  const headerClassNames = getClassName(
    'bpk-info-banner__header',
    isExpandable && 'bpk-info-banner__header--expandable'
  );

  const childrenContainerClassName = action && isExpandable
    ? getClassName('bpk-info-banner__children-container--with-action')
    : getClassName('bpk-info-banner__children-container--no-action')

  const BannerHeader = isExpandable ? 'button' : 'div';

  // Disabling 'click-events-have-key-events and interactive-supports-focus' because header element is not focusable.
  // ToggleButton is focusable and works for this.
  return (
    <AnimateAndFade
      animateOnEnter={animateOnEnter}
      animateOnLeave={dismissable || animateOnLeave}
      show={show}
      {...rest}
    >
      <section className={sectionClassNames} role="presentation">
        <BannerHeader
          aria-label={isExpandable ? toggleButtonLabel : undefined}
          aria-expanded={isExpandable ? expanded : undefined}
          // BannerHeader is just <button> or <div>, so className should be allowed.
          // eslint-disable-next-line @skyscanner/rules/forbid-component-props
          className={headerClassNames}
          onClick={onBannerExpandToggle}
        >
          <span className={getClassName('bpk-info-banner__icon')}>
            {getIconForType(type, icon)}
          </span>
          <span className={getClassName('bpk-info-banner__message')}>
            {message}
          </span>
          {isExpandable && (
            <span className={getClassName('bpk-info-banner__toggle')}>
              <ToggleButton expanded={expanded} label={toggleButtonLabel} />
            </span>
          )}
          {dismissable && (
            <span className={getClassName('bpk-info-banner__toggle')}>
              <BpkCloseButton
                onClick={onBannerDismiss}
                aria-label={dismissButtonLabel}
                label={dismissButtonLabel}
              />
            </span>
          )}
        </BannerHeader>
        <BpkAnimateHeight
          duration={parseInt(durationSm, 10)}
          height={showChildren ? 'auto' : 0}
        >
          <div className={childrenContainerClassName}>
            {children}
          </div>
          {isExpandable && action && (
            <BpkLink
              onClick={action.callback}
            >
              {action.title}
            </BpkLink>
          )}
        </BpkAnimateHeight>
      </section>
    </AnimateAndFade>
  );

};

export default BpkInfoBannerInner;
