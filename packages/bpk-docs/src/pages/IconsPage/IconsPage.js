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

import _ from 'lodash';
import React from 'react';
import BpkLink from 'bpk-component-link';
import BpkButton from 'bpk-component-button';
import { withButtonAlignment } from 'bpk-component-icon';
import BpkSmallDownloadIcon from 'bpk-component-icon/sm/download';
import icons from 'bpk-component-icon/all';

import iconReadme from 'bpk-component-icon/readme.md';

import * as ROUTES from './../../constants/routes';
import IconSearchApp from './../../components/IconSearchApp';
import DocsPageBuilder from './../../components/DocsPageBuilder';
import Heading from './../../components/Heading';
import Paragraph from './../../components/Paragraph';
import Code from '../../components/Code';

const AlignedBpkSmallDownloadIcon = withButtonAlignment(BpkSmallDownloadIcon);

// eslint-disable-next-line import/no-webpack-loader-syntax
const iconsSvgs = require('!!file-loader?name=[name].[hash].zip!zip-it-loader!./../../../../bpk-svgs/src/icons/icons');

const friendlyNameMap = {
  sm: 'Small',
  lg: 'Large',
};

const getFriendlyName = id => friendlyNameMap[id] || id;

const iconsFinal = _(icons)
  .flatMap((category, categoryId) =>
    Object.keys(category).map(name => ({
      name,
      categoryId,
      categoryName: getFriendlyName(categoryId),
      component: category[name],
    })),
  )
  .value();

const blurb = [
  <Paragraph>
    Icons are provided in two sizes: small (18px) and large (24px). Both are
    pixel-snapped for clarity at the intended usage sizes.
  </Paragraph>,
  <Paragraph>
    <BpkButton href={`/${iconsSvgs}`}>
      Download SVG files <AlignedBpkSmallDownloadIcon />
    </BpkButton>
  </Paragraph>,
  <Paragraph>
    The <BpkLink href="#readme">readme</BpkLink> for the component is available
    below the search tool.
  </Paragraph>,
  <Heading level="h2">Find the right icon</Heading>,
  <IconSearchApp icons={iconsFinal} />,
  <Heading level="h2">Aligning icons within components</Heading>,
  <Paragraph>
    The <BpkLink href={ROUTES.ALIGNMENT}>Alignment</BpkLink> page gives examples
    of icon alignment using HOCs provided in the <Code>bpk-component-icon</Code>{' '}
    package.
  </Paragraph>,
];

const IconsPage = ({ ...rest }) => (
  <DocsPageBuilder
    title="Icons"
    blurb={blurb}
    components={[]}
    readme={iconReadme}
    sassdocId="svgs-mixin-bpk-icon"
    {...rest}
  />
);

export default IconsPage;
