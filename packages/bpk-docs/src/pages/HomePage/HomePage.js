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

import PropTypes from 'prop-types';
import React from 'react';
import Helmet from 'react-helmet';
import { PropTypes as RouterPropTypes } from 'react-router';
import { chunk } from 'lodash';
import {
  BpkGridContainer,
  BpkGridRow,
  BpkGridColumn,
} from 'bpk-component-grid';
import BpkCard from 'bpk-component-card';
import BpkText from 'bpk-component-text';
import { cssModules } from 'bpk-react-utils';

import Heading from './../../components/Heading';

import STYLES from './home-page.scss';
import * as ROUTES from './../../constants/routes';

const getClassName = cssModules(STYLES);

const CARD_CONTENTS = [
  {
    title: 'Using Backpack',
    href: ROUTES.GETTING_STARTED,
  },
  {
    title: 'Design Tokens',
    href: ROUTES.TOKENS,
  },
  {
    title: 'Components',
    href: ROUTES.COMPONENTS,
  },
  {
    title: 'GitHub',
    href: 'https://github.com/Skyscanner/backpack',
  },
];

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
    // Convert cards into an array of arrays with two entries, for placing in
    // a grid.
    const chunkedCards = chunk(CARD_CONTENTS, 2);
    return (
      <section>
        <Helmet title="Backpack" />
        <div className={getClassName('bpkdocs-home-page__hero')}>
          <BpkGridContainer>
            <BpkGridRow
              className={getClassName('bpkdocs-home-page__logo-container')}
            >
              <BpkGridColumn width={12}>Backpack Logo Here</BpkGridColumn>
            </BpkGridRow>
            <BpkGridRow>
              <BpkGridColumn width={7}>
                <Heading level="h2">
                  Backpack is a collection of design resources, reusable
                  components and guidelines for creating Skyscanner products.
                </Heading>
              </BpkGridColumn>
            </BpkGridRow>
          </BpkGridContainer>
        </div>
        <BpkGridContainer
          className={getClassName('bpkdocs-home-page__cards-container')}
        >
          {chunkedCards.map((cards, index) => (
            <BpkGridRow key={index.toString()}>
              {cards.map(({ title, href }) => (
                <BpkGridColumn width={6} tabletWidth={12} key={title}>
                  <BpkCard
                    href={href}
                    padded={false}
                    className={getClassName('bpkdocs-home-page__card')}
                  >
                    <div
                      className={getClassName('bpkdocs-home-page__card-image')}
                    >
                      <span
                        className={getClassName(
                          'bpkdocs-home-page__card-image-text',
                        )}
                      >
                        {title}
                      </span>
                    </div>
                    <BpkText
                      tagName="h2"
                      textStyle="lg"
                      className={getClassName(
                        'bpkdocs-home-page__card-caption',
                      )}
                    >
                      {title}
                    </BpkText>
                  </BpkCard>
                </BpkGridColumn>
              ))}
            </BpkGridRow>
          ))}
        </BpkGridContainer>
      </section>
    );
  }
}

HomePage.propTypes = {
  router: PropTypes.shape(RouterPropTypes.routerShape).isRequired,
};

export default HomePage;
