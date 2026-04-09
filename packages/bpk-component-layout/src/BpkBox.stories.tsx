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

import { ArgTypes, Title, Markdown } from '@storybook/addon-docs/blocks';

import { BACKGROUND_COLORS, BpkBox, BpkProvider, BpkSpacing } from '..';
import BpkButton from '../../bpk-component-button';
import BpkText, {
  TEXT_COLORS,
  TEXT_STYLES,
} from '../../bpk-component-text';

import LayoutWrapper from './BpkLayout.stories-wrapper';

import type { Meta } from '@storybook/react';

/**
 * Core layout example – demonstrates basic spacing usage.
 *
 * @returns {JSX.Element} A box with padding and margin using Backpack spacing tokens.
 */
const SpacingExample = () => (
  <LayoutWrapper>
    <BpkBox padding={BpkSpacing.MD} margin={BpkSpacing.MD}>
      Default box with padding and margin using Backpack spacing tokens.
    </BpkBox>
  </LayoutWrapper>
);

/**
 * RTL-friendly spacing example – demonstrates margin/padding logical props.
 *
 * @returns {JSX.Element} Box using marginInline & paddingInline in RTL context.
 */
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

/**
 * Size example – demonstrates width/height using semantic values.
 *
 * @returns {JSX.Element} Box with 50% width and 6rem minHeight.
 */
const SizeExample = () => (
  <LayoutWrapper>
    <BpkBox width="50%" minHeight="6rem">
      Box with 50% width and 6rem minHeight.
    </BpkBox>
  </LayoutWrapper>
);

/**
 * Responsive example – demonstrates breakpoint-based responsive layout props.
 *
 * @returns {JSX.Element} A box whose spacing changes across breakpoints.
 */
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

/**
 * Position example – demonstrates top/left offsets using allowed values.
 *
 * @returns {JSX.Element} A relative box with an absolutely positioned child.
 */
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

/**
 * Interactive props example – demonstrates tabIndex, role, and onClick on BpkBox.
 *
 * @returns {JSX.Element} A clickable region using role, tabIndex, and onClick.
 */
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

/**
 * textStyle example – demonstrates applying BpkText typography styles via BpkBox.
 *
 * @returns {JSX.Element} Boxes with different textStyle values applied.
 */
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

/**
 * Responsive textStyle example – demonstrates textStyle changing across breakpoints.
 *
 * @returns {JSX.Element} A box whose text style changes from caption to heading5 across breakpoints.
 */
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

/**
 * Ref example – demonstrates forwarding a ref to the BpkBox DOM element.
 *
 * @returns {JSX.Element} A box with a button that reads DOM info via ref.
 */
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

/**
 * Color example – demonstrates all TEXT_COLORS on BpkBox.
 * @returns {JSX.Element} Color example
 */
const ColorExample = () => (
  <LayoutWrapper>
    {Object.entries(TEXT_COLORS).map(([key, value]) => (
      <BpkBox key={key} padding={BpkSpacing.SM} color={value}>
        <BpkText>
          {key}: {value}
        </BpkText>
      </BpkBox>
    ))}
  </LayoutWrapper>
);

/**
 * Background color example – demonstrates all BACKGROUND_COLORS categories on BpkBox:
 * surface, canvas, status fill, and combined with color.
 * @returns {JSX.Element} Background color example
 */
const BackgroundColorExample = () => (
  <LayoutWrapper>
    {(
      [
        'surfaceDefault',
        'surfaceElevated',
        'surfaceHero',
        'surfaceContrast',
        'surfaceHighlight',
        'surfaceSubtle',
        'surfaceLowContrast',
        'surfaceTint',
        'canvas',
        'canvasContrast',
        'statusSuccessFill',
        'statusDangerFill',
        'statusWarningFill',
      ] as const
    ).map((key) => (
      <BpkBox
        key={key}
        padding={BpkSpacing.SM}
        backgroundColor={BACKGROUND_COLORS[key]}
      >
        <BpkText>
          {key}: {BACKGROUND_COLORS[key]}
        </BpkText>
      </BpkBox>
    ))}
    <BpkBox
      padding={BpkSpacing.MD}
      color={TEXT_COLORS.textOnDark}
      backgroundColor={BACKGROUND_COLORS.surfaceHero}
    >
      <BpkText>textOnDark on surfaceHero</BpkText>
    </BpkBox>
    <BpkBox
      padding={BpkSpacing.MD}
      color={TEXT_COLORS.textPrimary}
      backgroundColor={BACKGROUND_COLORS.surfaceDefault}
    >
      <BpkText>textPrimary on surfaceDefault</BpkText>
    </BpkBox>
    <BpkBox
      padding={BpkSpacing.MD}
      color={TEXT_COLORS.textSuccess}
      backgroundColor={BACKGROUND_COLORS.statusSuccessFill}
    >
      <BpkText>textSuccess on statusSuccessFill</BpkText>
    </BpkBox>
  </LayoutWrapper>
);

/**
 * Mixed visual regression example – used for Percy/visual tests.
 *
 * @returns {JSX.Element} A wrapper containing all Box examples for visual regression.
 */
const MixedExample = () => (
  <LayoutWrapper>
    <SpacingExample />
    <RtlSpacingExample />
    <SizeExample />
    <ResponsiveExample />
    <PositionExample />
    <InteractiveExample />
    <TextStyleExample />
    <BackgroundColorExample />
  </LayoutWrapper>
);

const meta = {
  title: 'bpk-component-layout/Box',
  component: BpkBox,
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
            Notes: `BpkBox` is the base layout primitive. It exposes a curated,
            structural prop surface and tokenised spacing.
          </Markdown>
        </>
      ),
    },
  },
} satisfies Meta;

export default meta;

export const Spacing = {
  render: () => <SpacingExample />,
};

export const RtlSpacing = {
  render: () => <RtlSpacingExample />,
};

export const Size = {
  render: () => <SizeExample />,
};

export const Responsive = {
  render: () => <ResponsiveExample />,
};

export const Position = {
  render: () => <PositionExample />,
};

export const Interactive = {
  render: () => <InteractiveExample />,
};

export const TextStyle = {
  render: () => <TextStyleExample />,
};

export const ResponsiveTextStyle = {
  render: () => <ResponsiveTextStyleExample />,
};

export const Ref = {
  render: () => <RefExample />,
};

export const Color = {
  render: () => <ColorExample />,
};

export const BackgroundColor = {
  render: () => <BackgroundColorExample />,
};

export const VisualTest = {
  render: () => <MixedExample />,
};
