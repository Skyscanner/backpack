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

import type { ReactNode } from 'react';
declare const BREAKPOINTS: {
    readonly SMALL_MOBILE: any;
    readonly MOBILE: any;
    readonly SMALL_TABLET: any;
    readonly SMALL_TABLET_ONLY: any;
    readonly TABLET: any;
    readonly TABLET_ONLY: any;
    readonly ABOVE_MOBILE: any;
    readonly ABOVE_TABLET: any;
    readonly ABOVE_DESKTOP: any;
    readonly DESKTOP_ONLY: any;
};
type Props = {
    /**
     * The content to render when the breakpoint matches.
     */
    children: ReactNode | ((matches: boolean) => ReactNode | null);
    query: string | (typeof BREAKPOINTS)[keyof typeof BREAKPOINTS];
    legacy?: boolean;
    matchSSR?: boolean;
};
declare const BpkBreakpoint: ({ children, legacy, query }: Props) => JSX.Element;
export { BREAKPOINTS };
export default BpkBreakpoint;
