import React from "react"
import { BpkButtonV2 } from "./BpkButton"
import { withButtonAlignment } from "../../../bpk-component-icon"
import LongArrowRightIcon  from '../../../bpk-component-icon/sm/long-arrow-right';
import LightningIcon from '../../../bpk-component-icon/sm/lightning';
import { BUTTON_TYPES, SIZE_TYPES} from './common-types';
import figma from '@figma/code-connect'

const AlignedArrowIcon = withButtonAlignment(LongArrowRightIcon);
const AlignedLightningIcon = withButtonAlignment(LightningIcon);

figma.connect(
  BpkButtonV2,
  "https://www.figma.com/design/irZ3YBx8vOm16ICkAr7mB3/Backpack-Components?node-id=2965%3A0",
  {
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
        }
      ),
      size: figma.enum('Size', {
        "Default": SIZE_TYPES.small,
        "Large": SIZE_TYPES.large,
      }),
      isDisabled: figma.enum('State', {
        "Disabled": true,
      }),
      content: figma.enum('Icon', {
        "Left": <>
          <AlignedLightningIcon />
          Label
        </>,
        "Right": <>
          Label
          <AlignedArrowIcon />
          </>,
        "None": <>Label</>,
        "Icon only": <>
        <AlignedArrowIcon />
        <span className="visually-hidden">Label</span>
        </>,
      }),
      iconOnly: figma.enum('Icon', {
        "Icon only": true,
      })
    },
    example: ({ style, size, isDisabled, content, iconOnly }) => {
      return (
        <BpkButtonV2 type={style} size={size} disabled={isDisabled} iconOnly={iconOnly}>
          {content}
        </BpkButtonV2>
      )
    }
  },
)
