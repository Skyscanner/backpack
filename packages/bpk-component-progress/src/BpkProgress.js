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
import React, { Component } from 'react';
import clamp from 'lodash.clamp';

import { cssModules } from '../../bpk-react-utils';

import STYLES from './BpkProgress.module.scss';

const getClassName = cssModules(STYLES);

const isTransitionEndSupported = () =>
  !!(typeof window !== 'undefined' && 'TransitionEvent' in window);

const renderSteps = (numberOfSteps) => {
  const steps = [];
  for (let i = 1; i <= numberOfSteps; i += 1) {
    const left = `${100 * (i / (numberOfSteps + 1))}%`;
    steps.push(
      <div
        key={`bpk-progress__step-${i}`}
        className={getClassName('bpk-progress__step')}
        style={{ left }}
      />,
    );
  }
  return steps;
};

type Props = {
  max: number,
  min: number,
  value: number,
  stepped: boolean,
  small: boolean,
  className: ?string,
  onComplete: ?() => mixed,
  onCompleteTransitionEnd: ?() => mixed,
  getValueText: ?(number, number, number) => mixed,
};

class BpkProgress extends Component<Props> {
  static propTypes = {
    max: PropTypes.number.isRequired,
    min: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
    stepped: PropTypes.bool,
    small: PropTypes.bool,
    className: PropTypes.string,
    onComplete: PropTypes.func,
    onCompleteTransitionEnd: PropTypes.func,
    getValueText: PropTypes.func,
  };

  static defaultProps = {
    className: null,
    stepped: false,
    small: false,
    onComplete: () => null,
    onCompleteTransitionEnd: () => null,
    getValueText: null,
  };

  componentDidUpdate(previousProps: Props) {
    const { max, value } = this.props;
    if (
      value >= max &&
      value !== previousProps.value &&
      this.props.onComplete
    ) {
      this.props.onComplete();

      if (!isTransitionEndSupported() && this.props.onCompleteTransitionEnd) {
        this.props.onCompleteTransitionEnd();
      }
    }
  }

  handleCompleteTransitionEnd = () => {
    const { max, onCompleteTransitionEnd, value } = this.props;
    if (value >= max && onCompleteTransitionEnd) {
      onCompleteTransitionEnd();
    }
  };

  render() {
    const {
      className,
      getValueText,
      max,
      min,
      small,
      stepped,
      value,
      ...rest
    } = this.props;

    const classNames = getClassName(
      'bpk-progress',
      className,
      small && 'bpk-progress--small',
    );

    const valueClassName = getClassName(
      'bpk-progress__value',
      stepped && 'bpk-progress__value--stepped',
    );

    const adjustedValue = clamp(value, min, max);
    const percentage = 100 * (adjustedValue / (max - min));
    const numberOfSteps = stepped ? max - min - 1 : 0;

    delete rest.onComplete;
    delete rest.onCompleteTransitionEnd;

    return (
      // $FlowFixMe[cannot-spread-inexact] - inexact rest. See 'decisions/flowfixme.md'.
      <div
        className={classNames}
        role="progressbar"
        aria-valuetext={getValueText ? getValueText(value, min, max) : null}
        aria-valuenow={value}
        aria-valuemin={min}
        aria-valuemax={max}
        tabIndex="0"
        {...rest}
      >
        <div
          className={valueClassName}
          style={{ width: `${percentage}%` }}
          onTransitionEnd={this.handleCompleteTransitionEnd}
        />
        {renderSteps(numberOfSteps)}
      </div>
    );
  }
}

export default BpkProgress;
