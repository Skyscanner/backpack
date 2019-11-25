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
import React, { Component, Children, cloneElement } from 'react';
import { cssModules } from 'bpk-react-utils';

import BpkButton from '../../bpk-component-button';
import { withButtonAlignment, withRtlSupport } from '../../bpk-component-icon';
import ArrowLeftIcon from '../../bpk-component-icon/sm/long-arrow-left';
import ArrowRightIcon from '../../bpk-component-icon/sm/long-arrow-right';

import STYLES from './BpkCarousel.scss';

const AlignedArrowLeft = withButtonAlignment(withRtlSupport(ArrowLeftIcon));
const AlignedArrowRight = withButtonAlignment(withRtlSupport(ArrowRightIcon));

const getClassName = cssModules(STYLES);

export type Props = {
  className: ?string,
  wrapperClassName: ?string,
  itemClassName: ?string,
  children: ?any,
};

type State = {
  position: number,
  nextArrow: boolean,
  prevArrow: boolean,
};

class BpkCarousel extends Component<Props, State> {
  static propTypes = {
    className: PropTypes.string,
    children: PropTypes.node,
  };

  static defaultProps = {
    className: null,
  };

  constructor(props: Props) {
    super(props);
    this.state = {
      position: 0,
      nextArrow: false,
      prevArrow: true,
    };
  }

  getOrder(itemIndex) {
    const { position } = this.state;
    const { children } = this.props;
    const numItems = children.length || 1;
    if (itemIndex - position < 0) {
      return numItems - Math.abs(itemIndex - position);
    }
    return itemIndex - position;
  }

  nextSlide = () => {
    const { position } = this.state;
    const { children } = this.props;
    const numItems = children.length || 1;
    this.state.prevArrow = false;
    this.doSliding(position === numItems - 1 ? 0 : position + 1);
  };

  prevSlide = () => {
    const { position } = this.state;
    const { children } = this.props;
    const numItems = children.length;
    this.state.nextArrow = false;
    this.doSliding(position === 0 ? numItems - 1 : position - 1);
  };

  doSliding = position => {
    if (position === this.props.children.length - 1) {
      this.state.nextArrow = true;
      this.state.prevArrow = false;
    } else if (position === 0) {
      this.state.nextArrow = false;
      this.state.prevArrow = true;
    }
    this.setState({
      position,
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
    const { prevArrow, nextArrow } = this.state;
    const classNames = getClassName('bpk-carousel', className);
    const wrapperClassNames = getClassName(
      'bpk-carousel__wrapper',
      wrapperClassName,
    );
    const itemClassNames = getClassName('bpk-carousel__item', itemClassName);

    const childrenWithProps = Children.map(children, child =>
      cloneElement(child, {
        numslides: children.length || 1,
      }),
    );

    return (
      <div className={classNames} {...rest}>
        <div>
          <BpkButton
            iconOnly
            disabled={prevArrow}
            onClick={() => this.prevSlide()}
          >
            <AlignedArrowLeft />
          </BpkButton>
        </div>
        <div className={wrapperClassNames}>
          <div className={getClassName('bpk-carousel__container')}>
            {childrenWithProps.map((child, index) => (
              <div
                className={itemClassNames}
                style={{ order: `${this.getOrder(index)}` }}
              >
                {child}
              </div>
            ))}
          </div>
        </div>
        <div>
          <BpkButton
            iconOnly
            disabled={nextArrow}
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
  children: null,
};

export default BpkCarousel;
