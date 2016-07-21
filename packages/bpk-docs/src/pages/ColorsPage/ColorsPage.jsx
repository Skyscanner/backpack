import React from 'react'
import Helmet from 'react-helmet'
import kebabCase from 'lodash/kebabCase'
import CssModules from 'react-css-modules'

import styles from './colors-page.scss'
import BpkHeading from 'bpk-component-heading'
import BpkParagraph from 'bpk-component-paragraph'
import * as COLORS from './../../constants/colors'
import ColorSwatch from './../../components/ColorSwatch'
import { tokenCategories, getTokenValue } from './../../tokens'

const getHexColor = (color) => getTokenValue(tokenCategories.COLORS, color)

const ColorsPage = () => (
  <section>
    <Helmet title='Colours' />
    <BpkHeading level='h1'>Colours</BpkHeading>
    <BpkParagraph>
      Our palette is bold, colourful and impactful. The naming system below will help you quickly identify the colours
      referenced in this guide and in our prepared palette files.
    </BpkParagraph>
    <BpkParagraph>
      The primary colour for Skyscanner’s brand is Blue-500, a bold and vibrant blue. All other colours in the palette
      are considered secondary to this. The brand is also heavily white and should make strong use of negative space and
      breathing room.
    </BpkParagraph>
    <BpkHeading level='h2'>Primary</BpkHeading>
    <div styleName='bpkdocs-colors-page__swatch-container'>
      <ColorSwatch name={kebabCase(COLORS.COLOR_BLUE_500)} color={getHexColor(COLORS.COLOR_BLUE_500)} />
      <ColorSwatch name={kebabCase(COLORS.COLOR_WHITE)} color={getHexColor(COLORS.COLOR_WHITE)} border />
    </div>
    <BpkHeading level='h2'>Secondary</BpkHeading>
    <div styleName='bpkdocs-colors-page__swatch-container'>
      <ColorSwatch name={kebabCase(COLORS.COLOR_GREEN_500)} color={getHexColor(COLORS.COLOR_GREEN_500)} />
      <ColorSwatch name={kebabCase(COLORS.COLOR_YELLOW_500)} color={getHexColor(COLORS.COLOR_YELLOW_500)} />
      <ColorSwatch name={kebabCase(COLORS.COLOR_RED_500)} color={getHexColor(COLORS.COLOR_RED_500)} whiteColor />
    </div>
    <BpkHeading level='h2'>Grays</BpkHeading>
    <div styleName='bpkdocs-colors-page__swatch-container'>
      <ColorSwatch name={kebabCase(COLORS.COLOR_GRAY_50)} color={getHexColor(COLORS.COLOR_GRAY_50)} />
      <ColorSwatch name={kebabCase(COLORS.COLOR_GRAY_100)} color={getHexColor(COLORS.COLOR_GRAY_100)} />
      <ColorSwatch name={kebabCase(COLORS.COLOR_GRAY_200)} color={getHexColor(COLORS.COLOR_GRAY_200)} />
      <ColorSwatch name={kebabCase(COLORS.COLOR_GRAY_300)} color={getHexColor(COLORS.COLOR_GRAY_300)} whiteColor />
      <ColorSwatch name={kebabCase(COLORS.COLOR_GRAY_400)} color={getHexColor(COLORS.COLOR_GRAY_400)} whiteColor />
      <ColorSwatch name={kebabCase(COLORS.COLOR_GRAY_500)} color={getHexColor(COLORS.COLOR_GRAY_500)} whiteColor />
      <ColorSwatch name={kebabCase(COLORS.COLOR_GRAY_600)} color={getHexColor(COLORS.COLOR_GRAY_600)} whiteColor />
      <ColorSwatch name={kebabCase(COLORS.COLOR_GRAY_700)} color={getHexColor(COLORS.COLOR_GRAY_700)} whiteColor />
      <ColorSwatch name={kebabCase(COLORS.COLOR_GRAY_800)} color={getHexColor(COLORS.COLOR_GRAY_800)} whiteColor />
      <ColorSwatch name={kebabCase(COLORS.COLOR_GRAY_900)} color={getHexColor(COLORS.COLOR_GRAY_900)} whiteColor />
    </div>
    <BpkHeading level='h2'>Tints &amp; shades</BpkHeading>
    <BpkParagraph>
      A range of tints and shades are available for use in the Skyscanner palette, based on five base hues. The tints
      and shades are based on an algorithmic value from 50-900 with 50 being the lightest and 900 being the darkest.
      The number of tints and shades has been restrained to provide better visual coherence to the overall brand.
    </BpkParagraph>
    <BpkParagraph>
      The following tints and shades should only be used when applying states to buttons such as hovers.
    </BpkParagraph>
    <div styleName='bpkdocs-colors-page__swatch-container'>
      <ColorSwatch name={kebabCase(COLORS.COLOR_BLUE_400)} color={getHexColor(COLORS.COLOR_BLUE_400)} />
      <ColorSwatch name={kebabCase(COLORS.COLOR_BLUE_600)} color={getHexColor(COLORS.COLOR_BLUE_600)} whiteColor />
      <ColorSwatch name={kebabCase(COLORS.COLOR_GREEN_400)} color={getHexColor(COLORS.COLOR_GREEN_400)} />
      <ColorSwatch name={kebabCase(COLORS.COLOR_GREEN_600)} color={getHexColor(COLORS.COLOR_GREEN_600)} whiteColor />
    </div>
  </section>
)

export default CssModules(ColorsPage, styles)
