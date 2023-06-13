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

import { Component, CSSProperties } from 'react';
import type { ReactNode } from 'react';
export type BpkBackgroundImageProps = {
    children?: ReactNode;
    aspectRatio: number;
    inView?: boolean;
    loading?: boolean;
    src: string;
    className?: string;
    onLoad?: (() => void) | null;
    style?: {};
    imageStyle?: CSSProperties;
};
declare class BpkBackgroundImage extends Component<BpkBackgroundImageProps> {
    trackImg?: HTMLImageElement | null;
    static defaultProps: {
        className: string;
        inView: boolean;
        loading: boolean;
        onLoad: null;
        style: {};
        imageStyle: {};
    };
    constructor(props: BpkBackgroundImageProps);
    componentDidMount(): void;
    UNSAFE_componentWillReceiveProps(newProps: BpkBackgroundImageProps): void;
    onBackgroundImageLoad: () => void;
    getAspectRatio: () => number;
    startImageLoad: () => void;
    render(): JSX.Element;
}
export default BpkBackgroundImage;
