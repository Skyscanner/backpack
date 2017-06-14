import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import {
  BpkTable,
  BpkTableBody,
  BpkTableRow,
  BpkTableCell,
  BpkTableHead,
  BpkTableHeadCell,
} from 'bpk-component-table';

import BpkStarRating, { BpkStar, STAR_TYPES } from './index';
import BpkInteractiveStarRating from './src/BpkInteractiveStarRating';

storiesOf('bpk-component-star-rating', module)
  .add('BpkStar examples', () => (
    <BpkTable>
      <BpkTableHead>
        <BpkTableRow>
          <BpkTableHeadCell>State</BpkTableHeadCell>
          <BpkTableHeadCell>Small</BpkTableHeadCell>
          <BpkTableHeadCell>Large</BpkTableHeadCell>
        </BpkTableRow>
      </BpkTableHead>
      <BpkTableBody>
        <BpkTableRow>
          <BpkTableCell>Empty</BpkTableCell>
          <BpkTableCell><BpkStar type={STAR_TYPES.EMPTY} /></BpkTableCell>
          <BpkTableCell><BpkStar type={STAR_TYPES.EMPTY} large /></BpkTableCell>
        </BpkTableRow>
        <BpkTableRow>
          <BpkTableCell>Half</BpkTableCell>
          <BpkTableCell><BpkStar type={STAR_TYPES.HALF} /></BpkTableCell>
          <BpkTableCell><BpkStar type={STAR_TYPES.HALF} large /></BpkTableCell>
        </BpkTableRow>
        <BpkTableRow>
          <BpkTableCell>Full</BpkTableCell>
          <BpkTableCell><BpkStar type={STAR_TYPES.FULL} /></BpkTableCell>
          <BpkTableCell><BpkStar type={STAR_TYPES.FULL} large /></BpkTableCell>
        </BpkTableRow>
        <BpkTableRow>
          <BpkTableCell>Interactive</BpkTableCell>
          <BpkTableCell>
            <BpkStar type={STAR_TYPES.INTERACTIVE} />
          </BpkTableCell>
          <BpkTableCell>
            <BpkStar type={STAR_TYPES.INTERACTIVE} large />
          </BpkTableCell>
        </BpkTableRow>
      </BpkTableBody>
    </BpkTable>
  ))
  .add('Full Stars', () => (
    <div>
      <BpkStarRating rating={5} />
      <br />
      <BpkStarRating rating={5} large />
    </div>
  ))
  .add('Empty Stars', () => (
    <div>
      <BpkStarRating rating={0} />
      <br />
      <BpkStarRating rating={0} large />
    </div>
  ))
  .add('3 Stars Rating', () => (
    <div>
      <BpkStarRating rating={3} />
      <br />
      <BpkStarRating rating={3} large />
    </div>
  ))
  .add('3 1/2 Stars Rating', () => (
    <div>
      <BpkStarRating rating={3.5} />
      <br />
      <BpkStarRating rating={3.5} large />
    </div>
  ))
  .add('3.3 Stars', () => (
    <div>
      <BpkStarRating rating={3.3} />
      <br />
      <BpkStarRating rating={3.3} large />
    </div>
  ))
  .add('3.7 Stars', () => (
    <div>
      <BpkStarRating rating={3.7} />
      <br />
      <BpkStarRating rating={3.7} large />
    </div>
  ))
  .add('BpkInteractiveStarRating', () => (
    <div>
      <BpkInteractiveStarRating onRatingSelect={action('rating selected')} />
      <br />
      <BpkInteractiveStarRating large onRatingSelect={action('large rating selected')} />
    </div>
  ));
