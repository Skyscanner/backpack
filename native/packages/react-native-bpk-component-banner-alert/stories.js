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

import React from 'react';
import { StyleSheet, View, ViewPropTypes } from 'react-native';
import PropTypes from 'prop-types';
import { storiesOf } from '@storybook/react-native';
import BpkText from 'react-native-bpk-component-text';
import BpkButton from 'react-native-bpk-component-button';
import { spacingBase } from 'bpk-tokens/tokens/base.react.native';
import CenterDecorator from '../../storybook/CenterDecorator';

import BpkBannerAlert, { ALERT_TYPES } from './index';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: spacingBase,
  },
  bannerAlert: {
    marginBottom: spacingBase,
  },
  button: {
    marginBottom: spacingBase,
  },
  child: {},
});

class ExpandableBannerAlert extends React.Component {
  constructor() {
    super();

    this.state = {
      expanded: false,
    };

    this.onToggleExpanded = this.onToggleExpanded.bind(this);
  }

  onToggleExpanded() {
    this.setState({ expanded: !this.state.expanded });
  }

  render() {
    return (
      <BpkBannerAlert
        {...this.props}
        onToggleExpanded={this.onToggleExpanded}
        expanded={this.state.expanded}
        toggleExpandedButtonLabel={this.state.expanded ? 'Collapse' : 'Expand'}
      />
    );
  }
}

// eslint-disable-next-line react/no-multi-comp
class DismissableBannerAlert extends React.Component {
  constructor() {
    super();

    this.state = {
      show: true,
    };

    this.onDismiss = this.onDismiss.bind(this);
  }

  onDismiss() {
    this.setState({ show: false });
  }

  render() {
    return (
      <BpkBannerAlert
        {...this.props}
        show={this.state.show}
        onDismiss={this.onDismiss}
        dismissable
      />
    );
  }
}

// eslint-disable-next-line react/no-multi-comp
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
          style={styles.button}
        />
        <View>
          {[...Array(this.state.bannerAlertCount)].map((e, i) => (
            <DismissableBannerAlert
              key={i.toString()}
              bannerStyle={this.props.bannerStyle}
              message={this.props.message}
              type={this.props.type}
              animateOnEnter
              dismissable
              dismissButtonLabel={this.props.dismissButtonLabel}
            />
          ))}
        </View>
      </View>
    );
  }
}

BpkBannerAlertFadeDemo.propTypes = {
  dismissButtonLabel: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  bannerStyle: ViewPropTypes.style,
  type: PropTypes.string.isRequired,
};

BpkBannerAlertFadeDemo.defaultProps = {
  bannerStyle: null,
};

storiesOf('react-native-bpk-component-banner-alert', module)
  .addDecorator(CenterDecorator)
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
      <DismissableBannerAlert
        bannerStyle={styles.bannerAlert}
        type={ALERT_TYPES.WARN}
        message="Warn alert with dismiss option."
        dismissButtonLabel="Dismiss"
      />
      <ExpandableBannerAlert
        style={styles.bannerAlert}
        type={ALERT_TYPES.ERROR}
        message="Error alert with more information."
      >
        <BpkText textStyle="sm" style={styles.child}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
          sagittis sagittis purus, id blandit ipsum. Pellentesque nec diam nec
          erat condimentum dapibus. Nunc diam augue, egestas id egestas ut,
          facilisis nec mi. Donec et congue odio, nec laoreet est. Integer
          rhoncus varius arcu, a fringilla libero laoreet at.
        </BpkText>
      </ExpandableBannerAlert>
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
  .add('docs:dismissable', () => (
    <View>
      <DismissableBannerAlert
        bannerStyle={styles.bannerAlert}
        type={ALERT_TYPES.NEUTRAL}
        message="Neutral alert with dismiss option."
        dismissButtonLabel="Dismiss"
      />
      <DismissableBannerAlert
        bannerStyle={styles.bannerAlert}
        type={ALERT_TYPES.NEUTRAL}
        message="Neutral alert with dismiss option and long description with emoji 😀."
        dismissButtonLabel="Dismiss"
      />
      <DismissableBannerAlert
        bannerStyle={styles.bannerAlert}
        type={ALERT_TYPES.SUCCESS}
        message="Successful alert with dismiss option."
        dismissButtonLabel="Dismiss"
      />
      <DismissableBannerAlert
        bannerStyle={styles.bannerAlert}
        type={ALERT_TYPES.WARN}
        message="Warn alert with dismiss option."
        dismissButtonLabel="Dismiss"
      />
      <DismissableBannerAlert
        bannerStyle={styles.bannerAlert}
        type={ALERT_TYPES.ERROR}
        message="Error alert with dismiss option."
        dismissButtonLabel="Dismiss"
      />
    </View>
  ))
  .add('docs:expandable', () => (
    <View>
      <ExpandableBannerAlert
        style={styles.bannerAlert}
        type={ALERT_TYPES.NEUTRAL}
        message="Neutral alert with more information."
      >
        <BpkText textStyle="sm" style={styles.child}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
          sagittis sagittis purus, id blandit ipsum. Pellentesque nec diam nec
          erat condimentum dapibus. Nunc diam augue, egestas id egestas ut,
          facilisis nec mi. Donec et congue odio, nec laoreet est. Integer
          rhoncus varius arcu, a fringilla libero laoreet at.
        </BpkText>
      </ExpandableBannerAlert>
      <ExpandableBannerAlert
        style={styles.bannerAlert}
        type={ALERT_TYPES.NEUTRAL}
        message="Neutral alert with more information and long message with emoji 😀."
      >
        <BpkText textStyle="sm" style={styles.child}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
          sagittis sagittis purus, id blandit ipsum. Pellentesque nec diam nec
          erat condimentum dapibus. Nunc diam augue, egestas id egestas ut,
          facilisis nec mi. Donec et congue odio, nec laoreet est. Integer
          rhoncus varius arcu, a fringilla libero laoreet at.
        </BpkText>
      </ExpandableBannerAlert>
      <ExpandableBannerAlert
        style={styles.bannerAlert}
        type={ALERT_TYPES.SUCCESS}
        message="Successful alert with more information."
      >
        <BpkText textStyle="sm" style={styles.child}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
          sagittis sagittis purus, id blandit ipsum. Pellentesque nec diam nec
          erat condimentum dapibus. Nunc diam augue, egestas id egestas ut,
          facilisis nec mi. Donec et congue odio, nec laoreet est. Integer
          rhoncus varius arcu, a fringilla libero laoreet at.
        </BpkText>
      </ExpandableBannerAlert>
      <ExpandableBannerAlert
        style={styles.bannerAlert}
        type={ALERT_TYPES.WARN}
        message="Warn alert with more information."
      >
        <BpkText textStyle="sm" style={styles.child}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
          sagittis sagittis purus, id blandit ipsum. Pellentesque nec diam nec
          erat condimentum dapibus. Nunc diam augue, egestas id egestas ut,
          facilisis nec mi. Donec et congue odio, nec laoreet est. Integer
          rhoncus varius arcu, a fringilla libero laoreet at.
        </BpkText>
      </ExpandableBannerAlert>
      <ExpandableBannerAlert
        style={styles.bannerAlert}
        type={ALERT_TYPES.ERROR}
        message="Error alert with more information."
      >
        <BpkText textStyle="sm" style={styles.child}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
          sagittis sagittis purus, id blandit ipsum. Pellentesque nec diam nec
          erat condimentum dapibus. Nunc diam augue, egestas id egestas ut,
          facilisis nec mi. Donec et congue odio, nec laoreet est. Integer
          rhoncus varius arcu, a fringilla libero laoreet at.
        </BpkText>
      </ExpandableBannerAlert>
    </View>
  ))
  .add('docs:fade-in', () => (
    <BpkBannerAlertFadeDemo
      bannerStyle={styles.bannerAlert}
      message="Banner alert with dismiss option"
      dismissButtonLabel="Dismiss"
      type={ALERT_TYPES.SUCCESS}
    />
  ))
  .add('docs:edge-cases', () => {
    // eslint-disable-next-line max-len
    const message =
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque sagittis sagittis purus, id blandit ipsum.';

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
          dismissButtonLabel="Dismiss"
          dismissable
        />
        <BpkBannerAlert
          style={styles.bannerAlert}
          type={ALERT_TYPES.ERROR}
          message={message}
          toggleExpandedButtonLabel="Collapse"
          expanded
        >
          <BpkText textStyle="sm" style={styles.child}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
            sagittis sagittis purus, id blandit ipsum. Pellentesque nec diam nec
            erat condimentum dapibus. Nunc diam augue, egestas id egestas ut,
            facilisis nec mi. Donec et congue odio, nec laoreet est. Integer
            rhoncus varius arcu, a fringilla libero laoreet at.
          </BpkText>
        </BpkBannerAlert>
      </View>
    );
  });
