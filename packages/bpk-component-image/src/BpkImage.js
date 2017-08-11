/*
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2017 Skyscanner Ltd
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
import React from 'react';
import { cssModules } from 'bpk-react-utils';
import { BpkSpinner } from 'bpk-component-spinner';

import STYLES from './bpk-image.scss';

const getClassName = cssModules(STYLES);

class BpkImage extends React.Component {
  constructor(props) {
    super(props);

    this.onImageLoad = this.onImageLoad.bind(this);
    this.handleWindowResize = this.handleWindowResize.bind(this);

    this.placeholder = null;

    this.state = {
      placeholderWidth: null,
    };
  }

  componentDidMount() {
    window.addEventListener('resize', this.handleWindowResize);
    this.handleWindowResize();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleWindowResize);
  }

  onImageLoad() {
    if (this.props.onLoad) {
      this.props.onLoad();
    }
  }

  handleWindowResize() {
    if (this.placeholder) {
      const thisWidth = this.placeholder.clientWidth;
      this.setState({
        placeholderWidth: thisWidth,
      });
    }
  }

  render() {
    const { width, height, fullWidth, altText, className, inView, loading, onLoad, src, style, ...rest } = this.props;

    const classNames = [getClassName('bpk-image')];
    const imgClassNames = [getClassName('bpk-image__image')];
    const spinnerClassNames = [getClassName('bpk-image__spinner')];

    const aspectRatio = width / height;

    if (!loading) {
      spinnerClassNames.push(getClassName('bpk-image__spinner--hide'));
      imgClassNames.push(getClassName('bpk-image__image--show'));
    }

    if (className) {
      classNames.push(className);
    }

    let finalStyle = style;
    if (!fullWidth) {
      finalStyle = { ...style, width, height };
    }

    const imageWidth = this.state.placeholderWidth;
    const imageHeight = imageWidth / aspectRatio;

    return (
      <div>
        <div
          ref={(div) => { this.placeholder = div; }}
          style={{ ...finalStyle, height: imageHeight }}
          className={classNames.join(' ')}
          {...rest}
        >
          <div className={spinnerClassNames.join(' ')}>
            <BpkSpinner />
          </div>
          {inView &&
            <img
              width={imageWidth}
              height={imageHeight}
              className={imgClassNames.join(' ')}
              alt={altText}
              src={src}
              onLoad={this.onImageLoad}
            />
          }
        </div>
        <noscript>
          <img
            width={'100%'}
            alt={altText}
            src={src}
          />
        </noscript>
      </div>
    );
  }
}

BpkImage.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  altText: PropTypes.string.isRequired,
  src: PropTypes.string.isRequired,
  fullWidth: PropTypes.bool,
  className: PropTypes.string,
  inView: PropTypes.bool,
  loading: PropTypes.bool,
  onLoad: PropTypes.func,
  style: PropTypes.object, // eslint-disable-line react/forbid-prop-types
};

BpkImage.defaultProps = {
  fullWidth: true,
  className: null,
  inView: true,
  loading: false,
  onLoad: null,
  style: {},
};

export default BpkImage;
