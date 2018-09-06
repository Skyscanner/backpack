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
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withRtlSupport } from 'bpk-component-icon';
import ArrowIcon from 'bpk-component-icon/sm/long-arrow-left';
import CloseIcon from 'bpk-component-icon/sm/close';
import { cssModules } from 'bpk-react-utils';

import BpkNavigationBar, {
  BpkNavigationBarButtonLink,
  BpkNavigationBarIconButton,
} from './index';

import STYLES from './stories.css';
import AirlineLogo from './AirlineLogo';

const getClassNames = cssModules(STYLES);
const ArrowIconWithRtl = withRtlSupport(ArrowIcon);

storiesOf('bpk-component-navigation-bar', module)
  .add('Default', () => (
    <div className={getClassNames('bpk-navigation-bar-story')}>
      <BpkNavigationBar
        id="test"
        title="Backpack"
        leadingButton={
          <BpkNavigationBarIconButton
            onClick={action('back clicked')}
            icon={ArrowIconWithRtl}
            label="back"
          />
        }
        trailingButton={
          <BpkNavigationBarIconButton
            onClick={action('close clicked')}
            icon={CloseIcon}
            label="close"
          />
        }
      />
    </div>
  ))
  .add('Leading icon only', () => (
    <div className={getClassNames('bpk-navigation-bar-story')}>
      <BpkNavigationBar
        id="test"
        title="Backpack"
        leadingButton={
          <BpkNavigationBarIconButton
            onClick={action('back clicked')}
            icon={ArrowIconWithRtl}
            label="back"
          />
        }
      />
    </div>
  ))
  .add('Trailing icon only', () => (
    <div className={getClassNames('bpk-navigation-bar-story')}>
      <BpkNavigationBar
        id="test"
        title="Backpack"
        trailingButton={
          <BpkNavigationBarIconButton
            onClick={action('close clicked')}
            icon={CloseIcon}
            label="close"
          />
        }
      />
    </div>
  ))
  .add('With links', () => (
    <div className={getClassNames('bpk-navigation-bar-story')}>
      <BpkNavigationBar
        id="test"
        title="Backpack"
        leadingButton={
          <BpkNavigationBarIconButton
            onClick={action('back clicked')}
            icon={ArrowIconWithRtl}
            label="back"
          />
        }
        trailingButton={
          <BpkNavigationBarButtonLink onClick={action('done clicked')}>
            Done
          </BpkNavigationBarButtonLink>
        }
      />
    </div>
  ))
  .add('With logo', () => (
    <div className={getClassNames('bpk-navigation-bar-story')}>
      <BpkNavigationBar
        id="test"
        title={<AirlineLogo />}
        leadingButton={
          <BpkNavigationBarIconButton
            onClick={action('back clicked')}
            icon={ArrowIconWithRtl}
            label="back"
          />
        }
        trailingButton={
          <BpkNavigationBarButtonLink onClick={action('done clicked')}>
            Done
          </BpkNavigationBarButtonLink>
        }
      />
    </div>
  ));
