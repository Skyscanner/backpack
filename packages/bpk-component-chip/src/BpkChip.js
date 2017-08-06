/*
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2017 Skyscanner Ltd
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
import { cssModules } from 'bpk-react-utils';
import BpkCloseButton from 'bpk-component-close-button';
import BpkLink from 'bpk-component-link';

import STYLES from './bpk-chip.scss';

const getClassName = cssModules(STYLES);

const BpkChip = (props) => {
  const { children, onClose, href, className, ...rest } = props;

  const chipClassNames = [getClassName('bpk-chip')];
  if (className) { chipClassNames.push(className); }

  // TODO SHOULD WE COMBINE THESE TOO????
  const labelClassNames = [getClassName('bpk-chip__label')];
  if (className) { labelClassNames.push(className); }

  return (
    <div
      className={chipClassNames.join(' ')}
      {...rest}
    >
      {href
        ? <BpkLink href={href} className={labelClassNames.join(' ')} >
          {children}
        </BpkLink>
        : <span className={labelClassNames.join(' ')} >
          {children}
        </span>
      }
      <BpkCloseButton
        label={`close ${children.toString().toLowerCase()}`}
        onClick={onClose}
      />
    </div>
  );
};

BpkChip.propTypes = {
  children: PropTypes.node.isRequired,
  onClose: PropTypes.func.isRequired,
  href: PropTypes.string,
  className: PropTypes.string,
};

BpkChip.defaultProps = {
  href: null,
  className: null,
};

export default BpkChip;
