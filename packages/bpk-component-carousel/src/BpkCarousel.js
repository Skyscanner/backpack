/*
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2016-2019 Skyscanner Ltd
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
import React, { Children, Component, createRef } from 'react';
import { cssModules } from 'bpk-react-utils';

import BpkButton from '../../bpk-component-button';
import { withButtonAlignment, withRtlSupport } from '../../bpk-component-icon';
import ArrowLeftIcon from '../../bpk-component-icon/sm/long-arrow-left';
import ArrowRightIcon from '../../bpk-component-icon/sm/long-arrow-right';

import STYLES from './BpkCarousel.scss';

const AlignedArrowLeft = withButtonAlignment(withRtlSupport(ArrowLeftIcon));
const AlignedArrowRight = withButtonAlignment(withRtlSupport(ArrowRightIcon));

const getClassName = cssModules(STYLES);

type Props = {
  className: ?string,
  wrapperClassName: ?string,
  itemClassName: ?string,
  children: Node,
};

type State = {
  position: number,
  prevArrowDisabled: boolean,
  nextArrowDisabled: boolean,
};

class BpkCarousel extends Component<Props, State> {
  wrapperRef: Object;

  firstItemRef: Object;

  wrapperWidth: number;

  itemWidth: number;

  static defaultProps = {};

  constructor(props: Props) {
    super(props);

    this.wrapperRef = createRef();
    this.firstItemRef = createRef();

    this.state = {
      position: 0,
      prevArrowDisabled: true,
      nextArrowDisabled: false,
    };
  }

  // Here we are getting the widths of elements to use when doing translations
  componentDidMount() {
    const { position } = this.state;
    const { children } = this.props;
    this.wrapperWidth =
      this.wrapperRef && this.wrapperRef.current
        ? this.wrapperRef.current.offsetWidth
        : 0;
    this.itemWidth =
      this.firstItemRef && this.firstItemRef.current
        ? this.firstItemRef.current.offsetWidth
        : 0;
    const itemsShown = Math.floor(this.wrapperWidth / this.itemWidth);
    this.setState({
      nextArrowDisabled:
        position === Children.count(children) - itemsShown ||
        Children.count(children) === itemsShown,
      prevArrowDisabled: position === 0,
    });
  }

  // Function to do the animation based on the item size that is moving
  getTranslate = () => {
    const { position } = this.state;
    return `calc((-${this.itemWidth}px) * ${position})`;
  };

  // Function that will handle moving to the next slide
  nextSlide = () => {
    const { position } = this.state;
    const { children } = this.props;
    const numItems = Children.count(children) || 1;
    this.doSliding(position === numItems - 1 ? 0 : position + 1);
  };

  // Function that will handle moving to the previous slide
  prevSlide = () => {
    const { position } = this.state;
    const { children } = this.props;
    const numItems = Children.count(children) || 1;
    this.doSliding(position === 0 ? numItems - 1 : position - 1);
  };

  // Handles the settings of the slider position and calculating if the bottons should be disabled
  doSliding = (position: number) => {
    const { children } = this.props;
    const itemsShown = Math.floor(this.wrapperWidth / this.itemWidth);
    this.setState({
      position,
      nextArrowDisabled:
        position === Children.count(children) - itemsShown ||
        Children.count(children) === itemsShown,
      prevArrowDisabled: position === 0,
    });
  };

  render() {
    const {
      className,
      wrapperClassName,
      itemClassName,
      children,
      ...rest
    } = this.props;
    const classNames = getClassName('bpk-carousel', className);
    const wrapperClassNames = getClassName(
      'bpk-carousel__wrapper',
      wrapperClassName,
    );
    const itemClassNames = getClassName('bpk-carousel__item', itemClassName);

    return (
      <div className={classNames} {...rest}>
        <div>
          <BpkButton
            iconOnly
            disabled={this.state.prevArrowDisabled}
            onClick={() => this.prevSlide()}
          >
            <AlignedArrowLeft />
          </BpkButton>
        </div>
        <div className={wrapperClassNames} ref={this.wrapperRef}>
          <div
            className={getClassName('bpk-carousel__container')}
            style={{ marginLeft: `${this.getTranslate()}` }}
          >
            {Children.toArray(children).map((child, index) => (
              <div ref={index === 0 ? this.firstItemRef : null}>
                <div className={itemClassNames}>{child}</div>
              </div>
            ))}
          </div>
        </div>
        <div>
          <BpkButton
            iconOnly
            disabled={this.state.nextArrowDisabled}
            onClick={() => this.nextSlide()}
          >
            <AlignedArrowRight />
          </BpkButton>
        </div>
      </div>
    );
  }
}

BpkCarousel.propTypes = {
  className: PropTypes.string,
  wrapperClassName: PropTypes.string,
  itemClassName: PropTypes.string,
  children: PropTypes.node,
};

BpkCarousel.defaultProps = {
  className: null,
  wrapperClassName: null,
  itemClassName: null,
  children: [],
};

export default BpkCarousel;
