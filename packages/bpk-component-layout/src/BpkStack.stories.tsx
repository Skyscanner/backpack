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

import { BACKGROUND_COLORS, BpkBox, BpkHStack, BpkProvider, BpkSpacing, BpkStack, BpkVStack } from '..';
import BpkText, { TEXT_COLORS } from '../../bpk-component-text';

import LayoutWrapper from './BpkLayout.stories-wrapper';

import type { Meta } from '@storybook/react';

import STYLES from './BpkLayout.stories.module.scss';

const outline = STYLES['bpk-layout-examples__outline'];

const BpkStackExample = () => (
  <LayoutWrapper>
    <BpkStack gap={BpkSpacing.SM}>
      <BpkBox height="2rem" width="100%"><span className={outline} /></BpkBox>
      <BpkBox height="2rem" width="100%"><span className={outline} /></BpkBox>
      <BpkBox height="2rem" width="100%"><span className={outline} /></BpkBox>
    </BpkStack>
  </LayoutWrapper>
);

const BpkStackDirectionExample = () => (
  <LayoutWrapper>
    <BpkStack gap={BpkSpacing.SM} direction="row">
      <BpkBox height="2rem" width="100%"><span className={outline} /></BpkBox>
      <BpkBox height="2rem" width="100%"><span className={outline} /></BpkBox>
      <BpkBox height="2rem" width="100%"><span className={outline} /></BpkBox>
    </BpkStack>
  </LayoutWrapper>
);

const BpkHStackExample = () => (
  <LayoutWrapper>
    <BpkHStack gap={BpkSpacing.SM}>
      <BpkBox height="2rem" width="100%"><span className={outline} /></BpkBox>
      <BpkBox height="2rem" width="100%"><span className={outline} /></BpkBox>
      <BpkBox height="2rem" width="100%"><span className={outline} /></BpkBox>
    </BpkHStack>
  </LayoutWrapper>
);

const BpkVStackExample = () => (
  <LayoutWrapper>
    <BpkVStack gap={BpkSpacing.SM}>
      <BpkBox height="2rem" width="100%"><span className={outline} /></BpkBox>
      <BpkBox height="2rem" width="100%"><span className={outline} /></BpkBox>
      <BpkBox height="2rem" width="100%"><span className={outline} /></BpkBox>
    </BpkVStack>
  </LayoutWrapper>
);

const BpkStackResponsiveExample = () => (
  <LayoutWrapper>
    <BpkStack
      gap={BpkSpacing.SM}
      direction={{
        'small-mobile': 'column',
        mobile: 'column',
        tablet: 'row',
        desktop: 'row',
      }}
    >
      <BpkBox height="2rem" width="100%"><span className={outline} /></BpkBox>
      <BpkBox height="2rem" width="100%"><span className={outline} /></BpkBox>
      <BpkBox height="2rem" width="100%"><span className={outline} /></BpkBox>
    </BpkStack>
  </LayoutWrapper>
);

const BpkStackColorExample = () => (
  <LayoutWrapper>
    <BpkStack gap={BpkSpacing.SM}>
      <BpkStack padding={BpkSpacing.SM} color={TEXT_COLORS.textPrimary} backgroundColor={BACKGROUND_COLORS.surfaceElevated}>
        <BpkText>surfaceElevated + textPrimary</BpkText>
      </BpkStack>
      <BpkStack padding={BpkSpacing.SM} color={TEXT_COLORS.textPrimary} backgroundColor={BACKGROUND_COLORS.statusDangerFill}>
        <BpkText>statusDangerFill + textPrimary</BpkText>
      </BpkStack>
    </BpkStack>
  </LayoutWrapper>
);

const meta = {
  title: 'bpk-component-layout/Stack',
  component: BpkStack,
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
            Notes: `BpkStack`, `BpkHStack` and `BpkVStack` are layout primitives
            for stacking items with tokenised gaps.
          </Markdown>
        </>
      ),
    },
  },
} satisfies Meta;

export default meta;

export const Default = {
  render: () => <BpkStackExample />,
};

export const Direction = {
  render: () => <BpkStackDirectionExample />,
};

export const HStack = {
  render: () => <BpkHStackExample />,
};

export const VStack = {
  render: () => <BpkVStackExample />,
};

export const Responsive = {
  render: () => <BpkStackResponsiveExample />,
};

export const Color = {
  render: () => <BpkStackColorExample />,
};
