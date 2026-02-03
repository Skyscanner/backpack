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

import CSSTransition from 'react-transition-group/CSSTransition';

import { animations } from '@skyscanner/bpk-foundations-web/tokens/base.es6';

import { BpkSpinner } from '../../bpk-component-spinner';
import { cssModules, getDataComponentAttribute } from '../../bpk-react-utils';

import BORDER_RADIUS_STYLES from './BpkImageBorderRadiusStyles';

import STYLES from './BpkImage.module.scss';

const getClassName = cssModules(STYLES);

type ImageProps = {
  altText: string;
  hidden?: boolean;
  onImageLoad: () => void;
  [rest: string]: any; // Inexact rest. See decisions/inexact-rest.md
};

class Image extends Component<ImageProps> {
  img?: HTMLImageElement | null;

  static defaultProps = {
    hidden: false,
  };

  constructor(props: ImageProps) {
    super(props);
    this.img = null;
  }

  componentDidMount() {
    if (this.img && this.img.src && this.img.complete) {
      if (this.props.onImageLoad) {
        this.props.onImageLoad();
      }
    }
  }

  setImgRef = (el: HTMLImageElement) => {
    this.img = el;
  };

  render() {
    const { altText, hidden, onImageLoad, ...rest } = this.props;

    const imgClassNames = [getClassName('bpk-image__img')];

    if (hidden) {
      imgClassNames.push(getClassName('bpk-image__img--hidden'));
    }

    return (
      <img
        className={imgClassNames.join(' ')}
        alt={altText}
        onLoad={onImageLoad}
        ref={this.setImgRef}
        {...rest}
      />
    );
  }
}

type BpkImageProps = {
  altText: string;
  src: string;
  /**
   * Note: The `aspectRatio` prop should be calculated as `width/height` of the original src image. It is used by the component to preserve space on screen while the image loads.
   */
  aspectRatio: number;
  inView?: boolean;
  loading?: boolean;
  borderRadiusStyle?: (typeof BORDER_RADIUS_STYLES)[keyof typeof BORDER_RADIUS_STYLES];
  className?: string;
  onLoad?: (() => void) | null;
  style?: {};
  suppressHydrationWarning?: boolean;
  [rest: string]: any; // Inexact rest. See decisions/inexact-rest.md
};

class BpkImage extends Component<BpkImageProps> {
  placeholder?: HTMLElement | null;

  static defaultProps = {
    borderRadiusStyle: BORDER_RADIUS_STYLES.none,
    inView: true,
    loading: false,
    onLoad: null,
    style: {},
    suppressHydrationWarning: false,
  };

  onImageLoad = (): void => {
    if (this.props.onLoad) {
      this.props.onLoad();
    }
  };

  getAspectRatio = (): number => {
    if (this.props.aspectRatio) {
      return this.props.aspectRatio;
    }
    return 1;
  };

  render() {
    const {
      altText,
      aspectRatio,
      borderRadiusStyle,
      className,
      inView,
      loading,
      onLoad,
      style,
      ...rest
    } = this.props;

    const classNames = [getClassName('bpk-image')];

    const aspectRatioPercentage = `${100 / this.getAspectRatio()}%`;

    if (!loading) {
      classNames.push(getClassName('bpk-image--no-background'));
    }

    if (borderRadiusStyle !== BORDER_RADIUS_STYLES.none) {
      classNames.push(
        getClassName(
          `bpk-image--border-radius-${
            BORDER_RADIUS_STYLES[borderRadiusStyle!]
          }`,
        ),
      );
    }

    // wraps a div with maxWidth and maxHeight set iff full-width is no required.
    // This ensures that the css / html do not reserve too much spacing
    // when width 100% is not being used
    return (
      <div
        style={style}
        className={className}
        {...getDataComponentAttribute('Image')}
      >
        <div
          ref={(div) => {
            this.placeholder = div;
          }}
          style={{ height: 0, paddingBottom: aspectRatioPercentage }}
          className={classNames.join(' ')}
          suppressHydrationWarning={this.props.suppressHydrationWarning}
        >
          {/*
            Image needs to come before the spinner to avoid a problem where
            some images would not fully render in mobile Safari when running
            on a slow network.

            The closest to an explanation that I can come up is that putting
            the image first means it is rendered first so it has priority,
            which seems to be enough to fix it.
          */}
          {inView && (
            <Image
              hidden={loading}
              altText={altText}
              onImageLoad={this.onImageLoad}
              {...rest}
            />
          )}
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
              <Image
                altText={altText}
                onImageLoad={this.onImageLoad}
                {...rest}
              />
            </noscript>
          )}
        </div>
      </div>
    );
  }
}

export default BpkImage;