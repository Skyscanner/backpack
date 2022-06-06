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
/* @flow strict */

import React, { Fragment } from 'react';
import { cssModules } from 'bpk-react-utils';
import BpkText, { TEXT_STYLES } from 'bpk-component-text';

import { type Props, propTypes, defaultProps, LAYOUTS } from './common-types';
import STYLES from './BpkPrice.module.scss';

const getClassName = cssModules(STYLES);

const getTitle = (title, isSmall) => (
  <BpkText
    textStyle={isSmall ? TEXT_STYLES.heading4 : TEXT_STYLES.xxl}
    tagName="span"
  >
    {title}
  </BpkText>
);

const getSubTitle = (subtitle, isSmall) =>
  subtitle && (
    <BpkText
      className={getClassName('bpk-price__subtitle')}
      textStyle={isSmall ? TEXT_STYLES.xs : TEXT_STYLES.sm}
      tagName="span"
    >
      {subtitle}
    </BpkText>
  );

const getDescription = (description, isSmall) =>
  description && (
    <BpkText
      textStyle={isSmall ? TEXT_STYLES.xs : TEXT_STYLES.sm}
      tagName="span"
      className={!isSmall && getClassName('bpk-price__descriptionSpacing')}
    >
      {description}
    </BpkText>
  );

const conditionalWrap = (isSmall, children) =>
  isSmall ? children : <div>{children}</div>;

const BpkPrice = (props: Props) => {
  const { className, description, layout, subtitle, title, ...rest } = props;

  const isSmall = layout === LAYOUTS.small;

  return (
    <div
      className={getClassName(
        'bpk-price',
        isSmall && 'bpk-price--small',
        className,
      )}
      // $FlowFixMe[cannot-spread-inexact] - inexact rest. See 'decisions/flowfixme.md'.
      {...rest}
    >
      {getSubTitle(subtitle, isSmall)}
      {conditionalWrap(
        isSmall,
        <Fragment>
          {getTitle(title, isSmall)}
          {getDescription(description, isSmall)}
        </Fragment>,
      )}
    </div>
  );
};

BpkPrice.propTypes = {
  ...propTypes,
};

BpkPrice.defaultProps = {
  ...defaultProps,
};

export default BpkPrice;
