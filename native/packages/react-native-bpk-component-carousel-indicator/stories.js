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
import { StyleSheet, View } from 'react-native';
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
import { StorySubheading } from '../../storybook/TextStyles';

import BpkCarouselIndicator from './index';

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

class StatefulBpkCarouselIndicatorExample extends React.Component<
  {},
  {
    pageCount: number,
    selectedIndex: number,
  },
> {
  constructor(props) {
    super(props);
    this.state = {
      pageCount: 5,
      selectedIndex: 0,
    };
  }

  handlePageCountChange = pageCount => {
    let { selectedIndex } = this.state;
    if (selectedIndex >= pageCount) {
      selectedIndex = pageCount - 1;
    }
    this.setState({ pageCount, selectedIndex });
  };

  handleSelectedIndexChange = selectedIndex => {
    this.setState({ selectedIndex });
  };

  render() {
    const { pageCount, selectedIndex } = this.state;
    return (
      <View>
        <View style={styles.overlay}>
          <BpkCarouselIndicator
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

storiesOf('react-native-bpk-component-carousel-indicator', module)
  .addDecorator(CenterDecorator)
  .add('docs:default', () => (
    <View>
      {new Array(5).fill().map((_, index) => (
        <View key={index.toString()} style={styles.storyInstance}>
          <StorySubheading>
            {index + 1} page{index === 0 ? '' : 's'}
          </StorySubheading>
          <BpkCarouselIndicator pageCount={index + 1} selectedIndex={0} />
        </View>
      ))}
      <View style={styles.storyInstance}>
        <StorySubheading>
          More than 5 pages (shown with different selected indexes)
        </StorySubheading>
        {new Array(6)
          .fill()
          .map((_, index) => (
            <BpkCarouselIndicator
              key={index.toString()}
              pageCount={6}
              selectedIndex={index}
              style={styles.storyInstance}
            />
          ))}
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
          <BpkCarouselIndicator pageCount={6} selectedIndex={0} />
        </View>
      ))}
    </View>
  ))
  .add('Stateful example', () => (
    <View>
      <StatefulBpkCarouselIndicatorExample />
    </View>
  ));
