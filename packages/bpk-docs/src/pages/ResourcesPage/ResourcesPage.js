import React from 'react';
import Helmet from 'react-helmet';

import BpkLink from 'bpk-component-link';
import BpkHeading from 'bpk-component-heading';
import BpkParagraph from 'bpk-component-paragraph';
import { BpkList, BpkListItem } from 'bpk-component-list';
import BpkContentContainer from 'bpk-component-content-container';
import { BpkGridContainer, BpkGridRow, BpkGridColumn } from 'bpk-component-grid';

/* eslint-disable import/no-webpack-loader-syntax */
const iconsZip = require('!!file?name=[name].[hash].zip!zip-it!./../../../../bpk-svgs/src/icons/icons');
const coreRgbAse = require('!!file?name=[name].[hash].ase!./../../static/core_rgb.ase');
const coreRgbClr = require('!!file?name=[name].[hash].clr!./../../static/core_rgb.clr');
const extendedRgbAse = require('!!file?name=[name].[hash].ase!./../../static/extended_rgb.ase');
const extendedRgbClr = require('!!file?name=[name].[hash].clr!./../../static/extended_rgb.clr');
const iconTemplate = require('!!file?name=[name].[hash].sketch!./../../static/icon-template.sketch');
const responsiveGrid = require('!!file?name=[name].[hash].sketch!./../../static/responsive-grids.sketch');
// TODO: Expose this when we release
// const bookmarklet = require('!!raw-loader!uglify-loader!babel-loader!../../bag-check-bookmarklet/index.js');
/* eslint-enable */


const ResourcesPage = () => (
  <BpkGridContainer>
    <Helmet title="Resources" />
    <BpkGridRow>
      <BpkGridColumn width={12}>
        <BpkContentContainer>
          <BpkHeading level="h1">Resources</BpkHeading>
          <BpkParagraph>Here you can find a variety of resources to help you design Skyscanner products:</BpkParagraph>
          <BpkHeading level="h2">Color palettes</BpkHeading>
          <BpkHeading level="h3">Core</BpkHeading>
          <BpkList>
            <BpkListItem>
              <BpkLink href={`/${coreRgbAse}`} blank>Adobe Swatch Exchange</BpkLink>
            </BpkListItem>
            <BpkListItem>
              <BpkLink href={`/${coreRgbClr}`} blank>Mac</BpkLink>
            </BpkListItem>
          </BpkList>
          <BpkHeading level="h3">Extended (for illustration only)</BpkHeading>
          <BpkList>
            <BpkListItem>
              <BpkLink href={`/${extendedRgbAse}`} blank>Adobe Swatch Exchange</BpkLink>
            </BpkListItem>
            <BpkListItem>
              <BpkLink href={`/${extendedRgbClr}`} blank>Mac</BpkLink>
            </BpkListItem>
          </BpkList>
          <BpkHeading level="h2">Icons</BpkHeading>
          <BpkList>
            <BpkListItem>
              <BpkLink href={`/${iconsZip}`}>Icons</BpkLink>
            </BpkListItem>
          </BpkList>
          <BpkHeading level="h2">Sketch</BpkHeading>
          <BpkList>
            <BpkListItem>
              <BpkLink href={`/${responsiveGrid}`} blank>Responsive grids</BpkLink>
            </BpkListItem>
            <BpkListItem>
              <BpkLink href={`/${iconTemplate}`} blank>Icon tempalte</BpkLink>
            </BpkListItem>
            {/*
              // TODO: Expose this when release
            <BpkListItem>
              <BpkLink href={`javascript:(function(){${bookmarklet}})();`}>Backcheck</BpkLink>
            </BpkListItem>
            */}
            <BpkListItem>
              <BpkLink href="https://www.dropbox.com/sh/0dqy5vbr1pjk0f4/AADHS3kRM_yGCqp5wyVMe09Ba?dl=0" blank>
                Craft Library
              </BpkLink>
            </BpkListItem>
          </BpkList>
        </BpkContentContainer>
      </BpkGridColumn>
    </BpkGridRow>
  </BpkGridContainer>
);

export default ResourcesPage;
