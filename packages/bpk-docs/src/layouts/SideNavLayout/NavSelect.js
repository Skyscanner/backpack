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

import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import BpkSelect from 'bpk-component-select';
import BpkFieldset from 'bpk-component-fieldset';
import { browserHistory, PropTypes as RouterPropTypes } from 'react-router';

import { linkPropType, categoryPropType, linksPropType } from './sideNavPropTypes';

const getCategoryName = (links, location) => {
  const reducer = (prev, link) => {
    const toCategory = innerLink => Object.assign({}, innerLink, { category: link.category });
    return prev.concat(link.links.map(toCategory));
  };

  const reducedLinks = links.reduce(reducer, []);

  return (_.find(reducedLinks, { route: location.pathname }) || {}).category || '';
};

const NavSelectItem = props => (
  <option
    disabled={!props.link.route}
    value={props.link.route}
  >{props.link.children}</option>
);

NavSelectItem.propTypes = {
  link: linkPropType.isRequired,
};

const NavSelectCategory = props => (
  <optgroup label={props.link.category}>
    {props.link.links.map(subLink => <NavSelectItem key={subLink.id} link={subLink} />)}
  </optgroup>
);

NavSelectCategory.propTypes = {
  link: categoryPropType.isRequired,
};

const NavSelect = props => (
  <BpkFieldset label={getCategoryName(props.links, props.location)}>
    <BpkSelect
      id="side-nav-select"
      name="side-nav-select"
      value={props.location.pathname}
      onChange={e => browserHistory.push(e.target.value)}
    >
      {props.links.map(
        link => (link.category
          ? <NavSelectCategory key={link.id} link={link} />
          : <NavSelectItem key={link.id} link={link} />
      ))}
    </BpkSelect>
  </BpkFieldset>
);

NavSelect.propTypes = {
  links: linksPropType.isRequired,
  location: PropTypes.shape(RouterPropTypes.locationShape).isRequired,
};

export default NavSelect;
