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

/* This is an internal component to Backpack that powers `BpkInfoBanner`
 * and `BpkInfoBannerExpandable`.
 */

import type { ReactNode, FunctionComponent, SVGProps } from 'react';
// @ts-expect-error Untyped import. See `decisions/imports-ts-suppressions.md`.
import { durationSm } from '@skyscanner/bpk-foundations-web/tokens/base.es6';

import { withButtonAlignment } from '../../bpk-component-icon';
// @ts-expect-error Untyped import. See `decisions/imports-ts-suppressions.md`.
import BpkAnimateHeight from '../../bpk-animate-height';
// @ts-expect-error Untyped import. See `decisions/imports-ts-suppressions.md`.
import BpkCloseButton from '../../bpk-component-close-button';
// @ts-expect-error Untyped import. See `decisions/imports-ts-suppressions.md`.
import TickCircleIcon from '../../bpk-component-icon/sm/tick-circle';
// @ts-expect-error Untyped import. See `decisions/imports-ts-suppressions.md`.
import ChevronDownIcon from '../../bpk-component-icon/lg/chevron-down';
// @ts-expect-error Untyped import. See `decisions/imports-ts-suppressions.md`.
import InfoCircleIcon from '../../bpk-component-icon/sm/information-circle';
import { cssModules } from '../../bpk-react-utils';

import AnimateAndFade from './AnimateAndFade';
import type {
  AlertTypeValue,
  CommonProps,
  OnExpandToggleHandler,
} from './common-types';
import { ALERT_TYPES } from './common-types';
import STYLES from './BpkInfoBanner.module.scss';

const getClassName = cssModules(STYLES);

const ExpandIcon = withButtonAlignment(ChevronDownIcon);

export const CONFIGURATION = {
  NONE: 'none',
  EXPANDABLE: 'expandable',
} as const;

const getIconForType = (
  type: AlertTypeValue,
  CustomIcon?: FunctionComponent<any> | null,
) => {
  const classMap: { [K in AlertTypeValue]: string } = {
    [ALERT_TYPES.SUCCESS]: getClassName('bpk-info-banner__success-icon'),
    [ALERT_TYPES.WARN]: getClassName('bpk-info-banner__warn-icon'),
    [ALERT_TYPES.ERROR]: getClassName('bpk-info-banner__error-icon'),
    [ALERT_TYPES.NEUTRAL]: getClassName('bpk-info-banner__neutral-icon'),
  } as const;
  const className = classMap[type];
  const componentMap: {
    [K in AlertTypeValue]: FunctionComponent<SVGProps<SVGSVGElement>>;
  } = {
    [ALERT_TYPES.SUCCESS]: TickCircleIcon,
    [ALERT_TYPES.WARN]: InfoCircleIcon,
    [ALERT_TYPES.ERROR]: InfoCircleIcon,
    [ALERT_TYPES.NEUTRAL]: InfoCircleIcon,
  } as const;
  const Icon = CustomIcon || componentMap[type];
  const AlignedIcon = withButtonAlignment(Icon);

  return <AlignedIcon className={className} />;
};

type ToggleButtonProps = {
  label?: string;
  expanded: boolean;
};

const ToggleButton = (props: ToggleButtonProps) => {
  const classNames = [getClassName('bpk-info-banner__expand-icon')];
  if (props.expanded) {
    classNames.push(getClassName('bpk-info-banner__expand-icon--flipped'));
  }

  return (
    <button
      type="button"
      className={getClassName('bpk-info-banner__toggle-button')}
      aria-label={props.label}
      aria-expanded={props.expanded}
      title={props.label}
    >
      <ExpandIcon className={classNames.join(' ')} />
    </button>
  );
};

type Props = CommonProps & {
  configuration?: (typeof CONFIGURATION)[keyof typeof CONFIGURATION];

  // Only relevant when configuration == CONFIGURATION.EXPANDABLE
  children?: ReactNode | string;
  expanded?: boolean;
  toggleButtonLabel?: string;
  onExpandToggle?: OnExpandToggleHandler;
};

const BpkInfoBannerInner = ({
  animateOnEnter = false,
  animateOnLeave = false,
  bannerClassName,
  children = null,
  configuration,
  expanded = false,
  icon = null,
  message,
  onExpandToggle = null,
  show = true,
  toggleButtonLabel = '',
  type,
  ...rest
}: Props) => {
  const onBannerExpandToggle = () => {
    if (onExpandToggle) {
      onExpandToggle(!expanded);
    }
  };

  const isExpandable = configuration === CONFIGURATION.EXPANDABLE;
  const showChildren = isExpandable && expanded;

  const headerClassNames = [getClassName('bpk-info-banner__header')];
  const sectionClassNames = [
    'bpk-info-banner',
    `bpk-info-banner--${type}`,
  ].map((sectionClassName) => getClassName(sectionClassName));

  if (bannerClassName) {
    sectionClassNames.push(bannerClassName);
  }

  if (isExpandable) {
    headerClassNames.push(getClassName('bpk-info-banner__header--expandable'));
  }

  /* eslint-disable
    jsx-a11y/no-static-element-interactions,
    jsx-a11y/click-events-have-key-events,
    */
  // Disabling 'click-events-have-key-events and interactive-supports-focus' because header element is not focusable.
  // ToggleButton is focusable and works for this.
  return (
    <AnimateAndFade
      animateOnEnter={animateOnEnter}
      animateOnLeave={animateOnLeave}
      show={show}
      {...rest}
    >
      <section className={sectionClassNames.join(' ')} role="alert">
        <div
          role={isExpandable ? 'button' : undefined}
          className={headerClassNames.join(' ')}
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
        </div>
        <BpkAnimateHeight
          duration={parseInt(durationSm, 10)}
          height={showChildren ? 'auto' : 0}
        >
          <div className={getClassName('bpk-info-banner__children-container')}>
            {children}
          </div>
        </BpkAnimateHeight>
      </section>
    </AnimateAndFade>
  );
  /* eslint-enable */
};

export default BpkInfoBannerInner;
