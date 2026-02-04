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

import type { CSSProperties, ReactElement, RefObject, SyntheticEvent } from 'react';
import { Children, cloneElement, isValidElement, useCallback, useMemo, useRef, useState } from 'react';

import CloseCircleIcon from '../../../bpk-component-icon/sm/close-circle';
import ExclamationCircleIcon from '../../../bpk-component-icon/sm/exclamation-circle';
import TickCircleIcon from '../../../bpk-component-icon/sm/tick-circle';
import { cssModules } from '../../../bpk-react-utils';

import { BpkInputContext } from './BpkInputContext';

import type { BpkInputRootProps } from './common-types';

import STYLES from './BpkInputV2.module.scss';

const getClassName = cssModules(STYLES);

/**
 * BpkInputRoot - Container component that provides context for Input and InputAdornment components.
 *
 * This component manages the shared state (gap, large) and provides registration methods
 * for InputAdornment attribution and border detection in docked input groups.
 *
 * @param {BpkInputRootProps} props - Component props
 * @returns {JSX.Element} The rendered root container
 *
 * @example
 * ```tsx
 * <BpkInput.Root gap="0.5rem" large={false}>
 *   <BpkInput.InputAdornment>$</BpkInput.InputAdornment>
 *   <BpkInput.Input id="price" name="price" value="100" />
 *   <BpkInput.InputAdornment>USD</BpkInput.InputAdornment>
 * </BpkInput.Root>
 * ```
 */
const BpkInputRoot = ({
  children,
  className,
  gap = '0',
  large = false,
}: BpkInputRootProps) => {
  // Track registered inputs and adornments
  const inputsRef = useRef<Map<string, RefObject<HTMLInputElement>>>(new Map());
  const adornmentsRef = useRef<Map<string, number>>(new Map());
  const childrenArrayRef = useRef<any[]>([]);

  // State to track persistClearButton for each input
  const [persistClearButtonMap, setPersistClearButtonMap] = useState<Map<string, boolean>>(new Map());

  // Build children array and group inputs with their adornments
  const childrenWithPosition = useMemo(() => {
    childrenArrayRef.current = Children.toArray(children);
    const childrenArray = childrenArrayRef.current;

    type InputGroup = {
      input: ReactElement;
      startAdornments: ReactElement[];
      endAdornments: ReactElement[];
      inputId: string;
      valid: boolean | null;
      clearButtonMode?: 'never' | 'whileEditing' | 'always';
      clearButtonLabel?: string | null;
      onClear?: ((e?: SyntheticEvent<HTMLButtonElement>) => void) | null;
      value: string | number;
      inputRef?: ((ref: HTMLInputElement) => void) | null;
      inputClassName?: string;
    };
    const result: InputGroup[] = [];

    // Identify inputs by checking if they have an 'id' prop
    const isInput = (child: any): child is ReactElement =>
      isValidElement(child) &&
      typeof (child.props as any).id === 'string' &&
      typeof (child.props as any).name === 'string';

    const isAdornment = (child: any): child is ReactElement =>
      isValidElement(child) && !isInput(child);

    // Group children: collect adornments before/after each input
    let currentGroup: {
      input: ReactElement | null;
      startAdornments: ReactElement[];
      endAdornments: ReactElement[];
      inputId: string;
      valid: boolean | null;
    } = {
      input: null,
      startAdornments: [],
      endAdornments: [],
      inputId: '',
      valid: null,
    };

    childrenArray.forEach((child, index) => {
      if (isInput(child)) {
        // If we have a pending group with input, flush it first
        if (currentGroup.input !== null) {
          result.push({
            input: currentGroup.input,
            startAdornments: currentGroup.startAdornments,
            endAdornments: currentGroup.endAdornments,
            inputId: currentGroup.inputId,
            valid: currentGroup.valid,
            clearButtonMode: (currentGroup.input.props as any).clearButtonMode,
            clearButtonLabel: (currentGroup.input.props as any).clearButtonLabel,
            onClear: (currentGroup.input.props as any).onClear,
            value: (currentGroup.input.props as any).value,
            inputRef: (currentGroup.input.props as any).inputRef,
            inputClassName: (currentGroup.input.props as any).className,
          });
          // Start fresh group
          currentGroup = {
            input: null,
            startAdornments: [],
            endAdornments: [],
            inputId: '',
            valid: null,
          };
        }

        // Extract validation state and clearable props from input props
        const inputProps = (child.props as any);
        const inputId = inputProps.id;
        const valid = inputProps.valid !== undefined ? inputProps.valid : null;

        // Set input for current group
        currentGroup.input = cloneElement(child, {
          'data-child-position': index,
        } as any);
        currentGroup.inputId = inputId;
        currentGroup.valid = valid;
      } else if (isAdornment(child)) {
        if (currentGroup.input === null) {
          // Adornment before any input - treat as start for next input
          currentGroup.startAdornments.push(
            cloneElement(child, {
              'data-child-position': index,
              'data-adornment-type': 'start',
            } as any)
          );
        } else {
          // Adornment after an input - treat as end for current input
          currentGroup.endAdornments.push(
            cloneElement(child, {
              'data-child-position': index,
              'data-adornment-type': 'end',
            } as any)
          );
        }
      }
    });

    // Flush last group
    if (currentGroup.input !== null) {
      result.push({
        input: currentGroup.input,
        startAdornments: currentGroup.startAdornments,
        endAdornments: currentGroup.endAdornments,
        inputId: currentGroup.inputId,
        valid: currentGroup.valid,
        clearButtonMode: (currentGroup.input.props as any).clearButtonMode,
        clearButtonLabel: (currentGroup.input.props as any).clearButtonLabel,
        onClear: (currentGroup.input.props as any).onClear,
        value: (currentGroup.input.props as any).value,
        inputRef: (currentGroup.input.props as any).inputRef,
        inputClassName: (currentGroup.input.props as any).className,
      });
    }

    // Determine docked position for each group
    const totalGroups = result.length;

    // Render grouped structure with validation state on container
    return result.map((group, groupIndex) => {
      // Build container class names (include input's className for width control)
      let containerClassName = getClassName(
        'bpk-input-v2__input-container',
        large && 'bpk-input-v2__input-container--large',
        group.valid === true && 'bpk-input-v2__input-container--valid',
        group.valid === false && 'bpk-input-v2__input-container--invalid',
        group.inputClassName
      );

      // Apply docked styles if multiple inputs
      if (totalGroups > 1) {
        if (groupIndex === 0) {
          containerClassName = getClassName(containerClassName, 'bpk-input-v2__input-container--docked-first');
        } else if (groupIndex === totalGroups - 1) {
          containerClassName = getClassName(containerClassName, 'bpk-input-v2__input-container--docked-last');
        } else {
          containerClassName = getClassName(containerClassName, 'bpk-input-v2__input-container--docked-middle');
        }
      }

      // Create system adornment (clear button or validation icon)
      // Priority: clearable > validation icon
      let systemAdornment: ReactElement | null = null;

      // Check if clearable button should be shown
      const clearable = group.clearButtonMode && group.clearButtonMode !== 'never';
      const persistClearButton = persistClearButtonMap.get(group.inputId) || false;
      const hasValue = `${group.value || ''}`.length > 0;
      const showClearButton = clearable && hasValue;

      if (showClearButton) {
        // Clear button has higher priority - render it as an adornment
        const isPersistent = group.clearButtonMode === 'always' || persistClearButton;
        const clearButtonClassNames = getClassName(
          'bpk-input-v2__adornment',
          'bpk-input-v2__adornment--end',
          'bpk-input-v2__clear-button',
          large && 'bpk-input-v2__adornment--large',
          !isPersistent && 'bpk-input-v2__clear-button--while-editing'
        );

        systemAdornment = (
          <div
            key={`clear-${group.inputId}`}
            className={clearButtonClassNames}
            data-system="clear"
          >
            <button
              type="button"
              title={group.clearButtonLabel || ''}
              aria-label={group.clearButtonLabel || ''}
              tabIndex={-1}
              className={getClassName('bpk-input-v2__clear-button-inner')}
              onMouseDown={() => {
                setPersistClearButtonMap(prev => {
                  const next = new Map(prev);
                  next.set(group.inputId, true);
                  return next;
                });
              }}
              onClick={(e) => {
                const inputRef = inputsRef.current.get(group.inputId);
                if (inputRef?.current) {
                  inputRef.current.focus();
                }
                if (group.onClear) {
                  if (e.target instanceof HTMLButtonElement) {
                    const { target } = e;
                    target.name = (group.input.props as any).name;
                  }
                  group.onClear(e);
                  setPersistClearButtonMap(prev => {
                    const next = new Map(prev);
                    next.set(group.inputId, false);
                    return next;
                  });
                }
              }}
            >
              <CloseCircleIcon fill="currentcolor" />
            </button>
          </div>
        );
      } else if (group.valid === true) {
        // Show valid icon only if clear button is not shown
        systemAdornment = (
          <div
            key={`valid-${group.inputId}`}
            className={getClassName('bpk-input-v2__adornment', 'bpk-input-v2__adornment--end', 'bpk-input-v2__adornment--valid', large && 'bpk-input-v2__adornment--large')}
            data-system="valid"
          >
            <TickCircleIcon fill="currentcolor" />
          </div>
        );
      } else if (group.valid === false) {
        // Show invalid icon only if clear button is not shown
        systemAdornment = (
          <div
            key={`invalid-${group.inputId}`}
            className={getClassName('bpk-input-v2__adornment', 'bpk-input-v2__adornment--end', 'bpk-input-v2__adornment--invalid', large && 'bpk-input-v2__adornment--large')}
            data-system="invalid"
          >
            <ExclamationCircleIcon fill="currentcolor" />
          </div>
        );
      }

      return (
        <div key={`container-${group.inputId}`} className={containerClassName}>
          {group.startAdornments}
          {group.input}
          {group.endAdornments}
          {systemAdornment}
        </div>
      );
    });
  }, [children, large, persistClearButtonMap]);

  // Registration methods
  const registerInput = useCallback((id: string, ref: RefObject<HTMLInputElement>) => {
    inputsRef.current.set(id, ref);
  }, []);

  const unregisterInput = useCallback((id: string) => {
    inputsRef.current.delete(id);
  }, []);

  const registerAdornment = useCallback((id: string, position: number) => {
    adornmentsRef.current.set(id, position);
  }, []);

  const unregisterAdornment = useCallback((id: string) => {
    adornmentsRef.current.delete(id);
  }, []);

  // Get input that an adornment belongs to
  const getInputForAdornment = useCallback((adornmentId: string): string | null => {
    const adornmentPosition = adornmentsRef.current.get(adornmentId);
    if (adornmentPosition === undefined) return null;

    // Find nearest Input before or after the adornment
    const childrenArray = childrenArrayRef.current;
    let nearestInputId: string | null = null;
    let nearestDistance = Infinity;

    inputsRef.current.forEach((ref, inputId) => {
      // Find this input's position in children array
      const inputPosition = childrenArray.findIndex(
        (child: any) => child?.props?.id === inputId
      );

      if (inputPosition === -1) return;

      const distance = Math.abs(inputPosition - adornmentPosition);
      if (distance < nearestDistance) {
        nearestDistance = distance;
        nearestInputId = inputId;
      }
    });

    return nearestInputId;
  }, []);

  // Get position information for an input (for border detection)
  const getInputPosition = useCallback((inputId: string): { index: number; total: number } | null => {
    const inputIds = Array.from(inputsRef.current.keys());
    const index = inputIds.indexOf(inputId);

    if (index === -1) return null;

    return {
      index,
      total: inputIds.length,
    };
  }, []);

  // Get position type of an adornment relative to its nearest input
  const getAdornmentPositionType = useCallback((adornmentId: string): 'start' | 'end' | null => {
    const adornmentPosition = adornmentsRef.current.get(adornmentId);
    if (adornmentPosition === undefined) return null;

    const childrenArray = childrenArrayRef.current;
    let nearestInputId: string | null = null;
    let nearestInputPosition = -1;
    let nearestDistance = Infinity;

    inputsRef.current.forEach((ref, inputId) => {
      const inputPosition = childrenArray.findIndex(
        (child: any) => child?.props?.id === inputId
      );

      if (inputPosition === -1) return;

      const distance = Math.abs(inputPosition - adornmentPosition);
      if (distance < nearestDistance) {
        nearestDistance = distance;
        nearestInputId = inputId;
        nearestInputPosition = inputPosition;
      }
    });

    if (nearestInputId === null) return null;

    // If adornment is before input, it's a start adornment
    // If adornment is after input, it's an end adornment
    return adornmentPosition < nearestInputPosition ? 'start' : 'end';
  }, []);

  const contextValue = useMemo(
    () => ({
      gap,
      large,
      registerInput,
      unregisterInput,
      registerAdornment,
      unregisterAdornment,
      getInputForAdornment,
      getInputPosition,
      getAdornmentPositionType,
    }),
    [
      gap,
      large,
      registerInput,
      unregisterInput,
      registerAdornment,
      unregisterAdornment,
      getInputForAdornment,
      getInputPosition,
      getAdornmentPositionType,
    ]
  );

  const rootClassName = getClassName('bpk-input-v2__root', className);

  const style: CSSProperties = {
    '--bpk-input-gap': gap,
  } as CSSProperties;

  return (
    <BpkInputContext.Provider value={contextValue}>
      <div className={rootClassName} style={style}>
        {childrenWithPosition}
      </div>
    </BpkInputContext.Provider>
  );
};

export default BpkInputRoot;
