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
import React from 'react';
import TOKENS from '@skyscanner/bpk-foundations-web/tokens/base.common';
import { configure, addDecorator } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import { withA11y } from '@storybook/addon-a11y';

import 'bpk-stylesheets';
import 'bpk-stylesheets/font';

import BpkGridToggle from '../packages/bpk-component-grid-toggle';
import BpkRtlToggle from '../packages/bpk-component-rtl-toggle';
import BpkThemeToggle, {
  updateOnThemeChange,
} from '../packages/bpk-component-theme-toggle';
import BpkThemeProvider from '../packages/bpk-theming';

import themeableAttributes from './themeableAttributes';

const EnhancedThemeProvider = updateOnThemeChange(BpkThemeProvider);

addDecorator(withA11y);
addDecorator(withKnobs);
addDecorator((story) => (
  <div style={{ padding: TOKENS.spacingBase }}>
    <EnhancedThemeProvider themeAttributes={themeableAttributes}>
      {story()}
    </EnhancedThemeProvider>
    <br />
    <BpkGridToggle />
    <br />
    <BpkRtlToggle />
    <br />
    <div style={{ width: '10rem' }}>
      <BpkThemeToggle />
    </div>
  </div>
));

/* eslint-disable global-require */
configure(() => {
  require('../examples/bpk-animate-height/stories');
  require('../examples/bpk-component-accordion/stories');
  require('../examples/bpk-component-aria-live/stories');
  require('../examples/bpk-component-autosuggest/stories');
  require('../examples/bpk-component-badge/stories');
  require('../examples/bpk-component-banner-alert/stories');
  require('../examples/bpk-component-barchart/stories');
  require('../examples/bpk-component-blockquote/stories');
  require('../examples/bpk-component-breadcrumb/stories');
  require('../examples/bpk-component-breakpoint/stories');
  require('../examples/bpk-component-button/stories');
  require('../examples/bpk-component-calendar/stories');
  require('../examples/bpk-component-card/stories');
  require('../examples/bpk-component-checkbox/stories');
  require('../examples/bpk-component-chip/stories');
  require('../examples/bpk-component-close-button/stories');
  require('../examples/bpk-component-code/stories');
  require('../examples/bpk-component-content-container/stories');
  require('../examples/bpk-component-datatable/stories');
  require('../examples/bpk-component-datepicker/stories');
  require('../examples/bpk-component-description-list/stories');
  require('../examples/bpk-component-dialog/stories');
  require('../examples/bpk-component-drawer/stories');
  require('../examples/bpk-component-fieldset/stories');
  require('../examples/bpk-component-flare/stories');
  require('../examples/bpk-component-floating-notification/stories');
  require('../examples/bpk-component-form-validation/stories');
  require('../examples/bpk-component-graphic-promotion/stories');
  require('../examples/bpk-component-grid-toggle/stories');
  require('../examples/bpk-component-grid/stories');
  require('../examples/bpk-component-horizontal-nav/stories');
  require('../examples/bpk-component-icon/stories');
  require('../examples/bpk-component-image/stories');
  require('../examples/bpk-component-infinite-scroll/stories');
  require('../examples/bpk-component-input/stories');
  require('../examples/bpk-component-label/stories');
  require('../examples/bpk-component-link/stories');
  require('../examples/bpk-component-list/stories');
  require('../examples/bpk-component-loading-button/stories');
  require('../examples/bpk-component-map/stories');
  require('../examples/bpk-component-mobile-scroll-container/stories');
  require('../examples/bpk-component-modal/stories');
  require('../examples/bpk-component-navigation-bar/stories');
  require('../examples/bpk-component-nudger/stories');
  require('../examples/bpk-component-overlay/stories');
  require('../examples/bpk-component-pagination/stories');
  require('../examples/bpk-component-panel/stories');
  require('../examples/bpk-component-phone-input/stories');
  require('../examples/bpk-component-popover/stories');
  require('../examples/bpk-component-price/stories');
  require('../examples/bpk-component-progress/stories');
  require('../examples/bpk-component-radio/stories');
  require('../examples/bpk-component-rating/stories');
  require('../examples/bpk-component-rtl-toggle/stories');
  require('../examples/bpk-component-scrollable-calendar/stories');
  require('../examples/bpk-component-section-list/stories');
  require('../examples/bpk-component-select/stories');
  require('../examples/bpk-component-skip-link/stories');
  require('../examples/bpk-component-slider/stories');
  require('../examples/bpk-component-spinner/stories');
  require('../examples/bpk-component-split-input/stories');
  require('../examples/bpk-component-star-rating/stories');
  require('../examples/bpk-component-switch/stories');
  require('../examples/bpk-component-table/stories');
  require('../examples/bpk-component-text/stories');
  require('../examples/bpk-component-textarea/stories');
  require('../examples/bpk-component-ticket/stories');
  require('../examples/bpk-component-tooltip/stories');
  require('../examples/bpk-component-content-cards/stories');
}, module);
/* eslint-enable */
