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
import { useState } from 'react';

import { updateOnDirectionChange } from '../../packages/bpk-component-rtl-toggle';
import BpkSlider from '../../packages/bpk-component-slider';

const SliderContainer = (props) => {
  const [value, setValue] = useState(props.value || 50);

  const min = props.min || 0;
  const time = !!props.time;

  const handleChange = (v) => {
    setValue(v);
  };

  const valueTimeFormatter = (v) => `12:${v.toString().padStart(2, '0')}pm`;

  const valueComponent = (mi, ma, formatter) => (
    <p>
      {formatter ? formatter(mi) : mi} - {formatter ? formatter(ma) : ma}
    </p>
  );
  
  return (
    <form>
      <div>
        {value.length
          ? valueComponent(value[0], value[1], time && valueTimeFormatter)
          : valueComponent(min, value, time && valueTimeFormatter)}
        <BpkSlider
          min={min}
          max={time ? 59 : 100}
          step={1}
          onChange={handleChange}
          name="Slider"
          {...props}
          value={value}
          ariaLabel={['minimum', 'maximum']}
          ariaValuetext={[value[0], value[1]]}
          // inputRefs={[inputRef, inputRef2]}
        />
        <br />
      </div>
    </form>
  );
};

SliderContainer.propTypes = {
  time: PropTypes.bool,
  min: PropTypes.number.isRequired,
  value: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.number),
    PropTypes.number,
  ]).isRequired,
};

SliderContainer.defaultProps = {
  time: false,
};

const EnhancedSlider = updateOnDirectionChange(SliderContainer);

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

export {
  SimpleSliderExample,
  TimeSliderExample,
  SimpleSliderWithStepsExample,
  RangeSliderExample,
  RangeSliderWithMinimumDistanceExample,
  MixedExample,
};
