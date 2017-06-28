import React from 'react';
import kebabCase from 'lodash/kebabCase';
import { boxShadows } from 'bpk-tokens/tokens/base.es6';
import { cssModules } from 'bpk-react-utils';

import BpkParagraph from 'bpk-component-paragraph';
import BpkRouterLink from 'bpk-component-router-link';
import STYLES from './shadow-page.scss';

import * as ROUTES from './../../constants/routes';
import DocsPageBuilder from './../../components/DocsPageBuilder';
import PresentationBlock from './../../components/PresentationBlock';

const getClassName = cssModules(STYLES);

const ShadowsPage = () => <DocsPageBuilder
  title="Shadows"
  blurb={[
    <BpkParagraph>
      Shadows are used to convey depth and order. Like <BpkRouterLink to={ROUTES.RADII}>radii</BpkRouterLink> these are
      most often used on cards and other surfaces.
    </BpkParagraph>,
    <PresentationBlock className={getClassName('bpkdocs-shadow-page__examples')}>
      {Object.keys(boxShadows).map(tokenName => (
        <div
          key={tokenName}
          className={getClassName('bpkdocs-shadow-page__item')}
        >
          <div
            className={getClassName('bpkdocs-shadow-page__shadow-example')}
            style={{
              boxShadow: boxShadows[tokenName],
            }}
          >
            {kebabCase(tokenName)}
          </div>
        </div>
      ))}
    </PresentationBlock>,
  ]}
  components={[]}
  tokenMap={boxShadows}
  sassdocId="box-shadows"
/>;

export default ShadowsPage;
