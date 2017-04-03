import React from 'react';
import BpkParagraph from 'bpk-component-paragraph';

import DocsPageBuilder from './../../components/DocsPageBuilder';

const StylePage = () => <DocsPageBuilder
  title="Style"
  blurb={[
    <BpkParagraph>Depending on the audience, there are a few ways to get started:</BpkParagraph>,
  ]}
/>;

export default StylePage;
