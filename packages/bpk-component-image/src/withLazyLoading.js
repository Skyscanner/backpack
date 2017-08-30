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

export default function withLazyLoading(Component, document, keepIncluded = true) {
  class WithLazyLoading extends React.Component {
    constructor() {
      super();

      this.removeEventListeners = this.removeEventListeners.bind(this);
      this.checkInView = this.checkInView.bind(this);
      this.getPosition = this.getPosition.bind(this);
      this.supportsPassiveEvents = this.supportsPassiveEvents.bind(this);

      this.state = {
        position: { up: false, down: false, right: false, left: false, inView: false },
      };
    }

    componentDidMount() {
      const passiveArgs = this.supportsPassiveEvents() ? { passive: true } : {};
      document.addEventListener('scroll', this.checkInView, { capture: true, ...passiveArgs });
      document.addEventListener('resize', this.checkInView);
      document.addEventListener('fullscreenchange', this.checkInView);
      // call checkInView immediately incase the
      // component is already in view prior to scrolling
      this.checkInView();
    }

    componentWillUnmount() {
      this.removeEventListeners();
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

    getPosition() {
      const rect = this.element.getBoundingClientRect();

      const viewPortHeight = Math.max(window.innerHeight, document.documentElement.clientHeight);
      const viewPortWidth = Math.max(window.innerWidth, document.documentElement.clientWidth);

      const up = rect.bottom <= 0;
      const down = rect.top > viewPortHeight;
      const right = rect.left > viewPortWidth;
      const left = rect.right <= 0;
      const inView = !(up || down || left || right);

      return { up, down, left, right, inView };
    }

    checkInView() {
      this.setState(() => ({
        position: this.getPosition(),
      }));
      if (this.state.position.inView && keepIncluded) {
        this.removeEventListeners();
      }
    }

    removeEventListeners() {
      const passiveArgs = this.supportsPassiveEvents() ? { passive: true } : {};
      document.removeEventListener('scroll', this.checkInView, { capture: true, ...passiveArgs });
      document.removeEventListener('resize', this.checkInView);
      document.removeEventListener('fullscreenchange', this.checkInView);
    }

    render() {
      return (
        <div
          id={this.placeholderReference}
          ref={(element) => { this.element = element; }}
        >
          <Component
            position={this.state.position}
            {...this.props}
          />
        </div>
      );
    }
  }
  WithLazyLoading.displayName = wrapDisplayName(Component, 'withLazyLoading');
  return WithLazyLoading;
}
