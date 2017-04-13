import React from 'react';
import pickBy from 'lodash/pickBy';
import includes from 'lodash/includes';
import kebabCase from 'lodash/kebabCase';
import TOKENS from 'bpk-tokens/tokens/base.common';

import BpkParagraph from 'bpk-component-paragraph';
import BpkRouterLink from 'bpk-component-router-link';
import './shadow-page.scss';

import * as ROUTES from './../../constants/routes';
import DocsPageBuilder from './../../components/DocsPageBuilder';
import PresentationBlock from './../../components/PresentationBlock';

const tokenMap = pickBy(TOKENS, (value, key) => includes(key, 'boxShadow'));

const ShadowsPage = () => <DocsPageBuilder
  title="Shadows"
  blurb={[
    <BpkParagraph>
      Shadows are used to convey depth and order. Like <BpkRouterLink to={ROUTES.RADII}>radii</BpkRouterLink> these are
      most often used on cards and other surfaces.
    </BpkParagraph>,
    <PresentationBlock className="bpkdocs-shadow-page__examples">
      {Object.keys(tokenMap).map(tokenName => (
        <div
          key={tokenName}
          className="bpkdocs-shadow-page__item"
        >
          <div
            className="bpkdocs-shadow-page__shadow-example"
            style={{
              boxShadow: tokenMap[tokenName],
            }}
          >
            {kebabCase(tokenName)}
          </div>
        </div>
      ))}
    </PresentationBlock>,
  ]}
  components={[]}
  tokenMap={pickBy(TOKENS, (value, key) => includes(key, 'boxShadow'))}
  sassdocId="box-shadows"
/>;

export default ShadowsPage;
