import BpkInput from 'bpk-component-input';
import BpkButton from 'bpk-component-button';
import BpkSelect from 'bpk-component-select';
import BpkCheckbox from 'bpk-component-checkbox';
import BpkFieldset from 'bpk-component-fieldset';
import BpkParagraph from 'bpk-component-paragraph';
import BpkRouterLink from 'bpk-component-router-link';
import readme from 'bpk-component-fieldset/readme.md';
import React, { cloneElement, PropTypes, Component } from 'react';

import './fieldsets-page.scss';
import * as ROUTES from './../../constants/routes';
import DocsPageBuilder from './../../components/DocsPageBuilder';

class FieldsetContainer extends Component {
  constructor() {
    super();

    this.state = {
      value: '',
      checked: false,
      validState: 0,
    };

    this.onChange = this.onChange.bind(this);
    this.toggleStates = this.toggleStates.bind(this);
  }

  onChange(e) {
    this.setState({
      value: e.target.value,
      checked: e.target.checked,
    });
  }

  toggleStates() {
    this.setState((prevState) => {
      let nextValidState = prevState.validState + 1;

      if (nextValidState > (this.props.validStates.length - 1)) {
        nextValidState = 0;
      }

      return {
        validState: nextValidState,
      };
    });
  }

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
      <div className="bpkdocs-fieldsets-page__container">
        <BpkFieldset
          className="bpkdocs-fieldsets-page__fieldset"
          isCheckbox={isCheckbox}
          valid={valid}
          {...rest}
        >
          {clonedChildren}
        </BpkFieldset>
        <div className="bpkdocs-fieldsets-page__toggle">
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
        label="From"
        validationMessage="Please enter a Country, city or airport"
        validStates={[null, true, false]}
      >
        <BpkInput
          id="from_input"
          name="from"
          value=""
          placeholder="E.g. Singapore"
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
        validationMessage="Please select a cabin class"
        validStates={[true, false]}
      >
        <BpkSelect
          id="cabin_class_select"
          name="cabin_class"
          value=""
        >
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
    id: 'checkboxes',
    title: 'Checkboxes',
    examples: [
      <FieldsetContainer
        validationMessage="Please accept our terms & conditions to continue."
        validStates={[true, false]}
        isCheckbox
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

const FieldsetPage = () => <DocsPageBuilder
  title="Fieldsets"
  blurb={[
    <BpkParagraph>
      Fieldsets encapsulate the composition of <BpkRouterLink to={`${ROUTES.FORMS}`}>form controls</BpkRouterLink>
      , <BpkRouterLink to={`${ROUTES.FORMS}#labels`}>labels</BpkRouterLink>
      &nbsp;&amp; <BpkRouterLink to={`${ROUTES.FORMS}#validation`}>validation messages</BpkRouterLink> with the
      necessary attributes to ensure good accessibility for screen readers.
    </BpkParagraph>,
  ]}
  components={components}
  readme={readme}
/>;

export default FieldsetPage;
