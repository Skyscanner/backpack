import React from 'react';
import { configure, addDecorator } from '@storybook/react';

import '../packages/bpk-stylesheets';
import TOKENS from './../packages/bpk-tokens/tokens/base.common';
import BpkGridToggle from './../packages/bpk-component-grid-toggle';
import BpkRtlToggle from './../packages/bpk-component-rtl-toggle';
import BpkSelect from './../packages/bpk-component-select';
import BpkLabel from './../packages/bpk-component-label';

const VARIABLE_NAMES = [
  'ctaColor',
  'ctaContrastColor',
  'ctaDarkColor',
  'ctaDarkContastColor',
  'ctaLightColor',
  'ctaLightContastColor',
  'ctaGradientStartColor',
  'ctaGradientEndColor',
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
];

const THEMES = {
  'Skyscanner': {},
  'British Airways': {
    ctaColor: '#eb2226',
    ctaContrastColor: '#ffffff',
    ctaDarkColor: '#b81a1c',
    ctaDarkContastColor: '#ffffff',
    ctaLightColor: '#EC2D31',
    ctaLightContastColor: '#ffffff',
    ctaGradientStartColor: '#eb2226',
    ctaGradientEndColor: '#eb2226',
    primaryColor: '#eb2226',
    primaryContrastColor: '#ffffff',
    primaryDarkColor: '#b81a1c',
    primaryDarkContastColor: '#ffffff',
    primaryLightColor: '#EC2D31',
    primaryLightContastColor: '#ffffff',
    primaryGradientStartColor: '#eb2226',
    primaryGradientEndColor: '#eb2226',
    secondaryColor: '#075AAA',
    secondaryContrastColor: '#ffffff',
    secondaryDarkColor: '#054898',
    secondaryDarkContastColor: '#fff',
    secondaryLightColor: '#086CBB',
    secondaryLightContastColor: '#4D4D4D',
    secondaryGradientStartColor: '#075AAA',
    secondaryGradientEndColor: '#075AAA',
    primaryButtonBorderRadius: '2px',
    primaryButtonLargeBorderRadius: '4px',
  },
  'KLM': {
    ctaColor: '#00A1E4',
    ctaContrastColor: '#ffffff',
    ctaDarkColor: '#0091CD',
    ctaDarkContastColor: '#ffffff',
    ctaLightColor: '#0DA5E5',
    ctaLightContastColor: '#ffffff',
    ctaGradientStartColor: '#00A1E4',
    ctaGradientEndColor: '#00A1E4',
    primaryColor: '#00A1E4',
    primaryContrastColor: '#ffffff',
    primaryDarkColor: '#0091CD',
    primaryDarkContastColor: '#ffffff',
    primaryLightColor: '#0DA5E5',
    primaryLightContastColor: '#ffffff',
    primaryGradientStartColor: '#00A1E4',
    primaryGradientEndColor: '#00A1E4',
    secondaryColor: '#E77B2F',
    secondaryContrastColor: '#ffffff',
    secondaryDarkColor: '#CF6E2A',
    secondaryDarkContastColor: '#ffffff',
    secondaryLightColor: '#E88138',
    secondaryLightContastColor: '#ffffff',
    secondaryGradientStartColor: '#E77B2F',
    secondaryGradientEndColor: '#E77B2F',
  },
};

class ThemeProvider extends React.Component {
  updateCssVariables() {
    VARIABLE_NAMES.forEach(variableName => {
      const cssName = variableName.replace(/([A-Z])/g, function($1){
        return "-"+$1.toLowerCase();
      });

      if (this.props.theme[variableName]) {
        this.div.style.setProperty(`--${cssName}`, this.props.theme[variableName]);
      } else {
        this.div.style.setProperty(`--${cssName}`, '');
      }
    });
  }
  componentDidMount() {
    this.updateCssVariables();
  }
  componentDidUpdate() {
    this.updateCssVariables();
  }
  render() {
    return (<div ref={div => {this.div = div}} style={{ paddingTop: '.75rem' }}>
      {this.props.children}
    </div>);
  }
}

class ThemeSelector extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      theme: 'Skyscanner'
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
      <form style={{ width: '60%' }}>
        <BpkLabel for="select-theme">Select theme:</BpkLabel>
        <BpkSelect name="select-theme" id="select-theme" value={this.state.theme} onChange={this.changeTheme}>
          {Object.keys(THEMES).map(themeName => <option value={themeName} key={themeName}>{themeName}</option>)}
        </BpkSelect>
      </form>
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
