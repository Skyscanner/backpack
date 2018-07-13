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

# Video resolution depends on platform.
RESOLUTION="750x1334"
if [[ $1 = *"videos/android/"* ]]; then
  RESOLUTION="1080x1920"
fi

# Create the new file.
# Flags explained:
# -vcodec libx264: Encode in h264
# -preset slow: Encoding speed. Slower makes for better videos.
# -an: No audio
# -b:v 370K: Bitrate
ffmpeg -i $1 -vcodec libx264 -preset slow -s $RESOLUTION -an -b:v 370K -loglevel fatal $1.new.mp4

# Remove the original file.
rm $1

# Rename the new file to take the place of the original file.
mv $1.new.mp4 $1
