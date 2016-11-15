import React from 'react';
import pickBy from 'lodash/pickBy';
import includes from 'lodash/includes';
import TOKENS from 'bpk-tokens/tokens/base.common';

import BpkParagraph from 'bpk-component-paragraph';
import BpkRouterLink from 'bpk-component-router-link';

import * as ROUTES from './../../constants/routes';
import DocsPageBuilder from './../../components/DocsPageBuilder';

const ShadowsPage = () => <DocsPageBuilder
  title="Shadows"
  blurb={[
    <BpkParagraph>
      Shadows are used to convey depth and order. Like <BpkRouterLink to={ROUTES.RADII}>radii</BpkRouterLink> these are
      most often used on cards and other surfaces.
    </BpkParagraph>,
  ]}
  components={[]}
  tokenMap={pickBy(TOKENS, (value, key) => includes(key, 'boxShadow'))}
  sassdocId="box-shadows"
/>;

export default ShadowsPage;

