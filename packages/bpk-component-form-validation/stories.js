import { DefaultExample, FormsExample } from './examples';

export default {
  title: 'bpk-component-form-validation',
};

export const Default = DefaultExample;
export const WithForms = FormsExample;

WithForms.story = {
  name: 'With forms',
};

export const VisualTest = FormsExample;

VisualTest.story = {
  name: 'Visual test',
};
