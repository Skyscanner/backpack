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
import { fontWeightBold } from 'bpk-tokens/tokens/base.es6';
import { cssModules, withDefaultProps } from 'bpk-react-utils';
import BpkBannerAlert, { ALERT_TYPES } from 'bpk-component-banner-alert';
import bannerAlertReadme from 'bpk-component-banner-alert/readme.md';
import DocsPageBuilder from './../../components/DocsPageBuilder';
import Paragraph from './../../components/Paragraph';

import STYLES from './bpk-banner-alerts-page.scss';

const getClassName = cssModules(STYLES);
const componentClassName = getClassName('bpk-banner-alerts-page__component');

const longMessage = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque sagittis sagittis purus, id
blandit ipsum. Pellentesque nec diam nec erat condimentum dapibus. Nunc diam augue, egestas id egestas ut, facilisis
nec mi. Donec et congue odio, nec laoreet est. Integer rhoncus varius arcu, a fringilla libero laoreet at. Mauris
porta varius ullamcorper. Sed laoreet libero mauris, non pretium lectus accumsan et. Suspendisse vehicula ullamcorper
sapien, et dapibus mi aliquet non. Pellentesque auctor sagittis lectus vitae rhoncus. Fusce id enim porttitor, mattis
ante in, vestibulum nulla.`;
const richMessage = <span style={{ fontWeight: fontWeightBold }}>Successful alert with custom rendered message</span>;

const BannerAlert = withDefaultProps(BpkBannerAlert, {
  className: componentClassName,
});
const BannerAlertExpandable = withDefaultProps(BpkBannerAlert, {
  className: componentClassName,
  toggleButtonLabel: 'See more',
});
const BannerAlertDismissable = withDefaultProps(BpkBannerAlert, {
  className: componentClassName,
  dismissable: true,
  dismissButtonLabel: 'Dismiss',
});

const components = [
  {
    id: 'default',
    title: 'Default',
    blurb: [
      <Paragraph>
        Banner alerts come in four styles to indicate success, warning or error, or some neutral information.
      </Paragraph>,
    ],
    examples: [
      <BannerAlert
        message="Neutral alert."
        type={ALERT_TYPES.NEUTRAL}
      />,
      <BannerAlert
        message="Successful alert."
        type={ALERT_TYPES.SUCCESS}
      />,
      <BannerAlert
        message={richMessage}
        type={ALERT_TYPES.SUCCESS}
      />,
      <BannerAlert
        message="Warn alert."
        type={ALERT_TYPES.WARN}
      />,
      <BannerAlert
        message="Error alert."
        type={ALERT_TYPES.ERROR}
      />,
    ],
  },
  {
    id: 'expandable',
    title: 'Expandable',
    blurb: [
      <Paragraph>
        They can be configured to display further information to the
        user in the form of an expandable panel.
      </Paragraph>,
    ],
    examples: [
      <BannerAlertExpandable
        message="Neutral alert with more information."
        type={ALERT_TYPES.NEUTRAL}
      >
        {longMessage}
      </BannerAlertExpandable>,
      <BannerAlertExpandable
        message="Successful alert with more information."
        type={ALERT_TYPES.SUCCESS}
      >
        {longMessage}
      </BannerAlertExpandable>,
      <BannerAlertExpandable
        message="Warn alert with more information."
        type={ALERT_TYPES.WARN}
      >
        {longMessage}
      </BannerAlertExpandable>,
      <BannerAlertExpandable
        message="Error alert with more information."
        type={ALERT_TYPES.ERROR}
      >
        {longMessage}
      </BannerAlertExpandable>,
    ],
  },
  {
    id: 'dismissable',
    title: 'Dismissable',
    blurb: [
      <Paragraph>
        Banner alerts can be configured to include a close icon so that the user can dismiss them.
      </Paragraph>,
    ],
    examples: [
      <BannerAlertDismissable
        message="Neutral alert with dismiss option."
        type={ALERT_TYPES.NEUTRAL}
      />,
      <BannerAlertDismissable
        message="Successful alert with dismiss option."
        type={ALERT_TYPES.SUCCESS}
      />,
      <BannerAlertDismissable
        message="Warn alert with dismiss option."
        type={ALERT_TYPES.WARN}
      />,
      <BannerAlertDismissable
        message="Error alert with dismiss option."
        type={ALERT_TYPES.ERROR}
      />,
    ],
  },
];

const BannerAlertsPage = () => (<DocsPageBuilder
  title="Banner alerts"
  blurb={[
    <Paragraph>
      Banner alerts provide feedback to the user when an action has been performed.
    </Paragraph>,
  ]}
  components={components}
  sassdocId="notifications"
  readme={bannerAlertReadme}
/>);

export default BannerAlertsPage;
