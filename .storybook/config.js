import React from 'react';
import { configure, addDecorator } from '@kadira/storybook';

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
  require('./../packages/bpk-component-autosuggest/stories');
  require('./../packages/bpk-component-badge/stories');
  require('./../packages/bpk-component-banner-alert/stories');
  require('./../packages/bpk-component-blockquote/stories');
  require('./../packages/bpk-component-breakpoint/stories');
  require('./../packages/bpk-component-button/stories');
  require('./../packages/bpk-component-calendar/stories');
  require('./../packages/bpk-component-card/stories');
  require('./../packages/bpk-component-checkbox/stories');
  require('./../packages/bpk-component-close-button/stories');
  require('./../packages/bpk-component-code/stories');
  require('./../packages/bpk-component-content-container/stories');
  require('./../packages/bpk-component-datepicker/stories');
  require('./../packages/bpk-component-grid/stories');
  require('./../packages/bpk-component-grid-toggle/stories');
  require('./../packages/bpk-component-heading/stories');
  require('./../packages/bpk-component-icon/stories');
  require('./../packages/bpk-component-input/stories');
  require('./../packages/bpk-component-label/stories');
  require('./../packages/bpk-component-link/stories');
  require('./../packages/bpk-component-list/stories');
  require('./../packages/bpk-component-logo/stories');
  require('./../packages/bpk-component-modal/stories');
  require('./../packages/bpk-component-paragraph/stories');
  require('./../packages/bpk-component-popover/stories');
  require('./../packages/bpk-component-radio/stories');
  require('./../packages/bpk-component-router-link/stories');
  require('./../packages/bpk-component-rtl-toggle/stories');
  require('./../packages/bpk-component-select/stories');
  require('./../packages/bpk-component-spinner/stories');
  require('./../packages/bpk-component-table/stories');
}, module);
/* eslint-enable */
