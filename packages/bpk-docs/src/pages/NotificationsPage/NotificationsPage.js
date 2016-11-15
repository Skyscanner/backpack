import React from 'react';
import BpkParagraph from 'bpk-component-paragraph';
import BpkBannerAlert, { ALERT_TYPES } from 'bpk-component-banner-alert';

import bannerAlertReadme from 'bpk-component-banner-alert/readme.md';

import DocsPageBuilder from './../../components/DocsPageBuilder';

const longMessage = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque sagittis sagittis purus, id
blandit ipsum. Pellentesque nec diam nec erat condimentum dapibus. Nunc diam augue, egestas id egestas ut, facilisis
nec mi. Donec et congue odio, nec laoreet est. Integer rhoncus varius arcu, a fringilla libero laoreet at. Mauris
porta varius ullamcorper. Sed laoreet libero mauris, non pretium lectus accumsan et. Suspendisse vehicula ullamcorper
sapien, et dapibus mi aliquet non. Pellentesque auctor sagittis lectus vitae rhoncus. Fusce id enim porttitor, mattis
ante in, vestibulum nulla.`;

const components = [
  {
    id: 'banner-alerts',
    title: 'Banner alerts',
    blurb: [
      <BpkParagraph>
        These are displayed to the user to provide feedback when an action has been performed. They are available in
        three styles to indicate success, warning or error and can be configured to display further information to
        user in the form of a collapsible panel.
      </BpkParagraph>,
    ],
    examples: [
      <BpkBannerAlert message="Successful alert." type={ALERT_TYPES.SUCCESS} />,
      <br />,
      <BpkBannerAlert
        message="Successful alert with more information."
        type={ALERT_TYPES.SUCCESS}
        toggleButtonLabel="See more"
      >
        {longMessage}
      </BpkBannerAlert>,
      <br />,
      <BpkBannerAlert message="Warn alert." type={ALERT_TYPES.WARN} />,
      <br />,
      <BpkBannerAlert message="Warn alert with more information." type={ALERT_TYPES.WARN} toggleButtonLabel="See more">
        {longMessage}
      </BpkBannerAlert>,
      <br />,
      <BpkBannerAlert message="Error alert." type={ALERT_TYPES.ERROR} />,
      <br />,
      <BpkBannerAlert
        message="Error alert with more information."
        type={ALERT_TYPES.ERROR}
        toggleButtonLabel="See more"
      >
        {longMessage}
      </BpkBannerAlert>,
    ],
    readme: bannerAlertReadme,
  },
  {
    id: 'toasts',
    title: 'Toasts',
    blurb: 'Coming soon',
    examples: [],
  },
];

const NotificationsPage = () => <DocsPageBuilder
  title="Notifications"
  blurb={[
    <BpkParagraph>
      Backpack supports a number of different types of notification styles, which can be used in different scenarios
      to provide messaging to the user.
    </BpkParagraph>,
  ]}
  components={components}
  sassdocId="notifications"
/>;

export default NotificationsPage;
