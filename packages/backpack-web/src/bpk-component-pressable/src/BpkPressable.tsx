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
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode, Ref } from 'react';

import { cssModules, getDataComponentAttribute } from '../../bpk-react-utils';

import STYLES from './BpkPressable.module.scss';

const getClassName = cssModules(STYLES);

type ButtonProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'className' | 'style'> & {
  as?: 'button';
  children: ReactNode;
};

type AnchorProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'className' | 'style'> & {
  as: 'a';
  href: string;
  children: ReactNode;
  /** Open link in a new tab. Sets target="_blank" and rel="noopener noreferrer". */
  blank?: boolean;
  /**
   * Marks the anchor as non-interactive: removes href (no navigation), sets
   * aria-disabled="true", removes from tab order, and suppresses onClick —
   * the click event does not bubble to parent handlers.
   */
  disabled?: boolean;
};

type Props = ButtonProps | AnchorProps;

const isAnchorProps = (props: Props): props is AnchorProps => props.as === 'a';

const BpkPressableInner = (
  props: Props,
  ref: Ref<HTMLButtonElement | HTMLAnchorElement>,
) => {
  const sharedClass = getClassName('bpk-pressable');

  if (isAnchorProps(props)) {
    const {
      'aria-disabled': ariaDisabled,
      as: _as,
      blank = false,
      children,
      disabled = false,
      href,
      onClick,
      rel,
      role,
      tabIndex,
      target,
      ...rest
    } = props;

    const resolvedAriaDisabled = disabled ? true : ariaDisabled;
    // href removed when disabled so the browser cannot navigate;
    // role="link" restores the semantic lost when <a> has no href.
    const resolvedHref = disabled ? undefined : href;
    // Always include noopener noreferrer when blank=true; merge with consumer rel if provided.
    const resolvedRel = blank
      ? [rel, 'noopener noreferrer'].filter(Boolean).join(' ')
      : rel;
    const resolvedRole = disabled ? 'link' : role;
    const resolvedTabIndex = disabled ? -1 : tabIndex;
    const targetFromBlank = blank ? '_blank' : target;
    const resolvedTarget = disabled ? undefined : targetFromBlank;

    type AnchorClick = AnchorHTMLAttributes<HTMLAnchorElement>['onClick'];
    // When disabled, consumer's onClick is not called and the click does not
    // bubble — consistent with native <button disabled> behaviour.
    const handleClick: AnchorClick = disabled
      ? (e) => {
          e?.preventDefault();
          e?.stopPropagation();
        }
      : onClick;

    return (
      <a
        ref={ref as Ref<HTMLAnchorElement>}
        href={resolvedHref}
        rel={resolvedRel}
        role={resolvedRole}
        tabIndex={resolvedTabIndex}
        target={resolvedTarget}
        aria-disabled={resolvedAriaDisabled}
        onClick={handleClick}
        {...rest}
        className={sharedClass}
        {...getDataComponentAttribute('Pressable')}
      >
        {children}
      </a>
    );
  }

  const { as: _as, children, disabled = false, ...rest } = props;

  return (
    <button
      ref={ref as Ref<HTMLButtonElement>}
      type="button"
      disabled={disabled}
      {...rest}
      className={sharedClass}
      {...getDataComponentAttribute('Pressable')}
    >
      {children}
    </button>
  );
};

const BpkPressable = forwardRef(BpkPressableInner);

export type { Props as BpkPressableProps };
export default BpkPressable;
