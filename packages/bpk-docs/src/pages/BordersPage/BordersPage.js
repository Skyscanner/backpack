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
import { borders, colorGray100 } from 'bpk-tokens/tokens/base.es6';
import { cssModules } from 'bpk-react-utils';

import STYLES from './borders-page.scss';
import DocsPageBuilder from './../../components/DocsPageBuilder';
import Paragraph from './../../components/Paragraph';
import PresentationBlock from './../../components/PresentationBlock';

const getClassName = cssModules(STYLES);

const BordersPage = () => <DocsPageBuilder
  title="Borders"
  blurb={[
    <Paragraph>
      Borders help provide structure and division between elements. These should be used sparingly as a compliment to
      color, type and shape to avoid the UI becoming filled with boxes.
    </Paragraph>,
    <PresentationBlock className={getClassName('bpkdocs-borders-page__examples')}>
      {Object.keys(borders).map(tokenName => (
        <div
          key={tokenName}
          className={getClassName('bpkdocs-borders-page__item')}
        >
          <div
            className={getClassName('bpkdocs-borders-page__border-example')}
            style={{
              boxShadow: `0 0 0 ${borders[tokenName]} ${colorGray100} inset`,
            }}
          >
            {kebabCase(tokenName)}
          </div>
        </div>
      ))}
    </PresentationBlock>,
  ]}
  components={[]}
  tokenMap={borders}
  sassdocId="borders"
/>;

export default BordersPage;
