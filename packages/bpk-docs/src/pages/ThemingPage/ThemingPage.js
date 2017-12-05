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
import { BpkList, BpkListItem } from 'bpk-component-list';
import nativeReadme from 'react-native-bpk-theming/readme.md';
import webReadme from 'bpk-theming/readme.md';

import Paragraph from './../../components/Paragraph';
import DocsPageBuilder from './../../components/DocsPageBuilder';

import {
  ACCORDIONS,
  BARCHARTS,
  BUTTONS,
  CALENDAR,
  DATEPICKER,
  DRAWER,
  HORIZONTAL_NAV,
  MODALS,
  PROGRESS,
  NATIVE_BUTTON,
  NATIVE_HORIZONTAL_NAV,
  NATIVE_SPINNER,
  NATIVE_SWITCH,
  NUDGERS,
  SPINNERS,
  SLIDERS,
  TYPOGRAPHY,
} from './../../constants/routes';

const CONTEXT_API_URL = 'https://reactjs.org/docs/context.html';
const CSS_VARIABLES_URL = 'https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_variables';

const components = [
  {
    id: 'native',
    title: 'Native',
    blurb: [
      <Paragraph>The following native components are themeable:</Paragraph>,
      <BpkList>
        <BpkListItem>
          <BpkLink href={NATIVE_BUTTON}>Button</BpkLink>
        </BpkListItem>
        <BpkListItem>
          <BpkLink href={NATIVE_HORIZONTAL_NAV}>Horizontal navigation</BpkLink>
        </BpkListItem>
        <BpkListItem>
          <BpkLink href={NATIVE_SPINNER}>Spinner</BpkLink>
        </BpkListItem>
        <BpkListItem>
          <BpkLink href={NATIVE_SWITCH}>Switch</BpkLink>
        </BpkListItem>
      </BpkList>,
    ],
    readme: nativeReadme,
  },
  {
    id: 'web',
    title: 'Web',
    blurb: [
      <Paragraph>The following web components are themeable:</Paragraph>,
      <BpkList>
        <BpkListItem>
          <BpkLink href={ACCORDIONS}>Accordions</BpkLink>
        </BpkListItem>
        <BpkListItem>
          <BpkLink href={BARCHARTS}>Bar charts</BpkLink>
        </BpkListItem>
        <BpkListItem>
          <BpkLink href={`${TYPOGRAPHY}#blockquotes`}>Blockquotes</BpkLink>
        </BpkListItem>
        <BpkListItem>
          <BpkLink href={BUTTONS}>Buttons</BpkLink>
        </BpkListItem>
        <BpkListItem>
          <BpkLink href={CALENDAR}>Calendars</BpkLink>
        </BpkListItem>
        <BpkListItem>
          <BpkLink href={DATEPICKER}>Datepickers</BpkLink>
        </BpkListItem>
        <BpkListItem>
          <BpkLink href={DRAWER}>Drawers</BpkLink>
        </BpkListItem>
        <BpkListItem>
          <BpkLink href={HORIZONTAL_NAV}>Horizontal navigation</BpkLink>
        </BpkListItem>
        <BpkListItem>
          <BpkLink href={MODALS}>Modals</BpkLink>
        </BpkListItem>
        <BpkListItem>
          <BpkLink href={`${TYPOGRAPHY}#links`}>Links</BpkLink>
        </BpkListItem>
        <BpkListItem>
          <BpkLink href={NUDGERS}>Nudgers</BpkLink>
        </BpkListItem>
        <BpkListItem>
          <BpkLink href={PROGRESS}>Progress bars</BpkLink>
        </BpkListItem>
        <BpkListItem>
          <BpkLink href={SPINNERS}>Spinner</BpkLink>
        </BpkListItem>
        <BpkListItem>
          <BpkLink href={SLIDERS}>Sliders</BpkLink>
        </BpkListItem>
      </BpkList>,
    ],
    readme: webReadme,
  },
];


const ThemingPage = () => (<DocsPageBuilder
  title="Theming"
  blurb={[
    <Paragraph>
      Backpack has full theming support through its theme provider component.
      This component provides a theme to all themeable components underneath itself.
      In the render tree, all themeable components will have access to the provided theme, even
      when they are multiple levels deep.
    </Paragraph>,
    <Paragraph>
      In React Native, this is achieved using React&apos;s <BpkLink href={CONTEXT_API_URL}>context API</BpkLink>.
      On the web, <BpkLink href={CSS_VARIABLES_URL}>CSS variables</BpkLink> are used.
    </Paragraph>,
    <Paragraph>
      Each themeable component lists the theme attributes it requires in its readme.
    </Paragraph>,
  ]}
  components={components}
  showMenu={false}
/>);

export default ThemingPage;
