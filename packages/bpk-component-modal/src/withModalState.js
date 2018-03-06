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

import React, { type Node, type ComponentType, Component } from 'react';
import PropTypes from 'prop-types';

import { wrapDisplayName } from 'bpk-react-utils';

const withModalState = (WrappedComponent: ComponentType<any>) => {
  type Props = {
    target: Node,
    children: Node,
    onOpen: ?() => void,
    onClose: ?() => void,
  };

  type State = {
    isOpen: boolean,
  };

  class component extends Component<Props, State> {
    static propTypes = {
      target: PropTypes.node.isRequired,
      children: PropTypes.node.isRequired,
      onOpen: PropTypes.func,
      onClose: PropTypes.func,
      isOpen: PropTypes.bool,
    };

    static defaultProps = {
      onOpen: null,
      onClose: null,
      isOpen: false,
    };

    constructor(props: Props) {
      super(props);

      this.state = {
        isOpen: false,
      };
    }

    onOpen = () => {
      this.setState({ isOpen: true });

      if (this.props.onOpen) {
        this.props.onOpen();
      }
    };

    onClose = () => {
      this.setState({ isOpen: false });

      if (this.props.onClose) {
        this.props.onClose();
      }
    };

    render() {
      const { target, children, isOpen, onClose, ...rest } = this.props;

      /* eslint-disable jsx-a11y/click-events-have-key-events */
      return (
        <span>
          <span onClick={this.onOpen} role="button" tabIndex="0">
            {target}
          </span>
          <WrappedComponent
            isOpen={this.state.isOpen}
            onClose={this.onClose}
            {...rest}
          >
            {children}
          </WrappedComponent>
        </span>
      );
      /* eslint-enable jsx-a11y/click-events-have-key-events */
    }
  }

  component.displayName = wrapDisplayName(WrappedComponent, 'withModalState');

  return component;
};

export default withModalState;
