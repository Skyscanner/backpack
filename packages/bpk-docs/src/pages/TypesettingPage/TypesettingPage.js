import React from 'react';
import pickBy from 'lodash/pickBy';
import includes from 'lodash/includes';
import TOKENS from 'bpk-tokens/tokens/base.common';

import BpkParagraph from 'bpk-component-paragraph';

import DocsPageBuilder from './../../components/DocsPageBuilder';

const components = [
  {
    id: 'font-families',
    title: 'Font families',
    blurb: [
      <BpkParagraph>
        Rather than specify a single font across all Skyscanner products, we rely on the native font used on each
        device. The benefits of this are two-fold, firstly we can lean on the hard-work and expertise that each OS
        manufacturer has expended in producing a font that works best on their respective platforms. Second, we avoid
        any drawbacks of serving a custom web-font; for example extra load time, and a so-called FOUT (flash of unstyled
        text). This will improve the user experience of our product on all devices.
      </BpkParagraph>,
    ],
    examples: [],
    tokenMap: pickBy(TOKENS, (value, key) => includes(key, 'fontFamilyBase')),
  },
  {
    id: 'font-sizes',
    title: 'Font sizes',
    blurb: [
      <BpkParagraph>
        Backpack uses a set of 5 font-sizes which when used in conjunction with their retrospective line heights,
        produces text styles which align to the baseline grid. Similar to spacing, these are specified in rems.
      </BpkParagraph>,
    ],
    examples: [],
    tokenMap: pickBy(TOKENS, (value, key) => includes(key, 'fontSize')),
  },
  {
    id: 'line-heights',
    title: 'Line heights',
    blurb: [
      <BpkParagraph>
        The following line-heights should be paired with the font-sizes above to ensure text aligns with the baseline
        grid.
      </BpkParagraph>,
    ],
    examples: [],
    tokenMap: pickBy(TOKENS, (value, key) => includes(key, 'lineHeight')),
  },
];

const TypesettingPage = () => <DocsPageBuilder
  title="Typesetting"
  blurb="Here you can find information on how the Backpack type is set including fonts, sizes and line heights."
  components={components}
  sassdocId="typesettings"
/>;

export default TypesettingPage;
