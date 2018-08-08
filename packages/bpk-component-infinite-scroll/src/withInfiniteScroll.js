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
import extend from 'lodash/extend';

import './intersection-observer';
import DataSource from './DataSource';

import STYLES from './withInfiniteScroll.scss';

const getClassNames = cssModules(STYLES);

type ScrollEvent = {
  currentIndex: number,
};

type ScrollFinishedEvent = {
  totalNumberElements: number,
};

export type Props = {
  elementsPerScroll: number,
  dataSource: DataSource<any>,
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

const propTypes = {
  elementsPerScroll: PropTypes.number,
  dataSource: PropTypes.instanceOf(DataSource).isRequired,
  onScroll: PropTypes.func,
  onScrollFinished: PropTypes.func,
  renderLoadingComponent: PropTypes.func,
  renderSeeMoreComponent: PropTypes.func,
  seeMoreAfter: PropTypes.number,
};

const defaultProps = {
  elementsPerScroll: 5,
  onScroll: null,
  onScrollFinished: null,
  renderLoadingComponent: null,
  renderSeeMoreComponent: null,
  seeMoreAfter: null,
};

const withInfiniteScroll = (
  ComponentToExtend: ComponentType<ExtendedProps>,
): ComponentType<Props> =>
  class WithInfiniteScroll extends Component<Props, State> {
    handleIntersection: IntersectionObserverCallback;

    handleKeyPress: (e: SyntheticKeyboardEvent<HTMLButtonElement>) => void;

    handleSeeMoreClick: (e: SyntheticEvent<HTMLButtonElement>) => void;

    observer: IntersectionObserver;

    sentinel: ?HTMLElement;

    static propTypes = { ...propTypes };

    static defaultProps = { ...defaultProps };

    constructor(props: Props) {
      super(props);

      this.state = {
        index: 0,
        elementsToRender: [],
        isListFinished: false,
        showSeeMore: false,
      };

      this.props.dataSource.onDataChange(this.updateData);
      this.observer = new IntersectionObserver(this.handleIntersection, {
        threshold: 1,
      });
    }

    componentDidMount() {
      this.fetchItems().then(newState => {
        this.setState(newState);
      });
    }

    componentDidUpdate(prevProps) {
      if (this.sentinel && this.state.index > 0) {
        this.observer.observe(this.sentinel);
      }

      if (this.props.dataSource !== prevProps.dataSource) {
        prevProps.dataSource.removeListener(this.updateData);
        this.props.dataSource.onDataChange(this.updateData);
        this.fetchItems({
          index: 0,
          elementsPerScroll: this.props.elementsPerScroll,
          elementsToRender: [],
        }).then(newState => {
          this.setState({
            ...newState,
          });
        });
      }
    }

    componentWillUnmount() {
      this.props.dataSource.removeListener(this.updateData);
      if (this.sentinel) {
        this.observer.unobserve(this.sentinel);
      }
    }

    updateData = () => {
      const { index } = this.state;
      this.props.dataSource.fetchItems(0, index).then(updatedElements => {
        this.setState({
          elementsToRender: updatedElements,
        });
      });
    };

    fetchItems(config) {
      const { onScrollFinished, seeMoreAfter } = this.props;
      const { index, elementsPerScroll, elementsToRender } = extend(
        {
          index: this.state.index,
          elementsPerScroll: this.props.elementsPerScroll,
          elementsToRender: this.state.elementsToRender,
        },
        config,
      );

      return this.props.dataSource
        .fetchItems(index, elementsPerScroll)
        .then(nextElements => {
          if (nextElements && nextElements.length > 0) {
            const nextIndex = index + elementsPerScroll;
            return {
              index: nextIndex,
              elementsToRender: (elementsToRender || []).concat(nextElements),
              showSeeMore: seeMoreAfter === index / elementsPerScroll,
              isListFinished: false,
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
      if (entry.intersectionRatio >= 1) {
        if (this.sentinel) {
          this.observer.unobserve(this.sentinel);
        }
        if (onScroll) {
          onScroll({ currentIndex: this.state.index });
        }
        return this.fetchItems().then(newState => {
          this.setState(newState);
        });
      }
      return Promise.resolve();
    };

    handleSeeMoreClick = () => {
      this.fetchItems().then(newState => {
        this.setState(newState);
      });
    };

    render() {
      const { elementsToRender, isListFinished, showSeeMore } = this.state;
      const { renderSeeMoreComponent, renderLoadingComponent } = this.props;

      const rest = omit(this.props, Object.keys(propTypes));

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
