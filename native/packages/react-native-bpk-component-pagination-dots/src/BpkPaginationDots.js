/*
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2018 Skyscanner Ltd
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

/* @flow */

import React from 'react';
import { StyleSheet, View, ViewPropTypes } from 'react-native';
import PropTypes from 'prop-types';
import { setOpacity } from 'bpk-tokens';
import {
  borderRadiusSm,
  colorGray900,
  spacingSm,
  spacingMd,
  spacingLg,
} from 'bpk-tokens/tokens/base.react.native';

import BpkPaginationDotsIndicator, {
  INDICATOR_SIZES,
} from './BpkPaginationDotsIndicator';

// When there are 5 dots or fewer, they should all be displayed at full size.
const MAX_DOTS_BEFORE_OVERFLOW = 5;
const NUM_OF_DOTS_WHEN_OVERFLOWING = 6;

const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    backgroundColor: setOpacity(colorGray900, 0.3),
    borderRadius: borderRadiusSm,
    flexDirection: 'row',
    height: spacingLg,
    justifyContent: 'center',
    paddingHorizontal: spacingSm + spacingMd,
    paddingVertical: spacingMd,
    width: spacingLg * 3,
  },
});

const indicatorMappings = {
  start: [
    INDICATOR_SIZES.base,
    INDICATOR_SIZES.base,
    INDICATOR_SIZES.base,
    INDICATOR_SIZES.md,
    INDICATOR_SIZES.sm,
    INDICATOR_SIZES.invisible,
  ],
  closeToStart: [
    INDICATOR_SIZES.md,
    INDICATOR_SIZES.base,
    INDICATOR_SIZES.base,
    INDICATOR_SIZES.base,
    INDICATOR_SIZES.md,
    INDICATOR_SIZES.sm,
  ],
  middle: [
    INDICATOR_SIZES.sm,
    INDICATOR_SIZES.md,
    INDICATOR_SIZES.base,
    INDICATOR_SIZES.base,
    INDICATOR_SIZES.base,
    INDICATOR_SIZES.md,
    INDICATOR_SIZES.sm,
  ],
  closeToEnd: [
    INDICATOR_SIZES.invisible,
    INDICATOR_SIZES.sm,
    INDICATOR_SIZES.md,
    INDICATOR_SIZES.base,
    INDICATOR_SIZES.base,
    INDICATOR_SIZES.md,
    INDICATOR_SIZES.invisible,
  ],
  end: [
    INDICATOR_SIZES.invisible,
    INDICATOR_SIZES.sm,
    INDICATOR_SIZES.md,
    INDICATOR_SIZES.base,
    INDICATOR_SIZES.base,
    INDICATOR_SIZES.base,
    INDICATOR_SIZES.invisible,
  ],
};

const createIndicatorsFromSizes = (sizesArray, selectedIndex) =>
  sizesArray.map((indicatorSize, index) => (
    <BpkPaginationDotsIndicator
      key={index.toString()}
      selected={selectedIndex === index}
      size={indicatorSize}
    />
  ));

const getIndicators = (pageCount, selectedIndex) => {
  if (pageCount <= MAX_DOTS_BEFORE_OVERFLOW) {
    return new Array(pageCount)
      .fill()
      .map((_, index) => (
        <BpkPaginationDotsIndicator
          key={index.toString()}
          selected={selectedIndex === index}
        />
      ));
  }

  const maxPageIndex = pageCount - 1;

  if (selectedIndex <= 2) {
    return createIndicatorsFromSizes(indicatorMappings.start, selectedIndex);
  }
  if (selectedIndex === 3) {
    return createIndicatorsFromSizes(
      indicatorMappings.closeToStart,
      NUM_OF_DOTS_WHEN_OVERFLOWING - 4,
    );
  }
  if (selectedIndex === maxPageIndex - 1) {
    return createIndicatorsFromSizes(
      indicatorMappings.closeToEnd,
      NUM_OF_DOTS_WHEN_OVERFLOWING - 2,
    );
  }
  if (selectedIndex === maxPageIndex) {
    return createIndicatorsFromSizes(
      indicatorMappings.end,
      NUM_OF_DOTS_WHEN_OVERFLOWING - 1,
    );
  }
  return createIndicatorsFromSizes(
    indicatorMappings.middle,
    NUM_OF_DOTS_WHEN_OVERFLOWING - 3,
  );
};

export type Props = {
  accessibilityLabel: string | ((number, number) => string),
  pageCount: number,
  selectedIndex: number,
  style: ?any,
};

const BpkPaginationDots = (props: Props) => {
  const {
    accessibilityLabel,
    pageCount,
    selectedIndex,
    style,
    ...rest
  } = props;

  const label =
    typeof accessibilityLabel === 'string'
      ? accessibilityLabel
      : accessibilityLabel && accessibilityLabel(pageCount, selectedIndex);

  const indicators = getIndicators(pageCount, selectedIndex);
  return (
    <View
      accessible
      accessibilityLabel={label}
      style={[styles.wrapper, style]}
      {...rest}
    >
      {indicators}
    </View>
  );
};

BpkPaginationDots.propTypes = {
  accessibilityLabel: PropTypes.oneOfType([PropTypes.string, PropTypes.func])
    .isRequired,
  pageCount: PropTypes.number.isRequired,
  selectedIndex: PropTypes.number.isRequired,
  style: ViewPropTypes.style,
};

BpkPaginationDots.defaultProps = {
  style: null,
};

export default BpkPaginationDots;
