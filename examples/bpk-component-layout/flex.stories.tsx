import { ArgTypes, Title, Markdown } from '@storybook/addon-docs/blocks';

import { BpkFlex, BpkProvider } from '../../packages/bpk-component-layout';

import {
  BpkFlexExample,
  BpkFlexDirectionExample,
  BpkFlexWrapExample,
  BpkFlexResponsiveExample,
  BpkFlexItemExample,
  BpkFlexInlineExample,
} from './flex-examples';

export default {
  title: 'bpk-component-layout/Flex',
  component: BpkFlex,
  decorators: [
    (Story: any) => (
      <BpkProvider>
        <Story />
      </BpkProvider>
    ),
  ],
  parameters: {
    docs: {
      page: () => (
        <>
          <Title />
          <ArgTypes exclude={['zoomEnabled']} />
          <Markdown>
            Notes: `BpkFlex` is a layout primitive for flexbox layouts. It
            supports responsive values keyed by Backpack breakpoints.
          </Markdown>
        </>
      ),
    },
  },
};

export const Default = BpkFlexExample;
export const Direction = BpkFlexDirectionExample;
export const Wrap = BpkFlexWrapExample;
export const Responsive = BpkFlexResponsiveExample;
export const ItemProps = BpkFlexItemExample;
export const Inline = BpkFlexInlineExample;
