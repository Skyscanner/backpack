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
import Helmet from 'react-helmet';
import { browserHistory } from 'react-router';

import BpkText from 'bpk-component-text';

import { cssModules } from 'bpk-react-utils';
// import {
//   getHtmlElement,
//   THEME_CHANGE_EVENT,
// } from '../../../../bpk-component-theme-toggle';

import STYLES from './home-page.scss';
import * as ROUTES from './../../constants/routes';

import HomePageCard from '../../components/neo/HomePageCard';
import UpdatedAt from './UpdatedAt';
import ComponentsImage from '../../static/components.jpg';
import DesignTokensImage from '../../static/design_tokens.jpg';
import GitHubImage from '../../static/github.jpg';
import UsingBackpackImage from '../../static/using_bpk.jpg';

import ComponentsIcon from '../../static/components_icon.svg';
import DesignTokensIcon from '../../static/design_tokens_icon.svg';
import GitHubIcon from '../../static/github_icon.svg';
import UsingBackpackIcon from '../../static/using_bpk_icon.svg';
import BackpackLogoWhite from '../../static/backpack-logo-white.svg';
import HeroImage from '../../static/hero.jpg';
import LondonHeroImage from '../../static/london_hero.jpg';
import HongKongHeroImage from '../../static/hongKong_hero.jpg';
import DohaHeroImage from '../../static/doha_hero.jpg';

const getClassName = cssModules(STYLES);

const THEME_CHANGE_EVENT = 'bpkchangetheme';

const getHtmlElement = () =>
  typeof document !== 'undefined' ? document.querySelector('html') : {};

const CARD_CONTENTS = [
  {
    key: 'using-backpack',
    title: 'Using Backpack',
    href: ROUTES.GETTING_STARTED,
    image: UsingBackpackImage,
    icon: UsingBackpackIcon,
  },
  {
    key: 'design-tokens',
    title: 'Design Tokens',
    href: ROUTES.TOKENS,
    image: DesignTokensImage,
    icon: DesignTokensIcon,
  },
  {
    key: 'components',
    title: 'Components',
    href: ROUTES.COMPONENTS,
    image: ComponentsImage,
    icon: ComponentsIcon,
  },
  {
    key: 'github',
    title: 'GitHub',
    href: 'https://github.com/skyscanner/backpack',
    blank: true,
    image: GitHubImage,
    icon: GitHubIcon,
    iconWidth: '153px',
    centerIcon: true,
  },
];

const HERO_IMAGE = {
  image: HeroImage,
  credit: 'Vincent Guth: Hot Air Balloon',
  creditHref: 'https://unsplash.com/photos/q99oeAG46BY',
};

const LONDON_HERO_IMAGE = {
  image: LondonHeroImage,
  credit: '🤷‍♂️',
  creditHref: 'https://unsplash.com/photos/q99oeAG46BY',
};

const HONG_KONG_HERO_IMAGE = {
  image: HongKongHeroImage,
  credit: '🤷‍♂️',
  creditHref: 'https://unsplash.com/photos/q99oeAG46BY',
};

const DOHA_HERO_IMAGE = {
  image: DohaHeroImage,
  credit: '🤷‍♂️',
  creditHref: 'https://unsplash.com/photos/q99oeAG46BY',
};

class HomePage extends React.Component {
  constructor(props) {
    super(props);

    this.state = { theme: null };
  }

  componentDidMount() {
    getHtmlElement().addEventListener(
      THEME_CHANGE_EVENT,
      this.onThemeChange,
      false,
    );
  }

  componentWillUnmount() {
    getHtmlElement().removeEventListener(
      THEME_CHANGE_EVENT,
      this.onThemeChange,
      false,
    );
  }

  onThemeChange = newTheme => {
    let newThemeName = null;
    if (!newTheme.detail.theme) {
      newThemeName = 'none';
    } else if (newTheme.detail.theme.accordionActiveColor === '#B1121C') {
      newThemeName = 'london';
    } else if (newTheme.detail.theme.accordionActiveColor === '#013838') {
      newThemeName = 'hong kong';
    } else if (newTheme.detail.theme.accordionActiveColor === '#5E072C') {
      newThemeName = 'doha';
    }
    this.setState({ theme: newThemeName });
  };

  render() {
    let heroImage = HERO_IMAGE;
    if (this.state.theme === 'london') {
      heroImage = LONDON_HERO_IMAGE;
    } else if (this.state.theme === 'hong kong') {
      heroImage = HONG_KONG_HERO_IMAGE;
    } else if (this.state.theme === 'doha') {
      heroImage = DOHA_HERO_IMAGE;
    }

    return (
      <section>
        <Helmet title="Backpack" />
        <div
          style={{ backgroundImage: `url(${heroImage.image})` }}
          className={getClassName('bpkdocs-home-page__hero')}
        >
          <div
            className={getClassName('bpkdocs-home-page__hero-logo-container')}
          >
            <div style={{ flex: 1 }}>
              <img
                src={BackpackLogoWhite}
                className={getClassName('bpkdocs-home-page__hero-logo')}
                alt="Backpack Logo"
              />
              {process.env.BPK_BUILT_AT && (
                <UpdatedAt
                  date={new Date(process.env.BPK_BUILT_AT * 1000)}
                  className={getClassName('bpkdocs-home-page__hero-updated')}
                />
              )}
            </div>
            <a
              href={heroImage.creditHref}
              target="_blank"
              rel="noopener noreferrer"
              className={getClassName('bpkdocs-home-page__hero-credit')}
            >
              {heroImage.credit}
            </a>
          </div>
          <div className={getClassName('bpkdocs-home-page__hero-inner')}>
            <BpkText
              textStyle="xl"
              tagName="h1"
              className={getClassName('bpkdocs-home-page__hero-blurb')}
            >
              &mdash;<br />
              Backpack is a collection of design resources, reusable components
              and guidelines for creating Skyscanner products.
            </BpkText>
          </div>
        </div>
        <div className={getClassName('bpkdocs-home-page__cards-container')}>
          {CARD_CONTENTS.map(({ href, ...rest }) => (
            <HomePageCard
              {...rest}
              href={rest.blank ? href : null}
              onClick={rest.blank ? null : () => browserHistory.push(href)}
              className={getClassName('bpkdocs-home-page__card')}
            />
          ))}
        </div>
      </section>
    );
  }
}

export default HomePage;
