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
import PropTypes from 'prop-types';

import BpkButtonBase, { BUTTON_TYPES } from './BpkButtonBase';
import {
  type Props as CommonProps,
  propTypes,
} from './common-types';

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

/**
 * @deprecated BpkButton is deprecated and will be removed in a future major version. Please use BpkButtonV2 instead.
 * @param {Props} props - Component props
 * @returns {JSX.Element} Button component
 */
const BpkButton = ({
  destructive = false,
  featured = false,
  link = false,
  linkOnDark = false,
  primaryOnDark = false,
  primaryOnLight = false,
  secondary = false,
  secondaryOnDark = false,
  ...rest
}: Props) => {
  if (primaryOnDark) {
    return <BpkButtonBase type={BUTTON_TYPES.primaryOnDark} {...rest} />;
  }

  if (primaryOnLight) {
    return <BpkButtonBase type={BUTTON_TYPES.primaryOnLight} {...rest} />;
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

BpkButton.propTypes = {
  ...propTypes,
  primaryOnDark: PropTypes.bool,
  primaryOnLight: PropTypes.bool,
  secondary: PropTypes.bool,
  secondaryOnDark: PropTypes.bool,
  destructive: PropTypes.bool,
  featured: PropTypes.bool,
  link: PropTypes.bool,
  linkOnDark: PropTypes.bool,
};

export default BpkButton;
