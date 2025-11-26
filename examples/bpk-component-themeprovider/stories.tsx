// @ts-expect-error Untyped import. See `decisions/imports-ts-suppressions.md`.
import BpkTemeProvider from '../../packages/bpk-theming';
import { DefaultExample } from './examples';

export default {
  title: 'bpk-theming',
  component: BpkTemeProvider,
};

export const Default = DefaultExample;
