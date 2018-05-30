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

import PropTypes from 'prop-types';
import { setOpacity } from 'bpk-tokens';
import React, { Component } from 'react';
import {
  borderRadiusSm,
  colorGray900,
  spacingSm,
  spacingMd,
  spacingLg,
} from 'bpk-tokens/tokens/base.react.native';
import { StyleSheet, ViewPropTypes, type StyleObj } from 'react-native';

import BpkPaginationDotsIndicator, {
  INDICATOR_SIZES,
} from './BpkPaginationDotsIndicator';
import TransitionGroup from './TransitionGroup';

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

const getIndicatorSlice = (pageCount, selectedIndex, direction) => {
  if (pageCount <= 5) {
    return {
      begin: 0,
      end: 5,
    };
  }

  if (direction === 'forward') {
    if (selectedIndex <= 2) {
      return {
        begin: 0,
        end: 5,
      };
    }

    if (selectedIndex === pageCount - 1) {
      return {
        begin: pageCount - 5,
        end: pageCount,
      };
    }

    if (selectedIndex >= pageCount - 2) {
      return {
        begin: pageCount - 6,
        end: pageCount,
      };
    }

    return {
      begin: selectedIndex - 3,
      end: selectedIndex + 3,
    };
  }

  if (selectedIndex >= pageCount - 3) {
    return {
      begin: pageCount - 5,
      end: pageCount,
    };
  }

  if (selectedIndex === 0) {
    return {
      begin: 0,
      end: 5,
    };
  }

  if (selectedIndex <= 2) {
    return {
      begin: 0,
      end: 6,
    };
  }

  return {
    begin: selectedIndex - 2,
    end: selectedIndex + 4,
  };
};

const getIndicatorSize = (pageCount, index, selectedIndex, direction) => {
  if (pageCount <= 5 || selectedIndex === index) {
    return INDICATOR_SIZES.base;
  }

  if (direction === 'forward') {
    if (selectedIndex <= 2 && index <= 2) {
      return INDICATOR_SIZES.base;
    }

    if (index > selectedIndex - 3 && index < selectedIndex) {
      return INDICATOR_SIZES.base;
    }

    if (
      index === selectedIndex + 1 ||
      (selectedIndex <= 2 && index === 3) ||
      index === selectedIndex - 3
    ) {
      return INDICATOR_SIZES.md;
    }
  }

  if (direction === 'backward') {
    if (selectedIndex >= pageCount - 3 && index >= pageCount - 3) {
      return INDICATOR_SIZES.base;
    }

    if (index < selectedIndex + 3 && index > selectedIndex) {
      return INDICATOR_SIZES.base;
    }

    if (
      index === selectedIndex - 1 ||
      (selectedIndex >= pageCount - 3 && index === pageCount - 4) ||
      index === selectedIndex + 3
    ) {
      return INDICATOR_SIZES.md;
    }
  }

  return INDICATOR_SIZES.sm;
};

export type Props = {
  pageCount: number,
  selectedIndex: number,
  initialDirection: 'forward' | 'backward',
  style: ?StyleObj,
};

class BpkPaginationDots extends Component<Props> {
  direction: 'forward' | 'backward';

  static propTypes = {
    pageCount: PropTypes.number.isRequired,
    selectedIndex: PropTypes.number.isRequired,
    initialDirection: PropTypes.string,
    style: ViewPropTypes.style,
  };

  static defaultProps = {
    initialDirection: 'forward',
    style: null,
  };

  constructor(props: Props) {
    super(props);

    this.direction = this.props.initialDirection;
  }

  componentWillReceiveProps(nextProps: Props) {
    if (nextProps.selectedIndex === this.props.selectedIndex) {
      return;
    }

    this.direction =
      nextProps.selectedIndex > this.props.selectedIndex
        ? 'forward'
        : 'backward';
  }

  render() {
    const { pageCount, selectedIndex, style, ...rest } = this.props;

    const indicators = new Array(pageCount)
      .fill()
      .map((_, index) => (
        <BpkPaginationDotsIndicator
          key={index.toString()}
          selected={selectedIndex === index}
          size={getIndicatorSize(
            pageCount,
            index,
            selectedIndex,
            this.direction,
          )}
        />
      ));

    const { begin, end } = getIndicatorSlice(
      pageCount,
      selectedIndex,
      this.direction,
    );

    // console.warn(
    //   indicators
    //     .slice(begin, end)
    //     .map(
    //       ({ key, props: xprops }) =>
    //         selectedIndex.toString() === key ? `[${xprops.size}]` : xprops.size,
    //     ),
    // );

    return (
      <TransitionGroup style={[styles.wrapper, style]} {...rest}>
        {indicators.slice(begin, end)}
      </TransitionGroup>
    );
  }
}

export default BpkPaginationDots;
