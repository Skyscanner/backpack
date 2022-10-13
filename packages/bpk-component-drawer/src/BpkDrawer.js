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
import React, { Component } from 'react';

import { Portal, cssModules } from '../../bpk-react-utils';
import { withScrim } from '../../bpk-scrim-utils';

import BpkDrawerContent from './BpkDrawerContent';
import STYLES from './BpkDrawer.module.scss';

const getClassName = cssModules(STYLES);

const BpkScrimDrawerContent = withScrim(BpkDrawerContent);

type Props = {
  isOpen: boolean,
  onClose: () => mixed,
  renderTarget: ?() => mixed,
};

type State = {
  isDrawerShown: boolean,
};

class BpkDrawer extends Component<Props, State> {
  static defaultProps = {
    renderTarget: null,
  };

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
};

export default BpkDrawer;
