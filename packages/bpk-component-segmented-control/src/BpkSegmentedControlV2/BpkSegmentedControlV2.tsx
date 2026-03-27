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

import { SegmentGroup, useLocaleContext } from '@ark-ui/react';

import {
  cssModules,
  getDataComponentAttribute,
} from '../../../bpk-react-utils';

import { SEGMENT_TYPES_V2 } from './common-types';

import type {
  BpkSegmentedControlV2ItemProps,
  BpkSegmentedControlV2ItemTextProps,
  BpkSegmentedControlV2RootProps,
} from './common-types';

import STYLES from './BpkSegmentedControlV2.module.scss';

const getClassName = cssModules(STYLES);

const BpkSegmentedControlV2Root = ({
  children,
  defaultValue,
  label,
  onChange,
  shadow = false,
  type = SEGMENT_TYPES_V2.CanvasDefault,
  value,
}: BpkSegmentedControlV2RootProps) => {
  const { dir } = useLocaleContext();
  const containerClass = getClassName(
    'bpk-segmented-control-v2',
    `bpk-segmented-control-v2--${type}`,
    shadow && 'bpk-segmented-control-v2--shadow',
  );

  return (
    <SegmentGroup.Root
      key={dir}
      className={containerClass}
      value={value}
      defaultValue={defaultValue}
      onValueChange={
        onChange
          ? ({ value: selectedValue }) => {
              if (selectedValue !== null) onChange(selectedValue);
            }
          : undefined
      }
      orientation="horizontal"
      {...getDataComponentAttribute('SegmentedControlV2')}
    >
      <SegmentGroup.Label>{label}</SegmentGroup.Label>
      {children}
    </SegmentGroup.Root>
  );
};

const BpkSegmentedControlV2Item = ({
  children,
  value,
}: BpkSegmentedControlV2ItemProps) => (
  <SegmentGroup.Item
    value={value}
    className={getClassName('bpk-segmented-control-v2__item')}
  >
    {children}
  </SegmentGroup.Item>
);

const BpkSegmentedControlV2ItemText = ({
  children,
}: BpkSegmentedControlV2ItemTextProps) => (
  <SegmentGroup.ItemText
    className={getClassName('bpk-segmented-control-v2__item-text')}
  >
    {children}
  </SegmentGroup.ItemText>
);

const BpkSegmentedControlV2ItemControl = () => (
  <SegmentGroup.ItemControl
    className={getClassName('bpk-segmented-control-v2__item-control')}
  />
);

const BpkSegmentedControlV2ItemHiddenInput = () => (
  <SegmentGroup.ItemHiddenInput />
);

const BpkSegmentedControlV2Indicator = () => (
  <SegmentGroup.Indicator
    className={getClassName('bpk-segmented-control-v2__indicator')}
  />
);

const BpkSegmentedControlV2 = {
  Root: BpkSegmentedControlV2Root,
  Item: BpkSegmentedControlV2Item,
  ItemText: BpkSegmentedControlV2ItemText,
  ItemControl: BpkSegmentedControlV2ItemControl,
  ItemHiddenInput: BpkSegmentedControlV2ItemHiddenInput,
  Indicator: BpkSegmentedControlV2Indicator,
};

export default BpkSegmentedControlV2;
export {
  BpkSegmentedControlV2Root,
  BpkSegmentedControlV2Item,
  BpkSegmentedControlV2ItemText,
  BpkSegmentedControlV2ItemControl,
  BpkSegmentedControlV2ItemHiddenInput,
  BpkSegmentedControlV2Indicator,
  SEGMENT_TYPES_V2,
};
export type {
  BpkSegmentedControlV2RootProps,
  BpkSegmentedControlV2ItemProps,
  BpkSegmentedControlV2ItemTextProps,
};
