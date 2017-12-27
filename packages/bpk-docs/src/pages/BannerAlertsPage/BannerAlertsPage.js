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

import React, { Component, type Node } from 'react';
import { durationSm, fontWeightBold } from 'bpk-tokens/tokens/base.es6';
import PropTypes from 'prop-types';
import { cssModules, withDefaultProps } from 'bpk-react-utils';
import BpkAnimateHeight from 'bpk-animate-height';
import BpkBannerAlert, {
  ALERT_TYPES,
  withBannerAlertState,
} from 'bpk-component-banner-alert';
import BpkCheckBox from 'bpk-component-checkbox';
import BpkButton from 'bpk-component-button';
import bannerAlertReadme from 'bpk-component-banner-alert/readme.md';
import DocsPageBuilder from './../../components/DocsPageBuilder';
import Paragraph from './../../components/Paragraph';

import STYLES from './bpk-banner-alerts-page.scss';

const getClassName = cssModules(STYLES);
const componentClassName = getClassName('bpk-banner-alerts-page__component');

const BannerAlert = withDefaultProps(withBannerAlertState(BpkBannerAlert), {
  className: componentClassName,
  toggleButtonLabel: 'See more',
});

const longMessage = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque sagittis sagittis purus, id
blandit ipsum. Pellentesque nec diam nec erat condimentum dapibus. Nunc diam augue, egestas id egestas ut, facilisis
nec mi. Donec et congue odio, nec laoreet est. Integer rhoncus varius arcu, a fringilla libero laoreet at. Mauris
porta varius ullamcorper. Sed laoreet libero mauris, non pretium lectus accumsan et. Suspendisse vehicula ullamcorper
sapien, et dapibus mi aliquet non. Pellentesque auctor sagittis lectus vitae rhoncus. Fusce id enim porttitor, mattis
ante in, vestibulum nulla.`;
const richMessage = (
  <span style={{ fontWeight: fontWeightBold }}>
    Successful alert with custom rendered message
  </span>
);

type ToggleShowBannerProps = {
  initiallyShown: boolean,
  className: ?string,
};

type ToggleShowBannerState = {
  show: boolean,
};

class ToggleShowBanner extends Component<
  ToggleShowBannerProps,
  ToggleShowBannerState,
> {
  static propTypes = {
    initiallyShown: PropTypes.bool.isRequired,
    className: PropTypes.string,
  };

  static defaultProps = {
    className: null,
  };

  constructor(props) {
    super(props);

    this.state = {
      show: this.props.initiallyShown,
    };
  }

  toggle = (): void => {
    this.setState({
      show: !this.state.show,
    });
  };

  render(): Node {
    return (
      <div className={this.props.className}>
        <BpkCheckBox
          name="show"
          label="show"
          checked={this.state.show}
          onChange={this.toggle}
        />
        <BpkBannerAlert
          bannerClassName={componentClassName}
          message={this.state.show ? 'show = true' : 'show = false'}
          type={ALERT_TYPES.SUCCESS}
          show={this.state.show}
          animateOnEnter
          animateOnLeave
        />
      </div>
    );
  }
}

type Props = {
  message: ?string,
  type: string,
};

type State = {
  show: boolean,
};

// eslint-disable-next-line react/no-multi-comp
class BpkBannerDismissable extends Component<Props, State> {
  setDismissed: Function;

  static propTypes = {
    type: PropTypes.string.isRequired,
    message: PropTypes.string,
  };

  static defaultProps = {
    message: null,
  };

  constructor() {
    super();

    this.setDismissed = this.setDismissed.bind(this);

    this.state = {
      show: true,
    };
  }

  setDismissed() {
    this.setState({
      show: false,
    });
  }

  render() {
    const { message, type, ...rest } = this.props;

    return (
      <BpkBannerAlert
        bannerClassName={componentClassName}
        message={message}
        type={type}
        dismissable
        onDismiss={this.setDismissed}
        show={this.state.show}
        dismissButtonLabel="Dismiss"
        {...rest}
      />
    );
  }
}

type BannerAlertConfig = {
  show: boolean,
  message: string,
  type: string,
};
type DismissDemoState = {
  dirty: boolean,
  bannerAlerts: Array<BannerAlertConfig>,
};
// eslint-disable-next-line react/no-multi-comp
class BpkBannerAlertDismissDemo extends Component<any, DismissDemoState> {
  reset: Function;
  setDismissed: Function;
  bannerAlerts: Array<BannerAlertConfig>;

  constructor() {
    super();

    this.bannerAlerts = [
      {
        show: true,
        message: 'Neutral alert with dismiss option.',
        type: ALERT_TYPES.NEUTRAL,
      },
      {
        show: true,
        message: 'Successful alert with dismiss option.',
        type: ALERT_TYPES.SUCCESS,
      },
      {
        show: true,
        message: 'Warn alert with dismiss option.',
        type: ALERT_TYPES.WARN,
      },
      {
        show: true,
        message: 'Error alert with dismiss option.',
        type: ALERT_TYPES.ERROR,
      },
    ];

    this.reset = this.reset.bind(this);
    this.setDismissed = this.setDismissed.bind(this);

    this.state = {
      bannerAlerts: JSON.parse(JSON.stringify(this.bannerAlerts)),
      dirty: false,
    };
  }

  setDismissed(index) {
    const updatedBannerAlerts = JSON.parse(
      JSON.stringify(this.state.bannerAlerts),
    );
    updatedBannerAlerts[index].show = false;
    this.setState({
      bannerAlerts: updatedBannerAlerts,
      dirty: true,
    });
  }

  reset() {
    this.setState({
      bannerAlerts: JSON.parse(JSON.stringify(this.bannerAlerts)),
      dirty: false,
    });
  }

  render() {
    return (
      <div className={getClassName('bpk-banner-alerts-page__demo')}>
        {this.state.bannerAlerts.map((b, i) => (
          <BpkBannerAlert
            bannerClassName={componentClassName}
            dismissable
            dismissButtonLabel="Dismiss"
            key={i.toString()}
            message={b.message}
            onDismiss={() => this.setDismissed(i)}
            show={b.show}
            type={b.type}
          />
        ))}
        <BpkAnimateHeight
          height={this.state.dirty ? 'auto' : 0}
          duration={parseInt(durationSm, 10)}
        >
          <BpkButton
            className={componentClassName}
            onClick={this.reset}
            destructive
          >
            Reset
          </BpkButton>
        </BpkAnimateHeight>
      </div>
    );
  }
}

type FadeDemoProps = {
  type: string,
  message: ?string,
};
type FadeDemoState = {
  bannerAlertCount: number,
};
// eslint-disable-next-line react/no-multi-comp
class BpkBannerAlertFadeDemo extends Component<FadeDemoProps, FadeDemoState> {
  addBannerAlert: Function;

  static propTypes = {
    type: PropTypes.string.isRequired,
    message: PropTypes.string,
  };

  static defaultProps = {
    message: null,
  };
  constructor() {
    super();

    this.addBannerAlert = this.addBannerAlert.bind(this);

    this.state = {
      bannerAlertCount: 0,
    };
  }

  addBannerAlert() {
    this.setState({
      bannerAlertCount: (this.state.bannerAlertCount += 1),
    });
  }

  render() {
    return (
      <div>
        <BpkButton onClick={this.addBannerAlert}>Add banner alert!</BpkButton>
        {[...Array(this.state.bannerAlertCount)].map((e, i) => (
          <BpkBannerDismissable
            bannerClassName={componentClassName}
            key={i.toString()}
            message={this.props.message}
            type={this.props.type}
            animateOnEnter
            dismissable
            dismissButtonLabel="Dismiss"
          />
        ))}
      </div>
    );
  }
}

const components = [
  {
    id: 'default',
    title: 'Default',
    blurb: [
      <Paragraph>
        Banner alerts come in four styles to indicate success, warning or error,
        or some neutral information.
      </Paragraph>,
    ],
    examples: [
      <BannerAlert message="Neutral alert." type={ALERT_TYPES.NEUTRAL} />,
      <BannerAlert message="Successful alert." type={ALERT_TYPES.SUCCESS} />,
      <BannerAlert message={richMessage} type={ALERT_TYPES.SUCCESS} />,
      <BannerAlert message="Warn alert." type={ALERT_TYPES.WARN} />,
      <BannerAlert message="Error alert." type={ALERT_TYPES.ERROR} />,
    ],
  },
  {
    id: 'expandable',
    title: 'Expandable',
    blurb: [
      <Paragraph>
        They can be configured to display further information to the user in the
        form of an expandable panel.
      </Paragraph>,
    ],
    examples: [
      <BannerAlert
        message="neutral alert with more information."
        type={ALERT_TYPES.NEUTRAL}
      >
        {longMessage}
      </BannerAlert>,
      <BannerAlert
        message="Successful alert with more information."
        type={ALERT_TYPES.SUCCESS}
      >
        {longMessage}
      </BannerAlert>,
      <BannerAlert
        message="Warn alert with more information."
        type={ALERT_TYPES.WARN}
      >
        {longMessage}
      </BannerAlert>,
      <BannerAlert
        message="Error alert with more information."
        type={ALERT_TYPES.ERROR}
      >
        {longMessage}
      </BannerAlert>,
    ],
  },
  {
    id: 'dismissable',
    title: 'Dismissable',
    blurb: [
      <Paragraph>
        Banner alerts can be configured to include a close icon so that the user
        can dismiss them.
      </Paragraph>,
    ],
    examples: [
      <BpkBannerAlertDismissDemo
        message="Neutral alert with dismiss option."
        type={ALERT_TYPES.NEUTRAL}
      />,
    ],
  },
  {
    id: 'animateOnEnter',
    title: 'With Enter Animation',
    blurb: [
      <Paragraph>
        Banner alerts can be configured to animate when first added to the DOM.
      </Paragraph>,
    ],
    examples: [
      <BpkBannerAlertFadeDemo
        bannerClassName={componentClassName}
        message="Neutral alert with dismiss option."
        type={ALERT_TYPES.NEUTRAL}
        dismissable
        dismissButtonLabel="Dismiss"
      />,
    ],
  },
  {
    id: 'toggleShow',
    title: 'Toggle show prop',
    blurb: [],
    examples: [
      <ToggleShowBanner initiallyShown={false} />,
      <ToggleShowBanner initiallyShown className={componentClassName} />,
    ],
  },
  {
    id: 'withBannerAlertState',
    title: 'withBannerAlertState',
    blurb: [
      <Paragraph>
        Most common use of &quot;expandable&quot; and &quot;dismissable&quot;
        can be easily achieved using the &quot;withBannerAlertState&quot; HOC.
      </Paragraph>,
      <Paragraph>
        It also adds the option to automatically dismiss a banner after a
        certain period of time has elapsed.
      </Paragraph>,
    ],
  },
];

const BannerAlertsPage = () => (
  <DocsPageBuilder
    title="Banner alerts"
    blurb={[
      <Paragraph>
        Banner alerts provide feedback to the user when an action has been
        performed.
      </Paragraph>,
    ]}
    components={components}
    sassdocId="notifications"
    readme={bannerAlertReadme}
  />
);

export default BannerAlertsPage;
