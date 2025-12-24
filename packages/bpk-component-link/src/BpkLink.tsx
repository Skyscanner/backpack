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

import type { Ref } from 'react';
import { forwardRef } from 'react';

import { cssModules } from '../../bpk-react-utils';

import type {
  BpkLinkProps,
  LinkAs,
  PolymorphicComponent,
} from './common-types';

import STYLES from './BpkLink.module.scss';

const getClassName = cssModules(STYLES);

/**
 * Processes anchor-specific props and returns the transformed props.
 * Handles href, blank (target="_blank"), and rel attributes.
 * @param {Object} props - The props to process.
 * @returns {Object} The transformed anchor props.
 */
const processAnchorProps = (
  props: Record<string, unknown>,
): Record<string, unknown> => {
  const { blank, href, rel, ...otherProps } = props;

  return {
    ...otherProps,
    href: href ?? undefined,
    ...(blank ? { target: '_blank', rel: rel || 'noopener noreferrer' } : {}),
    ...(!blank && rel ? { rel } : {}),
  };
};

/**
 * Processes button-specific props and returns the transformed props.
 * Ensures button has type="button" by default to prevent form submission.
 * @param {Object} props - The props to process.
 * @returns {Object} The transformed button props.
 */
const processButtonProps = (
  props: Record<string, unknown>,
): Record<string, unknown> => ({
  type: 'button',
  ...props, // Allow override if explicitly provided
});

const getClassNames = (
  alternate: boolean,
  implicit: boolean,
  className: string | null,
) => {
  const classNames = [
    getClassName('bpk-link'),
    className,
    implicit && getClassName('bpk-link--implicit'),
    alternate && getClassName('bpk-link--alternate'),
  ].filter(Boolean);

  // Lookup table for underlined modifier based on implicit/alternate combination
  const underlinedModifierMap: Record<string, string> = {
    'true-true': 'bpk-link-underlined-implicit--alternate',
    'true-false': 'bpk-link-underlined--implicit',
    'false-true': 'bpk-link-underlined--alternate',
  };
  const underlinedModifier = underlinedModifierMap[`${implicit}-${alternate}`] || null;

  const underlinedClassNames = [
    getClassName('bpk-link-underlined'),
    underlinedModifier && getClassName(underlinedModifier),
  ].filter(Boolean);

  return {
    linkClassName: classNames.join(' '),
    underlinedClassName: underlinedClassNames.join(' '),
  };
};

const BpkLinkInner = <E extends LinkAs = 'a'>(
  {
    alternate = false,
    as: Element = 'a',
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

  // Process element-specific props based on the rendered element type
  const baseProps = rest as Record<string, unknown>;
  let elementProps = baseProps;
  if (Element === 'a') {
    elementProps = processAnchorProps(baseProps);
  } else if (Element === 'button') {
    elementProps = processButtonProps(baseProps);
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
