/*
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2016 Skyscanner Ltd
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import BpkText, { TEXT_COLORS, TEXT_STYLES , withDefaultProps , cssModules } from '../index';


import STYLES from './examples.module.scss';

const getClassName = cssModules(STYLES);

const Paragraph = withDefaultProps(BpkText, {
  textStyle: TEXT_STYLES.bodyLongform,
  tagName: 'p',
});

const DefaultExample = () => (
  <BpkText>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque
    imperdiet lobortis tellus, non rhoncus erat tincidunt id. Pellentesque
    consectetur, dolor nec vulputate vehicula, ex metus mattis ante, non dictum
    mi ante eu arcu.
  </BpkText>
);

const WithHeadingTagsExample = () => (
  <div>
    <BpkText textStyle={TEXT_STYLES.hero4} tagName="h4">
      The quick brown fox jumps over the lazy dog
    </BpkText>
    <BpkText textStyle={TEXT_STYLES.hero5} tagName="h5">
      The quick brown fox jumps over the lazy dog
    </BpkText>
  </div>
);

const ParagraphExample = () => (
  <BpkText textStyle={TEXT_STYLES.bodyDefault} tagName="p">
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque
    imperdiet lobortis tellus, non rhoncus erat tincidunt id. Pellentesque
    consectetur, dolor nec vulputate vehicula, ex metus mattis ante, non dictum
    mi ante eu arcu.
  </BpkText>
);

const WithDefaultPropsExample = () => (
  <div>
    <Paragraph>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque
      imperdiet lobortis tellus, non rhoncus erat tincidunt id. Pellentesque
      consectetur, dolor nec vulputate vehicula, ex metus mattis ante, non
      dictum mi ante eu arcu.
    </Paragraph>
    <Paragraph>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque
      imperdiet lobortis tellus, non rhoncus erat tincidunt id. Pellentesque
      consectetur, dolor nec vulputate vehicula, ex metus mattis ante, non
      dictum mi ante eu arcu.
    </Paragraph>
  </div>
);

const HeroStylesExample = () => (
  <div>
    <BpkText textStyle={TEXT_STYLES.hero1} tagName="h1">
      Hero 1
    </BpkText>
    <BpkText textStyle={TEXT_STYLES.hero2} tagName="h2">
      Hero 2
    </BpkText>
    <BpkText textStyle={TEXT_STYLES.hero3} tagName="h3">
      Hero 3
    </BpkText>
    <BpkText textStyle={TEXT_STYLES.hero4} tagName="h4">
      Hero 4
    </BpkText>
    <BpkText textStyle={TEXT_STYLES.hero5} tagName="h5">
      Hero 5
    </BpkText>
    <BpkText textStyle={TEXT_STYLES.hero6} tagName="h6">
      Hero 6
    </BpkText>
  </div>
);

const HeadingStylesExample = () => (
  <div>
    <BpkText textStyle={TEXT_STYLES.heading1} tagName="h1">
      Heading 1
    </BpkText>
    <BpkText textStyle={TEXT_STYLES.heading2} tagName="h2">
      Heading 2
    </BpkText>
    <BpkText textStyle={TEXT_STYLES.heading3} tagName="h3">
      Heading 3
    </BpkText>
    <BpkText textStyle={TEXT_STYLES.heading4} tagName="h4">
      Heading 4
    </BpkText>
    <BpkText textStyle={TEXT_STYLES.heading5} tagName="h5">
      Heading 5
    </BpkText>
  </div>
);

const BodyStylesExample = () => (
  <div>
    <BpkText textStyle={TEXT_STYLES.subheading} tagName="p">
      Subheading
    </BpkText>
    <BpkText textStyle={TEXT_STYLES.bodyLongform} tagName="p">
      Body Longform
    </BpkText>
    <BpkText textStyle={TEXT_STYLES.bodyDefault} tagName="p">
      Body Default
    </BpkText>
    <BpkText textStyle={TEXT_STYLES.footnote} tagName="p">
      Footnote
    </BpkText>
    <BpkText textStyle={TEXT_STYLES.caption} tagName="p">
      Caption
    </BpkText>
  </div>
);

const LabelStylesExample = () => (
  <div>
    <BpkText textStyle={TEXT_STYLES.label1} tagName="p">
      Label 1
    </BpkText>
    <BpkText textStyle={TEXT_STYLES.label2} tagName="p">
      Label 2
    </BpkText>
    <BpkText textStyle={TEXT_STYLES.label3} tagName="p">
      Label 3
    </BpkText>
  </div>
);

const LarkenStylesExample = () => (
  <div>
    <BpkText textStyle={TEXT_STYLES.editorial1} tagName="p">
      Editorial 1
    </BpkText>
    <BpkText textStyle={TEXT_STYLES.editorial2} tagName="p">
      Editorial 2
    </BpkText>
    <BpkText textStyle={TEXT_STYLES.editorial3} tagName="p">
      Editorial 3
    </BpkText>
  </div>
);

const ColorPropExample = () => (
  <div>
    <BpkText tagName="p" color={TEXT_COLORS.textSecondary}>
      Text with color prop textSecondary
    </BpkText>

    <div className={getClassName('bpk-stories-text_success')}>
      <BpkText tagName="p" color={TEXT_COLORS.textSecondary}>
          Text with color prop textSecondary with parent className override
      </BpkText>
    </div>

    <div className={getClassName('bpk-stories-text_success')}>
       <BpkText tagName="p">
        Text without color prop with parent color override
      </BpkText>
    </div>

    <BpkText tagName="p" className={getClassName('bpk-stories-text_success')} color={TEXT_COLORS.textSecondary} >
      Text with color prop textSecondary with self className override
    </BpkText>

  </div>
);

const MixedExample = () => (
  <div>
    <HeroStylesExample />
    <HeadingStylesExample />
    <BodyStylesExample />
    <LabelStylesExample />
    <LarkenStylesExample />
    <ColorPropExample />
  </div>
);

export {
  DefaultExample,
  WithHeadingTagsExample,
  ParagraphExample,
  WithDefaultPropsExample,
  HeadingStylesExample,
  HeroStylesExample,
  BodyStylesExample,
  LabelStylesExample,
  LarkenStylesExample,
  ColorPropExample,
  MixedExample,
};
