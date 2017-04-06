import _ from 'lodash';
import React from 'react';
import icons from 'bpk-component-icon/all';
import BpkHeading from 'bpk-component-heading';
import BpkParagraph from 'bpk-component-paragraph';

import iconReadme from 'bpk-component-icon/readme.md';

import './icons-page.scss';
import IconSearchApp from './../../components/IconSearchApp';
import DocsPageBuilder from './../../components/DocsPageBuilder';

const { sm, lg, ...iconsRest } = icons;

const iconsFinal = _(iconsRest)
  .values()
  .flatMap(category => Object.keys(category).map(name => ({
    name,
    category: name.split('--')[0],
    component: category[name],
  })))
  .value();

const blurb = [
  <BpkParagraph>
    TODO
  </BpkParagraph>,
  <BpkHeading level="h2">Find the right icon</BpkHeading>,
  <IconSearchApp icons={iconsFinal} />,
];

const IconsPage = () => <DocsPageBuilder
  title="Icons"
  blurb={blurb}
  components={[]}
  showMenu={false}
  readme={iconReadme}
  sassdocId="svgs-mixin-bpk-icon"
/>;

export default IconsPage;
