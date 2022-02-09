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

/*
In Babel 7+, Babel stops looking for config files once it finds a package.json. As this
is a monorepo and the Babel config file is in the repo root, we need to tell Babel to go
upwards up the tree to find it.

Without this, gulp will not run as gulpfile.babel.js won't be transpiled and we'll get syntax
errors.
*/

require('@babel/register')({
  rootMode: 'upward',
});

require('./gulpfile.babel');
