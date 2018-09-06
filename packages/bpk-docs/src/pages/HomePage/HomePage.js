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
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';

import BpkText from 'bpk-component-text';

import { cssModules } from 'bpk-react-utils';

import STYLES from './home-page.css';
import * as ROUTES from '../../constants/routes';

import HomePageCard from '../../components/HomePageCard';
import UpdatedAt from './UpdatedAt';
import ComponentsImage from '../../static/components.jpg';
import DesignTokensImage from '../../static/design_tokens.jpg';
import GitHubImage from '../../static/github.jpg';
import UsingBackpackImage from '../../static/using_bpk.jpg';
import StyleGuideImage from '../../static/style_guide.jpg';

import ComponentsIcon from '../../static/components_icon.svg';
import DesignTokensIcon from '../../static/design_tokens_icon.svg';
import GitHubIcon from '../../static/github_icon.svg';
import UsingBackpackIcon from '../../static/using_bpk_icon.svg';
import StyleGuideIcon from '../../static/style_guide_icon.svg';
import BackpackLogoWhite from '../../static/backpack-logo-white.svg';
import HeroImage from '../../static/hero.jpg';
import LondonHeroImage from '../../static/london_hero.jpg';
import HongKongHeroImage from '../../static/hongKong_hero.jpg';
import DohaHeroImage from '../../static/doha_hero.jpg';

const getClassName = cssModules(STYLES);

const CARD_CONTENTS = [
  {
    key: 'using-backpack',
    title: 'Using Backpack',
    href: ROUTES.GETTING_STARTED,
    image: UsingBackpackImage,
    icon: UsingBackpackIcon,
  },
  {
    key: 'components',
    title: 'Components',
    href: ROUTES.COMPONENTS,
    image: ComponentsImage,
    icon: ComponentsIcon,
  },
  {
    key: 'design-tokens',
    title: 'Design tokens',
    href: ROUTES.TOKENS,
    image: DesignTokensImage,
    icon: DesignTokensIcon,
    fullWidth: true,
  },
  {
    key: 'style-guide',
    title: 'Style guide',
    href: ROUTES.STYLE_GUIDE,
    image: StyleGuideImage,
    icon: StyleGuideIcon,
    iconWidth: '7.5rem',
  },
  {
    key: 'github',
    title: 'GitHub',
    href: 'https://github.com/skyscanner/backpack',
    blank: true,
    image: GitHubImage,
    icon: GitHubIcon,
    iconWidth: '9.5625rem',
    centerIcon: true,
  },
];

const HERO_IMAGE_THEMES = {
  London: {
    image: LondonHeroImage,
    credit: null,
    creditHref: 'https://unsplash.com/photos/q99oeAG46BY',
  },
  HongKong: {
    image: HongKongHeroImage,
    credit: null,
    creditHref: 'https://unsplash.com/photos/q99oeAG46BY',
  },
  Doha: {
    image: DohaHeroImage,
    credit: null,
    creditHref: 'https://unsplash.com/photos/q99oeAG46BY',
  },
  default: {
    image: HeroImage,
    credit: 'Vincent Guth: Hot Air Balloon',
    creditHref: 'https://unsplash.com/photos/q99oeAG46BY',
  },
};
const HomePage = (props, context) => {
  const { history } = props;

  const getHeroImageForTheme = () => {
    if (
      !context.theme ||
      Object.keys(HERO_IMAGE_THEMES).indexOf(context.theme.themeName) < 0
    ) {
      return HERO_IMAGE_THEMES.default;
    }
    return HERO_IMAGE_THEMES[context.theme.themeName];
  };

  const heroImage = getHeroImageForTheme();

  return (
    <section>
      <Helmet title="Backpack" />
      <div
        style={{ backgroundImage: `url(${heroImage.image})` }}
        className={getClassName('bpkdocs-home-page__hero')}
      >
        <div className={getClassName('bpkdocs-home-page__hero-logo-container')}>
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
          {heroImage.credit && (
            <a
              href={heroImage.creditHref}
              target="_blank"
              rel="noopener noreferrer"
              className={getClassName('bpkdocs-home-page__hero-credit')}
            >
              {heroImage.credit}
            </a>
          )}
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
            onClick={rest.blank ? null : () => history.push(href)}
            className={getClassName('bpkdocs-home-page__card')}
          />
        ))}
      </div>
    </section>
  );
};

HomePage.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func }).isRequired,
};

HomePage.contextTypes = {
  theme: PropTypes.object, // eslint-disable-line react/forbid-prop-types
};

export default HomePage;
