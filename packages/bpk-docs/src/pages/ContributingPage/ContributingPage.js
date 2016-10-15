import React from 'react';
import Helmet from 'react-helmet';
import BpkHeading from 'bpk-component-heading';
import BpkParagraph from 'bpk-component-paragraph';
import BpkContentContainer from 'bpk-component-content-container';

/* eslint-disable import/no-webpack-loader-syntax */
import rawSvg from 'raw!./../../static/backpack-process-map.svg';
/* eslint-enable */

import './contributing-page.scss';

const processMapSvg = { __html: rawSvg };

/* eslint-disable react/no-danger */
const ContributingPage = () => (
  <section>
    <Helmet title="Contributing" />
    <BpkContentContainer>
      <BpkHeading level="h1">Contributing</BpkHeading>
      <BpkParagraph>
        If you want to create something new or building upon an existing component, Backpack adheres to the open source
        model and actively encourages contributions from others.
      </BpkParagraph>
      <BpkParagraph>
        Check out the diagram below - it should help both designers and engineers understand how to contribute at any
        stage of a component’s lifecycle.
      </BpkParagraph>
      <span className="bpkdocs-contributing-page__process-map" dangerouslySetInnerHTML={processMapSvg} />
    </BpkContentContainer>
  </section>
);
/* eslint-enable */

export default ContributingPage;
