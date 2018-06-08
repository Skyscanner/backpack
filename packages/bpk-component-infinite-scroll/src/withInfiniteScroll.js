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
  onItemsFetch: OnItemsFetchFunction,
  onScroll: ?(o: ScrollEvent) => void,
  onScrollFinished: ?(o: ScrollFinishedEvent) => void,
  renderLoadingComponent: ?() => Element<any>,
  renderSeeMoreComponent: ?({
    onSeeMoreClick: (event: SyntheticEvent<any>) => mixed,
  }) => Element<any>,
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
  class WithInfiniteScroll extends Component<Props, State> {
    handleIntersection: IntersectionObserverCallback;
    handleKeyPress: (e: SyntheticKeyboardEvent<HTMLButtonElement>) => void;
    handleSeeMoreClick: (e: SyntheticEvent<HTMLButtonElement>) => void;
    observer: IntersectionObserver;
    onItemsFetch: OnItemsFetchFunction;
    sentinel: ?HTMLElement;

    static propTypes = {
      elementsPerScroll: PropTypes.number,
      onItemsFetch: PropTypes.func.isRequired,
      onScroll: PropTypes.func,
      onScrollFinished: PropTypes.func,
      renderLoadingComponent: PropTypes.func,
      renderSeeMoreComponent: PropTypes.func,
      seeMoreAfter: PropTypes.number,
    };

    static defaultProps = {
      elementsPerScroll: 5,
      onScroll: null,
      onScrollFinished: null,
      renderLoadingComponent: null,
      renderSeeMoreComponent: null,
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
      const { elementsPerScroll, onScrollFinished, seeMoreAfter } = this.props;
      return this.onItemsFetch(index, elementsPerScroll).then(nextElements => {
        if (nextElements && nextElements.length > 0) {
          const nextIndex = index + elementsPerScroll;
          return {
            index: nextIndex,
            elementsToRender: elementsToRender.concat(nextElements),
            showSeeMore: seeMoreAfter === index / elementsPerScroll,
          };
        }
        if (onScrollFinished) {
          onScrollFinished({
            totalNumberElements: elementsToRender.length,
          });
        }
        return {
          isListFinished: true,
        };
      });
    }

    handleIntersection = (entries: Array<IntersectionObserverEntry>) => {
      const { onScroll } = this.props;
      const entry = entries[0];
      if (entry.intersectionRatio === 1) {
        if (this.sentinel) {
          this.observer.unobserve(this.sentinel);
        }
        if (onScroll) {
          onScroll({ currentIndex: this.state.index });
        }
        return this.loadMore().then(newState => {
          this.setState(newState);
        });
      }
      return Promise.resolve();
    };

    handleSeeMoreClick = () =>
      this.loadMore().then(newState => {
        this.setState(newState);
      });

    render() {
      const { elementsToRender, isListFinished, showSeeMore } = this.state;
      const { renderSeeMoreComponent, renderLoadingComponent } = this.props;

      const rest = omit(this.props, Object.keys(WithInfiniteScroll.propTypes));

      let loadingOrButton = null;

      if (!isListFinished) {
        if (showSeeMore && renderSeeMoreComponent) {
          loadingOrButton = renderSeeMoreComponent({
            onSeeMoreClick: this.handleSeeMoreClick,
          });
        } else {
          loadingOrButton = (
            <div
              ref={spinner => {
                this.sentinel = spinner;
              }}
              className={
                renderLoadingComponent ? null : getClassNames('bpk-sentinel')
              }
            >
              {renderLoadingComponent && renderLoadingComponent()}
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
