# Migrating from `BpkAutosuggest` to `BpkAutosuggestV2`

`BpkAutosuggest` has been completely rewritten to make it more accessible for screen reader users.

## History and rationale

The current base library is `react-autosuggest` which is no longer supported and is known to have a11y issues. We had two options: take over ownership of this library or write our own implementation.

Banana has been using a custom implementation built using `downshift`'s `useCombobox` hook since November 2022 which gives screen reader users a better experience. The main improvement is the feedback when results are rendered.

## Migrating

* the component now accepts a ref instead of a ref callback

**Before**

```js
autosuggestRef: typeof BpkAutosuggest;

<BpkAutosuggest
  ref={(bpkAutosuggest) => { this.autosuggestRef = bpkAutosuggest; }}>

```
**Replacement**


```js
autosuggestRef: React.RefObject<HTMLInputElement>;

this.autosuggestRef = React.createRef<HTMLInputElement>();
<BpkAutosuggest
  ref={this.autosuggestRef}>

```
* aria strings are required:
    * `getA11yResultsMessage` is a callback which returns the number of results being rendered. This should be used to pass translations for single, multiple and no results returned
    * `ariaLabels` requires a `resultsList` string which will be appended to the `<ul>`

* `renderInputComponent` is no longer a prop. The component renders a BpkInput component, any extension or modification of this can be done via the `inputProps` prop which is passed into the input or by extending or overriding the styling

**Extending**

```js
this.theme = {
  ...BpkAutosuggest.defaultProps.theme,
  input: `${BpkAutosuggest.defaultProps.theme.input} ${STYLES['fsc-location-input']} `,
}

<BpkAutosuggest theme={this.theme}>

```

**Overriding**

```js
this.theme = {
  ...BpkAutosuggest.defaultProps.theme,
  input: 'fsc-location-input',
}

<BpkAutosuggest theme={this.theme}>
```
* `onSuggestionsFetchRequested` param change

**Before**
```js
`({value}) => {}`
```

**Replacement**
```js
`(value) =>`
```
The param returned is now just the string value of the inputValue

* `onSuggestionSelected` param change

**Before**
```js
  onSuggestionSelected: (
    e: React.SyntheticEvent,
    item: {
      suggestion: Suggestion;
      suggestionIndex?: number;
    },
  ) =>
```

**Replacement**
```js
  onSuggestionSelected: (item: {
    suggestion: Suggestion;
    suggestionIndex?: number;
  }) => void
```
* `onChange` - this library controls its own onChange events internally via its own state system so there is no need to pass an onChange as part of the `inputProps`. However if you need to know when this event is happening you can pass a `onInputValueChange` prop which will return details of the input value and reason for change

```js
  onInputValueChange?: (input: { method: string; newValue: string }) => void;
```
* `value` - this library also controls its own `value` state. If you want to pass an initial value into the component do via the `defaultValue` prop instead of `inputProps.value`
