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

import React, { Fragment, type Element, type ChildrenArray } from 'react';
import PropTypes from 'prop-types';
import {
  ScrollView,
  type StyleObj,
  ViewPropTypes,
  StyleSheet,
} from 'react-native';
import BpkCarouselIndicator from 'react-native-bpk-component-carousel-indicator';
import { spacingXl } from 'bpk-tokens/tokens/base.react.native';
import typeof BpkCarouselItem from './BpkCarouselItem';

const styles = StyleSheet.create({
  carouselIndicator: {
    alignSelf: 'center',
    marginTop: -spacingXl,
  },
});

export type Props = {
  accessibilityLabel: string | ((number, number) => string),
  children: ChildrenArray<Element<BpkCarouselItem>>,
  style: ?StyleObj,
  showIndicator: ?boolean,
};

type State = {
  currentIndex: number,
  width: ?number,
  height: ?number,
};

class BpkCarousel extends React.Component<Props, State> {
  static propTypes = {
    accessibilityLabel: PropTypes.oneOfType([PropTypes.string, PropTypes.func])
      .isRequired,
    children: PropTypes.node.isRequired,
    style: ViewPropTypes.style,
    showIndicator: PropTypes.bool,
  };

  static defaultProps = {
    style: null,
    showIndicator: true,
  };

  constructor(props: Props) {
    super(props);
    this.state = { width: null, height: null, currentIndex: 0 };
  }

  onLayout = (event: any) => {
    this.setState({
      width: event.nativeEvent.layout.width,
      height: event.nativeEvent.layout.height,
    });
  };

  getAccessibilityLabel() {
    const { accessibilityLabel, children } = this.props;
    if (typeof accessibilityLabel === 'function') {
      return accessibilityLabel(
        this.state.currentIndex,
        React.Children.count(children),
      );
    }
    return accessibilityLabel;
  }

  handleScroll = (event: any) => {
    const { contentOffset } = event.nativeEvent;
    const currentIndex = this.state.width
      ? contentOffset.x / this.state.width
      : 0;
    this.setState({ currentIndex });
  };

  render() {
    const { children, showIndicator, style } = this.props;
    const { currentIndex, height, width } = this.state;

    const shouldRenderChildren = width !== null && height !== null;
    const childrenCount = React.Children.count(children);

    return (
      <Fragment>
        <ScrollView
          accessible
          accessibilityLabel={this.getAccessibilityLabel()}
          onMomentumScrollEnd={this.handleScroll}
          onLayout={this.onLayout}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          style={style}
        >
          {shouldRenderChildren &&
            React.Children.map(children, child =>
              React.cloneElement(child, {
                ...child.props,
                style: [child.props.style, { width, height }],
              }),
            )}
        </ScrollView>
        {shouldRenderChildren &&
          showIndicator && (
            <BpkCarouselIndicator
              style={styles.carouselIndicator}
              accessibilityLabel={this.getAccessibilityLabel()}
              pageCount={childrenCount}
              selectedIndex={currentIndex}
            />
          )}
      </Fragment>
    );
  }
}

export default BpkCarousel;
