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

import PropTypes from 'prop-types';

import { cssModules } from '../../bpk-react-utils';

import BpkFlareBar from './BpkFlareBar';
import CornerRadius from './__generated__/js/corner-radius';

import STYLES from './bpk-content-bubble.module.scss';

const getClassName = cssModules(STYLES);

const BpkContentBubble = (props) => {
  const {
    className,
    content,
    contentClassName,
    flareProps,
    rounded,
    showPointer,
    ...rest
  } = props;

  const wrapperClassNames = [getClassName('bpk-content-bubble__wrapper')];
  const contentClassNames = [
    getClassName('bpk-content-bubble__content-wrapper'),
  ];

  if (showPointer) {
    wrapperClassNames.push(
      getClassName('bpk-content-bubble__wrapper--with-pointer'),
    );
  }
  if (rounded) {
    wrapperClassNames.push(
      getClassName('bpk-content-bubble__wrapper--rounded'),
    );
    if (showPointer) {
      wrapperClassNames.push(
        getClassName('bpk-content-bubble__wrapper--rounded--with-pointer'),
      );
    }
  }

  if (className) {
    wrapperClassNames.push(className);
  }
  const leftCornerRadiusClassNames = [
    getClassName('bpk-content-bubble__rounded-corner'),
  ];
  const rightCornerRadiusClassNames = [
    getClassName('bpk-content-bubble__rounded-corner'),
    getClassName('bpk-content-bubble__rounded-corner--trailing'),
  ];

  if (flareProps?.svgClassName) {
    leftCornerRadiusClassNames.push(flareProps.svgClassName);
    rightCornerRadiusClassNames.push(flareProps.svgClassName);
  }

  if (contentClassName) {
    contentClassNames.push(contentClassName);
  }

  return (
    <div className={wrapperClassNames.join(' ')} {...rest}>
      <div className={getClassName('bpk-content-bubble__container')}>
        <div className={contentClassNames.join(' ')}>
          {content}
          {/* These rounded svgs are required as the container background extends into the flare meaning that when we "round" the container the rounded bottom corners are hidden by the flare. */}
          {rounded && showPointer && (
          <CornerRadius className={leftCornerRadiusClassNames.join(' ')} />
          <CornerRadius className={rightCornerRadiusClassNames.join(' ')} />
          )}
        </div>
        {showPointer && (
          <div className={getClassName('bpk-content-bubble__pointer')}>
            <BpkFlareBar
              rounded={rounded}
              {...flareProps}
            />
          </div>
        )}
      </div>
    </div>
  );
};

BpkContentBubble.propTypes = {
  flareProps: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  content: PropTypes.node,
  rounded: PropTypes.bool,
  showPointer: PropTypes.bool,
  className: PropTypes.string,
  contentClassName: PropTypes.string,
};

BpkContentBubble.defaultProps = {
  flareProps: null,
  rounded: true,
  content: null,
  showPointer: true,
  className: null,
  contentClassName: null,
};

export default BpkContentBubble;
