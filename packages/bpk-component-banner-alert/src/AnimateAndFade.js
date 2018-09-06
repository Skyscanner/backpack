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

import PropTypes from 'prop-types';
import React, { type Node, Component } from 'react';
import { cssModules } from 'bpk-react-utils';
import BpkAnimateHeight from 'bpk-animate-height';
import { durationSm } from 'bpk-tokens/tokens/base.es6';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';

import STYLES from './animate-and-fade.css';

const getClassName = cssModules(STYLES);

const ANIMATION_DURATION = parseInt(durationSm, 10);

type Props = {
  animateOnEnter: boolean,
  animateOnLeave: boolean,
  children: Node,
  show: boolean,
  className: ?string,
};

type State = {
  isExpanded: boolean,
  visible: boolean,
  initiateShow: boolean,
  hideAnimationInProgress: boolean,
  inDom: boolean,
};

class AnimateAndFade extends Component<Props, State> {
  toggleImmediately: boolean;

  static propTypes = {
    animateOnEnter: PropTypes.bool,
    animateOnLeave: PropTypes.bool,
    children: PropTypes.node.isRequired,
    show: PropTypes.bool.isRequired,
    className: PropTypes.string,
  };

  static defaultProps = {
    animateOnEnter: false,
    animateOnLeave: false,
    className: null,
  };

  constructor(props: Props) {
    super(props);

    this.toggleImmediately = this.props.show && this.props.animateOnEnter;
    const initiallyShown = this.toggleImmediately ? false : this.props.show;

    this.state = {
      isExpanded: initiallyShown,
      visible: initiallyShown,
      initiateShow: false,
      hideAnimationInProgress: false,
      inDom: initiallyShown,
    };
  }

  componentDidMount() {
    if (this.toggleImmediately) {
      this.toggle();
    }
  }

  componentWillReceiveProps(nextProps: Props) {
    if (nextProps.show === this.props.show) {
      return;
    }
    this.toggle();
  }

  componentDidUpdate() {
    if (this.state.initiateShow) {
      // React doesn't like us calling setState from componentDidUpdate as it can lead to an infinite re-renders.
      // I think it is ok here, however, as this will only happen conditionally (ie once)
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({
        initiateShow: false,
        isExpanded: true,
        visible: true,
      });
    }
  }

  onAnimateHeightComplete = () => {
    if (this.state.isExpanded) {
      return;
    }
    this.setState({
      inDom: false,
      hideAnimationInProgress: false,
    });
  };

  onFadeComplete = () => {
    if (!this.state.visible && this.state.hideAnimationInProgress) {
      this.setState({ isExpanded: false });
    }
  };

  toggle = () => {
    if (this.state.visible && this.state.isExpanded) {
      this.setState({
        hideAnimationInProgress: true,
        visible: false,
      });
    } else if (!this.state.visible && !this.state.isExpanded) {
      this.setState({
        inDom: true,
        initiateShow: true,
      });
    }
  };

  render() {
    const { children, animateOnEnter, animateOnLeave, className } = this.props;
    const showPlaceholder =
      !this.state.visible && !this.state.hideAnimationInProgress;
    // While the expanding animation takes place, we render the child element
    // close to invisible. If we don't do this, the animate-height container
    // will take on height 0, and will never expand to allow the children to fade in
    return this.state.inDom ? (
      <BpkAnimateHeight
        className={className}
        onAnimationComplete={this.onAnimateHeightComplete}
        duration={ANIMATION_DURATION}
        height={this.state.isExpanded ? 'auto' : 0}
      >
        {showPlaceholder && <div style={{ opacity: 0.35 }}>{children}</div>}
        <CSSTransitionGroup
          transitionName={{
            leave: getClassName('bpk-animate-and-fade--leave'),
            leaveActive: getClassName('bpk-animate-and-fade--leave-active'),
            enter: getClassName('bpk-animate-and-fade--enter'),
            enterActive: getClassName('bpk-animate-and-fade--enter-active'),
            appear: getClassName('bpk-animate-and-fade--appear'),
            appearActive: getClassName('bpk-animate-and-fade--appear-active'),
          }}
          transitionLeave={animateOnLeave}
          transitionEnter={animateOnEnter}
          transitionAppear={animateOnEnter}
          transitionLeaveTimeout={ANIMATION_DURATION * 2}
          transitionEnterTimeout={ANIMATION_DURATION * 2}
          transitionAppearTimeout={ANIMATION_DURATION * 2}
          onTransitionEnd={this.onFadeComplete}
        >
          {this.state.visible && children}
        </CSSTransitionGroup>
      </BpkAnimateHeight>
    ) : null;
  }
}

export default AnimateAndFade;
