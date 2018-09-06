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
import { cssModules } from 'bpk-react-utils';
import MenuIcon from 'bpk-component-icon/lg/menu';
import BpkCloseButton from 'bpk-component-close-button';
import BpkBreakpoint, { BREAKPOINTS } from 'bpk-component-breakpoint';

import STYLES from './MainHeroImage.css';

const getClassName = cssModules(STYLES);

type Props = {
  onHamburgerClick: (event: SyntheticEvent<>) => mixed,
  heroImage: ?{
    url: string,
    // The horizontal background position in percentage
    horizontalPosition: ?number,
  },
};

export default (props: Props) => {
  const { onHamburgerClick, heroImage } = props;
  const heroStyle = {};

  if (heroImage) {
    const { url, horizontalPosition } = heroImage;

    heroStyle.backgroundImage = `url(${url})`;

    if (horizontalPosition) {
      heroStyle.backgroundPosition = `0% ${horizontalPosition}%`;
    }
  }

  const heroClassNames = getClassName(
    'bpkdocs-main-hero-image',
    !heroImage && 'bpkdocs-main-hero-image--collapsed',
  );

  const hamburgerMenuClassNames = getClassName(
    'bpkdocs-main-hero-image__hamburger',
    !heroImage && 'bpkdocs-main-hero-image__hamburger--hero-collapsed',
  );

  return (
    <div className={heroClassNames} style={heroStyle}>
      <BpkBreakpoint query={BREAKPOINTS.ABOVE_TABLET}>
        {aboveTablet =>
          !aboveTablet && (
            <BpkCloseButton
              label="Open menu"
              onClick={onHamburgerClick}
              customIcon={MenuIcon}
              className={hamburgerMenuClassNames}
            />
          )
        }
      </BpkBreakpoint>
    </div>
  );
};
