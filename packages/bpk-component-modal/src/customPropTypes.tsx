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

/* @flow strict */

export const titlePropType = (
  props: Object,
  propName: string,
  componentName: string,
// @ts-expect-error TS(8020) FIXME: JSDoc types can only be used inside documentation ... Remove this comment to see the full error message
): ?Error => {
  // @ts-expect-error TS(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
  const titleValue = props[propName];

  // @ts-expect-error TS(2339) FIXME: Property 'showHeader' does not exist on type 'Obje... Remove this comment to see the full error message
  if (props.showHeader && (!titleValue || typeof titleValue !== 'string')) {
    return new Error(
      `Invalid prop \`${propName}\` supplied to \`${componentName}\`. There must be a title if showHeader is true.`,
    );
  }

  return null;
};

export const onClosePropType = (
  props: Object,
  propName: string,
  componentName: string,
// @ts-expect-error TS(8020) FIXME: JSDoc types can only be used inside documentation ... Remove this comment to see the full error message
): ?Error => {
  // @ts-expect-error TS(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
  const onCloseValue = props[propName];

  if (
    // @ts-expect-error TS(2339) FIXME: Property 'showHeader' does not exist on type 'Obje... Remove this comment to see the full error message
    props.showHeader &&
    (!onCloseValue || typeof onCloseValue !== 'function')
  ) {
    return new Error(
      `Invalid prop \`${propName}\` supplied to \`${componentName}\`. There must an onClose handler if showHeader is true.`,
    );
  }

  return null;
};
