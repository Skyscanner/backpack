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
import { cssModules } from 'bpk-react-utils';
import BpkRtlToggle from 'bpk-component-rtl-toggle';
import BpkGridToggle from 'bpk-component-grid-toggle';
import BpkThemeToggle from 'bpk-component-theme-toggle';
import BpkHeartIcon from 'bpk-component-icon/sm/heart';
import { withAlignment, withDescription } from 'bpk-component-icon';
import { lineHeightSm, iconSizeSm } from 'bpk-tokens/tokens/base.es6';
import BpkLink from 'bpk-component-link';

import STYLES from './Footer.css';

const getClassName = cssModules(STYLES);

const AlignedHeart = withDescription(
  withAlignment(BpkHeartIcon, lineHeightSm, iconSizeSm),
  'love',
);

const Footer = () => (
  <div className={getClassName('bpkdocs-footer__wrapper')}>
    <div className={getClassName('bpkdocs-footer__inner')}>
      <span className={getClassName('bpkdocs-footer__copyright')}>
        Made with{' '}
        <AlignedHeart className={getClassName('bpkdocs-footer__heart')} /> by{' '}
        <BpkLink href="https://www.skyscanner.net" blank>
          Skyscanner
        </BpkLink>{' '}
        &copy; {new Date().getFullYear()}
      </span>
      <div className={getClassName('bpkdocs-footer__controls')}>
        <div>
          <BpkGridToggle />&nbsp;|&nbsp;
          <BpkRtlToggle />
        </div>
        <BpkThemeToggle
          className={getClassName('bpkdocs-footer__theme-switcher')}
        />
      </div>
    </div>
  </div>
);

export default Footer;
