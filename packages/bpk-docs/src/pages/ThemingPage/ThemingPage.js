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

import React from 'react';
import BpkLink from 'bpk-component-link';
import BpkRouterLink from 'bpk-component-router-link';
import { BpkList, BpkListItem } from 'bpk-component-list';
import BpkBlockquote from 'bpk-component-blockquote';
import nativeReadme from 'react-native-bpk-theming/readme.md';
import webReadme from 'bpk-theming/readme.md';

import Paragraph from './../../components/Paragraph';
import DocsPageBuilder from './../../components/DocsPageBuilder';
import DocsPageWrapper from './../../components/neo/DocsPageWrapper';

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
  NATIVE_BUTTON_LINK,
  NATIVE_HORIZONTAL_NAV,
  NATIVE_NAVIGATION_BAR,
  NATIVE_SPINNER,
  NATIVE_SWITCH,
  NUDGERS,
  SPINNERS,
  SLIDERS,
  TYPOGRAPHY,
} from './../../constants/routes';

const CONTEXT_API_URL = 'https://reactjs.org/docs/context.html';
const CSS_VARIABLES_URL =
  'https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_variables';

const nativeBlurb = [
  <Paragraph>The following native components are themeable:</Paragraph>,
  <BpkList>
    <BpkListItem>
      <BpkRouterLink to={NATIVE_BUTTON}>Button</BpkRouterLink>
    </BpkListItem>
    <BpkListItem>
      <BpkRouterLink to={NATIVE_BUTTON_LINK}>Button Link</BpkRouterLink>
    </BpkListItem>
    <BpkListItem>
      <BpkRouterLink to={NATIVE_HORIZONTAL_NAV}>
        Horizontal navigation
      </BpkRouterLink>
    </BpkListItem>
    <BpkListItem>
      <BpkRouterLink to={NATIVE_NAVIGATION_BAR}>Navigation Bar</BpkRouterLink>
    </BpkListItem>
    <BpkListItem>
      <BpkRouterLink to={NATIVE_SPINNER}>Spinner</BpkRouterLink>
    </BpkListItem>
    <BpkListItem>
      <BpkRouterLink to={NATIVE_SWITCH}>Switch</BpkRouterLink>
    </BpkListItem>
  </BpkList>,
];

const webBlurb = [
  <Paragraph>The following web components are themeable:</Paragraph>,
  <BpkList>
    <BpkListItem>
      <BpkRouterLink to={ACCORDIONS}>Accordions</BpkRouterLink>
    </BpkListItem>
    <BpkListItem>
      <BpkRouterLink to={BARCHARTS}>Bar charts</BpkRouterLink>
    </BpkListItem>
    <BpkListItem>
      <BpkRouterLink to={`${TYPOGRAPHY}#blockquotes`}>
        Blockquotes
      </BpkRouterLink>
    </BpkListItem>
    <BpkListItem>
      <BpkRouterLink to={BUTTONS}>Buttons</BpkRouterLink>
    </BpkListItem>
    <BpkListItem>
      <BpkRouterLink to={CALENDAR}>Calendars</BpkRouterLink>
    </BpkListItem>
    <BpkListItem>
      <BpkRouterLink to={DATEPICKER}>Datepickers</BpkRouterLink>
    </BpkListItem>
    <BpkListItem>
      <BpkRouterLink to={DRAWER}>Drawers</BpkRouterLink>
    </BpkListItem>
    <BpkListItem>
      <BpkRouterLink to={HORIZONTAL_NAV}>Horizontal navigation</BpkRouterLink>
    </BpkListItem>
    <BpkListItem>
      <BpkRouterLink to={MODALS}>Modals</BpkRouterLink>
    </BpkListItem>
    <BpkListItem>
      <BpkRouterLink to={`${TYPOGRAPHY}#links`}>Links</BpkRouterLink>
    </BpkListItem>
    <BpkListItem>
      <BpkRouterLink to={NUDGERS}>Nudgers</BpkRouterLink>
    </BpkListItem>
    <BpkListItem>
      <BpkRouterLink to={PROGRESS}>Progress bars</BpkRouterLink>
    </BpkListItem>
    <BpkListItem>
      <BpkRouterLink to={SPINNERS}>Spinner</BpkRouterLink>
    </BpkListItem>
    <BpkListItem>
      <BpkRouterLink to={SLIDERS}>Sliders</BpkRouterLink>
    </BpkListItem>
  </BpkList>,
  <BpkBlockquote>
    <strong>Note:</strong> Backpack&#39;s theming is based on{' '}
    <BpkLink href={CSS_VARIABLES_URL} blank>
      CSS Variables
    </BpkLink>{' '}
    and thus will not be supported in some browsers. In these cases Backpack
    components will gracefully degrade to the default Skyscanner theme. For an
    overview of this check{' '}
    <BpkLink href="https://caniuse.com/#feat=css-variables" blank>
      caniuse
    </BpkLink>.
  </BpkBlockquote>,
];

const components = [
  {
    id: 'native',
    title: 'Native',
    blurb: nativeBlurb,
    readme: nativeReadme,
  },
  {
    id: 'web',
    title: 'Web',
    blurb: webBlurb,
    readme: webReadme,
  },
];

const blurb = [
  <Paragraph>
    All Backpack components have full theming support through through the theme
    provider component. In the render tree, all themeable components will have
    access to the provided theme, even when they are multiple levels deep.
    variables are used.
  </Paragraph>,
  <Paragraph>
    In React Native, this is achieved using React&apos;s{' '}
    <BpkLink href={CONTEXT_API_URL} blank>
      context API
    </BpkLink>. On the web,{' '}
    <BpkLink href={CSS_VARIABLES_URL} blank>
      CSS variables
    </BpkLink>{' '}
    are used. Each themeable component lists the theme attributes it requires in
    its readme.
  </Paragraph>,
];

const isNeo = process.env.BPK_NEO;

const ThemingPage = () => (
  <DocsPageBuilder
    title="Theming"
    blurb={isNeo ? null : blurb}
    components={components}
    showMenu={false}
  />
);

const NeoWebThemingPage = ({ ...rest }) => (
  <DocsPageBuilder
    blurb={webBlurb}
    showMenu={false}
    readme={webReadme}
    {...rest}
  />
);

const NeoNativeThemingPage = ({ ...rest }) => (
  <DocsPageBuilder
    blurb={nativeBlurb}
    showMenu={false}
    readme={nativeReadme}
    {...rest}
  />
);

const NeoThemingPage = () => (
  <DocsPageWrapper
    title="Theming"
    blurb={blurb}
    webSubpage={<NeoWebThemingPage wrapped />}
    nativeSubpage={<NeoNativeThemingPage wrapped />}
  />
);

export default (isNeo ? NeoThemingPage : ThemingPage);
