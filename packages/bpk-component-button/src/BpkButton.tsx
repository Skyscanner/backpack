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

import BpkButtonBase from './BpkButtonBase';
import { BUTTON_TYPES } from './BpkButtonV2/common-types';
import { defaultProps } from './common-types';

import type { Props as CommonProps } from './common-types';

export type Props = CommonProps & {
  primaryOnDark?: boolean;
  primaryOnLight?: boolean;
  secondary?: boolean;
  secondaryOnDark?: boolean;
  destructive?: boolean;
  featured?: boolean;
  link?: boolean;
  linkOnDark?: boolean;
};

const BpkButton = (props: Props) => {
  const {
    destructive,
    featured,
    link,
    linkOnDark,
    primaryOnDark,
    primaryOnLight,
    secondary,
    secondaryOnDark,
    ...rest
  } = props;

  if (primaryOnDark) {
    return <BpkButtonBase type={BUTTON_TYPES.primaryOnDark} {...rest} />;
  }

  if (primaryOnLight) {
    return <BpkButtonBase type={BUTTON_TYPES.primaryOnDark} {...rest} />;
  }

  if (secondary) {
    return <BpkButtonBase type={BUTTON_TYPES.secondary} {...rest} />;
  }
  if (secondaryOnDark) {
    return <BpkButtonBase type={BUTTON_TYPES.secondaryOnDark} {...rest} />;
  }
  if (destructive) {
    return <BpkButtonBase type={BUTTON_TYPES.destructive} {...rest} />;
  }
  if (featured) {
    return <BpkButtonBase type={BUTTON_TYPES.featured} {...rest} />;
  }
  if (link) {
    return <BpkButtonBase type={BUTTON_TYPES.link} {...rest} />;
  }
  if (linkOnDark) {
    return <BpkButtonBase type={BUTTON_TYPES.linkOnDark} {...rest} />;
  }
  return <BpkButtonBase {...rest} />;
};

BpkButton.defaultProps = {
  ...defaultProps,
  primaryOnDark: false,
  primaryOnLight: false,
  secondary: false,
  secondaryOnDark: false,
  destructive: false,
  featured: false,
  link: false,
  linkOnDark: false,
};

export default BpkButton;
