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

const withTextStyle = (WrappedComponent, textStyle, tagName, className = null) => {
  const component = (props) => {
    const { children, className: innerClassName, ...rest } = props;
    const classNames = [];

    if (className) { classNames.push(className); }
    if (innerClassName) { classNames.push(innerClassName); }

    return (
      <WrappedComponent
        textStyle={textStyle}
        tagName={tagName}
        className={classNames.join(' ')}
        {...rest}
      >
        {children}
      </WrappedComponent>
    );
  };

  component.propTypes = {
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
  };
  component.defaultProps = {
    className: null,
  };
  const inputDisplayName = WrappedComponent.displayName || WrappedComponent.name || 'Text';
  component.displayName = `withTextStyle(${inputDisplayName})`;

  return component;
};

export default withTextStyle;
