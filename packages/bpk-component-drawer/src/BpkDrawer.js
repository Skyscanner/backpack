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

/* @flow strict */

import PropTypes from 'prop-types';
import { Component } from 'react';

import { Portal } from '../../bpk-react-utils';
import { withScrim } from '../../bpk-scrim-utils';

import BpkDrawerContent from './BpkDrawerContent';

const BpkScrimDrawerContent = withScrim(BpkDrawerContent);

type Props = {
  id: string,
  children: Node,
  isOpen: boolean,
  onClose: () => mixed,
  title: string,
  getApplicationElement: () => mixed,
  renderTarget: ?() => mixed,
  dialogRef: ?() => mixed,
  className: ?string,
  contentClassName: ?string,
  closeLabel: ?string,
  closeText: ?string,
  hideTitle: ?boolean,
};

type State = {
  isDrawerShown: boolean,
};

class BpkDrawer extends Component<Props, State> {
  constructor() {
    super();

    this.state = {
      isDrawerShown: true,
    };
  }

  UNSAFE_componentWillReceiveProps(nextProps: Props) {
    if (!this.props.isOpen && nextProps.isOpen) {
      this.setState({ isDrawerShown: true });
    }
  }

  onCloseAnimationComplete = () => {
    this.props.onClose();
  };

  hide = () => {
    this.setState({ isDrawerShown: false });
  };

  render() {
    const { isOpen, onClose, renderTarget, ...rest } = this.props;

    const { isDrawerShown } = this.state;

    return (
      <Portal isOpen={isOpen} onClose={this.hide} renderTarget={renderTarget}>
        {/* $FlowFixMe[cannot-spread-inexact] - inexact rest. See decisions/flowfixme.md */}
        <BpkScrimDrawerContent
          isDrawerShown={isDrawerShown}
          onClose={this.hide}
          onCloseAnimationComplete={this.onCloseAnimationComplete}
          {...rest}
        />
      </Portal>
    );
  }
}

BpkDrawer.propTypes = {
  id: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  /**
   * **Note:** In order to "hide" your application from screen readers whilst the drawer is open you need to let it know what
   * the root element for your application is by returning it's DOM node via the function passed to the
   * `getApplicationElement` prop (see the example above). The `pagewrap` element id is a convention we use internally at Skyscanner. In most cases it should "just work".
   */
  getApplicationElement: PropTypes.func.isRequired,
  renderTarget: PropTypes.func,
  dialogRef: PropTypes.func,
  className: PropTypes.string,
  contentClassName: PropTypes.string,
  closeLabel: PropTypes.string,
  closeText: PropTypes.string,
  hideTitle: PropTypes.bool,
};

BpkDrawer.defaultProps = {
  renderTarget: null,
  className: null,
  contentClassName: null,
  closeLabel: null,
  closeText: null,
  hideTitle: false,
};

export default BpkDrawer;
