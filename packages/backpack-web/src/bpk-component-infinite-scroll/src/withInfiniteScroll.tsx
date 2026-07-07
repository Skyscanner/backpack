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

import type { ComponentType, ReactNode } from 'react';
import { Component } from 'react';

import omit from 'lodash/omit';

import { cssModules } from '../../bpk-react-utils';

import './intersection-observer';
import type DataSource from './DataSource';

import STYLES from './withInfiniteScroll.module.scss';

const getClassNames = cssModules(STYLES);

type ScrollEvent = {
  currentIndex: number;
};

type ScrollFinishedEvent = {
  totalNumberElements: number;
};

export type Props = {
  dataSource: DataSource<any>;
  /**
   * How many more elements to load every time the user reaches the bottom of the list.
   */
  elementsPerScroll?: number;
  /**
   * How many more elements to load every time the user reaches the bottom of the list.
   */
  initiallyLoadedElements?: number;
  loaderIntersectionTrigger?: 'small' | 'half' | 'full';
  onScroll?: ((o: ScrollEvent) => void) | null;
  onScrollFinished?: ((o: ScrollFinishedEvent) => void) | null;
  renderLoadingComponent?: (() => ReactNode) | null;
  renderSeeMoreComponent?:
    | ((props: { onSeeMoreClick: () => void }) => ReactNode)
    | null;
  /**
   * `seeMoreAfter` is how many scrolls should happen before a 'See more' button is displayed. This only happens once.
   */
  seeMoreAfter?: number | null;
};

export type State = {
  index: number;
  elementsToRender: any[];
  isListFinished: boolean;
  showSeeMore: boolean;
};

type ExtendedProps = {
  elements: any[];
};

type FetchItemsConfig = {
  index?: number;
  elementsPerScroll?: number;
  elementsToRender?: any[];
  computeShowSeeMore?: boolean;
};

const defaultProps = {
  initiallyLoadedElements: 5,
  elementsPerScroll: 5,
  loaderIntersectionTrigger: 'full' as const,
  onScroll: null,
  onScrollFinished: null,
  renderLoadingComponent: null,
  renderSeeMoreComponent: null,
  seeMoreAfter: null,
};

const OWN_PROP_KEYS: Array<keyof Props> = [
  'initiallyLoadedElements',
  'elementsPerScroll',
  'dataSource',
  'loaderIntersectionTrigger',
  'onScroll',
  'onScrollFinished',
  'renderLoadingComponent',
  'renderSeeMoreComponent',
  'seeMoreAfter',
];

const withInfiniteScroll = <T extends ExtendedProps>(
  ComponentToExtend: ComponentType<T>,
): ComponentType<Props & Omit<T, keyof ExtendedProps>> =>
  (class WithInfiniteScroll extends Component<Props, State> {
    observer: IntersectionObserver;

    sentinel: HTMLElement | null;

    constructor(props: Props) {
      super(props);

      this.sentinel = null;

      this.state = {
        index: 0,
        elementsToRender: [],
        isListFinished: false,
        showSeeMore: false,
      };

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
      this.props.dataSource.onDataChange(this.updateData);
      this.fetchItems({
        elementsPerScroll:
          this.props.initiallyLoadedElements ?? defaultProps.initiallyLoadedElements,
      })
        .then((newState) => {
          this.setState((prevState) => ({
            ...prevState,
            ...newState,
          }));
        })
        .catch(console.error);
    }

    componentDidUpdate(prevProps: Props) {
      if (this.sentinel && this.state.index > 0) {
        this.observer.observe(this.sentinel);
      }

      if (this.props.dataSource !== prevProps.dataSource) {
        prevProps.dataSource.removeListener(this.updateData);
        this.props.dataSource.onDataChange(this.updateData);
        this.fetchItems({
          index: 0,
          elementsPerScroll: this.props.initiallyLoadedElements ?? defaultProps.initiallyLoadedElements,
          elementsToRender: [],
        })
          .then((newState) => this.setStateAfterDsUpdate(newState))
          .catch(console.error);
      }
    }

    componentWillUnmount() {
      this.props.dataSource.removeListener(this.updateData);
      if (this.sentinel) {
        this.observer.unobserve(this.sentinel);
      }
    }

    setStateAfterDsUpdate(newState: Partial<State>) {
      // After a data source update (calling updateData in the data source or changing the dataSource prop)
      // all visible data is fetched again (from 0 to current index) to update the list with the new data.
      // If after this call there is no elementsToRender or index present in state
      // it means the new data source has no items and we need to
      // reset the list, which we do by setting `elementsToRender` to `[]` and `index` to `0`
      this.setState((prevState) => ({
        ...prevState,
        ...newState,
        elementsToRender: newState.elementsToRender || [],
        index: newState.index || 0,
      }));
    }

    updateData = () => {
      const { index } = this.state;
      // This means updateData was called before any data was loaded, e.g.
      // An ArrayDataSource initialized empty and then changed latter on via `updateData`
      // In this case we want to load new data and not just replace the old one.
      // "See More After" should also be computed again in this case.
      const initiallyLoaded = this.props.initiallyLoadedElements ?? defaultProps.initiallyLoadedElements;
      const isFirstLoad = index < initiallyLoaded;
      this.fetchItems({
        index: 0,
        elementsPerScroll: isFirstLoad ? initiallyLoaded : index,
        elementsToRender: [],
        computeShowSeeMore: isFirstLoad,
      })
        .then((newState) => this.setStateAfterDsUpdate(newState))
        .catch(console.error);
    };

    fetchItems(config?: FetchItemsConfig): Promise<Partial<State>> {
      const { onScrollFinished, seeMoreAfter } = this.props;
      const merged = {
        index: this.state.index,
        elementsPerScroll:
          this.props.elementsPerScroll ?? defaultProps.elementsPerScroll,
        elementsToRender: this.state.elementsToRender,
        computeShowSeeMore: true,
        ...config,
      };
      const { computeShowSeeMore, elementsPerScroll, elementsToRender, index } =
        merged;

      return this.props.dataSource
        .fetchItems(index, elementsPerScroll)
        .then((nextElements) => {
          let result: Partial<State> = {
            isListFinished: true,
          };
          if (nextElements && nextElements.length > 0) {
            const nextIndex = index + elementsPerScroll;
            result = {
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
              totalNumberElements: (result.elementsToRender || elementsToRender || []).length,
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
        return this.fetchItems()
          .then((newState) => {
            this.setState((prevState) => ({
              ...prevState,
              ...newState,
            }));
          })
          .catch(console.error);
      }
      return Promise.resolve();
    };

    handleSeeMoreClick = (): void => {
      this.fetchItems()
        .then((newState) => {
          this.setState((prevState) => ({
            ...prevState,
            ...newState,
          }));
        })
        .catch(console.error);
    };

    render() {
      const { elementsToRender, isListFinished, showSeeMore } = this.state;
      const { renderLoadingComponent, renderSeeMoreComponent } = this.props;

      const rest = omit(this.props, OWN_PROP_KEYS);

      let loadingOrButton: ReactNode = null;

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
              className={
                renderLoadingComponent ? undefined : getClassNames('bpk-sentinel')
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
            {...(rest as any)}
            elements={elementsToRender}
          />
          {loadingOrButton}
        </div>
      );
    }
  } as unknown as ComponentType<Props & Omit<T, keyof ExtendedProps>>);

export default withInfiniteScroll;
