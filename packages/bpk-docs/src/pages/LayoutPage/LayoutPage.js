import React from 'react'
import Helmet from 'react-helmet'

import BpkLink from 'bpk-component-link'
import BpkHeading from 'bpk-component-heading'
import BpkParagraph from 'bpk-component-paragraph'
import { BpkList, BpkListItem } from 'bpk-component-list'

const anchors = {
  baseline: 'baseline',
  horizontal: 'horizontal'
}

const LayoutPage = () => (
  <section>
    <Helmet title='Layout' />
    <BpkHeading level='h1'>Layout</BpkHeading>
    <BpkList>
      <BpkListItem>
        <BpkLink href={`#${anchors.baseline}`}>Baseline</BpkLink>
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
    <BpkParagraph>
      You can preview this by switching on the grid at the bottom of the page.
    </BpkParagraph>
    <BpkHeading id={anchors.horizontal} level='h2'>Horizontal grid</BpkHeading>
    <BpkParagraph><em>Coming soon</em></BpkParagraph>
  </section>
)

export default LayoutPage
