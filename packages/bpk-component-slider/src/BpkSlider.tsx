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
  useCallback,
  type ComponentPropsWithRef,
  type RefObject,
} from 'react';

import { useComposedRefs } from '@radix-ui/react-compose-refs';
import * as Slider from '@radix-ui/react-slider';

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
  inputProps?:
    | [{ [key: string]: any }]
    | [{ [key: string]: any }, { [key: string]: any }];
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

  // Track the latest value and callback for the Chrome workaround
  // Using refs to avoid re-registering document event listeners when these change
  const latestValueRef = useRef<number[]>(currentValue);
  const onAfterChangeRef = useRef(onAfterChange);
  const isDraggingRef = useRef(false);
  const hasCommittedRef = useRef(false);
  // Store cleanup function to prevent memory leaks if component unmounts during drag
  const cleanupRef = useRef<(() => void) | null>(null);

  // Keep refs updated
  useEffect(() => {
    latestValueRef.current = currentValue;
  }, [currentValue]);

  useEffect(() => {
    onAfterChangeRef.current = onAfterChange;
  }, [onAfterChange]);

  // Cleanup on unmount to prevent memory leaks
  useEffect(() => () => {
      if (cleanupRef.current) {
        cleanupRef.current();
      }
    }, []);

  const processSliderValues = useCallback(
    (
      sliderValues: number[],
      callback?: (val: number | number[]) => void,
    ) => {
      const val = sliderValues.length === 1 ? sliderValues[0] : sliderValues;
      if (callback) {
        callback(val);
      }
    },
    [],
  );

  const thumbRefs = [useRef(null), useRef(null)];

  const handleOnChange = useCallback(
    (sliderValues: number[]) => {
      latestValueRef.current = sliderValues;
      processSliderValues(sliderValues, onChange);
    },
    [onChange, processSliderValues],
  );

  const handleOnAfterChange = useCallback(
    (sliderValues: number[]) => {
      hasCommittedRef.current = true;
      isDraggingRef.current = false;
      processSliderValues(sliderValues, onAfterChange);
    },
    [onAfterChange, processSliderValues],
  );

  // Chrome workaround: Listen for pointerup/pointercancel on document as safety net
  // This ensures onAfterChange fires even when Radix's onValueCommit doesn't
  // See: https://github.com/radix-ui/primitives/issues/1760
  const handlePointerDown = useCallback(() => {
    // Clean up any previous listener still hanging around (edge case)
    if (cleanupRef.current) {
      cleanupRef.current();
    }

    isDraggingRef.current = true;
    hasCommittedRef.current = false;

    const handlePointerEnd = () => {
      document.removeEventListener('pointerup', handlePointerEnd);
      document.removeEventListener('pointercancel', handlePointerEnd);
      cleanupRef.current = null;

      // Use requestAnimationFrame to defer the check, allowing Radix's onValueCommit
      // to fire first and set hasCommittedRef.current = true. This prevents the race
      // condition where both handlers could fire onAfterChange for the same interaction.
      requestAnimationFrame(() => {
        if (isDraggingRef.current && !hasCommittedRef.current && onAfterChangeRef.current) {
          // Radix didn't fire onValueCommit, so we fire it manually
          processSliderValues(latestValueRef.current, onAfterChangeRef.current);
        }
        isDraggingRef.current = false;
        hasCommittedRef.current = false;
      });
    };

    cleanupRef.current = handlePointerEnd;
    document.addEventListener('pointerup', handlePointerEnd);
    document.addEventListener('pointercancel', handlePointerEnd);
  }, [processSliderValues]);

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
          ref={thumbRefs[index]}
          onPointerDown={handlePointerDown}
          asChild
        >
          {/* custom thumb with child input */}
          <span>
            <BubbleInput
              value={currentValue[index]}
              thumbRef={thumbRefs[index]}
              {...(inputProps && inputProps[index])}
            />
          </span>
        </Slider.Thumb>
      ))}
    </Slider.Root>
  );
};

// Work around until radix-ui/react-slider is updated to accept an inputRef prop https://github.com/radix-ui/primitives/pull/3033
const BubbleInput = forwardRef(
  (
    props: ComponentPropsWithRef<'input'> & {
      thumbRef: RefObject<HTMLElement>;
    },
    forwardedRef,
  ) => {
    const { thumbRef, value, ...inputProps } = props;
    const ref = useRef<HTMLInputElement>();
    const composedRefs = useComposedRefs(forwardedRef, ref);

    // This Hook Provides the native behaviour that the input range type would have around the "change" event.
    // When a user changes the value of the slider. The change event is emitted.
    useEffect(() => {
      // for tests to work the ref is passed into the useEffect rather than the variable of ref.current.
      const thumb = thumbRef.current;
      const input = ref.current;
      // thumb should be rendered before adding any eventListeners
      if (thumb) {
        // The interactionEndHandler is used to ensure that the input value is updated
        // and change event fired when the user stops interacting with the thumb
        const interactionEndHandler = (
          event: MouseEvent | KeyboardEvent | TouchEvent,
        ) => {
          if (
            input &&
            // if it's a mouse event, touch event or arrow key event
            ((event as MouseEvent).button > -1 ||
              (event as TouchEvent).touches?.length > -1 ||
              ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(
                (event as KeyboardEvent).key,
              ))
          ) {
            // parseFloat works for both integers and floats and the Slider supports decimal stepping. e.g. 0 - 1
            const newValue = parseFloat(input.getAttribute('value') as string);
            if (value !== newValue) {
              // newValue is changed if the slider has moved, clicking away from the thumb will not fire the change event
              setNativeValue(input, newValue);
            }
          }
        };

        // the focusInHandler is used to add event listeners to the document when the thumb is in focus
        // Allows us to track at which moment the user focuses on the thumb
        const focusInHandler = () => {
          // The Controller is needed as we may click more than once when in focus (clicking along the line of slider to move the thumb to that position).
          const controller = new AbortController();
          // On focusout we can then abort the event listeners attached to the thumb and document
          thumb.addEventListener('focusout', () => controller.abort(), {
            once: true, // not necessary to fire more than once and will restart on the next focusin
          });

          // These three EventListeners signal the end of the interaction with the thumb
          document.addEventListener('click', interactionEndHandler, {
            // needed on document as users can drag the thumb while out of the thumb elements mouse area
            signal: controller.signal,
          });
          thumb.addEventListener('touchend', interactionEndHandler, {
            signal: controller.signal,
          });
          thumb.addEventListener('keyup', interactionEndHandler, {
            signal: controller.signal,
          });
        };

        // Add event listeners to the thumb for when the user starts interacting with the thumb
        thumb.addEventListener('focusin', focusInHandler);

        return () => {
          // clean up event listeners
          if (thumb) {
            thumb.removeEventListener('focusin', focusInHandler);
          }
        };
      }
      return () => {};
    }, [thumbRef, ref, value]);

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
