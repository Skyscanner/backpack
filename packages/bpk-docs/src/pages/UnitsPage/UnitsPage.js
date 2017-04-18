import React from 'react';
import BpkParagraph from 'bpk-component-paragraph';
import BpkHeading from 'bpk-component-heading';
import DocsPageBuilder from './../../components/DocsPageBuilder';

const UnitsPage = () => <DocsPageBuilder
  title="Units"
  blurb={[
    <BpkParagraph>
      Rems are used as an alternative to pixels throughout Backpack’s component library. Using rems brings many
      benefits, in particular for accessibility.
    </BpkParagraph>,
    <BpkParagraph>
      By harnessing the power of rems, we are able to ensure that the entire UI scales beautifully in line with the
      user’s base font size.
    </BpkParagraph>,
  ]}
/>;

export default UnitsPage;
