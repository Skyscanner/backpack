import React, { PropTypes } from 'react'
import Autosuggest from 'react-autosuggest'

import style from './bpk-autosuggest.scss'

const defaultTheme = {
  container: 'bpk-autosuggest__container',
  containerOpen: 'bpk-autosuggest__container--open',
  input: 'bpk-autosuggest__input',
  suggestionsContainer: 'bpk-autosuggest__suggestions-container',
  suggestionsList: 'bpk-autosuggest__suggestions-list',
  suggestion: 'bpk-autosuggest__suggestion',
  suggestionFocused: 'bpk-autosuggest__suggestion--focused',
  sectionContainer: 'bpk-autosuggest__section-container',
  sectionTitle: 'bpk-autosuggest__section-title'
}

const BpkAutosuggest = (props) => {
  const inputProps = {
    value: props.value,
    onChange: props.onChange
  }

  return (
    <Autosuggest
      suggestions={props.suggestions}
      onSuggestionsFetchRequested={props.onSuggestionsFetchRequested}
      onSuggestionsClearRequested={props.onSuggestionsClearRequested}
      getSuggestionValue={props.getSuggestionValue}
      renderSuggestion={props.renderSuggestion}
      onSuggestionSelected={props.onSuggestionSelected}
      shouldRenderSuggestions={props.shouldRenderSuggestions}
      alwaysRenderSuggestions={props.alwaysRenderSuggestions}
      focusFirstSuggestion={props.focusFirstSuggestion}
      focusInputOnSuggestionClick={props.focusInputOnSuggestionClick}
      multiSection={props.multiSection}
      renderSectionTitle={props.renderSectionTitle}
      getSectionSuggestions={props.getSectionSuggestions}
      renderSuggestionsContainer={props.renderSuggestionsContainer}
      id={props.id}
      inputProps={inputProps}
      theme={props.theme}
    />
  )
}

BpkAutosuggest.defaultProps = {
  getSuggestionValue: (suggestion) => suggestion,
  theme: defaultTheme
}

BpkAutosuggest.propTypes = {
  value: PropTypes.any.isRequired,
  suggestions: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
  onSuggestionsFetchRequested: PropTypes.func.isRequired,
  onSuggestionsClearRequested: PropTypes.func.isRequired,
  getSuggestionValue: PropTypes.func,
  renderSuggestion: PropTypes.func.isRequired,
  onSuggestionSelected: PropTypes.func,
  shouldRenderSuggestions: PropTypes.bool,
  alwaysRenderSuggestions: PropTypes.bool,
  focusFirstSuggestion: PropTypes.bool,
  focusInputOnSuggestionClick: PropTypes.bool,
  multiSection: PropTypes.bool,
  renderSectionTitle: PropTypes.func,
  getSectionSuggestions: PropTypes.func,
  renderSuggestionsContainer: PropTypes.func,
  id: PropTypes.string,
  theme: PropTypes.object
}

export default BpkAutosuggest
