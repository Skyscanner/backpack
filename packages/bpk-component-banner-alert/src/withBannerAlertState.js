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
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { wrapDisplayName } from 'bpk-react-utils';

const withBannerAlertState = WrappedComponent => {
  class component extends Component {
    constructor(props) {
      super(props);

      this.state = {
        expanded: props.expanded,
        show: true,
      };

      this.onExpandToggle = this.onExpandToggle.bind(this);
      this.onDismiss = this.onDismiss.bind(this);
    }

    componentWillMount() {
      const { hideAfter } = this.props;

      if (hideAfter && hideAfter > 0) {
        this.hideIntervalId = setTimeout(() => {
          this.onDismiss();
        }, hideAfter * 1000);
      }
    }

    componentWillUnmount() {
      if (this.hideIntervalId) {
        clearTimeout(this.hideIntervalId);
      }
    }

    onExpandToggle() {
      const expanded = !this.state.expanded;
      this.setState({ expanded });

      if (this.props.onExpandToggle) {
        this.props.onExpandToggle(expanded);
      }
    }

    onDismiss() {
      this.setState({ show: false });

      if (this.props.onDismiss) {
        this.props.onDismiss();
      }
    }

    render() {
      const {
        onDismiss,
        onExpandToggle,
        expanded,
        show,
        hideAfter,
        animateOnLeave,
        children,
        ...rest
      } = this.props;

      return (
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

  component.propTypes = {
    onDismiss: PropTypes.func,
    onExpandToggle: PropTypes.func,
    expanded: PropTypes.bool,
    show: PropTypes.bool,
    hideAfter: PropTypes.number,
    animateOnLeave: PropTypes.bool,
    children: PropTypes.node,
  };

  component.defaultProps = {
    onDismiss: null,
    onExpandToggle: null,
    expanded: false,
    show: true,
    hideAfter: null,
    animateOnLeave: false,
    children: null,
  };

  return component;
};

export default withBannerAlertState;
