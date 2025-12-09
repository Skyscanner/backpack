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

import StackOptionKeys from './BpkStack.contanst';
import { processBpkProps, processResponsiveValue } from './tokenUtils';

import type { BpkStackSpecificProps, BpkStackProps } from './BpkStack.types';
import type { BpkResponsiveValue } from './tokens';

function processBpkStackSpecificProps(
  props: BpkStackSpecificProps,
): Record<string, any> {
  const processed: Record<string, any> = { ...props };

  StackOptionKeys.forEach((key) => {
    if (props[key] !== undefined) {
      const processedValue = processResponsiveValue(
        props[key] as BpkResponsiveValue<any>,
        (v: string) => v,
        (v: string) => true,
        String(key),
      );

      if (processedValue !== undefined) {
        processed[key] = processedValue;
      } else {
        delete processed[key];
      }
    }
  });

  return processed;
}

export function processBpkStackProps(
  props: BpkStackProps,
): Record<string, any> {
  // 先处理 spacing 等通用布局 props，再处理 Stack 自己的响应式 props
  const cleanProps = processBpkProps(props);
  console.log('cleanProps', cleanProps);
  const stackSpecificProcessedProps = processBpkStackSpecificProps(cleanProps);
  console.error('stackSpecificProcessedProps', stackSpecificProcessedProps);
  return stackSpecificProcessedProps;
}

export default processBpkStackProps;
