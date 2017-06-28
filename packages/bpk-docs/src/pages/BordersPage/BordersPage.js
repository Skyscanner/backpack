import React from 'react';
import kebabCase from 'lodash/kebabCase';
import BpkParagraph from 'bpk-component-paragraph';
import { borders, colorGray100 } from 'bpk-tokens/tokens/base.es6';
import { cssModules } from 'bpk-react-utils';

import STYLES from './borders-page.scss';
import DocsPageBuilder from './../../components/DocsPageBuilder';
import PresentationBlock from './../../components/PresentationBlock';

const getClassName = cssModules(STYLES);

const BordersPage = () => <DocsPageBuilder
  title="Borders"
  blurb={[
    <BpkParagraph>
      Borders help provide structure and division between elements. These should be used sparingly as a compliment to
      color, type and shape to avoid the UI becoming filled with boxes.
    </BpkParagraph>,
    <PresentationBlock className={getClassName('bpkdocs-borders-page__examples')}>
      {Object.keys(borders).map(tokenName => (
        <div
          key={tokenName}
          className={getClassName('bpkdocs-borders-page__item')}
        >
          <div
            className={getClassName('bpkdocs-borders-page__border-example')}
            style={{
              boxShadow: `0 0 0 ${borders[tokenName]} ${colorGray100} inset`,
            }}
          >
            {kebabCase(tokenName)}
          </div>
        </div>
      ))}
    </PresentationBlock>,
  ]}
  components={[]}
  tokenMap={borders}
  sassdocId="borders"
/>;

export default BordersPage;
