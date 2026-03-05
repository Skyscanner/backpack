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

import type { KeyboardEvent, ReactElement, ReactNode } from 'react';
import { Children, isValidElement } from 'react';

import { SegmentGroup } from '@ark-ui/react/segment-group';

import {
  cssModules,
  getDataComponentAttribute,
  isRTL,
} from '../../../bpk-react-utils';

import { SEGMENT_TYPES_V2 } from './common-types';

import type {
  BpkSegmentedControlV2ItemProps,
  BpkSegmentedControlV2RootProps,
} from './common-types';

import STYLES from './BpkSegmentedControlV2.module.scss';

const getClassName = cssModules(STYLES);

const getEnabledInputs = (group: HTMLElement): HTMLInputElement[] =>
  Array.from(
    group.querySelectorAll<HTMLInputElement>(
      'input[type="radio"]:not(:disabled)',
    ),
  );

const extractTextContent = (node: ReactNode): string => {
  if (typeof node === 'string' || typeof node === 'number') return String(node);
  if (Array.isArray(node)) return node.map(extractTextContent).join(' ').trim();
  if (isValidElement(node)) {
    const el = node as ReactElement<{ children?: ReactNode }>;
    if (el.props.children) return extractTextContent(el.props.children);
  }
  return '';
};

const wrapAround = (index: number, last: number, forward: boolean) =>
  // eslint-disable-next-line no-nested-ternary
  forward ? (index >= last ? 0 : index + 1) : index <= 0 ? last : index - 1;

const BpkSegmentedControlV2Root = ({
  activationMode = 'automatic',
  children,
  defaultValue,
  disabled = false,
  label,
  onChange,
  shadow = false,
  type = SEGMENT_TYPES_V2.CanvasDefault,
  value,
}: BpkSegmentedControlV2RootProps) => {
  const containerClass = getClassName(
    'bpk-segmented-control-v2',
    `bpk-segmented-control-v2--${type}`,
    shadow && 'bpk-segmented-control-v2--shadow',
  );

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const inputs = getEnabledInputs(event.currentTarget);
    const currentIndex = inputs.findIndex(
      (inp) => inp === document.activeElement,
    );
    if (inputs.length === 0 || currentIndex === -1) return;

    const lastIndex = inputs.length - 1;
    const rtl = isRTL();
    let newIndex: number;

    switch (event.key) {
      case 'ArrowRight':
        newIndex = wrapAround(currentIndex, lastIndex, !rtl);
        break;
      case 'ArrowLeft':
        newIndex = wrapAround(currentIndex, lastIndex, rtl);
        break;
      case 'Home':
        newIndex = 0;
        break;
      case 'End':
        newIndex = lastIndex;
        break;
      case ' ':
      case 'Enter':
        if (activationMode === 'manual') {
          event.preventDefault();
          inputs[currentIndex].click();
        }
        return;
      default:
        return;
    }

    event.preventDefault();
    inputs[newIndex].focus();
    if (activationMode !== 'manual') {
      // Trigger click so Ark-UI updates its internal state for both controlled
      // and uncontrolled usage. Ark-UI's onValueChange fires onChange via its
      // own listener — do not call onChange manually here to avoid double-firing.
      inputs[newIndex].click();
    }
  };

  return (
    <SegmentGroup.Root
      className={containerClass}
      value={value}
      defaultValue={defaultValue}
      onValueChange={
        onChange
          ? ({ value: v }) => {
              if (v !== null) onChange(v);
            }
          : undefined
      }
      disabled={disabled}
      aria-label={label}
      orientation="horizontal"
      onKeyDown={handleKeyDown}
      {...getDataComponentAttribute('SegmentedControlV2')}
    >
      {Children.map(children, (child) => {
        if (!isValidElement(child)) return null;
        const c = child as ReactElement<BpkSegmentedControlV2ItemProps>;
        const accessibleName =
          c.props.accessibilityLabel ?? extractTextContent(c.props.children);
        return (
          <SegmentGroup.Item
            key={c.props.value}
            value={c.props.value}
            disabled={c.props.disabled ?? false}
            className={getClassName('bpk-segmented-control-v2__item')}
          >
            <SegmentGroup.ItemControl
              className={getClassName('bpk-segmented-control-v2__item-control')}
              aria-label={c.props.accessibilityLabel}
            >
              <SegmentGroup.ItemText
                className={getClassName('bpk-segmented-control-v2__item-text')}
              >
                {c.props.children}
              </SegmentGroup.ItemText>
            </SegmentGroup.ItemControl>
            <SegmentGroup.ItemHiddenInput
              aria-label={accessibleName || undefined}
            />
          </SegmentGroup.Item>
        );
      })}
    </SegmentGroup.Root>
  );
};

// Props-only placeholder — rendered by Root via Children.map.
// Enables dot-notation API with TypeScript inference: <BpkSegmentedControlV2.Item />.
const BpkSegmentedControlV2Item = (_props: BpkSegmentedControlV2ItemProps) =>
  null;

const BpkSegmentedControlV2 = {
  Root: BpkSegmentedControlV2Root,
  Item: BpkSegmentedControlV2Item,
};

export default BpkSegmentedControlV2;
export {
  BpkSegmentedControlV2Root,
  BpkSegmentedControlV2Item,
  SEGMENT_TYPES_V2,
};
export type { BpkSegmentedControlV2RootProps, BpkSegmentedControlV2ItemProps };
