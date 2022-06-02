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

import PropTypes from 'prop-types';
import React from 'react';
import { cssModules } from 'bpk-react-utils';
import BpkBreakpoint, { BREAKPOINTS } from 'bpk-component-breakpoint';
import BpkText, { TEXT_STYLES } from 'bpk-component-text';

import STYLES from './BpkPrice.module.scss';

const getClassName = cssModules(STYLES);

export type Props = {
  title: string,
  className: ?string,
  subtitle: ?string,
  description: ?string,
};

const BpkPrice = (props: Props) => {
  const { className, description, subtitle, title, ...rest } = props;

  return (
    <BpkBreakpoint query={BREAKPOINTS.MOBILE}>
      {(isMobile) =>
        isMobile ? (
          <div
            className={getClassName(
              'bpk-price',
              'bpk-price--mobile',
              className,
            )}
            // $FlowFixMe[cannot-spread-inexact] - inexact rest. See 'decisions/flowfixme.md'.
            {...rest}
          >
            {subtitle && (
              <BpkText
                className={getClassName('bpk-price--subtitle')}
                textStyle={TEXT_STYLES.xs}
                tagName="span"
              >
                {subtitle}
              </BpkText>
            )}
            <BpkText textStyle={TEXT_STYLES.heading4} tagName="span">
              {title}
            </BpkText>
            {description && (
              <BpkText textStyle={TEXT_STYLES.xs} tagName="span">
                {description}
              </BpkText>
            )}
          </div>
        ) : (
          // $FlowFixMe[cannot-spread-inexact] - inexact rest. See 'decisions/flowfixme.md'.
          <div className={getClassName('bpk-price', className)} {...rest}>
            {subtitle && (
              <BpkText
                className={getClassName('bpk-price__subtitle')}
                textStyle={TEXT_STYLES.sm}
                tagName="span"
              >
                {subtitle}
              </BpkText>
            )}
            <div>
              <BpkText textStyle={TEXT_STYLES.xxl} tagName="span">
                {title}
              </BpkText>
              {description && (
                <BpkText
                  className={getClassName('bpk-price__descriptionSpacing')}
                  textStyle={TEXT_STYLES.sm}
                  tagName="span"
                >
                  {description}
                </BpkText>
              )}
            </div>
          </div>
        )
      }
    </BpkBreakpoint>
  );
};

BpkPrice.propTypes = {
  title: PropTypes.string.isRequired,
  className: PropTypes.string,
  subtitle: PropTypes.string,
  description: PropTypes.string,
};

BpkPrice.defaultProps = {
  className: null,
  subtitle: null,
  description: null,
};

export default BpkPrice;
