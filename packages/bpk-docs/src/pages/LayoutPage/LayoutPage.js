import React from 'react'
import pickBy from 'lodash/pickBy'
import includes from 'lodash/includes'
import TOKENS from 'bpk-tokens/tokens/base.common'

import BpkRouterLink from 'bpk-component-router-link'
import BpkParagraph from 'bpk-component-paragraph'

import * as routes from './../../constants/routes'
import DocsPageBuilder from './../../components/DocsPageBuilder'

const breakpoints = pickBy(TOKENS, (value, key) => includes(key, 'breakpoint') && !includes(key, 'breakpointQuery'))

const components = [
  {
    id: 'spacing',
    title: 'Spacing',
    blurb: [
      <BpkParagraph>
        All spacing is measured in ‘rems’. Since these are relative to the value inherited from the browser font-size,
        all other units will scale accordingly should a user change this.
      </BpkParagraph>,
      <BpkParagraph>To ensure elements are distributed evenly, we use .375rem (6px) increments:</BpkParagraph>
    ],
    examples: [],
    tokenMap: pickBy(TOKENS, (value, key) => includes(key, 'spacing')),
    sassdocId: 'spacings'
  },
  {
    id: 'baseline-grid',
    title: 'Baseline grid (aka vertical rhythm)',
    blurb: [
      <BpkParagraph>
        Backpack uses a baseline grid to provide consistent vertical rhythm. A baseline grid is an underlying structure
        that helps guide the vertical spacing of a design. Just like using columns for laying out elements horizontally,
        the baseline grid is a way to help you make decisions and build consistency into a layout.
      </BpkParagraph>,
      <BpkParagraph>
        Backpack’s baseline grid is set to .375rem (6px) increments, with an optimised font-size, line-height and
        spacing that align to the grid.
      </BpkParagraph>,
      <BpkParagraph>You can preview this by switching on the grid at the bottom of the page.</BpkParagraph>
    ],
    examples: []
  },
  {
    id: 'breakpoints',
    title: 'Breakpoints',
    blurb: [
      <BpkParagraph>
        To simplify things, Backpack uses only three breakpoints optimised for mobile, tablet and desktop viewports.
      </BpkParagraph>
    ],
    examples: [],
    tokenMap: breakpoints,
    sassdocId: 'breakpoints'
  },
  {
    id: 'horizontal-grid',
    title: 'Horizontal grid',
    blurb: [
      <BpkParagraph>
        Backpack uses a 12 column responsive grid to compose and layout Organisms. At its core are three things:
        containers, rows and columns. Containers are used to encapsulate the entire layout (all rows). Rows are used to
        act as container to columns, and columns are used to contain content.
      </BpkParagraph>,
      <BpkParagraph>
        <strong>Columns</strong>
      </BpkParagraph>,
      <BpkParagraph>
        The grid makes use of 12 percentage based columns, which means your layouts will scale no matter the browser
        size. Columns are separated by fixed width gutters and margins.
      </BpkParagraph>,
      <BpkParagraph>
        <BpkRouterLink to={routes.GRID_COLUMN_DEMO}>View demo.</BpkRouterLink>
      </BpkParagraph>,
      <BpkParagraph>
        <strong>Offsets</strong>
      </BpkParagraph>,
      <BpkParagraph>
        Offsets allow you to shift columns to the right. Depending on their size, columns can be offset by 1 through 11.
      </BpkParagraph>,
      <BpkParagraph>
        <BpkRouterLink to={routes.GRID_OFFSET_DEMO}>View demo.</BpkRouterLink>
      </BpkParagraph>,
      <BpkParagraph>
        <strong>Responsive behaviour</strong>
      </BpkParagraph>,
      <BpkParagraph>
        The grid works in conjunction with the breakpoints listed above and can be used to position content differently
        based on these viewports by specifying different widths and offsets.
      </BpkParagraph>
    ],
    examples: [],
    readme: require('raw!bpk-component-grid/readme.md'),
    sassdocId: 'grids'
  }
]

const LayoutPage = () => <DocsPageBuilder
  title='Layout'
  components={components}
/>

export default LayoutPage
