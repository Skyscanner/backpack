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

import { Component } from 'react';
import type { ComponentType } from 'react';

import { wrapDisplayName } from '../../bpk-react-utils';

import BpkBannerAlertExpandable from './BpkBannerAlertExpandable';

import type { Props as BpkBannerAlertDismissableProps } from './BpkBannerAlertDismissable';
import type { Props as BpkBannerAlertExpandableProps } from './BpkBannerAlertExpandable';

export type WithBannerAlertStateProps = {
  onHide?: () => void;
  hideAfter?: number;
};

type BpkBannerAlertProps = Partial<
  BpkBannerAlertDismissableProps & BpkBannerAlertExpandableProps
>;

const withBannerAlertState = <P extends BpkBannerAlertProps>(
  WrappedComponent: ComponentType<P>,
) => {
  type State = {
    expanded?: boolean;
    show?: boolean;
  };

  class component extends Component<P & WithBannerAlertStateProps, State> {
    public static displayName: string;

    hideIntervalId?: ReturnType<typeof setTimeout> | null;

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

    constructor(props: P & WithBannerAlertStateProps) {
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
        WrappedComponent !== BpkBannerAlertExpandable &&
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
        <WrappedComponent
          expanded={this.state.expanded}
          onExpandToggle={this.onExpandToggle}
          onDismiss={this.onDismiss}
          show={this.state.show}
          animateOnLeave={(hideAfter && hideAfter > 0) || animateOnLeave}
          {...(rest as P)}
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
