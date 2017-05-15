import React from 'react';
import PropTypes from 'prop-types';
import { PropTypes as RouterPropTypes } from 'react-router';
import { BpkGridContainer, BpkGridRow, BpkGridColumn } from 'bpk-component-grid';

import './side-nav-layout.scss';
import NavList from './NavList';
import NavSelect from './NavSelect';
import { linksPropType } from './sideNavPropTypes';

const SideNavLayout = ({ children, links, location }) => (
  <BpkGridContainer>
    <BpkGridRow>
      <BpkGridColumn width={12} padded={false} className="bpkdocs-side-nav-layout__nav-select-container">
        <NavSelect links={links} location={location} />
      </BpkGridColumn>
      <BpkGridColumn width={3} className="bpkdocs-side-nav-layout__nav-list-container">
        <NavList links={links} />
      </BpkGridColumn>
      <BpkGridColumn width={9} tabletWidth={12}>{children}</BpkGridColumn>
    </BpkGridRow>
  </BpkGridContainer>
);

SideNavLayout.propTypes = {
  children: PropTypes.node.isRequired,
  links: linksPropType.isRequired,
  location: PropTypes.shape(RouterPropTypes.locationShape).isRequired,
};

export default SideNavLayout;
