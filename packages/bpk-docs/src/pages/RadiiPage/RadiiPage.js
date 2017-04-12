import React from 'react';
import pickBy from 'lodash/pickBy';
import includes from 'lodash/includes';
import TOKENS from 'bpk-tokens/tokens/base.common';
import BpkParagraph from 'bpk-component-paragraph';
import BpkHeading from 'bpk-component-heading';
import './radii-page.scss';
import DocsPageBuilder from './../../components/DocsPageBuilder';

import PresentationBlock from './../../components/PresentationBlock';

const RadiiPage = () => <DocsPageBuilder
  title="Radii"
  blurb={[
    <BpkParagraph>
      The following radii are used to soften the edges of shapes. These are often used on cards and other surfaces.
    </BpkParagraph>,
    <PresentationBlock className="bpkdocs-radii-page__examples">
      <div className="bpkdocs-radii-page__item">
        <BpkHeading level="h4">Extra small</BpkHeading>
        <div
          className="bpkdocs-radii-page__radii-example bpkdocs-radii-page__radii-example__extra-small"
        />
      </div>
      <div className="bpkdocs-radii-page__item">
        <BpkHeading level="h4">Small</BpkHeading>
        <div className="bpkdocs-radii-page__radii-example bpkdocs-radii-page__radii-example__small" />
      </div>
      <div className="bpkdocs-radii-page__item">
        <BpkHeading level="h4">Pill</BpkHeading>
        <div className="bpkdocs-radii-page__radii-example bpkdocs-radii-page__radii-example__pill" />
      </div>
    </PresentationBlock>,
  ]}
  tokenMap={pickBy(TOKENS, (value, key) => includes(key, 'borderRadius'))}
  sassdocId="radii"
/>;

export default RadiiPage;
