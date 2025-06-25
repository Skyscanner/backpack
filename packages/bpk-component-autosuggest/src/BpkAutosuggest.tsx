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

// @ts-expect-error TS(7016): Could not find a declaration file for module 'reac... Remove this comment to see the full error message
import Autosuggest from 'react-autosuggest';

import BpkInput from '../../bpk-component-input';
import { cssModules } from '../../bpk-react-utils';

// @ts-expect-error TS(2307): Cannot find module './BpkAutosuggest.module.scss' ... Remove this comment to see the full error message
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
  // @ts-expect-error TS(2300): Duplicate identifier 'mixed'.
  ref: (?HTMLInputElement) => mixed,
  // @ts-expect-error TS(2300): Duplicate identifier 'mixed'.
  inputRef: (?HTMLInputElement) => mixed,
  autoComplete: string,
};
Autosuggest.defaultProps.renderInputComponent = (inputProps: Props) => {
  const { autoComplete = 'off', inputRef, ref, ...rest } = inputProps;

  return (
    // $FlowFixMe[cannot-spread-inexact] - inexact rest. See 'decisions/flowfixme.md'.
    // @ts-expect-error TS(2322): Type '{ mixed: any; inputRef: (element: HTMLInputE... Remove this comment to see the full error message
    <BpkInput
      inputRef={(element) => {
        // @ts-expect-error TS(2349): This expression is not callable.
        ref(element);

        if (typeof inputRef === 'function') {
          // @ts-expect-error TS(2349): This expression is not callable.
          inputRef(element);
        }
      }}
      autoComplete={autoComplete}
      {...rest}
    />
  );
};

export default Autosuggest;
