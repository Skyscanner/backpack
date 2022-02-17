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

import React from 'react';
import { wrapDisplayName } from 'bpk-react-utils';

export default function withAlignment(Component, objectHeight, subjectHeight) {
  const WithAlignment = (props) => {
    const objectHeightDecimal = `${objectHeight}`.replace('rem', '');
    const subjectHeightDecimal = `${subjectHeight}`.replace('rem', '');
    const marginTopCalculated = `${
      Math.max(0, objectHeightDecimal - subjectHeightDecimal) / 2
    }rem`;

    return (
      <span
        style={{
          lineHeight: subjectHeight,
          display: 'inline-block',
          marginTop: marginTopCalculated,
          verticalAlign: 'top',
        }}
      >
        <Component {...props} />
      </span>
    );
  };

  WithAlignment.displayName = wrapDisplayName(Component, 'withAlignment');

  return WithAlignment;
}
