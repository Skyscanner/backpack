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

import { ArgTypes, Title, Markdown } from '@storybook/addon-docs/blocks';

import { BACKGROUND_COLORS, BpkBox, BpkFlex, BpkProvider, BpkSpacing } from '..';
import BpkText, { TEXT_COLORS } from '../../bpk-component-text';

import LayoutWrapper from './BpkLayout.stories-wrapper';

import type { Meta } from '@storybook/react';

import STYLES from './BpkLayout.stories.module.scss';

const outline = STYLES['bpk-layout-examples__outline'];

const BpkFlexExample = () => (
  <LayoutWrapper>
    <BpkFlex gap={BpkSpacing.SM}>
      <BpkBox height="2rem" width="100%"><span className={outline} /></BpkBox>
      <BpkBox height="2rem" width="100%"><span className={outline} /></BpkBox>
      <BpkBox height="2rem" width="100%"><span className={outline} /></BpkBox>
    </BpkFlex>
  </LayoutWrapper>
);

const BpkFlexDirectionExample = () => (
  <LayoutWrapper>
    <BpkFlex gap={BpkSpacing.SM} direction="column">
      <BpkBox height="2rem" width="100%"><span className={outline} /></BpkBox>
      <BpkBox height="2rem" width="100%"><span className={outline} /></BpkBox>
      <BpkBox height="2rem" width="100%"><span className={outline} /></BpkBox>
    </BpkFlex>
  </LayoutWrapper>
);

const BpkFlexAlignExample = () => (
  <LayoutWrapper>
    <BpkFlex gap={BpkSpacing.SM} align="center" height="10rem">
      <BpkBox height="2rem" width="100%"><span className={outline} /></BpkBox>
      <BpkBox height="4rem" width="100%"><span className={outline} /></BpkBox>
      <BpkBox height="2rem" width="100%"><span className={outline} /></BpkBox>
    </BpkFlex>
  </LayoutWrapper>
);

const BpkFlexJustifyExample = () => (
  <LayoutWrapper>
    <BpkFlex gap={BpkSpacing.SM} marginBottom={BpkSpacing.Base} justify="flex-start">
      <BpkBox width="8.5rem"><span className={outline} /></BpkBox>
      <BpkBox width="8.5rem"><span className={outline}>flex-start</span></BpkBox>
      <BpkBox width="8.5rem"><span className={outline} /></BpkBox>
    </BpkFlex>
    <BpkFlex gap={BpkSpacing.SM} marginBottom={BpkSpacing.Base} justify="center">
      <BpkBox width="8.5rem"><span className={outline} /></BpkBox>
      <BpkBox width="8.5rem"><span className={outline}>center</span></BpkBox>
      <BpkBox width="8.5rem"><span className={outline} /></BpkBox>
    </BpkFlex>
    <BpkFlex gap={BpkSpacing.SM} marginBottom={BpkSpacing.Base} justify="flex-end">
      <BpkBox width="8.5rem"><span className={outline} /></BpkBox>
      <BpkBox width="8.5rem"><span className={outline}>flex-end</span></BpkBox>
      <BpkBox width="8.5rem"><span className={outline} /></BpkBox>
    </BpkFlex>
    <BpkFlex gap={BpkSpacing.SM} marginBottom={BpkSpacing.Base} justify="space-between">
      <BpkBox width="8.5rem"><span className={outline} /></BpkBox>
      <BpkBox width="8.5rem"><span className={outline}>space-between</span></BpkBox>
      <BpkBox width="8.5rem"><span className={outline} /></BpkBox>
    </BpkFlex>
  </LayoutWrapper>
);

const BpkFlexOrderExample = () => (
  <LayoutWrapper>
    <BpkFlex gap={BpkSpacing.SM}>
      <BpkBox order={3} width="100%"><span className={outline}>1</span></BpkBox>
      <BpkBox order={1} width="100%"><span className={outline}>2</span></BpkBox>
      <BpkBox order={2} width="100%"><span className={outline}>3</span></BpkBox>
    </BpkFlex>
  </LayoutWrapper>
);

const BpkFlexWrapExample = () => (
  <LayoutWrapper>
    <BpkFlex wrap="wrap" gap={BpkSpacing.SM} width="20rem">
      <BpkBox height="2rem" width="9rem"><span className={outline} /></BpkBox>
      <BpkBox height="2rem" width="9rem"><span className={outline} /></BpkBox>
      <BpkBox height="2rem" width="9rem"><span className={outline} /></BpkBox>
    </BpkFlex>
  </LayoutWrapper>
);

const BpkFlexColorExample = () => (
  <LayoutWrapper>
    <BpkFlex direction="column" gap={BpkSpacing.SM}>
      <BpkFlex padding={BpkSpacing.SM} color={TEXT_COLORS.textPrimary} backgroundColor={BACKGROUND_COLORS.surfaceDefault}>
        <BpkText>surfaceDefault + textPrimary</BpkText>
      </BpkFlex>
      <BpkFlex padding={BpkSpacing.SM} color={TEXT_COLORS.textOnDark} backgroundColor={BACKGROUND_COLORS.surfaceHero}>
        <BpkText>surfaceHero + textOnDark</BpkText>
      </BpkFlex>
      <BpkFlex padding={BpkSpacing.SM} color={TEXT_COLORS.textPrimary} backgroundColor={BACKGROUND_COLORS.canvas}>
        <BpkText>canvas + textPrimary</BpkText>
      </BpkFlex>
      <BpkFlex padding={BpkSpacing.SM} color={TEXT_COLORS.textPrimary} backgroundColor={BACKGROUND_COLORS.statusSuccessFill}>
        <BpkText>statusSuccessFill + textPrimary</BpkText>
      </BpkFlex>
    </BpkFlex>
  </LayoutWrapper>
);

const meta = {
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
} satisfies Meta;

export default meta;

export const Default = {
  render: () => <BpkFlexExample />,
};

export const Direction = {
  render: () => <BpkFlexDirectionExample />,
};

export const Align = {
  render: () => <BpkFlexAlignExample />,
};

export const Justify = {
  render: () => <BpkFlexJustifyExample />,
};

export const Order = {
  render: () => <BpkFlexOrderExample />,
};

export const Wrap = {
  render: () => <BpkFlexWrapExample />,
};

export const Color = {
  render: () => <BpkFlexColorExample />,
};
