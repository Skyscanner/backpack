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

import { BpkCalendarDate } from '../../bpk-component-calendar';

import type { BpkCalendarDateProps } from '../../bpk-component-calendar';

type Props = Partial<BpkCalendarDateProps> & {
  date: Date;
  isOutside?: boolean;
  [rest: string]: any;
};
// A calendar date cell for use within a scrollable calendar grid.
// Renders a BpkCalendarDate for dates within the displayed month and returns null for dates outside it, keeping the grid focused on the current month.
const BpkScrollableCalendarDate = ({isOutside = false, ...rest}: Props) =>
    // Returning null when isOutside is true ensures only focused month displays in grid
     !isOutside ? <BpkCalendarDate {...rest} /> : null


export default BpkScrollableCalendarDate;