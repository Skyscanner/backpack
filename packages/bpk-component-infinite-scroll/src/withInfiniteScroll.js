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

/* @flow */

import React, { Component, type Element, type ComponentType } from 'react';
import PropTypes from 'prop-types';
import { cssModules } from 'bpk-react-utils';
import omit from 'lodash/omit';
import './intersection-observer';

import STYLES from './withInfiniteScroll.scss';

const getClassNames = cssModules(STYLES);

type ScrollEvent = {
  currentIndex: number,
};

type ScrollFinishedEvent = {
  totalNumberElements: number,
};

type OnItemsFetchFunction = (
  index: number,
  elementsPerScroll: number,
) => Promise<Array<any>>;

export type Props = {
  elementsPerScroll: number,
  loadingComponent: ?Element<any>,
  onItemsFetch: OnItemsFetchFunction,
  onClickSeeMore: (event: SyntheticEvent<HTMLButtonElement>) => void,
  onScroll: (o: ScrollEvent) => void,
  onScrollFinished: (o: ScrollFinishedEvent) => void,
  seeMoreComponent: Element<any>,
  seeMoreAfter: number,
};

export type State = {
  index: number,
  elementsToRender: Array<any>,
  isListFinished: boolean,
  showSeeMore: boolean,
};

type ExtendedProps = {
  elements: Array<any>,
};

const withInfiniteScroll = (
  ComponentToExtend: ComponentType<ExtendedProps>,
): ComponentType<Props> =>
  class extends Component<Props, State> {
    handleIntersection: IntersectionObserverCallback;
    handleKeyPress: (e: SyntheticKeyboardEvent<HTMLButtonElement>) => void;
    handleSeeMoreClick: (e: SyntheticEvent<HTMLButtonElement>) => void;
    observer: IntersectionObserver;
    onItemsFetch: OnItemsFetchFunction;
    onScroll: (o: ScrollEvent) => void;
    sentinel: ?HTMLElement;

    static propTypes = {
      elementsPerScroll: PropTypes.number,
      loadingComponent: PropTypes.node,
      onItemsFetch: PropTypes.func.isRequired,
      onClickSeeMore: PropTypes.func,
      onScroll: PropTypes.func,
      onScrollFinished: PropTypes.func,
      seeMoreComponent: PropTypes.node,
      seeMoreAfter: PropTypes.number,
    };

    static defaultProps = {
      elementsPerScroll: 5,
      loadingComponent: null,
      onClickSeeMore: () => {},
      onScroll: () => {},
      onScrollFinished: () => {},
      seeMoreComponent: null,
      seeMoreAfter: null,
    };

    constructor(props: Props) {
      super(props);

      this.state = {
        index: 0,
        elementsToRender: [],
        isListFinished: false,
        showSeeMore: false,
      };

      this.onItemsFetch = props.onItemsFetch;
      this.onScroll = props.onScroll;
      this.observer = new IntersectionObserver(this.handleIntersection, {
        threshold: 1,
      });
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

    componentWillUnMount() {
      if (this.sentinel) {
        this.observer.unobserve(this.sentinel);
      }
    }

    loadMore() {
      const { index, elementsToRender } = this.state;
      const { elementsPerScroll, seeMoreAfter } = this.props;
      return this.onItemsFetch(index, elementsPerScroll).then(nextElements => {
        if (nextElements && nextElements.length > 0) {
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
      });
    }

    handleIntersection = (entries: Array<IntersectionObserverEntry>) => {
      const entry = entries[0];
      if (entry.intersectionRatio === 1) {
        if (this.sentinel) {
          this.observer.unobserve(this.sentinel);
        }
        this.props.onScroll({ currentIndex: this.state.index });
        return this.loadMore().then(newState => {
          this.setState(newState);
        });
      }
      return Promise.resolve();
    };

    handleKeyPress = (e: SyntheticKeyboardEvent<HTMLButtonElement>) => {
      const { key } = e;
      if (key === 'Enter' || key === ' ') {
        return this.handleSeeMoreClick(e);
      }
      return Promise.resolve();
    };

    handleSeeMoreClick = (e: SyntheticEvent<HTMLButtonElement>) => {
      this.props.onClickSeeMore(e);
      return this.loadMore().then(newState => {
        this.setState(newState);
      });
    };

    render() {
      const { elementsToRender, isListFinished, showSeeMore } = this.state;
      const { seeMoreComponent, loadingComponent } = this.props;

      const rest = omit(this.props, [
        'elementsPerScroll',
        'loadingComponent',
        'onItemsFetch',
        'onClickSeeMore',
        'onScroll',
        'onScrollFinished',
        'seeMoreComponent',
        'seeMoreAfter',
      ]);

      let loadingOrButton = null;

      if (!isListFinished) {
        if (showSeeMore) {
          loadingOrButton = (
            <div
              role="button"
              tabIndex={0}
              onKeyPress={this.handleKeyPress}
              onClick={this.handleSeeMoreClick}
            >
              {seeMoreComponent}
            </div>
          );
        } else {
          loadingOrButton = (
            <div
              ref={spinner => {
                this.sentinel = spinner;
              }}
              className={
                loadingComponent ? null : getClassNames('bpk-sentinel')
              }
            >
              {loadingComponent}
            </div>
          );
        }
      }

      return (
        <div>
          <ComponentToExtend {...rest} elements={elementsToRender} />
          {loadingOrButton}
        </div>
      );
    }
  };

export default withInfiniteScroll;
