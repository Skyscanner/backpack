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

import PropTypes from 'prop-types';
import React from 'react';
import { cssModules } from 'bpk-react-utils';

import STYLES from './bpk-card.css';

const getClassName = cssModules(STYLES);

const BpkCard = props => {
  const classNames = [getClassName('bpk-card')];
  const { children, className, href, padded, blank, ...rest } = props;

  if (padded) {
    classNames.push(getClassName('bpk-card--padded'));
  }
  if (className) {
    classNames.push(className);
  }

  const classNameFinal = classNames.join(' ');

  if (href) {
    let blankProps = {};

    if (blank) {
      blankProps = { target: '_blank', rel: 'noopener noreferrer' };
    }

    return (
      <a href={href} className={classNameFinal} {...blankProps} {...rest}>
        {children}
      </a>
    );
  }

  return (
    <div role="button" className={classNameFinal} {...rest}>
      {children}
    </div>
  );
};

BpkCard.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  href: PropTypes.string,
  padded: PropTypes.bool,
  blank: PropTypes.bool,
};

BpkCard.defaultProps = {
  className: null,
  href: null,
  padded: true,
  blank: false,
};

export default BpkCard;
