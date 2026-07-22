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

export const skeletonThemeAttributes: string[] = [];

/**
 * Combined deduplicated array of all skeleton private theme attributes.
 * Only exposes component-scoped (private) skeleton tokens — global semantic vars
 * (surface, canvas colours) can be overridden at the theme level independently.
 */
export const allSkeletonThemeAttributes: string[] = [];

/**
 * @deprecated Use allSkeletonThemeAttributes instead.
 * Will be removed in the next major release.
 */
const themeAttributes: string[] = [];

export default themeAttributes;
