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
import React from 'react';
import { updateOnThemeChange } from 'bpk-component-theme-toggle';
import BpkThemeProvider from 'bpk-theming';

import { PropTypes as RouterPropTypes } from 'react-router';
import { cssModules } from 'bpk-react-utils';

import themeAttributes from './../../themeableAttributes';

import STYLES from './default-layout.scss';
import Footer from '../../components/Footer';

const EnhancedThemeProvider = updateOnThemeChange(BpkThemeProvider);
const getClassName = cssModules(STYLES);

const DefaultLayout = props => {
  const { children } = props;

  return (
    <EnhancedThemeProvider
      themeAttributes={themeAttributes}
      id="portal-target"
      className={getClassName('bpkdocs-default-layout__container')}
    >
      <div id="application-container">
        <Helmet titleTemplate="%s | Backpack" />
        <main>{children}</main>
        <Footer />
      </div>
    </EnhancedThemeProvider>
  );
};

DefaultLayout.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  location: PropTypes.shape(RouterPropTypes.locationShape).isRequired, // eslint-disable-line react/no-unused-prop-types
};

export default DefaultLayout;
