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

import PropTypes from 'prop-types';
import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { StyleSheet, View, ViewPropTypes, Platform } from 'react-native';
import BpkText from 'react-native-bpk-component-text';
import BpkButton from 'react-native-bpk-component-button';
import BpkBannerAlert, { ALERT_TYPES } from './index';

const tokens = Platform.select({
  ios: () => require('bpk-tokens/tokens/ios/base.react.native.common.js'), // eslint-disable-line global-require
  android: () => require('bpk-tokens/tokens/android/base.react.native.common.js'), // eslint-disable-line global-require
})();

const { spacingBase } = tokens;

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
  },
});

class BpkBannerAlertFadeDemo extends React.Component {
  constructor() {
    super();

    this.state = {
      bannerAlertCount: 0,
    };

    this.addBannerAlert = this.addBannerAlert.bind(this);
  }

  addBannerAlert() {
    this.setState({
      bannerAlertCount: this.state.bannerAlertCount + 1,
    });
  }

  render() {
    return (
      <View>
        <BpkButton
          title="Add banner alert!"
          onPress={this.addBannerAlert}
          style={styles.bannerAlert}
        />
        <View>
          {[...Array(this.state.bannerAlertCount)].map((e, i) => (
            <BpkBannerAlert
              key={i.toString()}
              style={this.props.style}
              message={this.props.message}
              type={this.props.type}
              animateOnEnter
              dismissable
              dismissButtonLabel={this.props.actionButtonLabel}
            />
        ))}
        </View>
      </View>
    );
  }
}

BpkBannerAlertFadeDemo.propTypes = {
  actionButtonLabel: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  style: ViewPropTypes.style,
  type: PropTypes.string.isRequired,
};

BpkBannerAlertFadeDemo.defaultProps = {
  style: null,
};

storiesOf('BpkBannerAlert', module)
  .add('docs:banner-alerts', () => (
    <View>
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
        dismissable
        style={styles.bannerAlert}
        type={ALERT_TYPES.WARN}
        message="Warn alert with dismiss option."
        actionButtonLabel="Dismiss"
      />
      <BpkBannerAlert
        style={styles.bannerAlert}
        type={ALERT_TYPES.ERROR}
        message="Error alert with more information."
        actionButtonLabel="Expand"
      >
        <BpkText textStyle="sm" style={styles.child}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque sagittis sagittis purus, id blandit ipsum.
            Pellentesque nec diam nec erat condimentum dapibus. Nunc diam augue, egestas id egestas ut, facilisis
            nec mi. Donec et congue odio, nec laoreet est. Integer rhoncus varius arcu, a fringilla libero laoreet at.
        </BpkText>
      </BpkBannerAlert>
    </View>
  ))
  .add('docs:default', () => (
    <View>
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
  .add('docs:expandable', () => (
    <View style={styles.container}>
      <BpkBannerAlert
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
      </BpkBannerAlert>
      <BpkBannerAlert
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
      </BpkBannerAlert>
      <BpkBannerAlert
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
      </BpkBannerAlert>
      <BpkBannerAlert
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
      </BpkBannerAlert>
    </View>
  ))
  .add('docs:dismissable', () => (
    <View style={styles.container}>
      <BpkBannerAlert
        dismissable
        style={styles.bannerAlert}
        type={ALERT_TYPES.NEUTRAL}
        message="Neutral alert with dismiss option."
        actionButtonLabel="Dismiss"
      />
      <BpkBannerAlert
        dismissable
        style={styles.bannerAlert}
        type={ALERT_TYPES.SUCCESS}
        message="Successful alert with dismiss option."
        actionButtonLabel="Dismiss"
      />
      <BpkBannerAlert
        dismissable
        style={styles.bannerAlert}
        type={ALERT_TYPES.WARN}
        message="Warn alert with dismiss option."
        actionButtonLabel="Dismiss"
      />
      <BpkBannerAlert
        dismissable
        style={styles.bannerAlert}
        type={ALERT_TYPES.ERROR}
        message="Error alert with dismiss option."
        actionButtonLabel="Dismiss"
      />
    </View>
  ))
  .add('docs:animateOnEnter', () => (
    <BpkBannerAlertFadeDemo
      style={styles.bannerAlert}
      type={ALERT_TYPES.NEUTRAL}
      message="Neutral alert with dismiss option."
      actionButtonLabel="Dismiss"
    />
  ))
  .add('docs:edge-cases', () => {
    /* eslint-disable max-len */
    const message = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque sagittis sagittis purus, id blandit ipsum.';
    return (
      <View>
        <BpkBannerAlert
          style={styles.bannerAlert}
          type={ALERT_TYPES.NEUTRAL}
          message={message}
        />
        <BpkBannerAlert
          style={styles.bannerAlert}
          type={ALERT_TYPES.SUCCESS}
          message={message}
        />
        <BpkBannerAlert
          style={styles.bannerAlert}
          type={ALERT_TYPES.WARN}
          message={message}
          actionButtonLabel="Dismiss"
          dismissable
        />
        <BpkBannerAlert
          style={styles.bannerAlert}
          type={ALERT_TYPES.ERROR}
          message={message}
          actionButtonLabel="Expand"
        >
          <BpkText textStyle="sm" style={styles.child}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque sagittis sagittis purus, id blandit ipsum. Pellentesque nec diam nec erat condimentum dapibus. Nunc diam augue, egestas id egestas ut, facilisis nec mi. Donec et congue odio, nec laoreet est. Integer rhoncus varius arcu, a fringilla libero laoreet at.
          </BpkText>
        </BpkBannerAlert>
        <BpkBannerAlert
          style={styles.bannerAlert}
          type={ALERT_TYPES.ERROR}
          message={message}
          actionButtonLabel="Collapse"
          expanded
        >
          <BpkText textStyle="sm" style={styles.child}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque sagittis sagittis purus, id blandit ipsum. Pellentesque nec diam nec erat condimentum dapibus. Nunc diam augue, egestas id egestas ut, facilisis nec mi. Donec et congue odio, nec laoreet est. Integer rhoncus varius arcu, a fringilla libero laoreet at.
          </BpkText>
        </BpkBannerAlert>
      </View>
    );
    /* eslint-enable */
  });
