/*
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2016-2020 Skyscanner Ltd
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

import React, { type Node, Component } from 'react';
import PropTypes from 'prop-types';
import { cssModules } from 'bpk-react-utils';
import { BpkSpinner } from 'bpk-component-spinner';
import CSSTransition from 'react-transition-group/CSSTransition';
import { animations } from 'bpk-tokens/tokens/base.es6';

import STYLES from './BpkImage.scss';
import BORDER_RADIUS_STYLES from './BpkImageBorderRadiusStyles';

const getClassName = cssModules(STYLES);

type BpkImageProps = {
  altText: string,
  height: number,
  inView: boolean,
  loading: boolean,
  src: string,
  width: number,
  borderRadiusStyle: $Keys<typeof BORDER_RADIUS_STYLES>,
  className: ?string,
  onLoad: ?() => mixed,
  style: ?{},
  suppressHydrationWarning: boolean,
};

type ImageProps = {
  altText: string,
  hidden: ?boolean,
  onImageLoad: () => mixed,
};

class Image extends Component<ImageProps> {
  img: ?HTMLImageElement;

  static propTypes = {
    altText: PropTypes.string.isRequired,
    hidden: PropTypes.bool,
    onImageLoad: PropTypes.func.isRequired,
  };

  static defaultProps = {
    hidden: false,
  };

  constructor(props) {
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

  setImgRef = el => {
    this.img = el;
  };

  render() {
    const { hidden, altText, onImageLoad, ...rest } = this.props;

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
        // $FlowFixMe - inexact rest. See 'decisions/flowfixme.md'.
        {...rest}
      />
    );
  }
}

class BpkImage extends Component<BpkImageProps> {
  onImageLoad: () => mixed;

  placeholder: ?HTMLElement;

  static defaultProps: {};

  onImageLoad = (): void => {
    if (this.props.onLoad) {
      this.props.onLoad();
    }
  };

  render(): Node {
    const {
      width,
      height,
      altText,
      borderRadiusStyle,
      className,
      inView,
      loading,
      onLoad,
      style,
      ...rest
    } = this.props;

    const classNames = [getClassName('bpk-image')];

    const aspectRatio = width / height;
    const aspectRatioPc = `${100 / aspectRatio}%`;

    if (!loading) {
      classNames.push(getClassName('bpk-image--no-background'));
    }

    if (borderRadiusStyle !== BORDER_RADIUS_STYLES.none) {
      classNames.push(
        getClassName(
          `bpk-image--border-radius-${BORDER_RADIUS_STYLES[borderRadiusStyle]}`,
        ),
      );
    }

    // wraps a div with maxWidth and maxHeight set iff full-width is no required.
    // This ensures that the css / html do not reserve too much spacing
    // when width 100% is not being used
    return (
      <div style={style} className={className}>
        <div
          ref={div => {
            this.placeholder = div;
          }}
          style={{ height: 0, paddingBottom: aspectRatioPc }}
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
            <Image // eslint-disable-line backpack/use-components
              hidden={loading}
              altText={altText}
              onImageLoad={this.onImageLoad}
              // $FlowFixMe - inexact rest. See 'decisions/flowfixme.md'.
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
              <Image // eslint-disable-line backpack/use-components
                altText={altText}
                onImageLoad={this.onImageLoad}
                // $FlowFixMe - inexact rest. See 'decisions/flowfixme.md'.
                {...rest}
              />
            </noscript>
          )}
        </div>
      </div>
    );
  }
}

BpkImage.propTypes = {
  altText: PropTypes.string.isRequired,
  height: PropTypes.number.isRequired,
  src: PropTypes.string.isRequired,
  width: PropTypes.number.isRequired,
  borderRadiusStyle: PropTypes.oneOf(Object.keys(BORDER_RADIUS_STYLES)),
  className: PropTypes.string,
  inView: PropTypes.bool,
  loading: PropTypes.bool,
  onLoad: PropTypes.func,
  style: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  suppressHydrationWarning: PropTypes.bool,
};

BpkImage.defaultProps = {
  borderRadiusStyle: BORDER_RADIUS_STYLES.none,
  className: null,
  inView: true,
  loading: false,
  onLoad: null,
  style: {},
  suppressHydrationWarning: false,
};

export default BpkImage;
