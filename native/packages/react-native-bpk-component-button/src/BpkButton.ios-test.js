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

 import { Image } from 'react-native';
 import React from 'react';
 import renderer from 'react-test-renderer';

 import BpkButton, { BUTTON_TYPES } from './BpkButton';

 jest.mock('react-native', () => {
   const reactNative = require.requireActual('react-native');
   jest
     .spyOn(reactNative.Platform, 'select')
     .mockImplementation(obj => obj.ios || obj.default);
   reactNative.Platform.OS = 'ios';

   return reactNative;
 });

 jest.mock('Image', () => 'Image');

 describe('iOS', () => {
   describe('BpkButton', () => {
     it('should render correctly', () => {
       const tree = renderer.create(
         <BpkButton title="Lorem ipsum" onPress={() => {}} />,
       ).toJSON();
       expect(tree).toMatchSnapshot();
     });

     it('should support the "large" property', () => {
       const tree = renderer.create(
         <BpkButton large title="Lorem ipsum" onPress={() => {}} />,
       ).toJSON();
       expect(tree).toMatchSnapshot();
     });

     it('should support the "selected" property', () => {
       const tree = renderer.create(
         <BpkButton selected title="Lorem ipsum" onPress={() => {}} />,
       ).toJSON();
       expect(tree).toMatchSnapshot();
     });

     it('should support the "disabled" property', () => {
       const tree = renderer.create(
         <BpkButton large title="Lorem ipsum" onPress={() => {}} />,
       ).toJSON();
       expect(tree).toMatchSnapshot();
     });

     it('should support having an icon as well as a title', () => {
       const tree = renderer.create(
         <BpkButton
           icon={<Image source="../rightarrow_360.png" />}
           title="Lorem ipsum"
           onPress={() => {}}
         />,
       ).toJSON();
       expect(tree).toMatchSnapshot();
     });

     it('should support having only an icon', () => {
       const tree = renderer.create(
         <BpkButton
           icon={<Image source="../rightarrow_360.png" />}
           onPress={() => {}}
         />,
       ).toJSON();
       expect(tree).toMatchSnapshot();
     });

     it('should support overwriting styles', () => {
       const tree = renderer.create(
         <BpkButton title="Lorem ipsum" onPress={() => {}} style={{ width: 100 }} />,
       ).toJSON();
       expect(tree).toMatchSnapshot();
     });

     BUTTON_TYPES.forEach((buttonType) => {
       it(`should render correctly with type="${buttonType}"`, () => {
         const tree = renderer.create(
           <BpkButton type={buttonType} title="Lorem ipsum" onPress={() => {}} />,
         ).toJSON();
         expect(tree).toMatchSnapshot();
       });
     });
   });
 });
