import React from 'react'
import keys from 'lodash/keys'
import Helmet from 'react-helmet'
import pickBy from 'lodash/pickBy'
import includes from 'lodash/includes'
import kebabCase from 'lodash/kebabCase'
import TOKENS from 'bpk-tokens/tokens/base.common'

import BpkLink from 'bpk-component-link'
import BpkHeading from 'bpk-component-heading'
import BpkParagraph from 'bpk-component-paragraph'
import { BpkList, BpkListItem } from 'bpk-component-list'
import { BpkTable, BpkTableHead, BpkTableBody, BpkTableRow, BpkTableHeadCell, BpkTableCell } from 'bpk-component-table'

const anchors = {
  fontFamilies: 'fonts-page-fonts',
  fontSizes: 'fonts-page-font-sizes',
  lineHeights: 'fonts-page-line-heights',
  spacing: 'fonts-page-spacing'
}

const fontSizes = pickBy(TOKENS, (value, key) => includes(key, 'fontSize'))
const lineHeights = pickBy(TOKENS, (value, key) => includes(key, 'lineHeight'))
const spacings = pickBy(TOKENS, (value, key) => includes(key, 'spacing'))

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

const getName = (name) => kebabCase(name)

const getValue = (value) => {
  const pxValue = toPx(value)
  return pxValue ? `${value} (${pxValue})` : value
}

const FontsAndSpacingPage = () => (
  <section>
    <Helmet title='Typography' />
    <BpkHeading level='h1'>Typography</BpkHeading>
    <BpkParagraph>
      Rems are used for all units including font-sizes, padding/margins and media queries. Since these are relative to
      the value inherited from the browser font-size, it means everything will scale accordingly should a user change
      this. This is especially important for accessibility.
    </BpkParagraph>
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
    <BpkParagraph>
      Rather than specify a single font across all Skyscanner products, we rely on the native font used on each device.
      The benefits of this are two-fold, firstly we can lean on the hard-work and expertise that each OS manufacturer
      has expended in producing a font that works best on their respective platforms. Second, we avoid any drawbacks of
      serving a custom web-font; for example extra load time, and a so-called FOUT (flash of unstyled text). This will
      improve the user experience of our product on all devices.
    </BpkParagraph>
    <BpkTable>
      <BpkTableHead>
        <BpkTableRow>
          <BpkTableHeadCell>Name</BpkTableHeadCell>
          <BpkTableHeadCell>Value</BpkTableHeadCell>
        </BpkTableRow>
      </BpkTableHead>
      <BpkTableBody>
        <BpkTableRow>
          <BpkTableCell>font-family-base</BpkTableCell>
          <BpkTableCell>{TOKENS.fontFamilyBase}</BpkTableCell>
        </BpkTableRow>
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
        {keys(fontSizes).map((fontSize) => (
          <BpkTableRow key={fontSize}>
            <BpkTableCell>{getName(fontSize)}</BpkTableCell>
            <BpkTableCell>{getValue(fontSizes[fontSize])}</BpkTableCell>
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
        {keys(lineHeights).map((lineHeight) => (
          <BpkTableRow key={getName(lineHeight)}>
            <BpkTableCell>{getName(lineHeight)}</BpkTableCell>
            <BpkTableCell>{getValue(lineHeights[lineHeight])}</BpkTableCell>
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
        {keys(spacings).map((spacing) => (
          <BpkTableRow key={getName(spacing)}>
            <BpkTableCell>{getName(spacing)}</BpkTableCell>
            <BpkTableCell>{getValue(spacings[spacing])}</BpkTableCell>
          </BpkTableRow>
        ))}
      </BpkTableBody>
    </BpkTable>
  </section>
)

export default FontsAndSpacingPage
