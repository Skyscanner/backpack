import React from 'react'
import { storiesOf } from '@kadira/storybook'

import BpkAutosuggest from './index'

class AutosuggestExample extends React.Component {

    render() {
        const suggestions = [
            'Example',
            'Autosuggest',
            'Suggestions'
        ]

        return <BpkAutosuggest suggestions={suggestions}
                               onSuggestionsUpdateRequested={() => {}}
                               getSuggestionValue={(s) => s}
                               renderSuggestion={this.renderSuggestion}
                               value={'Edinburgh'}
                               onChange={() => {}} />
    }

    renderSuggestion(suggestion) {
        return (<span>{suggestion}</span>);
    }

}

storiesOf('bpk-component-autosuggest', module)
  .add('Example', () => (<AutosuggestExample />))
