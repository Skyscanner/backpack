import {
  DefaultExample,
  WithHeadingTagsExample,
  ParagraphExample,
  WithDefaultProps,
  HeadingStylesExample,
  MixedExample,
} from './examples';

export default {
  title: 'bpk-component-text',
};

export const Default = DefaultExample;
export const WithHeadingTags = WithHeadingTagsExample;

WithHeadingTags.story = {
  name: 'With heading tags',
};

export const Paragraph = ParagraphExample;
export const UsingWithDefaultProps = WithDefaultProps;

UsingWithDefaultProps.story = {
  name: 'using withDefaultProps',
};

export const HeadingStyles = HeadingStylesExample;

HeadingStyles.story = {
  name: 'Heading styles',
};

export const VisualTest = MixedExample;

VisualTest.story = {
  name: 'Visual test',
};
