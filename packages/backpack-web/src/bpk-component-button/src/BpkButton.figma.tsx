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

import figma from '@figma/code-connect'

import LightningIcon from '../../bpk-component-icon/sm/lightning';
import LongArrowRightIcon  from '../../bpk-component-icon/sm/long-arrow-right';

import BpkButton from "./BpkButton"
import { BUTTON_TYPES, SIZE_TYPES } from './common-types';

figma.connect(
  BpkButton,
  "https://www.figma.com/design/KXf2gHNLDe2cXWUoHl4cTX/Backpack%E2%80%A8Foundations---Components?node-id=10858%3A8677",
  {
    variant: { Icon: "Icon only" },
    props: {
      style: figma.enum('Style', {
        "Primary": BUTTON_TYPES.primary,
        "Secondary": BUTTON_TYPES.secondary,
        "Featured": BUTTON_TYPES.featured,
        "Primary on light": BUTTON_TYPES.primaryOnLight,
        "Primary on dark": BUTTON_TYPES.primaryOnDark,
        "Secondary on dark": BUTTON_TYPES.secondaryOnDark,
        "Destructive": BUTTON_TYPES.destructive,
        "Link": BUTTON_TYPES.link,
        "Link on dark": BUTTON_TYPES.linkOnDark,
      }),
      size: figma.enum('Size', {
        "Default": SIZE_TYPES.small,
        "Large": SIZE_TYPES.large,
      }),
      isDisabled: figma.enum('State', {
        "Disabled": true,
      }),
      isLoading: figma.enum('State', {
        "Loading": true,
      }),
      label: figma.textContent("Label"),
    },
    example: ({ isDisabled, isLoading, label, size, style }) => (
      <BpkButton
        type={style}
        size={size}
        disabled={isDisabled}
        iconOnly
        loading={isLoading}
        aria-label={label}
      >
        <LightningIcon />
      </BpkButton>
    ),
  },
)

figma.connect(
  BpkButton,
  "https://www.figma.com/design/KXf2gHNLDe2cXWUoHl4cTX/Backpack%E2%80%A8Foundations---Components?node-id=10858%3A8677",
  {
    variant: { Icon: "Left" },
    props: {
      style: figma.enum('Style', {
        "Primary": BUTTON_TYPES.primary,
        "Secondary": BUTTON_TYPES.secondary,
        "Featured": BUTTON_TYPES.featured,
        "Primary on light": BUTTON_TYPES.primaryOnLight,
        "Primary on dark": BUTTON_TYPES.primaryOnDark,
        "Secondary on dark": BUTTON_TYPES.secondaryOnDark,
        "Destructive": BUTTON_TYPES.destructive,
        "Link": BUTTON_TYPES.link,
        "Link on dark": BUTTON_TYPES.linkOnDark,
      }),
      size: figma.enum('Size', {
        "Default": SIZE_TYPES.small,
        "Large": SIZE_TYPES.large,
      }),
      isDisabled: figma.enum('State', {
        "Disabled": true,
      }),
      isLoading: figma.enum('State', {
        "Loading": true,
      }),
      label: figma.textContent("Label"),
    },
    example: ({ isDisabled, isLoading, label, size, style }) => (
      <BpkButton
        type={style}
        size={size}
        disabled={isDisabled}
        leadingIcon={LightningIcon}
        loading={isLoading}
      >
        {label}
      </BpkButton>
    ),
  },
)

figma.connect(
  BpkButton,
  "https://www.figma.com/design/KXf2gHNLDe2cXWUoHl4cTX/Backpack%E2%80%A8Foundations---Components?node-id=10858%3A8677",
  {
    variant: { Icon: "Right" },
    props: {
      style: figma.enum('Style', {
        "Primary": BUTTON_TYPES.primary,
        "Secondary": BUTTON_TYPES.secondary,
        "Featured": BUTTON_TYPES.featured,
        "Primary on light": BUTTON_TYPES.primaryOnLight,
        "Primary on dark": BUTTON_TYPES.primaryOnDark,
        "Secondary on dark": BUTTON_TYPES.secondaryOnDark,
        "Destructive": BUTTON_TYPES.destructive,
        "Link": BUTTON_TYPES.link,
        "Link on dark": BUTTON_TYPES.linkOnDark,
      }),
      size: figma.enum('Size', {
        "Default": SIZE_TYPES.small,
        "Large": SIZE_TYPES.large,
      }),
      isDisabled: figma.enum('State', {
        "Disabled": true,
      }),
      isLoading: figma.enum('State', {
        "Loading": true,
      }),
      label: figma.textContent("Label"),
    },
    example: ({ isDisabled, isLoading, label, size, style }) => (
      <BpkButton
        type={style}
        size={size}
        disabled={isDisabled}
        trailingIcon={LongArrowRightIcon}
        loading={isLoading}
      >
        {label}
      </BpkButton>
    ),
  },
)

figma.connect(
  BpkButton,
  "https://www.figma.com/design/KXf2gHNLDe2cXWUoHl4cTX/Backpack%E2%80%A8Foundations---Components?node-id=10858%3A8677",
  {
    variant: { Icon: "None" },
    props: {
      style: figma.enum('Style', {
        "Primary": BUTTON_TYPES.primary,
        "Secondary": BUTTON_TYPES.secondary,
        "Featured": BUTTON_TYPES.featured,
        "Primary on light": BUTTON_TYPES.primaryOnLight,
        "Primary on dark": BUTTON_TYPES.primaryOnDark,
        "Secondary on dark": BUTTON_TYPES.secondaryOnDark,
        "Destructive": BUTTON_TYPES.destructive,
        "Link": BUTTON_TYPES.link,
        "Link on dark": BUTTON_TYPES.linkOnDark,
      }),
      size: figma.enum('Size', {
        "Default": SIZE_TYPES.small,
        "Large": SIZE_TYPES.large,
      }),
      isDisabled: figma.enum('State', {
        "Disabled": true,
      }),
      isLoading: figma.enum('State', {
        "Loading": true,
      }),
      label: figma.textContent("Label"),
    },
    example: ({ isDisabled, isLoading, label, size, style }) => (
      <BpkButton
        type={style}
        size={size}
        disabled={isDisabled}
        loading={isLoading}
      >
        {label}
      </BpkButton>
    ),
  },
)
