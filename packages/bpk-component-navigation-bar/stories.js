/*
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2016-2020 Skyscanner Ltd
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

/* @flow strict */

import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withRtlSupport } from 'bpk-component-icon';
import ArrowIcon from 'bpk-component-icon/sm/long-arrow-left';
import CloseIcon from 'bpk-component-icon/sm/close';
import { cssModules } from 'bpk-react-utils';

import STYLES from './stories.scss';
import AirlineLogo from './AirlineLogo';

import BpkNavigationBar, {
  BpkNavigationBarButtonLink,
  BpkNavigationBarIconButton,
} from './index';

const getClassNames = cssModules(STYLES);
const ArrowIconWithRtl = withRtlSupport(ArrowIcon);

const NavBarCollection = ({ title }: { title: string }) => {
  return (
    <>
      <BpkNavigationBar id="test-0" title={title} />
      <BpkNavigationBar
        id="test-1"
        title={title}
        leadingButton={
          <BpkNavigationBarIconButton
            onClick={action('back clicked')}
            icon={ArrowIconWithRtl}
            label="back"
          />
        }
      />
      <BpkNavigationBar
        id="test-2"
        title={title}
        trailingButton={
          <BpkNavigationBarButtonLink onClick={action('done clicked')}>
            Done
          </BpkNavigationBarButtonLink>
        }
      />
      <BpkNavigationBar
        id="test-3"
        title={title}
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
    </>
  );
};

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
  .add('Combination', () => (
    <div className={getClassNames('bpk-navigation-bar-story')}>
      <NavBarCollection title="Short title" />
      <NavBarCollection title="We have to remember what's important in life: friends, waffles, and work. Or waffles, friends, work. But work has to come third." />
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
  ))
  .add('Sticky', () => {
    const items = [];
    for (let i = 0; i < 5; i += 1) {
      items.push(
        <li>Curabitur congue leo non viverra tristique</li>,
        <li>Orci varius natoque penatibus</li>,
        <li>Duis pellentesque dictum lectus</li>,
        <li>Sit amet egestas velit gravida et</li>,
        <li>Donec porttitor libero sem</li>,
        <li>Id efficitur massa sagittis venenatis</li>,
        <li>Interdum et malesuada fames ac ante</li>,
        <li>Primis in faucibus</li>,
        <li>In ullamcorper tristique lectus</li>,
        <li>Class aptent taciti sociosqu</li>,
        <li>Maecenas vitae diam posuere</li>,
        <li>Donec mattis lorem ante ut eleifend</li>,
        <li>Donec quis ex rhoncus dapibus</li>,
        <li>Mauris bibendum accumsan tincidunt</li>,
        <li>Pellentesque habitant morbi tristique senectus</li>,
      );
    }
    return (
      <div
        className={getClassNames('bpk-navigation-bar-story')}
        style={{ marginTop: '40px' }}
      >
        <BpkNavigationBar
          id="test"
          title="Sticky"
          sticky
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
        <ul>{items}</ul>
      </div>
    );
  });
