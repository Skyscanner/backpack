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

import Paragraph from '../../components/Paragraph';
import IntroBlurb from '../../components/IntroBlurb';
import DocsPageBuilder from '../../components/DocsPageBuilder';
import DocsPageWrapper from '../../components/DocsPageWrapper';

import {
  ACCORDION,
  BARCHART,
  BLOCKQUOTE,
  BUTTON,
  CALENDAR,
  DATEPICKER,
  DRAWER,
  HORIZONTAL_NAV,
  LINK,
  MODAL,
  NAVIGATION_BAR,
  NUDGER,
  PROGRESS,
  SLIDER,
  SPINNER,
  SWITCH,
} from '../../constants/routes';

const CONTEXT_API_URL = 'https://reactjs.org/docs/context.html';
const CSS_VARIABLES_URL =
  'https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_variables';

const nativeBlurb = [
  <Paragraph>The following native components are themeable:</Paragraph>,
  <BpkList>
    <BpkListItem>
      <BpkRouterLink to={BUTTON}>Button</BpkRouterLink>
    </BpkListItem>
    <BpkListItem>
      <BpkRouterLink to={LINK}>Link</BpkRouterLink>
    </BpkListItem>
    <BpkListItem>
      <BpkRouterLink to={HORIZONTAL_NAV}>Horizontal navigation</BpkRouterLink>
    </BpkListItem>
    <BpkListItem>
      <BpkRouterLink to={NAVIGATION_BAR}>Navigation bar</BpkRouterLink>
    </BpkListItem>
    <BpkListItem>
      <BpkRouterLink to={SPINNER}>Spinner</BpkRouterLink>
    </BpkListItem>
    <BpkListItem>
      <BpkRouterLink to={SWITCH}>Switch</BpkRouterLink>
    </BpkListItem>
  </BpkList>,
];

const webBlurb = [
  <Paragraph>The following web components are themeable:</Paragraph>,
  <BpkList>
    <BpkListItem>
      <BpkRouterLink to={ACCORDION}>Accordion</BpkRouterLink>
    </BpkListItem>
    <BpkListItem>
      <BpkRouterLink to={BARCHART}>Bar chart</BpkRouterLink>
    </BpkListItem>
    <BpkListItem>
      <BpkRouterLink to={BLOCKQUOTE}>Blockquotes</BpkRouterLink>
    </BpkListItem>
    <BpkListItem>
      <BpkRouterLink to={`${BUTTON}?platform=web`}>Button</BpkRouterLink>
    </BpkListItem>
    <BpkListItem>
      <BpkRouterLink to={CALENDAR}>Calendar</BpkRouterLink>
    </BpkListItem>
    <BpkListItem>
      <BpkRouterLink to={DATEPICKER}>Datepicker</BpkRouterLink>
    </BpkListItem>
    <BpkListItem>
      <BpkRouterLink to={DRAWER}>Drawer</BpkRouterLink>
    </BpkListItem>
    <BpkListItem>
      <BpkRouterLink to={`${HORIZONTAL_NAV}?platform=web`}>
        Horizontal navigation
      </BpkRouterLink>
    </BpkListItem>
    <BpkListItem>
      <BpkRouterLink to={MODAL}>Modal</BpkRouterLink>
    </BpkListItem>
    <BpkListItem>
      <BpkRouterLink to={`${LINK}?platform=web`}>Link</BpkRouterLink>
    </BpkListItem>
    <BpkListItem>
      <BpkRouterLink to={`${NUDGER}?platform=web`}>Nudgers</BpkRouterLink>
    </BpkListItem>
    <BpkListItem>
      <BpkRouterLink to={`${PROGRESS}?platform=web`}>
        Progress bar
      </BpkRouterLink>
    </BpkListItem>
    <BpkListItem>
      <BpkRouterLink to={`${SPINNER}?platform=web`}>Spinner</BpkRouterLink>
    </BpkListItem>
    <BpkListItem>
      <BpkRouterLink to={SLIDER}>Slider</BpkRouterLink>
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

const blurb = [
  <IntroBlurb>
    All Backpack components have full theming support through through the theme
    provider component. In the render tree, all themeable components will have
    access to the provided theme, even when they are multiple levels deep.
    variables are used.
  </IntroBlurb>,
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

const WebThemingPage = ({ ...rest }) => (
  <DocsPageBuilder
    blurb={webBlurb}
    showMenu={false}
    readme={webReadme}
    {...rest}
  />
);

const NativeThemingPage = ({ ...rest }) => (
  <DocsPageBuilder
    blurb={nativeBlurb}
    showMenu={false}
    readme={nativeReadme}
    {...rest}
  />
);

const ThemingPage = () => (
  <DocsPageWrapper
    title="Theming"
    blurb={blurb}
    webSubpage={<WebThemingPage wrapped />}
    nativeSubpage={<NativeThemingPage wrapped />}
  />
);

export default ThemingPage;
