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

/// <reference types="react" />
export type Props = {
    title: string;
    nudgerId: string;
    value: number;
    decreaseButtonLabel: string;
    increaseButtonLabel: string;
    min: number;
    max: number;
    onChange: (arg0: any) => (null | void);
    subtitle?: string;
    className?: string | null;
};
declare const BpkNudgerRow: ({ title, nudgerId, subtitle, decreaseButtonLabel, increaseButtonLabel, min, max, onChange, value, className }: Props) => JSX.Element;
export default BpkNudgerRow;
