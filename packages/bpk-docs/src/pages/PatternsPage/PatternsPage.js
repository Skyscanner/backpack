import React from 'react';
import BpkParagraph from 'bpk-component-paragraph';
import { BpkList, BpkListItem } from 'bpk-component-list';
import { BpkCodeBlock, BpkCode } from 'bpk-component-code';

import * as ROUTES from './../../constants/routes';
import DocsPageBuilder from './../../components/DocsPageBuilder';


const PatternsPage = () => <DocsPageBuilder
  title="Patterns"
  blurb={[
    <BpkParagraph>Depending on the audience, there are a few ways to get started:</BpkParagraph>,
  ]}
/>;

export default PatternsPage;
