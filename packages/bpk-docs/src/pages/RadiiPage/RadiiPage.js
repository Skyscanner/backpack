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
import { radii } from 'bpk-tokens/tokens/base.es6';
import { cssModules } from 'bpk-react-utils';

import STYLES from './radii-page.scss';
import DocsPageBuilder from './../../components/DocsPageBuilder';
import Paragraph from './../../components/Paragraph';
import PresentationBlock from './../../components/PresentationBlock';

const getClassName = cssModules(STYLES);

const RadiiPage = () => <DocsPageBuilder
  title="Radii"
  blurb={[
    <Paragraph>
      The following radii are used to soften the edges of shapes. These are often used on cards and other surfaces.
    </Paragraph>,
    <PresentationBlock className={getClassName('bpkdocs-radii-page__examples')}>
      {Object.keys(radii).map(tokenName => (
        <div
          key={tokenName}
          className={getClassName('bpkdocs-radii-page__item')}
        >
          <div
            className={getClassName('bpkdocs-radii-page__radii-example')}
            style={{
              borderRadius: radii[tokenName],
            }}
          >
            {kebabCase(tokenName)}
          </div>
        </div>
      ))}
    </PresentationBlock>,
  ]}
  tokenMap={radii}
  sassdocId="radii"
/>;

export default RadiiPage;
