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

import { type Node } from 'react';
import PropTypes from 'prop-types';

export type Props = {
  children: Node,
  href: ?string,
  className: ?string,
  disabled: boolean,
  onClick: ?(event: SyntheticEvent<>) => mixed,
  submit: boolean,
  large: boolean,
  iconOnly: boolean,
  blank: boolean,
  rel: ?string,
};

const propTypes = {
  children: PropTypes.node.isRequired,
  href: PropTypes.string,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  submit: PropTypes.bool,
  large: PropTypes.bool,
  iconOnly: PropTypes.bool,
  blank: PropTypes.bool,
  rel: PropTypes.string,
};

const defaultProps = {
  href: null,
  className: null,
  disabled: false,
  onClick: null,
  submit: false,
  large: false,
  iconOnly: false,
  blank: false,
  rel: null,
};

export { propTypes, defaultProps };
