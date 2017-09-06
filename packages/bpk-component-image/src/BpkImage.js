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
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { animations } from 'bpk-tokens/tokens/base.es6';

import STYLES from './bpk-image.scss';

const getClassName = cssModules(STYLES);

class BpkImage extends React.Component {
  constructor(props) {
    super(props);

    this.onImageLoad = this.onImageLoad.bind(this);

    this.placeholder = null;
  }

  onImageLoad() {
    if (this.props.onLoad) {
      this.props.onLoad();
    }
  }

  render() {
    const { width, height, altText, className, inView, loading, onLoad, style, ...rest } = this.props;

    const classNames = [getClassName('bpk-image')];
    const imgClassNames = [getClassName('bpk-image__image'), getClassName('bpk-image__hidden')];

    const aspectRatio = width / height;
    const aspectRatioPc = `${100 / aspectRatio}%`;

    if (!loading) {
      classNames.push(getClassName('bpk-image__no-background'));
      imgClassNames.push(getClassName('bpk-image__shown'));
    }

    if (className) {
      classNames.push(className);
    }

    // wraps a div with maxWidth and maxHeight set iff full-width is no required.
    // This ensures that the css / html do not reserve too much spacing
    // when width 100% is not being used
    return (
      <div
        style={style}
      >
        <div
          ref={(div) => { this.placeholder = div; }}
          style={{ height: 0, paddingBottom: aspectRatioPc }}
          className={classNames.join(' ')}
        >
          <ReactCSSTransitionGroup
            transitionName={{
              leave: getClassName('bpk-image__shown'),
              leaveActive: getClassName('bpk-image__hidden'),
            }}
            transitionEnterTimeout={parseInt(animations.durationBase, 10)}
            transitionLeaveTimeout={parseInt(animations.durationBase, 10)}
          >
            {loading &&
              <div className={getClassName('bpk-image__spinner')}>
                <BpkSpinner />
              </div>
            }
          </ReactCSSTransitionGroup>
          {inView &&
            <img
              className={imgClassNames.join(' ')}
              alt={altText}
              onLoad={this.onImageLoad}
              {...rest}
            />
          }
          {(typeof window === 'undefined' && (!inView || loading)) &&
            <noscript >
              <img
                className={getClassName('bpk-image__image')}
                alt={altText}
                {...rest}
              />
            </noscript>
          }
        </div>
      </div>
    );
  }
}

BpkImage.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  altText: PropTypes.string.isRequired,
  src: PropTypes.string.isRequired,
  className: PropTypes.string,
  inView: PropTypes.bool,
  loading: PropTypes.bool,
  onLoad: PropTypes.func,
  style: PropTypes.object, // eslint-disable-line react/forbid-prop-types
};

BpkImage.defaultProps = {
  className: null,
  inView: true,
  loading: false,
  onLoad: null,
  style: {},
};

export default BpkImage;
