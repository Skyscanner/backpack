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

import PropTypes from 'prop-types';
import { Component } from 'react';

import { render } from '@testing-library/react';

import { colorWhite } from '@skyscanner/bpk-foundations-web/tokens/base.es6';

import BpkThemeProvider from './BpkThemeProvider';

const CustomComponentFunction = ({ children, ...rest }) => (
  <span {...rest}>{children}</span>
);

CustomComponentFunction.propTypes = {
  children: PropTypes.node.isRequired,
};

// eslint-disable-next-line react/prefer-stateless-function
class CustomComponentClass extends Component {
  render() {
    const { children, ...rest } = this.props;
    return <span {...rest}>{children}</span>;
  }
}

CustomComponentClass.propTypes = {
  children: PropTypes.node.isRequired,
};

describe('BpkThemeProvider', () => {
  it('should render correctly', () => {
    const { asFragment } = render(
      <BpkThemeProvider
        theme={{ color: colorWhite }}
        themeAttributes={['color']}
      >
        <p>Lorem Ipsum</p>
      </BpkThemeProvider>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly with custom native component', () => {
    const { asFragment } = render(
      <BpkThemeProvider
        theme={{ color: colorWhite }}
        themeAttributes={['color']}
        component="header"
      >
        <p>Lorem Ipsum</p>
      </BpkThemeProvider>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly with custom component function', () => {
    const { asFragment } = render(
      <BpkThemeProvider
        theme={{ color: colorWhite }}
        themeAttributes={['color']}
        component={CustomComponentFunction}
      >
        <p>Lorem Ipsum</p>
      </BpkThemeProvider>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly with custom component', () => {
    const { asFragment } = render(
      <BpkThemeProvider
        theme={{ color: colorWhite }}
        themeAttributes={['color']}
        component={CustomComponentClass}
      >
        <p>Lorem Ipsum</p>
      </BpkThemeProvider>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly with arbitrary props', () => {
    const { asFragment } = render(
      <BpkThemeProvider
        theme={{ color: colorWhite }}
        themeAttributes={['color']}
        id="arbitrary"
      >
        <p>Lorem Ipsum</p>
      </BpkThemeProvider>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly with arbitrary user defined style', () => {
    const { asFragment } = render(
      <BpkThemeProvider
        theme={{ color: colorWhite }}
        themeAttributes={['color']}
        style={{ content: 'user defined' }}
      >
        <p>Lorem Ipsum</p>
      </BpkThemeProvider>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should correctly flatten the themeAttribute prop', () => {
    const { asFragment } = render(
      <BpkThemeProvider
        theme={{ color: colorWhite, background: 'black' }}
        themeAttributes={[['color'], ['background']]}
      >
        <p>Lorem Ipsum</p>
      </BpkThemeProvider>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render without theming when theme is missing attributes', () => {
    jest.spyOn(console, 'error').mockImplementation(() => jest.fn());
    const { asFragment } = render(
      <BpkThemeProvider theme={{}} themeAttributes={['color']}>
        <p>Lorem Ipsum</p>
      </BpkThemeProvider>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should strip out extraneous theme attributes', () => {
    jest.spyOn(console, 'error').mockImplementation(() => jest.fn());
    const { asFragment } = render(
      <BpkThemeProvider
        theme={{ a: 'a', color: colorWhite }}
        themeAttributes={['color']}
      >
        <p>Lorem Ipsum</p>
      </BpkThemeProvider>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should warn about missing theme attributes', () => {
    expect(
      // eslint-disable-next-line react/forbid-foreign-prop-types
      BpkThemeProvider.propTypes
        .themeAttributes(
          {
            theme: {},
            themeAttributes: ['one'],
          },
          'themeAttributes',
          'BpkThemeProvider',
        )
        .toString(),
    ).toEqual(
      'Error: BpkThemeProvider: To apply theming, the theme prop must include `one` (missing `one`)',
    );
  });

  it('should warn about extraneous theme attributes', () => {
    expect(
      // eslint-disable-next-line react/forbid-foreign-prop-types
      BpkThemeProvider.propTypes
        .themeAttributes(
          {
            theme: { one: 'a', two: 'a' },
            themeAttributes: ['one'],
          },
          'themeAttributes',
          'BpkThemeProvider',
        )
        .toString(),
    ).toEqual(
      'Error: BpkThemeProvider: Extraneous theme attributes supplied: `two`.',
    );
  });
});
