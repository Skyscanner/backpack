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

import PropTypes from 'prop-types';
import React from 'react';

import SideNavLayout from './../SideNavLayout';
import * as routes from './../../constants/routes';

const links = [
  {
    id: 'PATTERNS',
    category: 'Patterns',
    links: [
      { id: 'VERTICAL_RHYTHM', route: routes.VERTICAL_RHYTHM, children: 'Vertical rhythm' },
      { id: 'STATEFULNESS', route: routes.STATEFULNESS, children: 'Statefulness' },
      { id: 'UNITS', route: null, children: 'Units' },
      { id: 'ERROR_HANDLING', route: null, children: 'Error handling' },
      { id: 'DATA_ENTRY', route: null, children: 'Data entry' },
      { id: 'MESSAGIN', route: null, children: 'Messaging' },
      { id: 'TILES_AND_CARDS', route: null, children: 'Tiles and cards' },
      { id: 'TAP_TARGETS', route: null, children: 'Tap targets' },
    ],
  },
];

const PatternsLayout = ({ children, ...rest }) => <SideNavLayout links={links} {...rest}>{children}</SideNavLayout>;

PatternsLayout.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default PatternsLayout;
