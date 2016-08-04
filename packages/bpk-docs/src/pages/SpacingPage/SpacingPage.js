import React from 'react'
import keys from 'lodash/keys'
import Helmet from 'react-helmet'
import pickBy from 'lodash/pickBy'
import includes from 'lodash/includes'
import TOKENS from 'bpk-tokens/tokens/base.common'

import BpkHeading from 'bpk-component-heading'
import BpkParagraph from 'bpk-component-paragraph'
import { BpkTable, BpkTableHead, BpkTableBody, BpkTableRow, BpkTableHeadCell, BpkTableCell } from 'bpk-component-table'

import { formatTokenName, formatTokenValue } from './../../helpers/tokens-helper'

const spacings = pickBy(TOKENS, (value, key) => includes(key, 'spacing'))

const UnitsPage = () => (
  <section>
    <Helmet title='Units' />
    <BpkHeading level='h1'>Spacing</BpkHeading>
    <BpkParagraph>
      All spacing is measured in ‘Rems’. Since these are relative to the value inherited from the browser font-size, all
      other units will scale accordingly should a user change this.
    </BpkParagraph>
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
          <BpkTableRow key={formatTokenName(spacing)}>
            <BpkTableCell>{formatTokenName(spacing)}</BpkTableCell>
            <BpkTableCell>{formatTokenValue(spacings[ spacing ])}</BpkTableCell>
          </BpkTableRow>
        ))}
      </BpkTableBody>
    </BpkTable>
  </section>
)

export default UnitsPage
