import _ from 'lodash';
import React from 'react';
import BpkLink from 'bpk-component-link';
import icons from 'bpk-component-icon/all';
import BpkHeading from 'bpk-component-heading';
import BpkParagraph from 'bpk-component-paragraph';

import iconReadme from 'bpk-component-icon/readme.md';

import IconSearchApp from './../../components/IconSearchApp';
import DocsPageBuilder from './../../components/DocsPageBuilder';

const friendlyNameMap = {
  sm: 'Small',
  lg: 'Large',
};

const getFriendlyName = id => friendlyNameMap[id] || id;

const iconsFinal = _(icons)
  .flatMap((category, categoryId) =>
    Object.keys(category).map(name => ({
      name,
      categoryId,
      categoryName: getFriendlyName(categoryId),
      component: category[name],
    })),
  )
  .value();

const blurb = [
  <BpkParagraph>
    Backpack icons are crafted to display across web and native apps. Their clean, solid shapes effortlessly
    compliment the rest of Backpack.
  </BpkParagraph>,
  <BpkParagraph>
    Icons are provided in two sizes: small (18px) and large (24px). Both are pixel-snapped for clarity at the intended
    usage sizes.
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
