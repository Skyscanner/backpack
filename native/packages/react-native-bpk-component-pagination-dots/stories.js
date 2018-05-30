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
import { ScrollView, StyleSheet, View } from 'react-native';
import { storiesOf } from '@storybook/react-native';
import {
  borderRadiusSm,
  colorBlue500,
  colorGray900,
  colorGreen500,
  colorPink500,
  colorRed500,
  colorYellow500,
  spacingMd,
  spacingXl,
} from 'bpk-tokens/tokens/base.react.native';
import BpkNudger from 'react-native-bpk-component-nudger';

import CenterDecorator from '../../storybook/CenterDecorator';
import { StoryHeading, StorySubheading } from '../../storybook/TextStyles';

import BpkPaginationDots from './index';

const PAGE_WIDTH = 300;

const styles = StyleSheet.create({
  storyInstance: {
    marginBottom: spacingMd,
  },
  overlay: {
    alignItems: 'center',
    marginBottom: spacingMd,
  },
  pager: {
    borderRadius: borderRadiusSm,
    width: PAGE_WIDTH,
  },
  page: {
    height: spacingXl * 3,
    width: PAGE_WIDTH,
  },
  overlayDots: {
    position: 'absolute',
    bottom: spacingMd,
  },
  colorBlock: {
    alignItems: 'center',
    borderRadius: borderRadiusSm,
    height: spacingXl * 2,
    justifyContent: 'flex-end',
    marginBottom: spacingMd,
    paddingBottom: spacingMd,
  },
});

const pageColors = [
  colorGreen500,
  colorPink500,
  colorGray900,
  colorBlue500,
  colorYellow500,
  colorRed500,
];

class StatefulBpkPaginationExample extends React.Component<
  {},
  {
    pageCount: number,
    selectedIndex: number,
  },
> {
  constructor(props) {
    super(props);
    this.state = {
      pageCount: 6,
      selectedIndex: 5,
    };
  }

  getPageColor = index => pageColors[index % pageColors.length];

  scrollViewRef: ScrollView = null;

  handlePageCountChange = pageCount => {
    let { selectedIndex } = this.state;
    if (selectedIndex >= pageCount) {
      selectedIndex = pageCount - 1;
    }
    this.setState({ pageCount, selectedIndex });
  };

  handleSelectedIndexChange = selectedIndex => {
    this.setState({ selectedIndex });
    this.scrollViewRef.scrollTo({
      x: PAGE_WIDTH * selectedIndex,
    });
  };

  handleScroll = event => {
    const { contentOffset } = event.nativeEvent;
    const selectedIndex = contentOffset.x / PAGE_WIDTH;
    this.setState({ selectedIndex });
  };

  render() {
    const { pageCount, selectedIndex } = this.state;
    return (
      <View>
        <View style={styles.overlay}>
          <ScrollView
            horizontal
            pagingEnabled
            onMomentumScrollEnd={this.handleScroll}
            ref={ref => {
              this.scrollViewRef = ref;
            }}
            showsHorizontalScrollIndicator={false}
            style={styles.pager}
          >
            {new Array(pageCount)
              .fill()
              .map((_, index) => (
                <View
                  key={index.toString()}
                  style={[
                    styles.page,
                    { backgroundColor: this.getPageColor(index) },
                  ]}
                />
              ))}
          </ScrollView>
          <BpkPaginationDots
            pageCount={pageCount}
            selectedIndex={selectedIndex}
            style={styles.overlayDots}
          />
        </View>
        <StorySubheading>Number of pages</StorySubheading>
        <BpkNudger
          min={1}
          max={50}
          value={this.state.pageCount}
          onChange={this.handlePageCountChange}
          decreaseButtonLabel="Decrease"
          increaseButtonLabel="Increase"
          style={styles.storyInstance}
        />

        <StorySubheading>Selected index</StorySubheading>
        <BpkNudger
          min={0}
          max={this.state.pageCount - 1}
          value={this.state.selectedIndex}
          onChange={this.handleSelectedIndexChange}
          decreaseButtonLabel="Decrease"
          increaseButtonLabel="Increase"
        />
      </View>
    );
  }
}

storiesOf('react-native-bpk-component-pagination-dots', module)
  .addDecorator(CenterDecorator)
  .add('docs:default', () => (
    <View style={{ alignItems: 'center' }}>
      <StorySubheading style={styles.storyInstance}>
        5 pages or less
      </StorySubheading>
      {new Array(5)
        .fill()
        .map((_, index) => (
          <BpkPaginationDots
            key={index.toString()}
            pageCount={index + 1}
            selectedIndex={0}
            style={styles.storyInstance}
          />
        ))}
      <StorySubheading style={styles.storyInstance}>
        More than 5 pages
      </StorySubheading>
      <View style={{ flexDirection: 'row' }}>
        <View style={{ flex: 1, alignItems: 'center' }}>
          <StorySubheading style={styles.storyInstance}>
            Forward
          </StorySubheading>
          {new Array(6)
            .fill()
            .map((_, index) => (
              <BpkPaginationDots
                key={index.toString()}
                pageCount={6}
                selectedIndex={index}
                style={styles.storyInstance}
              />
            ))}
        </View>
        <View style={{ flex: 1, alignItems: 'center' }}>
          <StorySubheading style={styles.storyInstance}>
            Backward
          </StorySubheading>
          {new Array(6)
            .fill()
            .map((_, index) => (
              <BpkPaginationDots
                key={index.toString()}
                pageCount={6}
                selectedIndex={5 - index}
                initialDirection="backward"
                style={styles.storyInstance}
              />
            ))}
        </View>
      </View>
    </View>
  ))
  .add('docs:with-overlay', () => (
    <View>
      {new Array(6).fill().map((_, index) => (
        <View
          key={index.toString()}
          style={[styles.colorBlock, { backgroundColor: pageColors[index] }]}
        >
          <BpkPaginationDots pageCount={6} selectedIndex={0} />
        </View>
      ))}
    </View>
  ))
  .add('Stateful example', () => (
    <View>
      <StatefulBpkPaginationExample />
    </View>
  ));
