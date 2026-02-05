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

// TODO: Remove this file once all BPK components have been migrated to TS

type PropTypeValidator = (
  props: Record<string, unknown>,
  propName: string,
  componentName: string,
  ...rest: unknown[]
) => Error | null;

const deprecated = (propType: PropTypeValidator, alternativeSuggestion: string): PropTypeValidator =>
  (
    props: Record<string, unknown>,
    propName: string,
    componentName: string,
    ...rest: unknown[]
  ) => {
    if (props[propName] != null) {
      const message = `Warning: "${propName}" property of "${componentName}" has been deprecated. ${alternativeSuggestion}`;
      // eslint-disable-next-line no-console
      console.warn(message);
    }
    return propType(props, propName, componentName, ...rest);
  };

export default deprecated;
