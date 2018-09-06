/*
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2018 Skyscanner Ltd
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
/* @flow */

import PropTypes, { type Node } from 'prop-types';
import React from 'react';
import { cssModules } from 'bpk-react-utils';

import STYLES from './bpk-select.css';

const getClassName = cssModules(STYLES);

export type Props = {
  id: string,
  name: string,
  value: string,
  className: ?string,
  disabled: boolean,
  docked: boolean,
  dockedFirst: boolean,
  dockedLast: boolean,
  dockedMiddle: boolean,
  image: ?Node,
  large: boolean,
  valid: ?boolean,
  wrapperClassName: ?string,
};

const BpkSelect = (props: Props) => {
  const {
    className,
    disabled,
    docked,
    dockedFirst,
    dockedLast,
    dockedMiddle,
    image,
    large,
    valid,
    wrapperClassName,
    ...rest
  } = props;

  // Explicit check for false primitive value as undefined is
  // treated as neither valid nor invalid
  const isInvalid = valid === false;

  const select = (
    <select
      className={getClassName(
        'bpk-select',
        large && 'bpk-select--large',
        docked && 'bpk-select--docked',
        dockedFirst && 'bpk-select--docked-first',
        dockedMiddle && 'bpk-select--docked-middle',
        dockedLast && 'bpk-select--docked-last',
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
        {React.cloneElement(image, {
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
  value: PropTypes.string.isRequired,
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

BpkSelect.defaultProps = {
  className: null,
  docked: false,
  dockedFirst: false,
  dockedLast: false,
  dockedMiddle: false,
  disabled: false,
  image: null,
  large: false,
  valid: null,
  wrapperClassName: null,
};

export default BpkSelect;
