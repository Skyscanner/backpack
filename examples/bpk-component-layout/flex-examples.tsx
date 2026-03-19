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

import {
  BpkBox,
  BpkFlex,
  BpkSpacing,
} from '../../packages/bpk-component-layout';

import Wrapper from './layout-wrapper';

import STYLES from './examples.module.scss';

const outline = STYLES['bpk-layout-examples__outline'];

export const BpkFlexExample = () => (
  <Wrapper>
    <BpkFlex gap={BpkSpacing.SM}>
      <BpkBox height="2rem" width="100%"><span className={outline} /></BpkBox>
      <BpkBox height="2rem" width="100%"><span className={outline} /></BpkBox>
      <BpkBox height="2rem" width="100%"><span className={outline} /></BpkBox>
    </BpkFlex>
  </Wrapper>
);

export const BpkFlexDirectionExample = () => (
  <Wrapper>
    <BpkFlex gap={BpkSpacing.SM} direction="column">
      <BpkBox height="2rem" width="100%"><span className={outline} /></BpkBox>
      <BpkBox height="2rem" width="100%"><span className={outline} /></BpkBox>
      <BpkBox height="2rem" width="100%"><span className={outline} /></BpkBox>
    </BpkFlex>
  </Wrapper>
);

export const BpkFlexAlignExample = () => (
  <Wrapper>
    <BpkFlex gap={BpkSpacing.SM} align="center" height="10rem">
      <BpkBox height="2rem" width="100%"><span className={outline} /></BpkBox>
      <BpkBox height="4rem" width="100%"><span className={outline} /></BpkBox>
      <BpkBox height="2rem" width="100%"><span className={outline} /></BpkBox>
    </BpkFlex>
  </Wrapper>
);

export const BpkFlexJustifyExample = () => (
  <Wrapper>
    <BpkFlex gap={BpkSpacing.SM} marginBottom={BpkSpacing.Base} justify="flex-start">
      <BpkBox width="8.5rem" padding={BpkSpacing.MD}><span className={outline} /></BpkBox>
      <BpkBox width="8.5rem" padding={BpkSpacing.MD}><span className={outline}>flex-start</span></BpkBox>
      <BpkBox width="8.5rem" padding={BpkSpacing.MD}><span className={outline} /></BpkBox>
    </BpkFlex>
    <BpkFlex gap={BpkSpacing.SM} marginBottom={BpkSpacing.Base} justify="center">
      <BpkBox width="8.5rem" padding={BpkSpacing.MD}><span className={outline} /></BpkBox>
      <BpkBox width="8.5rem" padding={BpkSpacing.MD}><span className={outline}>center</span></BpkBox>
      <BpkBox width="8.5rem" padding={BpkSpacing.MD}><span className={outline} /></BpkBox>
    </BpkFlex>
    <BpkFlex gap={BpkSpacing.SM} marginBottom={BpkSpacing.Base} justify="flex-end">
      <BpkBox width="8.5rem" padding={BpkSpacing.MD}><span className={outline} /></BpkBox>
      <BpkBox width="8.5rem" padding={BpkSpacing.MD}><span className={outline}>flex-end</span></BpkBox>
      <BpkBox width="8.5rem" padding={BpkSpacing.MD}><span className={outline} /></BpkBox>
    </BpkFlex>
    <BpkFlex gap={BpkSpacing.SM} marginBottom={BpkSpacing.Base} justify="space-between">
      <BpkBox width="8.5rem" padding={BpkSpacing.MD}><span className={outline} /></BpkBox>
      <BpkBox width="8.5rem" padding={BpkSpacing.MD}><span className={outline}>space-between</span></BpkBox>
      <BpkBox width="8.5rem" padding={BpkSpacing.MD}><span className={outline} /></BpkBox>
    </BpkFlex>
  </Wrapper>
);

export const BpkFlexOrderExample = () => (
  <Wrapper>
    <BpkFlex gap={BpkSpacing.SM}>
      <BpkBox order={3} width="100%" padding={BpkSpacing.MD}><span className={outline}>1</span></BpkBox>
      <BpkBox order={1} width="100%" padding={BpkSpacing.MD}><span className={outline}>2</span></BpkBox>
      <BpkBox order={2} width="100%" padding={BpkSpacing.MD}><span className={outline}>3</span></BpkBox>
    </BpkFlex>
  </Wrapper>
);

export const BpkFlexWrapExample = () => (
  <Wrapper>
    <BpkFlex wrap="wrap" gap={BpkSpacing.SM} width="20rem">
      <BpkBox height="2rem" width="9rem"><span className={outline} /></BpkBox>
      <BpkBox height="2rem" width="9rem"><span className={outline} /></BpkBox>
      <BpkBox height="2rem" width="9rem"><span className={outline} /></BpkBox>
    </BpkFlex>
  </Wrapper>
);
