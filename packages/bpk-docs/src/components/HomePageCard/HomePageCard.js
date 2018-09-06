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
/* @flow */
import React from 'react';
import PropTypes from 'prop-types';

import BpkCard from 'bpk-component-card';
import BpkText from 'bpk-component-text';

import { cssModules } from 'bpk-react-utils';

import STYLES from './HomePageCard.css';

const getClassName = cssModules(STYLES);

export type Props = {
  title: string,
  href: ?string,
  image: string,
  icon: string,
  blank: boolean,
  centerIcon: boolean,
  fullWidth: boolean,
  iconWidth: ?string,
  className: ?string,
};

const HomePageCard = (props: Props) => {
  const {
    title,
    href,
    image,
    icon,
    blank,
    centerIcon,
    fullWidth,
    iconWidth,
    className,
    ...rest
  } = props;

  const classNames = getClassName(
    'bpkdocs-home-page-card',
    fullWidth && 'bpkdocs-home-page-card--full-width',
    className,
  );

  const iconClassNames = getClassName(
    'bpkdocs-home-page-card__icon',
    centerIcon && 'bpkdocs-home-page-card__icon--centered',
  );

  return (
    <BpkCard
      key={title}
      href={href}
      padded={false}
      blank={blank}
      className={classNames}
      {...rest}
    >
      <div className={getClassName('bpkdocs-home-page-card__inner')}>
        <div
          className={getClassName('bpkdocs-home-page-card__image-container')}
        >
          <div
            className={getClassName('bpkdocs-home-page-card__image')}
            style={{ backgroundImage: `url(${image})` }}
            alt={title}
          />
          <img
            src={icon}
            alt={title}
            className={iconClassNames}
            style={{ width: iconWidth }}
          />
        </div>
        <BpkText
          tagName="h2"
          textStyle="lg"
          className={getClassName('bpkdocs-home-page-card__caption')}
        >
          {title}
        </BpkText>
      </div>
    </BpkCard>
  );
};

HomePageCard.propTypes = {
  title: PropTypes.string.isRequired,
  href: PropTypes.string,
  image: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  blank: PropTypes.bool,
  centerIcon: PropTypes.bool,
  fullWidth: PropTypes.bool,
  iconWidth: PropTypes.string,
  className: PropTypes.string,
};

HomePageCard.defaultProps = {
  centerIcon: false,
  fullWidth: false,
  blank: false,
  href: null,
  iconWidth: null,
  className: null,
};

export default HomePageCard;
