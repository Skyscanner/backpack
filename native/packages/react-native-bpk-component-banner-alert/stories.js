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
  colorGray500,
  spacingBase,
} = tokens;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: spacingBase,
  },
  bannerAlert: {
    marginBottom: spacingBase,
  },
  child: {
    color: colorGray500,
  },
});

class ExpandableBannerAlert extends React.Component {
  state = {
    expanded: false,
  }

  onAction = () => {
    this.setState({ expanded: !this.state.expanded });
  };

  render() {
    return (
      <BpkBannerAlert
        {...this.props}
        onAction={this.onAction}
        expanded={this.state.expanded}
      />
    );
  }
}

 // eslint-disable-next-line react/no-multi-comp
class DismissableBannerAlert extends React.Component {
  state = {
    exists: true,
  }

  onAction = () => {
    this.setState({ exists: false });
  };

  render() {
    if (this.state.exists) {
      return (
        <BpkBannerAlert
          {...this.props}
          onAction={this.onAction}
          dismissable
        />
      );
    }
    return null;
  }
}

storiesOf('BpkBannerAlert', module)
  .add('docs:banner-alerts', () => (
    <View style={styles.container}>
      <BpkBannerAlert
        style={styles.bannerAlert}
        type={ALERT_TYPES.NEUTRAL}
        message="Neutral alert."
      />
      <BpkBannerAlert
        style={styles.bannerAlert}
        type={ALERT_TYPES.SUCCESS}
        message="Successful alert."
      />
      <DismissableBannerAlert
        style={styles.bannerAlert}
        type={ALERT_TYPES.WARN}
        message="Warn alert with dismiss option."
        actionButtonLabel="Dismiss"
      />
      <ExpandableBannerAlert
        style={styles.bannerAlert}
        type={ALERT_TYPES.ERROR}
        message="Error alert with more information."
        actionButtonLabel="Expand"
      >
        <BpkText textStyle="sm" style={styles.child}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque sagittis sagittis purus, id blandit ipsum.
          Pellentesque nec diam nec erat condimentum dapibus. Nunc diam augue, egestas id egestas ut, facilisis nec mi.
          Donec et congue odio, nec laoreet est. Integer rhoncus varius arcu, a fringilla libero laoreet at.
        </BpkText>
      </ExpandableBannerAlert>
    </View>
  ))
  .add('docs:default', () => (
    <View style={styles.container}>
      <BpkBannerAlert
        style={styles.bannerAlert}
        type={ALERT_TYPES.NEUTRAL}
        message="Neutral alert."
      />
      <BpkBannerAlert
        style={styles.bannerAlert}
        type={ALERT_TYPES.SUCCESS}
        message="Successful alert."
      />
      <BpkBannerAlert
        style={styles.bannerAlert}
        type={ALERT_TYPES.WARN}
        message="Warn alert."
      />
      <BpkBannerAlert
        style={styles.bannerAlert}
        type={ALERT_TYPES.ERROR}
        message="Error alert."
      />
    </View>
  ))
  .add('docs:dismissable', () => (
    <View style={styles.container}>
      <DismissableBannerAlert
        style={styles.bannerAlert}
        type={ALERT_TYPES.NEUTRAL}
        message="Neutral alert with dismiss option."
        actionButtonLabel="Dismiss"
      />
      <DismissableBannerAlert
        style={styles.bannerAlert}
        type={ALERT_TYPES.SUCCESS}
        message="Successful alert with dismiss option."
        actionButtonLabel="Dismiss"
      />
      <DismissableBannerAlert
        style={styles.bannerAlert}
        type={ALERT_TYPES.WARN}
        message="Warn alert with dismiss option."
        actionButtonLabel="Dismiss"
      />
      <DismissableBannerAlert
        style={styles.bannerAlert}
        type={ALERT_TYPES.ERROR}
        message="Error alert with dismiss option."
        actionButtonLabel="Dismiss"
      />
    </View>
  ))
  .add('docs:expandable', () => (
    <View style={styles.container}>
      <ExpandableBannerAlert
        style={styles.bannerAlert}
        type={ALERT_TYPES.NEUTRAL}
        message="Neutral alert with more information."
        actionButtonLabel="Collapse"
      >
        <BpkText textStyle="sm" style={styles.child}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque sagittis sagittis purus, id blandit ipsum.
          Pellentesque nec diam nec erat condimentum dapibus. Nunc diam augue, egestas id egestas ut, facilisis nec mi.
          Donec et congue odio, nec laoreet est. Integer rhoncus varius arcu, a fringilla libero laoreet at.
        </BpkText>
      </ExpandableBannerAlert>
      <ExpandableBannerAlert
        style={styles.bannerAlert}
        type={ALERT_TYPES.SUCCESS}
        message="Successful alert with more information."
        actionButtonLabel="Collapse"
      >
        <BpkText textStyle="sm" style={styles.child}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque sagittis sagittis purus, id blandit ipsum.
          Pellentesque nec diam nec erat condimentum dapibus. Nunc diam augue, egestas id egestas ut, facilisis nec mi.
          Donec et congue odio, nec laoreet est. Integer rhoncus varius arcu, a fringilla libero laoreet at.
        </BpkText>
      </ExpandableBannerAlert>
      <ExpandableBannerAlert
        style={styles.bannerAlert}
        type={ALERT_TYPES.WARN}
        message="Warn alert with more information."
        actionButtonLabel="Collapse"
      >
        <BpkText textStyle="sm" style={styles.child}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque sagittis sagittis purus, id blandit ipsum.
          Pellentesque nec diam nec erat condimentum dapibus. Nunc diam augue, egestas id egestas ut, facilisis nec mi.
          Donec et congue odio, nec laoreet est. Integer rhoncus varius arcu, a fringilla libero laoreet at.
        </BpkText>
      </ExpandableBannerAlert>
      <ExpandableBannerAlert
        style={styles.bannerAlert}
        type={ALERT_TYPES.ERROR}
        message="Error alert with more information."
        actionButtonLabel="Collapse"
      >
        <BpkText textStyle="sm" style={styles.child}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque sagittis sagittis purus, id blandit ipsum.
          Pellentesque nec diam nec erat condimentum dapibus. Nunc diam augue, egestas id egestas ut, facilisis nec mi.
          Donec et congue odio, nec laoreet est. Integer rhoncus varius arcu, a fringilla libero laoreet at.
        </BpkText>
      </ExpandableBannerAlert>
    </View>
  ))
  .add('docs:edge-cases', () => (
    <View style={styles.container}>
      <BpkBannerAlert
        style={styles.bannerAlert}
        type={ALERT_TYPES.NEUTRAL}
        message="Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        Quisque sagittis sagittis purus, id blandit ipsum."
      />
      <BpkBannerAlert
        style={styles.bannerAlert}
        type={ALERT_TYPES.SUCCESS}
        message="Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        Quisque sagittis sagittis purus, id blandit ipsum."
      />
      <BpkBannerAlert
        style={styles.bannerAlert}
        type={ALERT_TYPES.WARN}
        message="Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        Quisque sagittis sagittis purus, id blandit ipsum."
        actionButtonLabel="Dismiss"
        dismissable
      />
      <BpkBannerAlert
        style={styles.bannerAlert}
        type={ALERT_TYPES.ERROR}
        message="Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        Quisque sagittis sagittis purus, id blandit ipsum."
        actionButtonLabel="Expand"
      >
        <BpkText textStyle="sm" style={styles.child}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque sagittis sagittis purus, id blandit ipsum.
          Pellentesque nec diam nec erat condimentum dapibus. Nunc diam augue, egestas id egestas ut, facilisis nec mi.
          Donec et congue odio, nec laoreet est. Integer rhoncus varius arcu, a fringilla libero laoreet at.
        </BpkText>
      </BpkBannerAlert>
      <BpkBannerAlert
        style={styles.bannerAlert}
        type={ALERT_TYPES.ERROR}
        message="Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        Quisque sagittis sagittis purus, id blandit ipsum."
        actionButtonLabel="Collapse"
        expanded
      >
        <BpkText textStyle="sm" style={styles.child}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque sagittis sagittis purus, id blandit ipsum.
          Pellentesque nec diam nec erat condimentum dapibus. Nunc diam augue, egestas id egestas ut, facilisis nec mi.
          Donec et congue odio, nec laoreet est. Integer rhoncus varius arcu, a fringilla libero laoreet at.
        </BpkText>
      </BpkBannerAlert>
    </View>
  ));
