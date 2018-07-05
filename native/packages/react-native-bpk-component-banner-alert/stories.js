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

import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { storiesOf } from '@storybook/react-native';
import BpkText from 'react-native-bpk-component-text';
import BpkButton from 'react-native-bpk-component-button';
import { spacingBase } from 'bpk-tokens/tokens/base.react.native';

import CenterDecorator from '../../storybook/CenterDecorator';

import BpkBannerAlert, {
  ALERT_TYPES,
  type BpkBannerAlertProps,
  propTypes as bannerAlertPropTypes,
  defaultProps as bannerAlertDefaultProps,
} from './index';

const styles = StyleSheet.create({
  bannerAlert: {
    marginBottom: spacingBase,
  },
  button: {
    marginBottom: spacingBase,
  },
});

class ExpandableBannerAlert extends Component<
  BpkBannerAlertProps,
  { expanded: boolean },
> {
  static propTypes = {
    ...bannerAlertPropTypes,
    toggleExpandedButtonLabel: PropTypes.string,
  };

  static defaultProps = {
    ...bannerAlertDefaultProps,
    toggleExpandedButtonLabel: null,
  };

  constructor() {
    super();

    this.state = {
      expanded: false,
    };
  }

  onToggleExpanded = () => {
    this.setState(prevState => ({ expanded: !prevState.expanded }));
  };

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
class DismissableBannerAlert extends Component<
  BpkBannerAlertProps,
  { show: boolean },
> {
  static propTypes = { ...bannerAlertPropTypes };

  static defaultProps = { ...bannerAlertDefaultProps };

  constructor() {
    super();

    this.state = {
      show: true,
    };
  }

  onDismiss = () => {
    this.setState({ show: false });
  };

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
class BpkBannerAlertFadeDemo extends Component<
  BpkBannerAlertProps,
  { bannerAlertCount: number },
> {
  static propTypes = { ...bannerAlertPropTypes };

  static defaultProps = { ...bannerAlertDefaultProps };

  constructor() {
    super();

    this.state = {
      bannerAlertCount: 0,
    };
  }

  addBannerAlert = () => {
    this.setState(prevState => ({
      bannerAlertCount: prevState.bannerAlertCount + 1,
    }));
  };

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

storiesOf('react-native-bpk-component-banner-alert', module)
  .addDecorator(CenterDecorator)
  .add('docs:banner-alerts', () => (
    <View>
      <BpkBannerAlert
        style={styles.bannerAlert}
        type={ALERT_TYPES.neutral}
        message="Neutral alert."
      />
      <BpkBannerAlert
        style={styles.bannerAlert}
        type={ALERT_TYPES.success}
        message="Successful alert."
      />
      <DismissableBannerAlert
        bannerStyle={styles.bannerAlert}
        type={ALERT_TYPES.warn}
        message="Warn alert with dismiss option."
        dismissButtonLabel="Dismiss"
      />
      <ExpandableBannerAlert
        style={styles.bannerAlert}
        type={ALERT_TYPES.error}
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
        type={ALERT_TYPES.neutral}
        message="Neutral alert."
      />
      <BpkBannerAlert
        style={styles.bannerAlert}
        type={ALERT_TYPES.success}
        message="Successful alert."
      />
      <BpkBannerAlert
        style={styles.bannerAlert}
        type={ALERT_TYPES.warn}
        message="Warn alert."
      />
      <BpkBannerAlert
        style={styles.bannerAlert}
        type={ALERT_TYPES.error}
        message="Error alert."
      />
    </View>
  ))
  .add('docs:dismissable', () => (
    <View>
      <DismissableBannerAlert
        bannerStyle={styles.bannerAlert}
        type={ALERT_TYPES.neutral}
        message="Neutral alert with dismiss option."
        dismissButtonLabel="Dismiss"
      />
      <DismissableBannerAlert
        bannerStyle={styles.bannerAlert}
        type={ALERT_TYPES.neutral}
        message="Neutral alert with dismiss option and long description with emoji 😀."
        dismissButtonLabel="Dismiss"
      />
      <DismissableBannerAlert
        bannerStyle={styles.bannerAlert}
        type={ALERT_TYPES.success}
        message="Successful alert with dismiss option."
        dismissButtonLabel="Dismiss"
      />
      <DismissableBannerAlert
        bannerStyle={styles.bannerAlert}
        type={ALERT_TYPES.warn}
        message="Warn alert with dismiss option."
        dismissButtonLabel="Dismiss"
      />
      <DismissableBannerAlert
        bannerStyle={styles.bannerAlert}
        type={ALERT_TYPES.error}
        message="Error alert with dismiss option."
        dismissButtonLabel="Dismiss"
      />
    </View>
  ))
  .add('docs:expandable', () => (
    <View>
      <ExpandableBannerAlert
        style={styles.bannerAlert}
        type={ALERT_TYPES.neutral}
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
        type={ALERT_TYPES.neutral}
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
        type={ALERT_TYPES.success}
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
        type={ALERT_TYPES.warn}
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
        type={ALERT_TYPES.error}
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
      type={ALERT_TYPES.success}
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
          type={ALERT_TYPES.neutral}
          message={message}
        />
        <BpkBannerAlert
          style={styles.bannerAlert}
          type={ALERT_TYPES.success}
          message={message}
        />
        <BpkBannerAlert
          style={styles.bannerAlert}
          type={ALERT_TYPES.warn}
          message={message}
          dismissButtonLabel="Dismiss"
          dismissable
          onDismiss={() => null}
        />
        <BpkBannerAlert
          style={styles.bannerAlert}
          type={ALERT_TYPES.error}
          message={message}
          toggleExpandedButtonLabel="Collapse"
          expanded
          onToggleExpanded={() => null}
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
