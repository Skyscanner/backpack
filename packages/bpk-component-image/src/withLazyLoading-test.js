/*
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2017 Skyscanner Ltd
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
import { shallow, mount } from 'enzyme';
import withLazyLoading from './withLazyLoading';

const createDocumentMock = () => {
  const mock = jest.fn();

  mock.addEventListener = jest.fn();
  mock.removeEventListener = jest.fn();
  mock.documentElement = jest.fn();

  return mock;
};

describe('withLazyLoading', () => {
  it('should return the original component', () => {
    const documentMock = createDocumentMock();
    const MockImageComponent = () => <div>Fake Image</div>;
    const LazyLoadedImage = withLazyLoading(MockImageComponent, documentMock);

    const lazyLoadedImage = shallow(<LazyLoadedImage />, {
      disableLifecycleMethods: true,
    });
    expect(lazyLoadedImage.first().is(MockImageComponent));
  });

  it('should add inView prop', () => {
    const documentMock = createDocumentMock();
    const MockImageComponent = () => <div>Fake Image</div>;
    const LazyLoadedImage = withLazyLoading(MockImageComponent, documentMock);

    const lazyLoadedImage = shallow(<LazyLoadedImage />, {
      disableLifecycleMethods: true,
    });
    expect(lazyLoadedImage.hasOwnProperty('inView')); // eslint-disable-line no-prototype-builtins
  });

  it('scroll listener args should be correct when mounting', () => {
    const documentMock = createDocumentMock();

    const MockImageComponent = () => <div>Fake Image</div>;
    const LazyLoadedImage = withLazyLoading(MockImageComponent, documentMock);

    mount(<LazyLoadedImage />);

    expect(documentMock.addEventListener.mock.calls.length).toBe(4);
    expect(documentMock.addEventListener.mock.calls[0][0]).toEqual('scroll');
    expect(documentMock.addEventListener.mock.calls[0][2]).toEqual({
      capture: true,
    });
  });

  it('scroll listener args should be correct when unmounting', () => {
    const documentMock = createDocumentMock();

    const MockImageComponent = () => <div>Fake Image</div>;
    const LazyLoadedImage = withLazyLoading(MockImageComponent, documentMock);

    mount(<LazyLoadedImage />).unmount();

    expect(documentMock.removeEventListener.mock.calls.length).toBe(4);
    expect(documentMock.removeEventListener.mock.calls[0][0]).toEqual('scroll');
    expect(documentMock.removeEventListener.mock.calls[0][2]).toEqual({
      capture: true,
    });
  });
});
