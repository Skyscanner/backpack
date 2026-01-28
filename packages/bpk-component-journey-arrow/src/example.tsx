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


import JourneyArrow from '../index';
import BpkText, { TEXT_STYLES } from '../../bpk-component-text';

const JourneyArrowExample = () => {
  const widths = ["25%", "50%", "100%"]
  return (<>
      <BpkText textStyle={TEXT_STYLES.heading2} tagName="h2">Direct, different widths</BpkText>
      {widths.map((width) =>
          <div style={{display: 'flex', alignItems: 'center', width}}>
        <BpkText>Origin</BpkText>
        <JourneyArrow />
        <BpkText>Destination</BpkText>
      </div>
    )}
      <BpkText textStyle={TEXT_STYLES.heading2} tagName="h2">With stops</BpkText>
    <div style={{display: 'flex', alignItems: 'center', width: '50%' }}>
      <JourneyArrow stops={1} />
      <JourneyArrow stops={2} />
      <JourneyArrow stops={3} />
    </div>
    </>
  )
};


export default JourneyArrowExample;
