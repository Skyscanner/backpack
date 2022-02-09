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

import React from 'react';

import {
  PrimaryExample,
  SecondaryExample,
  DestructiveExample,
  LinkExample,
  FeaturedExample,
  OutlineExample,
  ComponentButtonPrimaryExample,
  ComponentButtonSecondaryExample,
  ComponentButtonDestructiveExample,
  ComponentButtonLinkExample,
  ComponentButtonLinkWithPaddingExample,
  ComponentButtonFeaturedExample,
  ComponentButtonOutlineExample,
  MixedExample,
  AnchorTagsExample,
} from './examples';

export default {
  title: 'bpk-component-button',
};

export const BpkButtonPrimary = () => <PrimaryExample />;

BpkButtonPrimary.story = {
  name: 'BpkButton (Primary)',
};

export const BpkButtonSecondary = () => <SecondaryExample />;

BpkButtonSecondary.story = {
  name: 'BpkButton (Secondary)',
};

export const BpkButtonDestructive = () => <DestructiveExample />;

BpkButtonDestructive.story = {
  name: 'BpkButton (Destructive)',
};

export const BpkButtonLinkButton = () => <LinkExample />;

BpkButtonLinkButton.story = {
  name: 'BpkButton (Link button)',
};

export const BpkButtonFeatured = () => <FeaturedExample />;

BpkButtonFeatured.story = {
  name: 'BpkButton (Featured)',
};

export const BpkButtonOutline = () => <OutlineExample />;

BpkButtonOutline.story = {
  name: 'BpkButton (Outline)',
};

export const Primary = () => <ComponentButtonPrimaryExample />;
export const Secondary = () => <ComponentButtonSecondaryExample />;
export const Destructive = () => <ComponentButtonDestructiveExample />;
export const LinkButton = () => <ComponentButtonLinkExample />;

LinkButton.story = {
  name: 'Link button',
};

export const LinkButtonWithPadding = () => (
  <ComponentButtonLinkWithPaddingExample />
);

LinkButtonWithPadding.story = {
  name: 'Link button with padding',
};

export const Featured = () => <ComponentButtonFeaturedExample />;
export const Outline = () => <ComponentButtonOutlineExample />;
export const Mixture = () => <MixedExample />;
export const AnchorTags = () => <AnchorTagsExample />;

AnchorTags.story = {
  name: 'Anchor tags',
};

export const VisualTest = () => <MixedExample />;

VisualTest.story = {
  name: 'Visual test',
};
