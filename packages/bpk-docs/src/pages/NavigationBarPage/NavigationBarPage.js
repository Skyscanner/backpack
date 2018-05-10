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

/* @flow */

import React from 'react';
import ArrowIcon from 'bpk-component-icon/sm/long-arrow-left';
import CloseIcon from 'bpk-component-icon/sm/close';
import { withRtlSupport } from 'bpk-component-icon';
import BpkNavigationBar, {
  BpkNavigationBarIconButton,
  BpkNavigationBarButtonLink,
} from 'bpk-component-navigation-bar';
import navigationBarReadme from 'bpk-component-navigation-bar/readme.md';
import { cssModules } from 'bpk-react-utils';

import DocsPageBuilder from './../../components/DocsPageBuilder';
import Paragraph from './../../components/Paragraph';
import STYLES from './NavigationBarPage.scss';

const getClassNames = cssModules(STYLES);
const ArrowIconWithRtl = withRtlSupport(ArrowIcon);

const components = [
  {
    id: 'default',
    title: 'Default',
    blurb: [],
    examples: [
      <div className={getClassNames('bpk-navigation-bar-example')}>
        <BpkNavigationBar
          id="default-bpk-nav"
          title="Backpack"
          leadingButton={
            <BpkNavigationBarIconButton
              onClick={() => {}}
              icon={ArrowIconWithRtl}
              label="back"
            />
          }
        />
      </div>,
    ],
  },
  {
    id: 'with-text-button',
    title: 'With text button',
    blurb: [
      <Paragraph>
        The navigation bar can be composed with text buttons.
      </Paragraph>,
    ],
    examples: [
      <div className={getClassNames('bpk-navigation-bar-example')}>
        <BpkNavigationBar
          id="default-bpk-nav"
          title="Backpack"
          leadingButton={
            <BpkNavigationBarIconButton
              onClick={() => {}}
              icon={ArrowIconWithRtl}
              label="back"
            />
          }
          trailingButton={
            <BpkNavigationBarButtonLink onClick={() => {}}>
              Done
            </BpkNavigationBarButtonLink>
          }
        />
      </div>,
    ],
  },
  {
    id: 'with-icon-button',
    title: 'With icon button',
    blurb: [
      <Paragraph>
        The navigation bar can be composed with different icon buttons.
      </Paragraph>,
    ],
    examples: [
      <div className={getClassNames('bpk-navigation-bar-example')}>
        <BpkNavigationBar
          id="default-bpk-nav"
          title="Backpack"
          leadingButton={
            <BpkNavigationBarIconButton
              onClick={() => {}}
              icon={ArrowIconWithRtl}
              label="back"
            />
          }
          trailingButton={
            <BpkNavigationBarIconButton
              onClick={() => {}}
              icon={CloseIcon}
              label="close"
            />
          }
        />
      </div>,
    ],
  },
];

const isNeo = process.env.BPK_NEO;

const blurb = [
  <Paragraph>
    The navigation bar component encapsulates a title and icon/text actions for
    controlling views.
  </Paragraph>,
];

const NavigationBarPage = ({ ...rest }: { [string]: any }) => (
  <DocsPageBuilder
    title="Navigation bar"
    blurb={isNeo ? null : blurb}
    components={components}
    readme={navigationBarReadme}
    {...rest}
  />
);

export default NavigationBarPage;
