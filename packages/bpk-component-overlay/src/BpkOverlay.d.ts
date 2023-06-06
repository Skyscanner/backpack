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

import type { ComponentProps, ReactNode } from 'react';
export declare const OVERLAY_TYPES: {
    readonly solidLow: "solidLow";
    readonly solidMedium: "solidMedium";
    readonly solidHigh: "solidHigh";
    readonly topLow: "topLow";
    readonly topMedium: "topMedium";
    readonly topHigh: "topHigh";
    readonly bottomLow: "bottomLow";
    readonly bottomMedium: "bottomMedium";
    readonly bottomHigh: "bottomHigh";
    readonly leftLow: "leftLow";
    readonly leftMedium: "leftMedium";
    readonly leftHigh: "leftHigh";
    readonly rightLow: "rightLow";
    readonly rightMedium: "rightMedium";
    readonly rightHigh: "rightHigh";
    readonly vignette: "vignette";
    readonly off: "off";
};
export type OverlayType = typeof OVERLAY_TYPES[keyof typeof OVERLAY_TYPES];
export type Props = ComponentProps<'div'> & {
    children: ReactNode;
    overlayType?: OverlayType;
    className?: string;
    foregroundContent?: ReactNode;
};
declare const BpkOverlay: (props: Props) => JSX.Element;
export default BpkOverlay;
