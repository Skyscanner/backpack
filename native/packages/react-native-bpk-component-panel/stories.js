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
import { storiesOf } from '@storybook/react-native';
import { ScrollView, StyleSheet } from 'react-native';
import BpkText from 'react-native-bpk-component-text';

import BpkPanel, { withDivider } from './index';
import CenterDecorator from '../../storybook/CenterDecorator';

const BpkPanelWithDivider = withDivider(BpkPanel);

const content = (
  <BpkText>
    Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo
    ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis
    parturient montes, nascetur ridiculus mus.
  </BpkText>
);

const mainContent = (
  <BpkText>
    Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo
    ligula eget dolor. Aenean massa.
  </BpkText>
);

const stubContent = <BpkText>Lorem ipsum dolor sit amet.</BpkText>;

const styles = StyleSheet.create({
  panelListScrollView: {
    overflow: 'visible',
  },
  panelListItem: {
    marginTop: 20, // eslint-disable-line backpack/use-tokens
  },
  panelMainStyle: {
    flex: 3,
  },
});

storiesOf('react-native-bpk-component-panel', module)
  .addDecorator(CenterDecorator)
  .add('docs:default', () => <BpkPanel>{content}</BpkPanel>)
  .add('docs:without-padding', () => (
    <BpkPanel padded={false}>{content}</BpkPanel>
  ))
  .add('docs:with-divider', () => (
    <BpkPanelWithDivider stub={stubContent} mainStyle={styles.panelMainStyle}>
      {mainContent}
    </BpkPanelWithDivider>
  ))
  .add('docs:with-divider-arranged-vertically', () => (
    <BpkPanelWithDivider stub={stubContent} vertical>
      {mainContent}
    </BpkPanelWithDivider>
  ))
  .add('With divider no padding', () => (
    <BpkPanelWithDivider
      stub={stubContent}
      mainStyle={styles.panelMainStyle}
      padded={false}
    >
      {mainContent}
    </BpkPanelWithDivider>
  ))
  .add('All Panels', () => (
    <ScrollView style={styles.panelListScrollView}>
      <BpkPanel style={styles.panelListItem}>{content}</BpkPanel>
      <BpkPanel style={styles.panelListItem} padded={false}>
        {content}
      </BpkPanel>
      <BpkPanelWithDivider
        stub={stubContent}
        style={styles.panelListItem}
        mainStyle={styles.panelMainStyle}
      >
        {mainContent}
      </BpkPanelWithDivider>
      <BpkPanelWithDivider
        stub={stubContent}
        style={styles.panelListItem}
        mainStyle={styles.panelMainStyle}
        padded={false}
      >
        {mainContent}
      </BpkPanelWithDivider>
    </ScrollView>
  ))
  .add('Panel list (perf)', () => (
    <ScrollView style={styles.panelListScrollView}>
      {Array(100)
        .fill(content)
        .map((panelContent, index) => (
          <BpkPanel
            key={index} // eslint-disable-line react/no-array-index-key
            style={styles.panelListItem}
          >
            {panelContent}
          </BpkPanel>
        ))}
    </ScrollView>
  ))
  .add('Panel with divider list (perf)', () => (
    <ScrollView style={styles.panelListScrollView}>
      {Array(100)
        .fill({ mainContent, stubContent })
        .map((panelContent, index) => {
          const isEven = index % 2 === 0;

          return (
            <BpkPanelWithDivider
              key={index} // eslint-disable-line react/no-array-index-key
              stub={panelContent.stubContent}
              style={styles.panelListItem}
              mainStyle={isEven ? null : styles.panelMainStyle}
              vertical={isEven}
            >
              {panelContent.mainContent}
            </BpkPanelWithDivider>
          );
        })}
    </ScrollView>
  ));
