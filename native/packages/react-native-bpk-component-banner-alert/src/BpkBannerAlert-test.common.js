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

import React from 'react';
import renderer from 'react-test-renderer';
import BpkText from 'react-native-bpk-component-text';
import { spacingSm } from 'bpk-tokens/tokens/base.react.native';

import { ALERT_TYPES } from './common-types';
import BpkBannerAlert from './BpkBannerAlert';

const commonTests = () => {
  // Fake timer is needed to prevent Animation warning during the tests
  jest.useFakeTimers();

  describe('BpkBannerAlert', () => {
    Object.keys(ALERT_TYPES).forEach(alertType => {
      it(`should render correctly with type equal to ${alertType}`, () => {
        const tree = renderer
          .create(
            <BpkBannerAlert
              type={ALERT_TYPES[alertType]}
              message={`${alertType} alert.`}
            />,
          )
          .toJSON();
        expect(tree).toMatchSnapshot();
      });
    });

    it('should render correctly with dismissable', () => {
      const tree = renderer
        .create(
          <BpkBannerAlert
            type={ALERT_TYPES.neutral}
            message="Neutral alert."
            dismissable
            dismissButtonLabel="Dismiss"
            onDismiss={() => null}
          />,
        )
        .toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('should render correctly with children provided (expandable)', () => {
      const tree = renderer
        .create(
          <BpkBannerAlert
            type={ALERT_TYPES.neutral}
            message="Neutral alert."
            toggleExpandedButtonLabel="Expand"
          >
            <BpkText textStyle="sm">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
              sagittis sagittis purus, id blandit ipsum. Pellentesque nec diam
              nec erat condimentum dapibus. Nunc diam augue, egestas id egestas
              ut, facilisis nec mi. Donec et congue odio, nec laoreet est.
              Integer rhoncus varius arcu, a fringilla libero laoreet at.
            </BpkText>
          </BpkBannerAlert>,
        )
        .toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('should render correctly with expanded', () => {
      const tree = renderer
        .create(
          <BpkBannerAlert
            type={ALERT_TYPES.neutral}
            message="Neutral alert."
            toggleExpandedButtonLabel="Expand"
            expanded
          >
            <BpkText textStyle="sm">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
              sagittis sagittis purus, id blandit ipsum. Pellentesque nec diam
              nec erat condimentum dapibus. Nunc diam augue, egestas id egestas
              ut, facilisis nec mi. Donec et congue odio, nec laoreet est.
              Integer rhoncus varius arcu, a fringilla libero laoreet at.
            </BpkText>
          </BpkBannerAlert>,
        )
        .toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('should accept userland styling', () => {
      const tree = renderer
        .create(
          <BpkBannerAlert
            style={{ width: spacingSm }}
            type={ALERT_TYPES.neutral}
            message="Neutral alert."
          />,
        )
        .toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('should render correctly when not shown', () => {
      const tree = renderer
        .create(
          <BpkBannerAlert
            show={false}
            type={ALERT_TYPES.neutral}
            message="Neutral alert."
          />,
        )
        .toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('should render correctly with animateOnEnter', () => {
      const tree = renderer
        .create(
          <BpkBannerAlert
            animateOnEnter
            type={ALERT_TYPES.neutral}
            message="Neutral alert."
          />,
        )
        .toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('should render correctly with animateOnLeave', () => {
      const tree = renderer
        .create(
          <BpkBannerAlert
            animateOnLeave
            type={ALERT_TYPES.neutral}
            message="Neutral alert."
          />,
        )
        .toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('should not throw if alert type not provided', () => {
      jest.spyOn(console, 'error').mockImplementation(() => null);

      const willThrow = () =>
        // $FlowFixMe
        renderer.create(<BpkBannerAlert message="Neutral alert." />);

      expect(willThrow).not.toThrow();
    });
  });
};

export default commonTests;
