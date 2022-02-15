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
import { render } from '@testing-library/react';

import BpkSelect from './BpkSelect';

const svgPlaceholder = `data:image/svg+xml;charset=utf-8,%3Csvg xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg' viewBox%3D'0 0 200 150'%2F%3E`;
const selectImage = (
  <img alt="placeholder" className="image-class-name" src={svgPlaceholder} />
);

describe('BpkSelect', () => {
  it('should render correctly', () => {
    const { asFragment } = render(
      <BpkSelect
        id="fruits"
        name="fruits"
        value="oranges"
        onChange={() => null}
      >
        <option value="apples">Apples</option>
        <option value="oranges">Oranges</option>
        <option value="pears">Pears</option>
        <option value="tomatoes" disabled>
          Tomatoes
        </option>
      </BpkSelect>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly with image', () => {
    const { asFragment } = render(
      <BpkSelect
        id="fruits"
        name="fruits"
        value="oranges"
        image={selectImage}
        onChange={() => null}
      >
        <option value="apples">Apples</option>
        <option value="oranges">Oranges</option>
        <option value="pears">Pears</option>
        <option value="tomatoes" disabled>
          Tomatoes
        </option>
      </BpkSelect>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly with image and custom classes', () => {
    const { asFragment } = render(
      <BpkSelect
        id="fruits"
        name="fruits"
        value="oranges"
        wrapperClassName="wrapperClass--test"
        image={selectImage}
        onChange={() => null}
      >
        <option value="apples">Apples</option>
        <option value="oranges">Oranges</option>
        <option value="pears">Pears</option>
        <option value="tomatoes" disabled>
          Tomatoes
        </option>
      </BpkSelect>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly with image and "disabled" property', () => {
    const { asFragment } = render(
      <BpkSelect
        id="fruits"
        name="fruits"
        value="oranges"
        wrapperClassName="wrapperClass--test"
        image={selectImage}
        disabled
        onChange={() => null}
      >
        <option value="apples">Apples</option>
        <option value="oranges">Oranges</option>
        <option value="pears">Pears</option>
        <option value="tomatoes" disabled>
          Tomatoes
        </option>
      </BpkSelect>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly with "className" attribute', () => {
    const { asFragment } = render(
      <BpkSelect
        id="fruits"
        name="fruits"
        value="oranges"
        onChange={() => null}
        className="test"
      >
        <option value="apples">Apples</option>
        <option value="oranges">Oranges</option>
        <option value="pears">Pears</option>
        <option value="tomatoes" disabled>
          Tomatoes
        </option>
      </BpkSelect>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly with a "valid" attribute equal to false', () => {
    const { asFragment } = render(
      <BpkSelect
        id="fruits"
        name="fruits"
        value="oranges"
        onChange={() => null}
        valid={false}
      >
        <option value="apples">Apples</option>
        <option value="oranges">Oranges</option>
        <option value="pears">Pears</option>
        <option value="tomatoes" disabled>
          Tomatoes
        </option>
      </BpkSelect>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly with "large" attribute', () => {
    const { asFragment } = render(
      <BpkSelect id="fruits" name="fruits" value="" onChange={() => null} large>
        <option value="apples">Apples</option>
        <option value="oranges">Oranges</option>
        <option value="pears">Pears</option>
        <option value="tomatoes" disabled>
          Tomatoes
        </option>
      </BpkSelect>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly with "docked" attribute', () => {
    const { asFragment } = render(
      <BpkSelect
        id="fruits"
        name="fruits"
        value=""
        onChange={() => null}
        docked
      >
        <option value="apples">Apples</option>
        <option value="oranges">Oranges</option>
        <option value="pears">Pears</option>
        <option value="tomatoes" disabled>
          Tomatoes
        </option>
      </BpkSelect>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly with "dockedFirst" attribute', () => {
    const { asFragment } = render(
      <BpkSelect
        id="fruits"
        name="fruits"
        value=""
        onChange={() => null}
        dockedFirst
      >
        <option value="apples">Apples</option>
        <option value="oranges">Oranges</option>
        <option value="pears">Pears</option>
        <option value="tomatoes" disabled>
          tomatos
        </option>
      </BpkSelect>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly with "dockedMiddle" attribute', () => {
    const { asFragment } = render(
      <BpkSelect
        id="fruits"
        name="fruits"
        value=""
        onChange={() => null}
        dockedMiddle
      >
        <option value="apples">Apples</option>
        <option value="oranges">Oranges</option>
        <option value="pears">Pears</option>
        <option value="tomatoes" disabled>
          Tomatoes
        </option>
      </BpkSelect>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly with "dockedLast" attribute', () => {
    const { asFragment } = render(
      <BpkSelect
        id="fruits"
        name="fruits"
        value=""
        onChange={() => null}
        dockedLast
      >
        <option value="apples">Apples</option>
        <option value="oranges">Oranges</option>
        <option value="pears">Pears</option>
        <option value="tomatoes" disabled>
          Tomatoes
        </option>
      </BpkSelect>,
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
