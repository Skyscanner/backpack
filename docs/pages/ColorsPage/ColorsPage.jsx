import React from 'react'
import Helmet from 'react-helmet'
import CssModules from 'react-css-modules'

import styles from './colors-page.scss'
import * as COLORS from './../../constants/colors'
import BpkHeading from './../../components/BpkHeading'
import ColorSwatch from './../../components/ColorSwatch'
import { TOKEN_GROUPS, getTokenValue } from './../../tokens'

const getHexColor = (color) => getTokenValue(TOKEN_GROUPS.COLORS, color)

const ColorsPage = () => (
  <section>
    <Helmet title='Colors' />
    <BpkHeading level='h1'>Colors</BpkHeading>
    <BpkHeading level='h2'>Primary</BpkHeading>
    <div styleName='bpkdocs-colours-page__swatch-container'>
      <ColorSwatch name='Blue 500' color={getHexColor(COLORS.COLOR_BLUE_500)} />
      <ColorSwatch name='White' color={getHexColor(COLORS.COLOR_WHITE)} border />
    </div>
    <BpkHeading level='h2'>Secondary</BpkHeading>
    <div styleName='bpkdocs-colours-page__swatch-container'>
      <ColorSwatch name='Green 500' color={getHexColor(COLORS.COLOR_GREEN_500)} />
      <ColorSwatch name='Yellow 500' color={getHexColor(COLORS.COLOR_YELLOW_500)} />
      <ColorSwatch name='Red 500' color={getHexColor(COLORS.COLOR_RED_500)} whiteColor />
    </div>
    <BpkHeading level='h2'>Grays</BpkHeading>
    <div styleName='bpkdocs-colours-page__swatch-container'>
      <ColorSwatch name='Gray 50' color={getHexColor(COLORS.COLOR_GRAY_50)} />
      <ColorSwatch name='Gray 100' color={getHexColor(COLORS.COLOR_GRAY_100)} />
      <ColorSwatch name='Gray 300' color={getHexColor(COLORS.COLOR_GRAY_300)} whiteColor />
      <ColorSwatch name='Gray 500' color={getHexColor(COLORS.COLOR_GRAY_500)} whiteColor />
      <ColorSwatch name='Gray 700' color={getHexColor(COLORS.COLOR_GRAY_700)} whiteColor />
      <ColorSwatch name='Gray 900' color={getHexColor(COLORS.COLOR_GRAY_900)} whiteColor />
    </div>
    <BpkHeading level='h2'>Tints</BpkHeading>
    <div styleName='bpkdocs-colours-page__swatch-container'>
      <ColorSwatch name='Blue 300' color={getHexColor(COLORS.COLOR_BLUE_300)} />
      <ColorSwatch name='Blue 700' color={getHexColor(COLORS.COLOR_BLUE_700)} whiteColor />
      <ColorSwatch name='Green 300' color={getHexColor(COLORS.COLOR_GREEN_300)} />
      <ColorSwatch name='Green 700' color={getHexColor(COLORS.COLOR_GREEN_700)} whiteColor />
    </div>
  </section>
)

export default CssModules(ColorsPage, styles)
