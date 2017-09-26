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
import BpkCard from 'bpk-component-card';
import BpkLargeExclamationCircle from 'bpk-component-icon/lg/exclamation-circle';
import BpkCloseButton from 'bpk-component-close-button';
import { cssModules } from 'bpk-react-utils';

import STYLES from './bpk-toast.scss';

const getClassName = cssModules(STYLES);

class BpkToast extends Component {
  constructor(props) {
    super(props);

    this.state = { isOpen: true };

    this.onClose = this.onClose.bind(this);
    this.setAnimation = this.setAnimation.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.message !== nextProps.message || nextProps.isVisible) {
      this.setState({ isOpen: true });
    }
  }

  onClose() {
    this.setState({ isOpen: false });
    this.props.onClose();
  }

  setAnimation() {
    return this.state.isOpen ? 'bpk-toast-animation-forward' : 'bpk-toast-animation-backward';
  }

  render() {
    const classNames = [];
    classNames.push(getClassName('bpk-toast'));
    classNames.push(getClassName(this.setAnimation()));

    if (this.props.isVisible) { classNames.push(this.props.className); }

    return this.props.isVisible ? (
      <div className={classNames.join(' ')}>
        <BpkCard className={`${getClassName('bpk-toast__card')}`} padded={false} onClick={this.onClose}>
          <span className={`${getClassName('bpk-toast__card-exclamation')}`}>
            <BpkLargeExclamationCircle className={`${getClassName('bpk-toast__card-exclamation-circle')}`} />
          </span>
          <div className={`${getClassName('bpk-toast__card-content')}`}>
            {this.props.message}
          </div>
          <BpkCloseButton
            className={`${getClassName('bpk-toast__card-close-button')}`}
            onClick={this.onClose}
            label={this.props.closeLabel}
          />
        </BpkCard>
      </div>
    ) : null;
  }
}

BpkToast.propTypes = {
  onClose: PropTypes.func,
  isVisible: PropTypes.bool,
  className: PropTypes.string,
  closeLabel: PropTypes.string,
  message: PropTypes.string.isRequired,
};

BpkToast.defaultProps = {
  onClose: () => {},
  isVisible: false,
  className: null,
  closeLabel: null,
  message: null,
};

export default BpkToast;
