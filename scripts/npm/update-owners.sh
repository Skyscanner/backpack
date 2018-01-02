#!/bin/sh
#
# Backpack - Skyscanner's Design System
#
# Copyright 2018 Skyscanner Ltd
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
#
set -e

cat NPM_OWNERS
read -p "Do you want to add the above owners to all packages (y/n)? " confirm

if [ "$confirm" != "y" ]; then
  echo "Ok bye."
  exit 0
fi

while read username
do
  for f in packages/*; do
    package=`basename $f`

    if [ -d "$f" ] && [ -e "$f/package.json" ]; then
      echo "Adding $username to $package."
      npm owner add $username $package
    fi
  done
done < NPM_OWNERS

echo "Success."
