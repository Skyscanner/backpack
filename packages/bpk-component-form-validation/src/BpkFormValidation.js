/*
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2016-2019 Skyscanner Ltd
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
import React from 'react';
import AnimateHeight from 'bpk-animate-height';
import { cssModules } from 'bpk-react-utils';
import BpkSmallExclamationIcon from 'bpk-component-icon/sm/exclamation-circle';
import { withAlignment } from 'bpk-component-icon';
import { lineHeightBase, iconSizeSm } from 'bpk-tokens/tokens/base.es6';

import STYLES from './BpkFormValidation.css';

const getClassName = cssModules(STYLES);
const AlignedExclamationIcon = withAlignment(
  BpkSmallExclamationIcon,
  lineHeightBase,
  iconSizeSm,
);

const BpkFormValidation = props => {
  const {
    children,
    expanded,
    isCheckbox,
    className,
    containerProps,
    ...rest
  } = props;

  const classNames = getClassName(
    'bpk-form-validation',
    expanded && 'bpk-form-validation--appear',
    isCheckbox && 'bpk-form-validation--is-checkbox',
    className,
  );

  return (
    <AnimateHeight
      duration={200}
      height={expanded ? 'auto' : 0}
      transitionOverflow="visible"
      {...containerProps}
    >
      <div className={getClassName('bpk-form-validation__container')}>
        <div className={classNames} {...rest}>
          <AlignedExclamationIcon
            className={getClassName('bpk-form-validation__icon')}
          />
          {children}
        </div>
      </div>
    </AnimateHeight>
  );
};

BpkFormValidation.propTypes = {
  children: PropTypes.node.isRequired,
  id: PropTypes.string.isRequired,
  expanded: PropTypes.bool.isRequired,
  isCheckbox: PropTypes.bool,
  className: PropTypes.string,
  containerProps: PropTypes.object, // eslint-disable-line react/forbid-prop-types
};

BpkFormValidation.defaultProps = {
  isCheckbox: false,
  className: null,
  containerProps: {},
};

export default BpkFormValidation;
