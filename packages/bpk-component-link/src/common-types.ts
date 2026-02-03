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
// @ts-nocheck

import type { ComponentPropsWithoutRef, ElementType, ReactNode, Ref } from 'react';

/**
 * Polymorphic component types following Chakra UI pattern.
 * Allows BpkLink to be rendered as different HTML elements while
 * preserving proper type inference for element-specific props.
 */

/** Supported element types for BpkLink */
export type LinkAs = 'a' | 'button' | 'span' | 'div';

/** Base props that are common to all BpkLink variants */
export type BpkLinkBaseProps = {
  /** The content of the link. */
  children: ReactNode;
  /** Additional CSS class(es) to apply. */
  className?: string | null;
  /** Use alternate (light) styling for dark backgrounds. */
  alternate?: boolean;
  /** Use implicit styling (no underline until hover). */
  implicit?: boolean;
};

/** Props specific to anchor elements */
export type AnchorOnlyProps = {
  /** The URL the link points to. */
  href: string | null;
  /** Opens link in a new tab/window. */
  blank?: boolean;
  /** The relationship between linked and current document. */
  rel?: string | null;
};

/** Props for the `as` prop */
type AsProps<E extends ElementType> = {
  /** The element type to render as. Defaults to 'a'. */
  as?: E;
};

/** Polymorphic props type that merges base props with element-specific props */
type PolymorphicProps<E extends ElementType> =
  BpkLinkBaseProps &
  AsProps<E> &
  Omit<ComponentPropsWithoutRef<E>, keyof BpkLinkBaseProps | 'as'>;

/** Full props type with conditional anchor-specific props */
export type BpkLinkProps<E extends ElementType = 'a'> = E extends 'a'
  ? Omit<PolymorphicProps<E>, 'href' | 'rel'> & AnchorOnlyProps
  : PolymorphicProps<E>;

/** Polymorphic ref type mapping element types to their ref types */
export type PolymorphicRef<E extends LinkAs> =
  E extends 'a' ? Ref<HTMLAnchorElement> :
  E extends 'button' ? Ref<HTMLButtonElement> :
  E extends 'span' ? Ref<HTMLSpanElement> :
  E extends 'div' ? Ref<HTMLDivElement> :
  never;

/** Polymorphic component type for BpkLink */
export type PolymorphicComponent = <E extends LinkAs = 'a'>(
  props: BpkLinkProps<E> & { ref?: PolymorphicRef<E> }
) => JSX.Element | null;
