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
// @ts-nocheck


import PropTypes from 'prop-types';
import { cloneElement } from 'react';

import { cssModules } from '../../bpk-react-utils';

import STYLES from './BpkSelect.module.scss';

const getClassName = cssModules(STYLES);


const BpkSelect = ({
  className = null,
  disabled = false,
  docked = false,
  dockedFirst = false,
  dockedLast = false,
  dockedMiddle = false,
  image = null,
  large = false,
  valid = null,
  wrapperClassName = null,
  ...rest
}) => {
  // Explicit check for false primitive value as undefined is
  // treated as neither valid nor invalid
  const isInvalid = valid === false;

  const select = (
    // $FlowFixMe[cannot-spread-inexact] - inexact rest. See 'decisions/flowfixme.md'.
    <select
      className={getClassName(
        'bpk-select',
        large && 'bpk-select--large',
        docked && 'bpk-select--docked',
        dockedFirst && 'bpk-select--docked-first',
        dockedMiddle && 'bpk-select--docked-middle',
        dockedLast && 'bpk-select--docked-last',
        isInvalid && 'bpk-select--invalid',
        image && 'bpk-select--with-image',
        image && large && 'bpk-select--with-image-large',
        className,
      )}
      disabled={disabled}
      aria-invalid={isInvalid}
      {...rest}
    />
  );

  if (image) {
    return (
      <div className={getClassName('bpk-select-wrapper', wrapperClassName)}>
        {cloneElement(image, {
          'aria-hidden': true,
          className: getClassName(
            'bpk-select-wrapper__image',
            large && 'bpk-select-wrapper__image--large',
            disabled && 'bpk-select-wrapper__image--disabled',
            image.props.className,
          ),
        })}
        {select}
      </div>
    );
  }
  return select;
};

BpkSelect.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  /**
   * The "value" prop is only relevant if the user is wanting a controlled component
   * In some cases, users may want to create an uncontrolled select as described here: https://beta.reactjs.org/reference/react-dom/components/select
   * In this case value is not required and nor should it be given a default value (as the linter thinks)
   * Prop types are not expressive enough (without a drastic increase in complexity of writing a custom validator) to encode this relationship. Equally, this wouldn't actually solve the linting issue (AFAIK).
   * As a solution, the require-default-props has been disabled for this line.
   */

  value: PropTypes.string,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  docked: PropTypes.bool,
  dockedFirst: PropTypes.bool,
  dockedLast: PropTypes.bool,
  dockedMiddle: PropTypes.bool,
  image: PropTypes.node,
  large: PropTypes.bool,
  valid: PropTypes.bool,
  wrapperClassName: PropTypes.string,
};

export default BpkSelect;
