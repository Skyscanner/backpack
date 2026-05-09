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

// React 18's useId() emits IDs of the form `:r{n}:` while React 19 emits
// `_r_{n}_`. Tests that snapshot DOM with these IDs would otherwise need two
// sets of snapshots — one per React major. This serializer normalises the R19
// form back to the R18 form so a single snapshot serves both.
const { plugins } = require('pretty-format');

const { DOMCollection, DOMElement } = plugins;
const r19Pattern = /_r_(\w+)_/g;

module.exports = {
  test: (val) =>
    val != null && (DOMElement.test(val) || DOMCollection.test(val)),
  serialize: (val, config, indentation, depth, refs, printer) => {
    const inner = DOMElement.test(val) ? DOMElement : DOMCollection;
    const serialized = inner.serialize(
      val,
      config,
      indentation,
      depth,
      refs,
      printer,
    );
    return serialized.replace(r19Pattern, ':r$1:');
  },
};
