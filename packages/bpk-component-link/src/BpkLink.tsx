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

import type { ComponentPropsWithoutRef, ElementType, MouseEvent, ReactNode, Ref } from 'react';
import { forwardRef } from 'react';

import { cssModules } from '../../bpk-react-utils';

import themeAttributes, {
  linkAlternateThemeAttributes,
} from './themeAttributes';

import STYLES from './BpkLink.module.scss';

const getClassName = cssModules(STYLES);

/**
 * Polymorphic component types following Chakra UI pattern.
 * Allows BpkLink to be rendered as different HTML elements while
 * preserving proper type inference for element-specific props.
 */

// Supported element types for BpkLink
const LINK_AS = {
  a: 'a',
  button: 'button',
  span: 'span',
  div: 'div',
} as const;

type LinkAs = (typeof LINK_AS)[keyof typeof LINK_AS];

// Base props that are common to all BpkLink variants
type BpkLinkBaseProps = {
  /** The content of the link. */
  children: ReactNode;
  /** Additional CSS class(es) to apply. */
  className?: string | null;
  /** Use alternate (light) styling for dark backgrounds. */
  alternate?: boolean;
  /** Use implicit styling (no underline until hover). */
  implicit?: boolean;
};

// Props specific to anchor elements
type AnchorOnlyProps = {
  /** The URL the link points to. */
  href: string | null;
  /** Opens link in a new tab/window. */
  blank?: boolean;
  /** The relationship between linked and current document. */
  rel?: string | null;
};

// Polymorphic props type that merges base props with element-specific props
type PolymorphicProps<E extends ElementType> = BpkLinkBaseProps & {
  /** The element type to render as. Defaults to 'a'. */
  as?: E;
} & Omit<ComponentPropsWithoutRef<E>, keyof BpkLinkBaseProps | 'as'>;

// Full props type with conditional anchor-specific props
type BpkLinkProps<E extends ElementType = 'a'> = E extends 'a'
  ? Omit<PolymorphicProps<E>, 'href' | 'rel'> & AnchorOnlyProps
  : PolymorphicProps<E>;

// Polymorphic ref type mapping element types to their ref types
type PolymorphicRef<E extends LinkAs> =
  E extends typeof LINK_AS.a ? Ref<HTMLAnchorElement> :
  E extends typeof LINK_AS.button ? Ref<HTMLButtonElement> :
  E extends typeof LINK_AS.span ? Ref<HTMLSpanElement> :
  E extends typeof LINK_AS.div ? Ref<HTMLDivElement> :
  never;

type PolymorphicComponent = <E extends LinkAs = 'a'>(
  props: BpkLinkProps<E> & { ref?: PolymorphicRef<E> }
) => JSX.Element | null;

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
    as,
    children,
    className = null,
    implicit = false,
    ...rest
  }: BpkLinkProps<E>,
  ref: Ref<any>,
) => {
  const Element = as || LINK_AS.a;
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

// Legacy Props type export for backwards compatibility
export type Props = BpkLinkProps<'a'>;

export type { BpkLinkProps, BpkLinkBaseProps, AnchorOnlyProps, LinkAs };
export default BpkLink;
export { LINK_AS, themeAttributes, linkAlternateThemeAttributes };
