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

import React, { Component } from 'react';
import BpkButton from 'bpk-component-button';
import { colors, buttons } from 'bpk-tokens/tokens/base.es6';
import { alignToButton, alignToLargeButton } from 'bpk-component-icon';
import { BpkCode } from 'bpk-component-code';
import BpkLink from 'bpk-component-link';
import TestBpkSmallArrowIcon from 'bpk-component-icon/sm/long-arrow-right';
import TestBpkLargeArrowIcon from 'bpk-component-icon/lg/long-arrow-right';
import TestBpkSmallTrashIcon from 'bpk-component-icon/sm/trash';
import TestBpkLargeTrashIcon from 'bpk-component-icon/lg/trash';
import TestBpkSmallHelpIcon from 'bpk-component-icon/sm/help';
import TestBpkLargeHelpIcon from 'bpk-component-icon/lg/help';
import TestBpkSmallSearchIcon from 'bpk-component-icon/sm/search';
import TestBpkLargeSearchIcon from 'bpk-component-icon/lg/search';

import BpkLoadingButton from 'bpk-component-loading-button';
import BpkRouterLink from 'bpk-component-router-link';
import buttonReadme from 'bpk-component-button/readme.md';
import loadingButtonReadme from 'bpk-component-loading-button/readme.md';

import * as ROUTES from './../../constants/routes';
import DocsPageBuilder from './../../components/DocsPageBuilder';
import Paragraph from './../../components/Paragraph';

const AlignedBpkSmallArrowIcon = alignToButton(TestBpkSmallArrowIcon);
const AlignedBpkLargeArrowIcon = alignToLargeButton(TestBpkLargeArrowIcon);
const AlignedBpkSmallTrashIcon = alignToButton(TestBpkSmallTrashIcon);
const AlignedBpkLargeTrashIcon = alignToLargeButton(TestBpkLargeTrashIcon);
const AlignedBpkSmallHelpIcon = alignToButton(TestBpkSmallHelpIcon);
const AlignedBpkLargeHelpIcon = alignToLargeButton(TestBpkLargeHelpIcon);
const AlignedBpkSmallSearchIcon = alignToButton(TestBpkSmallSearchIcon);
const AlignedBpkLargeSearchIcon = alignToLargeButton(TestBpkLargeSearchIcon);

class LoadingButtonContainer extends Component {
  constructor() {
    super();

    this.state = {
      loading: false,
    };

    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    this.setState({
      loading: true,
    });
    setTimeout(
      () => this.setState({ loading: false }),
      2000,
    );
  }

  render() {
    const { ...rest } = this.props;

    delete rest.onClick;
    delete rest.loading;

    return (
      <BpkLoadingButton
        loading={this.state.loading}
        onClick={this.onClick}
        {...this.props}
      >
        Search
      </BpkLoadingButton>
    );
  }
}

const components = [
  {
    id: 'primary',
    title: 'Primary',
    blurb: [
      <Paragraph>
        The Backpack primary button is available in two sizes and comes with styles for hover, active, disabled and
        selected states.
      </Paragraph>,
    ],
    examples: [
      <BpkButton>Primary</BpkButton>,
      ' ',
      <BpkButton selected>Selected</BpkButton>,
      ' ',
      <BpkButton disabled>Disabled</BpkButton>,
      <br />,
      <br />,
      <BpkButton large>Primary</BpkButton>,
      ' ',
      <BpkButton large selected>Selected</BpkButton>,
      ' ',
      <BpkButton large disabled>Disabled</BpkButton>,
    ],
  },
  {
    id: 'secondary',
    title: 'Secondary',
    blurb: [
      <Paragraph>
        Similar to the primary button, the secondary version is available in two sizes and comes with styles for
        hover, active, disabled and selected states.
      </Paragraph>,
    ],
    examples: [
      <BpkButton secondary>Secondary</BpkButton>,
      ' ',
      <BpkButton secondary selected>Selected</BpkButton>,
      ' ',
      <BpkButton secondary disabled>Disabled</BpkButton>,
      <br />,
      <br />,
      <BpkButton large secondary>Secondary</BpkButton>,
      ' ',
      <BpkButton large secondary selected>Selected</BpkButton>,
      ' ',
      <BpkButton large secondary disabled>Disabled</BpkButton>,
    ],
  },
  {
    id: 'featured',
    title: 'Featured',
    blurb: [
      <Paragraph>
        This button is reserved for featured buttons.
      </Paragraph>,
    ],
    examples: [
      <BpkButton featured>Featured</BpkButton>,
      ' ',
      <BpkButton featured selected>Selected</BpkButton>,
      ' ',
      <BpkButton featured disabled>Disabled</BpkButton>,
      <br />,
      <br />,
      <BpkButton large featured>Featured</BpkButton>,
      ' ',
      <BpkButton large featured selected>Selected</BpkButton>,
      ' ',
      <BpkButton large featured disabled>Disabled</BpkButton>,
    ],
  },
  {
    id: 'destructive',
    title: 'Destructive',
    blurb: 'This button can be used to highlight destructive actions.',
    examples: [
      <BpkButton destructive>Destructive</BpkButton>,
      ' ',
      <BpkButton destructive disabled>Disabled</BpkButton>,
      <br />,
      <br />,
      <BpkButton large destructive>Destructive</BpkButton>,
      ' ',
      <BpkButton large destructive disabled>Disabled</BpkButton>,
    ],
  },
  {
    id: 'with-icons',
    title: 'With icons',
    blurb: [
      <Paragraph>
        All buttons support the nesting of icons, which is useful for improving affordance.
      </Paragraph>,
    ],
    examples: [
      <BpkButton>
        <AlignedBpkSmallSearchIcon fill={colors.colorWhite} /> Search
      </BpkButton>,
      <br />,
      <br />,
      <BpkButton large>
        <AlignedBpkLargeSearchIcon fill={colors.colorWhite} /> Search
      </BpkButton>,
    ],
  },
  {
    id: 'icon-only',
    title: 'Icon-only buttons',
    blurb: [
      <Paragraph>
        Buttons may contain only an icon (without visible text), which is useful for small screen sizes.
      </Paragraph>,
    ],
    examples: [
      <BpkButton iconOnly>
        <AlignedBpkSmallArrowIcon fill={colors.colorWhite} />
        <span className="visually-hidden">Search</span>
      </BpkButton>,
      ' ',
      <BpkButton iconOnly secondary>
        <AlignedBpkSmallHelpIcon fill={buttons.buttonSecondaryColor} />
        <span className="visually-hidden">Help</span>
      </BpkButton>,
      ' ',
      <BpkButton iconOnly destructive>
        <AlignedBpkSmallTrashIcon fill={buttons.buttonDestructiveColor} />
        <span className="visually-hidden">Delete</span>
      </BpkButton>,
      <br />,
      <br />,
      <BpkButton large iconOnly>
        <AlignedBpkLargeArrowIcon fill={colors.colorWhite} />
        <span className="visually-hidden">Search</span>
      </BpkButton>,
      ' ',
      <BpkButton large iconOnly secondary>
        <AlignedBpkLargeHelpIcon fill={buttons.buttonSecondaryColor} />
        <span className="visually-hidden">Help</span>
      </BpkButton>,
      ' ',
      <BpkButton large iconOnly destructive>
        <AlignedBpkLargeTrashIcon fill={buttons.buttonDestructiveColor} />
        <span className="visually-hidden">Delete</span>
      </BpkButton>,
    ],
  },
  {
    id: 'link-buttons',
    title: 'Link buttons',
    blurb: [
      <Paragraph>
        Link buttons follow the same style as links and are used as a tertiary means of triggering actions. Like all
        other buttons, these are available in two sizes and have hover, active and disabled states.
      </Paragraph>,
    ],
    examples: [
      <BpkButton link>Link</BpkButton>,
      ' ',
      <BpkButton link disabled>Disabled</BpkButton>,
      <br />,
      <br />,
      <BpkButton link large>Link</BpkButton>,
      ' ',
      <BpkButton link large disabled>Disabled</BpkButton>,
    ],
  },
  {
    id: 'icon-alignment',
    title: 'Icon alignment within buttons',
    blurb: [
      <Paragraph>
        The <BpkLink href={ROUTES.ALIGNMENT}>Alignment</BpkLink> page gives examples of
        icon alignment using HOCs provided in the <BpkCode>bpk-component-icon</BpkCode> package.
      </Paragraph>,
    ],
    examples: [],
  },
];

const customSections = [
  {
    id: 'loading-buttons',
    title: 'Loading buttons',
    content: [
      <Paragraph>
        Loading buttons support all the same props as
        the <BpkRouterLink to={ROUTES.BUTTONS}>button</BpkRouterLink> component. They are distinct in that they
        encapsulate the composition of <BpkRouterLink to={ROUTES.ICONS}>icons</BpkRouterLink> as well
        as <BpkRouterLink to={ROUTES.SPINNERS}>spinners</BpkRouterLink> to form a nice, compelling call to action.
      </Paragraph>,
    ],
    examples: [
      <LoadingButtonContainer />,
      ' ',
      <LoadingButtonContainer large />,
    ],
    readme: loadingButtonReadme,
  },
];

const ButtonsPage = () => <DocsPageBuilder
  title="Buttons"
  blurb={[
    <Paragraph>
      On this page you’ll find examples and information on how to use the button component. If you provide an href, an
      anchor tag is rendered instead.
    </Paragraph>,
  ]}
  components={components}
  sassdocId="buttons"
  readme={buttonReadme}
  customSections={customSections}
/>;

export default ButtonsPage;
