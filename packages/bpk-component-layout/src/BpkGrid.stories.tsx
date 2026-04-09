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

import { BACKGROUND_COLORS, BpkBox, BpkGrid, BpkGridItem, BpkProvider, BpkSpacing } from '..';
import BpkText, { TEXT_COLORS } from '../../bpk-component-text';

import LayoutWrapper from './BpkLayout.stories-wrapper';

import type { Meta } from '@storybook/react';

import STYLES from './BpkLayout.stories.module.scss';

const outline = STYLES['bpk-layout-examples__outline'];

const BpkGridExample = () => (
  <LayoutWrapper>
    <BpkGrid templateColumns="repeat(3, 1fr)" gap={BpkSpacing.MD}>
      <BpkBox height="6rem" width="100%"><span className={outline} /></BpkBox>
      <BpkBox height="6rem" width="100%"><span className={outline} /></BpkBox>
      <BpkBox height="6rem" width="100%"><span className={outline} /></BpkBox>
    </BpkGrid>
  </LayoutWrapper>
);

const BpkGridSpanExample = () => (
  <LayoutWrapper>
    <BpkGrid templateColumns="repeat(4, 1fr)" gap={BpkSpacing.MD}>
      <BpkGridItem colSpan={2}>
        <BpkBox height="6rem">
          <span className={outline} />
        </BpkBox>
      </BpkGridItem>
      <BpkGridItem colSpan={1}>
        <BpkBox height="6rem">
          <span className={outline} />
        </BpkBox>
      </BpkGridItem>
      <BpkGridItem colSpan={1}>
        <BpkBox height="6rem">
          <span className={outline} />
        </BpkBox>
      </BpkGridItem>
    </BpkGrid>
  </LayoutWrapper>
);

const BpkGridBentoBoxExample = () => (
  <LayoutWrapper>
    <BpkGrid
      templateRows="repeat(2, 1fr)"
      templateColumns="repeat(5, 1fr)"
      gap={BpkSpacing.MD}
    >
      <BpkGridItem rowSpan={2} colSpan={1}>
         <BpkBox width="100%" height="100%">
          <span className={outline}>rowSpan=2</span>
        </BpkBox>
      </BpkGridItem>
      <BpkGridItem colSpan={2}>
        <BpkBox width="100%" height="6rem">
          <span className={outline}>colSpan=2</span>
        </BpkBox>
      </BpkGridItem>
      <BpkGridItem colSpan={2}>
        <BpkBox width="100%" height="6rem">
          <span className={outline}>colSpan=2</span>
        </BpkBox>
      </BpkGridItem>

      <BpkGridItem colSpan={4}>
        <BpkBox width="100%" height="6rem">
          <span className={outline}>colSpan=4</span>
        </BpkBox>
      </BpkGridItem>
    </BpkGrid>
  </LayoutWrapper>
);

const BpkGridColorExample = () => (
  <LayoutWrapper>
    <BpkGrid templateColumns="repeat(3, 1fr)" gap={BpkSpacing.SM}>
      <BpkGridItem backgroundColor={BACKGROUND_COLORS.surfaceDefault} padding={BpkSpacing.SM}>
        <BpkText color={TEXT_COLORS.textPrimary}>surfaceDefault</BpkText>
      </BpkGridItem>
      <BpkGridItem backgroundColor={BACKGROUND_COLORS.canvasContrast} padding={BpkSpacing.SM}>
        <BpkText color={TEXT_COLORS.textPrimary}>canvasContrast</BpkText>
      </BpkGridItem>
      <BpkGridItem backgroundColor={BACKGROUND_COLORS.statusWarningFill} padding={BpkSpacing.SM}>
        <BpkText color={TEXT_COLORS.textPrimary}>statusWarningFill</BpkText>
      </BpkGridItem>
    </BpkGrid>
  </LayoutWrapper>
);

const meta = {
  title: 'bpk-component-layout/Grid',
  component: BpkGrid,
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
            Notes: `BpkGrid` and `BpkGridItem` are layout primitives for CSS
            grid layouts.
          </Markdown>
        </>
      ),
    },
  },
} satisfies Meta;

export default meta;

export const Default = {
  render: () => <BpkGridExample />,
};

export const Span = {
  render: () => <BpkGridSpanExample />,
};

export const BentoBox = {
  render: () => <BpkGridBentoBoxExample />,
};

export const Color = {
  render: () => <BpkGridColorExample />,
};
