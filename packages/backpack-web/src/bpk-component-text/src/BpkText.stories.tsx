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

import { withDefaultProps, cssModules } from '../../bpk-react-utils';

import BpkText, { TEXT_ALIGN, TEXT_COLORS, TEXT_STYLES } from './BpkText';

import type { Meta } from '@storybook/react';

import STYLES from './BpkText.stories.module.scss';

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

    <div className={getClassName('bpk-stories-text_success')}>
      <BpkText tagName="p" color={TEXT_COLORS.textSecondary}>
        Text with color prop textSecondary with self className override
      </BpkText>
    </div>
  </div>
);

const StrikethroughExample = () => (
  <div>
    <BpkText tagName="p" strikethrough>
      Plain strikethrough text
    </BpkText>
    <BpkText tagName="p" color={TEXT_COLORS.textError} strikethrough>
      Strikethrough with textError color
    </BpkText>
    <BpkText tagName="p" color={TEXT_COLORS.textSecondary} strikethrough>
      Strikethrough with textSecondary color
    </BpkText>
  </div>
);

const UnderlineExample = () => (
  <div>
    <BpkText tagName="p" underline>
      Plain underlined text
    </BpkText>
    <BpkText tagName="p" color={TEXT_COLORS.textError} underline>
      Underlined text with textError color
    </BpkText>
    <BpkText tagName="p" color={TEXT_COLORS.textSecondary} underline>
      Underlined text with textSecondary color
    </BpkText>
  </div>
);

const truncationExampleText =
  'This introduction demonstrates internationalisation in a constrained container, while additional details explain how each truncation method handles wrapping across several lines and hides content beyond the configured limit.';

const unbrokenTruncationExampleText =
  'ThisIsAnUnbrokenEnglishStringDesignedToCompareHowTruncateAndLineClampHandleLongContentWithoutAnySpacesOrNaturalWrappingPoints';

const truncationExampleClassName = getClassName(
  'bpk-stories-text_truncation-example',
);

const flexContainerExampleClassName = getClassName(
  'bpk-stories-text_truncation-example',
  'bpk-stories-text_flex-container',
);

const comparisonSectionClassName = getClassName(
  'bpk-stories-text_comparison-section',
);

const FlexLayoutContent = () => (
  <>
    <BpkText tagName="span">Flexible child</BpkText>
    <BpkText tagName="span" textStyle={TEXT_STYLES.label2}>
      Fixed child
    </BpkText>
  </>
);

const LineClampExample = () => (
  <div className={getClassName('bpk-stories-text_line-clamp')}>
    <BpkText tagName="p" textStyle={TEXT_STYLES.label2}>
      Full text
    </BpkText>
    <BpkText tagName="p" className={truncationExampleClassName}>
      {truncationExampleText}
    </BpkText>
    <BpkText tagName="p" textStyle={TEXT_STYLES.label2}>
      truncate
    </BpkText>
    <BpkText tagName="p" className={truncationExampleClassName} truncate>
      {truncationExampleText}
    </BpkText>
    <BpkText tagName="p" textStyle={TEXT_STYLES.label2}>
      lineClamp=1
    </BpkText>
    <BpkText tagName="p" className={truncationExampleClassName} lineClamp={1}>
      {truncationExampleText}
    </BpkText>
    <BpkText tagName="p" textStyle={TEXT_STYLES.label2}>
      lineClamp=3
    </BpkText>
    <BpkText tagName="p" className={truncationExampleClassName} lineClamp={3}>
      {truncationExampleText}
    </BpkText>

    <section className={comparisonSectionClassName}>
      <BpkText tagName="h3" textStyle={TEXT_STYLES.heading5}>
        Flex container comparison
      </BpkText>
      <BpkText tagName="p" textStyle={TEXT_STYLES.label2}>
        truncate
      </BpkText>
      <BpkText tagName="p" className={flexContainerExampleClassName} truncate>
        <FlexLayoutContent />
      </BpkText>
      <BpkText tagName="p" textStyle={TEXT_STYLES.label2}>
        lineClamp=1
      </BpkText>
      <BpkText
        tagName="p"
        className={flexContainerExampleClassName}
        lineClamp={1}
      >
        <FlexLayoutContent />
      </BpkText>
    </section>

    <section className={comparisonSectionClassName}>
      <BpkText tagName="h3" textStyle={TEXT_STYLES.heading5}>
        Unbroken text comparison
      </BpkText>
      <BpkText tagName="p" textStyle={TEXT_STYLES.label2}>
        truncate
      </BpkText>
      <BpkText tagName="p" className={truncationExampleClassName} truncate>
        {unbrokenTruncationExampleText}
      </BpkText>
      <BpkText tagName="p" textStyle={TEXT_STYLES.label2}>
        lineClamp=1
      </BpkText>
      <BpkText tagName="p" className={truncationExampleClassName} lineClamp={1}>
        {unbrokenTruncationExampleText}
      </BpkText>
    </section>
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
    <StrikethroughExample />
    <UnderlineExample />
    <LineClampExample />
  </div>
);

const meta = {
  title: 'bpk-component-text',
  component: BpkText,
  tags: ['dark-mode-compatible'],
} satisfies Meta;

export default meta;

export const Default = {
  render: () => <DefaultExample />,
};

export const WithHeadingTags = {
  render: () => <WithHeadingTagsExample />,
};

export const ParagraphStory = {
  name: 'Paragraph',
  render: () => <ParagraphExample />,
};

export const UsingWithDefaultProps = {
  render: () => <WithDefaultPropsExample />,
};

export const HeroStyles = {
  render: () => <HeroStylesExample />,
};

export const HeadingStyles = {
  render: () => <HeadingStylesExample />,
};

export const BodyStyles = {
  render: () => <BodyStylesExample />,
};

export const LabelStyles = {
  render: () => <LabelStylesExample />,
};

export const LarkenStyles = {
  render: () => <LarkenStylesExample />,
};

const TextAlignExample = () => (
  <div>
    {Object.values(TEXT_ALIGN).map((align) => (
      <BpkText key={align} tagName="p" textAlign={align}>
        textAlign=&quot;{align}&quot; — The quick brown fox jumps over the lazy
        dog
      </BpkText>
    ))}
  </div>
);

export const TextAlignProp = {
  render: () => <TextAlignExample />,
};

export const ColorProp = {
  render: () => <ColorPropExample />,
};

export const Strikethrough = {
  render: () => <StrikethroughExample />,
};

export const Underline = {
  render: () => <UnderlineExample />,
};

export const LineClamp = {
  render: () => <LineClampExample />,
};

export const VisualTest = {
  render: () => <MixedExample />,
};

export const VisualTestWithZoom = {
  render: () => <MixedExample />,
  args: {
    zoomEnabled: true,
  },
};
