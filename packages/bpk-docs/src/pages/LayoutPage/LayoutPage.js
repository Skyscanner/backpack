import React from 'react'
import keys from 'lodash/keys'
import Helmet from 'react-helmet'
import pickBy from 'lodash/pickBy'
import includes from 'lodash/includes'
import kebabCase from 'lodash/kebabCase'
import TOKENS from 'bpk-tokens/tokens/base.common'

import BpkHeading from 'bpk-component-heading'
import BpkParagraph from 'bpk-component-paragraph'
import { BpkTable, BpkTableHead, BpkTableBody, BpkTableRow, BpkTableHeadCell, BpkTableCell } from 'bpk-component-table'

const anchors = {
  spacing: 'spacing'
}

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

const LayoutPage = () => (
  <section>
    <Helmet title='Layout' />
    <BpkHeading level='h1'>Layout</BpkHeading>
    <BpkHeading level='h2'>Units</BpkHeading>
    <BpkParagraph>
      Font-sizes, padding/margins, media queries and other units are measured in ‘Rems’ (root em). Since these are
      relative to the value inherited from the browser font-size, all other units will scale accordingly should a user
      change this. This is especially important for accessibility.
    </BpkParagraph>
    <BpkHeading id={anchors.spacing} level='h2'>Spacing</BpkHeading>
    <BpkParagraph>To ensure elements are distributed evenly, we use .375rem (6px) increments:</BpkParagraph>
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
    <BpkHeading level='h2'>Baseline grid (aka vertical rhythm)</BpkHeading>
    <BpkParagraph>
    We use a baseline grid to provide consistent vertical rhythm to our designs.  A baseline grid is an underlying
      structure that helps guide the vertical spacing of a design. Just like using columns for laying out elements
      horizontally, the baseline grid is a way to help you make decisions and build consistency into a layout.
    </BpkParagraph>
    <BpkParagraph>
    Our baseline grid is set to .375rem (6px) increments, with an optimised font-size, line-height and spacing that
      align to the grid.
    </BpkParagraph>
    <BpkParagraph>
    You can preview this by switching on the grid at the bottom of the page.
    </BpkParagraph>
    <BpkHeading level='h2'>Horizontal grid</BpkHeading>
    <BpkParagraph><em>Coming soon</em></BpkParagraph>

  </section>
)

export default LayoutPage
