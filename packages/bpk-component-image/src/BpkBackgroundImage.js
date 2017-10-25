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

import STYLES from './bpk-background-image.scss';

const getClassName = cssModules(STYLES);

class BpkBackgroundImage extends React.Component {
  constructor(props) {
    super(props);

    this.onBackgroundImageLoad = this.onBackgroundImageLoad.bind(this);
    this.startImageLoad = this.startImageLoad.bind(this);

    this.trackImage = null;
  }

  componentDidMount() {
    if (this.props.inView) {
      this.startImageLoad();
    }
  }

  componentWillReceiveProps(newProps) {
    if (!this.props.inView && newProps.inView) {
      this.startImageLoad();
    }
  }

  onBackgroundImageLoad() {
    if (this.props.onLoad) {
      this.props.onLoad();
    }
    delete this.trackImage;
  }

  startImageLoad() {
    this.trackImage = new Image();
    this.trackImage.src = this.props.src;
    this.trackImage.onload = this.onBackgroundImageLoad;
  }

  render() {
    const {
      children, className, inView, loading, onLoad, src, imageStyle, imageClassName, ...rest
    } = this.props;

    const classNames = [getClassName('bpk-background-image')];
    const spinnerClassNames = [getClassName('bpk-background-image__spinner')];
    const contentClassNames = [getClassName('bpk-background-image__content')];

    if (!loading) {
      spinnerClassNames.push(getClassName('bpk-background-image__spinner--hide'));
      contentClassNames.push(getClassName('bpk-background-image__content--show'));
    }

    if (className) {
      classNames.push(className);
    }

    if (imageClassName) {
      contentClassNames.push(imageClassName);
    }

    const contentClassNamesNoScript = [
      getClassName('bpk-background-image__content'),
      getClassName('bpk-background-image__content--show'),
    ];

    return (
      <div
        className={classNames.join(' ')}
        {...rest}
      >
        <div className={spinnerClassNames.join(' ')}>
          <BpkSpinner />
        </div>
        <div
          className={contentClassNames.join(' ')}
          style={{ backgroundImage: !inView || loading ? '' : `url(${src})`, ...imageStyle }}
        >
          {!loading && children}
        </div>
        {(typeof window === 'undefined' && (!inView || loading)) &&
          <noscript >
            <div
              className={contentClassNamesNoScript.join(' ')}
              style={{ backgroundImage: `url(${src})`, ...imageStyle }}
            >
              {children}
            </div>
          </noscript>
        }
      </div>
    );
  }
}

BpkBackgroundImage.propTypes = {
  src: PropTypes.string.isRequired,
  children: PropTypes.node,
  className: PropTypes.string,
  imageClassName: PropTypes.string,
  imageStyle: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  inView: PropTypes.bool,
  loading: PropTypes.bool,
  onLoad: PropTypes.func,
};

BpkBackgroundImage.defaultProps = {
  children: null,
  className: null,
  imageClassName: null,
  imageStyle: null,
  inView: true,
  loading: false,
  onLoad: null,
};

export default BpkBackgroundImage;
