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

import { cssModules } from '../../bpk-react-utils';

import STYLES from './BpkJourneyArrow.module.scss';

const getClassName = cssModules(STYLES);

export type Props = {
  /** the number of dot stops to display */
  stops?: number,
  [rest: string]: any; // Inexact rest. See decisions/inexact-rest.md

};
const BpkJourneyArrow = ({
   stops = 0,
    ...rest
}: Props) => {

  // Ensure the number of displayed stops is between 0 and 3
  const dotCount = Math.min(3, Math.max(0, stops));
  return (
      <div className={getClassName("bpk-journey-arrow")} {...rest} >
        {Array.from({ length: dotCount }).map((_, i) => (
          <div key={i} className={getClassName("bpk-journey-arrow__stop")} /> // eslint-disable-line react/no-array-index-key
        ))
        }
    </div>
  )
};

export default BpkJourneyArrow;
