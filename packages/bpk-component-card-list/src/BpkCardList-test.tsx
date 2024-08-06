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
import { render, screen } from '@testing-library/react';

import mockCards from '../testMocks';

import BpkCardList from './BpkCardList';

describe('BpkCardList', () => {
  it('should render correctly with grid, stack and no accessory', () => {
    render(
      <BpkCardList
        title="Title"
        description="Description"
        cardList={mockCards(2)}
        layoutDesktop="grid"
        layoutMobile="stack"
      />,
    );

    expect(screen.getByText('Title')).toBeInTheDocument();
    expect(screen.getByText('Description')).toBeInTheDocument();
    expect(screen.queryByTestId('button')).not.toBeInTheDocument();
    expect(
      screen.getByTestId('bpk-card-list--card-list').firstChild,
    ).toHaveClass('bpk-card-list-grid');
    expect(screen.getAllByRole('button', { name: /Card \d/ })).toHaveLength(2);
  });

  it('should render correctly with grid, stack and expand accessory', () => {
    render(
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

    expect(screen.getByText('Title')).toBeInTheDocument();
    expect(screen.getByText('Description')).toBeInTheDocument();
    expect(screen.getByTestId('button')).toHaveTextContent('Expand');
    expect(screen.getByTestId('button')).toHaveClass(
      'bpk-button bpk-button--link',
    );
    expect(
      screen.getByTestId('bpk-card-list--card-list').firstChild,
    ).toHaveClass('bpk-card-list-grid');
    expect(screen.getAllByRole('button', { name: /Card \d/ })).toHaveLength(2);
  });

  it('should render correctly with grid, stack and button accessory', () => {
    render(
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

    expect(screen.getByText('Title')).toBeInTheDocument();
    expect(screen.getByText('Description')).toBeInTheDocument();
    expect(screen.queryAllByRole('button')[0]).toHaveTextContent('Button');
    expect(screen.queryAllByRole('button')[0]).toHaveClass(
      'bpk-button bpk-button--primary',
    );
    expect(screen.getAllByRole('button', { name: /Card \d/ })).toHaveLength(2);
  });

  it('should render correctly with grid, rail and no accessory', () => {
    render(
      <BpkCardList
        title="Title"
        description="Description"
        cardList={mockCards(2)}
        layoutDesktop="grid"
        layoutMobile="rail"
      />,
    );

    expect(screen.getByText('Title')).toBeInTheDocument();
    expect(screen.getByText('Description')).toBeInTheDocument();
    expect(screen.queryByTestId('button')).not.toBeInTheDocument();
    expect(
      screen.getByTestId('bpk-card-list--card-list').firstChild,
    ).toHaveClass('bpk-card-list-grid');
    expect(screen.getAllByRole('button', { name: /Card \d/ })).toHaveLength(2);
  });

  it('should render correctly with grid, rail and expand accessory', () => {
    render(
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

    expect(screen.getByText('Title')).toBeInTheDocument();
    expect(screen.getByText('Description')).toBeInTheDocument();
    expect(screen.queryByTestId('button')).toHaveTextContent('Expand');
    expect(
      screen.getByTestId('bpk-card-list--card-list').firstChild,
    ).toHaveClass('bpk-card-list-grid');
  });

  it('should render correctly with grid, rail and button accessory', () => {
    render(
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

    expect(screen.getByText('Title')).toBeInTheDocument();
    expect(screen.getByText('Description')).toBeInTheDocument();
    expect(screen.queryAllByRole('button')[0]).toHaveTextContent('Button');
    expect(screen.queryAllByRole('button')[0]).toHaveClass(
      'bpk-button bpk-button--primary',
    );
    expect(
      screen.getByTestId('bpk-card-list--card-list').firstChild,
    ).toHaveClass('bpk-card-list-grid');
  });

  it('should render correctly with row, stack and no accessory', () => {
    render(
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

    expect(screen.getByText('Title')).toBeInTheDocument();
    expect(screen.getByText('Description')).toBeInTheDocument();
    expect(screen.queryByTestId('button')).not.toBeInTheDocument();
    expect(
      screen.getByTestId('bpk-card-list--card-list').firstChild,
    ).toHaveClass('bpk-card-list-row');
    expect(screen.getAllByRole('button', { name: /Card \d/ })).toHaveLength(2);
  });

  it('should render correctly with row, rail and pagination accessory', () => {
    render(
      <BpkCardList
        title="Title"
        description="Description"
        cardList={mockCards(6)}
        layoutDesktop="row"
        layoutMobile="rail"
        accessory="pagination"
        ariaLabelIndicator="Go to page"
        ariaLabelNext="Next"
        ariaLabelPrev="Previous"
      />,
    );

    expect(screen.getByText('Title')).toBeInTheDocument();
    expect(screen.getByText('Description')).toBeInTheDocument();
    expect(screen.queryByTestId('button')).not.toBeInTheDocument();
    expect(
      screen.getByTestId('bpk-card-list--card-list').firstChild,
    ).toHaveClass('bpk-card-list-row');
    expect(screen.getAllByRole('button', { name: /Card \d/ })).toHaveLength(6);
    expect(
      screen.getByRole('button', { name: 'Previous' }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Go to page 1' }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Go to page 2' }),
    ).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Next' })).toBeInTheDocument();
  });

  it('should render correctly with row, rail and no accessory', () => {
    render(
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

    expect(screen.queryByTestId('button')).not.toBeInTheDocument();
    expect(
      screen.getByTestId('bpk-card-list--card-list').firstChild,
    ).toHaveClass('bpk-card-list-row');
    expect(screen.getAllByRole('button', { name: /Card \d/ })).toHaveLength(2);
    expect(screen.queryAllByRole('button', { name: 'Previous' })).toHaveLength(
      0,
    );
  });

  it('should render correctly with header, grid, stack and expand accessory', () => {
    render(
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

    expect(screen.getByText('Title')).toBeInTheDocument();
    expect(screen.getByText('Description')).toBeInTheDocument();
    expect(screen.queryByTestId('button')).toHaveTextContent('Expand');
    expect(
      screen.getByTestId('bpk-card-list--card-list').firstChild,
    ).toHaveClass('bpk-card-list-grid');
    expect(screen.getAllByRole('button', { name: /Card \d/ })).toHaveLength(2);
  });

  it('should render correctly with header, grid, stack and no accessory', () => {
    render(
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

    expect(screen.getByText('Title')).toBeInTheDocument();
    expect(screen.getByText('Description')).toBeInTheDocument();
    expect(screen.queryByTestId('button')).not.toBeInTheDocument();
    expect(
      screen.getByTestId('bpk-card-list--card-list').firstChild,
    ).toHaveClass('bpk-card-list-grid');
    expect(screen.getAllByRole('button', { name: /Card \d/ })).toHaveLength(2);
  });

  it('should render correctly with header, grid, rail and expand accessory', () => {
    render(
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

    expect(screen.getByText('Title')).toBeInTheDocument();
    expect(screen.getByText('Description')).toBeInTheDocument();
    expect(screen.queryByTestId('button')).toHaveTextContent('Expand');
    expect(
      screen.getByTestId('bpk-card-list--card-list').firstChild,
    ).toHaveClass('bpk-card-list-grid');
    expect(screen.getAllByRole('button', { name: /Card \d/ })).toHaveLength(2);
  });

  it('should render correctly with header, grid, rail and no accessory', () => {
    render(
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

    expect(screen.getByText('Title')).toBeInTheDocument();
    expect(screen.getByText('Description')).toBeInTheDocument();
    expect(screen.queryByTestId('button')).not.toBeInTheDocument();
    expect(
      screen.getByTestId('bpk-card-list--card-list').firstChild,
    ).toHaveClass('bpk-card-list-grid');
    expect(screen.getAllByRole('button', { name: /Card \d/ })).toHaveLength(2);
  });

  it('should render correctly with header, row, stack and no accessory', () => {
    render(
      <BpkCardList
        title="Title"
        description="Description"
        buttonText="Button"
        onButtonClick={jest.fn()}
        href="https://www.skyscanner.net"
        cardList={mockCards(6)}
        layoutDesktop="row"
        layoutMobile="stack"
        ariaLabelIndicator="Go to page"
        ariaLabelNext="Next"
        ariaLabelPrev="Previous"
      />,
    );

    expect(screen.getByText('Title')).toBeInTheDocument();
    expect(screen.getByText('Description')).toBeInTheDocument();
    expect(screen.queryByTestId('button')).not.toBeInTheDocument();
    expect(
      screen.getByTestId('bpk-card-list--card-list').firstChild,
    ).toHaveClass('bpk-card-list-row');
    expect(screen.getAllByRole('button', { name: /Card \d/ })).toHaveLength(6);
    expect(screen.queryAllByRole('button', { name: 'Previous' })).toHaveLength(
      0,
    );
  });

  it('should render correctly with header, row, rail and pagination accessory', () => {
    render(
      <BpkCardList
        title="Title"
        description="Description"
        buttonText="Button"
        onButtonClick={jest.fn()}
        href="https://www.skyscanner.net"
        cardList={mockCards(6)}
        layoutDesktop="row"
        layoutMobile="rail"
        accessory="pagination"
        ariaLabelIndicator="Go to page"
        ariaLabelNext="Next"
        ariaLabelPrev="Previous"
      />,
    );

    expect(screen.getByText('Title')).toBeInTheDocument();
    expect(screen.getByText('Description')).toBeInTheDocument();
    expect(screen.queryByTestId('button')).not.toBeInTheDocument();
    expect(
      screen.getByTestId('bpk-card-list--card-list').firstChild,
    ).toHaveClass('bpk-card-list-row');
    expect(screen.getAllByRole('button', { name: /Card \d/ })).toHaveLength(6);
    expect(screen.queryAllByRole('button', { name: 'Previous' })).toHaveLength(
      0,
    );
  });

  it('should render correctly with header, row, rail and no accessory', () => {
    render(
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

    expect(screen.getByText('Title')).toBeInTheDocument();
    expect(screen.getByText('Description')).toBeInTheDocument();
    expect(screen.queryByTestId('button')).not.toBeInTheDocument();
    expect(
      screen.getByTestId('bpk-card-list--card-list').firstChild,
    ).toHaveClass('bpk-card-list-row');
    expect(screen.getAllByRole('button', { name: /Card \d/ })).toHaveLength(2);
    expect(screen.queryAllByRole('button', { name: 'Previous' })).toHaveLength(
      0,
    );
  });
});
