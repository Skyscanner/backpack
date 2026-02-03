/*
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2016 Skyscanner Ltd
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


import { withRtlSupport } from '../../packages/bpk-component-icon';
import CloseIcon from '../../packages/bpk-component-icon/sm/close';
import ArrowIcon from '../../packages/bpk-component-icon/sm/long-arrow-left';
import BpkNavigationBar, {
  BpkNavigationBarButtonLink,
  BpkNavigationBarIconButton,
  BAR_STYLES,
} from '../../packages/bpk-component-navigation-bar';
import BpkText from '../../packages/bpk-component-text';
import { cssModules } from '../../packages/bpk-react-utils';
import { action } from '../bpk-storybook-utils';

import AirlineLogo from './AirlineLogo';

import STYLES from './examples.module.scss';

const getClassNames = cssModules(STYLES);
const ArrowIconWithRtl = withRtlSupport(ArrowIcon);

const DefaultExample = () => (
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
);

const LongTitleTextExample = () => (
  <div className={getClassNames('bpk-navigation-bar-story')}>
    <BpkNavigationBar
      id="test"
      title="Backpack navigation bar long title example"
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
);

const CustomTitleExample = () => (
  <div className={getClassNames('bpk-navigation-bar-story')}>
    <BpkNavigationBar
      id="test"
      title={<BpkText tagName='h3' textStyle='xl' >Backpack navigation custom title</BpkText>}
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
);

const OnDarkExample = () => (
  <div className={getClassNames('bpk-navigation-bar-story')}>
    <BpkNavigationBar
      id="test"
      title="Backpack"
      barStyle={BAR_STYLES.onDark}
      leadingButton={
        <BpkNavigationBarIconButton
          onClick={action('back clicked')}
          icon={ArrowIconWithRtl}
          label="back"
          barStyle={BAR_STYLES.onDark}
        />
      }
      trailingButton={
        <BpkNavigationBarIconButton
          onClick={action('close clicked')}
          icon={CloseIcon}
          label="close"
          barStyle={BAR_STYLES.onDark}
        />
      }
    />
  </div>
);

const LeadingIconOnlyExample = () => (
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
);

const TrailingIconOnlyExample = () => (
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
);

const WithLinksExample = () => (
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
);

const WithLogoExample = () => (
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
);

const WithLinksOnDarkExample = () => (
  <div className={getClassNames('bpk-navigation-bar-story')}>
    <BpkNavigationBar
      id="test"
      title="Backpack"
      barStyle={BAR_STYLES.onDark}
      leadingButton={
        <BpkNavigationBarIconButton
          onClick={action('back clicked')}
          icon={ArrowIconWithRtl}
          label="back"
          barStyle={BAR_STYLES.onDark}
        />
      }
      trailingButton={
        <BpkNavigationBarButtonLink
          barStyle={BAR_STYLES.onDark}
          onClick={action('done clicked')}
        >
          Done
        </BpkNavigationBarButtonLink>
      }
    />
  </div>
);

const StickyExample = () => {
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
};

const VisualTestExample = () => (
  <div className={getClassNames('bpk-navigation-bar-story')}>
    <DefaultExample />
    <OnDarkExample />
    <WithLinksOnDarkExample />
    <CustomTitleExample />
  </div>
);

export {
  DefaultExample,
  LongTitleTextExample,
  CustomTitleExample,
  OnDarkExample,
  LeadingIconOnlyExample,
  TrailingIconOnlyExample,
  WithLinksExample,
  WithLogoExample,
  WithLinksOnDarkExample,
  StickyExample,
  VisualTestExample,
};
