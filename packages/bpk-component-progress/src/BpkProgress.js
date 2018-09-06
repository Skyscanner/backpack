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

import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { colorWhite } from 'bpk-tokens/tokens/base.es6';
import clamp from 'lodash.clamp';
import { cssModules } from 'bpk-react-utils';

import STYLES from './bpk-progress.css';

const getClassName = cssModules(STYLES);

const isTransitionEndSupported = () =>
  !!(typeof window !== 'undefined' && 'TransitionEvent' in window);

const renderSteps = (numberOfSteps, stepColor) => {
  const steps = [];
  for (let i = 1; i <= numberOfSteps; i += 1) {
    const left = `${100 * (i / (numberOfSteps + 1))}%`;
    const backgroundColor = stepColor;
    steps.push(
      <div
        key={`bpk-progress__step-${i}`}
        className={getClassName('bpk-progress__step')}
        style={{ left, backgroundColor }}
      />,
    );
  }
  return steps;
};

class BpkProgress extends Component {
  componentDidUpdate(previousProps) {
    const { value, max } = this.props;
    if (value >= max && value !== previousProps.value) {
      this.props.onComplete();

      if (!isTransitionEndSupported() && this.props.onCompleteTransitionEnd) {
        this.props.onCompleteTransitionEnd();
      }
    }
  }

  handleCompleteTransitionEnd = () => {
    const { onCompleteTransitionEnd, value, max } = this.props;
    if (value >= max && onCompleteTransitionEnd) {
      onCompleteTransitionEnd();
    }
  };

  render() {
    const {
      min,
      max,
      value,
      small,
      stepped,
      className,
      getValueText,
      stepColor,
      ...rest
    } = this.props;
    const classNames = [getClassName('bpk-progress')];
    if (className) {
      classNames.push(className);
    }
    if (small) {
      classNames.push(getClassName('bpk-progress--small'));
    }

    const valueClassName = [getClassName('bpk-progress__value')];
    if (stepped) {
      valueClassName.push(getClassName('bpk-progress__value--stepped'));
    }

    const adjustedValue = clamp(value, min, max);
    const percentage = 100 * (adjustedValue / (max - min));
    const numberOfSteps = stepped ? max - min - 1 : 0;

    delete rest.onComplete;
    delete rest.onCompleteTransitionEnd;

    return (
      <div
        className={classNames.join(' ')}
        role="progressbar"
        aria-valuetext={getValueText ? getValueText(value, min, max) : null}
        aria-valuenow={value}
        aria-valuemin={min}
        aria-valuemax={max}
        tabIndex="0"
        {...rest}
      >
        <div
          className={valueClassName.join(' ')}
          style={{ width: `${percentage}%` }}
          onTransitionEnd={this.handleCompleteTransitionEnd}
        />
        {renderSteps(numberOfSteps, stepColor)}
      </div>
    );
  }
}

BpkProgress.propTypes = {
  max: PropTypes.number.isRequired,
  min: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
  stepped: PropTypes.bool,
  stepColor: PropTypes.string,
  small: PropTypes.bool,
  className: PropTypes.string,
  onComplete: PropTypes.func,
  onCompleteTransitionEnd: PropTypes.func,
  getValueText: PropTypes.func,
};

BpkProgress.defaultProps = {
  className: null,
  stepped: false,
  stepColor: colorWhite,
  small: false,
  onComplete: () => null,
  onCompleteTransitionEnd: () => null,
  getValueText: null,
};

export default BpkProgress;
