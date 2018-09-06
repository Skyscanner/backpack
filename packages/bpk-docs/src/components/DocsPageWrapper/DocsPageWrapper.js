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

import PropTypes from 'prop-types';
import React from 'react';
import { withRouter } from 'react-router-dom';
import BpkContentContainer from 'bpk-component-content-container';
import BpkHorizontalNav, {
  BpkHorizontalNavItem,
} from 'bpk-component-horizontal-nav';
import { cssModules } from 'bpk-react-utils';

import Heading from '../Heading';
import Blurb from './Blurb';
import STYLES from './DocsPageWrapper.css';

const getClassName = cssModules(STYLES);

const contentShape = PropTypes.oneOfType([PropTypes.string, PropTypes.node]);
const platformQueryParamRegex = /platform=(android|ios|native|web)/;

const PlatformNav = ({
  platform,
  onNativeClick,
  onWebClick,
  onAndroidClick,
  onIOSClick,
  disableNativeTab,
  disableWebTab,
  disableAndroidTab,
  disableIOSTab,
}) => (
  <BpkHorizontalNav
    className={getClassName('bpkdocs-page-wrapper__platform-switcher')}
  >
    <BpkHorizontalNavItem
      name="android"
      disabled={disableAndroidTab}
      selected={platform === 'android'}
      onClick={onAndroidClick}
    >
      Android
    </BpkHorizontalNavItem>
    <BpkHorizontalNavItem
      name="ios"
      disabled={disableIOSTab}
      selected={platform === 'ios'}
      onClick={onIOSClick}
    >
      iOS
    </BpkHorizontalNavItem>
    <BpkHorizontalNavItem
      name="native"
      disabled={disableNativeTab}
      selected={platform === 'native'}
      onClick={onNativeClick}
    >
      React Native
    </BpkHorizontalNavItem>
    <BpkHorizontalNavItem
      name="web"
      disabled={disableWebTab}
      selected={platform === 'web'}
      onClick={onWebClick}
    >
      Web
    </BpkHorizontalNavItem>
  </BpkHorizontalNav>
);

PlatformNav.propTypes = {
  platform: PropTypes.oneOf(['android', 'ios', 'native', 'web']).isRequired,
  onAndroidClick: PropTypes.func.isRequired,
  onIOSClick: PropTypes.func.isRequired,
  onNativeClick: PropTypes.func.isRequired,
  onWebClick: PropTypes.func.isRequired,
  disableAndroidTab: PropTypes.bool.isRequired,
  disableIOSTab: PropTypes.bool.isRequired,
  disableNativeTab: PropTypes.bool.isRequired,
  disableWebTab: PropTypes.bool.isRequired,
};

const DocsPageWrapper = props => {
  const {
    blurb,
    androidSubpage,
    iosSubpage,
    nativeSubpage,
    webSubpage,
    title,
    match,
    history,
    location,
  } = props;
  const path = match.url;

  const platforms = {
    android: androidSubpage,
    ios: iosSubpage,
    native: nativeSubpage,
    web: webSubpage,
  };

  let initiallySelectedPlatform = 'web';
  let initiallyRenderedSubpage = webSubpage;
  if (androidSubpage) {
    initiallySelectedPlatform = 'android';
    initiallyRenderedSubpage = androidSubpage;
  } else if (iosSubpage) {
    initiallySelectedPlatform = 'ios';
    initiallyRenderedSubpage = iosSubpage;
  } else if (nativeSubpage) {
    initiallySelectedPlatform = 'native';
    initiallyRenderedSubpage = nativeSubpage;
  }

  const platformQueryParamMatches = platformQueryParamRegex.exec(
    location.search,
  );
  if (platformQueryParamMatches && platforms[platformQueryParamMatches[1]]) {
    const platformQueryParam = platformQueryParamMatches[1];
    initiallySelectedPlatform = platformQueryParam;
    initiallyRenderedSubpage = platforms[platformQueryParam];
  } else {
    history.replace(`${path}?platform=${initiallySelectedPlatform}`);
  }

  const onPlatformClick = platformName => {
    history.push(`${path}?platform=${platformName}`);
  };

  return (
    <BpkContentContainer className={getClassName('bpkdocs-page-wrapper')}>
      <div className={getClassName('bpkdocs-page-wrapper__inner')}>
        <Heading level="h1">{title}</Heading>
        {blurb && <Blurb content={blurb} />}
      </div>

      <div>
        <PlatformNav
          platform={initiallySelectedPlatform}
          onAndroidClick={() => onPlatformClick('android')}
          onIOSClick={() => onPlatformClick('ios')}
          onNativeClick={() => onPlatformClick('native')}
          onWebClick={() => onPlatformClick('web')}
          disableAndroidTab={!androidSubpage}
          disableIOSTab={!iosSubpage}
          disableNativeTab={!nativeSubpage}
          disableWebTab={!webSubpage}
        />
        {initiallyRenderedSubpage}
      </div>
    </BpkContentContainer>
  );
};

DocsPageWrapper.propTypes = {
  title: PropTypes.string.isRequired,
  match: PropTypes.shape({
    path: PropTypes.string.isRequired,
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  location: PropTypes.shape({
    search: PropTypes.string.isRequired,
  }).isRequired,
  blurb: contentShape,
  webSubpage: PropTypes.element,
  nativeSubpage: PropTypes.element,
  androidSubpage: PropTypes.element,
  iosSubpage: PropTypes.element,
};

DocsPageWrapper.defaultProps = {
  blurb: null,
  webSubpage: null,
  nativeSubpage: null,
  androidSubpage: null,
  iosSubpage: null,
};

export default withRouter(DocsPageWrapper);
