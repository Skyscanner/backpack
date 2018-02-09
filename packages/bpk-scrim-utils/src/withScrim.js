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
const CLICK_TIME_THESHOLD = 500;

const withScrim = WrappedComponent => {
  class WithScrim extends Component {
    constructor() {
      super();

      this.onContentMouseDown = this.onContentMouseDown.bind(this);
      this.onContentMouseUp = this.onContentMouseUp.bind(this);
      this.onOverlayMouseDown = this.onOverlayMouseDown.bind(this);
      this.onOverlayMouseUp = this.onOverlayMouseUp.bind(this);
      this.dialogRef = this.dialogRef.bind(this);

      this.shouldClose = false;
      this.mouseDownTime = 0;
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

    onContentMouseDown(e) {
      e.stopPropagation();
      this.shouldClose = false;
    }

    onContentMouseUp() {
      this.shouldClose = false;
    }

    onOverlayMouseDown(event) {
      this.mouseDownTime = Date.now();
      // console.log(this.mouseDownCoordinates);
      this.shouldClose = true;
    }

    onOverlayMouseUp(event) {
      const mouseUpTime = Date.now();
      const timeBetweenMouseDownUp = mouseUpTime - this.mouseDownTime;

      if (
        this.props.closeOnScrimClick &&
        this.shouldClose &&
        timeBetweenMouseDownUp < CLICK_TIME_THESHOLD
      ) {
        this.props.onClose();
      }
    }

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

      const closeEvents = {
        onTouchStart: this.onContentMouseDown,
        onTouchEnd: this.onContentMouseUp,
        onMouseDown: this.onContentMouseDown,
        onMouseUp: this.onContentMouseUp,
      };

      return (
        /* eslint-disable jsx-a11y/no-static-element-interactions */
        <div>
          <BpkScrim />
          <div
            className={classNames.join(' ')}
            onTouchStart={this.onOverlayMouseDown}
            onTouchMove={this.onDocumentMove}
            onTouchEnd={this.onOverlayMouseUp}
            onMouseDown={this.onOverlayMouseDown}
            onMouseMove={this.onDocumentMove}
            onMouseUp={this.onOverlayMouseUp}
          >
            <WrappedComponent
              {...rest}
              isIphone={isIphone}
              dialogRef={this.dialogRef}
              closeEvents={closeEvents}
            />
          </div>
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
