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

import { cssModules } from 'bpk-react-utils';
import React, { Children, type Element } from 'react';
import PropTypes from 'prop-types';
import { durationSm } from 'bpk-tokens/tokens/base.es6';
import { TransitionGroup, Transition } from 'react-transition-group';
import debounce from 'lodash/debounce';

import { isRTL } from './utils';
import STYLES from './BpkNavigationStack.css';

const getClassName = cssModules(STYLES);

export type Views = Array<Element<any>>;

export type Props = {
  views: Views,
  className: ?string,
};

type Transitions = 'entering' | 'leaving';

type State = {
  transition: ?Transitions,
};

class BpkNavigationStack extends React.Component<Props, State> {
  static propTypes = {
    views: PropTypes.arrayOf(PropTypes.element).isRequired,
    className: PropTypes.string,
  };

  static defaultProps = {
    className: null,
  };

  constructor(props: Props) {
    super(props);
    this.state = {
      transition: null,
    };
  }

  onTransitionEnter = () => this.startTransition('entering');

  onTransitionExit = () => this.startTransition('leaving');

  startTransition = (transition: Transitions) => {
    this.stopTransition.cancel();
    this.setState({ transition });
  };

  stopTransition = debounce(() => {
    this.setState({ transition: null });
  }, parseInt(durationSm, 10) + 10);

  render() {
    const { views, className, ...rest } = this.props;
    const { transition } = this.state;
    const lastIndex = (views || []).length - 1;

    return (
      <div
        className={getClassName('bpk-navigation-stack', className)}
        {...rest}
      >
        <TransitionGroup
          className={getClassName(
            'bpk-navigation-stack__view-track',
            transition &&
              `bpk-navigation-stack__view-track--view-${transition}`,
          )}
          style={{
            transform: `translateX(${
              lastIndex === 0 ? '0%' : `${isRTL() ? '' : '-'}${lastIndex}00%`
            })`,
          }}
        >
          {Children.map(views, (view, idx) => (
            <Transition
              in
              key={idx}
              timeout={parseInt(durationSm, 10)}
              unmountOnExit
              onEnter={this.onTransitionEnter}
              onEntered={this.stopTransition}
              onExit={this.onTransitionExit}
              onExited={this.stopTransition}
            >
              <div
                aria-hidden={idx !== lastIndex}
                className={getClassName(
                  'bpk-navigation-stack__view',
                  idx === lastIndex && 'bpk-navigation-stack__view--current',
                )}
              >
                {view}
              </div>
            </Transition>
          ))}
        </TransitionGroup>
      </div>
    );
  }
}

export default BpkNavigationStack;
