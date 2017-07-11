import React from 'react';
import BpkButton from 'bpk-component-button';
import { storiesOf } from '@storybook/react';
import { linkTo } from '@storybook/addon-links';
import { onePixelRem } from 'bpk-tokens/tokens/base.es6';
import { BpkTable, BpkTableHead, BpkTableBody, BpkTableRow, BpkTableCell, BpkTableHeadCell } from 'bpk-component-table';

import BpkMobileScrollContainer from './index';

storiesOf('bpk-component-mobile-scroll-container', module)
  .add('Default', () => (
    <BpkMobileScrollContainer>
      <BpkTable style={{ minWidth: `calc(500 * ${onePixelRem})` }}>
        <BpkTableHead>
          <BpkTableRow>
            <BpkTableHeadCell>Column 1</BpkTableHeadCell>
            <BpkTableHeadCell>Column 2</BpkTableHeadCell>
            <BpkTableHeadCell>Column 3</BpkTableHeadCell>
          </BpkTableRow>
        </BpkTableHead>
        <BpkTableBody>
          <BpkTableRow>
            <BpkTableCell>Entry 1</BpkTableCell>
            <BpkTableCell>Entry 2</BpkTableCell>
            <BpkTableCell>Entry 3</BpkTableCell>
          </BpkTableRow>
          <BpkTableRow>
            <BpkTableCell>Entry 4</BpkTableCell>
            <BpkTableCell>Entry 5</BpkTableCell>
            <BpkTableCell>Entry 6</BpkTableCell>
          </BpkTableRow>
          <BpkTableRow>
            <BpkTableCell>Entry 7</BpkTableCell>
            <BpkTableCell>Entry 8</BpkTableCell>
            <BpkTableCell>Entry 9</BpkTableCell>
          </BpkTableRow>
        </BpkTableBody>
      </BpkTable>
    </BpkMobileScrollContainer>
  ))
  .add('Horizontal nav', () => (
    <BpkButton onClick={linkTo('bpk-component-horizontal-nav', 'Example')}>
      See horizontal nav example
    </BpkButton>
  ))
  .add('Bar chart', () => (
    <BpkButton onClick={linkTo('bpk-component-barchart', 'Default')}>
      See horizontal nav example
    </BpkButton>
  ));
