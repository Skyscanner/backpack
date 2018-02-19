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

import BpkText from 'bpk-component-text';

import { cssModules } from 'bpk-react-utils';

import STYLES from './home-page.scss';
import * as ROUTES from './../../constants/routes';

import HomePageCard from '../../components/HomePageCard';
import UpdatedAt from './UpdatedAt';
import ComponentsImage from './components.jpg';
import DesignTokensImage from './design_tokens.jpg';
import GitHubImage from './github.jpg';
import UsingBackpackImage from './using_bpk.jpg';

import ComponentsIcon from './components_icon.svg';
import DesignTokensIcon from './design_tokens_icon.svg';
import GitHubIcon from './github_icon.svg';
import UsingBackpackIcon from './using_bpk_icon.svg';
import BackpackLogoWhite from './backpack-logo-white.svg';
import HeroImage from './hero.jpg';

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

const HomePage = () => (
  <section>
    <Helmet title="Backpack" />
    <div
      style={{ backgroundImage: `url(${HERO_IMAGE.image})` }}
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
        <a
          href={HERO_IMAGE.creditHref}
          target="_blank"
          rel="noopener noreferrer"
          className={getClassName('bpkdocs-home-page__hero-credit')}
        >
          {HERO_IMAGE.credit}
        </a>
      </div>
      <div className={getClassName('bpkdocs-home-page__hero-inner')}>
        <BpkText
          textStyle="xl"
          tagName="h1"
          className={getClassName('bpkdocs-home-page__hero-blurb')}
        >
          &mdash;<br />
          Backpack is a collection of design resources, reusable components and
          guidelines for creating Skyscanner products.
        </BpkText>
      </div>
    </div>
    <div className={getClassName('bpkdocs-home-page__cards-container')}>
      {CARD_CONTENTS.map(props => (
        <HomePageCard
          {...props}
          className={getClassName('bpkdocs-home-page__card')}
        />
      ))}
    </div>
  </section>
);

export default HomePage;
