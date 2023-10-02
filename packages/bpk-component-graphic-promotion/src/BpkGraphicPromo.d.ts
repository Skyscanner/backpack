/*
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2022 Skyscanner Ltd
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

/// <reference types="react" />
export declare const TEXT_ALIGN: {
    readonly start: "start";
    readonly center: "center";
    readonly end: "end";
};
export type Props = {
    className?: string | null;
    contentId?: string | null;
    tagline?: string | null;
    headline: string;
    subheading?: string | null;
    /**
     * An object that groups together all the sponsor related properties. This should only be provided if the graphic promo is sponsored, in which case all of the object's properties are required.
     */
    sponsor?: {
        label: string;
        logo: string;
        altText: string;
    } | null;
    buttonText: string;
    onClick: () => void;
    invertVertically?: boolean;
    textAlign: (typeof TEXT_ALIGN)[keyof typeof TEXT_ALIGN];
    style?: {};
};
declare const BpkGraphicPromo: ({ buttonText, className, contentId, headline, invertVertically, onClick, sponsor, style, subheading, tagline, textAlign, }: Props) => JSX.Element;
export default BpkGraphicPromo;
