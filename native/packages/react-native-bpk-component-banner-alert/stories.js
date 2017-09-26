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
import { storiesOf } from '@storybook/react-native';
import { StyleSheet, View, Platform } from 'react-native';
import BpkText from 'react-native-bpk-component-text';
import BpkBannerAlert, { ALERT_TYPES } from './index';

const tokens = Platform.select({
  ios: () => require('bpk-tokens/tokens/ios/base.react.native.common.js'), // eslint-disable-line global-require
  android: () => require('bpk-tokens/tokens/android/base.react.native.common.js'), // eslint-disable-line global-require
})();

const {
  spacingSm,
  spacingBase,
} = tokens;

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    padding: spacingSm,
    width: '100%',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: spacingBase,
  },
  bannerAlert: {
    marginBottom: spacingBase,
  },
});

storiesOf('BpkBannerAlert', module)
  .addDecorator(getStory =>
    <View style={styles.centered}>
      {getStory()}
    </View>,
  )
  .add('docs:banner-alerts', () => (
    <View style={styles.container}>
      <BpkBannerAlert
        style={styles.bannerAlert}
        type={ALERT_TYPES.SUCCESS}
        message="test"
      />
      <BpkBannerAlert
        style={styles.bannerAlert}
        type={ALERT_TYPES.WARN}
        message="test"
        toggleButtonLabel="Dismiss"
        dismissable
      />
      <BpkBannerAlert
        style={styles.bannerAlert}
        type={ALERT_TYPES.ERROR}
        message="test"
        toggleButtonLabel="Expand"
      >
        <BpkText>ASDF</BpkText>
      </BpkBannerAlert>
      <BpkBannerAlert
        style={styles.bannerAlert}
        type={ALERT_TYPES.ERROR}
        message="test"
        toggleButtonLabel="Collapse"
        expanded
      >
        <BpkText>ASDF</BpkText>
      </BpkBannerAlert>
    </View>
  ))
  .add('docs:default', () => (
    <View style={styles.container}>
      <BpkBannerAlert
        style={styles.bannerAlert}
        type={ALERT_TYPES.SUCCESS}
        message="test"
      />
      <BpkBannerAlert
        style={styles.bannerAlert}
        type={ALERT_TYPES.WARN}
        message="test"
      />
      <BpkBannerAlert
        style={styles.bannerAlert}
        type={ALERT_TYPES.ERROR}
        message="test"
      />
    </View>
  ))
  .add('docs:dismissable', () => (
    <View style={styles.container}>
      <BpkBannerAlert
        style={styles.bannerAlert}
        type={ALERT_TYPES.SUCCESS}
        message="test"
        toggleButtonLabel="Dismiss"
        dismissable
      />
      <BpkBannerAlert
        style={styles.bannerAlert}
        type={ALERT_TYPES.WARN}
        message="test"
        toggleButtonLabel="Dismiss"
        dismissable
      />
      <BpkBannerAlert
        style={styles.bannerAlert}
        type={ALERT_TYPES.ERROR}
        message="test"
        toggleButtonLabel="Dismiss"
        dismissable
      />
    </View>
  ))
  .add('docs:expandable', () => (
    <View style={styles.container}>
      <BpkBannerAlert
        style={styles.bannerAlert}
        type={ALERT_TYPES.SUCCESS}
        message="test"
        toggleButtonLabel="Expand"
        expanded={false}
      ><BpkText>ASDF</BpkText></BpkBannerAlert>
      <BpkBannerAlert
        style={styles.bannerAlert}
        type={ALERT_TYPES.SUCCESS}
        message="test"
        toggleButtonLabel="Collapse"
        expanded
      ><BpkText>ASDF</BpkText></BpkBannerAlert>
      <BpkBannerAlert
        style={styles.bannerAlert}
        type={ALERT_TYPES.WARN}
        message="test"
        toggleButtonLabel="Expand"
        expanded={false}
      ><BpkText>ASDF</BpkText></BpkBannerAlert>
      <BpkBannerAlert
        style={styles.bannerAlert}
        type={ALERT_TYPES.WARN}
        message="test"
        toggleButtonLabel="Collapse"
        expanded
      ><BpkText>ASDF</BpkText></BpkBannerAlert>
      <BpkBannerAlert
        style={styles.bannerAlert}
        type={ALERT_TYPES.ERROR}
        message="test"
        toggleButtonLabel="Expand"
        expanded={false}
      ><BpkText>ASDF</BpkText></BpkBannerAlert>
      <BpkBannerAlert
        style={styles.bannerAlert}
        type={ALERT_TYPES.ERROR}
        message="test"
        toggleButtonLabel="Collapse"
        expanded
      ><BpkText>ASDF</BpkText></BpkBannerAlert>
    </View>
  ))
  .add('docs:edge-cases', () => (
    <View style={styles.container}>
      <BpkBannerAlert
        style={styles.bannerAlert}
        type={ALERT_TYPES.SUCCESS}
        message="Lots and lots and lots and lots and lots and lots and lots and lots and lots and lots and lots of text"
      />
      <BpkBannerAlert
        style={styles.bannerAlert}
        type={ALERT_TYPES.WARN}
        message="Lots and lots and lots and lots and lots and lots and lots and lots and lots and lots and lots of text"
        toggleButtonLabel="Dismiss"
        dismissable
      />
      <BpkBannerAlert
        style={styles.bannerAlert}
        type={ALERT_TYPES.ERROR}
        message="Lots and lots and lots and lots and lots and lots and lots and lots and lots and lots and lots of text"
        toggleButtonLabel="Expand"
      >
        <BpkText>
          Much, much, much, much, much, much, much, much, much, much, much, much, much, much, much, much more text
        </BpkText>
      </BpkBannerAlert>
      <BpkBannerAlert
        style={styles.bannerAlert}
        type={ALERT_TYPES.ERROR}
        message="Lots and lots and lots and lots and lots and lots and lots and lots and lots and lots and lots of text"
        toggleButtonLabel="Collapse"
        expanded
      >
        <BpkText>
          Much, much, much, much, much, much, much, much, much, much, much, much, much, much, much, much more text
        </BpkText>
      </BpkBannerAlert>
    </View>
  ));
