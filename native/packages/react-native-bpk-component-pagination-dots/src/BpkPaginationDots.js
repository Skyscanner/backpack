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
import PropTypes from 'prop-types';
import { setOpacity } from 'bpk-tokens';
import {
  borderRadiusSm,
  colorGray900,
  spacingSm,
  spacingMd,
  spacingLg,
} from 'bpk-tokens/tokens/base.react.native';
import TransitionGroup from '@skyscanner/react-native-transitiongroup';
import { StyleSheet, ViewPropTypes, type StyleObj } from 'react-native';

import BpkPaginationDotsIndicator, {
  INDICATOR_SIZES,
} from './BpkPaginationDotsIndicator';

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

const getIndicatorSlice = (pageCount, selectedIndex) => {
  if (pageCount <= 5) {
    return {
      begin: 0,
      end: pageCount,
    };
  }

  if (selectedIndex <= 2) {
    return {
      begin: 0,
      end: 5,
    };
  }

  if (selectedIndex >= pageCount - 3) {
    return {
      begin: pageCount - 5,
      end: pageCount,
    };
  }

  return {
    begin: selectedIndex - 2,
    end: selectedIndex + 3,
  };
};

const getIndicatorSize = (pageCount, index, selectedIndex) => {
  if (pageCount <= 5 || selectedIndex === index) {
    return INDICATOR_SIZES.base;
  }

  if (index >= selectedIndex - 1 && index <= selectedIndex + 1) {
    return INDICATOR_SIZES.md;
  }

  return INDICATOR_SIZES.sm;
};

export type Props = {
  pageCount: number,
  selectedIndex: number,
  style: ?StyleObj,
};

const getIndicatorIndexFromKey = key => parseInt(key.replace(/\D/g, ''), 10);

const transitionGroupSorter = children =>
  Object.keys(children)
    .sort((a, b) => {
      const aIndex = getIndicatorIndexFromKey(a);
      const bIndex = getIndicatorIndexFromKey(b);

      if (aIndex < bIndex) {
        return -1;
      }

      if (aIndex > bIndex) {
        return 1;
      }

      return 0;
    })
    .reduce((acc, key) => {
      acc[key] = children[key];
      return acc;
    }, {});

const BpkPaginationDots = (props: Props) => {
  const { pageCount, selectedIndex, style, ...rest } = props;

  const indicators = new Array(pageCount)
    .fill()
    .map((_, index) => (
      <BpkPaginationDotsIndicator
        key={index.toString()}
        selected={selectedIndex === index}
        size={getIndicatorSize(pageCount, index, selectedIndex)}
      />
    ));

  const { begin, end } = getIndicatorSlice(pageCount, selectedIndex);

  return (
    <TransitionGroup
      style={[styles.wrapper, style]}
      childrenSortFn={transitionGroupSorter}
      {...rest}
    >
      {indicators.slice(begin, end)}
    </TransitionGroup>
  );
};

BpkPaginationDots.propTypes = {
  pageCount: PropTypes.number.isRequired,
  selectedIndex: PropTypes.number.isRequired,
  style: ViewPropTypes.style,
};

BpkPaginationDots.defaultProps = {
  style: null,
};

export default BpkPaginationDots;
