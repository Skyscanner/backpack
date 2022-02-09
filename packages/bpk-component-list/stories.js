import { UnorderedExample, OrderedExample, NestedExample } from './examples';

export default {
  title: 'bpk-component-list',
};

export const Unordered = UnorderedExample;
export const Ordered = OrderedExample;
export const Nested = NestedExample;
export const VisualTest = NestedExample;

VisualTest.story = {
  name: 'Visual test',
};
