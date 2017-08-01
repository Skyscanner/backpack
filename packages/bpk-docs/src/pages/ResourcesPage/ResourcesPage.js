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
import Helmet from 'react-helmet';
import PropTypes from 'prop-types';
import BpkLink from 'bpk-component-link';
import { BpkList, BpkListItem } from 'bpk-component-list';
import BpkContentContainer from 'bpk-component-content-container';
import { BpkGridContainer, BpkGridRow, BpkGridColumn } from 'bpk-component-grid';

import Heading from './../../components/Heading';
import Paragraph from './../../components/Paragraph';

/* eslint-disable import/no-webpack-loader-syntax */
const coreRgbAse = require('!!file-loader?name=[name].[hash].ase!./../../static/core_rgb.ase');
const coreRgbClr = require('!!file-loader?name=[name].[hash].clr!./../../static/core_rgb.clr');
const extendedRgbAse = require('!!file-loader?name=[name].[hash].ase!./../../static/extended_rgb.ase');
const extendedRgbClr = require('!!file-loader?name=[name].[hash].clr!./../../static/extended_rgb.clr');
const iconTemplate = require('!!file-loader?name=[name].[hash].sketch!./../../static/icon-template.sketch');
const responsiveGrid = require('!!file-loader?name=[name].[hash].sketch!./../../static/responsive-grids.sketch');
// TODO: Expose this when we release
// const bookmarklet = require('!!raw-loader!uglify-loader!babel-loader!../../bag-check-bookmarklet/index.js');
/* eslint-enable */

const ResourcesPage = props => (
  <BpkGridContainer>
    <Helmet title="Resources" />
    <BpkGridRow>
      <BpkGridColumn width={12}>
        <BpkContentContainer>
          <Heading level="h1">Resources</Heading>
          <Paragraph>Here you can find a variety of resources to help you design Skyscanner products:</Paragraph>
          <Heading level="h2">Color palettes</Heading>
          <Heading level="h3">Core</Heading>
          <BpkList>
            <BpkListItem>
              <BpkLink href={`/${coreRgbAse}`} blank>Adobe Swatch Exchange</BpkLink>
            </BpkListItem>
            <BpkListItem>
              <BpkLink href={`/${coreRgbClr}`} blank>Mac</BpkLink>
            </BpkListItem>
          </BpkList>
          <Heading level="h3">Extended (for marketing &amp; illustration only)</Heading>
          <BpkList>
            <BpkListItem>
              <BpkLink href={`/${extendedRgbAse}`} blank>Adobe Swatch Exchange</BpkLink>
            </BpkListItem>
            <BpkListItem>
              <BpkLink href={`/${extendedRgbClr}`} blank>Mac</BpkLink>
            </BpkListItem>
          </BpkList>
          <Heading level="h2">Icons</Heading>
          <BpkList>
            <BpkListItem>
              <BpkLink href={`/${props.route.iconsSvgs}`}>Icons</BpkLink>
            </BpkListItem>
          </BpkList>
          <Heading level="h2">Sketch</Heading>
          <BpkList>
            <BpkListItem>
              <BpkLink href={`/${responsiveGrid}`} blank>Responsive grids</BpkLink>
            </BpkListItem>
            <BpkListItem>
              <BpkLink href={`/${iconTemplate}`} blank>Icon template</BpkLink>
            </BpkListItem>
            {/*
              // TODO: Expose this when release
            <BpkListItem>
              <BpkLink href={`javascript:(function(){${bookmarklet}})();`}>Backcheck</BpkLink>
            </BpkListItem>
            */}
            <BpkListItem>
              <BpkLink href="https://www.invisionapp.com/craft" blank>
                Craft Plugin for Sketch
              </BpkLink>
            </BpkListItem>
            <BpkListItem>
              <BpkLink href="https://www.dropbox.com/sh/0dqy5vbr1pjk0f4/AADHS3kRM_yGCqp5wyVMe09Ba?dl=0" blank>
                Craft Library
              </BpkLink>
            </BpkListItem>
            <BpkListItem>
              <BpkLink href="https://animaapp.github.io/" blank>
                Autolayout Plugin for Sketch
              </BpkLink>
            </BpkListItem>
          </BpkList>
        </BpkContentContainer>
      </BpkGridColumn>
    </BpkGridRow>
  </BpkGridContainer>
);

ResourcesPage.propTypes = {
  route: PropTypes.shape({
    iconsSvgs: PropTypes.string,
  }).isRequired,
};

export default ResourcesPage;
