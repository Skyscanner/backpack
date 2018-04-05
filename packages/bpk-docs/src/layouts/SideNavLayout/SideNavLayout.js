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

import React from 'react';
import PropTypes from 'prop-types';
import { PropTypes as RouterPropTypes } from 'react-router';
import {
  BpkGridContainer,
  BpkGridRow,
  BpkGridColumn,
} from 'bpk-component-grid';
import { cssModules } from 'bpk-react-utils';

import STYLES from './side-nav-layout.scss';
import NavList from './NavList';
import NavSelect from './NavSelect';
import { linksPropType } from './sideNavPropTypes';

const getClassName = cssModules(STYLES);

const SideNavLayout = ({ children, links, location }) => (
  <BpkGridContainer
    className={getClassName('bpkdocs-side-nav-layout__container')}
  >
    <BpkGridRow>
      <BpkGridColumn
        width={12}
        padded={false}
        className={getClassName(
          'bpkdocs-side-nav-layout__nav-select-container',
        )}
      >
        <NavSelect links={links} location={location} />
      </BpkGridColumn>
      <BpkGridColumn
        width={3}
        className={getClassName('bpkdocs-side-nav-layout__nav-list-container')}
      >
        <NavList links={links} />
      </BpkGridColumn>
      <BpkGridColumn width={9} tabletWidth={12}>
        {children}
      </BpkGridColumn>
    </BpkGridRow>
  </BpkGridContainer>
);

SideNavLayout.propTypes = {
  children: PropTypes.node.isRequired,
  links: linksPropType.isRequired,
  location: PropTypes.shape(RouterPropTypes.locationShape).isRequired,
};

export default SideNavLayout;
