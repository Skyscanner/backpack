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
export const ADOPTION_GUARD_THRESHOLD = 60;

// Top-level key in the generated results JSON. Consumers shipping the JSON to
// Cortex via Skyscanner/push-custom-cortex-data should use this same value as
// the `data-descriptor.key` input.
export const BACKPACK_ADOPTION_OUTPUT_KEY = "backpack-adoption";

export const DEFAULT_PATTERN = "**/*.{jsx,tsx}";

export const DEFAULT_OUTPUT_PATH = "backpack-adoption-results.json";

export const DEFAULT_IGNORE_PATTERNS = [
  "**/node_modules/**",
  "**/dist/**",
  "**/build/**",
  "**/*.test.*",
  "**/*.spec.*",
  "**/*.stories.*",
  "**/__mocks__/**",
  "**/__mock__/**",
  "**/mocks/**",
];