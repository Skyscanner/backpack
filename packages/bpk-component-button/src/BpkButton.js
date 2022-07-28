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

import React from 'react';
import PropTypes from 'prop-types';

// eslint-disable-next-line import/no-cycle
import {
  BpkButtonPrimary,
  BpkButtonPrimaryOnDark,
  BpkButtonPrimaryOnLight,
  BpkButtonSecondary,
  BpkButtonSecondaryOnDark,
  BpkButtonDestructive,
  BpkButtonLink,
  BpkButtonLinkOnDark,
  BpkButtonFeatured,
  BpkButtonOutline,
} from '../index';

import {
  type Props as CommonProps,
  propTypes,
  defaultProps,
} from './common-types';

type Props = {
  ...CommonProps,
  primaryOnDark: boolean,
  primaryOnLight: boolean,
  secondary: boolean,
  secondaryOnDark: boolean,
  destructive: boolean,
  featured: boolean,
  outline: boolean,
  link: boolean,
  linkOnDark: boolean,
};

const BpkButton = (props: Props) => {
  const {
    destructive,
    featured,
    link,
    linkOnDark,
    outline,
    primaryOnDark,
    primaryOnLight,
    secondary,
    secondaryOnDark,
    ...rest
  } = props;

  if (primaryOnDark) {
    return <BpkButtonPrimaryOnDark {...rest} />;
  }

  if (primaryOnLight) {
    return <BpkButtonPrimaryOnLight {...rest} />;
  }

  if (secondary) {
    return <BpkButtonSecondary {...rest} />;
  }
  if (secondaryOnDark) {
    return <BpkButtonSecondaryOnDark {...rest} />;
  }
  if (destructive) {
    return <BpkButtonDestructive {...rest} />;
  }
  if (featured) {
    return <BpkButtonFeatured {...rest} />;
  }
  if (outline) {
    return <BpkButtonOutline {...rest} />;
  }
  if (link) {
    return <BpkButtonLink {...rest} />;
  }
  if (linkOnDark) {
    return <BpkButtonLinkOnDark {...rest} />;
  }
  return <BpkButtonPrimary {...rest} />;
};

BpkButton.propTypes = {
  ...propTypes,
  primaryOnDark: PropTypes.bool,
  primaryOnLight: PropTypes.bool,
  secondary: PropTypes.bool,
  secondaryOnDark: PropTypes.bool,
  destructive: PropTypes.bool,
  featured: PropTypes.bool,
  outline: PropTypes.bool,
  link: PropTypes.bool,
  linkOnDark: PropTypes.bool,
};

BpkButton.defaultProps = {
  ...defaultProps,
  primaryOnDark: false,
  primaryOnLight: false,
  secondary: false,
  secondaryOnDark: false,
  destructive: false,
  featured: false,
  outline: false,
  link: false,
  linkOnDark: false,
};

export default BpkButton;
