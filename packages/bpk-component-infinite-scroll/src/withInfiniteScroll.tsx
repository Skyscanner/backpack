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

/* @flow strict */

import PropTypes from 'prop-types';
import { Component } from 'react';
// @ts-expect-error TS(2724): '"react"' has no exported member named 'Element'. ... Remove this comment to see the full error message
import type { Element, Config, AbstractComponent } from 'react';

import extend from 'lodash/extend';
import omit from 'lodash/omit';

import { cssModules } from '../../bpk-react-utils';

import './intersection-observer';
import DataSource from './DataSource';

// @ts-expect-error TS(2307): Cannot find module './withInfiniteScroll.module.sc... Remove this comment to see the full error message
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
  loaderIntersectionTrigger: ?('small' | 'half' | 'full'),
  onScroll: ?(o: ScrollEvent) => void,
  onScrollFinished: ?(o: ScrollFinishedEvent) => void,
  renderLoadingComponent: ?() => Element<any>,
  renderSeeMoreComponent: ?({
    // @ts-expect-error TS(2304): Cannot find name 'SyntheticEvent'.
    onSeeMoreClick: (event: SyntheticEvent<any>) => mixed,
  // @ts-expect-error TS(7010): 'Element', which lacks return-type annotation, imp... Remove this comment to see the full error message
  }) => Element<any>,
  /**
   * `seeMoreAfter` is how many scrolls should happen before a 'See more' button is displayed. This only happens once.
   */
  seeMoreAfter: ?number,
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

// @ts-expect-error TS(2304): Cannot find name 'T'.
const withInfiniteScroll = <T: ExtendedProps>(
  // @ts-expect-error TS(2304): Cannot find name 'T'.
  // @ts-expect-error TS(2304) FIXME: Cannot find name 'T'.
  // @ts-expect-error TS(2304): Cannot find name 'T'.
  ComponentToExtend: AbstractComponent<T>,
// @ts-expect-error TS(2693): 'PropsWithDefault' only refers to a type, but is b... Remove this comment to see the full error message
// @ts-expect-error TS(2693) FIXME: 'PropsWithDefault' only refers to a type, but is b... Remove this comment to see the full error message
// @ts-expect-error TS(2693): 'PropsWithDefault' only refers to a type, but is b... Remove this comment to see the full error message
): AbstractComponent<PropsWithDefault & $Diff<T, ExtendedProps>> =>
  // @ts-expect-error TS(2693): 'Props' only refers to a type, but is being used a... Remove this comment to see the full error message
  // @ts-expect-error TS(2693) FIXME: 'Props' only refers to a type, but is being used a... Remove this comment to see the full error message
  // @ts-expect-error TS(2693): 'Props' only refers to a type, but is being used a... Remove this comment to see the full error message
  class WithInfiniteScroll extends Component<Props, State> {

    // @ts-expect-error TS(2304): Cannot find name 'handleKeyPress'.
    handleKeyPress: (e: SyntheticKeyboardEvent<HTMLButtonElement>) => void;

    observer: IntersectionObserver;

    sentinel: ?HTMLElement;

    // @ts-expect-error TS(2609): JSX spread child must be an array type.
    // @ts-expect-error TS(2609) FIXME: JSX spread child must be an array type.
    // @ts-expect-error TS(2609): JSX spread child must be an array type.
    static propTypes = { ...propTypes };

    // @ts-expect-error TS(2609): JSX spread child must be an array type.
    // @ts-expect-error TS(2609) FIXME: JSX spread child must be an array type.
    // @ts-expect-error TS(2609): JSX spread child must be an array type.
    static defaultProps = { ...defaultProps };

    constructor(props: Props) {
      // @ts-expect-error TS(2337): Super calls are not permitted outside constructors... Remove this comment to see the full error message
      super(props);

      this.state = {
        // @ts-expect-error TS(2304): Cannot find name 'index'.
        index: 0,
        elementsToRender: [],
        isListFinished: false,
        showSeeMore: false,
      };

      this.props.dataSource.onDataChange(this.updateData);

      const thresholds = {
        // @ts-expect-error TS(2304): Cannot find name 'small'.
        small: 0.01,
        half: 0.5,
        full: 0.99, // using 0.99 instead of 1 to avoid problems with float precision in IE11
      };
      const displaySize = this.props.loaderIntersectionTrigger || 'full';
      this.observer = new IntersectionObserver(this.handleIntersection, {
        // @ts-expect-error TS(2304): Cannot find name 'threshold'.
        threshold: thresholds[displaySize] || thresholds.full,
      });
    }

    componentDidMount() {
      // @ts-expect-error TS(2532): Object is possibly 'undefined'.
      this.fetchItems({
        // @ts-expect-error TS(2532): Object is possibly 'undefined'.
        elementsPerScroll: this.props.initiallyLoadedElements,
      // @ts-expect-error TS(7006): Parameter 'newState' implicitly has an 'any' type.
      }).then((newState) => {
        // @ts-expect-error TS(2532): Object is possibly 'undefined'.
        this.setState(newState);
      });
    }

    componentDidUpdate(prevProps) {
      if (this.sentinel && this.state.index > 0) {
        // @ts-expect-error TS(2532): Object is possibly 'undefined'.
        this.observer.observe(this.sentinel);
      }

      if (this.props.dataSource !== prevProps.dataSource) {
        // @ts-expect-error TS(2304): Cannot find name 'prevProps'.
        prevProps.dataSource.removeListener(this.updateData);
        this.props.dataSource.onDataChange(this.updateData);
        this.fetchItems({
          // @ts-expect-error TS(2304): Cannot find name 'index'.
          index: 0,
          elementsPerScroll: this.props.elementsPerScroll,
          elementsToRender: [],
        }).then((newState) => this.setStateAfterDsUpdate(newState));
      }
    }

    componentWillUnmount() {
      // @ts-expect-error TS(2532): Object is possibly 'undefined'.
      this.props.dataSource.removeListener(this.updateData);
      if (this.sentinel) {
        // @ts-expect-error TS(2532): Object is possibly 'undefined'.
        this.observer.unobserve(this.sentinel);
      }
    }

    setStateAfterDsUpdate(newState: State) {
      // After a data source update (calling updateData in the data source or changing the dataSource prop)
      // all visible data is fetched again (from 0 to current index) to update the list with the new data.
      // If after this call there is no elementsToRender or index present in state
      // it means the new data source has no items and we need to
      // reset the list, which we do by setting `elementsToRender` to `[]` and `index` to `0`
      // @ts-expect-error TS(2304): Cannot find name 'elementsToRender'.
      const { elementsToRender, index } = newState;
      // @ts-expect-error TS(2609): JSX spread child must be an array type.
      // @ts-expect-error TS(2609) FIXME: JSX spread child must be an array type.
      // @ts-expect-error TS(2609): JSX spread child must be an array type.
      this.setState({
        // @ts-expect-error TS(2304): Cannot find name 'newState'.
        ...newState,
        // @ts-expect-error TS(2304): Cannot find name 'elementsToRender'.
        elementsToRender: elementsToRender || [],
        index: index || 0,
      });
    }

    updateData = () => {
      // @ts-expect-error TS(2304): Cannot find name 'index'.
      const { index } = this.state;
      // This means updateData was called before any data was loaded, e.g.
      // An ArrayDataSource initialized empty and then changed latter on via `updateData`
      // In this case we want to load new data and not just replace the old one.
      // "See More After" should also be computed again in this case.
      // @ts-expect-error TS(2532): Object is possibly 'undefined'.
      // @ts-expect-error TS(2532) FIXME: Object is possibly 'undefined'.
      // @ts-expect-error TS(2532): Object is possibly 'undefined'.
      const isFirstLoad = index < this.props.elementsPerScroll;
      this.fetchItems({
        // @ts-expect-error TS(2304): Cannot find name 'index'.
        index: 0,
        elementsPerScroll: isFirstLoad ? this.props.elementsPerScroll : index,
        elementsToRender: [],
        computeShowSeeMore: isFirstLoad,
      }).then((newState) => this.setStateAfterDsUpdate(newState));
    };

    // @ts-expect-error TS(2304): Cannot find name '$Shape'.
    // @ts-expect-error TS(2304) FIXME: Cannot find name '$Shape'.
    // @ts-expect-error TS(2304): Cannot find name '$Shape'.
    fetchItems(config): Promise<$Shape<State>> {
      // @ts-expect-error TS(2304): Cannot find name 'onScrollFinished'.
      const { onScrollFinished, seeMoreAfter } = this.props;
      // @ts-expect-error TS(2304): Cannot find name 'computeShowSeeMore'.
      // @ts-expect-error TS(2304) FIXME: Cannot find name 'computeShowSeeMore'.
      // @ts-expect-error TS(2304): Cannot find name 'computeShowSeeMore'.
      const { computeShowSeeMore, elementsPerScroll, elementsToRender, index } =
        extend(
          {
            // @ts-expect-error TS(2304): Cannot find name 'index'.
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
          // @ts-expect-error TS(2304): Cannot find name 'let'.
          let result = {
            // @ts-expect-error TS(2304): Cannot find name 'isListFinished'.
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
              // @ts-expect-error TS(2339): Property 'elementsPerScroll' does not exist on typ... Remove this comment to see the full error message
              // @ts-expect-error TS(2339) FIXME: Property 'elementsPerScroll' does not exist on typ... Remove this comment to see the full error message
              // @ts-expect-error TS(2339): Property 'elementsPerScroll' does not exist on typ... Remove this comment to see the full error message
              isListFinished: nextElements.length < elementsPerScroll,
            };
          }
          if (onScrollFinished && result.isListFinished) {
            // @ts-expect-error TS(2304): Cannot find name 'onScrollFinished'.
            onScrollFinished({
              // @ts-expect-error TS(2304): Cannot find name 'elementsToRender'.
              totalNumberElements: elementsToRender.length,
            });
          }
          return result;
        });
    }

    // @ts-expect-error TS(2786): 'IntersectionObserverEntry' cannot be used as a JS... Remove this comment to see the full error message
    // @ts-expect-error TS(2786) FIXME: 'IntersectionObserverEntry' cannot be used as a JS... Remove this comment to see the full error message
    // @ts-expect-error TS(2786): 'IntersectionObserverEntry' cannot be used as a JS... Remove this comment to see the full error message
    handleIntersection = (entries: Array<IntersectionObserverEntry>) => {
      // @ts-expect-error TS(2304): Cannot find name 'onScroll'.
      const { onScroll } = this.props;
      const entry = entries[0];
      if (entry.isIntersecting) {
        if (this.sentinel) {
          // @ts-expect-error TS(2532): Object is possibly 'undefined'.
          this.observer.unobserve(this.sentinel);
        }
        if (onScroll) {
          // @ts-expect-error TS(2304): Cannot find name 'onScroll'.
          onScroll({ currentIndex: this.state.index });
        }
        return this.fetchItems().then((newState) => {
          // @ts-expect-error TS(2532): Object is possibly 'undefined'.
          this.setState(newState);
        });
      }
      return Promise.resolve();
    };

    handleSeeMoreClick = (): void => {
      // @ts-expect-error TS(2532): Object is possibly 'undefined'.
      this.fetchItems().then((newState) => {
        // @ts-expect-error TS(2532): Object is possibly 'undefined'.
        this.setState(newState);
      });
    };

    render() {
      // @ts-expect-error TS(2304): Cannot find name 'elementsToRender'.
      const { elementsToRender, isListFinished, showSeeMore } = this.state;
      // @ts-expect-error TS(2304): Cannot find name 'renderLoadingComponent'.
      // @ts-expect-error TS(2304) FIXME: Cannot find name 'renderLoadingComponent'.
      // @ts-expect-error TS(2304): Cannot find name 'renderLoadingComponent'.
      const { renderLoadingComponent, renderSeeMoreComponent } = this.props;

      const rest = omit(this.props, Object.keys(propTypes));

      let loadingOrButton = null;

      if (!isListFinished) {
        if (showSeeMore && renderSeeMoreComponent) {
          // @ts-expect-error TS(2304): Cannot find name 'loadingOrButton'.
          loadingOrButton = renderSeeMoreComponent({
            // @ts-expect-error TS(2532): Object is possibly 'undefined'.
            onSeeMoreClick: this.handleSeeMoreClick,
          });
        } else {
          // @ts-expect-error TS(2304): Cannot find name 'loadingOrButton'.
          loadingOrButton = (
            <div
              ref={(spinner) => {
                // @ts-expect-error TS(2532): Object is possibly 'undefined'.
                this.sentinel = spinner;
              }}
              // @ts-expect-error TS(2322): Type 'string | null' is not assignable to type 'st... Remove this comment to see the full error message
              className={
                // @ts-expect-error TS(2304): Cannot find name 'renderLoadingComponent'.
                renderLoadingComponent ? null : getClassNames('bpk-sentinel')
              }
            >
              // @ts-expect-error TS(2304): Cannot find name 'renderLoadingComponent'.
              // @ts-expect-error TS(2304) FIXME: Cannot find name 'renderLoadingComponent'.
              // @ts-expect-error TS(2304): Cannot find name 'renderLoadingComponent'.
              {renderLoadingComponent && renderLoadingComponent()}
            </div>
          );
        }
      }

      return (
        <div>
          // @ts-expect-error TS(2304): Cannot find name 'ComponentToExtend'.
          // @ts-expect-error TS(2304) FIXME: Cannot find name 'ComponentToExtend'.
          // @ts-expect-error TS(2304): Cannot find name 'ComponentToExtend'.
          <ComponentToExtend {...rest} elements={elementsToRender} />
          // @ts-expect-error TS(2304): Cannot find name 'loadingOrButton'.
          // @ts-expect-error TS(2304) FIXME: Cannot find name 'loadingOrButton'.
          // @ts-expect-error TS(2304): Cannot find name 'loadingOrButton'.
          {loadingOrButton}
        </div>
      );
    }
  };

export default withInfiniteScroll;
