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

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { ArrayDataSource } from './DataSource';
import withInfiniteScroll from './withInfiniteScroll';

const nextTick = () => new Promise((res) => setTimeout(res, 0));
const mockDataSource = (data) => {
  const myDs = new ArrayDataSource(data);
  const mockFetch = myDs.fetchItems.bind(myDs);
  myDs.fetchItems = jest.fn((...args) => mockFetch(...args));
  return myDs;
};

describe('withInfiniteScroll', () => {
  const elementsArray = [];

  for (let i = 0; i < 5; i += 1) {
    elementsArray.push(`Element ${i}`);
  }

  const List = (props) => (
    <div id="list">
      {props.elements.map((element) => (
        <div key={element}>{element}</div>
      ))}
    </div>
  );

  List.propTypes = {
    elements: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.string),
      PropTypes.arrayOf(PropTypes.number),
    ]).isRequired,
  };

  const InfiniteList = withInfiniteScroll(List);
  let intersect;
  let currentOptions = {};

  beforeEach(() => {
    global.IntersectionObserver = class {
      constructor(callback, options) {
        intersect = async () => callback([{ isIntersecting: true }]);
        currentOptions = options;
      }

      observe() {}

      unobserve() {}
    };
  });

  it('renders an empty list for the first render', () => {
    const { asFragment } = render(
      <InfiniteList dataSource={new ArrayDataSource(elementsArray)} />,
    );

    expect(asFragment()).toMatchSnapshot();
  });

  it('renders items after the first render', async () => {
    const { asFragment } = render(
      <InfiniteList dataSource={new ArrayDataSource(elementsArray)} />,
    );
    await intersect();

    expect(asFragment()).toMatchSnapshot();
  });

  it('renders correctly with different initial and onScroll numbers', () => {
    const { asFragment } = render(
      <InfiniteList
        dataSource={new ArrayDataSource(elementsArray)}
        initiallyLoadedElements={3}
        elementsPerScroll={2}
      />,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly when no more elements', async () => {
    const { asFragment } = render(
      <InfiniteList dataSource={new ArrayDataSource(elementsArray)} />,
    );

    await intersect();
    await intersect();

    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly with an "elementsPerScroll" attribute', async () => {
    const { asFragment } = render(
      <InfiniteList
        dataSource={new ArrayDataSource(elementsArray)}
        elementsPerScroll={1}
      />,
    );

    await intersect();

    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly with a "renderSeeMoreComponent" attribute', async () => {
    const { asFragment } = render(
      <InfiniteList
        dataSource={new ArrayDataSource(elementsArray)}
        elementsPerScroll={1}
        renderSeeMoreComponent={({ onSeeMoreClick }) => (
          <button type="button" onClick={onSeeMoreClick}>
            see more
          </button>
        )}
        seeMoreAfter={0}
      />,
    );

    await intersect();

    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly with a "renderLoadingComponent" attribute', () => {
    const { asFragment } = render(
      <InfiniteList
        dataSource={new ArrayDataSource(elementsArray)}
        renderLoadingComponent={() => <span>Loading</span>}
      />,
    );

    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly with a "loaderIntersectionTrigger" attribute', () => {
    const { asFragment } = render(
      <InfiniteList
        dataSource={new ArrayDataSource(elementsArray)}
        renderLoadingComponent={() => <span>Loading</span>}
        loaderIntersectionTrigger="small"
      />,
    );

    expect(asFragment()).toMatchSnapshot();
  });

  it('should create the IntersectionObserver with a 0.01 threshold if the prop is set to "small"', () => {
    render(
      <InfiniteList
        dataSource={new ArrayDataSource(elementsArray)}
        renderLoadingComponent={() => <span>Loading</span>}
        loaderIntersectionTrigger="small"
      />,
    );

    expect(currentOptions).toEqual({ threshold: 0.01 });
  });

  it('should create the IntersectionObserver with a 0.5 threshold if the prop is set to "half"', () => {
    render(
      <InfiniteList
        dataSource={new ArrayDataSource(elementsArray)}
        renderLoadingComponent={() => <span>Loading</span>}
        loaderIntersectionTrigger="half"
      />,
    );

    expect(currentOptions).toEqual({ threshold: 0.5 });
  });

  it('should create the IntersectionObserver with a 0.99 threshold if the prop is set to "full"', () => {
    render(
      <InfiniteList
        dataSource={new ArrayDataSource(elementsArray)}
        renderLoadingComponent={() => <span>Loading</span>}
        loaderIntersectionTrigger="full"
      />,
    );

    expect(currentOptions).toEqual({ threshold: 0.99 });
  });

  it('should create the IntersectionObserver with a 0.99 threshold if the prop is not set', () => {
    render(<InfiniteList dataSource={new ArrayDataSource(elementsArray)} />);

    expect(currentOptions).toEqual({ threshold: 0.99 });
  });

  it('should pass extra props to the decorated component', () => {
    const { asFragment } = render(
      <InfiniteList
        dataSource={new ArrayDataSource(elementsArray)}
        aria-label="Test"
      />,
    );

    expect(asFragment()).toMatchSnapshot();
  });

  it('should call onScroll on intersection fired', async () => {
    const spy = jest.fn();
    render(
      <InfiniteList
        dataSource={new ArrayDataSource(elementsArray)}
        onScroll={spy}
      />,
    );

    await intersect();

    expect(spy).toHaveBeenCalledWith({
      currentIndex: 0,
    });
  });

  it('should call onScrollFinished when no more elements to render', async () => {
    const spy = jest.fn();
    render(
      <InfiniteList
        dataSource={new ArrayDataSource([1, 2])}
        onScrollFinished={spy}
        elementsPerScroll={2}
      />,
    );
    await nextTick();
    await intersect();
    await intersect();

    expect(spy).toHaveBeenCalledWith({
      totalNumberElements: 2,
    });
  });

  it('should fetch more items when see more is clicked', async () => {
    const myDs = mockDataSource(elementsArray);

    render(
      <InfiniteList
        dataSource={myDs}
        elementsPerScroll={1}
        renderSeeMoreComponent={({ onSeeMoreClick }) => (
          <button type="button" id="test-button" onClick={onSeeMoreClick}>
            see more
          </button>
        )}
        seeMoreAfter={0}
      />,
    );
    await nextTick();
    await intersect();
    const button = screen.getByRole('button');
    userEvent.click(button);
    expect(myDs.fetchItems).toHaveBeenCalledTimes(2);
  });

  it('should refresh data when data changes', async () => {
    const myDs = mockDataSource(elementsArray);

    const { asFragment } = render(<InfiniteList dataSource={myDs} />);
    await nextTick();

    myDs.updateData([1, 2, 3]);
    await nextTick();

    expect(myDs.fetchItems).toHaveBeenCalledTimes(2);
    expect(asFragment()).toMatchSnapshot();
  });

  it('should refresh data when data changes from an empty Array', async () => {
    const myDs = mockDataSource(elementsArray);

    const { asFragment } = render(<InfiniteList dataSource={myDs} />);
    await nextTick();

    myDs.updateData([1, 2, 3]);
    await nextTick();

    expect(myDs.fetchItems).toHaveBeenCalledTimes(2);
    expect(asFragment()).toMatchSnapshot();
  });

  it('should finish the list when array changes to empty', async () => {
    const myDs = mockDataSource(elementsArray);

    const onFinished = jest.fn();

    const { asFragment } = render(
      <InfiniteList
        dataSource={myDs}
        seeMoreAfter={0}
        elementsPerScroll={1}
        onScrollFinished={onFinished}
      />,
    );
    await nextTick();

    myDs.updateData([]);
    await nextTick();

    expect(myDs.fetchItems).toHaveBeenCalledTimes(2);
    expect(onFinished).toHaveBeenCalled();
    expect(asFragment()).toMatchSnapshot();
  });

  it('should refresh when data source changes', async () => {
    const myDs = mockDataSource(elementsArray);

    const { rerender } = render(<InfiniteList dataSource={myDs} />);

    await nextTick();

    const newDs = mockDataSource([1, 2, 3]);

    rerender(<InfiniteList dataSource={newDs} />);
    await nextTick();

    expect(myDs.fetchItems).toHaveBeenCalled();
    expect(newDs.fetchItems).toHaveBeenCalled();
  });

  it('should refresh data when data source changes from an empty data source', async () => {
    const myDs = mockDataSource([]);

    const { rerender } = render(<InfiniteList dataSource={myDs} />);

    await nextTick();

    const newDs = mockDataSource([1, 2, 3]);

    rerender(<InfiniteList dataSource={newDs} />);

    await nextTick();

    expect(myDs.fetchItems).toHaveBeenCalled();
    expect(newDs.fetchItems).toHaveBeenCalled();
  });

  it('should finish the list when data source changes to an empty data source', async () => {
    const myDs = mockDataSource(elementsArray);

    const onFinished = jest.fn();

    const { rerender } = render(
      <InfiniteList
        dataSource={myDs}
        seeMoreAfter={0}
        elementsPerScroll={1}
        onScrollFinished={onFinished}
      />,
    );
    await nextTick();

    const newDs = mockDataSource([]);

    rerender(
      <InfiniteList
        dataSource={newDs}
        seeMoreAfter={0}
        elementsPerScroll={1}
        onScrollFinished={onFinished}
      />,
    );
    await nextTick();

    expect(myDs.fetchItems).toHaveBeenCalled();
    expect(newDs.fetchItems).toHaveBeenCalled();
    expect(onFinished).toHaveBeenCalled();
  });

  it('should finish the list when data source returns less than the number of elements requested', async () => {
    const myDs = mockDataSource(elementsArray);

    const onFinished = jest.fn();

    render(
      <InfiniteList
        dataSource={myDs}
        elementsPerScroll={3}
        initiallyLoadedElements={3}
        onScrollFinished={onFinished}
      />,
    );
    await nextTick();
    await intersect();
    await intersect();

    expect(myDs.fetchItems).toHaveBeenCalledTimes(3);
    expect(onFinished).toHaveBeenCalled();
  });
});
