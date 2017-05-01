import React from 'react';
import BpkParagraph from 'bpk-component-paragraph';
import DocsPageBuilder from './../../components/DocsPageBuilder';

const UnitsPage = () => <DocsPageBuilder
  title="Units"
  blurb={[
    <BpkParagraph>
      Rems are used as an alternative to pixels throughout Backpack’s component library. Rems are a way of setting
      font-sizes based on the font-size of the root HTML element. Using rems brings many
      benefits, in particular when thinking about accessibility since they allow you to quickly scale the entire
      UI beautifully by changing the root font-size.
    </BpkParagraph>,
  ]}
/>;

export default UnitsPage;
