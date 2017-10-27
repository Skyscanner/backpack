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
import React, { Component } from 'react';
import { cssModules } from 'bpk-react-utils';
import BpkAnimateHeight from 'bpk-animate-height';
import { durationSm } from 'bpk-tokens/tokens/base.es6';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';

import STYLES from './animate-and-fade.scss';

const getClassName = cssModules(STYLES);

const animationDuration = parseInt(durationSm, 10);

class AnimateAndFade extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isExpanded: this.props.show,
      visible: this.props.show,
      hideAnimationInProgress: false,
      inDom: true,
    };

    this.onFadeComplete = this.onFadeComplete.bind(this);
    this.onAnimateHeightComplete = this.onAnimateHeightComplete.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.show === this.props.show) {
      return;
    }

    if (this.state.visible && this.state.isExpanded) {
      this.setState({
        hideAnimationInProgress: true,
        visible: false,
      });
    } else if (!this.state.visible && !this.state.isExpanded) {
      this.setState({
        inDom: true,
        isExpanded: true,
        visible: true,
      });
    }
  }

  onAnimateHeightComplete() {
    this.setState(prevState => ({
      inDom: !prevState.hideAnimationInProgress,
      hideAnimationInProgress: false,
    }));
  }

  onFadeComplete() {
    if (!this.state.visible && this.state.hideAnimationInProgress) {
      this.setState({ isExpanded: false });
    }
  }

  render() {
    const {
      children, animateOnEnter, animateOnLeave, className,
    } = this.props;
    const showPlaceholder = !this.state.visible && !this.state.hideAnimationInProgress;

    // While the expanding animation takes place, we render the child element
    // close to invisible. If we don't do this, the animate-height container
    // will take on height 0, and will never expand to allow the children to fade in
    return this.state.inDom ? (
      <BpkAnimateHeight
        className={className}
        onAnimationComplete={this.onAnimateHeightComplete}
        duration={animationDuration}
        height={this.state.isExpanded ? 'auto' : 0}
      >
        {showPlaceholder && (
          <div style={{ opacity: 0.01 }}>
            {children}
          </div>
        )}
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
          transitionLeaveTimeout={animationDuration * 2}
          transitionEnterTimeout={animationDuration * 2}
          transitionAppearTimeout={animationDuration * 2}
          onTransitionEnd={this.onFadeComplete}
        >
          {this.state.visible && children}
        </CSSTransitionGroup>
      </BpkAnimateHeight>
    ) : null;
  }
}

AnimateAndFade.propTypes = {
  animateOnEnter: PropTypes.bool.isRequired,
  animateOnLeave: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
  show: PropTypes.bool.isRequired,
  className: PropTypes.string,
};

AnimateAndFade.defaultProps = {
  className: null,
};

export default AnimateAndFade;
