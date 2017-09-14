import React from 'react';

import BpkSelect from './packages/bpk-component-select';
import BpkLabel from './packages/bpk-component-label';

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
  Skyscanner: {},
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
    primaryLightColor: '#f17477',
    primaryLightContastColor: '#333333',
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
  KLM: {
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
    primaryLightColor: '#8fd1ec',
    primaryLightContastColor: '#333333',
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
  componentDidMount() {
    this.updateCssVariables();
  }

  componentDidUpdate() {
    this.updateCssVariables();
  }

  updateCssVariables() {
    VARIABLE_NAMES.forEach((variableName) => {
      const cssName = variableName.replace(/([A-Z])/g, variable => '-' + variable.toLowerCase());

      if (this.props.theme[variableName]) {
        this.div.style.setProperty(`--${cssName}`, this.props.theme[variableName]);
      } else {
        this.div.style.setProperty(`--${cssName}`, '');
      }
    });
  }

  render() {
    return (<div ref={div => { this.div = div }} style={{ paddingTop: '.75rem' }}>
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

export default ThemeSelector;
