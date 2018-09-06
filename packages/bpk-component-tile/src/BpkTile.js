/*
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2018 Skyscanner Ltd
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

import React from 'react';
import PropTypes from 'prop-types';
import { cssModules } from 'bpk-react-utils';
import { withRtlSupport, withButtonAlignment } from 'bpk-component-icon';
import ArrowRightIcon from 'bpk-component-icon/sm/arrow-right';

import STYLES from './bpk-tile.css';

const getClassName = cssModules(STYLES);
const RtlArrowRightIcon = withRtlSupport(withButtonAlignment(ArrowRightIcon));

const BpkTile = props => {
  const {
    dark,
    backgroundColor,
    imageSource,
    className,
    cta,
    heading,
    ...rest
  } = props;

  const classNames = [getClassName('bpk-tile')];
  const scrimClassNames = [getClassName('bpk-tile__scrim')];
  const headingClassNames = [getClassName('bpk-tile__heading')];
  const ctaIconClassNames = [getClassName('bpk-tile__cta-icon')];

  if (className) {
    classNames.push(className);
  }

  if (dark) {
    scrimClassNames.push(getClassName('bpk-tile__scrim--dark'));
    headingClassNames.push(getClassName('bpk-tile__heading--dark'));
    ctaIconClassNames.push(getClassName('bpk-tile__cta-icon--dark'));
  }

  const classNameFinal = classNames.join(' ');

  if (backgroundColor) {
    return (
      <div className={classNameFinal} style={{ backgroundColor }} {...rest}>
        <div
          className={getClassName('bpk-tile__illustration')}
          style={{ backgroundImage: `url(${imageSource})` }}
        />
        <div className={scrimClassNames.join(' ')}>
          <h3 className={headingClassNames.join(' ')}>{heading}</h3>
          <p className={getClassName('bpk-tile__cta')}>
            {cta} <RtlArrowRightIcon className={ctaIconClassNames.join(' ')} />
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      className={classNameFinal}
      style={{ backgroundImage: `url(${imageSource})` }}
      {...rest}
    >
      <div className={scrimClassNames.join(' ')}>
        <h3 className={headingClassNames.join(' ')}>{heading}</h3>
        <p className={getClassName('bpk-tile__cta')}>
          {cta} <RtlArrowRightIcon className={ctaIconClassNames.join(' ')} />
        </p>
      </div>
    </div>
  );
};

BpkTile.propTypes = {
  className: PropTypes.string,
  imageSource: PropTypes.string,
  backgroundColor: PropTypes.string,
  heading: PropTypes.string,
  cta: PropTypes.string,
  dark: PropTypes.bool,
};

BpkTile.defaultProps = {
  className: null,
  imageSource: PropTypes.string,
  backgroundColor: null,
  heading: PropTypes.string,
  cta: PropTypes.string,
  dark: true,
};

export default BpkTile;
