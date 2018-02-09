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
import focusScope from 'a11y-focus-scope';
import focusStore from 'a11y-focus-store';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { cssModules, wrapDisplayName } from 'bpk-react-utils';

import BpkScrim from './BpkScrim';
import {
  lockScroll,
  restoreScroll,
  storeScroll,
  unlockScroll,
} from './scroll-utils';

import STYLES from './bpk-scrim-content.scss';
import { onClosePropType } from './customPropTypes';

const getClassName = cssModules(STYLES);

const withScrim = WrappedComponent => {
  class WithScrim extends Component {
    constructor() {
      super();

      this.dialogRef = this.dialogRef.bind(this);
    }

    componentDidMount() {
      const { isIphone, getApplicationElement } = this.props;
      const applicationElement = getApplicationElement();

      // iPhones need to have the application element hidden
      // and scrolling stored to prevent some weird display
      // issues from happening.
      if (isIphone && applicationElement) {
        storeScroll();
        applicationElement.style.display = 'none';
      } else {
        lockScroll();
        if (applicationElement) {
          applicationElement.setAttribute('aria-hidden', 'true');
        }
      }

      focusStore.storeFocus();
      if (this.dialogElement) {
        focusScope.scopeFocus(this.dialogElement);
      }
    }

    componentWillUnmount() {
      const { isIphone, getApplicationElement } = this.props;
      const applicationElement = getApplicationElement();

      if (isIphone && applicationElement) {
        applicationElement.style.display = '';
        restoreScroll();
      } else {
        unlockScroll();
        if (applicationElement) {
          applicationElement.removeAttribute('aria-hidden');
        }
      }

      focusScope.unscopeFocus();
      focusStore.restoreFocus();
    }

    onClose = () => {
      this.props.onClose();
    };

    dialogRef(ref) {
      this.dialogElement = ref;
    }

    render() {
      const {
        isIphone,
        getApplicationElement,
        containerClassName,
        ...rest
      } = this.props;

      const classNames = [getClassName('bpk-scrim-content')];
      if (isIphone) {
        classNames.push(getClassName('bpk-scrim-content--iphone-fix'));
      }
      classNames.push(containerClassName);

      return (
        /* eslint-disable jsx-a11y/no-static-element-interactions */
        /* eslint-disable jsx-a11y/click-events-have-key-events */
        <div className={classNames.join(' ')}>
          <BpkScrim onClose={this.onClose} />
          <WrappedComponent
            {...rest}
            isIphone={isIphone}
            dialogRef={this.dialogRef}
          />
        </div>
        /* eslint-enable */
      );
    }
  }

  WithScrim.displayName = wrapDisplayName(WrappedComponent, 'withScrim');

  WithScrim.propTypes = {
    getApplicationElement: PropTypes.func.isRequired,
    onClose: onClosePropType,
    isIphone: PropTypes.bool,
    containerClassName: PropTypes.string,
    closeOnScrimClick: PropTypes.bool,
  };

  WithScrim.defaultProps = {
    onClose: null,
    isIphone: /iPhone/i.test(
      typeof window !== 'undefined' ? window.navigator.platform : '',
    ),
    containerClassName: '',
    closeOnScrimClick: true,
  };

  return WithScrim;
};

export default withScrim;
