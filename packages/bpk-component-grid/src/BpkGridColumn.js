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

import STYLES from './bpk-grid-column.css';

const getClassName = cssModules(STYLES);

// Number properties compat is low, so we'll stick to the globals
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/isNaN#Browser_compatibility
// eslint-disable-next-line no-restricted-globals
const isNumeric = n => !isNaN(parseFloat(n)) && isFinite(n);

const BpkGridColumn = props => {
  const {
    children,
    width,
    mobileWidth,
    tabletWidth,
    offset,
    mobileOffset,
    tabletOffset,
    padded,
    debug,
    className,
    ...rest
  } = props;

  const classNames = ['bpk-grid__column', `bpk-grid__column--${width}`].map(
    getClassName,
  );

  if (isNumeric(mobileWidth)) {
    classNames.push(getClassName(`bpk-grid__column--mobile-${mobileWidth}`));
  }
  if (isNumeric(tabletWidth)) {
    classNames.push(getClassName(`bpk-grid__column--tablet-${tabletWidth}`));
  }
  if (isNumeric(offset)) {
    classNames.push(getClassName(`bpk-grid__column--offset-${offset}`));
  }
  if (isNumeric(mobileOffset)) {
    classNames.push(
      getClassName(`bpk-grid__column--offset-mobile-${mobileOffset}`),
    );
  }
  if (isNumeric(tabletOffset)) {
    classNames.push(
      getClassName(`bpk-grid__column--offset-tablet-${tabletOffset}`),
    );
  }
  if (padded) {
    classNames.push(getClassName('bpk-grid__column--padded'));
  }
  if (debug) {
    classNames.push(getClassName('bpk-grid__column--debug'));
  }
  if (className) {
    classNames.push(className);
  }

  return (
    <div className={classNames.join(' ')} {...rest}>
      {debug ? (
        <div className={getClassName('bpk-grid__column-debugger')}>
          {children}
        </div>
      ) : (
        children
      )}
    </div>
  );
};

BpkGridColumn.propTypes = {
  children: PropTypes.node.isRequired,
  width: PropTypes.number.isRequired,
  mobileWidth: PropTypes.number,
  tabletWidth: PropTypes.number,
  offset: PropTypes.number,
  mobileOffset: PropTypes.number,
  tabletOffset: PropTypes.number,
  padded: PropTypes.bool,
  debug: PropTypes.bool,
  className: PropTypes.string,
};

BpkGridColumn.defaultProps = {
  mobileWidth: null,
  tabletWidth: null,
  offset: null,
  mobileOffset: null,
  tabletOffset: null,
  padded: true,
  debug: false,
  className: null,
};

export default BpkGridColumn;
