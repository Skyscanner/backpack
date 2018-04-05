/*
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2018 Skyscanner Ltd
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

const templateChanges = (changes, title) => {
  if (!changes) {
    return '';
  }

  return `**${title}**
${changes.map(change => `- ${change}`).join('\n')}`;
};

const templateRelese = release => `## ${
  release.version
} - ${release.date.toLocaleDateString('en-GB')}

${[
  templateChanges(release.changes.major, 'Breaking'),
  templateChanges(release.changes.minor, 'Added'),
  templateChanges(release.changes.patch, 'Fixed'),
]
  .filter(x => x)
  .join('\n')}
`;

module.exports = (parsedChangelog, packageName) => `# ${packageName}

${parsedChangelog.releases.map(templateRelese).join('\n')}`;
