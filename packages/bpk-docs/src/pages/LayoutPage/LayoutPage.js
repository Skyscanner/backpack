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
import BpkContentContainer from 'bpk-component-content-container'
import { BpkTable, BpkTableHead, BpkTableBody, BpkTableRow, BpkTableHeadCell, BpkTableCell } from 'bpk-component-table'

import { formatTokenName, formatTokenValue } from './../../helpers/tokens-helper'

const anchors = {
  baseline: 'baseline',
  breakpoints: 'breakpoints',
  horizontal: 'horizontal'
}

const breakpoints = pickBy(TOKENS, (value, key) => includes(key, 'breakpoint') && !includes(key, 'breakpointQuery'))

const LayoutPage = () => (
  <section>
    <Helmet title='Layout' />
    <BpkContentContainer>
      <BpkHeading level='h1'>Layout</BpkHeading>
      <BpkList>
        <BpkListItem>
          <BpkLink href={`#${anchors.baseline}`}>Baseline</BpkLink>
        </BpkListItem>
        <BpkListItem>
          <BpkLink href={`#${anchors.breakpoints}`}>Breakpoints</BpkLink>
        </BpkListItem>
        <BpkListItem>
          <BpkLink href={`#${anchors.horizontal}`}>Horizontal</BpkLink>
        </BpkListItem>
      </BpkList>
      <BpkHeading id={anchors.baseline} level='h2'>Baseline grid (aka vertical rhythm)</BpkHeading>
      <BpkParagraph>
        We use a baseline grid to provide consistent vertical rhythm to our designs. A baseline grid is an underlying
        structure that helps guide the vertical spacing of a design. Just like using columns for laying out elements
        horizontally, the baseline grid is a way to help you make decisions and build consistency into a layout.
      </BpkParagraph>
      <BpkParagraph>
        Our baseline grid is set to .375rem (6px) increments, with an optimised font-size, line-height and spacing that
        align to the grid.
      </BpkParagraph>
      <BpkParagraph>You can preview this by switching on the grid at the bottom of the page.</BpkParagraph>
      <BpkHeading id={anchors.breakpoints} level='h2'>Breakpoints</BpkHeading>
      <BpkTable>
        <BpkTableHead>
          <BpkTableRow>
            <BpkTableHeadCell>Name</BpkTableHeadCell>
            <BpkTableHeadCell>Value</BpkTableHeadCell>
          </BpkTableRow>
        </BpkTableHead>
        <BpkTableBody>
          {keys(breakpoints).map((breakpoint) => (
            <BpkTableRow key={formatTokenName(breakpoint)}>
              <BpkTableCell>{formatTokenName(breakpoint)}</BpkTableCell>
              <BpkTableCell>{formatTokenValue(breakpoints[ breakpoint ])}</BpkTableCell>
            </BpkTableRow>
          ))}
        </BpkTableBody>
      </BpkTable>
      <BpkHeading id={anchors.horizontal} level='h2'>Horizontal grid</BpkHeading>
      <BpkParagraph><em>Coming soon</em></BpkParagraph>
    </BpkContentContainer>
  </section>
)

export default LayoutPage
