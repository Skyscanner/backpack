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

import Helmet from 'react-helmet';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import BpkRtlToggle from 'bpk-component-rtl-toggle';
import BpkGridToggle from 'bpk-component-grid-toggle';
import BpkThemeToggle, {
  updateOnThemeChange,
} from 'bpk-component-theme-toggle';
import BpkThemeProvider from 'bpk-theming';

import { PropTypes as RouterPropTypes } from 'react-router';
import {
  BpkGridContainer,
  BpkGridRow,
  BpkGridColumn,
} from 'bpk-component-grid';
import { cssModules } from 'bpk-react-utils';

import themeAttributes from './../../themeableAttributes';

import STYLES from './default-layout.scss';
import Header from '../../components/Header';

const EnhancedThemeProvider = updateOnThemeChange(BpkThemeProvider);
const getClassName = cssModules(STYLES);

class DefaultLayout extends Component {
  constructor(props) {
    super(props);

    this.state = {
      headerExpanded: false,
      locationKey: this.props.location.key,
    };

    this.onHamburgerClick = this.onHamburgerClick.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.location.key !== this.state.locationKey) {
      this.setState({
        headerExpanded: false,
        locationKey: nextProps.location.key,
      });
    }
  }

  onHamburgerClick() {
    this.setState(prevState => ({
      headerExpanded: !prevState.headerExpanded,
    }));
  }

  render() {
    const { children } = this.props;

    return (
      <EnhancedThemeProvider
        themeAttributes={themeAttributes}
        id="portal-taget"
      >
        <div id="application-container">
          <Helmet titleTemplate="%s | Backpack" />
          <Header
            expanded={this.state.headerExpanded}
            onHamburgerClick={this.onHamburgerClick}
          />
          <main>{children}</main>
          <BpkGridContainer
            className={getClassName('bpkdocs-default-layout__footer-container')}
          >
            <BpkGridRow
              className={getClassName('bpkdocs-default-layout__footer-row')}
            >
              <BpkGridColumn width={6} mobileWidth={12}>
                <small
                  className={getClassName(
                    'bpkdocs-default-layout__footer-copy',
                  )}
                >
                  &copy; Skyscanner {new Date().getFullYear()}
                </small>
              </BpkGridColumn>
              <BpkGridColumn width={6} mobileWidth={12}>
                <small
                  className={[
                    'bpkdocs-default-layout__footer-copy',
                    'bpkdocs-default-layout__footer-copy--align-right',
                  ]
                    .map(getClassName)
                    .join(' ')}
                >
                  <BpkGridToggle />&nbsp; | <BpkRtlToggle />&nbsp;
                  <BpkThemeToggle
                    className={getClassName(
                      'bpkdocs-default-layout__theme-switcher',
                    )}
                  />
                </small>
              </BpkGridColumn>
            </BpkGridRow>
          </BpkGridContainer>
        </div>
      </EnhancedThemeProvider>
    );
  }
}

DefaultLayout.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  location: PropTypes.shape(RouterPropTypes.locationShape).isRequired, // eslint-disable-line react/no-unused-prop-types
};

export default DefaultLayout;
