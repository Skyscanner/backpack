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
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { withRouter } from 'react-router-dom';
import BpkContentContainer from 'bpk-component-content-container';
import BpkHorizontalNav, {
  BpkHorizontalNavItem,
} from 'bpk-component-horizontal-nav';
import { cssModules } from 'bpk-react-utils';

import {
  setPlatformInLocalStorage,
  getPlatformFromLocalStorage,
} from '../../helpers/storage-helper';
import Heading from '../Heading';

import Blurb from './Blurb';
import STYLES from './DocsPageWrapper.scss';

const getClassName = cssModules(STYLES);

const contentShape = PropTypes.oneOfType([PropTypes.string, PropTypes.node]);
const platformQueryParamRegex = /platform=(android|ios|native|web)/;

// In order to be able to access refs on the HorizontalNavItems, they need to be a fully defined.
// Reacet Component class. Therefore wrapping the NavItems to ensure they are such.
class BpkHorizontalNavItemWrapper extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <BpkHorizontalNavItem {...this.props} />;
  }
}

class DocsPlatformNav extends Component {
  constructor(props) {
    super(props);

    this.webItem = React.createRef();
  }

  componentDidMount() {
    // Although safari supports `scrollIntoView` it does not support the options. Therefore the behavior is undesirable on Safari.
    // As of safari preview, this works perfectly.
    setTimeout(() => {
      if (this.webItem && this.webItem.current) {
        ReactDOM.findDOMNode(this.webItem.current).scrollIntoView({
          behavior: 'smooth',
          block: 'end',
        });
      }
    }, 1000);
  }

  render() {
    const {
      platform,
      onNativeClick,
      onWebClick,
      onAndroidClick,
      onIOSClick,
      disableNativeTab,
      disableWebTab,
      disableAndroidTab,
      disableIOSTab,
    } = this.props;

    return (
      <BpkHorizontalNav
        className={getClassName('bpkdocs-page-wrapper__platform-switcher')}
      >
        <BpkHorizontalNavItemWrapper
          name="android"
          disabled={disableAndroidTab}
          selected={platform === 'android'}
          onClick={onAndroidClick}
          ref={this.androidRef}
        >
          Android
        </BpkHorizontalNavItemWrapper>
        <BpkHorizontalNavItemWrapper
          name="ios"
          disabled={disableIOSTab}
          selected={platform === 'ios'}
          onClick={onIOSClick}
          ref={this.iosRef}
        >
          iOS
        </BpkHorizontalNavItemWrapper>
        <BpkHorizontalNavItemWrapper
          name="native"
          disabled={disableNativeTab}
          selected={platform === 'native'}
          onClick={onNativeClick}
          ref={this.nativeRef}
        >
          React Native
        </BpkHorizontalNavItemWrapper>
        <BpkHorizontalNavItemWrapper
          name="web"
          disabled={disableWebTab}
          selected={platform === 'web'}
          onClick={onWebClick}
          ref={this.webItem}
        >
          Web
        </BpkHorizontalNavItemWrapper>
      </BpkHorizontalNav>
    );
  }
}

DocsPlatformNav.propTypes = {
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

export default DocsPlatformNav;
