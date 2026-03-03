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

import { Component } from 'react';
import type { ReactNode, CSSProperties } from 'react';

import CSSTransition from 'react-transition-group/CSSTransition';

import { animations } from '@skyscanner/bpk-foundations-web/tokens/base.es6';

import { BpkSpinner } from '../../bpk-component-spinner';
import { cssModules, getDataComponentAttribute } from '../../bpk-react-utils';

import STYLES from './BpkBackgroundImage.module.scss';

const getClassName = cssModules(STYLES);

export type BpkBackgroundImageProps = {
  children?: ReactNode;
  aspectRatio: number;
  inView?: boolean;
  loading?: boolean;
  src: string;
  className?: string;
  onError?: (() => void) | null;
  onLoad?: (() => void) | null;
  style?: {};
  imageStyle?: CSSProperties;
};

class BpkBackgroundImage extends Component<BpkBackgroundImageProps> {
  trackImg?: HTMLImageElement | null;

  static defaultProps = {
    className: '',
    inView: true,
    loading: false,
    onLoad: null,
    onError: null,
    style: {},
    imageStyle: {},
  };

  constructor(props: BpkBackgroundImageProps) {
    super(props);
    this.trackImg = null;
  }

  componentDidMount() {
    if (this.props.inView) {
      this.startImageLoad();
    }
  }

  componentDidUpdate(prevProps: BpkBackgroundImageProps) {
    const { inView, src } = this.props;

    if (prevProps.src !== src || (inView && !prevProps.inView)) {
      this.startImageLoad();
    }
  }

  onBackgroundImageError = (): void => {
    if (this.props.onError) {
      this.props.onError();
    }
  };

  onBackgroundImageLoad = (): void => {
    if (this.props.onLoad) {
      this.props.onLoad();
    }
    delete this.trackImg;
  };

  getAspectRatio = () => {
    if (this.props.aspectRatio) {
      return this.props.aspectRatio;
    }
    return 1;
  };

  startImageLoad = (): void => {
    this.trackImg = new Image();
    this.trackImg.src = this.props.src;
    this.trackImg.onerror = this.onBackgroundImageError;
    this.trackImg.onload = this.onBackgroundImageLoad;
  };

  render() {
    const { children, className, imageStyle, inView, loading, src, style } =
      this.props;

    const calculatedAspectRatio = this.getAspectRatio();
    const aspectRatioPc = `${100 / calculatedAspectRatio}%`;

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
          {...getDataComponentAttribute('BackgroundImage')}
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
                exit: getClassName('bpk-background-image__spinner--shown'),
                exitActive: getClassName(
                  'bpk-background-image__spinner--hidden',
                ),
              }}
              timeout={parseInt(animations.durationBase, 10)}
            >
              <div className={getClassName('bpk-background-image__spinner')}>
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

export default BpkBackgroundImage;