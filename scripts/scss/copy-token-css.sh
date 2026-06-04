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

printf "📋 Copying token-sync CSS files to bpk-stylesheets...\n"

cp token-sync/css/primitives.css packages/backpack-web/src/bpk-stylesheets/primitives.css
cp token-sync/css/theme-backpack-light.css packages/backpack-web/src/bpk-stylesheets/theme-backpack-light.css
cp token-sync/css/theme-backpack-dark.css packages/backpack-web/src/bpk-stylesheets/theme-backpack-dark.css

printf "✅  Token CSS files copied.\n"
