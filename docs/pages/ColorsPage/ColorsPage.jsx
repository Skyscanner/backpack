import React from 'react'
import Helmet from 'react-helmet'
import kebabCase from 'lodash/kebabCase'
import CssModules from 'react-css-modules'

import styles from './colors-page.scss'
import * as COLORS from './../../constants/colors'
import BpkHeading from './../../components/BpkHeading'
import ColorSwatch from './../../components/ColorSwatch'
import { tokenCategories, getTokenValue } from './../../tokens'

const getHexColor = (color) => getTokenValue(tokenCategories.COLORS, color)

const ColorsPage = () => (
  <section>
    <Helmet title='Colors' />
    <BpkHeading level='h1'>Colors</BpkHeading>
    <BpkHeading level='h2'>Primary</BpkHeading>
    <div styleName='bpkdocs-colours-page__swatch-container'>
      <ColorSwatch name={kebabCase(COLORS.COLOR_BLUE_500)} color={getHexColor(COLORS.COLOR_BLUE_500)} />
      <ColorSwatch name={kebabCase(COLORS.COLOR_WHITE)} color={getHexColor(COLORS.COLOR_WHITE)} border />
    </div>
    <BpkHeading level='h2'>Secondary</BpkHeading>
    <div styleName='bpkdocs-colours-page__swatch-container'>
      <ColorSwatch name={kebabCase(COLORS.COLOR_GREEN_500)} color={getHexColor(COLORS.COLOR_GREEN_500)} />
      <ColorSwatch name={kebabCase(COLORS.COLOR_YELLOW_500)} color={getHexColor(COLORS.COLOR_YELLOW_500)} />
      <ColorSwatch name={kebabCase(COLORS.COLOR_RED_500)} color={getHexColor(COLORS.COLOR_RED_500)} whiteColor />
    </div>
    <BpkHeading level='h2'>Grays</BpkHeading>
    <div styleName='bpkdocs-colours-page__swatch-container'>
      <ColorSwatch name={kebabCase(COLORS.COLOR_GRAY_50)} color={getHexColor(COLORS.COLOR_GRAY_50)} />
      <ColorSwatch name={kebabCase(COLORS.COLOR_GRAY_100)} color={getHexColor(COLORS.COLOR_GRAY_100)} />
      <ColorSwatch name={kebabCase(COLORS.COLOR_GRAY_300)} color={getHexColor(COLORS.COLOR_GRAY_300)} whiteColor />
      <ColorSwatch name={kebabCase(COLORS.COLOR_GRAY_500)} color={getHexColor(COLORS.COLOR_GRAY_500)} whiteColor />
      <ColorSwatch name={kebabCase(COLORS.COLOR_GRAY_700)} color={getHexColor(COLORS.COLOR_GRAY_700)} whiteColor />
      <ColorSwatch name={kebabCase(COLORS.COLOR_GRAY_900)} color={getHexColor(COLORS.COLOR_GRAY_900)} whiteColor />
    </div>
    <BpkHeading level='h2'>Tints</BpkHeading>
    <div styleName='bpkdocs-colours-page__swatch-container'>
      <ColorSwatch name={kebabCase(COLORS.COLOR_BLUE_300)} color={getHexColor(COLORS.COLOR_BLUE_300)} />
      <ColorSwatch name={kebabCase(COLORS.COLOR_BLUE_700)} color={getHexColor(COLORS.COLOR_BLUE_700)} whiteColor />
      <ColorSwatch name={kebabCase(COLORS.COLOR_GREEN_300)} color={getHexColor(COLORS.COLOR_GREEN_300)} />
      <ColorSwatch name={kebabCase(COLORS.COLOR_GREEN_700)} color={getHexColor(COLORS.COLOR_GREEN_700)} whiteColor />
    </div>
  </section>
)

export default CssModules(ColorsPage, styles)
