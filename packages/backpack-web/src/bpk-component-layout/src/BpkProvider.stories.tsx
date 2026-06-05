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

import { useRef, useState } from 'react';

import {
  BpkBox,
  BpkFlex,
  BpkGrid,
  BpkGridItem,
  BpkHStack,
  BpkProvider,
  BpkSpacing,
  BpkStack,
  BpkVessel,
  BpkVStack,
} from '..';
import BpkButton from '../../bpk-component-button';
import BpkText, {
  TEXT_STYLES,
} from '../../bpk-component-text';

import LayoutWrapper from './BpkLayout.stories-wrapper';

import type { Meta } from '@storybook/react';

import STYLES from './BpkLayout.stories.module.scss';

const outline = STYLES['bpk-layout-examples__outline'];

// Box examples
const SpacingExample = () => (
  <LayoutWrapper>
    <BpkBox padding={BpkSpacing.MD} margin={BpkSpacing.MD}>
      Default box with padding and margin using Backpack spacing tokens.
    </BpkBox>
  </LayoutWrapper>
);

const RtlSpacingExample = () => (
  <LayoutWrapper>
    <div dir="rtl">
      <BpkBox
        paddingInline={BpkSpacing.MD}
        marginInline={BpkSpacing.MD}
        paddingTop={BpkSpacing.MD}
        paddingBottom={BpkSpacing.Base}
      >
        Box using marginInline &amp; paddingInline in RTL context.
      </BpkBox>
    </div>
  </LayoutWrapper>
);

const SizeExample = () => (
  <LayoutWrapper>
    <BpkBox width="50%" minHeight="6rem">
      Box with 50% width and 6rem minHeight.
    </BpkBox>
  </LayoutWrapper>
);

const ResponsiveExample = () => (
  <LayoutWrapper>
    <BpkBox
      display="flex"
      padding={{
        base: BpkSpacing.SM,
        mobile: BpkSpacing.Base,
        tablet: BpkSpacing.MD,
        desktop: BpkSpacing.LG,
      }}
      gap={{
        base: BpkSpacing.SM,
        mobile: BpkSpacing.Base,
        tablet: BpkSpacing.MD,
        desktop: BpkSpacing.LG,
      }}
    >
      <BpkBox>Responsive item 1</BpkBox>
      <BpkBox>Responsive item 2</BpkBox>
    </BpkBox>
  </LayoutWrapper>
);

const PositionExample = () => (
  <LayoutWrapper>
    <BpkBox padding={BpkSpacing.MD}>
      <BpkBox position="relative" width="10rem" minHeight="16rem">
        Relative box (10rem x 16rem)
        <BpkBox position="absolute" top="12rem" left="6rem">
          Positioned child (top/left from 12rem, 6rem)
        </BpkBox>
      </BpkBox>
    </BpkBox>
  </LayoutWrapper>
);

const InteractiveExample = () => {
  const [count, setCount] = useState(0);
  const increment = () => setCount((c) => c + 1);
  return (
    <LayoutWrapper>
      <BpkBox
        padding={BpkSpacing.MD}
        role="button"
        tabIndex={0}
        onClick={increment}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') increment();
        }}
      >
        <BpkText>
          Clicked {count} times (role=&quot;button&quot;, tabIndex=0)
        </BpkText>
      </BpkBox>
    </LayoutWrapper>
  );
};

const TextStyleExample = () => (
  <LayoutWrapper>
    <BpkBox padding={BpkSpacing.SM} textStyle={TEXT_STYLES.heading3}>
      Heading 3 text style on BpkBox
    </BpkBox>
    <BpkBox padding={BpkSpacing.SM} textStyle={TEXT_STYLES.bodyDefault}>
      Body default text style on BpkBox
    </BpkBox>
    <BpkBox padding={BpkSpacing.SM} textStyle={TEXT_STYLES.caption}>
      Caption text style on BpkBox
    </BpkBox>
  </LayoutWrapper>
);

const ResponsiveTextStyleExample = () => (
  <LayoutWrapper>
    <BpkBox
      padding={BpkSpacing.MD}
      textStyle={{
        base: TEXT_STYLES.caption,
        mobile: TEXT_STYLES.bodyDefault,
        tablet: TEXT_STYLES.heading5,
        desktop: TEXT_STYLES.heading3,
      }}
    >
      Text style changes from caption → bodyDefault → heading5 → heading3 across
      breakpoints.
    </BpkBox>
  </LayoutWrapper>
);

const RefExample = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [info, setInfo] = useState<string | null>(null);

  const handleRead = () => {
    if (ref.current) {
      const { offsetHeight, offsetWidth, tagName } = ref.current;
      setInfo(
        `tagName: ${tagName}, width: ${offsetWidth}px, height: ${offsetHeight}px`,
      );
    }
  };

  return (
    <LayoutWrapper>
      <BpkBox ref={ref} padding={BpkSpacing.MD}>
        <BpkText>BpkBox with forwarded ref</BpkText>
      </BpkBox>
      <BpkBox padding={BpkSpacing.SM}>
        <BpkButton onClick={handleRead}>Read ref.current</BpkButton>
        {info && <BpkText textStyle={TEXT_STYLES.footnote}>{info}</BpkText>}
      </BpkBox>
    </LayoutWrapper>
  );
};

// Flex examples
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

// Grid examples
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

// Stack examples
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

// Vessel examples
const BpkVesselExample = () => (
  <BpkVessel
    style={{
      padding: '16px',
      transition: 'opacity 0.3s',
    }}
    data-testid="vessel-basic"
  >
    Content
  </BpkVessel>
);

const VisualTest = () => (
  <>
    {/* Box examples */}
    <SpacingExample />
    <RtlSpacingExample />
    <SizeExample />
    <ResponsiveExample />
    <BpkProvider><BpkBox minHeight="28rem"><PositionExample /></BpkBox></BpkProvider>
    <InteractiveExample />
    <TextStyleExample />
    <ResponsiveTextStyleExample />
    <RefExample />

    {/* Flex examples */}
    <BpkFlexExample />
    <BpkFlexDirectionExample />
    <BpkFlexAlignExample />
    <BpkFlexJustifyExample />
    <BpkFlexOrderExample />
    <BpkFlexWrapExample />

    {/* Grid examples */}
    <BpkGridExample />
    <BpkGridSpanExample />
    <BpkGridBentoBoxExample />

    {/* Stack examples */}
    <BpkStackExample />
    <BpkStackDirectionExample />
    <BpkHStackExample />
    <BpkVStackExample />
    <BpkStackResponsiveExample />

    {/* Vessel examples */}
    <BpkVesselExample />
  </>
);

const meta = {
  title: 'bpk-component-layout',
  component: BpkProvider,
  subcomponents: {
    BpkBox,
    BpkFlex,
    BpkGrid,
    BpkGridItem,
    BpkStack,
    BpkVessel,
  },
  parameters: {
    docs: {
      // Use Storybook's default docs rendering.
      page: undefined,
    },
  },
} satisfies Meta;

export default meta;

export { VisualTest };

export const VisualTestWithZoom = {
  render: VisualTest,
  args: {
    zoomEnabled: true,
  },
};
