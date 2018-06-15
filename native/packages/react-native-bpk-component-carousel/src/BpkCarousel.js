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

import React, { type Element, type ChildrenArray } from 'react';
import PropTypes from 'prop-types';
import { type StyleObj, ViewPropTypes, StyleSheet, View } from 'react-native';
import {
  DataProvider,
  LayoutProvider,
  RecyclerListView,
} from 'recyclerlistview';
import BpkCarouselIndicator from 'react-native-bpk-component-carousel-indicator';
import { spacingXl } from 'bpk-tokens/tokens/base.react.native';
import typeof BpkCarouselItem from './BpkCarouselItem';

// 16ms would mean 60fps (1000ms / 60fps = 16ms) but that leads to too much
// calls to setState when the carousel is being scrolled fast.
// 250 is just a number where the "normal" performance is still very good
// and also works well when scrolled fast.
// IF YOU CHANGE THIS, MAKE SURE TO DO AN 0N-DEVICE TEST WITH ~100 IMAGES
// AND SCROLLING FAST.
const SCROLL_EVENT_THROTTLE = 250;

const styles = StyleSheet.create({
  carouselIndicator: {
    alignSelf: 'center',
    bottom: spacingXl,
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
  dataProvider: DataProvider,
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
    const dataProvider = new DataProvider((r1, r2) => r1 !== r2);
    this.state = {
      width: null,
      height: null,
      currentIndex: 0,
      dataProvider: dataProvider.cloneWithRows(
        React.Children.toArray(this.props.children),
      ),
    };
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

  layoutProvider = new LayoutProvider(
    () => 0,
    (type, dimensions) => {
      dimensions.width = this.state.width; // eslint-disable-line no-param-reassign
      dimensions.height = this.state.height; // eslint-disable-line no-param-reassign
    },
  );

  handleScroll = (event: any) => {
    const { contentOffset } = event.nativeEvent;
    const currentIndex = this.state.width
      ? Math.round(contentOffset.x / this.state.width)
      : 0;
    if (currentIndex !== this.state.currentIndex) {
      this.setState({ currentIndex });
    }
  };

  renderItem = (type: number, item: Element<BpkCarouselItem>) => item;

  render() {
    const { children, showIndicator, style } = this.props;
    const { currentIndex, height, width } = this.state;

    const shouldRenderChildren = width !== null && height !== null;
    const childrenCount = React.Children.count(children);

    return (
      <View style={style} onLayout={this.onLayout}>
        {shouldRenderChildren && (
          <RecyclerListView
            layoutProvider={this.layoutProvider}
            dataProvider={this.state.dataProvider}
            rowRenderer={this.renderItem}
            isHorizontal
            pagingEnabled
            accessible
            accessibilityLabel={this.getAccessibilityLabel()}
            onScroll={this.handleScroll}
            scrollThrottle={SCROLL_EVENT_THROTTLE}
            showsHorizontalScrollIndicator={false}
          />
        )}
        {shouldRenderChildren &&
          showIndicator && (
            <BpkCarouselIndicator
              style={styles.carouselIndicator}
              accessibilityLabel={this.getAccessibilityLabel()}
              pageCount={childrenCount}
              selectedIndex={currentIndex}
            />
          )}
      </View>
    );
  }
}

export default BpkCarousel;
