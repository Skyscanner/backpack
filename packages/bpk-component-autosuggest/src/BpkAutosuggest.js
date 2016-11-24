import React from 'react';
import { cssModules } from 'bpk-react-utils';
import Autosuggest from 'react-autosuggest';

import STYLES from './bpk-autosuggest.scss';

const getClassName = cssModules(STYLES);

const BpkAutosuggest = props => <Autosuggest {...props} />;

BpkAutosuggest.defaultProps = {
  theme: {
    container: getClassName('bpk-autosuggest__container'),
    containerOpen: getClassName('bpk-autosuggest__container--open'),
    input: getClassName('bpk-autosuggest__input'),
    suggestionsContainer: getClassName('bpk-autosuggest__suggestions-container'),
    suggestionsList: getClassName('bpk-autosuggest__suggestions-list'),
    suggestion: getClassName('bpk-autosuggest__suggestion-item'),
    suggestionFocused: getClassName('bpk-autosuggest__suggestion-item--focused'),
    sectionContainer: getClassName('bpk-autosuggest__section-container'),
    sectionTitle: getClassName('bpk-autosuggest__section-title'),
  },
};

export default BpkAutosuggest;
