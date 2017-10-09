import React from 'react';
import { configure, addDecorator } from '@storybook/react';

import '../packages/bpk-stylesheets';
import TOKENS from './../packages/bpk-tokens/tokens/base.common';
import BpkGridToggle from './../packages/bpk-component-grid-toggle';
import BpkRtlToggle from './../packages/bpk-component-rtl-toggle';

addDecorator(story => (
  <div style={{ padding: TOKENS.spacingBase }}>
    {story()}
    <br />
    <BpkGridToggle />
    <br />
    <BpkRtlToggle />
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
  require('./../packages/bpk-component-breakpoint/stories');
  require('./../packages/bpk-component-button/stories');
  require('./../packages/bpk-component-calendar/stories');
  require('./../packages/bpk-component-card/stories');
  require('./../packages/bpk-component-checkbox/stories');
  require('./../packages/bpk-component-chip/stories');
  require('./../packages/bpk-component-close-button/stories');
  require('./../packages/bpk-component-code/stories');
  require('./../packages/bpk-component-content-container/stories');
  require('./../packages/bpk-component-datepicker/stories');
  require('./../packages/bpk-component-datatable/stories');
  require('./../packages/bpk-component-fieldset/stories');
  require('./../packages/bpk-component-form-validation/stories');
  require('./../packages/bpk-component-grid/stories');
  require('./../packages/bpk-component-grid-toggle/stories');
  require('./../packages/bpk-component-heading/stories');
  require('./../packages/bpk-component-horizontal-nav/stories');
  require('./../packages/bpk-component-icon/stories');
  require('./../packages/bpk-component-image/stories');
  require('./../packages/bpk-component-input/stories');
  require('./../packages/bpk-component-label/stories');
  require('./../packages/bpk-component-link/stories');
  require('./../packages/bpk-component-list/stories');
  require('./../packages/bpk-component-loading-button/stories');
  require('./../packages/bpk-component-mobile-scroll-container/stories');
  require('./../packages/bpk-component-modal/stories');
  require('./../packages/bpk-component-nudger/stories');
  require('./../packages/bpk-component-panel/stories');
  require('./../packages/bpk-component-paragraph/stories');
  require('./../packages/bpk-component-popover/stories');
  require('./../packages/bpk-component-progress/stories');
  require('./../packages/bpk-component-radio/stories');
  require('./../packages/bpk-component-router-link/stories');
  require('./../packages/bpk-component-rtl-toggle/stories');
  require('./../packages/bpk-component-select/stories');
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
