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

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  as?: 'button';
  children: ReactNode;
};

type AnchorProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  as: 'a';
  href: string;
  children: ReactNode;
  /** Open link in a new tab. Sets target="_blank" and rel="noopener noreferrer". */
  blank?: boolean;
};

type Props = ButtonProps | AnchorProps;

const isAnchorProps = (props: Props): props is AnchorProps => props.as === 'a';

const BpkPressableInner = (
  props: Props,
  ref: Ref<HTMLButtonElement | HTMLAnchorElement>,
) => {
  const sharedClass = getClassName('bpk-pressable');

  if (isAnchorProps(props)) {
    const { as: _as, blank = false, children, href, rel, ...rest } = props;
    const resolvedRel = blank ? rel || 'noopener noreferrer' : rel;
    const target = blank ? '_blank' : undefined;

    return (
      <a
        ref={ref as Ref<HTMLAnchorElement>}
        href={href}
        rel={resolvedRel}
        target={target}
        className={sharedClass}
        {...getDataComponentAttribute('Pressable')}
        {...rest}
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
      className={sharedClass}
      {...getDataComponentAttribute('Pressable')}
      {...rest}
    >
      {children}
    </button>
  );
};

const BpkPressable = forwardRef(BpkPressableInner);

export type { Props as BpkPressableProps };
export default BpkPressable;
