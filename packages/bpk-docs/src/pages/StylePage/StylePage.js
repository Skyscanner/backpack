import React from 'react';
import Helmet from 'react-helmet';
import PropTypes from 'prop-types';
import BpkLink from 'bpk-component-link';
import BpkTile from 'bpk-component-tile';
import { cssModules } from 'bpk-react-utils';
import BpkHeading from 'bpk-component-heading';
import BpkParagraph from 'bpk-component-paragraph';
import { colors } from 'bpk-tokens/tokens/base.es6';
import { Link } from 'react-router';
import BpkContentContainer from 'bpk-component-content-container';
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

/* eslint-disable import/no-webpack-loader-syntax */
const iconGuidelines = require('!!file-loader?name=[name].[hash].pdf!./../../static/icon_guidelines.pdf');
const illustrationGuidelines = require(
  '!!file-loader?name=[name].[hash].pdf!./../../static/Illustration_Guideline_2017_v6.pdf',
  );
const illustrationSamples = require('!!file-loader?name=[name].[hash].zip!./../../static/illistration_samples.zip');
const toneOfVoiceGuidelines = require(
  '!!file-loader?name=[name].[hash].pdf!./../../static/skyscanner_tone_of_voice_guide.pdf',
  );
const photographyGuidelines = require('!!file-loader?name=[name].[hash].pdf!./../../static/photography_guidelines.pdf');
const brandGuidelines = require('!!file-loader?name=[name].[hash].pdf!./../../static/brand_guidelines_17-10-16.pdf');
/* eslint-enable */


const StylePage = props => (
  <BpkGridContainer>
    <Helmet title="Style" />
    <BpkGridRow>
      <BpkGridColumn width={12}>
        <BpkContentContainer>
          <BpkHeading level="h1">Style</BpkHeading>
          <BpkParagraph>
            Here you can find guides and information for creating assets in the Skyscanner style.
          </BpkParagraph>
        </BpkContentContainer>
      </BpkGridColumn>
    </BpkGridRow>
    <BpkGridRow>
      <BpkGridColumn padded={false} width={12}>
        <BpkHeading level="h2" bottomMargin={false} className={getClassName('bpkdocs-style-page__section-header')}>
          Icons
        </BpkHeading>
      </BpkGridColumn>
    </BpkGridRow>
    <BpkGridRow>
      <BpkGridColumn width={6} mobileWidth={12} tabletWidth={12}>
        <a
          href={`/${iconGuidelines}`}
          className={getClassName('bpkdocs-style-page__link')}
          target="_blank"
          rel="noopener noreferrer"
        >
          <BpkTile
            heading="How to draw icons"
            cta="Read the guidelines"
            imageSource={`/${iconsImage}`}
          />
        </a>
      </BpkGridColumn>
      <BpkGridColumn width={3} mobileWidth={12} tabletWidth={6}>
        <Link to={ROUTES.ICONS} className={getClassName('bpkdocs-style-page__link')}>
          <BpkTile
            heading="Using icons in code"
            cta="Read the docs"
            imageSource={`/${sassImage}`}
            backgroundColor={colors.colorGreen500}
          />
        </Link>
      </BpkGridColumn>
      <BpkGridColumn width={3} mobileWidth={12} tabletWidth={6}>
        <a
          href={`/${props.route.iconsSvgs}`}
          className={getClassName('bpkdocs-style-page__link')}
          target="_blank"
          rel="noopener noreferrer"
        >
          <BpkTile
            heading="Using icons in Sketch"
            cta="Download the SVGs"
            imageSource={`/${sketchImage}`}
            backgroundColor={colors.colorRed500}
          />
        </a>
      </BpkGridColumn>
    </BpkGridRow>
    <BpkGridRow>
      <BpkGridColumn padded={false} width={12}>
        <BpkHeading level="h2" bottomMargin={false} className={getClassName('bpkdocs-style-page__section-header')}>
          Illustration
        </BpkHeading>
      </BpkGridColumn>
    </BpkGridRow>
    <BpkGridRow>
      <BpkGridColumn width={9} mobileWidth={12} tabletWidth={6}>
        <a
          href={`/${illustrationGuidelines}`}
          className={getClassName('bpkdocs-style-page__link')}
          target="_blank"
          rel="noopener noreferrer"
        >
          <BpkTile
            heading="Illustration guidelines and best practices"
            cta="Download the guide"
            imageSource={`/${illustrationImage}`}
            backgroundColor={colors.colorwhite}
            dark={false}
          />
        </a>
      </BpkGridColumn>
      <BpkGridColumn width={3} mobileWidth={12} tabletWidth={6}>
        <a
          href={`/${illustrationSamples}`}
          className={getClassName('bpkdocs-style-page__link')}
          target="_blank"
          rel="noopener noreferrer"
        >
          <BpkTile
            heading="Illustration examples"
            cta="Download samples"
            imageSource={`/${illustrationSamplesImage}`}
            backgroundColor={colors.colorwhite}
            dark={false}
          />
        </a>
      </BpkGridColumn>
    </BpkGridRow>
    <BpkGridRow>
      <BpkGridColumn
        padded={false}
        width={6}
        mobileWidth={12}
        tabletWidth={6}
        className={getClassName('bpkdocs-style-page__copywrite-column')}
      >
        <BpkHeading level="h2" className={getClassName('bpkdocs-style-page__section-header')}>
          Copywriting
        </BpkHeading>
        <a
          href={`/${toneOfVoiceGuidelines}`}
          className={getClassName('bpkdocs-style-page__link')}
          target="_blank"
          rel="noopener noreferrer"
        >
          <BpkTile
            heading="Tone of voice"
            cta="Download the guide"
            imageSource={`/${toneOfVoiceImage}`}
            backgroundColor={colors.colorYellow500}
          />
        </a>
      </BpkGridColumn>
      <BpkGridColumn
        padded={false}
        width={6}
        tabletWidth={6}
        mobileWidth={12}
        className={getClassName('bpkdocs-style-page__copywrite-column')}
      >
        <BpkHeading level="h2" className={getClassName('bpkdocs-style-page__section-header')}>Photography</BpkHeading>
        <a
          href={`/${photographyGuidelines}`}
          className={getClassName('bpkdocs-style-page__link')}
          target="_blank"
          rel="noopener noreferrer"
        >
          <BpkTile
            heading="Photography guildelines"
            cta="Check them out"
            imageSource={`/${canadaImage}`}
            dark={false}
          />
        </a>
      </BpkGridColumn>
    </BpkGridRow>
    <BpkGridRow>
      <BpkGridColumn width={12}>
        <BpkContentContainer>
          <BpkParagraph className={getClassName('bpkdocs-style-page__brand-guidelines')}>
            Looking for brand guidelines? <BpkLink href={`/${brandGuidelines}`}>Grab them here.</BpkLink>
          </BpkParagraph>
        </BpkContentContainer>
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
