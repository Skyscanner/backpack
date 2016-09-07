import React from 'react'
import Autosuggest from 'react-autosuggest'

import style from './bpk-autosuggest.scss'

const defaultTheme = {
  container:            'bpk-autosuggest__container',
  containerOpen:        'bpk-autosuggest__container--open',
  input:                'bpk-autosuggest__input',
  suggestionsContainer: 'bpk-autosuggest__suggestions-container',
  suggestionsList:      'bpk-autosuggest__suggestions-list',
  suggestion:           'bpk-autosuggest__suggestion',
  suggestionFocused:    'bpk-autosuggest__suggestion--focused',
  sectionContainer:     'bpk-autosuggest__section-container',
  sectionTitle:         'bpk-autosuggest__section-title'
}

const BpkAutosuggest = (props) => {
  const inputProps = {
    value: props.value,
    onChange: props.onChange
  }

  return (
    <Autosuggest
      suggestions={props.suggestions}
      onSuggestionsUpdateRequested={props.onSuggestionsUpdateRequested}
      getSuggestionValue={props.getSuggestionValue}
      renderSuggestion={props.renderSuggestion}
      inputProps={inputProps}
    />
  )
}

export default BpkAutosuggest
