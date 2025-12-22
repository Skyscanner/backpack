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

import type { ReactNode } from 'react';

import { cssModules } from '../../bpk-react-utils';

import STYLES from './BpkAutosuggest.module.scss';

const getClassName = cssModules(STYLES);

type Props = {
  value: ReactNode,
  indent: boolean,
  className: string | null,
  icon: Function,
  subHeading: ?ReactNode,
  tertiaryLabel: string | null,
};

const BpkAutosuggestSuggestion = (props: Props) => {
  const classNames = [getClassName('bpk-autosuggest__suggestion')];
  const { className, icon, indent, subHeading, tertiaryLabel, value, ...rest } =
    props;
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
        <div className={getClassName('bpk-autosuggest__suggestion-icon')}>
          <Icon />
        </div>
      ) : null}
      <div className={getClassName('bpk-autosuggest__suggestion-content')}>
        <div className={getClassName('bpk-autosuggest__suggestion-inner')}>
          <div>
            <span className={getClassName('bpk-autosuggest__suggestion-value')}>
              {value}
            </span>
            {subHeading || tertiaryLabel ? (
              <small
                className={getClassName(
                  'bpk-autosuggest__suggestion-sub-heading',
                )}
              >
                {subHeading}
              </small>
            ) : null}
          </div>

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
      </div>
    </section>
  );
};
export default BpkAutosuggestSuggestion;
