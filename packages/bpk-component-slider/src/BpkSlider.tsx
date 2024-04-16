/* eslint-disable @skyscanner/rules/forbid-component-props */
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

import * as Slider from '@radix-ui/react-slider';

import { cssModules, isRTL } from '../../bpk-react-utils';

import STYLES from './BpkSlider.module.scss';

const getClassName = cssModules(STYLES);

type Props = {
  max: number
  min: number
  step: number
  onChange: () => void
  onAfterChange: () => void
  value: number[] | number
  ariaLabel: string[]
  ariaValueText: string[]
}

const BpkSlider = ({ariaLabel, ariaValueText, max, min, onAfterChange, onChange, step, value}: Props) => {
  const invert = isRTL();
  const defaultValue = Array.isArray(value) ? value : [value]

  return (
    <Slider.Root
      className={getClassName('bpk-slider')}
      defaultValue={defaultValue}
      min={min}
      max={max}
      step={step}
      onValueChange={onChange}
      onValueCommit={onAfterChange}
      inverted={invert}
    >
      <Slider.Track className={getClassName('bpk-slider__track')}>
        <Slider.Range className={getClassName('bpk-slider__range')} />
      </Slider.Track>
      {defaultValue.map((index) => (
        <Slider.Thumb
          key={ariaLabel[index]}
          aria-label={ariaLabel[index]}
          aria-valuetext={ariaValueText[index]}
          className={getClassName('bpk-slider__thumb')}
        />
      ))}
      </Slider.Root>
    );
};


export default BpkSlider;
