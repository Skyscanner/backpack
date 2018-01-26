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

import clearablePropType from './customPropTypes';

describe('clearablePropType', () => {
  const COMPONENT_NAME = 'ExampleComponent';

  describe('"onClear"', () => {
    const PROP_NAME = 'onClear';

    it('should not produce an error when "clearable" is not provided', () => {
      const props = {};
      expect(clearablePropType(props, PROP_NAME, COMPONENT_NAME)).toBeFalsy();
    });

    it('should not produce an error when "clearable={false}"', () => {
      const props = {
        clearable: false,
      };
      expect(clearablePropType(props, PROP_NAME, COMPONENT_NAME)).toBeFalsy();
    });

    it('should produce an error when "clearable={true}" and "onClear" is not provided', () => {
      const props = {
        clearable: true,
      };
      expect(
        clearablePropType(props, PROP_NAME, COMPONENT_NAME).toString(),
      ).toEqual(
        'Error: Invalid prop `onClear` supplied to `ExampleComponent`. When `clearable={true}`, `onClear` must be supplied.',
      );
    });

    it('should produce an error when "clearable={true}" and "onClear" is null', () => {
      const props = {
        clearable: true,
        onClear: null,
      };
      expect(
        clearablePropType(props, PROP_NAME, COMPONENT_NAME).toString(),
      ).toEqual(
        'Error: Invalid prop `onClear` supplied to `ExampleComponent`. When `clearable={true}`, `onClear` must be supplied.',
      );
    });

    it('should produce an error when "clearable={true}" and "onClear" is not a function', () => {
      const props = {
        clearable: true,
        onClear: 'Hello world',
      };
      expect(
        clearablePropType(props, PROP_NAME, COMPONENT_NAME).toString(),
      ).toEqual(
        'Error: Invalid prop `onClear` supplied to `ExampleComponent`. `onClear` must be a function.',
      );
    });
  });

  describe('"clearButtonLabel"', () => {
    const PROP_NAME = 'clearButtonLabel';

    it('should not produce an error when "clearable" is not provided', () => {
      const props = {};
      expect(clearablePropType(props, PROP_NAME, COMPONENT_NAME)).toBeFalsy();
    });

    it('should not produce an error when "clearable={false}"', () => {
      const props = {
        clearable: false,
      };
      expect(clearablePropType(props, PROP_NAME, COMPONENT_NAME)).toBeFalsy();
    });

    it('should produce an error when "clearable={true}" and "clearButtonLabel" is not provided', () => {
      const props = {
        clearable: true,
      };
      expect(
        clearablePropType(props, PROP_NAME, COMPONENT_NAME).toString(),
      ).toEqual(
        'Error: Invalid prop `clearButtonLabel` supplied to `ExampleComponent`. When `clearable={true}`, `clearButtonLabel` must be supplied.',
      );
    });

    it('should produce an error when "clearable={true}" and "clearButtonLabel" is null', () => {
      const props = {
        clearable: true,
        clearButtonLabel: null,
      };
      expect(
        clearablePropType(props, PROP_NAME, COMPONENT_NAME).toString(),
      ).toEqual(
        'Error: Invalid prop `clearButtonLabel` supplied to `ExampleComponent`. When `clearable={true}`, `clearButtonLabel` must be supplied.',
      );
    });

    it('should produce an error when "clearable={true}" and "clearButtonLabel" is not a string', () => {
      const props = {
        clearable: true,
        clearButtonLabel: 42,
      };
      expect(
        clearablePropType(props, PROP_NAME, COMPONENT_NAME).toString(),
      ).toEqual(
        'Error: Invalid prop `clearButtonLabel` supplied to `ExampleComponent`. `clearButtonLabel` must be a string.',
      );
    });
  });

  describe('neither', () => {
    const PROP_NAME = 'foo';
    it('should produce no error when "clearable={true}" but the prop name is neither clearButtonLabel or onClear', () => {
      const props = {
        clearable: true,
        foo: 'bar',
      };
      expect(clearablePropType(props, PROP_NAME, COMPONENT_NAME)).toBeFalsy();
    });
  });
});
