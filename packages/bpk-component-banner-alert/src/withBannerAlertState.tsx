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

import { Component } from 'react';
import type { ReactNode, ComponentType } from 'react';

// @ts-expect-error Untyped import. See `decisions/imports-ts-suppressions.md`.
import { wrapDisplayName } from '../../bpk-react-utils';

import type { OnDismissHandler, OnExpandToggleHandler } from './common-types';
import BpkBannerAlertExpandable from './BpkBannerAlertExpandable';
import type { Props as BpkBannerAlertExpandableProps } from './BpkBannerAlertExpandable';
import type { Props as BpkBannerAlertDismissableProps } from './BpkBannerAlertDismissable';

type WithBannerAlertStateProps = {
  onHide?: () => void;
  hideAfter?: number | null;
};

type BpkBannerAlertProps = Partial<
  BpkBannerAlertDismissableProps & BpkBannerAlertExpandableProps
>;

const withBannerAlertState = <
  P extends WithBannerAlertStateProps & BpkBannerAlertProps,
>(
  WrappedComponent: ComponentType<P>,
) => {
  type Props = {
    onDismiss?: OnDismissHandler;
    onExpandToggle?: OnExpandToggleHandler;
    expanded?: boolean;
    show?: boolean;
    animateOnLeave?: boolean;
    children?: ReactNode | null;
  };

  type State = {
    expanded?: boolean;
    show?: boolean;
  };

  class component extends Component<P & Props, State> {
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

    constructor(props: P & Props) {
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
        }, (hideAfter as number) * 1000);
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
