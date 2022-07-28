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
import React, { type Node, type AbstractComponent } from 'react';

import wrapDisplayName from './wrapDisplayName';

type Props = {
  children: ?Node,
  className: ?string,
};

type DefaultProps = {
  className?: ?string,
};

const withDefaultProps = (
  WrappedComponent: AbstractComponent<any>,
  defaultProps: DefaultProps,
) => {
  const { className: defaultClassName, ...defaultRest } = defaultProps;

  const component = (props: Props) => {
    const { children, className: innerClassName, ...rest } = props;
    const classNames = [];

    if (defaultClassName) {
      classNames.push(defaultClassName);
    }
    if (innerClassName) {
      classNames.push(innerClassName);
    }

    return (
      // $FlowFixMe[cannot-spread-inexact] - inexact rest. See 'decisions/flowfixme.md'.
      <WrappedComponent
        className={classNames.join(' ')}
        {...defaultRest}
        {...rest}
      >
        {children}
      </WrappedComponent>
    );
  };

  component.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
  };
  component.defaultProps = {
    children: null,
    className: null,
  };

  component.displayName = wrapDisplayName(WrappedComponent, 'withDefaultProps');

  return component;
};

export default withDefaultProps;
