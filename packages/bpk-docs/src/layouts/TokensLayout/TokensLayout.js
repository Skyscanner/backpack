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

import SideNavLayout from './../SideNavLayout';
import * as routes from './../../constants/routes';

const links = [
  {
    id: 'Tokens',
    category: 'Tokens',
    sort: true,
    links: [
      { id: 'COLORS', route: routes.COLORS, children: 'Colors' },
      { id: 'TYPESETTING', route: routes.TYPESETTING, children: 'Typesetting' },
      { id: 'LAYOUT', route: routes.SPACINGS, children: 'Spacings' },
      { id: 'RADII', route: routes.RADII, children: 'Radii' },
      { id: 'SHADOWS', route: routes.SHADOWS, children: 'Shadows' },
      { id: 'BORDERS', route: routes.BORDERS, children: 'Borders' },
      { id: 'ANIMATION', route: routes.ANIMATION, children: 'Animation' },
      { id: 'Z_INDEXES', route: routes.Z_INDEXES, children: 'Z-Indexes' },
    ],
  },
];

const TokensLayout = ({ children, ...rest }) => (
  <SideNavLayout links={links} {...rest}>
    {children}
  </SideNavLayout>
);

TokensLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default TokensLayout;
