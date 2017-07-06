import React from 'react';
import PropTypes from 'prop-types';
import BpkLink from 'bpk-component-link';
import BpkTile from 'bpk-component-tile';
import { cssModules } from 'bpk-react-utils';
import BpkHeading from 'bpk-component-heading';
import BpkParagraph from 'bpk-component-paragraph';
import { colors } from 'bpk-tokens/tokens/base.es6';
import BpkRouterLink from 'bpk-component-router-link';
import { BpkGridContainer, BpkGridRow, BpkGridColumn } from 'bpk-component-grid';

import * as ROUTES from './../../constants/routes';
import STYLES from './StylePage.scss';
import iconsImage from './icons.png';
import sassImage from './sass-react-logos.svg';
import sketchImage from './sketch-logo.svg';
import illustrationImage from './illustration-guidelines.svg';
import illustrationSamplesImage from './illustration_examples.svg';
import toneOfVoiceImage from './tone-of-voice.svg';
import canadaImage from './canada_lake_lady.jpg';

const getClassName = cssModules(STYLES);

const pageTitle = 'Style';
/* eslint-disable import/no-webpack-loader-syntax */
const iconGuidelines = require('!!file?name=[name].[hash].pdf!./../../static/icon_guidelines.pdf');
const illustrationGuidelines = require(
  '!!file?name=[name].[hash].pdf!./../../static/Illustration_Guideline_2017_v6.pdf',
  );
const illustrationSamples = require('!!file?name=[name].[hash].zip!./../../static/illistration_samples.zip');
const toneOfVoiceGuidelines = require(
  '!!file?name=[name].[hash].pdf!./../../static/skyscanner_tone_of_voice_guide.pdf',
  );
const photographyGuidelines = require('!!file?name=[name].[hash].pdf!./../../static/photography_guidelines.pdf');
const brandGuidelines = require('!!file?name=[name].[hash].pdf!./../../static/brand_guidelines_17-10-16.pdf');
/* eslint-enable */


const StylePage = props => (
  <BpkGridContainer>
    <BpkGridRow>
      <BpkGridColumn width={12}>
        <BpkHeading level="h1">{pageTitle}</BpkHeading>
        <BpkParagraph>
          Here you can find guides and information for creating assets in the Skyscanner style.
        </BpkParagraph>
      </BpkGridColumn>
    </BpkGridRow>
    <BpkGridRow>
      <BpkGridColumn width={12} padded={false}>
        <BpkHeading level="h2" bottomMargin={false}>Icons</BpkHeading>
      </BpkGridColumn>
    </BpkGridRow>
    <BpkGridRow>
      <BpkGridColumn width={6} mobileWidth={12} tabletWidth={12}>
        <a href={`/${iconGuidelines}`} className={getClassName('bpkdocs-style-page__link')}>
          <BpkTile
            heading="How to draw icons"
            cta="Read the guidelines"
            imageSource={iconsImage}
          />
        </a>
      </BpkGridColumn>
      <BpkGridColumn width={3} mobileWidth={12} tabletWidth={6}>
        <BpkRouterLink to={ROUTES.ICONS} className={STYLES['bpkdocs-style-page__link']}>
          <BpkTile
            heading="Using icons in code."
            cta="Read the docs"
            imageSource={sassImage}
            backgroundColor={colors.colorGreen500}
          />
        </BpkRouterLink>
      </BpkGridColumn>
      <BpkGridColumn width={3} mobileWidth={12} tabletWidth={6}>
        <a href={`/${props.route.iconsSvgs}`} className={getClassName('bpkdocs-style-page__link')}>
          <BpkTile
            heading="Using icons in sketch."
            cta="Download the SVGs"
            imageSource={sketchImage}
            backgroundColor={colors.colorRed500}
          />
        </a>
      </BpkGridColumn>
    </BpkGridRow>
    <BpkGridRow>
      <BpkGridColumn width={12} padded={false}>
        <BpkHeading level="h2" bottomMargin={false}>Illustration</BpkHeading>
      </BpkGridColumn>
    </BpkGridRow>
    <BpkGridRow>
      <BpkGridColumn width={9} mobileWidth={12} tabletWidth={6}>
        <a href={`/${illustrationGuidelines}`} className={getClassName('bpkdocs-style-page__link')}>
          <BpkTile
            heading="Illustration guidelines and best practices."
            cta="Download the guide"
            imageSource={illustrationImage}
            backgroundColor={colors.colorwhite}
            dark={false}
          />
        </a>
      </BpkGridColumn>
      <BpkGridColumn width={3} mobileWidth={12} tabletWidth={6}>
        <a href={`/${illustrationSamples}`} className={getClassName('bpkdocs-style-page__link')}>
          <BpkTile
            heading="Illustration examples"
            cta="Download samples"
            imageSource={illustrationSamplesImage}
            backgroundColor={colors.colorwhite}
            dark={false}
          />
        </a>
      </BpkGridColumn>
    </BpkGridRow>
    <BpkGridRow>
      <BpkGridColumn
        className={getClassName('bpkdocs-style-page__copywrite-column')}
        width={6}
        mobileWidth={12}
        tabletWidth={6}
        padded={false}
      >
        <BpkHeading level="h2">Copywriting</BpkHeading>
        <a href={`/${toneOfVoiceGuidelines}`} className={getClassName('bpkdocs-style-page__link')}>
          <BpkTile
            heading="Illustration guidelines and best practices"
            cta="Download this guide"
            imageSource={toneOfVoiceImage}
            backgroundColor={colors.colorYellow500}
          />
        </a>
      </BpkGridColumn>
      <BpkGridColumn
        className={getClassName('bpkdocs-style-page__copywrite-column')}
        width={6}
        mobileWidth={12}
        tabletWidth={6}
        padded={false}
      >
        <BpkHeading level="h2">Photography</BpkHeading>
        <a href={`/${photographyGuidelines}`} className={getClassName('bpkdocs-style-page__link')}>
          <BpkTile
            heading="Photography"
            cta="Check them out"
            imageSource={canadaImage}
            dark={false}
          />
        </a>
      </BpkGridColumn>
    </BpkGridRow>
    <BpkGridRow>
      <BpkGridColumn width={12}>
        <BpkParagraph className={getClassName('bpkdocs-style-page__brand-guidelines')}>
          Looking for brand guidelines? <BpkLink href={`/${brandGuidelines}`}>Grab them here.</BpkLink>
        </BpkParagraph>
      </BpkGridColumn>
    </BpkGridRow>
  </BpkGridContainer>
);

StylePage.propTypes = {
  route: PropTypes.shape({
    iconsSvgs: PropTypes.string,
  }).isRequired,
};

export default StylePage;
