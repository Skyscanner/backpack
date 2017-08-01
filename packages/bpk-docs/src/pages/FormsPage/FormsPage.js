/*
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2017 Skyscanner Ltd
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

import React from 'react';
import BpkLink from 'bpk-component-link';
import BpkLabel from 'bpk-component-label';
import BpkSelect from 'bpk-component-select';
import BpkCheckbox from 'bpk-component-checkbox';
import BpkTextarea from 'bpk-component-textarea';
import BpkRouterLink from 'bpk-component-router-link';
import BpkInput, { INPUT_TYPES } from 'bpk-component-input';
import BpkFormValidation from 'bpk-component-form-validation';
import BpkBannerAlert, { ALERT_TYPES } from 'bpk-component-banner-alert';
import { cssModules } from 'bpk-react-utils';

import inputReadme from 'bpk-component-input/readme.md';
import labelReadme from 'bpk-component-label/readme.md';
import radioReadme from 'bpk-component-radio/readme.md';
import selectReadme from 'bpk-component-select/readme.md';
import textareaReadme from 'bpk-component-textarea/readme.md';
import checkboxReadme from 'bpk-component-checkbox/readme.md';
import validationReadme from 'bpk-component-form-validation/readme.md';

import STYLES from './forms-page.scss';
import * as ROUTES from './../../constants/routes';
import DocsPageBuilder from './../../components/DocsPageBuilder';
import InputContainer from './InputContainer';
import Paragraph from './../../components/Paragraph';
import RadioContainer from './RadioContainer';

const getClassName = cssModules(STYLES);
const loremIpsum = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.';

const loremIpsumLong = `Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptate repellat assumenda
necessitatibus reiciendis, porro temporibus expedita excepturi! Nostrum pariatur odit porro, dolorem dignissimos
laudantium quis, tempore iste non, nam magnam.`;

const formClassName = getClassName('bpkdocs-forms-page__form');
const placeClassName = getClassName('bpkdocs-forms-page__place');
const dateClassName = getClassName('bpkdocs-forms-page__date');
const numberClassName = getClassName('bpkdocs-forms-page__number');
const timeClassName = getClassName('bpkdocs-forms-page__time');
const destinationClassName = getClassName('bpkdocs-forms-page__hotels-destination');
const pickupClassName = getClassName('bpkdocs-forms-page__car-hire-pickup-location');
const containerClassName = ['bpkdocs-forms-page__form', 'bpkdocs-forms-page__form--desktop-only']
  .map(getClassName).join(' ');

const components = [
  {
    id: 'inputs',
    title: 'Inputs',
    blurb: [
      <Paragraph>
        When asking a user to input text, please be sure to use the appropriate type of input. Specifying email or
        number will ensure the correct keyboard is displayed (on supported devices) and also adds semantic meaning
        to the input.
      </Paragraph>,
    ],
    examples: [
      <form className={formClassName}>
        <BpkLabel htmlFor="input">Input</BpkLabel>
        <InputContainer
          FormComponent={BpkInput}
          id="input"
          name="input"
          value="Edinburgh"
          placeholder="Country, city or airport"
          onChange={() => null}
        />
      </form>,
      <form className={formClassName}>
        <BpkLabel htmlFor="input_placeholder">Input (placeholder)</BpkLabel>
        <InputContainer
          FormComponent={BpkInput}
          id="input_placeholder"
          name="input_placeholder"
          value=""
          placeholder="Country, city or airport"
          onChange={() => null}
        />
      </form>,
      <form className={formClassName}>
        <BpkLabel htmlFor="input_valid">Valid input</BpkLabel>
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
      <form className={formClassName}>
        <BpkLabel htmlFor="input_invalid">Invalid input</BpkLabel>
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
      <form className={formClassName}>
        <BpkLabel htmlFor="input_disabled" disabled>Disabled input</BpkLabel>
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
      <form className={formClassName}>
        <BpkLabel htmlFor="input_email">Email input</BpkLabel>
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
      <form className={formClassName}>
        <BpkLabel htmlFor="input_number">Number input</BpkLabel>
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
      <form className={formClassName}>
        <BpkLabel htmlFor="input_password">Password input</BpkLabel>
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
      <form className={formClassName}>
        <BpkLabel htmlFor="input_telephone">Telephone input</BpkLabel>
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
      <Paragraph>
        Backpack selects override the default styles in most modern browsers. In some older browsers they simply fall
        back to the browser default.
      </Paragraph>,
    ],
    examples: [
      <form className={formClassName}>
        <BpkLabel htmlFor="select">Select</BpkLabel>
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
      <form className={formClassName}>
        <BpkLabel htmlFor="select_invalid">Invalid select</BpkLabel>
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
      <form className={formClassName}>
        <BpkLabel htmlFor="select_disabled" disabled>Disabled select</BpkLabel>
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
      <div className={getClassName('bpkdocs-forms-page__viewport-alert')}>
        <BpkBannerAlert
          type={ALERT_TYPES.WARN}
          message="These are only suitable for larger viewports - try viewing on a desktop device."
        />
      </div>,
      <form className={containerClassName}>
        <div>
          <BpkLabel htmlFor="input_origin" className={placeClassName}>From</BpkLabel>
          <BpkLabel htmlFor="input_destination" className={placeClassName}>To</BpkLabel>
          <BpkLabel htmlFor="input_outbound" className={dateClassName}>Depart</BpkLabel>
          <BpkLabel htmlFor="input_inbound" className={dateClassName}>Return</BpkLabel>
        </div>
        <div>
          <InputContainer
            FormComponent={BpkInput}
            id="input_origin"
            name="input_origin"
            value="Edinburgh"
            placeholder="Country, city or airport"
            onChange={() => null}
            className={placeClassName}
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
            className={placeClassName}
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
            className={dateClassName}
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
            className={dateClassName}
            docked
            large
          />
        </div>
      </form>,
      <form className={containerClassName}>
        <div>
          <BpkLabel
            htmlFor="input_hotels_destination"
            className={destinationClassName}
          >
            Find hotel deals
          </BpkLabel>
          <BpkLabel htmlFor="input_checkin" className={dateClassName}>Check-in</BpkLabel>
          <BpkLabel htmlFor="input_checkout" className={dateClassName}>Check-out</BpkLabel>
          <BpkLabel htmlFor="input_guests" className={numberClassName}>Guests</BpkLabel>
          <BpkLabel htmlFor="input_rooms" className={numberClassName}>Rooms</BpkLabel>
        </div>
        <div>
          <InputContainer
            FormComponent={BpkInput}
            id="input_hotels_destination"
            name="input_hotels_destination"
            value=""
            placeholder="Destination or hotel name"
            onChange={() => null}
            className={destinationClassName}
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
            className={dateClassName}
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
            className={dateClassName}
            docked
            large
          />
          <InputContainer
            FormComponent={BpkSelect}
            id="input_guests"
            name="input_guests"
            value="2"
            onChange={() => null}
            className={numberClassName}
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
            className={numberClassName}
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
      <form className={containerClassName}>
        <div>
          <BpkLabel
            htmlFor="input_pickup_location"
            className={pickupClassName}
          >
            Pick-up location
          </BpkLabel>
          <BpkLabel htmlFor="input_pickup_date" className={dateClassName}>Pick-up date</BpkLabel>
          <BpkLabel htmlFor="input_pickup_time" className={timeClassName}>Pick-up time</BpkLabel>
          <BpkLabel htmlFor="input_dropoff_date" className={dateClassName}>Drop-off date</BpkLabel>
          <BpkLabel htmlFor="input_dropoff_time" className={timeClassName}>Drop-off time</BpkLabel>
        </div>
        <div>
          <InputContainer
            FormComponent={BpkInput}
            id="input_pickup_location"
            name="input_pickup_location"
            value=""
            placeholder="City or airport"
            onChange={() => null}
            className={pickupClassName}
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
            className={dateClassName}
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
            className={timeClassName}
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
            className={dateClassName}
            docked
            large
          />
          <InputContainer
            FormComponent={BpkSelect}
            id="input_dropoff_time"
            name="input_dropoff_time"
            value="10:00"
            onChange={() => null}
            className={timeClassName}
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
    id: 'textareas',
    title: 'Textareas',
    blurb: [
      <Paragraph>
        Textareas look almost identical to <BpkLink href="#inputs">inputs</BpkLink> except they allow long text to wrap
        across multiple lines.
      </Paragraph>,
    ],
    examples: [
      <form className={formClassName}>
        <BpkLabel htmlFor="textarea">Textarea</BpkLabel>
        <InputContainer
          FormComponent={BpkTextarea}
          id="textarea"
          name="textarea"
          value={loremIpsumLong}
          placeholder={loremIpsumLong}
          onChange={() => null}
        />
      </form>,
      <form className={formClassName}>
        <BpkLabel htmlFor="textarea_placeholder">Textarea (placeholder)</BpkLabel>
        <InputContainer
          FormComponent={BpkTextarea}
          id="textarea_placeholder"
          name="textarea_placeholder"
          value=""
          placeholder={loremIpsum}
          onChange={() => null}
        />
      </form>,
      <form className={formClassName}>
        <BpkLabel htmlFor="textarea_disabled" disabled>Disabled textarea</BpkLabel>
        <InputContainer
          FormComponent={BpkTextarea}
          id="textarea_disabled"
          name="textarea_disabled"
          value=""
          placeholder={loremIpsum}
          onChange={() => null}
          disabled
        />
      </form>,
    ],
    readme: textareaReadme,
  },
  {
    id: 'checkboxes',
    title: 'Checkboxes',
    blurb: [
      <Paragraph>
        Similar to selects, checkboxes override the default styles in most modern browsers. In some older browsers
        they simply fall back to the browser default.
      </Paragraph>,
    ],
    examples: [
      <form className={formClassName}>
        <InputContainer
          FormComponent={BpkCheckbox}
          name="checkbox"
          label="Apples"
          checked
        />
      </form>,
      <form className={formClassName}>
        <InputContainer
          FormComponent={BpkCheckbox}
          name="unchecked_checkbox"
          label="Bananas"
          checked={false}
        />
      </form>,
      <form className={formClassName}>
        <InputContainer
          FormComponent={BpkCheckbox}
          name="disabled_checkbox"
          label="Strawberries"
          disabled
        />
      </form>,
      <form className={formClassName}>
        <InputContainer
          FormComponent={BpkCheckbox}
          name="disabled_checked_checkbox"
          label="Pears"
          disabled
          checked
        />
      </form>,
      <form className={formClassName}>
        <InputContainer
          FormComponent={BpkCheckbox}
          name="small_checkbox"
          label="Oranges"
          smallLabel
        />
      </form>,
    ],
    readme: checkboxReadme,
  },
  {
    id: 'radios',
    title: 'Radio buttons',
    blurb: [
      <Paragraph>
        Again, Backpack overrides the browser default styles for radio buttons. In some older browsers they simply
        fall back to the browser default.
      </Paragraph>,
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
      <Paragraph>
        Labels should always be used with form elements to provide context to the user. Relying on placeholders alone
        is not good practise. Have a look at
        the <BpkRouterLink to={ROUTES.FIELDSETS}>fieldset</BpkRouterLink> component which composes labels, fields and
        validation messages accordingly.
      </Paragraph>,
    ],
    examples: [
      <BpkLabel>This is a label</BpkLabel>,
      <BpkLabel required>This is a required label</BpkLabel>,
      <BpkLabel disabled>This is a disabled label</BpkLabel>,
    ],
    readme: labelReadme,
  },
  {
    id: 'validation',
    title: 'Validation',
    blurb: [
      <Paragraph>
        Validation messages should be used to provide the user with specific feedback about an error with a particular
        form input field. They can be attached to <BpkLink href="#inputs">inputs</BpkLink>
        , <BpkLink href="#selects">selects</BpkLink> and <BpkLink href="#checkboxes">checkboxes</BpkLink>. They should
        either be displayed on form submit or on field blur. Have a look at
        the <BpkRouterLink to={ROUTES.FIELDSETS}>fieldset</BpkRouterLink> component which composes labels, fields and
        validation messages accordingly.
      </Paragraph>,
    ],
    examples: [
      <BpkFormValidation id="form_validation" expanded>Please enter a name</BpkFormValidation>,
      <br />,
      <BpkFormValidation id="form_validation" expanded isCheckbox>This is required</BpkFormValidation>,
    ],
    readme: validationReadme,
  },
];

const FormsPage = () => <DocsPageBuilder
  title="Forms"
  blurb="Here you’ll find a range of common inputs for capturing user data."
  components={components}
  sassdocId="forms"
/>;

export default FormsPage;
