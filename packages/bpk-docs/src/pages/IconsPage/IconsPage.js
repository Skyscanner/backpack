import _ from 'lodash';
import React from 'react';
import BpkLink from 'bpk-component-link';
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
    category: _.capitalize(name.split('--')[0]),
    component: category[name],
  })))
  .value();

const blurb = [
  <BpkParagraph>
    Backpack icons are crafted to display across web and native apps. Their clean, solid shapes effortlessly
    compliment the rest of Backpack.
  </BpkParagraph>,
  <BpkParagraph>
    Using a 24px grid, the icons are balanced against each other and the type ramp. Utility icons
    in particular will align with the x-height of the type to provide clear lines.
  </BpkParagraph>,
  <BpkParagraph>
    The <BpkLink href="#readme">readme</BpkLink> for the component is available below the search tool.
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
