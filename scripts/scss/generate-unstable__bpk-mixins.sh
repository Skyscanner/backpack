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

# printf "🧽 Wiping packages/unstable__bpk-mixins...\n"

# if [ -d packages/unstable__bpk-mixins ]; then
#     rm -rf packages/unstable__bpk-mixins
# fi

# printf "✅  Done! \n \n"

# printf "📋 Copying mixins to new location...\n"

# cp -r packages/bpk-mixins packages/unstable__bpk-mixins

# rm packages/unstable__bpk-mixins/_tokens.scss

# cp scripts/scss/_tokens.template.scss packages/unstable__bpk-mixins/_tokens.scss

# printf "✅  Done! \n \n"

# printf "⚙️ Running sass-migrator...\n"


# Migrate all other files to new syntax
# printf "👉 Applying new module resolution...\n"

# sass-migrator --load-path=node_modules module packages/unstable__bpk-mixins/*.scss

# printf "👉 Applying new division rules...\n"

# sass-migrator --load-path=node_modules division packages/unstable__bpk-mixins/*.scss

# printf "👉 Forwarding everything...\n"

# rm packages/unstable__bpk-mixins/_index.scss

# cp scripts/scss/_index.template.scss packages/unstable__bpk-mixins/_index.scss

cp packages/node_modules/normalize.css/normalize.css packages/bpk-stylesheets/normalize.css

# printf "✅  New mixins generated. Import them from unstable__bpk-mixins using '@use' notation \n"
