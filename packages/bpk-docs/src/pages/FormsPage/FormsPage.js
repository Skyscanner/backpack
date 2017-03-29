import React from 'react';
import BpkLabel from 'bpk-component-label';
import BpkSelect from 'bpk-component-select';
import BpkCheckbox from 'bpk-component-checkbox';
import BpkParagraph from 'bpk-component-paragraph';
import BpkInput, { INPUT_TYPES } from 'bpk-component-input';
import BpkBannerAlert, { ALERT_TYPES } from 'bpk-component-banner-alert';

import inputReadme from 'bpk-component-input/readme.md';
import labelReadme from 'bpk-component-label/readme.md';
import radioReadme from 'bpk-component-radio/readme.md';
import selectReadme from 'bpk-component-select/readme.md';
import checkboxReadme from 'bpk-component-checkbox/readme.md';

import './forms-page.scss';
import DocsPageBuilder from './../../components/DocsPageBuilder';
import InputContainer from './InputContainer';
import RadioContainer from './RadioContainer';

const components = [
  {
    id: 'inputs',
    title: 'Inputs',
    blurb: [
      <BpkParagraph>
        When asking a user to input text, please be sure to use the appropriate type of input. Specifying email or
        number will ensure the correct keyboard is displayed (on supported devices) and also adds semantic meaning
        to the input.
      </BpkParagraph>,
    ],
    examples: [
      <form className="bpkdocs-forms-page__form">
        <BpkLabel label="Input" htmlFor="input" />
        <InputContainer
          FormComponent={BpkInput}
          id="input"
          name="input"
          value="Edinburgh"
          placeholder="Country, city or airport"
          onChange={() => null}
        />
      </form>,
      <form className="bpkdocs-forms-page__form">
        <BpkLabel label="Input (placeholder)" htmlFor="input_placeholder" />
        <InputContainer
          FormComponent={BpkInput}
          id="input_placeholder"
          name="input_placeholder"
          value=""
          placeholder="Country, city or airport"
          onChange={() => null}
        />
      </form>,
      <form className="bpkdocs-forms-page__form">
        <BpkLabel label="Valid input" htmlFor="input_valid" />
        <InputContainer
          FormComponent={BpkInput}
          id="input_valid"
          name="input_valid"
          value="Edinburgh"
          placeholder="Country, city or airport"
          onChange={() => null}
          valid
        />
      </form>,
      <form className="bpkdocs-forms-page__form">
        <BpkLabel label="Invalid input" htmlFor="input_invalid" />
        <InputContainer
          FormComponent={BpkInput}
          id="input_invalid"
          name="input_invalid"
          value="Edinbrvgh"
          placeholder="Country, city or airport"
          onChange={() => null}
          valid={false}
        />
      </form>,
      <form className="bpkdocs-forms-page__form">
        <BpkLabel label="Disabled input" htmlFor="input_disabled" />
        <InputContainer
          FormComponent={BpkInput}
          id="input_disabled"
          name="input_disabled"
          value="Edinburgh"
          placeholder="Country, city or airport"
          onChange={() => null}
          disabled
        />
      </form>,
      <form className="bpkdocs-forms-page__form">
        <BpkLabel label="Email input" htmlFor="input_email" />
        <InputContainer
          FormComponent={BpkInput}
          type={INPUT_TYPES.EMAIL}
          id="input_email"
          name="input_email"
          value="example@example.com"
          placeholder="Country, city or airport"
          onChange={() => null}
        />
      </form>,
      <form className="bpkdocs-forms-page__form">
        <BpkLabel label="Number input" htmlFor="input_number" />
        <InputContainer
          FormComponent={BpkInput}
          type={INPUT_TYPES.NUMBER}
          id="input_number"
          name="input_number"
          value="0"
          placeholder="Country, city or airport"
          onChange={() => null}
        />
      </form>,
      <form className="bpkdocs-forms-page__form">
        <BpkLabel label="Password input" htmlFor="input_password" />
        <InputContainer
          FormComponent={BpkInput}
          type={INPUT_TYPES.PASSWORD}
          id="input_password"
          name="input_password"
          value="letmein"
          placeholder="Country, city or airport"
          onChange={() => null}
        />
      </form>,
      <form className="bpkdocs-forms-page__form">
        <BpkLabel label="Telephone input" htmlFor="input_telephone" />
        <InputContainer
          FormComponent={BpkInput}
          type={INPUT_TYPES.TEL}
          id="input_telephone"
          name="input_telephone"
          value="+441234567890"
          placeholder="Country, city or airport"
          onChange={() => null}
        />
      </form>,
    ],
    readme: inputReadme,
  },
  {
    id: 'selects',
    title: 'Selects (aka dropdowns)',
    blurb: [
      <BpkParagraph>
        Backpack selects override the default styles in most modern browsers. In some older browsers they simply fall
        back to the browser default.
      </BpkParagraph>,
    ],
    examples: [
      <form className="bpkdocs-forms-page__form">
        <BpkLabel label="Select" htmlFor="select" />
        <InputContainer
          FormComponent={BpkSelect}
          id="select"
          name="select"
          value="economy"
          onChange={() => null}
        >
          <option value="economy">Economy</option>
          <option value="premium_economy">Premium Economy</option>
          <option value="business">Business class</option>
          <option value="first">First class</option>
        </InputContainer>
      </form>,
      <form className="bpkdocs-forms-page__form">
        <BpkLabel label="Invalid select" htmlFor="select_invalid" />
        <InputContainer
          FormComponent={BpkSelect}
          id="select_invalid"
          name="select_invalid"
          value=""
          onChange={() => null}
          valid={false}
        >
          <option value="" hidden>Please select...</option>
          <option value="economy">Economy</option>
          <option value="premium_economy">Premium Economy</option>
          <option value="business">Business class</option>
          <option value="first">First class</option>
        </InputContainer>
      </form>,
      <form className="bpkdocs-forms-page__form">
        <BpkLabel label="Disabled select" htmlFor="select_disabled" />
        <InputContainer
          FormComponent={BpkSelect}
          id="select_disabled"
          name="select_disabled"
          value="economy"
          onChange={() => null}
          disabled
        >
          <option value="economy">Economy</option>
          <option value="premium_economy">Premium Economy</option>
          <option value="business">Business class</option>
          <option value="first">First class</option>
        </InputContainer>
      </form>,
    ],
    readme: selectReadme,
  },
  {
    id: 'docked-inputs-and-selects',
    title: 'Docked inputs & selects',
    blurb: 'Both inputs and selects can be docked together to build a one-line form.',
    examples: [
      <div className="bpkdocs-forms-page__viewport-alert">
        <BpkBannerAlert
          type={ALERT_TYPES.WARN}
          message="These are only suitable for larger viewports - try viewing on a desktop device."
        />
      </div>,
      <form className="bpkdocs-forms-page__form bpkdocs-forms-page__form--desktop-only">
        <div>
          <BpkLabel label="From" htmlFor="input_origin" className="bpkdocs-forms-page__place" />
          <BpkLabel label="To" htmlFor="input_destination" className="bpkdocs-forms-page__place" />
          <BpkLabel label="Depart" htmlFor="input_outbound" className="bpkdocs-forms-page__date" />
          <BpkLabel label="Return" htmlFor="input_inbound" className="bpkdocs-forms-page__date" />
        </div>
        <div>
          <InputContainer
            FormComponent={BpkInput}
            id="input_origin"
            name="input_origin"
            value="Edinburgh"
            placeholder="Country, city or airport"
            onChange={() => null}
            className="bpkdocs-forms-page__place"
            docked
            large
          />
          <InputContainer
            FormComponent={BpkInput}
            id="input_destination"
            name="input_destination"
            value=""
            placeholder="Country, city or airport"
            onChange={() => null}
            className="bpkdocs-forms-page__place"
            docked
            large
          />
          <InputContainer
            FormComponent={BpkInput}
            id="input_outbound"
            name="input_outbound"
            value={new Date().toLocaleDateString()}
            placeholder="Country, city or airport"
            onChange={() => null}
            className="bpkdocs-forms-page__date"
            docked
            large
          />
          <InputContainer
            FormComponent={BpkInput}
            id="input_inbound"
            name="input_inbound"
            value={new Date(new Date().getTime() + (24 * 60 * 60 * 1000)).toLocaleDateString()}
            placeholder="Country, city or airport"
            onChange={() => null}
            className="bpkdocs-forms-page__date"
            docked
            large
          />
        </div>
      </form>,
      <form className="bpkdocs-forms-page__form bpkdocs-forms-page__form--desktop-only">
        <div>
          <BpkLabel
            label="Find hotel deals"
            htmlFor="input_hotels_destination"
            className="bpkdocs-forms-page__hotels-destination"
          />
          <BpkLabel label="Check-in" htmlFor="input_checkin" className="bpkdocs-forms-page__date" />
          <BpkLabel label="Check-out" htmlFor="input_checkout" className="bpkdocs-forms-page__date" />
          <BpkLabel label="Guests" htmlFor="input_guests" className="bpkdocs-forms-page__number" />
          <BpkLabel label="Rooms" htmlFor="input_rooms" className="bpkdocs-forms-page__number" />
        </div>
        <div>
          <InputContainer
            FormComponent={BpkInput}
            id="input_hotels_destination"
            name="input_hotels_destination"
            value=""
            placeholder="Destination or hotel name"
            onChange={() => null}
            className="bpkdocs-forms-page__hotels-destination"
            docked
            large
          />
          <InputContainer
            FormComponent={BpkInput}
            id="input_checkin"
            name="input_checkin"
            value={new Date().toLocaleDateString()}
            placeholder=""
            onChange={() => null}
            className="bpkdocs-forms-page__date"
            docked
            large
          />
          <InputContainer
            FormComponent={BpkInput}
            id="input_checkout"
            name="input_checkout"
            value={new Date(new Date().getTime() + (24 * 60 * 60 * 1000)).toLocaleDateString()}
            placeholder=""
            onChange={() => null}
            className="bpkdocs-forms-page__date"
            docked
            large
          />
          <InputContainer
            FormComponent={BpkSelect}
            id="input_guests"
            name="input_guests"
            value="2"
            onChange={() => null}
            className="bpkdocs-forms-page__number"
            docked
            large
          >
            <option value={0}>0</option>
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
          </InputContainer>
          <InputContainer
            FormComponent={BpkSelect}
            id="input_rooms"
            name="input_rooms"
            value="1"
            onChange={() => null}
            className="bpkdocs-forms-page__number"
            docked
            large
          >
            <option value={0}>0</option>
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
          </InputContainer>
        </div>
      </form>,
      <form className="bpkdocs-forms-page__form bpkdocs-forms-page__form--desktop-only">
        <div>
          <BpkLabel
            label="Pick-up location"
            htmlFor="input_pickup_location"
            className="bpkdocs-forms-page__car-hire-pickup-location"
          />
          <BpkLabel label="Pick-up date" htmlFor="input_pickup_date" className="bpkdocs-forms-page__date" />
          <BpkLabel label="Pick-up time" htmlFor="input_pickup_time" className="bpkdocs-forms-page__time" />
          <BpkLabel label="Drop-off date" htmlFor="input_dropoff_date" className="bpkdocs-forms-page__date" />
          <BpkLabel label="Drop-off time" htmlFor="input_dropoff_time" className="bpkdocs-forms-page__time" />
        </div>
        <div>
          <InputContainer
            FormComponent={BpkInput}
            id="input_pickup_location"
            name="input_pickup_location"
            value=""
            placeholder="City or airport"
            onChange={() => null}
            className="bpkdocs-forms-page__car-hire-pickup-location"
            docked
            large
          />
          <InputContainer
            FormComponent={BpkInput}
            id="input_pickup_date"
            name="input_pickup_date"
            value={new Date().toLocaleDateString()}
            placeholder=""
            onChange={() => null}
            className="bpkdocs-forms-page__date"
            docked
            large
          />
          <InputContainer
            FormComponent={BpkSelect}
            id="input_pickup_time"
            name="input_pickup_time"
            value="10:00"
            placeholder=""
            onChange={() => null}
            className="bpkdocs-forms-page__time"
            docked
            large
          >
            <option value="10:00">10:00</option>
            <option value="10:15">10:15</option>
            <option value="10:30">10:30</option>
            <option value="10:45">10:45</option>
          </InputContainer>
          <InputContainer
            FormComponent={BpkInput}
            id="input_dropoff_date"
            name="input_dropoff_date"
            value={new Date(new Date().getTime() + (24 * 60 * 60 * 1000)).toLocaleDateString()}
            placeholder=""
            onChange={() => null}
            className="bpkdocs-forms-page__date"
            docked
            large
          />
          <InputContainer
            FormComponent={BpkSelect}
            id="input_dropoff_time"
            name="input_dropoff_time"
            value="10:00"
            onChange={() => null}
            className="bpkdocs-forms-page__time"
            docked
            large
          >
            <option value="10:00">10:00</option>
            <option value="10:15">10:15</option>
            <option value="10:30">10:30</option>
            <option value="10:45">10:45</option>
          </InputContainer>
        </div>
      </form>,
    ],
  },
  {
    id: 'checkboxes',
    title: 'Checkboxes',
    blurb: [
      <BpkParagraph>
        Similar to selects, checkboxes override the default styles in most modern browsers. In some older browsers
        they simply fall back to the browser default.
      </BpkParagraph>,
    ],
    examples: [
      <form className="bpkdocs-forms-page__form">
        <InputContainer
          FormComponent={BpkCheckbox}
          name="checkbox"
          label="Apples"
          onChange={() => null}
          checked
        />
      </form>,
      <form className="bpkdocs-forms-page__form">
        <InputContainer
          FormComponent={BpkCheckbox}
          name="unchecked_checkbox"
          label="Bananas"
          onChange={() => null}
        />
      </form>,
      <form className="bpkdocs-forms-page__form">
        <InputContainer
          FormComponent={BpkCheckbox}
          name="disabled_checkbox"
          label="Strawberries"
          onChange={() => null}
          disabled
        />
      </form>,
      <form className="bpkdocs-forms-page__form">
        <InputContainer
          FormComponent={BpkCheckbox}
          name="disabled_checked_checkbox"
          label="Pears"
          onChange={() => null}
          disabled
          checked
        />
      </form>,
    ],
    readme: checkboxReadme,
  },
  {
    id: 'radios',
    title: 'Radio buttons',
    blurb: [
      <BpkParagraph>
        Again, Backpack overrides the browser default styles for radio buttons. In some older browsers they simply
        fall back to the browser default.
      </BpkParagraph>,
    ],
    examples: [
      <RadioContainer value="apples" />,
      <br />,
      <RadioContainer value="apples" disabled />,
    ],
    readme: radioReadme,
  },
  {
    id: 'labels',
    title: 'Labels',
    blurb: [
      <BpkParagraph>
        Labels should always be used with form elements to provide context to the user. Relying on placeholders alone
        is not good practise. These can be seen in the examples above for inputs & selects.
      </BpkParagraph>,
    ],
    examples: [],
    readme: labelReadme,
  },
];

const FormsPage = () => <DocsPageBuilder
  title="Forms"
  blurb="Here you’ll find a range of common inputs for capturing user data."
  components={components}
  sassdocId="forms"
/>;

export default FormsPage;
