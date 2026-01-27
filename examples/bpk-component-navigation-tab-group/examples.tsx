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
import BpkNavigationTabGroup, { NAVIGATION_TAB_GROUP_TYPES } from '../../packages/bpk-component-navigation-tab-group';
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
  { id: 'air', text: 'Flights', href: '/' },
  { id: 'hotel', text: 'Hotels', href: '/hotel' },
  { id: 'car', text: 'Car hire', href: '/carhire' },
  { id: 'explore', text: 'Explore', href: '/Explore' },
];

const tabsWithIcon: BpkNavigationTabGroupProps['tabs'] = [
  { id: 'air', text: 'Flights', href: '/', icon: flightIcons, 'data-cy':'flight-feature', 'data-analytics':'flights' },
  { id: 'hotel', text: 'Hotels', href: '/hotel', icon: hotelIcons, 'data-cy':'hotel-feature', 'data-analytics':'hotels' },
  { id: 'car', text: 'Car hire', href: '/carhire', icon: carIcons, 'data-cy':'carhire-feature', 'data-analytics':'car hire' },
  { id: 'explore', text: 'Explore', href: '/Explore', icon: exploreIcons, 'data-cy':'explore-feature', 'data-analytics':'explore' },
];

const tabsNoHref: BpkNavigationTabGroupProps['tabs'] = [
  { id: 'air', text: 'Flights', icon: flightIcons },
  { id: 'hotel', text: 'Hotels', icon: hotelIcons },
  { id: 'carhire', text: 'Car hire', icon: carIcons },
  { id: 'explore', text: 'Explore', icon: exploreIcons },
];

const tabsOnlyText: BpkNavigationTabGroupProps['tabs'] = [
  { id: 'air', text: 'Flights'},
  { id: 'hotel', text: 'Hotels' },
  { id: 'carhire', text: 'Car hire'},
  { id: 'explore', text: 'Explore'},
];

const tabsWithBlankTarget: BpkNavigationTabGroupProps['tabs'] = [
  { id: 'air', text: 'Flights', href: '/', target: '_blank' },
  { id: 'hotel', text: 'Hotels', href: '/hotel', target: '_blank' },
  { id: 'car', text: 'Car hire', href: '/carhire', target: '_blank' },
  { id: 'explore', text: 'Explore', href: '/Explore', target: '_blank' },
];

const tabsWithBubble: BpkNavigationTabGroupProps['tabs'] = [
  { id: 'air', text: 'Flights', href: '/', target: '_blank' },
  { id: 'hotel', text: 'Hotels', href: '/hotel', target: '_blank' },
  { id: 'car', text: 'Car hire', href: '/carhire', target: '_blank' },
  { id: 'packages', text: 'Packages', href: '/destinations/packages-holidays', target: '_blank', badgeText: 'New' },
];

// Simple Navigation Tab Group
const SimpleSurfaceContrast = () => (
  <div className={getClassNames('bpk-navigation-tab-group-story')}>
    <BpkNavigationTabGroup
      id='navExample'
      tabs={tabs}
      onItemClick={() => {}}
      selectedIndex={2}
      type={NAVIGATION_TAB_GROUP_TYPES.SurfaceContrast}
      ariaLabel="Navigation tabs"
    />
  </div>
);

// Simple Navigation Tab Group Canvas Default
const SimpleCanvasDefault = () => (
  <div
    className={getClassNames('bpk-navigation-tab-group-story__canvas-default')}
  >
    <BpkNavigationTabGroup
      id='navExample'
      tabs={tabs}
      onItemClick={() => {}}
      selectedIndex={0}
      type={NAVIGATION_TAB_GROUP_TYPES.CanvasDefault}
      ariaLabel="Navigation tabs"
    />
  </div>
);
// With Icon Navigation Tab Group
const WithIconSurfaceContrastForExample = () => (
  <div className={getClassNames('bpk-navigation-tab-group-story')}>
    <BpkNavigationTabGroup
      id='navExample'
      tabs={tabsWithIcon}
      onItemClick={() => {}}
      selectedIndex={0}
      type={NAVIGATION_TAB_GROUP_TYPES.SurfaceContrast}
      ariaLabel="Navigation tabs"
    />
  </div>
);

// With Icon Navigation Tab Group
const WithIconCanvasDefaultForExample = () => (
  <div>
    <BpkNavigationTabGroup
      id='navExample'
      tabs={tabsWithIcon}
      onItemClick={() => {}}
      selectedIndex={0}
      type={NAVIGATION_TAB_GROUP_TYPES.CanvasDefault}
      ariaLabel="Navigation tabs"
    />
  </div>
);

// Tabs No Href SurfaceContrast Navigation Tab Group
const TabsNoHrefSurfaceContrastForExample = () => (
  <div className={getClassNames('bpk-navigation-tab-group-story')}>
  <BpkNavigationTabGroup
    id='navExample'
    tabs={tabsNoHref}
    onItemClick={() => {}}
    selectedIndex={0}
    type={NAVIGATION_TAB_GROUP_TYPES.SurfaceContrast}
    ariaLabel="Navigation tabs"
  />
</div>
);

// Tabs No Href CanvasDefault Navigation Tab Group
const TabsNoHrefCanvasDefaultForExample = () => (
  <div>
    <BpkNavigationTabGroup
      id='navExample'
      tabs={tabsNoHref}
      onItemClick={() => {}}
      selectedIndex={0}
      type={NAVIGATION_TAB_GROUP_TYPES.CanvasDefault}
      ariaLabel="Navigation tabs"
    />
  </div>
);

// Tabs Only Text SurfaceContrast Navigation Tab Group
const TabsOnlyTextSurfaceContrastForExample = () => (
  <div className={getClassNames('bpk-navigation-tab-group-story')}>
  <BpkNavigationTabGroup
    id='navExample'
    tabs={tabsOnlyText}
    onItemClick={() => {}}
    selectedIndex={0}
    type={NAVIGATION_TAB_GROUP_TYPES.SurfaceContrast}
    ariaLabel="Navigation tabs"
  />
</div>
);

// Tabs Only Text CanvasDefault Navigation Tab Group
const TabsOnlyTextCanvasDefaultForExample = () => (
  <div>
    <BpkNavigationTabGroup
      id='navExample'
      tabs={tabsOnlyText}
      onItemClick={() => {}}
      selectedIndex={0}
      type={NAVIGATION_TAB_GROUP_TYPES.CanvasDefault}
      ariaLabel="Navigation tabs"
    />
  </div>
);

// Tabs with Blank Target Navigation Tab Group
const TabsWithBlankTarget = () => (
  <div className={getClassNames('bpk-navigation-tab-group-story')}>
    <BpkNavigationTabGroup
      id="navExample"
      tabs={tabsWithBlankTarget}
      onItemClick={() => {}}
      selectedIndex={2}
      type={NAVIGATION_TAB_GROUP_TYPES.SurfaceContrast}
      ariaLabel="Navigation tabs"
    />
  </div>
);

// Tabs with 'New' Bubble Tab Group
const TabsWithBubble = () => (
  <div className={getClassNames('bpk-navigation-tab-group-story')}>
    <BpkNavigationTabGroup
      id="navExample"
      tabs={tabsWithBubble}
      onItemClick={() => {}}
      selectedIndex={2}
      type={NAVIGATION_TAB_GROUP_TYPES.SurfaceContrast}
      ariaLabel="Navigation tabs"
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
    <BpkText textStyle={TEXT_STYLES.heading3} tagName="h3">
      Tabs with a bubble
    </BpkText>
    <TabsWithBubble />
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
  TabsWithBlankTarget,
  TabsWithBubble,
  VisualTestExample,
};
