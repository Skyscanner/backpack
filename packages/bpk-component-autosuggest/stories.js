import React from 'react'
import { storiesOf } from '@kadira/storybook'

import BpkAutosuggest from './index'

function getSuggestions () {
  return [
    {
      display: 'London Heathrow',
      code: 'LHR'
    },
    {
      display: 'Edinburgh',
      code: 'EDI'
    },
    {
      display: 'Glasgow',
      code: 'GLA'
    }
  ]
}

class AutosuggestExample extends React.Component {

  constructor () {
    super()

    this.state = {
      value: '',
      suggestions: []
    }
  }

  onChange (event, { newValue }) {
    this.setState({
      value: newValue
    })
  }

  onSuggestionsClearRequested () {
    this.setState({
      suggestions: []
    })
  }

  onSuggestionsFetchRequested () {
    this.setState({
      suggestions: getSuggestions()
    })
  }

  getSuggestionValue (suggestion) {
    return suggestion.display
  }

  renderSuggestion (suggestion) {
    return <span>{suggestion.display} ({suggestion.code})</span>
  }

  render () {
    const { value, suggestions } = this.state

    return (<BpkAutosuggest
      suggestions={suggestions}
      value={value}
      onSuggestionsFetchRequested={this.onSuggestionsFetchRequested.bind(this)}
      onSuggestionsClearRequested={this.onSuggestionsClearRequested.bind(this)}
      getSuggestionValue={this.getSuggestionValue.bind(this)}
      renderSuggestion={this.renderSuggestion.bind(this)}
      onChange={this.onChange.bind(this)}
           />)
  }

}

storiesOf('bpk-component-autosuggest', module)
  .add('Example', () => (<AutosuggestExample />))
