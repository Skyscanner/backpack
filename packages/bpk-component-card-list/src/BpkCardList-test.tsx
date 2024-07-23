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

import mockCards from '../testMocks';

import BpkCardList from './BpkCardList';

describe('BpkCardList', () => {
  it('should render correctly with grid, stack and no accessory', () => {
    const { asFragment } = render(
      <BpkCardList
        title="Title"
        description="Description"
        cardList={mockCards(2)}
        layoutDesktop="grid"
        layoutMobile="stack"
      />,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly with grid, stack and expand accessory', () => {
    const { asFragment } = render(
      <BpkCardList
        title="Title"
        description="Description"
        cardList={mockCards(3)}
        layoutDesktop="grid"
        layoutMobile="stack"
        initiallyShownCards={2}
        accessory="expand"
        expandText="Expand"
        onButtonClick={jest.fn()}
      />,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly with grid, stack and button accessory', () => {
    const { asFragment } = render(
      <BpkCardList
        title="Title"
        description="Description"
        cardList={mockCards(3)}
        layoutDesktop="grid"
        layoutMobile="stack"
        initiallyShownCards={2}
        accessory="button"
        buttonText="Button"
        onButtonClick={jest.fn()}
        href="https://www.skyscanner.net"
      />,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly with grid, rail and no accessory', () => {
    const { asFragment } = render(
      <BpkCardList
        title="Title"
        description="Description"
        cardList={mockCards(2)}
        layoutDesktop="grid"
        layoutMobile="rail"
      />,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly with grid, rail and expand accessory', () => {
    const { asFragment } = render(
      <BpkCardList
        title="Title"
        description="Description"
        cardList={mockCards(3)}
        layoutDesktop="grid"
        layoutMobile="rail"
        initiallyShownCards={2}
        accessory="expand"
        expandText="Expand"
        onButtonClick={jest.fn()}
      />,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly with grid, rail and button accessory', () => {
    const { asFragment } = render(
      <BpkCardList
        title="Title"
        description="Description"
        cardList={mockCards(3)}
        layoutDesktop="grid"
        layoutMobile="rail"
        initiallyShownCards={2}
        accessory="button"
        buttonText="Button"
        onButtonClick={jest.fn()}
        href="https://www.skyscanner.net"
      />,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly with row, stack and no accessory', () => {
    const { asFragment } = render(
      <BpkCardList
        title="Title"
        description="Description"
        cardList={mockCards(2)}
        layoutDesktop="row"
        layoutMobile="stack"
        ariaLabelIndicator="Go to page"
        ariaLabelNext="Next"
        ariaLabelPrev="Previous"
      />,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly with row, rail and pagination accessory', () => {
    const { asFragment } = render(
      <BpkCardList
        title="Title"
        description="Description"
        cardList={mockCards(3)}
        layoutDesktop="row"
        layoutMobile="rail"
        accessory="pagination"
        ariaLabelIndicator="Go to page"
        ariaLabelNext="Next"
        ariaLabelPrev="Previous"
      />,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly with row, rail and no accessory', () => {
    const { asFragment } = render(
      <BpkCardList
        title="Title"
        description="Description"
        cardList={mockCards(2)}
        layoutDesktop="row"
        layoutMobile="rail"
        ariaLabelIndicator="Go to page"
        ariaLabelNext="Next"
        ariaLabelPrev="Previous"
      />,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly with header, grid, stack and expand accessory', () => {
    const { asFragment } = render(
      <BpkCardList
        title="Title"
        description="Description"
        buttonText="Button"
        onButtonClick={jest.fn()}
        href="https://www.skyscanner.net"
        cardList={mockCards(3)}
        layoutDesktop="grid"
        layoutMobile="stack"
        initiallyShownCards={2}
        accessory="expand"
        expandText="Expand"
      />,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly with header, grid, stack and no accessory', () => {
    const { asFragment } = render(
      <BpkCardList
        title="Title"
        description="Description"
        buttonText="Button"
        onButtonClick={jest.fn()}
        href="https://www.skyscanner.net"
        cardList={mockCards(2)}
        layoutDesktop="grid"
        layoutMobile="stack"
      />,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly with header, grid, rail and expand accessory', () => {
    const { asFragment } = render(
      <BpkCardList
        title="Title"
        description="Description"
        buttonText="Button"
        onButtonClick={jest.fn()}
        href="https://www.skyscanner.net"
        cardList={mockCards(3)}
        layoutDesktop="grid"
        layoutMobile="rail"
        initiallyShownCards={2}
        accessory="expand"
        expandText="Expand"
      />,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly with header, grid, rail and no accessory', () => {
    const { asFragment } = render(
      <BpkCardList
        title="Title"
        description="Description"
        buttonText="Button"
        onButtonClick={jest.fn()}
        href="https://www.skyscanner.net"
        cardList={mockCards(2)}
        layoutDesktop="grid"
        layoutMobile="rail"
      />,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly with header, row, stack and no accessory', () => {
    const { asFragment } = render(
      <BpkCardList
        title="Title"
        description="Description"
        buttonText="Button"
        onButtonClick={jest.fn()}
        href="https://www.skyscanner.net"
        cardList={mockCards(2)}
        layoutDesktop="row"
        layoutMobile="stack"
        ariaLabelIndicator="Go to page"
        ariaLabelNext="Next"
        ariaLabelPrev="Previous"
      />,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly with header, row, rail and pagination accessory', () => {
    const { asFragment } = render(
      <BpkCardList
        title="Title"
        description="Description"
        buttonText="Button"
        onButtonClick={jest.fn()}
        href="https://www.skyscanner.net"
        cardList={mockCards(3)}
        layoutDesktop="row"
        layoutMobile="rail"
        accessory="pagination"
        ariaLabelIndicator="Go to page"
        ariaLabelNext="Next"
        ariaLabelPrev="Previous"
      />,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly with header, row, rail and no accessory', () => {
    const { asFragment } = render(
      <BpkCardList
        title="Title"
        description="Description"
        buttonText="Button"
        onButtonClick={jest.fn()}
        href="https://www.skyscanner.net"
        cardList={mockCards(2)}
        layoutDesktop="row"
        layoutMobile="rail"
        ariaLabelIndicator="Go to page"
        ariaLabelNext="Next"
        ariaLabelPrev="Previous"
      />,
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
