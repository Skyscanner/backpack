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
import kebabCase from 'lodash/kebabCase';
import { boxShadows } from 'bpk-tokens/tokens/base.es6';
import { cssModules } from 'bpk-react-utils';

import BpkRouterLink from 'bpk-component-router-link';
import STYLES from './shadow-page.scss';

import * as ROUTES from './../../constants/routes';
import DocsPageBuilder from './../../components/DocsPageBuilder';
import Paragraph from './../../components/Paragraph';
import PresentationBlock from './../../components/PresentationBlock';

const getClassName = cssModules(STYLES);

const ShadowsPage = () => <DocsPageBuilder
  title="Shadows"
  blurb={[
    <Paragraph>
      Shadows are used to convey depth and order. Like <BpkRouterLink to={ROUTES.RADII}>radii</BpkRouterLink> these are
      most often used on cards and other surfaces.
    </Paragraph>,
    <PresentationBlock className={getClassName('bpkdocs-shadow-page__examples')}>
      {Object.keys(boxShadows).map(tokenName => (
        <div
          key={tokenName}
          className={getClassName('bpkdocs-shadow-page__item')}
        >
          <div
            className={getClassName('bpkdocs-shadow-page__shadow-example')}
            style={{
              boxShadow: boxShadows[tokenName],
            }}
          >
            {kebabCase(tokenName)}
          </div>
        </div>
      ))}
    </PresentationBlock>,
  ]}
  components={[]}
  tokenMap={boxShadows}
  sassdocId="box-shadows"
/>;

export default ShadowsPage;
