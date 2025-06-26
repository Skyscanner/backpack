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

import PropTypes from 'prop-types';
import { Component } from 'react';

import { updateOnDirectionChange } from '../../packages/bpk-component-rtl-toggle';
import BpkSlider from '../../packages/bpk-component-slider';

class SliderContainer extends Component {
  constructor(props: any) {
    // @ts-expect-error TS(2554) FIXME: Expected 1-2 arguments, but got 0.
    super();

    this.state = {
      value: props.value || 50,
    };
  }

  handleChange = (value: any) => {
    this.setState({ value });
  };

  valueTimeFormatter = (value: any) => `12:${value.toString().padStart(2, '0')}pm`;

  valueComponent = (min: any, max: any, formatter: any) => (
    <p>
      {formatter ? formatter(min) : min} - {formatter ? formatter(max) : max}
    </p>
  );

  render() {
    // @ts-expect-error TS(2339) FIXME: Property 'min' does not exist on type 'Readonly<{}... Remove this comment to see the full error message
    const min = this.props.min || 0;
    // @ts-expect-error TS(2339) FIXME: Property 'time' does not exist on type 'Readonly<{... Remove this comment to see the full error message
    const time = !!this.props.time;

    return (
      <div>
        {
        // @ts-expect-error TS(2339) FIXME: Property 'time' does not exist on type 'Readonly<{... Remove this comment to see the full error message
        this.state.value.length
          ? this.valueComponent(
              // @ts-expect-error TS(2339) FIXME: Property 'value' does not exist on type 'Readonly<... Remove this comment to see the full error message
              this.state.value[0],
              // @ts-expect-error TS(2339) FIXME: Property 'value' does not exist on type 'Readonly<... Remove this comment to see the full error message
              this.state.value[1],
              time && this.valueTimeFormatter,
            )
          : this.valueComponent(
              min,
              // @ts-expect-error TS(2339) FIXME: Property 'value' does not exist on type 'Readonly<... Remove this comment to see the full error message
              this.state.value,
              time && this.valueTimeFormatter,
            )}
        <BpkSlider
          min={min}
          max={time ? 59 : 100}
          step={1}
          onChange={this.handleChange}
          {...this.props}
          // @ts-expect-error TS(2339) FIXME: Property 'value' does not exist on type 'Readonly<... Remove this comment to see the full error message
          value={this.state.value}
          ariaLabel={['minimum', 'maximum']}
          // @ts-expect-error TS(2339) FIXME: Property 'value' does not exist on type 'Readonly<... Remove this comment to see the full error message
          ariaValuetext={[this.state.value[0], this.state.value[1]]}
          inputProps={[{name: 'min'}, {name: 'max'}]}
        />
        <br />
      </div>
    );
  }
}

// @ts-expect-error TS(2339) FIXME: Property 'propTypes' does not exist on type 'typeo... Remove this comment to see the full error message
SliderContainer.propTypes = {
  time: PropTypes.bool,
  min: PropTypes.number.isRequired,
  value: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.number),
    PropTypes.number,
  ]).isRequired,
};

// @ts-expect-error TS(2339) FIXME: Property 'defaultProps' does not exist on type 'ty... Remove this comment to see the full error message
SliderContainer.defaultProps = {
  time: false,
};

const EnhancedSlider = updateOnDirectionChange(SliderContainer);

// @ts-expect-error TS(2769) FIXME: No overload matches this call.
const SimpleSliderExample = () => <EnhancedSlider min={0} value={50} />;
// @ts-expect-error TS(2769) FIXME: No overload matches this call.
const TimeSliderExample = () => <EnhancedSlider time min={0} value={50} />;
const SimpleSliderWithStepsExample = () => (
  // @ts-expect-error TS(2769) FIXME: No overload matches this call.
  <EnhancedSlider min={0} value={50} step={10} />
);
// @ts-expect-error TS(2769) FIXME: No overload matches this call.
const RangeSliderExample = () => <EnhancedSlider min={0} value={[20, 80]} />;
const RangeSliderWithMinimumDistanceExample = () => (
  // @ts-expect-error TS(2769) FIXME: No overload matches this call.
  <EnhancedSlider min={0} value={[20, 80]} minDistance={10} />
);

const MixedExample = () => (
  <div>
    <SimpleSliderExample />
    <RangeSliderExample />
  </div>
);

export {
  SimpleSliderExample,
  TimeSliderExample,
  SimpleSliderWithStepsExample,
  RangeSliderExample,
  RangeSliderWithMinimumDistanceExample,
  MixedExample,
};
