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

import type { MouseEvent, Ref } from 'react';
import { forwardRef } from 'react';

import { cssModules } from '../../bpk-react-utils';

import { LINK_AS } from './common-types';

import type {
  AnchorOnlyProps,
  BpkLinkProps,
  LinkAs,
  PolymorphicComponent,
} from './common-types';

import STYLES from './BpkLink.module.scss';

const getClassName = cssModules(STYLES);

const getClassNames = (
  alternate: boolean,
  implicit: boolean,
  className: string | null,
) => {
  const classNames = [getClassName('bpk-link')];
  const underlinedClassNames = [getClassName('bpk-link-underlined')];

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

  return {
    linkClassName: classNames.join(' '),
    underlinedClassName: underlinedClassNames.join(' '),
  };
};

const BpkLinkInner = <E extends LinkAs = 'a'>(
  {
    alternate = false,
    as: Element = LINK_AS.a,
    children,
    className = null,
    implicit = false,
    ...rest
  }: BpkLinkProps<E>,
  ref: Ref<any>,
) => {
  const { linkClassName, underlinedClassName } = getClassNames(
    alternate,
    implicit,
    className,
  );

  // Handle anchor-specific props
  const elementProps: Record<string, unknown> = { ...rest };

  if (Element === LINK_AS.a) {
    const anchorProps = rest as unknown as AnchorOnlyProps & {
      onClick?: (event: MouseEvent) => void;
    };
    const { blank, href, rel: propRel } = anchorProps;

    elementProps.href = href ?? undefined;
    if (blank) {
      elementProps.target = '_blank';
      elementProps.rel = propRel || 'noopener noreferrer';
    } else if (propRel) {
      elementProps.rel = propRel;
    }

    // Remove anchor-only props that were processed
    delete elementProps.blank;
  }

  // Handle button-specific defaults
  if (Element === LINK_AS.button) {
    // Ensure button has a type to prevent form submission
    if (!('type' in elementProps)) {
      elementProps.type = 'button';
    }
  }

  return (
    // Allowed: className and ref are passed to the underlying DOM element
    // eslint-disable-next-line @skyscanner/rules/forbid-component-props
    <Element className={linkClassName} ref={ref} {...elementProps}>
      <span className={underlinedClassName}>{children}</span>
    </Element>
  );
};

// A polymorphic link component that can render as different HTML elements.
const BpkLink = forwardRef(BpkLinkInner) as PolymorphicComponent;

export default BpkLink;
