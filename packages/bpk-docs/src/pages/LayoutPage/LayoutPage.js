import React from 'react'
import keys from 'lodash/keys'
import pickBy from 'lodash/pickBy'
import includes from 'lodash/includes'
import TOKENS from 'bpk-tokens/tokens/base.common'

import BpkRouterLink from 'bpk-component-router-link'
import BpkParagraph from 'bpk-component-paragraph'
import { BpkTable, BpkTableHead, BpkTableBody, BpkTableRow, BpkTableHeadCell, BpkTableCell } from 'bpk-component-table'

import './layout-page.scss'
import * as routes from './../../constants/routes'
import ComponentPageBuilder from './../../components/ComponentPageBuilder'
import { formatTokenName, formatTokenValue } from './../../helpers/tokens-helper'

const breakpoints = pickBy(TOKENS, (value, key) => includes(key, 'breakpoint') && !includes(key, 'breakpointQuery'))

const gridPreviewSvg = { __html: `${require('raw!./../../static/backpack-grid-preview.svg')}` }

const components = [
  {
    id: 'baseline-grid',
    title: 'Baseline grid (aka vertical rhythm)',
    blurb: [
      <BpkParagraph>
        We use a baseline grid to provide consistent vertical rhythm to our designs. A baseline grid is an underlying
        structure that helps guide the vertical spacing of a design. Just like using columns for laying out elements
        horizontally, the baseline grid is a way to help you make decisions and build consistency into a layout.
      </BpkParagraph>,
      <BpkParagraph>
        Our baseline grid is set to .375rem (6px) increments, with an optimised font-size, line-height and spacing that
        align to the grid.
      </BpkParagraph>,
      <BpkParagraph>You can preview this by switching on the grid at the bottom of the page.</BpkParagraph>
    ],
    examples: []
  },
  {
    id: 'breakpoints',
    title: 'Breakpoints',
    blurb: [
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
    ],
    examples: []
  },
  {
    id: 'horizontal-grid',
    title: 'Horizontal grid',
    blurb: [
      <span className='bpkdocs-layout-page__grid-preview-svg' dangerouslySetInnerHTML={gridPreviewSvg}></span>,
      <BpkParagraph>
        Backpack uses a 12 column responsive grid to compose and layout Organisms.
      </BpkParagraph>,
      <BpkParagraph>
        The grid works in conjunction with the breakpoints listed above and can be used to position content differently
        based on these viewports by providing widths and offsets.
      </BpkParagraph>,
      <BpkParagraph>
        <BpkRouterLink to={routes.GRID_DEMO}>View demo.</BpkRouterLink>
      </BpkParagraph>
    ],
    examples: [],
    readme: require('raw!bpk-component-grid/readme.md')
  }
]

const LayoutPage = () => <ComponentPageBuilder
  title='Layout'
  showExamplesHeading={false}
  components={components}
/>

export default LayoutPage
