/*
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2016-2021 Skyscanner Ltd
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
import PropTypes from 'prop-types';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';

import withInfiniteScroll from './withInfiniteScroll';
import { ArrayDataSource } from './DataSource';

const nextTick = () => new Promise(res => setImmediate(res));
const mockDataSource = data => {
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

  const List = props => (
    <div id="list">
      {props.elements.map(element => (
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

      observe() {} // eslint-disable-line class-methods-use-this

      unobserve() {} // eslint-disable-line class-methods-use-this
    };
  });

  it('renders an empty list for the first render', () => {
    const tree = renderer.create(
      <InfiniteList dataSource={new ArrayDataSource(elementsArray)} />,
    );

    expect(tree).toMatchSnapshot();
  });

  it('renders items after the first render', async () => {
    const tree = mount(
      <InfiniteList dataSource={new ArrayDataSource(elementsArray)} />,
    );

    await intersect();
    tree.update();

    expect(toJson(tree)).toMatchSnapshot();
  });

  it('renders correctly with different initial and onScroll numbers', () => {
    const tree = mount(
      <InfiniteList
        dataSource={new ArrayDataSource(elementsArray)}
        initiallyLoadedElements={3}
        elementsPerScroll={2}
      />,
    );
    expect(toJson(tree)).toMatchSnapshot();
  });

  it('should render correctly when no more elements', async () => {
    const tree = mount(
      <InfiniteList dataSource={new ArrayDataSource(elementsArray)} />,
    );

    await intersect();
    tree.update();
    await intersect();
    tree.update();

    expect(toJson(tree)).toMatchSnapshot();
  });

  it('should render correctly with an "elementsPerScroll" attribute', async () => {
    const tree = mount(
      <InfiniteList
        dataSource={new ArrayDataSource(elementsArray)}
        elementsPerScroll={1}
      />,
    );

    await intersect();
    tree.update();

    expect(toJson(tree)).toMatchSnapshot();
  });

  it('should render correctly with a "renderSeeMoreComponent" attribute', async () => {
    const tree = mount(
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
    tree.update();

    expect(toJson(tree)).toMatchSnapshot();
  });

  it('should render correctly with a "renderLoadingComponent" attribute', () => {
    const tree = mount(
      <InfiniteList
        dataSource={new ArrayDataSource(elementsArray)}
        renderLoadingComponent={() => <span>Loading</span>}
      />,
    );

    expect(toJson(tree)).toMatchSnapshot();
  });

  it('should render correctly with a "loaderIntersectionTrigger" attribute', () => {
    const tree = mount(
      <InfiniteList
        dataSource={new ArrayDataSource(elementsArray)}
        renderLoadingComponent={() => <span>Loading</span>}
        loaderIntersectionTrigger="small"
      />,
    );

    expect(toJson(tree)).toMatchSnapshot();
  });

  it('should create the IntersectionObserver with a 0.01 threshold if the prop is set to "small"', () => {
    mount(
      <InfiniteList
        dataSource={new ArrayDataSource(elementsArray)}
        renderLoadingComponent={() => <span>Loading</span>}
        loaderIntersectionTrigger="small"
      />,
    );

    expect(currentOptions).toEqual({ threshold: 0.01 });
  });

  it('should create the IntersectionObserver with a 0.5 threshold if the prop is set to "half"', () => {
    mount(
      <InfiniteList
        dataSource={new ArrayDataSource(elementsArray)}
        renderLoadingComponent={() => <span>Loading</span>}
        loaderIntersectionTrigger="half"
      />,
    );

    expect(currentOptions).toEqual({ threshold: 0.5 });
  });

  it('should create the IntersectionObserver with a 0.99 threshold if the prop is set to "full"', () => {
    mount(
      <InfiniteList
        dataSource={new ArrayDataSource(elementsArray)}
        renderLoadingComponent={() => <span>Loading</span>}
        loaderIntersectionTrigger="full"
      />,
    );

    expect(currentOptions).toEqual({ threshold: 0.99 });
  });

  it('should create the IntersectionObserver with a 0.99 threshold if the prop is not set', () => {
    mount(<InfiniteList dataSource={new ArrayDataSource(elementsArray)} />);

    expect(currentOptions).toEqual({ threshold: 0.99 });
  });

  it('should pass extra props to the decorated component', () => {
    const tree = mount(
      <InfiniteList
        dataSource={new ArrayDataSource(elementsArray)}
        aria-label="Test"
      />,
    );

    expect(toJson(tree)).toMatchSnapshot();
  });

  it('should call onScroll on intersection fired', async () => {
    const spy = jest.fn();
    mount(
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
    mount(
      <InfiniteList
        dataSource={new ArrayDataSource([1, 2])}
        onScrollFinished={spy}
        elementsPerScroll={2}
      />,
    );

    await intersect();
    await intersect();

    expect(spy).toHaveBeenCalledWith({
      totalNumberElements: 2,
    });
  });

  it('should fetch more items when see more is clicked', async () => {
    const myDs = mockDataSource(elementsArray);

    const tree = mount(
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

    await intersect();
    tree.update();

    const button = tree.find('#test-button');
    button.simulate('click');
    expect(myDs.fetchItems).toHaveBeenCalledTimes(3);
  });

  it('should refresh data when data changes', async () => {
    const myDs = mockDataSource(elementsArray);

    const tree = mount(<InfiniteList dataSource={myDs} />);
    await nextTick();

    myDs.updateData([1, 2, 3]);
    await nextTick();
    tree.update();

    expect(myDs.fetchItems).toHaveBeenCalledTimes(2);
    expect(toJson(tree)).toMatchSnapshot();
  });

  it('should refresh data when data changes from an empty Array', async () => {
    const myDs = mockDataSource(elementsArray);

    const tree = mount(<InfiniteList dataSource={myDs} />);
    await nextTick();

    myDs.updateData([1, 2, 3]);
    await nextTick();
    tree.update();

    expect(myDs.fetchItems).toHaveBeenCalledTimes(2);
    expect(toJson(tree)).toMatchSnapshot();
  });

  it('should finish the list when array changes to empty', async () => {
    const myDs = mockDataSource(elementsArray);

    const onFinished = jest.fn();

    const tree = mount(
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
    tree.update();

    expect(myDs.fetchItems).toHaveBeenCalledTimes(2);
    expect(onFinished).toHaveBeenCalled();
    expect(toJson(tree)).toMatchSnapshot();
  });

  it('should refresh when data source changes', async () => {
    const myDs = mockDataSource(elementsArray);

    const tree = mount(<InfiniteList dataSource={myDs} />);
    await nextTick();

    const newDs = mockDataSource([1, 2, 3]);

    tree.setProps({ dataSource: newDs });
    await nextTick();
    tree.update();

    expect(myDs.fetchItems).toHaveBeenCalled();
    expect(newDs.fetchItems).toHaveBeenCalled();
    expect(toJson(tree)).toMatchSnapshot();
  });

  it('should refresh data when data source changes from an empty data source', async () => {
    const myDs = mockDataSource([]);

    const tree = mount(<InfiniteList dataSource={myDs} />);
    await nextTick();

    const newDs = mockDataSource([1, 2, 3]);

    tree.setProps({ dataSource: newDs });
    await nextTick();
    tree.update();

    expect(myDs.fetchItems).toHaveBeenCalled();
    expect(newDs.fetchItems).toHaveBeenCalled();
    expect(toJson(tree)).toMatchSnapshot();
  });

  it('should finish the list when data source changes to an empty data source', async () => {
    const myDs = mockDataSource(elementsArray);

    const onFinished = jest.fn();

    const tree = mount(
      <InfiniteList
        dataSource={myDs}
        seeMoreAfter={0}
        elementsPerScroll={1}
        onScrollFinished={onFinished}
      />,
    );
    await nextTick();
    tree.update();

    const newDs = mockDataSource([]);

    tree.setProps({ dataSource: newDs });
    await nextTick();
    tree.update();

    expect(myDs.fetchItems).toHaveBeenCalled();
    expect(newDs.fetchItems).toHaveBeenCalled();
    expect(onFinished).toHaveBeenCalled();
    expect(toJson(tree)).toMatchSnapshot();
  });

  it('should finish the list when data source returns less than the number of elements requested', async () => {
    const myDs = mockDataSource(elementsArray);

    const onFinished = jest.fn();

    const tree = mount(
      <InfiniteList
        dataSource={myDs}
        elementsPerScroll={3}
        initiallyLoadedElements={3}
        onScrollFinished={onFinished}
      />,
    );
    await intersect();
    await intersect();

    expect(myDs.fetchItems).toHaveBeenCalledTimes(3);
    expect(onFinished).toHaveBeenCalled();
    expect(toJson(tree)).toMatchSnapshot();
  });
});
