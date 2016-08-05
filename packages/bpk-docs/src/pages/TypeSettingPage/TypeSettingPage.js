import React from 'react'
import keys from 'lodash/keys'
import Helmet from 'react-helmet'
import pickBy from 'lodash/pickBy'
import includes from 'lodash/includes'
import TOKENS from 'bpk-tokens/tokens/base.common'

import BpkLink from 'bpk-component-link'
import BpkHeading from 'bpk-component-heading'
import BpkParagraph from 'bpk-component-paragraph'
import { BpkList, BpkListItem } from 'bpk-component-list'
import { BpkTable, BpkTableHead, BpkTableBody, BpkTableRow, BpkTableHeadCell, BpkTableCell } from 'bpk-component-table'

import { formatTokenName, formatTokenValue } from './../../helpers/tokens-helper'

const anchors = {
  fontFamilies: 'type-units-page-fonts',
  fontSizes: 'type-units-page-font-sizes',
  lineHeights: 'type-units-page-line-heights'
}

const fontSizes = pickBy(TOKENS, (value, key) => includes(key, 'fontSize'))
const lineHeights = pickBy(TOKENS, (value, key) => includes(key, 'lineHeight'))

const TypeSettingPage = () => (
  <section>
    <Helmet title='Type setting' />
    <BpkHeading level='h1'>Type setting</BpkHeading>
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
            <BpkTableCell>{formatTokenName(fontSize)}</BpkTableCell>
            <BpkTableCell>{formatTokenValue(fontSizes[ fontSize ])}</BpkTableCell>
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
          <BpkTableRow key={formatTokenName(lineHeight)}>
            <BpkTableCell>{formatTokenName(lineHeight)}</BpkTableCell>
            <BpkTableCell>{formatTokenValue(lineHeights[ lineHeight ])}</BpkTableCell>
          </BpkTableRow>
        ))}
      </BpkTableBody>
    </BpkTable>
  </section>
)

export default TypeSettingPage
