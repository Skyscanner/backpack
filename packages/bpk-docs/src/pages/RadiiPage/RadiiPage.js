import React from 'react';
import pickBy from 'lodash/pickBy';
import includes from 'lodash/includes';
import kebabCase from 'lodash/kebabCase';
import TOKENS from 'bpk-tokens/tokens/base.common';
import BpkParagraph from 'bpk-component-paragraph';

import './radii-page.scss';
import DocsPageBuilder from './../../components/DocsPageBuilder';
import PresentationBlock from './../../components/PresentationBlock';

const tokenMap = pickBy(TOKENS, (value, key) => includes(key, 'borderRadius'));

const RadiiPage = () => <DocsPageBuilder
  title="Radii"
  blurb={[
    <BpkParagraph>
      The following radii are used to soften the edges of shapes. These are often used on cards and other surfaces.
    </BpkParagraph>,
    <PresentationBlock className="bpkdocs-radii-page__examples">
      {Object.keys(tokenMap).map(tokenName => (
        <div
          key={tokenName}
          className="bpkdocs-radii-page__item"
        >
          <div
            className="bpkdocs-radii-page__radii-example"
            style={{
              borderRadius: tokenMap[tokenName],
            }}
          >
            {kebabCase(tokenName)}
          </div>
        </div>
      ))}
    </PresentationBlock>,
  ]}
  tokenMap={tokenMap}
  sassdocId="radii"
/>;

export default RadiiPage;
