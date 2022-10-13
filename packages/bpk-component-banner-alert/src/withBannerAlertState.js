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

import React, { type Node, type ComponentType, Component } from 'react';
import PropTypes from 'prop-types';

import { wrapDisplayName } from '../../bpk-react-utils';

import {
  type OnDismissHandler,
  type OnExpandToggleHandler,
} from './common-types';
import BpkBannertAlertExpandable from './BpkBannerAlertExpandable';

const withBannerAlertState = (WrappedComponent: ComponentType<any>) => {
  type Props = {
    onDismiss: OnDismissHandler,
    onExpandToggle: OnExpandToggleHandler,
    onHide: ?() => void,
    expanded: boolean,
    show: boolean,
    hideAfter: ?number,
    animateOnLeave: boolean,
    children: Node,
  };

  type State = {
    expanded: boolean,
    show: boolean,
  };

  class component extends Component<Props, State> {
    hideIntervalId: ?TimeoutID;

    static propTypes = {
      onDismiss: PropTypes.func,
      onExpandToggle: PropTypes.func,
      onHide: PropTypes.func,
      expanded: PropTypes.bool,
      show: PropTypes.bool,
      hideAfter: (
        props: Object,
        propName: string,
        componentName: string,
        ...rest: mixed[]
      ) => {
        if (
          WrappedComponent === BpkBannertAlertExpandable &&
          typeof props[propName] === 'number'
        ) {
          return new Error(
            `Invalid prop \`${propName}\` supplied to ${componentName}. \`${propName}\` is not supported for expandable banner alerts.`,
          );
        }

        return PropTypes.number(props, propName, componentName, ...rest);
      },
      animateOnLeave: PropTypes.bool,
      children: PropTypes.node,
    };

    static defaultProps = {
      onDismiss: null,
      onExpandToggle: null,
      onHide: null,
      expanded: false,
      show: true,
      hideAfter: null,
      animateOnLeave: false,
      children: null,
    };

    constructor(props: Props) {
      super(props);

      this.state = {
        expanded: props.expanded,
        show: true,
      };

      this.hideIntervalId = null;
    }

    componentDidMount() {
      const { hideAfter } = this.props;

      if (
        WrappedComponent !== BpkBannertAlertExpandable &&
        hideAfter &&
        hideAfter > 0
      ) {
        this.hideIntervalId = setTimeout(() => {
          this.onHide();
        }, hideAfter * 1000);
      }
    }

    componentWillUnmount() {
      if (this.hideIntervalId) {
        clearTimeout(this.hideIntervalId);
      }
    }

    onExpandToggle = () => {
      this.setState((prevState) => {
        const expanded = !prevState.expanded;

        if (this.props.onExpandToggle) {
          this.props.onExpandToggle(expanded);
        }

        return { expanded };
      });
    };

    onDismiss = () => {
      this.setState({ show: false });

      if (this.props.onDismiss) {
        this.props.onDismiss();
      }
    };

    onHide = () => {
      this.setState({ show: false });

      if (this.props.onHide) {
        this.props.onHide();
      }
    };

    render() {
      const {
        animateOnLeave,
        children,
        expanded,
        hideAfter,
        onDismiss,
        onExpandToggle,
        onHide,
        show,
        ...rest
      } = this.props;

      return (
        // $FlowFixMe[cannot-spread-inexact] - inexact rest. See 'decisions/flowfixme.md'.
        <WrappedComponent
          expanded={this.state.expanded}
          onExpandToggle={this.onExpandToggle}
          onDismiss={this.onDismiss}
          show={this.state.show}
          animateOnLeave={(hideAfter && hideAfter > 0) || animateOnLeave}
          {...rest}
        >
          {children}
        </WrappedComponent>
      );
    }
  }

  component.displayName = wrapDisplayName(
    WrappedComponent,
    'withBannerAlertState',
  );

  return component;
};

export default withBannerAlertState;
