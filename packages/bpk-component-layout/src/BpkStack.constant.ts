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

// Public API prop names for BpkStack/BpkHStack/BpkVStack.
// These are the consumer-facing names; the components map them to CSS-standard
// names (alignItems, justifyContent, flexWrap, flexDirection) internally.
const StackOptionKeys = [
  'align',
  'justify',
  'wrap',
  'direction',
] as const;

export default StackOptionKeys;
