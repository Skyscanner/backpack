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

import { Component, type ComponentType } from 'react';

import { updateOnDirectionChange } from '../../bpk-component-rtl-toggle';

import BpkSlider from './BpkSlider';

import type { Meta } from '@storybook/react';

type SliderContainerProps = {
  time?: boolean;
  min: number;
  value: number | number[];
  step?: number;
  minDistance?: number;
};

class SliderContainer extends Component<SliderContainerProps, { value: number | number[] }> {
  constructor(props: SliderContainerProps) {
    super(props);

    this.state = {
      value: props.value || 50,
    };
  }

  handleChange = (value: any) => {
    this.setState({ value });
  };

  valueTimeFormatter = (value: number) => `12:${value.toString().padStart(2, '0')}pm`;

  valueComponent = (min: any, max: any, formatter?: any) => (
    <p>
      {formatter ? formatter(min) : min} - {formatter ? formatter(max) : max}
    </p>
  );

  render() {
    const min = this.props.min || 0;
    const time = !!this.props.time;
    const { value } = this.state;

    return (
      <div>
        {Array.isArray(value)
          ? this.valueComponent(
              value[0],
              value[1],
              time && this.valueTimeFormatter,
            )
          : this.valueComponent(
              min,
              value,
              time && this.valueTimeFormatter,
            )}
        <BpkSlider
          max={time ? 59 : 100}
          step={1}
          onChange={this.handleChange}
          {...this.props}
          min={min}
          value={value}
          ariaLabel={['minimum', 'maximum']}
          ariaValuetext={Array.isArray(value) ? [String(value[0]), String(value[1])] : [String(value), String(value)]}
          inputProps={[{name: 'min'}, {name: 'max'}]}
        />
        <br />
      </div>
    );
  }
}

const EnhancedSlider = updateOnDirectionChange(SliderContainer) as unknown as ComponentType<SliderContainerProps>;

const SimpleSliderExample = () => <EnhancedSlider min={0} value={50} />;
const TimeSliderExample = () => <EnhancedSlider time min={0} value={50} />;
const SimpleSliderWithStepsExample = () => (
  <EnhancedSlider min={0} value={50} step={10} />
);
const RangeSliderExample = () => <EnhancedSlider min={0} value={[20, 80]} />;
const RangeSliderWithMinimumDistanceExample = () => (
  <EnhancedSlider min={0} value={[20, 80]} minDistance={10} />
);

const MixedExample = () => (
  <div>
    <SimpleSliderExample />
    <RangeSliderExample />
  </div>
);

const meta = {
  title: 'bpk-component-slider',
  component: BpkSlider,
} satisfies Meta;

export default meta;

export const SimpleSlider = {
  render: () => <SimpleSliderExample />,
};

export const TimeSlider = {
  render: () => <TimeSliderExample />,
};

export const SimpleSliderWithSteps = {
  render: () => <SimpleSliderWithStepsExample />,
};

export const RangeSlider = {
  render: () => <RangeSliderExample />,
};

export const RangeSliderWithMinimumDistance = {
  render: () => <RangeSliderWithMinimumDistanceExample />,
};

export const VisualTest = {
  render: () => <MixedExample />,
};

export const VisualTestWithZoom = {
  render: () => <MixedExample />,
  args: {
    zoomEnabled: true,
  },
};
