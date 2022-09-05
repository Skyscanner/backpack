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
  PrimaryOnDarkExample,
  PrimaryOnLightExample,
  SecondaryExample,
  SecondaryOnDarkExample,
  DestructiveExample,
  LinkExample,
  LinkOnDarkExample,
  FeaturedExample,
  ComponentButtonPrimaryExample,
  ComponentButtonPrimaryOnDarkExample,
  ComponentButtonPrimaryOnLightExample,
  ComponentButtonSecondaryExample,
  ComponentButtonSecondaryOnDarkExample,
  ComponentButtonDestructiveExample,
  ComponentButtonLinkExample,
  ComponentButtonLinkOnDarkExample,
  ComponentButtonFeaturedExample,
  MixedExample,
  AnchorTagsExample,
} from './examples';

export default {
  title: 'bpk-component-button',
};

export const BpkButtonPrimary = () => <PrimaryExample />;

BpkButtonPrimary.storyName = 'BpkButton (Primary)';

export const BpkButtonPrimaryOnDark = () => <PrimaryOnDarkExample />;

BpkButtonPrimaryOnDark.storyName = 'BpkButton (PrimaryOnDark)';

export const BpkButtonPrimaryOnLight = () => <PrimaryOnLightExample />;

BpkButtonPrimaryOnLight.storyName = 'BpkButton (PrimaryOnLight)';

export const BpkButtonSecondary = () => <SecondaryExample />;

BpkButtonSecondary.storyName = 'BpkButton (Secondary)';

export const BpkButtonSecondaryOnDark = () => <SecondaryOnDarkExample />;

BpkButtonSecondaryOnDark.storyName = 'BpkButton (SecondaryOnDark)';

export const BpkButtonDestructive = () => <DestructiveExample />;

BpkButtonDestructive.storyName = 'BpkButton (Destructive)';

export const BpkButtonLinkButton = () => <LinkExample />;

BpkButtonLinkButton.storyName = 'BpkButton (Link button)';

export const BpkButtonLinkOnDarkButton = () => <LinkOnDarkExample />;

BpkButtonLinkOnDarkButton.storyName = 'BpkButton (Link on dark button)';

export const BpkButtonFeatured = () => <FeaturedExample />;

BpkButtonFeatured.storyName = 'BpkButton (Featured)';

export const Primary = () => <ComponentButtonPrimaryExample />;
export const PrimaryOnDark = () => <ComponentButtonPrimaryOnDarkExample />;

PrimaryOnDark.storyName = 'PrimaryOnDark';

export const PrimaryOnLight = () => <ComponentButtonPrimaryOnLightExample />;

PrimaryOnLight.storyName = 'PrimaryOnLight';

export const Secondary = () => <ComponentButtonSecondaryExample />;
export const SecondaryOnDark = () => <ComponentButtonSecondaryOnDarkExample />;

SecondaryOnDark.storyName = 'SecondaryOnDark';

export const Destructive = () => <ComponentButtonDestructiveExample />;
export const LinkButton = () => <ComponentButtonLinkExample />;

LinkButton.storyName = 'Link button';

export const LinkOnDarkButton = () => <ComponentButtonLinkOnDarkExample />;

LinkOnDarkButton.storyName = 'LinkOnDark button';

export const Featured = () => <ComponentButtonFeaturedExample />;
export const Mixture = () => <MixedExample />;
export const AnchorTags = () => <AnchorTagsExample />;

AnchorTags.storyName = 'Anchor tags';

export const VisualTest = () => <MixedExample />;

VisualTest.storyName = 'Visual test';
