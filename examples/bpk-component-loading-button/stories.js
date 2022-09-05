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

/* @flow strict */

import { storiesOf } from '@storybook/react';

import {
  DocsPrimary,
  Primary,
  PrimaryOnDark,
  PrimaryOnLight,
  Secondary,
  SecondaryOnDark,
  Destructive,
  LinkButton,
  LinkOnDarkButton,
  Featured,
  Mixture,
  AnchorTags,
  CustomIcon,
  VisualExample,
} from './examples';

export default {
  title: 'bpk-component-loading-button',
};

export const _DocsPrimary = DocsPrimary;

_DocsPrimary.storyName = 'DocsPrimary';

export const _Primary = Primary;
export const _PrimaryOnDark = PrimaryOnDark;

_PrimaryOnDark.storyName = 'PrimaryOnDark';

export const _PrimaryOnLight = PrimaryOnLight;

_PrimaryOnLight.storyName = 'PrimaryOnLight';

export const _Secondary = Secondary;
export const _SecondaryOnDark = SecondaryOnDark;

_SecondaryOnDark.storyName = 'SecondaryOnDark';

export const _Destructive = Destructive;
export const _LinkButton = LinkButton;

_LinkButton.storyName = 'Link button';

export const _LinkOnDarkButton = LinkOnDarkButton;

_LinkOnDarkButton.storyName = 'LinkOnDark button';

export const _Featured = Featured;
export const _Mixture = Mixture;
export const _AnchorTags = AnchorTags;

_AnchorTags.storyName = 'Anchor tags';

export const _CustomIcon = CustomIcon;
export const VisualTest = VisualExample;

VisualTest.storyName = 'Visual test';
