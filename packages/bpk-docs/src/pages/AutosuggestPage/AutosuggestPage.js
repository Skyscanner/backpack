import React, { Component } from 'react'

import BpkLink from 'bpk-component-link'
import BpkLabel from 'bpk-component-label'
import BpkParagraph from 'bpk-component-paragraph'
import { withRtlSupport } from 'bpk-component-icon'
import BpkRouterLink from 'bpk-component-router-link'
import FlightIcon from 'bpk-component-icon/lg/flight'
import BpkAutosuggest, { BpkAutosuggestSuggestion } from 'bpk-component-autosuggest'

const BpkFlightIcon = withRtlSupport(FlightIcon)

import * as ROUTES from './../../constants/routes'
import DocsPageBuilder from './../../components/DocsPageBuilder'

const offices = [
  {
    name: 'Barcelona',
    code: 'BCN',
    country: 'Spain'
  },
  {
    name: 'Beijing',
    code: 'Any',
    country: 'China'
  },
  {
    name: 'Budapest',
    code: 'BUD',
    country: 'Hungary'
  },
  {
    name: 'Edinburgh',
    code: 'EDI',
    country: 'United Kingdom'
  },
  {
    name: 'Glasgow',
    code: 'Any',
    country: 'United Kingdom',
    indent: true
  },
  {
    name: 'London',
    code: 'Any',
    country: 'United Kingdom'
  },
  {
    name: 'Miami, FL',
    code: 'Any',
    country: 'United States'
  },
  {
    name: 'Shenzhen Bao\'an International',
    code: 'SZX',
    country: 'China'
  },
  {
    name: 'Singapore Changi',
    code: 'SIN',
    country: 'Singapore'
  },
  {
    name: 'Sofia',
    code: 'SOF',
    country: 'Bulgaria'
  }
]

const getSuggestions = (value) => {
  const inputValue = value.trim().toLowerCase()
  const inputLength = inputValue.length

  return inputLength === 0 ? [] : offices.filter(office =>
    office.name.toLowerCase().indexOf(inputValue) !== -1
  )
}

const getSuggestionValue = (suggestion) => `${suggestion.name} (${suggestion.code})`

let autosuggestId = 0

class AutosuggestExample extends Component {
  constructor () {
    super()

    this.state = {
      autosuggestId: `autosuggest-example-${autosuggestId++}`,
      value: '',
      suggestions: []
    }

    this.onChange = this.onChange.bind(this)
    this.onSuggestionsFetchRequested = this.onSuggestionsFetchRequested.bind(this)
    this.onSuggestionsClearRequested = this.onSuggestionsClearRequested.bind(this)
  }

  onChange (e, { newValue }) {
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
    const { autosuggestId, value, suggestions } = this.state

    const inputProps = {
      id: autosuggestId,
      placeholder: 'Enter an office name',
      value,
      onChange: this.onChange
    }

    return (
      <div>
        <BpkLabel label='Office' htmlFor={autosuggestId} />
        <BpkAutosuggest
          suggestions={suggestions}
          onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
          onSuggestionsClearRequested={this.onSuggestionsClearRequested}
          getSuggestionValue={getSuggestionValue}
          renderSuggestion={this.props.renderSuggestion}
          inputProps={inputProps}
        />
      </div>
    )
  }
}

const components = [
  {
    id: 'default',
    title: 'Default',
    blurb: [
      <BpkParagraph>
        This is the most basic method of displaying suggestions. Note that they can be indented (to indicate topology
        for example) - type "a" to see this demonstrated by the Glasgow office suggestion.
      </BpkParagraph>
    ],
    examples: [
      <AutosuggestExample
        renderSuggestion={(suggestion) => (
          <BpkAutosuggestSuggestion
            value={getSuggestionValue(suggestion)}
            indent={suggestion.indent}
          />
        )}
      />
    ]
  },
  {
    id: 'icon',
    title: 'Icons',
    blurb: [
      <BpkParagraph>
        You can insert a <BpkRouterLink to={ROUTES.ICONS}>Backpack icon</BpkRouterLink> next to each suggestion, useful
        for differentiation e.g. between airports, cities and countries.
      </BpkParagraph>
    ],
    examples: [
      <AutosuggestExample
        renderSuggestion={(suggestion) => (
          <BpkAutosuggestSuggestion
            value={getSuggestionValue(suggestion)}
            indent={suggestion.indent}
            icon={BpkFlightIcon}
          />
        )}
      />
    ]
  },
  {
    id: 'sub-heading',
    title: 'Sub-headings',
    blurb: 'Additional suggestion information can be displayed as a sub-heading.',
    examples: [
      <AutosuggestExample
        renderSuggestion={(suggestion) => (
          <BpkAutosuggestSuggestion
            value={getSuggestionValue(suggestion)}
            subHeading={suggestion.country}
            indent={suggestion.indent}
          />
        )}
      />
    ]
  },
  {
    id: 'tertiary-label',
    title: 'Tertiary label',
    blurb: 'If sub-headings are not enough, you can add some tertiary information too.',
    examples: [
      <AutosuggestExample
        renderSuggestion={(suggestion) => (
          <BpkAutosuggestSuggestion
            value={getSuggestionValue(suggestion)}
            subHeading={suggestion.country}
            indent={suggestion.indent}
            tertiaryLabel='Airport'
          />
        )}
      />
    ]
  },
  {
    id: 'combination',
    title: 'Combination',
    blurb: 'This example shows all of the above combined.',
    examples: [
      <AutosuggestExample
        renderSuggestion={(suggestion) => (
          <BpkAutosuggestSuggestion
            value={getSuggestionValue(suggestion)}
            subHeading={suggestion.country}
            indent={suggestion.indent}
            tertiaryLabel='Airport'
            icon={BpkFlightIcon}
          />
        )}
      />
    ]
  }
]

const AutosuggestPage = () => <DocsPageBuilder
  title='Autosuggest'
  blurb={[
    <BpkParagraph>
      The Backpack autosuggest component is a lightweight wrapper
      around <BpkLink href={'http://react-autosuggest.js.org/'} blank>React Autosuggest</BpkLink>. It can be used to
      display suggestions for travel destinations, hotels, car hire and more - any data source can be used. Whilst you
      have full control over suggestion rendering, Backpack provides a built in suggestion component allowing you to
      display icons, sub-headings and more.
    </BpkParagraph>
  ]}
  components={components}
  readme={require('raw!bpk-component-autosuggest/readme.md')}
  sassdocId='autosuggest'
/>

export default AutosuggestPage
