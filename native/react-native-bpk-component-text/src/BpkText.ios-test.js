import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';

import BpkText, { TEXT_STYLES } from './BpkText';

jest.mock('react-native', () => {
  const reactNative = require.requireActual('react-native');
  jest
    .spyOn(reactNative.Platform, 'select')
    .mockImplementation(obj => obj.ios || obj.default);
  reactNative.Platform.OS = 'ios';

  return reactNative;
});


describe('iOS', () => {
  describe('BpkText', () => {
    it('should render correctly', () => {
      const tree = renderer.create(
        <BpkText>
          Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean
          commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus
          et magnis dis parturient montes, nascetur ridiculus mus.
        </BpkText>,
      ).toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('should support overwriting styles', () => {
      const tree = renderer.create(
        <BpkText style={{ color: 'red' }}>
          Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean
          commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus
          et magnis dis parturient montes, nascetur ridiculus mus.
        </BpkText>,
      ).toJSON();
      expect(tree).toMatchSnapshot();
    });

    TEXT_STYLES.forEach((textStyle) => {
      it(`should render correctly with textStyle="${textStyle}"`, () => {
        const tree = renderer.create(
          <BpkText textStyle={textStyle}>
            Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean
            commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus
            et magnis dis parturient montes, nascetur ridiculus mus.
          </BpkText>,
        ).toJSON();
        expect(tree).toMatchSnapshot();
      });
    });
  });
});
