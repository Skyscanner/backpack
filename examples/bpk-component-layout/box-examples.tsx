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

import BpkButton from '../../packages/bpk-component-button';
import {
  BpkBox,
  BpkSpacing,
} from '../../packages/bpk-component-layout';
import BpkText, { TEXT_STYLES } from '../../packages/bpk-component-text';

import Wrapper from './layout-wrapper';

/**
 * Core layout example – demonstrates basic spacing usage.
 *
 * @returns {JSX.Element} A box with padding and margin using Backpack spacing tokens.
 */
export const SpacingExample = () => (
  <Wrapper>
    <BpkBox padding={BpkSpacing.MD} margin={BpkSpacing.MD}>
      Default box with padding and margin using Backpack spacing tokens.
    </BpkBox>
  </Wrapper>
);

/**
 * RTL-friendly spacing example – demonstrates margin/padding logical props.
 *
 * @returns {JSX.Element} Box using marginInline & paddingInline in RTL context.
 */
export const RtlSpacingExample = () => (
  <Wrapper>
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
  </Wrapper>
);

/**
 * Size example – demonstrates width/height using semantic values.
 *
 * @returns {JSX.Element} Box with 50% width and 6rem minHeight.
 */
export const SizeExample = () => (
  <Wrapper>
    <BpkBox width="50%" minHeight="6rem">
      Box with 50% width and 6rem minHeight.
    </BpkBox>
  </Wrapper>
);

/**
 * Responsive example – demonstrates breakpoint-based responsive layout props.
 *
 * @returns {JSX.Element} A box whose spacing changes across breakpoints.
 */
export const ResponsiveExample = () => (
  <Wrapper>
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
  </Wrapper>
);

/**
 * Position example – demonstrates top/left offsets using allowed values.
 *
 * @returns {JSX.Element} A relative box with an absolutely positioned child.
 */
export const PositionExample = () => (
  <Wrapper>
    <BpkBox padding={BpkSpacing.MD}>
      <BpkBox position="relative" width="10rem" minHeight="16rem">
        Relative box (10rem x 16rem)
        <BpkBox position="absolute" top="12rem" left="6rem">
          Positioned child (top/left from 12rem, 6rem)
        </BpkBox>
      </BpkBox>
    </BpkBox>
  </Wrapper>
);

/**
 * Interactive props example – demonstrates tabIndex, role, and onClick on BpkBox.
 *
 * @returns {JSX.Element} A clickable region using role, tabIndex, and onClick.
 */
export const InteractiveExample = () => {
  const [count, setCount] = useState(0);
  return (
    <Wrapper>
      <BpkBox
        padding={BpkSpacing.MD}
        role="button"
        tabIndex={0}
        onClick={() => setCount((c) => c + 1)}
      >
        <BpkText>Clicked {count} times (role=&quot;button&quot;, tabIndex=0)</BpkText>
      </BpkBox>
    </Wrapper>
  );
};

/**
 * textStyle example – demonstrates applying BpkText typography styles via BpkBox.
 *
 * @returns {JSX.Element} Boxes with different textStyle values applied.
 */
export const TextStyleExample = () => (
  <Wrapper>
    <BpkBox padding={BpkSpacing.SM} textStyle={TEXT_STYLES.heading3}>
      Heading 3 text style on BpkBox
    </BpkBox>
    <BpkBox padding={BpkSpacing.SM} textStyle={TEXT_STYLES.bodyDefault}>
      Body default text style on BpkBox
    </BpkBox>
    <BpkBox padding={BpkSpacing.SM} textStyle={TEXT_STYLES.caption}>
      Caption text style on BpkBox
    </BpkBox>
  </Wrapper>
);

/**
 * Responsive textStyle example – demonstrates textStyle changing across breakpoints.
 *
 * @returns {JSX.Element} A box whose text style changes from caption to heading5 across breakpoints.
 */
export const ResponsiveTextStyleExample = () => (
  <Wrapper>
    <BpkBox
      padding={BpkSpacing.MD}
      textStyle={{
        base: TEXT_STYLES.caption,
        mobile: TEXT_STYLES.bodyDefault,
        tablet: TEXT_STYLES.heading5,
        desktop: TEXT_STYLES.heading3,
      }}
    >
      Text style changes from caption → bodyDefault → heading5 → heading3 across breakpoints.
    </BpkBox>
  </Wrapper>
);

/**
 * Ref example – demonstrates forwarding a ref to the BpkBox DOM element.
 *
 * @returns {JSX.Element} A box with a button that reads DOM info via ref.
 */
export const RefExample = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [info, setInfo] = useState<string | null>(null);

  const handleRead = () => {
    if (ref.current) {
      const { offsetHeight, offsetWidth, tagName } = ref.current;
      setInfo(`tagName: ${tagName}, width: ${offsetWidth}px, height: ${offsetHeight}px`);
    }
  };

  return (
    <Wrapper>
      <BpkBox ref={ref} padding={BpkSpacing.MD}>
        <BpkText>BpkBox with forwarded ref</BpkText>
      </BpkBox>
      <BpkBox padding={BpkSpacing.SM}>
        <BpkButton onClick={handleRead}>Read ref.current</BpkButton>
        {info && <BpkText textStyle={TEXT_STYLES.footnote}>{info}</BpkText>}
      </BpkBox>
    </Wrapper>
  );
};

/**
 * Mixed visual regression example – used for Percy/visual tests.
 *
 * @returns {JSX.Element} A wrapper containing all Box examples for visual regression.
 */
export const MixedExample = () => (
  <Wrapper>
    <SpacingExample />
    <RtlSpacingExample />
    <SizeExample />
    <ResponsiveExample />
    <PositionExample />
    <InteractiveExample />
    <TextStyleExample />
  </Wrapper>
);


