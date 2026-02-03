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
// @ts-nocheck



import { render } from '@testing-library/react';

import FlightIcon from '../../bpk-component-icon/lg/flight';

import BpkAutosuggestSuggestion from './BpkAutosuggestSuggestion';

describe('BpkAutosuggestSuggestion', () => {
  it('should render correctly', () => {
    const { asFragment } = render(
      <BpkAutosuggestSuggestion value="Edinburgh" />,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly with a "subHeading" attribute', () => {
    const { asFragment } = render(
      <BpkAutosuggestSuggestion
        value="Edinburgh"
        subHeading="United Kingdom"
      />,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly with a "tertiaryLabel" attribute', () => {
    const { asFragment } = render(
      <BpkAutosuggestSuggestion
        value="Edinburgh"
        subHeading="United Kingdom"
        tertiaryLabel="Scotland"
      />,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly with a "tertiaryLabel" attribute but without a "subHeading" attribute', () => {
    const { asFragment } = render(
      <BpkAutosuggestSuggestion value="Edinburgh" tertiaryLabel="Scotland" />,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly with a "tertiaryLabel" but without a "subHeading" attribute when using hanzi', () => {
    const { asFragment } = render(
      <BpkAutosuggestSuggestion
        value="深圳寶安國際"
        tertiaryLabel="三級標籤"
      />,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly with an "icon" attribute', () => {
    const { asFragment } = render(
      <BpkAutosuggestSuggestion value="Edinburgh" icon={FlightIcon} />,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly with an "indent" attribute', () => {
    const { asFragment } = render(
      <BpkAutosuggestSuggestion value="Edinburgh" indent />,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly with all available attributes', () => {
    const { asFragment } = render(
      <BpkAutosuggestSuggestion
        value="Edinburgh"
        subHeading="United Kingdom"
        tertiaryLabel="Scotland"
        icon={FlightIcon}
        indent
      />,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly with a "className" attribute', () => {
    const { asFragment } = render(
      <BpkAutosuggestSuggestion
        value="Edinburgh"
        className="custom-class-1 custom-class-2"
      />,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly with a "value" attribute being an element', () => {
    const { asFragment } = render(
      <BpkAutosuggestSuggestion value={<strong>Edinburgh</strong>} />,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly with a "subHeading" attribute being an element', () => {
    const { asFragment } = render(
      <BpkAutosuggestSuggestion
        value="Edinburgh"
        subHeading={<strong>United Kingdom</strong>}
      />,
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
