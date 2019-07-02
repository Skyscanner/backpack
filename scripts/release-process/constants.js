/*
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2016-2019 Skyscanner Ltd
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

const SLACK_PLATFORM_EMOJIS = `:backpack: :safari: :firefox_quantum: :chrome:`;
const PLATFORM = 'web';
const REPO = 'backpack';

const GIT_HASH_REGEX = /[A-Za-z0-9]*/i;
const YES_REGEX = /Y(es)?/i;
const YES_NO_REGEX = /Y(es)?|N(o)?/i;
const CHANGELOG_PATH = 'CHANGELOG.md';
const UNRELEASED_PATH = 'UNRELEASED.yaml';
const UNRELEASED_PATH_CLEAN = 'scripts/release-process/UNRELEASED_CLEAN.yaml';
const RELEASE_MODE_PATCH = 'patch';
const RELEASE_MODE_MINOR = 'minor';
const RELEASE_MODE_MAJOR = 'major';
const TITLE_PATCH = '**Fixed:**';
const TITLE_MINOR = '**Added:**';
const TITLE_MAJOR = '**Breaking:**';
const YAML_SECTION_PATCH = 'FIXED';
const YAML_SECTION_MINOR = 'ADDED';
const YAML_SECTION_MAJOR = 'BREAKING';

module.exports = {
  CHANGELOG_PATH,
  GIT_HASH_REGEX,
  PLATFORM,
  RELEASE_MODE_MAJOR,
  RELEASE_MODE_MINOR,
  RELEASE_MODE_PATCH,
  REPO,
  SLACK_PLATFORM_EMOJIS,
  TITLE_MAJOR,
  TITLE_MINOR,
  TITLE_PATCH,
  UNRELEASED_PATH,
  UNRELEASED_PATH_CLEAN,
  YAML_SECTION_MAJOR,
  YAML_SECTION_MINOR,
  YAML_SECTION_PATCH,
  YES_NO_REGEX,
  YES_REGEX,
};
