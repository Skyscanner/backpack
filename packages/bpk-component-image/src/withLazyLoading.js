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
import { wrapDisplayName } from 'bpk-react-utils';

export default function withLazyLoading(Component, document) {
  class WithLazyLoading extends React.Component {
    constructor() {
      super();

      this.setInView = this.setInView.bind(this);
      this.removeEventListeners = this.removeEventListeners.bind(this);
      this.checkInView = this.checkInView.bind(this);
      this.isInViewPort = this.isInViewPort.bind(this);
      this.supportsPassiveEvents = this.supportsPassiveEvents.bind(this);

      this.state = {
        inView: false,
      };
    }

    componentDidMount() {
      const passiveArgs = this.supportsPassiveEvents() ? { passive: true } : {};
      document.addEventListener('scroll', this.checkInView, { capture: true, ...passiveArgs });
      document.addEventListener('resize', this.checkInView);
      document.addEventListener('orientationchange', this.checkInView);
      document.addEventListener('fullscreenchange', this.checkInView);
      // call checkInView immediately incase the
      // component is already in view prior to scrolling
      this.checkInView();
    }

    componentWillUnmount() {
      this.removeEventListeners();
    }

    setInView() {
      this.setState(() => ({
        inView: true,
      }));
      this.removeEventListeners();
    }

    removeEventListeners() {
      const passiveArgs = this.supportsPassiveEvents() ? { passive: true } : {};
      document.removeEventListener('scroll', this.checkInView, { capture: true, ...passiveArgs });
      document.removeEventListener('resize', this.checkInView);
      document.removeEventListener('orientationchange', this.checkInView);
      document.removeEventListener('fullscreenchange', this.checkInView);
    }

    checkInView() {
      if (this.isInViewPort()) {
        this.setInView();
      }
    }

    // This function is taken from modernizr
    // See https://github.com/modernizr/modernizr
    supportsPassiveEvents() { // eslint-disable-line
      let supportsPassiveOption = false;
      try {
        const opts = Object.defineProperty({}, 'passive', {
          get() {
            supportsPassiveOption = true;
          },
        });
        window.addEventListener('test', null, opts);
      } catch (e) {
        return false;
      }
      return supportsPassiveOption;
    }

    isInViewPort() {
      const rect = this.element.getBoundingClientRect();

      const viewPortHeight = Math.max(window.innerHeight, document.documentElement.clientHeight);
      const viewPortWidth = Math.max(window.innerWidth, document.documentElement.clientWidth);

      return (
        rect.bottom >= 0 &&
        rect.right >= 0 &&
        rect.top < viewPortHeight &&
        rect.left < viewPortWidth
      );
    }

    render() {
      return (
        <div
          id={this.placeholderReference}
          ref={(element) => { this.element = element; }}
        >
          <Component
            inView={this.state.inView}
            {...this.props}
          />
        </div>
      );
    }
  }
  WithLazyLoading.displayName = wrapDisplayName(Component, 'withLazyLoading');
  return WithLazyLoading;
}
