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
import BpkHorizontalNav, {
  BpkHorizontalNavItem,
} from 'bpk-component-horizontal-nav';
import { cssModules } from 'bpk-react-utils';

import STYLES from './DocsPageWrapper.scss';

const getClassName = cssModules(STYLES);

// In order to be able to access refs on the HorizontalNavItems, they need to be a fully defined.
// React Component class. Therefore wrapping the NavItems to ensure they are such.
/* eslint-disable react/no-find-dom-node */
/* eslint-disable react/prefer-stateless-function */
class BpkHorizontalNavItemWrapper extends Component {
  render() {
    return <BpkHorizontalNavItem {...this.props} />;
  }
}
/* eslint-enable */

// eslint-disable-next-line react/no-multi-comp
class DocsPlatformNav extends Component {
  constructor(props) {
    super(props);

    this.webItem = React.createRef();
  }

  componentDidMount() {
    if (typeof window === 'undefined') {
      return;
    }

    const isEdge = /Edge\/\d./i.test(navigator.userAgent);
    const isIe9 = /MSIE 9/i.test(navigator.userAgent);
    const isIe10 = /MSIE 10/i.test(navigator.userAgent);
    const isIe11 = /rv:11.0/i.test(navigator.userAgent);

    if (isEdge || isIe9 || isIe10 || isIe11) {
      return;
    }

    setTimeout(() => {
      if (
        typeof window !== 'undefined' &&
        this.webItem &&
        this.webItem.current
      ) {
        const { scrollX, scrollY } = window;
        // eslint-disable-next-line react/no-find-dom-node
        ReactDOM.findDOMNode(this.webItem.current).scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
        });
        // Need to ensure that vertical scrolling is not affected by the `scrollIntoView` call
        window.scrollTo(scrollX, scrollY);
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
        scrollLeft={300}
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
