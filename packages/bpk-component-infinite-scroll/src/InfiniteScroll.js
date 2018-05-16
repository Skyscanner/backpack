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

import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { BpkSpinner, SPINNER_TYPES } from 'bpk-component-spinner';

import STYLES from './InfiniteScroll.scss';

function infinitize(ComponentToExtend) {
  class Infinitize extends Component {
    constructor(props) {
      super(props);

      this.state = {
        index: 0,
        elementsToRender: [],
        isListFinished: false,
        showSeeMore: false,
      };

      this.onRequestElements = props.onRequestElements;
      this.onScroll = props.onScroll;
      this.handleIntersection = this.handleIntersection.bind(this);
      this.handleSeeMoreClick = this.handleSeeMoreClick.bind(this);
      // TODO add polyfill for IE
      this.observer = new IntersectionObserver(
        (...args) => this.handleIntersection(...args),
        { threshold: 1 },
      );
    }

    componentDidMount() {
      if (this.sentinel) {
        this.observer.observe(this.sentinel);
      }
    }

    componentDidUpdate() {
      if (this.sentinel && this.state.index > 0) {
        this.observer.observe(this.sentinel);
      }
    }

    async loadMore() {
      const { index, elementsToRender } = this.state;
      const { elementsPerScroll, seeMoreAfter } = this.props;
      const nextElements = await this.onRequestElements(
        index,
        elementsPerScroll,
      );
      if (nextElements) {
        const nextIndex = index + elementsPerScroll;
        return {
          index: nextIndex,
          elementsToRender: elementsToRender.concat(nextElements),
          showSeeMore: seeMoreAfter === index / elementsPerScroll,
        };
      }
      this.props.onScrollFinished({
        totalNumberElements: elementsToRender.length,
      });
      return {
        isListFinished: true,
      };
    }

    handleIntersection(entries, observer) {
      entries.forEach(async entry => {
        if (entry.intersectionRatio === 1) {
          this.props.onScroll({ currentIndex: this.state.index });
          observer.unobserve(this.sentinel);
          const newState = await this.loadMore();
          this.setState(newState);
        }
      });
    }

    async handleSeeMoreClick(e) {
      this.props.onSeeMoreClicked(e);
      this.setState(await this.loadMore());
    }

    render() {
      const { elementsToRender, isListFinished, showSeeMore } = this.state;
      const { seeMoreComponent } = this.props;

      let spinnerOrButton = null;

      if (!isListFinished) {
        if (showSeeMore) {
          spinnerOrButton = (
            <div role="button" onClick={this.handleSeeMoreClick}>
              {seeMoreComponent}
            </div>
          );
        } else {
          spinnerOrButton = (
            <div
              ref={spinner => {
                this.sentinel = spinner;
              }}
              className={STYLES['bpk-sentinel']}
            >
              <BpkSpinner type={SPINNER_TYPES.primary} />
            </div>
          );
        }
      }

      return (
        <div className={STYLES['bpk-infiniteList']}>
          <ComponentToExtend {...this.props} elements={elementsToRender} />
          {spinnerOrButton}
        </div>
      );
    }
  }

  Infinitize.propTypes = {
    elementsPerScroll: PropTypes.number,
    seeMoreComponent: PropTypes.node,
    seeMoreAfter: PropTypes.number,
    onRequestElements: PropTypes.func.isRequired,
    onScroll: PropTypes.func,
    onScrollFinished: PropTypes.func,
    onSeeMoreClicked: PropTypes.func,
  };

  Infinitize.defaultProps = {
    elementsPerScroll: 5,
    seeMoreComponent: null,
    seeMoreAfter: null,
    onScroll: () => {},
    onScrollFinished: () => {},
    onSeeMoreClicked: () => {},
  };

  return Infinitize;
}

export default infinitize;
