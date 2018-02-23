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

import React from 'react';
import { View } from 'react-native';
import renderer from 'react-test-renderer';
import BpkText from 'react-native-bpk-component-text';
import BpkBannerAlert from './BpkBannerAlert';
import ALERT_TYPES from './AlertTypes';

const commonTests = () => {
  describe('BpkBannerAlert', () => {
    Date.now = jest.fn(() => 1503187200000);
    it('should render correctly', () => {
      const tree = renderer
        .create(
          <View>
            <BpkBannerAlert
              type={ALERT_TYPES.NEUTRAL}
              message="Neutral alert."
            />
            <BpkBannerAlert
              type={ALERT_TYPES.SUCCESS}
              message="Successful alert."
            />
            <BpkBannerAlert type={ALERT_TYPES.WARN} message="Warn alert." />
            <BpkBannerAlert type={ALERT_TYPES.ERROR} message="Error alert." />
          </View>,
        )
        .toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('should render correctly dismissable', () => {
      const tree = renderer
        .create(
          <View>
            <BpkBannerAlert
              type={ALERT_TYPES.NEUTRAL}
              message="Neutral alert."
              dismissable
              dismissButtonLabel="Dismiss"
            />
            <BpkBannerAlert
              type={ALERT_TYPES.SUCCESS}
              message="Successful alert."
              dismissable
              dismissButtonLabel="Dismiss"
            />
            <BpkBannerAlert
              type={ALERT_TYPES.WARN}
              message="Warn alert."
              dismissable
              dismissButtonLabel="Dismiss"
            />
            <BpkBannerAlert
              type={ALERT_TYPES.ERROR}
              message="Error alert."
              dismissable
              dismissButtonLabel="Dismiss"
            />
          </View>,
        )
        .toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('should render correctly expandable', () => {
      const tree = renderer
        .create(
          <View>
            <BpkBannerAlert
              type={ALERT_TYPES.NEUTRAL}
              message="Neutral alert."
              toggleExpandedButtonLabel="Expand"
            >
              <BpkText textStyle="sm">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
                sagittis sagittis purus, id blandit ipsum. Pellentesque nec diam
                nec erat condimentum dapibus. Nunc diam augue, egestas id
                egestas ut, facilisis nec mi. Donec et congue odio, nec laoreet
                est. Integer rhoncus varius arcu, a fringilla libero laoreet at.
              </BpkText>
            </BpkBannerAlert>
            <BpkBannerAlert
              type={ALERT_TYPES.SUCCESS}
              message="Successful alert."
              toggleExpandedButtonLabel="Expand"
            >
              <BpkText textStyle="sm">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
                sagittis sagittis purus, id blandit ipsum. Pellentesque nec diam
                nec erat condimentum dapibus. Nunc diam augue, egestas id
                egestas ut, facilisis nec mi. Donec et congue odio, nec laoreet
                est. Integer rhoncus varius arcu, a fringilla libero laoreet at.
              </BpkText>
            </BpkBannerAlert>
            <BpkBannerAlert
              type={ALERT_TYPES.WARN}
              message="Warn alert."
              toggleExpandedButtonLabel="Expand"
            >
              <BpkText textStyle="sm">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
                sagittis sagittis purus, id blandit ipsum. Pellentesque nec diam
                nec erat condimentum dapibus. Nunc diam augue, egestas id
                egestas ut, facilisis nec mi. Donec et congue odio, nec laoreet
                est. Integer rhoncus varius arcu, a fringilla libero laoreet at.
              </BpkText>
            </BpkBannerAlert>
            <BpkBannerAlert
              type={ALERT_TYPES.ERROR}
              message="Error alert."
              toggleExpandedButtonLabel="Expand"
            >
              <BpkText textStyle="sm">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
                sagittis sagittis purus, id blandit ipsum. Pellentesque nec diam
                nec erat condimentum dapibus. Nunc diam augue, egestas id
                egestas ut, facilisis nec mi. Donec et congue odio, nec laoreet
                est. Integer rhoncus varius arcu, a fringilla libero laoreet at.
              </BpkText>
            </BpkBannerAlert>
          </View>,
        )
        .toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('should render correctly expanded', () => {
      const tree = renderer
        .create(
          <View>
            <BpkBannerAlert
              type={ALERT_TYPES.NEUTRAL}
              message="Neutral alert."
              expanded
              toggleExpandedButtonLabel="Expand"
            >
              <BpkText textStyle="sm">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
                sagittis sagittis purus, id blandit ipsum. Pellentesque nec diam
                nec erat condimentum dapibus. Nunc diam augue, egestas id
                egestas ut, facilisis nec mi. Donec et congue odio, nec laoreet
                est. Integer rhoncus varius arcu, a fringilla libero laoreet at.
              </BpkText>
            </BpkBannerAlert>
            <BpkBannerAlert
              type={ALERT_TYPES.SUCCESS}
              message="Successful alert."
              expanded
              toggleExpandedButtonLabel="Expand"
            >
              <BpkText textStyle="sm">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
                sagittis sagittis purus, id blandit ipsum. Pellentesque nec diam
                nec erat condimentum dapibus. Nunc diam augue, egestas id
                egestas ut, facilisis nec mi. Donec et congue odio, nec laoreet
                est. Integer rhoncus varius arcu, a fringilla libero laoreet at.
              </BpkText>
            </BpkBannerAlert>
            <BpkBannerAlert
              type={ALERT_TYPES.WARN}
              message="Warn alert."
              expanded
              toggleExpandedButtonLabel="Expand"
            >
              <BpkText textStyle="sm">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
                sagittis sagittis purus, id blandit ipsum. Pellentesque nec diam
                nec erat condimentum dapibus. Nunc diam augue, egestas id
                egestas ut, facilisis nec mi. Donec et congue odio, nec laoreet
                est. Integer rhoncus varius arcu, a fringilla libero laoreet at.
              </BpkText>
            </BpkBannerAlert>
            <BpkBannerAlert
              type={ALERT_TYPES.ERROR}
              message="Error alert."
              expanded
              toggleExpandedButtonLabel="Expand"
            >
              <BpkText textStyle="sm">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
                sagittis sagittis purus, id blandit ipsum. Pellentesque nec diam
                nec erat condimentum dapibus. Nunc diam augue, egestas id
                egestas ut, facilisis nec mi. Donec et congue odio, nec laoreet
                est. Integer rhoncus varius arcu, a fringilla libero laoreet at.
              </BpkText>
            </BpkBannerAlert>
          </View>,
        )
        .toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('should render correctly long text', () => {
      const tree = renderer
        .create(
          <View>
            <BpkBannerAlert
              type={ALERT_TYPES.NEUTRAL}
              message="Neutral alert."
              expanded
              toggleExpandedButtonLabel="Expand"
            >
              <BpkText textStyle="sm">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
                sagittis sagittis purus, id blandit ipsum. Pellentesque nec diam
                nec erat condimentum dapibus. Nunc diam augue, egestas id
                egestas ut, facilisis nec mi. Donec et congue odio, nec laoreet
                est. Integer rhoncus varius arcu, a fringilla libero laoreet at.
              </BpkText>
            </BpkBannerAlert>
            <BpkBannerAlert
              type={ALERT_TYPES.SUCCESS}
              message="Successful alert."
              expanded
              toggleExpandedButtonLabel="Expand"
            >
              <BpkText textStyle="sm">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
                sagittis sagittis purus, id blandit ipsum. Pellentesque nec diam
                nec erat condimentum dapibus. Nunc diam augue, egestas id
                egestas ut, facilisis nec mi. Donec et congue odio, nec laoreet
                est. Integer rhoncus varius arcu, a fringilla libero laoreet at.
              </BpkText>
            </BpkBannerAlert>
            <BpkBannerAlert
              type={ALERT_TYPES.WARN}
              message="Warn alert."
              expanded
              toggleExpandedButtonLabel="Expand"
            >
              <BpkText textStyle="sm">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
                sagittis sagittis purus, id blandit ipsum. Pellentesque nec diam
                nec erat condimentum dapibus. Nunc diam augue, egestas id
                egestas ut, facilisis nec mi. Donec et congue odio, nec laoreet
                est. Integer rhoncus varius arcu, a fringilla libero laoreet at.
              </BpkText>
            </BpkBannerAlert>
            <BpkBannerAlert
              type={ALERT_TYPES.ERROR}
              message="Error alert."
              expanded
              toggleExpandedButtonLabel="Expand"
            >
              <BpkText textStyle="sm">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
                sagittis sagittis purus, id blandit ipsum. Pellentesque nec diam
                nec erat condimentum dapibus. Nunc diam augue, egestas id
                egestas ut, facilisis nec mi. Donec et congue odio, nec laoreet
                est. Integer rhoncus varius arcu, a fringilla libero laoreet at.
              </BpkText>
            </BpkBannerAlert>
          </View>,
        )
        .toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('should accept user-stlying', () => {
      const tree = renderer
        .create(
          <View>
            <BpkBannerAlert
              style={{ width: 50 }}
              type={ALERT_TYPES.NEUTRAL}
              message="Neutral alert."
            />
            <BpkBannerAlert
              style={{ width: 50 }}
              type={ALERT_TYPES.SUCCESS}
              message="Successful alert."
            />
            <BpkBannerAlert
              style={{ width: 50 }}
              type={ALERT_TYPES.WARN}
              message="Warn alert."
            />
            <BpkBannerAlert
              style={{ width: 50 }}
              type={ALERT_TYPES.ERROR}
              message="Error alert."
            />
          </View>,
        )
        .toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('should render correctly when not shown', () => {
      const tree = renderer
        .create(
          <View>
            <BpkBannerAlert
              show={false}
              style={{ width: 50 }}
              type={ALERT_TYPES.NEUTRAL}
              message="Neutral alert."
            />
            <BpkBannerAlert
              show={false}
              style={{ width: 50 }}
              type={ALERT_TYPES.SUCCESS}
              message="Successful alert."
            />
            <BpkBannerAlert
              show={false}
              style={{ width: 50 }}
              type={ALERT_TYPES.WARN}
              message="Warn alert."
            />
            <BpkBannerAlert
              show={false}
              style={{ width: 50 }}
              type={ALERT_TYPES.ERROR}
              message="Error alert."
            />
          </View>,
        )
        .toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('should render correctly with animateOnEnter', () => {
      const tree = renderer
        .create(
          <View>
            <BpkBannerAlert
              animateOnEnter
              style={{ width: 50 }}
              type={ALERT_TYPES.NEUTRAL}
              message="Neutral alert."
            />
            <BpkBannerAlert
              animateOnEnter
              style={{ width: 50 }}
              type={ALERT_TYPES.SUCCESS}
              message="Successful alert."
            />
            <BpkBannerAlert
              animateOnEnter
              style={{ width: 50 }}
              type={ALERT_TYPES.WARN}
              message="Warn alert."
            />
            <BpkBannerAlert
              animateOnEnter
              style={{ width: 50 }}
              type={ALERT_TYPES.ERROR}
              message="Error alert."
            />
          </View>,
        )
        .toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('should render correctly with animateOnLeave', () => {
      const tree = renderer
        .create(
          <View>
            <BpkBannerAlert
              animateOnLeave
              style={{ width: 50 }}
              type={ALERT_TYPES.NEUTRAL}
              message="Neutral alert."
            />
            <BpkBannerAlert
              animateOnLeave
              style={{ width: 50 }}
              type={ALERT_TYPES.SUCCESS}
              message="Successful alert."
            />
            <BpkBannerAlert
              animateOnLeave
              style={{ width: 50 }}
              type={ALERT_TYPES.WARN}
              message="Warn alert."
            />
            <BpkBannerAlert
              animateOnLeave
              style={{ width: 50 }}
              type={ALERT_TYPES.ERROR}
              message="Error alert."
            />
          </View>,
        )
        .toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('should error if dismissable and expandable', () => {
      expect(
        BpkBannerAlert.propTypes
          .dismissable(
            {
              dismissable: true,
              children: <BpkText textStyle="sm">CHILD</BpkText>,
            },
            'dismissable',
            'BpkBannerAlert',
          )
          .toString(),
      ).toEqual(
        'Error: Invalid prop `dismissable` with value `true` supplied to `BpkBannerAlert`. Banner alert cannot be expanded to show children if it is dismissable.',
      ); // eslint-disable-line max-len
    });

    it('should not error if only expandable', () => {
      expect(
        BpkBannerAlert.propTypes.dismissable(
          {
            children: <BpkText textStyle="sm">CHILD</BpkText>,
          },
          'dismissable',
          'BpkBannerAlert',
        ),
      ).toEqual(false);
    });

    it('should not error if only dismissable', () => {
      expect(
        BpkBannerAlert.propTypes.dismissable(
          {
            dismissable: true,
            children: null,
          },
          'dismissable',
          'BpkBannerAlert',
        ),
      ).toEqual(false);
    });

    it('should not throw if alert type not provided', () => {
      jest.spyOn(console, 'error').mockImplementation(() => jest.fn());
      const willThrow = () =>
        renderer.create(<BpkBannerAlert message="Neutral alert." />);
      expect(willThrow).not.toThrow();
    });
  });
};

export default commonTests;
