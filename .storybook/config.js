import React from 'react';
import { configure, addDecorator } from '@storybook/react';

import '../packages/bpk-stylesheets';
import TOKENS from './../packages/bpk-tokens/tokens/base.common';
import BpkGridToggle from './../packages/bpk-component-grid-toggle';
import BpkRtlToggle from './../packages/bpk-component-rtl-toggle';

const VARIABLE_NAMES = [
'primaryColor',
'primaryContrastColor',
'primaryDarkColor',
'primaryDarkContastColor',
'primaryLightColor',
'primaryLightContastColor',
'primaryGradientStartColor',
'primaryGradientEndColor',
'secondaryColor',
'secondaryContrastColor',
'secondaryDarkColor',
'secondaryDarkContastColor',
'secondaryLightColor',
'secondaryLightContastColor',
'secondaryGradientStartColor',
'secondaryGradientEndColor',
]

const THEMES = {
  base: {},
  custom: {
    primaryColor: '#FFBC2C',
    primaryContrastColor: '#fff',
    primaryDarkColor: '#d69814',
    primaryDarkContastColor: '#fff',
    primaryLightColor: '#ffd884',
    primaryLightContastColor: '#4D4D4D',
    primaryGradientStartColor: '#FFBC2C',
    primaryGradientEndColor: '#d69814',
    secondaryColor: '#86B86B',
    secondaryContrastColor: '#fff',
    secondaryDarkColor: '#76a85B',
    secondaryDarkContastColor: '#fff',
    secondaryLightColor: '#96c87B',
    secondaryLightContastColor: '#4D4D4D',
    secondaryGradientStartColor: '#86B86B',
    secondaryGradientEndColor: '#76a85B',
  },
  gazorpazorp: {
    primaryColor: '#F23557',
    primaryContrastColor: '#fff',
    primaryDarkColor: '#bf2944',
    primaryDarkContastColor: '#fff',
    primaryLightColor: '#ff6581',
    primaryLightContastColor: '#3B4A6B',
    primaryGradientStartColor: '#F23557',
    primaryGradientEndColor: '#ff6581',
    secondaryColor: '#F0D43A',
    secondaryContrastColor: '#3B4A6B',
    secondaryDarkColor: '#caaf1c',
    secondaryDarkContastColor: '#3B4A6B',
    secondaryLightColor: '#f9e264',
    secondaryLightContastColor: '#3B4A6B',
    secondaryGradientStartColor: '#F0D43A',
    secondaryGradientEndColor: '#3B4A6B',
  }
};

class ThemeProvider extends React.Component {
  updateCssVariables() {
    VARIABLE_NAMES.forEach(variableName => {
      const cssName = variableName.replace(/([A-Z])/g, function($1){
        return "-"+$1.toLowerCase();
      });
      this.div.style.setProperty(`--${cssName}`, this.props.theme[variableName]);
    });
  }
  componentDidMount() {
    this.updateCssVariables();
  }
  componentDidUpdate() {
    this.updateCssVariables();
  }
  render() {
    return (<div ref={div => {this.div = div}}>
      {this.props.children}
    </div>);
  }
}

class ThemeSelector extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      theme: 'base'
    };
    this.changeTheme = this.changeTheme.bind(this);
  }
  changeTheme(e) {
    this.setState({
      theme: e.target.value
    });
  }
  render() {
    return <div>
      <label for="select-theme">Select theme:</label>
      <select name="select-theme" id="select-theme" value={this.state.theme} onChange={this.changeTheme}>
        {Object.keys(THEMES).map(themeName => <option value={themeName} key={themeName}>{themeName}</option>)}
      </select>
      <ThemeProvider theme={THEMES[this.state.theme]}>
        {this.props.children}
      </ThemeProvider>
    </div>
  }
}

addDecorator(story => (
  <div style={{ padding: TOKENS.spacingBase }}>
    <ThemeSelector>{story()}</ThemeSelector>
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
