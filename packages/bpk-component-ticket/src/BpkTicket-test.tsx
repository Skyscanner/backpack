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

import { render } from '@testing-library/react';

import BpkTicket from './BpkTicket';

describe('BpkTicket', () => {
  it('should render correctly', () => {
    const { asFragment } = render(
      <BpkTicket stub="Ticket stub">
        Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo
        ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis
        dis parturient montes, nascetur ridiculus mus.
      </BpkTicket>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly with an "href" attribute', () => {
    const { asFragment } = render(
      <BpkTicket stub="Ticket stub" href="//www.skyscanner.net">
        Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo
        ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis
        dis parturient montes, nascetur ridiculus mus.
      </BpkTicket>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly with "padded" attribute equal to "false"', () => {
    const { asFragment } = render(
      <BpkTicket stub="Ticket stub" padded={false}>
        Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo
        ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis
        dis parturient montes, nascetur ridiculus mus.
      </BpkTicket>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly with "padded" attribute equal to "false" and a "vertical" attribute', () => {
    const { asFragment } = render(
      <BpkTicket stub="Ticket stub" vertical padded={false}>
        Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo
        ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis
        dis parturient montes, nascetur ridiculus mus.
      </BpkTicket>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly with a "vertical" attribute', () => {
    const { asFragment } = render(
      <BpkTicket stub="Ticket stub" vertical>
        Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo
        ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis
        dis parturient montes, nascetur ridiculus mus.
      </BpkTicket>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly with a "className" attribute', () => {
    const { asFragment } = render(
      <BpkTicket stub="Ticket stub" className="custom-class">
        Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo
        ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis
        dis parturient montes, nascetur ridiculus mus.
      </BpkTicket>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly with a "stubClassName" attribute', () => {
    const { asFragment } = render(
      <BpkTicket stub="Ticket stub" stubClassName="custom-class">
        Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo
        ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis
        dis parturient montes, nascetur ridiculus mus.
      </BpkTicket>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly with a "stubProps" attribute', () => {
    const stubProps = {
      foo: 'bar',
    };
    const { asFragment } = render(
      <BpkTicket
        stub="Ticket stub"
        stubClassName="custom-class"
        stubProps={stubProps}
      >
        Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo
        ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis
        dis parturient montes, nascetur ridiculus mus.
      </BpkTicket>,
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
