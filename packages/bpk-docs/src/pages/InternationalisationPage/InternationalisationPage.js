import React from 'react';
import Helmet from 'react-helmet';
import BpkHeading from 'bpk-component-heading';
import BpkParagraph from 'bpk-component-paragraph';
import { BpkCode, BpkCodeBlock } from 'bpk-component-code';
import BpkLink from 'bpk-component-link';
import BpkContentContainer from 'bpk-component-content-container';

const saasFaqLink = 'https://skyspace.sharepoint.com/sites/GrowthTribe/'
                  + 'INTLOC/SitePages/Strings-as-a-Service%20(SaaS)%20FAQ.aspx';
const saasBackpackLink = 'http://si1vluk1sma001.int-ci.skyscanner.local/project/backpack';
const skyscannerApiDocsLink = 'http://readthedocs.prod.aws.skyscnr.com/docs/web-platform-web-platform-docs/en/latest/'
                            + 'scaffolding-javascript-api/pages/Skyscanner.Api.html#skyscanner-api-localisation';
const cultureServiceLink = 'http://cs.uk1.prod.skyscanner.local/testharness/cldr.html';
const cldrLink = 'http://cldr.unicode.org/';

const saasCodeExample = `import React, { Component } from 'react';
import BpkCalendar from 'bpk-component-calendar';

const url = 'http://si1vluk1sma001.int-ci.skyscanner.local/'
          + 'strings/v1.0/backpack/en-gb';

export default class MyComponent extends Component {
  constructor() {
    super();

    this.state = {
      translations: null,
    };
    this.onLoaded = this.onLoaded.bind(this);
  }

  componentWillMount() {
    fetch(url).then(this.onLoaded);
  }

  onLoaded(res) {
    return response.json().then(translations => {
      this.setState({ translations });
    });
  }

  render() {
    if (this.state.translations) {
      const { bpk_calendar_changeMonthLabel } = this.state.translations;
      return (
        <BpkCalendar
          changeMonthLabel={bpk_calendar_changeMonthLabel}
          // ...
        />
      );
    }

    return (
      <div>Loading...</div>
    );
  }
}
`;

/* eslint-disable react/no-danger */
const InternationalisationPage = () => (
  <section>
    <Helmet title="Internationalisation" />
    <BpkContentContainer>
      <BpkHeading level="h1">Internationalisation</BpkHeading>
      <BpkParagraph>
        Products built with Backpack should provide a great experience and should feel familiar, no matter the
        user&#39;s language or country. Backpack works well with existing Skyscanner localisation tools
        (culture service, Strings-as-a-Service), but is completely solution-agnostic &mdash; it is your task to glue
        locale-specific tokens to your UI. This page shows how to integrate culture data and translations.
      </BpkParagraph>
      <BpkHeading level="h2">Translations</BpkHeading>
      <BpkParagraph>
        Most Backpack components are completely agnostic of any strings and labels, and it is up to the consumer
        to provide the correct values for their context and purpose.
      </BpkParagraph>
      <BpkParagraph>
        There are some cases, however, in which we want to recommend a certain string, for example to provide
        consistency across products or to ensure accessibility (e.g. provide unambiguous labels for screenreaders).
      </BpkParagraph>
      <BpkParagraph>
        In those cases, we have provided translations via Strings-as-a-Service. You can get the strings of
        the <BpkLink href={saasBackpackLink}>backpack project</BpkLink> alongside your product&#39;s string as
        described in the <BpkLink href={saasFaqLink}>SaaS FAQ</BpkLink>.
      </BpkParagraph>
      <BpkParagraph>
        Strings can usually be directly mapped to individual props and follow the naming
        convention <BpkCode>bpk_[component]_[prop]</BpkCode>. If you are using the Calendar component, for example,
        the string for the <BpkCode>changeMonthLabel</BpkCode> prop will have the
        key <BpkCode>bpk_calendar_changeMonthLabel</BpkCode>. However, it is still up to you to pass the correct
        translation in, and you may choose not to use the one provided by Backpack. Recommended strings are listed
        in the README of the respective component.
      </BpkParagraph>
      <BpkCodeBlock>{saasCodeExample}</BpkCodeBlock>
      <BpkHeading level="h2">Locales and formats</BpkHeading>
      <BpkParagraph>
        Some components, especially the ones around date selection and display, are highly dependent on culture
        data. Whereever this is the case, Backpack components try to adhere as close as possible to
        the <BpkLink href={cldrLink}>CLDR standard</BpkLink>. For Skyscanner products, we recommend
        using the <BpkLink href={cultureServiceLink}>Culture Service</BpkLink>.
      </BpkParagraph>
      <BpkParagraph>
        Whenever data need to be formatted in a culture-specific format, for example numbers, currencies, dates and
        times, Backpack components will accept a formatting function. This way, the consumer is not tied to a certain
        solution (such as Moment.js). For Skyscanner products, we recommend using formatting functions from
        the <BpkLink href={skyscannerApiDocsLink}>Scaffolding JS API</BpkLink>.
      </BpkParagraph>
    </BpkContentContainer>
  </section>
);
/* eslint-enable */

export default InternationalisationPage;
