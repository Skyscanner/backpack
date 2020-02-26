/*
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2016-2020 Skyscanner Ltd
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

import React, { type Node } from 'react';
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

type Props = {
  children: Node,
  href: ?string,
  className: ?string,
  disabled: boolean,
  onClick: ?(event: SyntheticEvent<>) => mixed,
  submit: boolean,
  secondary: boolean,
  destructive: boolean,
  featured: boolean,
  outline: boolean,
  large: boolean,
  link: boolean,
  iconOnly: boolean,
  blank: boolean,
  rel: ?string,
};

const BpkButton = (props: Props) => {
  const {
    children,
    secondary,
    destructive,
    featured,
    outline,
    link,
    ...rest
  } = props;

  if (secondary) {
    return <BpkButtonSecondary {...rest}>{children}</BpkButtonSecondary>;
  }
  if (destructive) {
    return <BpkButtonDestructive {...rest}>{children}</BpkButtonDestructive>;
  }
  if (featured) {
    return <BpkButtonFeatured {...rest}>{children}</BpkButtonFeatured>;
  }
  if (outline) {
    return <BpkButtonOutline {...rest}>{children}</BpkButtonOutline>;
  }
  if (link) {
    return <BpkButtonLink {...rest}>{children}</BpkButtonLink>;
  }
  return <BpkButtonPrimary {...rest}>{children}</BpkButtonPrimary>;
};

BpkButton.propTypes = {
  children: PropTypes.node.isRequired,
  href: PropTypes.string,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  submit: PropTypes.bool,
  secondary: PropTypes.bool,
  destructive: PropTypes.bool,
  featured: PropTypes.bool,
  outline: PropTypes.bool,
  large: PropTypes.bool,
  link: PropTypes.bool,
  iconOnly: PropTypes.bool,
  blank: PropTypes.bool,
  rel: PropTypes.string,
};

BpkButton.defaultProps = {
  href: null,
  className: null,
  disabled: false,
  onClick: null,
  submit: false,
  secondary: false,
  destructive: false,
  featured: false,
  outline: false,
  large: false,
  link: false,
  iconOnly: false,
  blank: false,
  rel: null,
};

export default BpkButton;
