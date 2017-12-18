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

import React from 'react';
import PropTypes from 'prop-types';
import BpkLink from 'bpk-component-link';
import { cssModules } from 'bpk-react-utils';

import sassdocLogoSvg from './../../static/sassdoc-logo.svg';

import STYLES from './sassdoc-link.scss';

const getClassName = cssModules(STYLES);

const SassdocLink = props => (
  <aside className={getClassName('bpkdocs-sassdoc-link')}>
    <img
      className={getClassName('bpkdocs-sassdoc-link__logo')}
      src={`/${sassdocLogoSvg}`}
      alt="Sass docs logo"
    />
    Looking for &quot;{props.category}&quot; Sass variables and mixins? Check
    out{' '}
    <BpkLink href={`/sassdoc/#${props.sassdocId}`} blank>
      Backpack&apos;s Sassdoc
    </BpkLink>.
  </aside>
);

SassdocLink.propTypes = {
  sassdocId: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
};

export default SassdocLink;
