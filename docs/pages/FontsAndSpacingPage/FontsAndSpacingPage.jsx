import React from 'react'
import Helmet from 'react-helmet'
import kebabCase from 'lodash/kebabCase'

import BpkHeading from 'bpk-component-heading'
import { BpkList, BpkListItem } from 'bpk-component-list'
import BpkLink from './../../components/BpkLink'
import { tokenCategories, getTokens } from './../../tokens'
import {
  BpkTable,
  BpkTableHead,
  BpkTableBody,
  BpkTableRow,
  BpkTableHeadCell,
  BpkTableCell
} from './../../components/BpkTable'

const anchors = {
  fontFamilies: 'fonts-page-fonts',
  fontSizes: 'fonts-page-font-sizes',
  lineHeights: 'fonts-page-line-heights',
  spacing: 'fonts-page-spacing'
}

const toPx = (value) => {
  let parsed = null

  if (/rem$/.test(value)) {
    parsed = parseFloat(value.replace(/rem/, '')) * 16
  }

  if (/%$/.test(value)) {
    parsed = parseFloat(value.replace(/%/, '')) / 100 * 16
  }

  return parsed ? `${parsed}px` : null
}

const getName = ({ name }) => kebabCase(name)

const getValue = ({ value }) => {
  const pxValue = toPx(value)
  return pxValue ? `${value} (${pxValue})` : value
}

const FontsAndSpacingPage = () => (
  <section>
    <Helmet title='Fonts' />
    <BpkHeading level='h1'>Fonts and spacing</BpkHeading>
    <BpkList>
      <BpkListItem>
        <BpkLink href={`#${anchors.fontFamilies}`}>Font families</BpkLink>
      </BpkListItem>
      <BpkListItem>
        <BpkLink href={`#${anchors.fontSizes}`}>Font sizes</BpkLink>
      </BpkListItem>
      <BpkListItem>
        <BpkLink href={`#${anchors.lineHeights}`}>Line heights</BpkLink>
      </BpkListItem>
      <BpkListItem>
        <BpkLink href={`#${anchors.spacing}`}>Spacing</BpkLink>
      </BpkListItem>
    </BpkList>
    <BpkHeading id={anchors.fontFamilies} level='h2'>Font families</BpkHeading>
    <BpkTable>
      <BpkTableHead>
        <BpkTableRow>
          <BpkTableHeadCell>Name</BpkTableHeadCell>
          <BpkTableHeadCell>Value</BpkTableHeadCell>
        </BpkTableRow>
      </BpkTableHead>
      <BpkTableBody>
        {(() => getTokens(tokenCategories.FONTS))().map((font) => (
          <BpkTableRow key={getName(font)}>
            <BpkTableCell>{getName(font)}</BpkTableCell>
            <BpkTableCell>{font.value}</BpkTableCell>
          </BpkTableRow>
        ))}
      </BpkTableBody>
    </BpkTable>
    <BpkHeading id={anchors.fontSizes} level='h2'>Font sizes</BpkHeading>
    <BpkTable>
      <BpkTableHead>
        <BpkTableRow>
          <BpkTableHeadCell>Name</BpkTableHeadCell>
          <BpkTableHeadCell>Value</BpkTableHeadCell>
        </BpkTableRow>
      </BpkTableHead>
      <BpkTableBody>
        {(() => getTokens(tokenCategories.FONT_SIZES, 'core'))().map((fontSize) => (
          <BpkTableRow key={getName(fontSize)}>
            <BpkTableCell>{getName(fontSize)}</BpkTableCell>
            <BpkTableCell>{getValue(fontSize)}</BpkTableCell>
          </BpkTableRow>
        ))}
      </BpkTableBody>
    </BpkTable>
    <BpkHeading id={anchors.lineHeights} level='h2'>Line heights</BpkHeading>
    <BpkTable>
      <BpkTableHead>
        <BpkTableRow>
          <BpkTableHeadCell>Name</BpkTableHeadCell>
          <BpkTableHeadCell>Value</BpkTableHeadCell>
        </BpkTableRow>
      </BpkTableHead>
      <BpkTableBody>
        {(() => getTokens(tokenCategories.LINE_HEIGHTS, 'core'))().map((lineHeight) => (
          <BpkTableRow key={getName(lineHeight)}>
            <BpkTableCell>{getName(lineHeight)}</BpkTableCell>
            <BpkTableCell>{getValue(lineHeight)}</BpkTableCell>
          </BpkTableRow>
        ))}
      </BpkTableBody>
    </BpkTable>
    <BpkHeading id={anchors.spacing} level='h2'>Spacing</BpkHeading>
    <BpkTable>
      <BpkTableHead>
        <BpkTableRow>
          <BpkTableHeadCell>Name</BpkTableHeadCell>
          <BpkTableHeadCell>Value</BpkTableHeadCell>
        </BpkTableRow>
      </BpkTableHead>
      <BpkTableBody>
        {(() => getTokens(tokenCategories.SPACINGS, 'core'))().map((spacing) => (
          <BpkTableRow key={getName(spacing)}>
            <BpkTableCell>{getName(spacing)}</BpkTableCell>
            <BpkTableCell>{getValue(spacing)}</BpkTableCell>
          </BpkTableRow>
        ))}
      </BpkTableBody>
    </BpkTable>
  </section>
)

export default FontsAndSpacingPage
