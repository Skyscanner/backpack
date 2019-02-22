/*
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2016 - 2019 Skyscanner Ltd
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

import React, { type Node, Component } from 'react';
import PropTypes from 'prop-types';
import { cssModules } from 'bpk-react-utils';
import { BpkSpinner } from 'bpk-component-spinner';
import CSSTransition from 'react-transition-group/CSSTransition';
import { animations } from 'bpk-tokens/tokens/base.es6';

import STYLES from './bpk-background-image.scss';

const getClassName = cssModules(STYLES);

type BpkBackgroundImageProps = {
  children: Node,
  height: number,
  inView: boolean,
  loading: boolean,
  src: string,
  width: number,
  className: ?string,
  onLoad: ?() => mixed,
  style: ?{}, // eslint-disable-line react/forbid-prop-types
  imageStyle: ?{}, // eslint-disable-line react/forbid-prop-types
};

class BpkBackgroundImage extends Component<BpkBackgroundImageProps> {
  trackImg: ?Image;

  onBackgroundImageLoad: () => mixed;

  startImageLoad: () => mixed;

  static defaultProps: {};

  constructor(props: BpkBackgroundImageProps) {
    super(props);
    this.trackImg = null;
  }

  componentDidMount() {
    if (this.props.inView) {
      this.startImageLoad();
    }
  }

  componentWillReceiveProps(newProps: BpkBackgroundImageProps) {
    if (!this.props.inView && newProps.inView) {
      this.startImageLoad();
    }
  }

  onBackgroundImageLoad = (): void => {
    if (this.props.onLoad) {
      this.props.onLoad();
    }
    delete this.trackImg;
  };

  startImageLoad = (): void => {
    this.trackImg = new Image();
    this.trackImg.src = this.props.src;
    this.trackImg.onload = this.onBackgroundImageLoad;
  };

  render(): Node {
    const {
      width,
      height,
      children,
      className,
      inView,
      loading,
      src,
      imageStyle,
      style,
    } = this.props;

    const aspectRatio = width / height;
    const aspectRatioPc = `${100 / aspectRatio}%`;

    const classNames = [getClassName('bpk-background-image')];
    const imageClassNames = [getClassName('bpk-background-image__img')];

    if (!loading) {
      classNames.push(getClassName('bpk-background-image--no-background'));
      imageClassNames.push(getClassName('bpk-background-image__img--shown'));
    }

    return (
      <div style={style} className={className}>
        <div
          style={{
            height: 0,
            paddingBottom: aspectRatioPc,
          }}
          className={classNames.join(' ')}
        >
          <div
            style={{
              backgroundImage: !inView || loading ? '' : `url(${src})`,
              ...imageStyle,
            }}
            className={imageClassNames.join(' ')}
          />
          {loading && (
            <CSSTransition
              classNames={{
                exit: getClassName('bpk-image__spinner--shown'),
                exitActive: getClassName('bpk-image__spinner--hidden'),
              }}
              timeout={parseInt(animations.durationBase, 10)}
            >
              <div className={getClassName('bpk-image__spinner')}>
                <BpkSpinner />
              </div>
            </CSSTransition>
          )}
          {typeof window === 'undefined' && (!inView || loading) && (
            <noscript>
              <div
                style={{
                  backgroundImage: `url(${src})`,
                  ...imageStyle,
                }}
                className={imageClassNames.join(' ')}
              />
            </noscript>
          )}
          {!loading && (
            <div className={getClassName('bpk-background-image__content')}>
              {children}
            </div>
          )}
        </div>
      </div>
    );
  }
}

BpkBackgroundImage.propTypes = {
  height: PropTypes.number.isRequired,
  src: PropTypes.string.isRequired,
  width: PropTypes.number.isRequired,
  className: PropTypes.string,
  inView: PropTypes.bool,
  loading: PropTypes.bool,
  onLoad: PropTypes.func,
  style: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  imageStyle: PropTypes.object, // eslint-disable-line react/forbid-prop-types
};

BpkBackgroundImage.defaultProps = {
  className: null,
  inView: true,
  loading: false,
  onLoad: null,
  style: {},
  imageStyle: {},
};

export default BpkBackgroundImage;
