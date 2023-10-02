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

import { Component } from 'react';
import BORDER_RADIUS_STYLES from './BpkImageBorderRadiusStyles';
type BpkImageProps = {
    altText: string;
    src: string;
    /**
     * Note: The `aspectRatio` prop should be calculated as `width/height` of the original src image. It is used by the component to preserve space on screen while the image loads.
     */
    aspectRatio: number;
    inView?: boolean;
    loading?: boolean;
    borderRadiusStyle?: (typeof BORDER_RADIUS_STYLES)[keyof typeof BORDER_RADIUS_STYLES];
    className?: string;
    onLoad?: (() => void) | null;
    style?: {};
    suppressHydrationWarning?: boolean;
    [rest: string]: any;
};
declare class BpkImage extends Component<BpkImageProps> {
    placeholder?: HTMLElement | null;
    static defaultProps: {
        borderRadiusStyle: "none";
        inView: boolean;
        loading: boolean;
        onLoad: null;
        style: {};
        suppressHydrationWarning: boolean;
    };
    onImageLoad: () => void;
    getAspectRatio: () => number;
    render(): JSX.Element;
}
export default BpkImage;
