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

import BpkLink from '../../packages/bpk-component-link/src/BpkLink';

import {
  LinkExample,
  ImplicitLinkExample,
  LinkAlternativeExample,
  LinkAlternativeImplicitExample,
  MixedExample,
  PolymorphicOverviewExample,
} from './examples';

/**
 * Storybook wrapper for BpkLink.
 *
 * This wrapper exists because Storybook's react-docgen-typescript cannot parse
 * polymorphic generic types. The actual BpkLink component (BpkLink)
 * supports full type inference based on the `as` prop.
 *
 * @see https://storybook.js.org/docs/react/api/argtypes#automatic-argtype-inference
 */
type BpkLinkPolymorphicProps = {
  /** The element type to render as. */
  as?: 'a' | 'button' | 'span' | 'div';
  /** The content of the link. */
  children: ReactNode;
  /** The URL the link points to (only when as="a"). */
  href: string | null;
  /** Opens link in a new tab/window (only when as="a"). */
  blank?: boolean;
  /** Use alternate (light) styling for dark backgrounds. */
  alternate?: boolean;
  /** Use implicit styling (no underline until hover). */
  implicit?: boolean;
  /** Additional CSS class(es) to apply. */
  className?: string | null;
};

const BpkLinkPolymorphic = ({
  alternate = false,
  as = 'a',
  blank = false,
  children,
  className = null,
  href,
  implicit = false,
}: BpkLinkPolymorphicProps) => {
  if (as === 'a') {
    return (
      <BpkLink
        as="a"
        href={href}
        blank={blank}
        alternate={alternate}
        implicit={implicit}
        // eslint-disable-next-line @skyscanner/rules/forbid-component-props
        className={className}
      >
        {children}
      </BpkLink>
    );
  }
  return (
    <BpkLink
      as={as}
      alternate={alternate}
      implicit={implicit}
      // eslint-disable-next-line @skyscanner/rules/forbid-component-props
      className={className}
    >
      {children}
    </BpkLink>
  );
};

export default {
  title: 'bpk-component-link',
  component: BpkLinkPolymorphic,
};

// Basic Examples
export const Link = LinkExample;
export const LinkImplicit = ImplicitLinkExample;

// Alternate (Dark Background)
export const Alternate = LinkAlternativeExample;
export const AlternateImplicit = LinkAlternativeImplicitExample;

// Polymorphic "as" Prop Examples
export const PolymorphicOverview = PolymorphicOverviewExample;

// Visual Tests
export const VisualTest = MixedExample;
export const VisualTestWithZoom = {
  render: VisualTest,
  args: {
    zoomEnabled: true,
  },
};
