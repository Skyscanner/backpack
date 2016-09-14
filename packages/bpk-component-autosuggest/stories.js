import React from 'react'
import { storiesOf } from '@kadira/storybook'

import BpkAutosuggest from './index'

const offices = [
  {
    name: 'Barcelona',
    code: 'BCN'
  },
  {
    name: 'Beijing',
    code: 'Any'
  },
  {
    name: 'Budapest',
    code: 'BUD'
  },
  {
    name: 'Edinburgh',
    code: 'EDI'
  },
  {
    name: 'Glasgow',
    code: 'Any'
  },
  {
    name: 'London',
    code: 'Any'
  },
  {
    name: 'Miami, FL',
    code: 'Any'
  },
  {
    name: 'Shenzhen Bao\'an International',
    code: 'SZX'
  },
  {
    name: 'Singapore Changi',
    code: 'SIN'
  },
  {
    name: 'Sofia',
    code: 'SOF'
  }
]

function getSuggestions (value) {
  const inputValue = value.trim().toLowerCase()
  const inputLength = inputValue.length

  return inputLength === 0 ? [] : offices.filter(office =>
    office.name.toLowerCase().indexOf(inputValue) !== -1
  )
}

function getSuggestionValue (suggestion) {
  return `${suggestion.name} (${suggestion.code})`
}

function renderSuggestion (suggestion) {
  return (
    <span>{getSuggestionValue(suggestion)}</span>
  )
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

  onSuggestionsFetchRequested ({ value }) {
    this.setState({
      suggestions: getSuggestions(value)
    })
  }

  onSuggestionsClearRequested () {
    this.setState({
      suggestions: []
    })
  }

  render () {
    const { value, suggestions } = this.state

    const inputProps = {
      placeholder: 'Enter an office name',
      value,
      onChange: this.onChange.bind(this)
    }

    return (
      <BpkAutosuggest
        suggestions={suggestions}
        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested.bind(this)}
        onSuggestionsClearRequested={this.onSuggestionsClearRequested.bind(this)}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={renderSuggestion}
        inputProps={inputProps}
      />
    )
  }
}

storiesOf('bpk-component-autosuggest', module)
  .add('Example', () => (<AutosuggestExample />))
