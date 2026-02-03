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
// @ts-nocheck

// TODO: Work out the correct types for these to move away from 'any'.

function requireAll(requireContext: any) {
  const hash: any = {};

  requireContext.keys().forEach((key: string) => {
    const moduleName: any = key.replace('./', '').replace('.jsx', '');
    hash[moduleName] = requireContext(key).default;
  });

  return hash;
}

const sm = requireAll(require.context('./sm', false, /\.jsx$/));
const lg = requireAll(require.context('./lg', false, /\.jsx$/));
const xxxl = requireAll(require.context('./xxxl', false, /\.jsx$/));

export default sm;
export { sm, lg, xxxl };
