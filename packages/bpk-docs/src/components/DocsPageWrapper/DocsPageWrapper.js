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
import { withRouter, Redirect } from 'react-router-dom';
import BpkContentContainer from 'bpk-component-content-container';
import BpkHorizontalNav, {
  BpkHorizontalNavItem,
} from 'bpk-component-horizontal-nav';
import BpkSmallMobileIcon from 'bpk-component-icon/sm/mobile';
import BpkSmallWindowIcon from 'bpk-component-icon/sm/window';
import { withButtonAlignment } from 'bpk-component-icon';
import { cssModules } from 'bpk-react-utils';

import Heading from '../Heading';
import Blurb from './Blurb';
import STYLES from './DocsPageWrapper.scss';

const getClassName = cssModules(STYLES);

const AlignedBpkSmallMobileIcon = withButtonAlignment(BpkSmallMobileIcon);
const AlignedBpkSmallWindowIcon = withButtonAlignment(BpkSmallWindowIcon);

const contentShape = PropTypes.oneOfType([PropTypes.string, PropTypes.node]);

const PlatformNav = ({
  platform,
  onNativeClick,
  onWebClick,
  disableNativeTab,
  disableWebTab,
}) => (
  <BpkHorizontalNav
    className={getClassName('bpkdocs-page-wrapper__platform-switcher')}
  >
    <BpkHorizontalNavItem
      name="native"
      disabled={disableNativeTab}
      selected={platform === 'native'}
      onClick={onNativeClick}
    >
      <AlignedBpkSmallMobileIcon
        className={getClassName('bpkdocs-page-wrapper__platform-icon')}
      />
      Native
    </BpkHorizontalNavItem>
    <BpkHorizontalNavItem
      name="web"
      disabled={disableWebTab}
      selected={platform === 'web'}
      onClick={onWebClick}
    >
      <AlignedBpkSmallWindowIcon
        className={getClassName('bpkdocs-page-wrapper__platform-icon')}
      />
      Web
    </BpkHorizontalNavItem>
  </BpkHorizontalNav>
);

PlatformNav.propTypes = {
  platform: PropTypes.oneOf(['web', 'native']).isRequired,
  onNativeClick: PropTypes.func.isRequired,
  onWebClick: PropTypes.func.isRequired,
  disableNativeTab: PropTypes.bool.isRequired,
  disableWebTab: PropTypes.bool.isRequired,
};

const getBasePath = url => {
  let normalized = url;
  if (url.endsWith('/')) {
    normalized = url.substring(0, url.length - 1);
  }

  const parts = normalized.split('/');
  const lastPart = parts[parts.length - 1];
  if (lastPart === 'native' || lastPart === 'web') {
    parts.pop();
  }
  return parts.join('/');
};

const DocsPageWrapper = props => {
  const {
    blurb,
    nativeSubpage,
    title,
    webSubpage,
    match,
    history,
    location,
  } = props;
  const path = getBasePath(match.url);
  // TODO: This is deprecated, we should eventually remove
  const webQueryString = location.search.indexOf('platform=web') >= 0;

  return (
    <BpkContentContainer className={getClassName('bpkdocs-page-wrapper')}>
      <div className={getClassName('bpkdocs-page-wrapper__inner')}>
        <Heading level="h1">{title}</Heading>
        {blurb && <Blurb content={blurb} />}
      </div>
      {!match.params.platform && (
        <Redirect
          exact
          from={path}
          to={`${path}/${webQueryString || !nativeSubpage ? 'web' : 'native'}`}
        />
      )}
      {nativeSubpage &&
        match.params.platform === 'native' && (
          <div>
            <PlatformNav
              platform="native"
              onNativeClick={() => history.push(`${path}/native`)}
              onWebClick={() => history.push(`${path}/web`)}
              disableNativeTab={!nativeSubpage}
              disableWebTab={!webSubpage}
            />
            {nativeSubpage}
          </div>
        )}
      {webSubpage &&
        match.params.platform === 'web' && (
          <div>
            <PlatformNav
              platform="web"
              onNativeClick={() => history.push(`${path}/native`)}
              onWebClick={() => history.push(`${path}/web`)}
              disableNativeTab={!nativeSubpage}
              disableWebTab={!webSubpage}
            />
            {webSubpage}
          </div>
        )}
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
};

DocsPageWrapper.defaultProps = {
  blurb: null,
  webSubpage: null,
  nativeSubpage: null,
};

export default withRouter(DocsPageWrapper);
