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
/* @flow strict */

import { Children, type AbstractComponent } from 'react';

export function getDisplayName(Component: AbstractComponent<any>): string {
  return (
    Component.displayName ||
    Component.name ||
    (typeof Component === 'string' && Component.length > 0
      ? Component
      : 'Unknown')
  );
}

const hasChildrenOfType =
  (type: AbstractComponent<any>, atLeast: number = 1) =>
  (props: { [string]: any }, propType: string, componentName: string) => {
    if (Children.count(props[propType]) < atLeast) {
      const inflectedNoun = atLeast === 1 ? 'child' : 'children';
      return Error(
        `${componentName} requires at least ${atLeast} '${getDisplayName(
          type,
        )}' ${inflectedNoun}.`,
      );
    }

    const children = Children.toArray(props[propType]);
    for (let i = 0; i < children.length; i += 1) {
      const child = children[i];
      if (child.type !== type && !(child.type.prototype instanceof type)) {
        return Error(
          `${componentName} only allows '${getDisplayName(
            type,
          )}' as children. Found '${getDisplayName(child.type)}'.`,
        );
      }
    }

    return undefined;
  };

export default hasChildrenOfType;
