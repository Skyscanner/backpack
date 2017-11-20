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

import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Portal } from 'bpk-react-utils';
import { withScrim } from 'bpk-scrim-utils';

import BpkSlidingDrawerContent from './BpkSlidingDrawerContent';

const ScrimBpkSlidingDrawerContent = withScrim(BpkSlidingDrawerContent);

class BpkSlidingDrawer extends Component {
  constructor() {
    super();

    this.state = {
      show: true,
    };

    this.onExited = this.onExited.bind(this);
    this.hide = this.hide.bind(this);
  }
  onExited() {
    this.props.onClose();
    this.setState({ show: true }); // needed to show the drawer if it is reopened
  }

  hide() {
    this.setState({ show: false });
  }

  render() {
    const {
      isOpen, onClose, target, ...rest
    } = this.props;

    const { show } = this.state;

    delete rest.onClose;

    return (
      <Portal isOpen={isOpen} onClose={onClose} target={target}>
        <ScrimBpkSlidingDrawerContent
          show={show}
          onClose={this.hide}
          onExited={this.onExited}
          {...rest}
        />
      </Portal>
    );
  }
}

BpkSlidingDrawer.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  target: PropTypes.element,
};

BpkSlidingDrawer.defaultProps = {
  target: null,
};

export default BpkSlidingDrawer;
