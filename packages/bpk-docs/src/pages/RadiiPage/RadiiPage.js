import React from 'react';
import kebabCase from 'lodash/kebabCase';
import { radii } from 'bpk-tokens/tokens/base.es6';
import BpkParagraph from 'bpk-component-paragraph';
import { cssModules } from 'bpk-react-utils';

import STYLES from './radii-page.scss';
import DocsPageBuilder from './../../components/DocsPageBuilder';
import PresentationBlock from './../../components/PresentationBlock';

const getClassName = cssModules(STYLES);

const RadiiPage = () => <DocsPageBuilder
  title="Radii"
  blurb={[
    <BpkParagraph>
      The following radii are used to soften the edges of shapes. These are often used on cards and other surfaces.
    </BpkParagraph>,
    <PresentationBlock className={getClassName('bpkdocs-radii-page__examples')}>
      {Object.keys(radii).map(tokenName => (
        <div
          key={tokenName}
          className={getClassName('bpkdocs-radii-page__item')}
        >
          <div
            className={getClassName('bpkdocs-radii-page__radii-example')}
            style={{
              borderRadius: radii[tokenName],
            }}
          >
            {kebabCase(tokenName)}
          </div>
        </div>
      ))}
    </PresentationBlock>,
  ]}
  tokenMap={radii}
  sassdocId="radii"
/>;

export default RadiiPage;
