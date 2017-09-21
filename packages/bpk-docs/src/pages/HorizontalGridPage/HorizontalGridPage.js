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
import { BpkCode } from 'bpk-component-code';
import BpkBlockquote from 'bpk-component-blockquote';
import BpkRouterLink from 'bpk-component-router-link';

import gridReadme from 'bpk-component-grid/readme.md';

import * as routes from './../../constants/routes';
import DocsPageBuilder from './../../components/DocsPageBuilder';
import Paragraph from './../../components/Paragraph';

const HorizontalGridPage = () => <DocsPageBuilder
  title="Horizontal grid"
  blurb={[
    <Paragraph>
      Backpack uses a 12 column responsive grid to compose and layout pages. Grids are composed using three basic
      building blocks: containers, rows and columns. Containers are used to encapsulate the entire layout (all rows).
      Rows are used to act as container to columns and columns are used to horizontally layout content.
    </Paragraph>,
    <BpkBlockquote extraSpace>
      <strong>Note:</strong> The Backpack grid is intended to be used for overall page layout as opposed to spacing
      out atom or molecule level components. Please stick to flexbox based techniques for more intricate
      layouts (or <BpkCode>display: table;</BpkCode> for browsers which lack support), just be sure to use the spacing
      values above in order to achieve consistency.
    </BpkBlockquote>,
    <Paragraph>
      <strong>Columns</strong>
    </Paragraph>,
    <Paragraph>
      The grid makes use of 12 percentage based columns, which means your layouts will scale no matter the browser
      size. Columns are separated by fixed width gutters and margins.
    </Paragraph>,
    <Paragraph>
      <BpkRouterLink to={routes.GRID_COLUMN_DEMO}>View demo.</BpkRouterLink>
    </Paragraph>,
    <Paragraph>
      <strong>Offsets</strong>
    </Paragraph>,
    <Paragraph>
      Offsets allow you to shift columns to the right. Depending on their size, columns can be offset by 1 through 11.
    </Paragraph>,
    <Paragraph>
      <BpkRouterLink to={routes.GRID_OFFSET_DEMO}>View demo.</BpkRouterLink>
    </Paragraph>,
    <Paragraph>
      <strong>Responsive behaviour</strong>
    </Paragraph>,
    <Paragraph>
      The grid works in conjunction with the breakpoints listed above and can be used to position content differently
      based on these viewports by specifying different widths and offsets.
    </Paragraph>,
  ]}
  readme={gridReadme}
  sassdocId="grids"
/>;

export default HorizontalGridPage;
