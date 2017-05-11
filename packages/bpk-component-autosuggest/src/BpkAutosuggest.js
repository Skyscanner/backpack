import Autosuggest from 'react-autosuggest';
import { cssModules } from 'bpk-react-utils';
import BpkInput from 'bpk-component-input';

import STYLES from './bpk-autosuggest.scss';

const getClassName = cssModules(STYLES);

/*
  `react-autosuggest` is not wrapped in a functional component because the `ref` attribute won't work on it.
  This is because functional components don't have instances, and it is a mounted instance of the component
  what it's received by the `ref` callback.

  Further reading about Refs: https://facebook.github.io/react/docs/refs-and-the-dom.html
 */

Autosuggest.defaultProps.theme = {
  container: getClassName('bpk-autosuggest__container'),
  containerOpen: getClassName('bpk-autosuggest__container--open'),
  suggestionsContainer: getClassName('bpk-autosuggest__suggestions-container'),
  suggestionsList: getClassName('bpk-autosuggest__suggestions-list'),
  suggestion: getClassName('bpk-autosuggest__suggestion-item'),
  suggestionHighlighted: getClassName('bpk-autosuggest__suggestion-item--highlighted'),
  sectionContainer: getClassName('bpk-autosuggest__section-container'),
  sectionTitle: getClassName('bpk-autosuggest__section-title'),
};

Autosuggest.defaultProps.renderInputComponent = BpkInput;

export default Autosuggest;
