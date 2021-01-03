/*
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2016-2021 Skyscanner Ltd
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
  BpkButtonSecondary,
  BpkButtonDestructive,
  BpkButtonLink,
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
  secondary: boolean,
  destructive: boolean,
  featured: boolean,
  outline: boolean,
  link: boolean,
  padded: boolean,
};

const BpkButton = (props: Props) => {
  const {
    secondary,
    destructive,
    featured,
    outline,
    link,
    padded,
    ...rest
  } = props;

  if (secondary) {
    return <BpkButtonSecondary {...rest} />;
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
    // $FlowFixMe[cannot-spread-inexact] - inexact rest. See 'decisions/flowfixme.md'.
    return <BpkButtonLink padded={padded} {...rest} />;
  }
  return <BpkButtonPrimary {...rest} />;
};

BpkButton.propTypes = {
  ...propTypes,
  secondary: PropTypes.bool,
  destructive: PropTypes.bool,
  featured: PropTypes.bool,
  outline: PropTypes.bool,
  padded: PropTypes.bool,
  link: PropTypes.bool,
};

BpkButton.defaultProps = {
  ...defaultProps,
  secondary: false,
  destructive: false,
  featured: false,
  outline: false,
  padded: false,
  link: false,
};

export default BpkButton;
