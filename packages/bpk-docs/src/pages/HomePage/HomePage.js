import PropTypes from 'prop-types';
import React from 'react';
import Helmet from 'react-helmet';
import { PropTypes as RouterPropTypes } from 'react-router';

import BpkButton from 'bpk-component-button';
import BpkHeading from 'bpk-component-heading';
import BpkParagraph from 'bpk-component-paragraph';
import { colorWhite } from 'bpk-tokens/tokens/base.es6';
import { withLargeButtonAlignment, withRtlSupport } from 'bpk-component-icon';
import LongArrowRightIcon from 'bpk-component-icon/lg/long-arrow-right';
import { BpkGridContainer, BpkGridRow, BpkGridColumn } from 'bpk-component-grid';

import './home-page.scss';
import * as ROUTES from './../../constants/routes';

const AlignedLongArrowRightAltIcon = withRtlSupport(withLargeButtonAlignment(LongArrowRightIcon));

class HomePage extends React.Component {
  constructor(props) {
    super(props);

    this.onGettingStartedClick = this.onGettingStartedClick.bind(this);
  }

  onGettingStartedClick(e) {
    e.preventDefault();
    this.props.router.push(e.currentTarget.getAttribute('href'));
  }

  render() {
    return (
      <section>
        <Helmet title="Backpack" />
        <div className="bpkdocs-home-page__hero">
          <BpkGridContainer>
            <BpkGridRow>
              <BpkGridColumn width={12}>
                <BpkHeading level="h1">Backpack</BpkHeading>
                <BpkHeading level="h2">
                  Backpack is a collection of design resources, reusable components and guidelines for creating
                  Skyscanner products.
                </BpkHeading>
                <BpkButton large href={ROUTES.GETTING_STARTED} onClick={this.onGettingStartedClick}>
                  Get started <AlignedLongArrowRightAltIcon fill={colorWhite} />
                </BpkButton>
              </BpkGridColumn>
            </BpkGridRow>
          </BpkGridContainer>
        </div>
        <BpkGridContainer>
          <BpkGridRow>
            <BpkGridColumn width={6} tabletWidth={12}>
              <BpkHeading level="h3">Mission</BpkHeading>
              <BpkParagraph>
                Bring Design and Engineering together to enable squads to create beautiful, coherent products at scale.
              </BpkParagraph>
            </BpkGridColumn>
            <BpkGridColumn width={6} tabletWidth={12}>
              <BpkHeading level="h3">About Backpack</BpkHeading>
              <BpkParagraph>
                Backpack is the foundation for all Skyscanner products. It builds on Atomic Design principals to help
                visualise how these products are assembled.
              </BpkParagraph>
            </BpkGridColumn>
          </BpkGridRow>
        </BpkGridContainer>
      </section>
    );
  }
}

HomePage.propTypes = {
  router: PropTypes.shape(RouterPropTypes.routerShape).isRequired,
};

export default HomePage;
