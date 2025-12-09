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

import type { ReactNode, MouseEvent, AnchorHTMLAttributes } from 'react';
import { forwardRef } from 'react';

import { cssModules } from '../../bpk-react-utils';

import themeAttributes, {
  linkAlternateThemeAttributes,
} from './themeAttributes';

import STYLES from './BpkLink.module.scss';

const getClassName = cssModules(STYLES);

export interface Props extends AnchorHTMLAttributes<HTMLAnchorElement> {
  children: ReactNode;
  href: string;
  className?: string;
  onClick?: (event: MouseEvent<HTMLAnchorElement>) => void;
  blank?: boolean;
  rel?: string;
  alternate?: boolean;
  implicit?: boolean;
}

const BpkLink = forwardRef<HTMLAnchorElement, Props>(
  (
    {
      alternate = false,
      blank = false,
      children,
      className,
      href,
      implicit = false,
      onClick,
      rel: propRel,
      ...rest
    },
    ref,
  ) => {
    const classNames = [getClassName('bpk-link')];
    const underlinedClassNames = [getClassName('bpk-link-underlined')];

    const target = blank ? '_blank' : undefined;
    const rel = blank ? propRel || 'noopener noreferrer' : propRel;

    if (className) {
      classNames.push(className);
    }
    if (implicit) {
      classNames.push(getClassName('bpk-link--implicit'));
    }
    if (alternate) {
      classNames.push(getClassName('bpk-link--alternate'));
    }

    if (implicit && !alternate) {
      underlinedClassNames.push(getClassName('bpk-link-underlined--implicit'));
    } else if (alternate && !implicit) {
      underlinedClassNames.push(getClassName('bpk-link-underlined--alternate'));
    } else if (implicit && alternate) {
      underlinedClassNames.push(
        getClassName('bpk-link-underlined-implicit--alternate'),
      );
    }

    return (
      <a
        className={classNames.join(' ')}
        href={href}
        onClick={onClick}
        target={target}
        rel={rel}
        ref={ref}
        {...rest}
      >
        <span className={underlinedClassNames.join(' ')}>{children}</span>
      </a>
    );
  },
);

export default BpkLink;
export { themeAttributes, linkAlternateThemeAttributes };
