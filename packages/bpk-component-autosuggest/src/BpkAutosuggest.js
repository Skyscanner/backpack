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

import React from 'react';
import Autosuggest from 'react-autosuggest';

import BpkInput from '../../bpk-component-input';
import { cssModules } from '../../bpk-react-utils';

import STYLES from './BpkAutosuggest.module.scss';

const getClassName = cssModules(STYLES);

/*
  `react-autosuggest` is not wrapped in a functional component because the `ref` attribute won't work on it.
  This is because functional components don't have instances, and it is a mounted instance of the component
  what it's received by the `ref` callback.

  Further reading about Refs: https://facebook.github.io/react/docs/refs-and-the-dom.html
 */

Autosuggest.defaultProps.theme = {
  container: getClassName('bpk-autosuggest__container'),
  containerOpen: getClassName('bpk-autosuggest__container--open'),
  suggestionsContainer: getClassName('bpk-autosuggest__suggestions-container'),
  suggestionsContainerOpen: getClassName(
    'bpk-autosuggest__suggestions-container--open',
  ),
  suggestionsList: getClassName('bpk-autosuggest__suggestions-list'),
  suggestion: getClassName('bpk-autosuggest__suggestion-item'),
  suggestionHighlighted: getClassName(
    'bpk-autosuggest__suggestion-item--highlighted',
  ),
  sectionContainer: getClassName('bpk-autosuggest__section-container'),
  sectionTitle: getClassName('bpk-autosuggest__section-title'),
};

type Props = {
  ref: (?HTMLInputElement) => mixed,
  inputRef: (?HTMLInputElement) => mixed,
  autoComplete: string,
};
Autosuggest.defaultProps.renderInputComponent = (inputProps: Props) => {
  const { autoComplete = 'off', inputRef, ref, ...rest } = inputProps;

  return (
    // $FlowFixMe[cannot-spread-inexact] - inexact rest. See 'decisions/flowfixme.md'.
    <BpkInput
      inputRef={(element) => {
        ref(element);

        if (typeof inputRef === 'function') {
          inputRef(element);
        }
      }}
      autoComplete={autoComplete}
      {...rest}
    />
  );
};

export default Autosuggest;
