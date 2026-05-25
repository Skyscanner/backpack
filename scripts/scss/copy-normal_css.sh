# Backpack - Skyscanner's Design System
#
# Copyright 2016 Skyscanner Ltd
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#   http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

set -e

printf "📋 Copying normal.css to new location...\n"

# `normalize.css` can land in three places depending on npm's install state
# and which subset of node_modules the CI cache restores. Walk the candidate
# locations in priority order so the build is resilient to all layouts.
# Kept POSIX-compatible (no bash arrays) so the script works under `sh`/dash
# when invoked directly from `npm run`.
NESTED_PATH="packages/backpack-web/node_modules/normalize.css/normalize.css"
WORKSPACE_PATH="packages/node_modules/normalize.css/normalize.css"
ROOT_PATH="node_modules/normalize.css/normalize.css"

SRC=""
if [ -f "$NESTED_PATH" ]; then
  SRC="$NESTED_PATH"
elif [ -f "$WORKSPACE_PATH" ]; then
  SRC="$WORKSPACE_PATH"
elif [ -f "$ROOT_PATH" ]; then
  SRC="$ROOT_PATH"
fi

if [ -z "$SRC" ]; then
  printf "❌  Could not find normalize.css in any of:\n" >&2
  printf "    - %s\n" "$NESTED_PATH" >&2
  printf "    - %s\n" "$WORKSPACE_PATH" >&2
  printf "    - %s\n" "$ROOT_PATH" >&2
  exit 1
fi

cp "$SRC" packages/backpack-web/src/bpk-stylesheets/normalize.scss

printf "✅  New normal.scss generated from %s\n" "$SRC"
