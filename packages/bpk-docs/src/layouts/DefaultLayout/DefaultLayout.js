import Helmet from 'react-helmet';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import BpkRtlToggle from 'bpk-component-rtl-toggle';
import BpkGridToggle from 'bpk-component-grid-toggle';
import { PropTypes as RouterPropTypes } from 'react-router';
import { BpkGridContainer, BpkGridRow, BpkGridColumn } from 'bpk-component-grid';
import { cssModules } from 'bpk-react-utils';

import STYLES from './default-layout.scss';
import Header from '../../components/Header';

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
      <div>
        <Helmet titleTemplate="%s | Backpack" />
        <Header
          expanded={this.state.headerExpanded}
          onHamburgerClick={this.onHamburgerClick}
        />
        <main>{children}</main>
        <BpkGridContainer className={getClassName('bpkdocs-default-layout__footer-container')}>
          <BpkGridRow>
            <BpkGridColumn width={6} mobileWidth={12}>
              <small className={getClassName('bpkdocs-default-layout__footer-copy')}>
                &copy; Skyscanner {new Date().getFullYear()}
              </small>
            </BpkGridColumn>
            <BpkGridColumn width={6} mobileWidth={12}>
              <small
                className={
                  ['bpkdocs-default-layout__footer-copy', 'bpkdocs-default-layout__footer-copy--align-right']
                    .map(getClassName)
                    .join(' ')
                }
              >
                <BpkGridToggle /> | <BpkRtlToggle />
              </small>
            </BpkGridColumn>
          </BpkGridRow>
        </BpkGridContainer>
      </div>
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
