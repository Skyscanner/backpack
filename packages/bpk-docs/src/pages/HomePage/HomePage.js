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
import Helmet from 'react-helmet';
import { PropTypes as RouterPropTypes } from 'react-router';

import BpkButton from 'bpk-component-button';
import { colorWhite } from 'bpk-tokens/tokens/base.es6';
import { withLargeButtonAlignment, withRtlSupport } from 'bpk-component-icon';
import LongArrowRightIcon from 'bpk-component-icon/lg/long-arrow-right';
import { BpkGridContainer, BpkGridRow, BpkGridColumn } from 'bpk-component-grid';
import { cssModules } from 'bpk-react-utils';

import Heading from './../../components/Heading';
import Paragraph from './../../components/Paragraph';

import STYLES from './home-page.scss';
import * as ROUTES from './../../constants/routes';

const getClassName = cssModules(STYLES);
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
        <div className={getClassName('bpkdocs-home-page__hero')}>
          <BpkGridContainer>
            <BpkGridRow>
              <BpkGridColumn width={12}>
                <Heading level="h1">Backpack</Heading>
                <Heading level="h2">
                  Backpack is a collection of design resources, reusable components and guidelines for creating
                  Skyscanner products.
                </Heading>
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
              <Heading level="h3">Mission</Heading>
              <Paragraph>
                Bring Design and Engineering together to enable squads to create beautiful, coherent products at scale.
              </Paragraph>
            </BpkGridColumn>
            <BpkGridColumn width={6} tabletWidth={12}>
              <Heading level="h3">About Backpack</Heading>
              <Paragraph>
                Backpack is the foundation for all Skyscanner products. It builds on Atomic Design principals to help
                visualise how these products are assembled.
              </Paragraph>
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
