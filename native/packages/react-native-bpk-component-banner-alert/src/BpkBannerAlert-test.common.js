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
import renderer from 'react-test-renderer';
import BpkText from 'react-native-bpk-component-text';
import BpkBannerAlert, { ALERT_TYPES } from './BpkBannerAlert';

const commonTests = () => {
  describe('BpkBannerAlert', () => {
    it('should render correctly', () => {
      const tree = renderer.create(
        <BpkBannerAlert
          type={ALERT_TYPES.NEUTRAL}
          message="Neutral alert."
        />,
        <BpkBannerAlert
          type={ALERT_TYPES.SUCCESS}
          message="Successful alert."
        />,
        <BpkBannerAlert
          type={ALERT_TYPES.WARN}
          message="Warn alert."
        />,
        <BpkBannerAlert
          type={ALERT_TYPES.ERROR}
          message="Error alert."
        />,
    ).toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('should render correctly dismissable', () => {
      const tree = renderer.create(
        <BpkBannerAlert
          type={ALERT_TYPES.NEUTRAL}
          message="Neutral alert."
          dismissable
        />,
        <BpkBannerAlert
          type={ALERT_TYPES.SUCCESS}
          message="Successful alert."
          dismissable
        />,
        <BpkBannerAlert
          type={ALERT_TYPES.WARN}
          message="Warn alert."
          dismissable
        />,
        <BpkBannerAlert
          type={ALERT_TYPES.ERROR}
          message="Error alert."
          dismissable
        />,
        ).toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('should render correctly expandable', () => {
      const tree = renderer.create(
        <BpkBannerAlert
          type={ALERT_TYPES.SUCCESS}
          message="Successful alert."
        >

          <BpkText textStyle="sm">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque sagittis sagittis purus, id blandit ipsum.
            Pellentesque nec diam nec erat condimentum dapibus.
            Nunc diam augue, egestas id egestas ut, facilisis nec mi. Donec et congue odio, nec laoreet est.
            Integer rhoncus varius arcu, a fringilla libero laoreet at.
          </BpkText>
        </BpkBannerAlert>,
        <BpkBannerAlert
          type={ALERT_TYPES.WARN}
          message="Warn alert."
        >

          <BpkText textStyle="sm">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque sagittis sagittis purus, id blandit ipsum.
            Pellentesque nec diam nec erat condimentum dapibus.
            Nunc diam augue, egestas id egestas ut, facilisis nec mi. Donec et congue odio, nec laoreet est.
            Integer rhoncus varius arcu, a fringilla libero laoreet at.
          </BpkText>
        </BpkBannerAlert>,
        <BpkBannerAlert
          type={ALERT_TYPES.ERROR}
          message="Error alert."
        >

          <BpkText textStyle="sm">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque sagittis sagittis purus, id blandit ipsum.
            Pellentesque nec diam nec erat condimentum dapibus.
            Nunc diam augue, egestas id egestas ut, facilisis nec mi. Donec et congue odio, nec laoreet est.
            Integer rhoncus varius arcu, a fringilla libero laoreet at.
          </BpkText>
        </BpkBannerAlert>,
                ).toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('should render correctly expanded', () => {
      const tree = renderer.create(
        <BpkBannerAlert
          type={ALERT_TYPES.SUCCESS}
          message="Successful alert."
          expanded
        >

          <BpkText textStyle="sm">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque sagittis sagittis purus, id blandit ipsum.
            Pellentesque nec diam nec erat condimentum dapibus.
            Nunc diam augue, egestas id egestas ut, facilisis nec mi. Donec et congue odio, nec laoreet est.
            Integer rhoncus varius arcu, a fringilla libero laoreet at.
          </BpkText>
        </BpkBannerAlert>,
        <BpkBannerAlert
          type={ALERT_TYPES.WARN}
          message="Warn alert."
          expanded
        >

          <BpkText textStyle="sm">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque sagittis sagittis purus, id blandit ipsum.
            Pellentesque nec diam nec erat condimentum dapibus.
            Nunc diam augue, egestas id egestas ut, facilisis nec mi. Donec et congue odio, nec laoreet est.
            Integer rhoncus varius arcu, a fringilla libero laoreet at.
          </BpkText>
        </BpkBannerAlert>,
        <BpkBannerAlert
          type={ALERT_TYPES.ERROR}
          message="Error alert."
          expanded
        >

          <BpkText textStyle="sm">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque sagittis sagittis purus, id blandit ipsum.
            Pellentesque nec diam nec erat condimentum dapibus.
            Nunc diam augue, egestas id egestas ut, facilisis nec mi. Donec et congue odio, nec laoreet est.
            Integer rhoncus varius arcu, a fringilla libero laoreet at.
          </BpkText>
        </BpkBannerAlert>,
                        ).toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('should render correctly long text', () => {
      const tree = renderer.create(
        <BpkBannerAlert
          type={ALERT_TYPES.SUCCESS}
          message="Successful alert."
          expanded
        >

          <BpkText textStyle="sm">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque sagittis sagittis purus, id blandit ipsum.
            Pellentesque nec diam nec erat condimentum dapibus.
            Nunc diam augue, egestas id egestas ut, facilisis nec mi. Donec et congue odio, nec laoreet est.
            Integer rhoncus varius arcu, a fringilla libero laoreet at.
          </BpkText>
        </BpkBannerAlert>,
        <BpkBannerAlert
          type={ALERT_TYPES.WARN}
          message="Warn alert."
          expanded
        >

          <BpkText textStyle="sm">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque sagittis sagittis purus, id blandit ipsum.
            Pellentesque nec diam nec erat condimentum dapibus.
            Nunc diam augue, egestas id egestas ut, facilisis nec mi. Donec et congue odio, nec laoreet est.
            Integer rhoncus varius arcu, a fringilla libero laoreet at.
          </BpkText>
        </BpkBannerAlert>,
        <BpkBannerAlert
          type={ALERT_TYPES.ERROR}
          message="Error alert."
          expanded
        >

          <BpkText textStyle="sm">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque sagittis sagittis purus, id blandit ipsum.
            Pellentesque nec diam nec erat condimentum dapibus.
            Nunc diam augue, egestas id egestas ut, facilisis nec mi. Donec et congue odio, nec laoreet est.
            Integer rhoncus varius arcu, a fringilla libero laoreet at.
          </BpkText>
        </BpkBannerAlert>,
                            ).toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('should accept user-stlying', () => {
      const tree = renderer.create(
        <BpkBannerAlert
          style={{ width: 50 }}
          type={ALERT_TYPES.SUCCESS}
          message="Successful alert."
        />,
        <BpkBannerAlert
          style={{ width: 50 }}
          type={ALERT_TYPES.WARN}
          message="Warn alert."
        />,
        <BpkBannerAlert
          style={{ width: 50 }}
          type={ALERT_TYPES.ERROR}
          message="Error alert."
        />,
            ).toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('should error if dismissable and expandable', () => {
      expect(BpkBannerAlert.propTypes.dismissable({
        dismissable: true,
        children: (<BpkText textStyle="sm">CHILD</BpkText>),
      }, 'dismissable', 'BpkBannerAlert').toString()).toEqual('Error: Invalid prop `dismissable` with value `true` supplied to `BpkBannerAlert`. Banner alert cannot be expanded to show children if it is dismissable.'); // eslint-disable-line max-len
    });

    it('should not error if only expandable', () => {
      expect(BpkBannerAlert.propTypes.dismissable({
        children: (<BpkText textStyle="sm">CHILD</BpkText>),
      }, 'dismissable', 'BpkBannerAlert')).toEqual(false);
    });

    it('should not error if only dismissable', () => {
      expect(BpkBannerAlert.propTypes.dismissable({
        dismissable: true,
        children: null,
      }, 'dismissable', 'BpkBannerAlert')).toEqual(false);
    });
  });
};

export default commonTests;
