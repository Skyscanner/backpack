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

import PropTypes from 'prop-types';
import React from 'react';
import { cssModules } from 'bpk-react-utils';

import STYLES from './bpk-autosuggest.css';

const getClassName = cssModules(STYLES);

const BpkSuggestion = props => {
  const classNames = [getClassName('bpk-autosuggest__suggestion')];
  const {
    indent,
    className,
    icon,
    subHeading,
    tertiaryLabel,
    value,
    ...rest
  } = props;
  const Icon = icon;

  if (indent) {
    classNames.push(getClassName('bpk-autosuggest__suggestion--indent'));
  }
  if (className) {
    classNames.push(className);
  }

  return (
    <section className={classNames.join(' ')} {...rest}>
      {icon ? (
        <Icon className={getClassName('bpk-autosuggest__suggestion-icon')} />
      ) : null}
      <div className={getClassName('bpk-autosuggest__suggestion-inner')}>
        <span className={getClassName('bpk-autosuggest__suggestion-value')}>
          {value}
        </span>
        {subHeading || tertiaryLabel ? (
          <small
            className={getClassName('bpk-autosuggest__suggestion-sub-heading')}
          >
            {subHeading}
          </small>
        ) : null}
        {tertiaryLabel ? (
          <aside
            className={getClassName(
              'bpk-autosuggest__suggestion-tertiary-label',
            )}
          >
            {tertiaryLabel}
          </aside>
        ) : null}
      </div>
    </section>
  );
};

BpkSuggestion.propTypes = {
  value: PropTypes.node.isRequired,
  subHeading: PropTypes.node,
  tertiaryLabel: PropTypes.string,
  icon: PropTypes.func,
  indent: PropTypes.bool,
  className: PropTypes.string,
};

BpkSuggestion.defaultProps = {
  subHeading: null,
  tertiaryLabel: null,
  icon: null,
  indent: false,
  className: null,
};

export default BpkSuggestion;
