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
