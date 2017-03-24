import React, { Component, PropTypes } from 'react';
import clamp from 'lodash.clamp';

import './bpk-progress.scss';

const isTransitionEndSupported = () => !!(typeof window !== 'undefined' && 'TransitionEvent' in window);

const renderGaps = (noGaps) => {
  const gaps = [];
  for (let i = 1; i <= noGaps; i += 1) {
    const left = `${100 * (i / (noGaps + 1))}%`;
    gaps.push(<div className="bpk-progress__gap" style={{ left }} />);
  }
  return gaps;
};

class BpkProgress extends Component {
  constructor() {
    super();

    this.handleCompleteTransitionEnd = this.handleCompleteTransitionEnd.bind(this);
  }

  componentDidUpdate(previousProps) {
    const { value, max } = this.props;
    if (value >= max && value !== previousProps.value) {
      this.props.onComplete();

      if (!isTransitionEndSupported()) {
        this.onCompleteTransitionEnd();
      }
    }
  }

  handleCompleteTransitionEnd() {
    const { onCompleteTransitionEnd, value, max } = this.props;
    if (value >= max && onCompleteTransitionEnd) {
      onCompleteTransitionEnd();
    }
  }

  render() {
    const {
      min,
      max,
      value,
      small,
      stepped,
      className,
      getValueText,
      ...rest
    } = this.props;
    const classNames = ['bpk-progress'];
    if (className) { classNames.push(className); }
    if (small) { classNames.push('bpk-progress--small'); }

    const adjustedValue = clamp(value, min, max);
    const percentage = 100 * (adjustedValue / (max - min));
    const noGaps = stepped ? (max - min - 1) : 0;

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
          className="bpk-progress__value"
          style={{ width: `${percentage}%` }}
          onTransitionEnd={this.handleCompleteTransitionEnd}
        />
        { renderGaps(noGaps) }
      </div>
    );
  }
}

BpkProgress.propTypes = {
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

BpkProgress.defaultProps = {
  className: null,
  stepped: false,
  small: false,
  onComplete: () => null,
  onCompleteTransitionEnd: () => null,
  getValueText: null,
};

export default BpkProgress;
