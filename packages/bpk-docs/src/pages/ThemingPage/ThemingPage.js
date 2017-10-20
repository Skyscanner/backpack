/*
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2017 Skyscanner Ltd
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

import React from 'react';
import BpkLink from 'bpk-component-link';
import BpkBlockquote from 'bpk-component-blockquote';
import { BpkList, BpkListItem } from 'bpk-component-list';
import readme from 'react-native-bpk-theming/readme.md';

import Paragraph from './../../components/Paragraph';
import DocsPageBuilder from './../../components/DocsPageBuilder';

import { NATIVE_BUTTON } from './../../constants/routes';

const NativeTextPage = () => (<DocsPageBuilder
  title="Theming"
  blurb={[
    <Paragraph>
      Backpack has full theming support through its theme provider component.
      This component provides a theme to all themeable components underneath itself via the context API.
      In the render tree all themeable components will have access to the provided theme, even
      when they are multiple levels deep.
    </Paragraph>,
    <Paragraph>
      The following Backpack components are themeable
      (each themeable component lists the theming properties it requires in its readme).
    </Paragraph>,
    <BpkList>
      <BpkListItem>
        <BpkLink href={NATIVE_BUTTON}>Button</BpkLink>
      </BpkListItem>
      <BpkListItem>More coming soon!</BpkListItem>
    </BpkList>,
    <BpkBlockquote>
      <strong>Note:</strong> React Native is currently supported, with web coming soon.
    </BpkBlockquote>,
  ]}
  readme={readme}
/>);

export default NativeTextPage;
