import {
  Inline,
  InlineAlternate,
  Block,
  BlockAlternate,
  MixedExample,
} from './examples';

export default {
  title: 'bpk-component-code',
};

export const _Inline = Inline;
export const _InlineAlternate = InlineAlternate;

_InlineAlternate.story = {
  name: 'Inline - Alternate',
};

export const _Block = Block;
export const _BlockAlternate = BlockAlternate;

_BlockAlternate.story = {
  name: 'Block - Alternate',
};

export const VisualTest = MixedExample;

VisualTest.story = {
  name: 'Visual test',
};
