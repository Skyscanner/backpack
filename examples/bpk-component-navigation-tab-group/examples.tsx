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
import Car from '../../packages/bpk-component-icon/sm/cars';
import Explore from '../../packages/bpk-component-icon/sm/explore';
import Flight from '../../packages/bpk-component-icon/sm/flight';
import Hotel from '../../packages/bpk-component-icon/sm/hotels';
import BpkNavigationTabGroup from '../../packages/bpk-component-navigation-tab-group';
import { NAVIGATION_TAB_GROUP_TYPES } from '../../packages/bpk-component-navigation-tab-group/src/BpkNavigationTabGroup';
import BpkText, { TEXT_STYLES } from '../../packages/bpk-component-text';
import { cssModules } from '../../packages/bpk-react-utils';

import type { BpkNavigationTabGroupProps } from '../../packages/bpk-component-navigation-tab-group';

import STYLES from './examples.module.scss';

const getClassNames = cssModules(STYLES);

const exploreIcons = withRtlSupport(Explore);

const hotelIcons = withRtlSupport(Hotel);

const carIcons = withRtlSupport(Car);

const flightIcons = withRtlSupport(Flight);

const tabs: BpkNavigationTabGroupProps['tabs'] = [
  { text: 'Flights', href: '/' },
  { text: 'Hotels', href: '/hotel' },
  { text: 'Car hire', href: '/carhire' },
  { text: 'Explore', href: '/Explore' },
];

const tabsWithIcon: BpkNavigationTabGroupProps['tabs'] = [
  { text: 'Flights', href: '/', icon: flightIcons },
  { text: 'Hotels', href: '/hotel', icon: hotelIcons },
  { text: 'Car hire', href: '/carhire', icon: carIcons },
  { text: 'Explore', href: '/Explore', icon: exploreIcons },
];

const tabsNoHref: BpkNavigationTabGroupProps['tabs'] = [
  { text: 'Flights', icon: flightIcons },
  { text: 'Hotels', icon: hotelIcons },
  { text: 'Car hire', icon: carIcons },
  { text: 'Explore', icon: exploreIcons },
];

const tabsOnlyText: BpkNavigationTabGroupProps['tabs'] = [
  { text: 'Flights'},
  { text: 'Hotels' },
  { text: 'Car hire'},
  { text: 'Explore'},
];

// Simple Navigation Tab Group
const SimpleSurfaceContrast = () => (
  <div className={getClassNames('bpk-navigation-tab-group-story')}>
    <BpkNavigationTabGroup
      tabs={tabs}
      onItemClick={() => {}}
      selectedIndex={2}
      type={NAVIGATION_TAB_GROUP_TYPES.SurfaceContrast}
    />
  </div>
);

// Simple Navigation Tab Group Canvas Default
const SimpleCanvasDefault = () => (
  <div
    className={getClassNames('bpk-navigation-tab-group-story__canvas-default')}
  >
    <BpkNavigationTabGroup
      tabs={tabs}
      onItemClick={() => {}}
      selectedIndex={0}
      type={NAVIGATION_TAB_GROUP_TYPES.CanvasDefault}
    />
  </div>
);
// With Icon Navigation Tab Group
const WithIconSurfaceContrastForExample = () => (
  <div className={getClassNames('bpk-navigation-tab-group-story')}>
    <BpkNavigationTabGroup
      tabs={tabsWithIcon}
      onItemClick={() => {}}
      selectedIndex={0}
      type={NAVIGATION_TAB_GROUP_TYPES.SurfaceContrast}
    />
  </div>
);

// With Icon Navigation Tab Group
const WithIconCanvasDefaultForExample = () => (
  <div>
    <BpkNavigationTabGroup
      tabs={tabsWithIcon}
      onItemClick={() => {}}
      selectedIndex={0}
      type={NAVIGATION_TAB_GROUP_TYPES.CanvasDefault}
    />
  </div>
);

// Tabs No Href SurfaceContrast Navigation Tab Group
const TabsNoHrefSurfaceContrastForExample = () => (
  <div className={getClassNames('bpk-navigation-tab-group-story')}>
  <BpkNavigationTabGroup
    tabs={tabsNoHref}
    onItemClick={() => {}}
    selectedIndex={0}
    type={NAVIGATION_TAB_GROUP_TYPES.SurfaceContrast}
  />
</div>
);

// Tabs No Href CanvasDefault Navigation Tab Group
const TabsNoHrefCanvasDefaultForExample = () => (
  <div>
    <BpkNavigationTabGroup
      tabs={tabsNoHref}
      onItemClick={() => {}}
      selectedIndex={0}
      type={NAVIGATION_TAB_GROUP_TYPES.CanvasDefault}
    />
  </div>
);

// Tabs Only Text SurfaceContrast Navigation Tab Group
const TabsOnlyTextSurfaceContrastForExample = () => (
  <div className={getClassNames('bpk-navigation-tab-group-story')}>
  <BpkNavigationTabGroup
    tabs={tabsOnlyText}
    onItemClick={() => {}}
    selectedIndex={0}
    type={NAVIGATION_TAB_GROUP_TYPES.SurfaceContrast}
  />
</div>
);

// Tabs Only Text CanvasDefault Navigation Tab Group
const TabsOnlyTextCanvasDefaultForExample = () => (
  <div>
    <BpkNavigationTabGroup
      tabs={tabsOnlyText}
      onItemClick={() => {}}
      selectedIndex={0}
      type={NAVIGATION_TAB_GROUP_TYPES.CanvasDefault}
    />
  </div>
);

const VisualTestExample = () => (
  <div className={getClassNames('bpk-navigation-tab-group-story__mixed-container')}>
    <BpkText textStyle={TEXT_STYLES.heading3} tagName="h3">
      Simple SurfaceContrast
    </BpkText>
    <SimpleSurfaceContrast />
    <BpkText textStyle={TEXT_STYLES.heading3} tagName="h3">
      Only Text SurfaceContrast
    </BpkText>
    <TabsOnlyTextSurfaceContrastForExample />
    <BpkText textStyle={TEXT_STYLES.heading3} tagName="h3">
      With Icon SurfaceContrast
    </BpkText>
    <WithIconSurfaceContrastForExample />
    <BpkText textStyle={TEXT_STYLES.heading3} tagName="h3">
      No Href SurfaceContrast
    </BpkText>
    <TabsNoHrefSurfaceContrastForExample />
    <BpkText textStyle={TEXT_STYLES.heading3} tagName="h3">
      Simple CanvasDefault
    </BpkText>
    <SimpleCanvasDefault />
    <BpkText textStyle={TEXT_STYLES.heading3} tagName="h3">
      Only Text CanvasDefault
    </BpkText>
    <TabsOnlyTextCanvasDefaultForExample />
    <BpkText textStyle={TEXT_STYLES.heading3} tagName="h3">
      With Icon CanvasDefault
    </BpkText>
    <WithIconCanvasDefaultForExample />
    <BpkText textStyle={TEXT_STYLES.heading3} tagName="h3">
      No Href CanvasDefault
    </BpkText>
    <TabsNoHrefCanvasDefaultForExample />
    <br />
  </div>
);

export {
  SimpleSurfaceContrast,
  SimpleCanvasDefault,
  WithIconSurfaceContrastForExample,
  WithIconCanvasDefaultForExample,
  TabsNoHrefSurfaceContrastForExample,
  TabsNoHrefCanvasDefaultForExample,
  TabsOnlyTextSurfaceContrastForExample,
  TabsOnlyTextCanvasDefaultForExample,
  VisualTestExample,
};
