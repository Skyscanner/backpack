#!/bin/sh
#
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

BRANCH_NAME="autobump-bpk-dependencies-`date +%Y-%m-%d.%H%M`"

echo "--- Cloning Backpack docs ---"
git clone git@github.com:skyscanner/backpack-docs.git

cd backpack-docs

echo "--- Checkout upgrade branch ---"
git checkout -b $BRANCH_NAME

echo "--- Updating bpk dependencies ---"
npm run update-bpk-dependencies

echo "--- Commiting to GitHub ---"
git add .
git commit -m "Automated upgrade of Backpack dependencies"
git push --set-upstream origin $BRANCH_NAME

echo "--- Create PR on GitHub ---"
gh pr create --title "Automated upgrade of Backpack dependencies" --body "This is an automated PR generated as part of the publish process in Backpack.\n\nIf CI passes, it's generally safe to merge this without waiting for approval."
echo "--- A PR has automatically been created for you in the docs site repo ---"

echo "--- Cleaning up ---"
cd ..
rm -rf backpack-docs
