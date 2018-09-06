/*
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2018 Skyscanner Ltd
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import BpkInput from 'bpk-component-input';
import BpkButton from 'bpk-component-button';
import BpkSelect from 'bpk-component-select';
import BpkCheckbox from 'bpk-component-checkbox';
import BpkFieldset from 'bpk-component-fieldset';
import BpkRouterLink from 'bpk-component-router-link';
import readme from 'bpk-component-fieldset/README.md';
import PropTypes from 'prop-types';
import React, { cloneElement, Component } from 'react';
import { cssModules } from 'bpk-react-utils';
import BpkAutosuggest, {
  BpkAutosuggestSuggestion,
} from 'bpk-component-autosuggest';

import STYLES from './fieldsets-page.css';
import * as ROUTES from '../../constants/routes';
import DocsPageBuilder from '../../components/DocsPageBuilder';
import DocsPageWrapper from '../../components/DocsPageWrapper';
import IntroBlurb from '../../components/IntroBlurb';

const getClassName = cssModules(STYLES);

const offices = [
  {
    name: 'Barcelona',
    code: 'BCN',
    country: 'Spain',
  },
  {
    name: 'Beijing',
    code: 'Any',
    country: 'China',
  },
  {
    name: 'Budapest',
    code: 'BUD',
    country: 'Hungary',
  },
  {
    name: 'Edinburgh',
    code: 'EDI',
    country: 'United Kingdom',
  },
  {
    name: 'Glasgow',
    code: 'Any',
    country: 'United Kingdom',
    indent: true,
  },
  {
    name: 'London',
    code: 'Any',
    country: 'United Kingdom',
  },
  {
    name: 'Miami, FL',
    code: 'Any',
    country: 'United States',
  },
  {
    name: "Shenzhen Bao'an International",
    code: 'SZX',
    country: 'China',
  },
  {
    name: 'Singapore Changi',
    code: 'SIN',
    country: 'Singapore',
  },
  {
    name: 'Sofia',
    code: 'SOF',
    country: 'Bulgaria',
  },
];

const getSuggestions = value => {
  const inputValue = value.trim().toLowerCase();
  const inputLength = inputValue.length;

  return inputLength === 0
    ? []
    : offices.filter(
        office => office.name.toLowerCase().indexOf(inputValue) !== -1,
      );
};

const getSuggestionValue = suggestion =>
  `${suggestion.name} (${suggestion.code})`;

let instances = 0;

class AutosuggestExample extends Component {
  constructor() {
    super();

    instances += instances;

    this.state = {
      value: '',
      suggestions: [],
    };
  }

  onChange = (e, { newValue }) => {
    this.setState({
      value: newValue,
    });
  };

  onSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: getSuggestions(value),
    });
  };

  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: [],
    });
  };

  render() {
    const { value, suggestions } = this.state;

    const inputProps = {
      id: 'carhire-search-controls-location-pick-up',
      name: 'my_autosuggest',
      value,
      placeholder: 'Enter a destination name',
      onChange: this.onChange,
    };

    return (
      <FieldsetContainer
        label="Destination"
        validationMessage="Please select a destination."
        validStates={[true, false]}
        description="The final price will be adjusted based on your selection"
      >
        <BpkAutosuggest
          suggestions={suggestions}
          onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
          onSuggestionsClearRequested={this.onSuggestionsClearRequested}
          getSuggestionValue={getSuggestionValue}
          renderSuggestion={suggestion => (
            <BpkAutosuggestSuggestion
              value={getSuggestionValue(suggestion)}
              indent={suggestion.indent}
            />
          )}
          inputProps={inputProps}
        />
      </FieldsetContainer>
    );
  }
}

// eslint-disable-next-line react/no-multi-comp
class FieldsetContainer extends Component {
  constructor() {
    super();

    this.state = {
      value: '',
      checked: false,
      validState: 0,
    };
  }

  onChange = e => {
    this.setState({
      value: e.target.value,
      checked: e.target.checked,
    });
  };

  toggleStates = () => {
    this.setState(prevState => {
      let nextValidState = prevState.validState + 1;

      if (nextValidState > this.props.validStates.length - 1) {
        nextValidState = 0;
      }

      return {
        validState: nextValidState,
      };
    });
  };

  render() {
    const { children, isCheckbox, validStates, ...rest } = this.props;

    const valid = validStates[this.state.validState];

    const dynamicProps = isCheckbox
      ? { checked: this.state.checked }
      : { value: this.state.value, valid };

    const clonedChildren = cloneElement(children, {
      onChange: this.onChange,
      ...dynamicProps,
    });

    return (
      <div className={getClassName('bpkdocs-fieldsets-page__container')}>
        <BpkFieldset
          className={getClassName('bpkdocs-fieldsets-page__fieldset')}
          isCheckbox={isCheckbox}
          valid={valid}
          {...rest}
        >
          {clonedChildren}
        </BpkFieldset>
        <div className={getClassName('bpkdocs-fieldsets-page__toggle')}>
          <BpkButton onClick={this.toggleStates}>Toggle states</BpkButton>
        </div>
      </div>
    );
  }
}

FieldsetContainer.propTypes = {
  children: PropTypes.node.isRequired,
  validStates: PropTypes.array.isRequired, // eslint-disable-line react/forbid-prop-types
  isCheckbox: PropTypes.bool,
};

FieldsetContainer.defaultProps = {
  isCheckbox: false,
};

const components = [
  {
    id: 'inputs',
    title: 'Inputs',
    examples: [
      <FieldsetContainer
        label="Name"
        validationMessage="Please enter your full name."
        validStates={[null, true, false]}
        description="Your full name exactly as stated in your passport"
      >
        <BpkInput
          id="name_inputy"
          name="name"
          value=""
          placeholder="E.g Joe Blogs"
        />
      </FieldsetContainer>,
    ],
  },
  {
    id: 'selects',
    title: 'Selects',
    examples: [
      <FieldsetContainer
        label="Cabin class"
        validationMessage="Please select a cabin class."
        validStates={[true, false]}
        description="The final price will be adjusted based on your selection"
      >
        <BpkSelect id="cabin_class_select" name="cabin_class" value="">
          <option value="">Please select...</option>
          <option value="economy">Economy</option>
          <option value="premium_economy">Premium Economy</option>
          <option value="business">Business class</option>
          <option value="first">First</option>
        </BpkSelect>
      </FieldsetContainer>,
    ],
  },
  {
    id: 'autosuggest',
    title: 'Autosuggests',
    examples: [<AutosuggestExample />],
  },
  {
    id: 'checkboxes',
    title: 'Checkboxes',
    examples: [
      <FieldsetContainer
        validationMessage="Please accept our terms & conditions to continue."
        validStates={[true, false]}
        isCheckbox
        description="Please review the terms & conditions carefully"
      >
        <BpkCheckbox
          id="terms_conditions_checkbox"
          name="terms_conditions"
          label="I accept the terms & conditions"
        />
      </FieldsetContainer>,
    ],
  },
];

const blurb = [
  <IntroBlurb>
    Fieldsets encapsulate the composition of{' '}
    <BpkRouterLink to={`${ROUTES.FORM}`}>form controls</BpkRouterLink>
    , <BpkRouterLink to={`${ROUTES.FORM}#labels`}>labels</BpkRouterLink>
    &nbsp;&amp;{' '}
    <BpkRouterLink to={`${ROUTES.FORM}#validation`}>
      validation messages
    </BpkRouterLink>{' '}
    with the necessary attributes to ensure good accessibility for screen
    readers.
  </IntroBlurb>,
];

const FieldsetSubPage = ({ ...rest }) => (
  <DocsPageBuilder
    title="Fieldsets"
    components={components}
    readme={readme}
    {...rest}
  />
);

const FieldsetPage = () => (
  <DocsPageWrapper
    title="Fieldset"
    blurb={blurb}
    webSubpage={<FieldsetSubPage wrapped />}
  />
);

export default FieldsetPage;
