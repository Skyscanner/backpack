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

export const linkPropType = PropTypes.shape({
  id: PropTypes.string.isRequired,
  route: PropTypes.string,
  children: PropTypes.node.isRequired,
});

export const categoryPropType = PropTypes.shape({
  id: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  links: PropTypes.arrayOf(linkPropType).isRequired,
  sort: PropTypes.bool,
});

export const linksPropType = PropTypes.arrayOf(
  PropTypes.oneOfType([linkPropType, categoryPropType]),
);
