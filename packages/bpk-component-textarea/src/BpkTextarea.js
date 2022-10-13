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

import PropTypes from 'prop-types';
import React from 'react';

import { cssModules } from '../../bpk-react-utils';

import STYLES from './BpkTextarea.module.scss';

const getClassName = cssModules(STYLES);

type Props = {
  id: string,
  name: string,
  value: string,
  className: ?string,
  valid: ?boolean,
  large: ?boolean,
};

const BpkTextarea = (props: Props) => {
  const { className, large, valid, ...rest } = props;

  // Explicit check for false primitive value as undefined is
  // treated as neither valid nor invalid
  const isInvalid = valid === false;

  return (
    // $FlowFixMe[cannot-spread-inexact] - inexact rest. See decisions/flowfixme.md
    <textarea
      className={getClassName(
        'bpk-textarea',
        isInvalid && 'bpk-textarea--invalid',
        large && 'bpk-textarea--large',
        className,
      )}
      aria-invalid={isInvalid}
      {...rest}
    />
  );
};

BpkTextarea.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  className: PropTypes.string,
  valid: PropTypes.bool,
  large: PropTypes.bool,
};

BpkTextarea.defaultProps = {
  className: null,
  valid: null,
  large: false,
};

export default BpkTextarea;
