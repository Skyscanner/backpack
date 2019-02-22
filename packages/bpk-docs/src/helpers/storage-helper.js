/*
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2016 - 2019 Skyscanner Ltd
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

const LOCAL_STORAGE_KEY = 'BPK_DOCS_platform_preference';

const LOCAL_STORAGE_EXISTS = typeof localStorage !== 'undefined';

export const getPlatformFromLocalStorage = () => {
  if (!LOCAL_STORAGE_EXISTS) {
    return null;
  }
  const currentPlatform = localStorage.getItem(LOCAL_STORAGE_KEY);
  return currentPlatform;
};

export const setPlatformInLocalStorage = platformName => {
  if (!LOCAL_STORAGE_EXISTS || platformName === 'all') {
    return;
  }
  localStorage.setItem(LOCAL_STORAGE_KEY, platformName);
};
