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

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet } from 'react-native';
import { storiesOf } from '@storybook/react-native';
import { spacingMd } from 'bpk-tokens/tokens/base.react.native';
import BpkThemeProvider from 'react-native-bpk-theming';
import CenterDecorator from '../../storybook/CenterDecorator';
import BpkButton from '../react-native-bpk-component-button';
import BpkText from '../react-native-bpk-component-text';
import BpkProgress from './index';
import themeAttributes from '../../storybook/themeAttributes';

const styles = StyleSheet.create({
  barContainer: {
    marginBottom: spacingMd,
  },
  steps: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: spacingMd,
  },
});

class ProgressContainer extends Component {
  constructor(props) {
    super();

    this.state = {
      progress: props.initialValue,
    };
  }

  handleChange = progress => {
    this.setState({ progress });
  };

  render() {
    const { steps, ...rest } = this.props;

    delete rest.initialValue;

    return (
      <View>
        <View style={styles.barContainer}>
          <BpkText>Default</BpkText>
          <BpkProgress
            min={0}
            max={100}
            value={this.state.progress}
            accessibilityLabel={(min, max, value) =>
              `${value} percent of ${max}`
            }
          />
        </View>
        <View style={styles.barContainer}>
          <BpkText>Bar</BpkText>
          <BpkProgress
            min={0}
            max={100}
            value={this.state.progress}
            type="bar"
            accessibilityLabel={(min, max, value) =>
              `${value} percent of ${max}`
            }
          />
        </View>
        <View style={styles.steps}>
          {steps.map(step => (
            <BpkButton
              key={step}
              type="secondary"
              onPress={() => this.handleChange(step)}
              title={`${step}`}
              style={styles.step}
            />
          ))}
        </View>
      </View>
    );
  }
}

ProgressContainer.propTypes = {
  steps: PropTypes.arrayOf(PropTypes.number).isRequired,
  initialValue: PropTypes.number.isRequired,
};

storiesOf('react-native-bpk-component-progress', module)
  .addDecorator(CenterDecorator)
  .add('default', () => (
    <ProgressContainer initialValue={40} steps={[0, 25, 50, 75, 100]} />
  ))
  .add('docs:default', () => <ProgressContainer initialValue={40} steps={[]} />)
  .add('theme:default', () => (
    <BpkThemeProvider theme={themeAttributes}>
      <ProgressContainer initialValue={40} steps={[0, 25, 50, 75, 100]} />
    </BpkThemeProvider>
  ));
