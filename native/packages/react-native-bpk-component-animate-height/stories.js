/*
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2017 Skyscanner Ltd
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

import React from 'react';
import PropTypes from 'prop-types';
import { storiesOf } from '@storybook/react-native';
import { StyleSheet, View } from 'react-native';
import BpkText from 'react-native-bpk-component-text';
import BpkButton from 'react-native-bpk-component-button';
import { spacingBase, colorGray50, animationDurationBase } from 'bpk-tokens/tokens/base.react.native';

import BpkAnimateHeight from './index';

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    padding: spacingBase,
    width: '100%',
    backgroundColor: colorGray50,
  },
  container: {
    marginBottom: spacingBase,
  },
});

const animateHeightContent = (
  <BpkText>
    Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean
    commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus
    et magnis dis parturient montes, nascetur ridiculus mus.
  </BpkText>
);

class AnimateHeightDemo extends React.Component {
  constructor() {
    super();

    this.state = {
      expanded: false,
    };

    this.onToggle = this.onToggle.bind(this);
  }

  onToggle() {
    this.setState({ expanded: !this.state.expanded });
  }

  render() {
    return (
      <View>
        <BpkAnimateHeight
          expanded={this.state.expanded}
          expandDelay={this.props.expandDelay}
          collapseDelay={this.props.collapseDelay}
          animationDuration={this.props.animationDuration}
          style={{ marginBottom: spacingBase }}
        >
          {this.props.children}
        </BpkAnimateHeight>
        <BpkButton title="Toggle" onPress={this.onToggle} />
      </View>
    );
  }
}

AnimateHeightDemo.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  expandDelay: PropTypes.number,
  collapseDelay: PropTypes.number,
  animationDuration: PropTypes.number,
};

AnimateHeightDemo.defaultProps = {
  children: null,
  expandDelay: 0,
  collapseDelay: 0,
  animationDuration: parseInt(animationDurationBase, 10),
};

storiesOf('BpkAnimateHeight', module)
  .addDecorator(getStory => (
    <View style={styles.centered}>
      {getStory()}
    </View>
  ))
  .add('Default', () => (
    <AnimateHeightDemo>{animateHeightContent}</AnimateHeightDemo>
  ))
  .add('Custom animation duration', () => (
    <AnimateHeightDemo animationDuration={5000}>{animateHeightContent}</AnimateHeightDemo>
  ))
  .add('With expand delay', () => (
    <AnimateHeightDemo expandDelay={1000}>{animateHeightContent}</AnimateHeightDemo>
  ))
  .add('With collapse delay', () => (
    <AnimateHeightDemo collapseDelay={1000}>{animateHeightContent}</AnimateHeightDemo>
  ));
