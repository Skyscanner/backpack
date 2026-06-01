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

import { Component, type HTMLAttributes } from 'react';

import clamp from 'lodash.clamp';

import { cssModules } from '../../bpk-react-utils';

import STYLES from './BpkProgress.module.scss';

const getClassName = cssModules(STYLES);

const isTransitionEndSupported = () =>
  !!(typeof window !== 'undefined' && 'TransitionEvent' in window);

const renderSteps = (numberOfSteps: number) => {
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

type NativeDivProps = HTMLAttributes<HTMLDivElement>;

export type Props = Omit<NativeDivProps, 'className'> & {
  max: number;
  min: number;
  value: number;
  stepped?: boolean;
  small?: boolean;
  className?: string | null;
  onComplete?: (() => unknown) | null;
  onCompleteTransitionEnd?: (() => unknown) | null;
  getValueText?: ((value: number, min: number, max: number) => string) | null;
};

class BpkProgress extends Component<Props> {
  static defaultProps = {
    className: null,
    stepped: false,
    small: false,
    onComplete: () => null,
    onCompleteTransitionEnd: () => null,
    getValueText: null,
  };

  componentDidUpdate(previousProps: Props) {
    const {
      max,
      onComplete = () => null,
      onCompleteTransitionEnd,
      value,
    } = this.props;
    if (value >= max && value !== previousProps.value) {
      onComplete?.();

      if (!isTransitionEndSupported() && onCompleteTransitionEnd) {
        onCompleteTransitionEnd();
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
      className = null,
      getValueText = null,
      max,
      min,
      onComplete,
      onCompleteTransitionEnd,
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

    return (
      <div
        className={classNames}
        role="progressbar"
        aria-valuetext={
          getValueText ? getValueText(value, min, max) : undefined
        }
        aria-valuenow={value}
        aria-valuemin={min}
        aria-valuemax={max}
        tabIndex={0}
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
