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
import { configure, addDecorator } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';

import '../packages/bpk-stylesheets/base';
import '../packages/bpk-stylesheets/base.css';
import TOKENS from '../packages/bpk-tokens/tokens/base.common';
import BpkGridToggle from '../packages/bpk-component-grid-toggle';
import BpkRtlToggle from '../packages/bpk-component-rtl-toggle';
import BpkThemeToggle, {
  updateOnThemeChange,
} from '../packages/bpk-component-theme-toggle';
import BpkThemeProvider from '../packages/bpk-theming';
import themeableAttributes from './themeableAttributes';

const EnhancedThemeProvider = updateOnThemeChange(BpkThemeProvider);

addDecorator(withKnobs);
addDecorator(story => (
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
  require('./../packages/bpk-animate-height/stories');
  require('./../packages/bpk-component-accordion/stories');
  require('./../packages/bpk-component-autosuggest/stories');
  require('./../packages/bpk-component-badge/stories');
  require('./../packages/bpk-component-banner-alert/stories');
  require('./../packages/bpk-component-barchart/stories');
  require('./../packages/bpk-component-blockquote/stories');
  require('./../packages/bpk-component-breadcrumb/stories');
  require('./../packages/bpk-component-breakpoint/stories');
  require('./../packages/bpk-component-button/stories');
  require('./../packages/bpk-component-calendar/stories');
  require('./../packages/bpk-component-card/stories');
  require('./../packages/bpk-component-checkbox/stories');
  require('./../packages/bpk-component-chip/stories');
  require('./../packages/bpk-component-close-button/stories');
  require('./../packages/bpk-component-code/stories');
  require('./../packages/bpk-component-content-container/stories');
  require('./../packages/bpk-component-datatable/stories');
  require('./../packages/bpk-component-datepicker/stories');
  require('./../packages/bpk-component-description-list/stories');
  require('./../packages/bpk-component-dialog/stories');
  require('./../packages/bpk-component-drawer/stories');
  require('./../packages/bpk-component-fieldset/stories');
  require('./../packages/bpk-component-form-validation/stories');
  require('./../packages/bpk-component-grid-toggle/stories');
  require('./../packages/bpk-component-grid/stories');
  require('./../packages/bpk-component-heading/stories');
  require('./../packages/bpk-component-horizontal-nav/stories');
  require('./../packages/bpk-component-icon/stories');
  require('./../packages/bpk-component-image/stories');
  require('./../packages/bpk-component-infinite-scroll/stories');
  require('./../packages/bpk-component-input/stories');
  require('./../packages/bpk-component-label/stories');
  require('./../packages/bpk-component-link/stories');
  require('./../packages/bpk-component-list/stories');
  require('./../packages/bpk-component-loading-button/stories');
  require('./../packages/bpk-component-map/stories');
  require('./../packages/bpk-component-mobile-scroll-container/stories');
  require('./../packages/bpk-component-modal/stories');
  require('./../packages/bpk-component-navigation-bar/stories');
  require('./../packages/bpk-component-navigation-stack/stories');
  require('./../packages/bpk-component-nudger/stories');
  require('./../packages/bpk-component-pagination/stories');
  require('./../packages/bpk-component-panel/stories');
  require('./../packages/bpk-component-paragraph/stories');
  require('./../packages/bpk-component-phone-input/stories');
  require('./../packages/bpk-component-popover/stories');
  require('./../packages/bpk-component-progress/stories');
  require('./../packages/bpk-component-radio/stories');
  require('./../packages/bpk-component-router-link/stories');
  require('./../packages/bpk-component-rtl-toggle/stories');
  require('./../packages/bpk-component-scrollable-calendar/stories');
  require('./../packages/bpk-component-section-list/stories');
  require('./../packages/bpk-component-select/stories');
  require('./../packages/bpk-component-slider/stories');
  require('./../packages/bpk-component-spinner/stories');
  require('./../packages/bpk-component-star-rating/stories');
  require('./../packages/bpk-component-table/stories');
  require('./../packages/bpk-component-text/stories');
  require('./../packages/bpk-component-textarea/stories');
  require('./../packages/bpk-component-ticket/stories');
  require('./../packages/bpk-component-tile/stories');
  require('./../packages/bpk-component-tooltip/stories');
  require('./../packages/bpk-mixins/stories');
}, module);
/* eslint-enable */
