import React from 'react';
import BpkLink from 'bpk-component-link';
import BpkParagraph from 'bpk-component-paragraph';
import BpkBlockquote from 'bpk-component-blockquote';
import BpkRouterLink from 'bpk-component-router-link';
import { BpkList, BpkListItem } from 'bpk-component-list';
import { BpkCodeBlock, BpkCode } from 'bpk-component-code';

import * as ROUTES from './../../constants/routes';
import DocsPageBuilder from './../../components/DocsPageBuilder';

const StylePage = () => <DocsPageBuilder
  title="Style"
  blurb={[
    <BpkParagraph>Depending on the audience, there are a few ways to get started:</BpkParagraph>,
  ]}
/>;

export default StylePage;
