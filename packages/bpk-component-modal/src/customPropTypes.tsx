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

type ModalProps = {
  showHeader?: boolean;
  title?: string;
  onClose?: () => void;
  [key: string]: unknown;
};

export const titlePropType = (
  props: ModalProps,
  propName: string,
  componentName: string,
): Error | null => {
  const titleValue = props[propName];

  if (props.showHeader && (!titleValue || typeof titleValue !== 'string')) {
    return new Error(
      `Invalid prop \`${propName}\` supplied to \`${componentName}\`. There must be a title if showHeader is true.`,
    );
  }

  return null;
};

export const onClosePropType = (
  props: ModalProps,
  propName: string,
  componentName: string,
): Error | null => {
  const onCloseValue = props[propName];

  if (
    props.showHeader &&
    (!onCloseValue || typeof onCloseValue !== 'function')
  ) {
    return new Error(
      `Invalid prop \`${propName}\` supplied to \`${componentName}\`. There must an onClose handler if showHeader is true.`,
    );
  }

  return null;
};
