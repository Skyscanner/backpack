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

import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { storiesOf } from '@storybook/react-native';
import { action } from '@storybook/addon-actions';
import BpkThemeProvider from 'react-native-bpk-theming';
import { spacingBase } from 'bpk-tokens/tokens/base.react.native';
import CenterDecorator from '../../storybook/CenterDecorator';
import themeAttributes from '../../storybook/themeAttributes';
import { StorySubheading } from '../../storybook/TextStyles';
import BpkNudger from './index';

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  nudgerStory: {
    marginBottom: spacingBase,
  },
});

class StatefulBpkNudger extends Component<{}, { value: number }> {
  constructor() {
    super();
    this.state = { value: 1 };
  }
  handleChange = value => {
    this.setState({ value });
  };
  render() {
    return (
      <BpkNudger
        value={this.state.value}
        min={-10}
        max={10}
        decreaseButtonLabel="Decrease"
        increaseButtonLabel="Increase"
        onChange={this.handleChange}
      />
    );
  }
}

const generateStoryNudgers = () => (
  <View style={styles.wrapper}>
    <View style={styles.nudgerStory}>
      <StorySubheading>Standard</StorySubheading>
      <BpkNudger
        value={3}
        min={1}
        max={9}
        decreaseButtonLabel="Decrease"
        increaseButtonLabel="Increase"
        onChange={action('changed')}
      />
    </View>
    <View style={styles.nudgerStory}>
      <StorySubheading>Minus disabled</StorySubheading>
      <BpkNudger
        value={1}
        min={1}
        max={9}
        decreaseButtonLabel="Decrease"
        increaseButtonLabel="Increase"
        onChange={action('changed')}
      />
    </View>
    <View style={styles.nudgerStory}>
      <StorySubheading>Plus disabled</StorySubheading>
      <BpkNudger
        value={9}
        min={1}
        max={9}
        decreaseButtonLabel="Decrease"
        increaseButtonLabel="Increase"
        onChange={action('changed')}
      />
    </View>
  </View>
);

storiesOf('react-native-bpk-component-nudger', module)
  .addDecorator(CenterDecorator)
  .add('docs:default', () => generateStoryNudgers())
  .add('Themed', () => (
    <BpkThemeProvider theme={themeAttributes}>
      {generateStoryNudgers()}
    </BpkThemeProvider>
  ))
  .add('Stateful example', () => <StatefulBpkNudger />)
  .add('Edge cases', () => (
    <View style={styles.wrapper}>
      <View style={styles.nudgerStory}>
        <StorySubheading>High value</StorySubheading>
        <BpkNudger
          value={999999}
          min={1}
          max={999999}
          decreaseButtonLabel="Decrease"
          increaseButtonLabel="Increase"
          onChange={action('changed')}
        />
      </View>
      <View style={styles.nudgerStory}>
        <StorySubheading>value=1, min=5, max=9</StorySubheading>
        <BpkNudger
          value={1}
          min={5}
          max={9}
          decreaseButtonLabel="Decrease"
          increaseButtonLabel="Increase"
          onChange={action('changed')}
        />
      </View>
      <View style={styles.nudgerStory}>
        <StorySubheading>value=9, min=1, max=5</StorySubheading>
        <BpkNudger
          value={1}
          min={5}
          max={9}
          decreaseButtonLabel="Decrease"
          increaseButtonLabel="Increase"
          onChange={action('changed')}
        />
      </View>
      <View style={styles.nudgerStory}>
        <StorySubheading>value=0.5, min=1, max=9</StorySubheading>
        <BpkNudger
          value={0.5}
          min={1}
          max={9}
          decreaseButtonLabel="Decrease"
          increaseButtonLabel="Increase"
          onChange={action('changed')}
        />
      </View>
    </View>
  ));
