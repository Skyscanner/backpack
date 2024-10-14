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
import {
  forwardRef,
  useRef,
  useEffect,
  type ComponentPropsWithRef,
} from 'react';

import { useComposedRefs } from '@radix-ui/react-compose-refs';
import * as Slider from '@radix-ui/react-slider';
import { usePrevious } from '@radix-ui/react-use-previous';

import { cssModules, isRTL, setNativeValue } from '../../bpk-react-utils';

import STYLES from './BpkSlider.module.scss';

const getClassName = cssModules(STYLES);

export type Props = {
  max: number;
  min: number;
  minDistance?: number;
  step?: number;
  onChange: (value: number[] | number) => void;
  onAfterChange?: (value: number[] | number) => void;
  value: number[] | number;
  ariaLabel: string[];
  ariaValuetext?: string[];
  inputProps?: [{[key: string]: any }] | [{[key: string]: any }, [key: string]: any }];
  [rest: string]: any;
};

const BpkSlider = ({
  ariaLabel,
  ariaValuetext,
  inputProps,
  max,
  min,
  minDistance,
  onAfterChange,
  onChange,
  step,
  value,
  ...rest
}: Props) => {
  const invert = isRTL();
  const currentValue = Array.isArray(value) ? value : [value];

  const processSliderValues = (
    sliderValues: number[],
    callback?: (val: number | number[]) => void,
  ) => {
    const val = sliderValues.length === 1 ? sliderValues[0] : sliderValues;
    if (callback) {
      callback(val);
    }
  };

  const handleOnChange = (sliderValues: number[]) => {
    processSliderValues(sliderValues, onChange);
  };

  const handleOnAfterChange = (sliderValues: number[]) => {
    processSliderValues(sliderValues, onAfterChange);
  };

  return (
    <Slider.Root
      className={getClassName('bpk-slider')}
      defaultValue={currentValue}
      min={min}
      max={max}
      step={step || 1}
      onValueChange={handleOnChange}
      onValueCommit={handleOnAfterChange}
      inverted={invert}
      minStepsBetweenThumbs={minDistance}
      {...rest}
    >
      <Slider.Track className={getClassName('bpk-slider__track')}>
        <Slider.Range className={getClassName('bpk-slider__range')} />
      </Slider.Track>
      {currentValue.map((val, index) => (
        <Slider.Thumb
          key={ariaLabel[index]}
          aria-label={ariaLabel[index]}
          aria-valuetext={ariaValuetext ? ariaValuetext[index] : val.toString()}
          className={getClassName('bpk-slider__thumb')}
          aria-valuenow={currentValue[index]}
          asChild
        >
          {/* custom thumb with child input */}
          <span>
            <BubbleInput value={currentValue[index]} {...(inputProps && inputProps[index])} />
          </span>
        </Slider.Thumb>
      ))}
    </Slider.Root>
  );
};

// Work around until radix-ui/react-slider is updated to accept an inputRef prop https://github.com/radix-ui/primitives/pull/3033
const BubbleInput = forwardRef(
  (props: ComponentPropsWithRef<'input'>, forwardedRef) => {
    const { value, ...inputProps } = props;
    const ref = useRef<HTMLInputElement>();
    const composedRefs = useComposedRefs(forwardedRef, ref);

    const prevValue = usePrevious(value);

    // Bubble value change to parents (e.g form change event)
    useEffect(() => {
      const input = ref.current!;
      if (prevValue !== value) {
        setNativeValue(input, `${value}`);
      }
    }, [prevValue, value]);

    /**
     * We purposefully do not use `type="hidden"` here otherwise forms that
     * wrap it will not be able to access its value via the FormData API.
     *
     * We purposefully do not add the `value` attribute here to allow the value
     * to be set programatically and bubble to any parent form `onChange` event.
     * Adding the `value` will cause React to consider the programatic
     * dispatch a duplicate and it will get swallowed.
     */
    return (
      <input
        style={{ display: 'none' }}
        {...inputProps}
        ref={composedRefs}
        type="number"
        defaultValue={value}
      />
    );
  },
);

export default BpkSlider;
