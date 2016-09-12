# bpk-component-autosuggest

> Backpack autosuggest component.

### Installation

```sh
npm install bpk-component-autosuggest --save
```

### Usage

```js
import React from 'react'
import BpkAutosuggest from 'bpk-component-autosuggest'

function renderSuggestion(suggestion) {
  return <span>{suggestion}</span>
}

export default MyComponent = () => {
  const suggestions = ['Suggestion 1', 'Suggestion 2', 'Suggestion 3']

  return <BpkAutosuggest
          suggestions={suggestions}
          onSuggestionsUpdateRequested={() => {}}
          value={'Suggestion 1'}
          onChange={() => {}}
          renderSuggestion={renderSuggestion}
         />
}
```
