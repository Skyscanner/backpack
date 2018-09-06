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

import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Portal, cssModules } from 'bpk-react-utils';
import { withScrim } from 'bpk-scrim-utils';

import BpkDrawerContent from './BpkDrawerContent';

import STYLES from './bpk-drawer.css';

const getClassName = cssModules(STYLES);

const BpkScrimDrawerContent = withScrim(BpkDrawerContent);

class BpkDrawer extends Component {
  constructor() {
    super();

    this.state = {
      isDrawerShown: true,
    };
  }

  componentWillReceiveProps(nextProps) {
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
    const { isOpen, onClose, target, renderTarget, ...rest } = this.props;

    const { isDrawerShown } = this.state;

    return (
      <Portal
        isOpen={isOpen}
        onClose={this.hide}
        target={target}
        renderTarget={renderTarget}
      >
        <BpkScrimDrawerContent
          isDrawerShown={isDrawerShown}
          onClose={this.hide}
          onCloseAnimationComplete={this.onCloseAnimationComplete}
          containerClassName={getClassName('bpk-drawer__container')}
          {...rest}
        />
      </Portal>
    );
  }
}

BpkDrawer.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  renderTarget: PropTypes.func,
  target: PropTypes.element,
};

BpkDrawer.defaultProps = {
  renderTarget: null,
  target: null,
};

export default BpkDrawer;
