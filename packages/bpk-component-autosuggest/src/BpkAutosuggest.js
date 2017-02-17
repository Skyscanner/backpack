import React from 'react';
import Autosuggest from 'react-autosuggest';
import { cssModules } from 'bpk-react-utils';
import BpkInput from 'bpk-component-input';

import STYLES from './bpk-autosuggest.scss';

const getClassName = cssModules(STYLES);

const BpkAutosuggest = props => <Autosuggest
  renderInputComponent={BpkInput}
  {...props}
/>;

BpkAutosuggest.defaultProps = {
  theme: {
    container: getClassName('bpk-autosuggest__container'),
    containerOpen: getClassName('bpk-autosuggest__container--open'),
    suggestionsContainer: getClassName('bpk-autosuggest__suggestions-container'),
    suggestionsList: getClassName('bpk-autosuggest__suggestions-list'),
    suggestion: getClassName('bpk-autosuggest__suggestion-item'),
    suggestionFocused: getClassName('bpk-autosuggest__suggestion-item--focused'),
    sectionContainer: getClassName('bpk-autosuggest__section-container'),
    sectionTitle: getClassName('bpk-autosuggest__section-title'),
  },
};

export default BpkAutosuggest;
