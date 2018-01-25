/*
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2018 Skyscanner Ltd
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

/* @flow */

import {
  titlePropType,
  onClosePropType,
  modalOnClosePropType,
} from './customPropTypes';

describe('titlePropType', () => {
  it('should fail if show header is true and there is no title', () => {
    const result = titlePropType(
      { showHeader: true },
      'title',
      'BpkModalDialog',
    );

    expect(result).toEqual(expect.any(Error));
  });

  it('should return null for valid data', () => {
    const result = titlePropType(
      { title: 'Modal title', showHeader: true },
      'title',
      'BpkModalDialog',
    );

    expect(result).toBeNull();
  });

  it('should be valid to pass no title if showHeader is false', () => {
    const result = titlePropType(
      { showHeader: false },
      'title',
      'BpkModalDialog',
    );

    expect(result).toBeNull();
  });
});

describe('onClosePropType', () => {
  it('should fail if showHeader is true and there is onClose', () => {
    const result = onClosePropType(
      { showHeader: true },
      'onClose',
      'BpkModalDialog',
    );

    expect(result).toEqual(expect.any(Error));
  });

  it('should return null for valid data', () => {
    const result = onClosePropType(
      { onClose: () => null, showHeader: true },
      'onClose',
      'BpkModalDialog',
    );

    expect(result).toBeNull();
  });

  it('should be valid to pass no onClose if showHeader is false', () => {
    const result = onClosePropType(
      { showHeader: false },
      'onClose',
      'BpkModalDialog',
    );

    expect(result).toBeNull();
  });
});

describe('modalOnClosePropType', () => {
  it('should fail if closeOnEscPressed is true and there is no onClose', () => {
    const result = modalOnClosePropType(
      {
        showHeader: false,
        closeOnScrimClick: false,
        closeOnEscPressed: true,
      },
      'onClose',
      'BpkModalDialog',
    );

    expect(result).toEqual(expect.any(Error));
  });

  it('should return null for valid data', () => {
    const result = modalOnClosePropType(
      {
        onClose: () => null,
        showHeader: true,
        closeOnScrimClick: true,
        closeOnEscPressed: true,
      },
      'onClose',
      'BpkModalDialog',
    );

    expect(result).toBeNull();
  });

  it('should be valid to pass no onClose if showHeader, closeOnScrimClick and closeOnEscPressed is false', () => {
    const result = modalOnClosePropType(
      {
        showHeader: false,
        closeOnScrimClick: false,
        closeOnEscPressed: false,
      },
      'onClose',
      'BpkModalDialog',
    );

    expect(result).toBeNull();
  });
});
