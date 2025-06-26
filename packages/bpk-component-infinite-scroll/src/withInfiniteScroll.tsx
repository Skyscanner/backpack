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

import PropTypes from 'prop-types';
import { Component } from 'react';
// @ts-expect-error TS(2724): '"react"' has no exported member named 'Element'. ... Remove this comment to see the full error message
import type { Element, Config, AbstractComponent } from 'react';

import extend from 'lodash/extend';
import omit from 'lodash/omit';

import { cssModules } from '../../bpk-react-utils';

import './intersection-observer';
import DataSource from './DataSource';

import STYLES from './withInfiniteScroll.module.scss';

const getClassNames = cssModules(STYLES);

type ScrollEvent = {
  currentIndex: number,
};

type ScrollFinishedEvent = {
  totalNumberElements: number,
};

export type Props = {
  dataSource: DataSource<any>,
  /**
   * How many more elements to load every time the user reaches the bottom of the list.
   */
  elementsPerScroll: number,
  /**
   * How many more elements to load every time the user reaches the bottom of the list.
   */
  initiallyLoadedElements: number,
  loaderIntersectionTrigger: "small" | "half" | "full" | null | undefined,
  onScroll: ((o: ScrollEvent) => void) | null | undefined,
  onScrollFinished: ((o: ScrollFinishedEvent) => void) | null | undefined,
  renderLoadingComponent: (() => Element<any>) | null | undefined,
  renderSeeMoreComponent?: (args: {
    onSeeMoreClick: (event: React.SyntheticEvent<any>) => unknown,
  }) => React.ReactElement,
  /**
   * `seeMoreAfter` is how many scrolls should happen before a 'See more' button is displayed. This only happens once.
   */
  seeMoreAfter: number | null | undefined,
};

export type State = {
  index: number,
  elementsToRender: any[],
  isListFinished: boolean,
  showSeeMore: boolean,
};

type ExtendedProps = {
  elements: any[],
};

const propTypes = {
  initiallyLoadedElements: PropTypes.number,
  elementsPerScroll: PropTypes.number,
  dataSource: PropTypes.instanceOf(DataSource).isRequired,
  loaderIntersectionTrigger: PropTypes.oneOf(['small', 'half', 'full']),
  onScroll: PropTypes.func,
  onScrollFinished: PropTypes.func,
  renderLoadingComponent: PropTypes.func,
  renderSeeMoreComponent: PropTypes.func,
  seeMoreAfter: PropTypes.number,
};

const defaultProps = {
  initiallyLoadedElements: 5,
  elementsPerScroll: 5,
  loaderIntersectionTrigger: 'full',
  onScroll: null,
  onScrollFinished: null,
  renderLoadingComponent: null,
  renderSeeMoreComponent: null,
  seeMoreAfter: null,
};

type PropsWithDefault = Config<Props, typeof defaultProps>;

const withInfiniteScroll = <T extends ExtendedProps>(
  ComponentToExtend: AbstractComponent<T>,
): AbstractComponent<PropsWithDefault & Omit<T, keyof ExtendedProps>> =>
    class WithInfiniteScroll extends Component<Props, State> {

    // @ts-expect-error TS(2304): Cannot find name 'handleKeyPress'.
    handleKeyPress: (e: SyntheticKeyboardEvent<HTMLButtonElement>) => void;

    observer: IntersectionObserver;

    sentinel: HTMLElement | null | undefined;

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

      const thresholds = {
        small: 0.01,
        half: 0.5,
        full: 0.99, // using 0.99 instead of 1 to avoid problems with float precision in IE11
      };
      const displaySize = this.props.loaderIntersectionTrigger || 'full';
      this.observer = new IntersectionObserver(this.handleIntersection, {
        threshold: thresholds[displaySize] || thresholds.full,
      });
    }

    componentDidMount() {
      this.fetchItems({
        elementsPerScroll: this.props.initiallyLoadedElements,
      }).then((newState) => {
        this.setState({
          index: newState.index ?? 0,
          elementsToRender: newState.elementsToRender ?? [],
          isListFinished: newState.isListFinished ?? false,
          showSeeMore: newState.showSeeMore ?? false,
        });
      });
    }

    componentDidUpdate(prevProps: { dataSource: DataSource<any>; }) {
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
        }).then((newState) =>
          this.setStateAfterDsUpdate({
            index: newState.index ?? 0,
            elementsToRender: newState.elementsToRender ?? [],
            isListFinished: newState.isListFinished ?? false,
            showSeeMore: newState.showSeeMore ?? false,
          })
        );
      }
    }

    componentWillUnmount() {
      this.props.dataSource.removeListener(this.updateData);
      if (this.sentinel) {
        this.observer.unobserve(this.sentinel);
      }
    }

    setStateAfterDsUpdate(newState: State) {
      // After a data source update (calling updateData in the data source or changing the dataSource prop)
      // all visible data is fetched again (from 0 to current index) to update the list with the new data.
      // If after this call there is no elementsToRender or index present in state
      // it means the new data source has no items and we need to
      // reset the list, which we do by setting `elementsToRender` to `[]` and `index` to `0`
      const { elementsToRender, index } = newState;
      this.setState({
        ...newState,
        elementsToRender: elementsToRender || [],
        index: index || 0,
      });
    }

    updateData = () => {
      const { index } = this.state;
      // This means updateData was called before any data was loaded, e.g.
      // An ArrayDataSource initialized empty and then changed latter on via `updateData`
      // In this case we want to load new data and not just replace the old one.
      // "See More After" should also be computed again in this case.
      const isFirstLoad = index < this.props.elementsPerScroll;
      this.fetchItems({
        index: 0,
        elementsPerScroll: isFirstLoad ? this.props.elementsPerScroll : index,
        elementsToRender: [],
        computeShowSeeMore: isFirstLoad,
      }).then((newState) =>
        this.setStateAfterDsUpdate({
          index: newState.index ?? 0,
          elementsToRender: newState.elementsToRender ?? [],
          isListFinished: newState.isListFinished ?? false,
          showSeeMore: newState.showSeeMore ?? false,
        })
      );
    };

    fetchItems(config: { elementsPerScroll: number; index?: number; elementsToRender?: never[]; computeShowSeeMore?: boolean; } | undefined): Promise<Partial<State>> {
      const { onScrollFinished, seeMoreAfter } = this.props;
      const { computeShowSeeMore, elementsPerScroll, elementsToRender, index } =
        extend(
          {
            index: this.state.index,
            elementsPerScroll: this.props.elementsPerScroll,
            elementsToRender: this.state.elementsToRender,
            computeShowSeeMore: true,
          },
          config,
        );

      return this.props.dataSource
        .fetchItems(index, elementsPerScroll)
        .then((nextElements) => {
          let result = {
            isListFinished: true,
          };
          if (nextElements && nextElements.length > 0) {
            const nextIndex = index + elementsPerScroll;
            result = {
              // @ts-expect-error TS(2304): Cannot find name 'index'.
              index: nextIndex,
              elementsToRender: (elementsToRender || []).concat(nextElements),
              showSeeMore: computeShowSeeMore
                ? seeMoreAfter === index / elementsPerScroll
                : this.state.showSeeMore,
              isListFinished: nextElements.length < elementsPerScroll,
            };
          }
          if (onScrollFinished && result.isListFinished) {
            onScrollFinished({
              totalNumberElements: elementsToRender.length,
            });
          }
          return result;
        });
    }

   handleIntersection = (entries: IntersectionObserverEntry[]) => {
      const { onScroll } = this.props;
      const entry = entries[0];
      if (entry.isIntersecting) {
        if (this.sentinel) {
          this.observer.unobserve(this.sentinel);
        }
        if (onScroll) {
          onScroll({ currentIndex: this.state.index });
        }
        // @ts-expect-error TS(2532): Object is possibly 'undefined'.
        return this.fetchItems().then((newState) => {
          this.setState({
            index: newState.index ?? 0,
            elementsToRender: newState.elementsToRender ?? [],
            isListFinished: newState.isListFinished ?? false,
            showSeeMore: newState.showSeeMore ?? false,
          });
        });
      }
      return Promise.resolve();
    };

    handleSeeMoreClick = (): void => {
      // @ts-expect-error TS(2532): Object is possibly 'undefined'.
      this.fetchItems().then((newState) => {
        this.setState({
          index: newState.index ?? 0,
          elementsToRender: newState.elementsToRender ?? [],
          isListFinished: newState.isListFinished ?? false,
          showSeeMore: newState.showSeeMore ?? false,
        });
      });
    };

    render() {
      const { elementsToRender, isListFinished, showSeeMore } = this.state;
      const { renderLoadingComponent, renderSeeMoreComponent } = this.props;

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
              ref={(spinner) => {
                this.sentinel = spinner;
              }}
              // @ts-expect-error TS(2322): Type 'string | null' is not assignable to type 'st... Remove this comment to see the full error message
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
          <ComponentToExtend
          {...rest} elements={elementsToRender} />
          {loadingOrButton}
        </div>
      );
    }
  };

export default withInfiniteScroll;
