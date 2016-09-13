import React from 'react'
import Autosuggest from 'react-autosuggest'

import './bpk-autosuggest.scss'

const BpkAutosuggest = (props) => <Autosuggest {...props} />

BpkAutosuggest.defaultProps = {
  theme: {
    container: 'bpk-autosuggest__container',
    containerOpen: 'bpk-autosuggest__container--open',
    input: 'bpk-autosuggest__input',
    suggestionsContainer: 'bpk-autosuggest__suggestions-container',
    suggestionsList: 'bpk-autosuggest__suggestions-list',
    suggestion: 'bpk-autosuggest__suggestion-item',
    suggestionFocused: 'bpk-autosuggest__suggestion-item--focused',
    sectionContainer: 'bpk-autosuggest__section-container',
    sectionTitle: 'bpk-autosuggest__section-title'
  }
}

export default BpkAutosuggest
