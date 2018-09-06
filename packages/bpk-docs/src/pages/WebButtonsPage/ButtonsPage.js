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

/* @flow */

import React, { Component } from 'react';
import BpkButton from 'bpk-component-button';
import { colors, buttons } from 'bpk-tokens/tokens/base.es6';
import { alignToButton, alignToLargeButton } from 'bpk-component-icon';
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
import buttonReadme from 'bpk-component-button/README.md';
import loadingButtonReadme from 'bpk-component-loading-button/README.md';
import { cssModules } from 'bpk-react-utils';
import STYLES from './buttons-page.css';

import * as ROUTES from '../../constants/routes';
import DocsPageBuilder from '../../components/DocsPageBuilder';
import Paragraph from '../../components/Paragraph';
import Code from '../../components/Code';

const AlignedBpkSmallArrowIcon = alignToButton(TestBpkSmallArrowIcon);
const AlignedBpkLargeArrowIcon = alignToLargeButton(TestBpkLargeArrowIcon);
const AlignedBpkSmallTrashIcon = alignToButton(TestBpkSmallTrashIcon);
const AlignedBpkLargeTrashIcon = alignToLargeButton(TestBpkLargeTrashIcon);
const AlignedBpkSmallHelpIcon = alignToButton(TestBpkSmallHelpIcon);
const AlignedBpkLargeHelpIcon = alignToLargeButton(TestBpkLargeHelpIcon);
const AlignedBpkSmallSearchIcon = alignToButton(TestBpkSmallSearchIcon);
const AlignedBpkLargeSearchIcon = alignToLargeButton(TestBpkLargeSearchIcon);

const getClassName = cssModules(STYLES);
const buttonContainerClassName = getClassName(
  'bpkdocs-buttons-page__button-container',
);
const buttonClassName = getClassName('bpkdocs-buttons-page__button');

class LoadingButtonContainer extends Component<{}, { loading: boolean }> {
  constructor() {
    super();

    this.state = {
      loading: false,
    };
  }

  onClick = () => {
    this.setState({
      loading: true,
    });

    setTimeout(() => this.setState({ loading: false }), 2000);
  };

  render() {
    return (
      <BpkLoadingButton
        {...this.props}
        loading={this.state.loading}
        onClick={this.onClick}
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
        The Backpack primary button is available in two sizes and comes with
        styles for hover, active and disabled states.
      </Paragraph>,
    ],
    examples: [
      <div className={buttonContainerClassName}>
        <BpkButton className={buttonClassName}>Primary</BpkButton>
        <BpkButton className={buttonClassName} disabled>
          Disabled
        </BpkButton>
      </div>,
      <div className={buttonContainerClassName}>
        <BpkButton className={buttonClassName} large>
          Primary
        </BpkButton>
        <BpkButton className={buttonClassName} large disabled>
          Disabled
        </BpkButton>
      </div>,
    ],
  },
  {
    id: 'secondary',
    title: 'Secondary',
    blurb: [
      <Paragraph>
        Similar to the primary button, the secondary version is available in two
        sizes and comes with styles for hover, active and disabled states.
      </Paragraph>,
    ],
    examples: [
      <div className={buttonContainerClassName}>
        <BpkButton className={buttonClassName} secondary>
          Secondary
        </BpkButton>
        <BpkButton className={buttonClassName} secondary disabled>
          Disabled
        </BpkButton>
      </div>,
      <div className={buttonContainerClassName}>
        <BpkButton className={buttonClassName} large secondary>
          Secondary
        </BpkButton>
        <BpkButton className={buttonClassName} large secondary disabled>
          Disabled
        </BpkButton>
      </div>,
    ],
  },
  {
    id: 'featured',
    title: 'Featured',
    blurb: [
      <Paragraph>This button is reserved for featured buttons.</Paragraph>,
    ],
    examples: [
      <div className={buttonContainerClassName}>
        <BpkButton className={buttonClassName} featured>
          Featured
        </BpkButton>
        <BpkButton className={buttonClassName} featured disabled>
          Disabled
        </BpkButton>
      </div>,
      <div className={buttonContainerClassName}>
        <BpkButton className={buttonClassName} large featured>
          Featured
        </BpkButton>
        <BpkButton className={buttonClassName} large featured disabled>
          Disabled
        </BpkButton>
      </div>,
    ],
  },
  {
    id: 'destructive',
    title: 'Destructive',
    blurb: 'This button can be used to highlight destructive actions.',
    examples: [
      <div className={buttonContainerClassName}>
        <BpkButton className={buttonClassName} destructive>
          Destructive
        </BpkButton>
        <BpkButton className={buttonClassName} destructive disabled>
          Disabled
        </BpkButton>
      </div>,
      <div className={buttonContainerClassName}>
        <BpkButton className={buttonClassName} large destructive>
          Destructive
        </BpkButton>
        <BpkButton className={buttonClassName} large destructive disabled>
          Disabled
        </BpkButton>
      </div>,
    ],
  },
  {
    id: 'with-icons',
    title: 'With icons',
    blurb: [
      <Paragraph>
        All buttons support the nesting of icons, which is useful for improving
        affordance.
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
        Buttons may contain only an icon (without visible text), which is useful
        for small screen sizes.
      </Paragraph>,
    ],
    examples: [
      <div className={buttonContainerClassName}>
        <BpkButton className={buttonClassName} iconOnly>
          <AlignedBpkSmallArrowIcon fill={colors.colorWhite} />
          <span className="visually-hidden">Search</span>
        </BpkButton>
        <BpkButton className={buttonClassName} iconOnly secondary>
          <AlignedBpkSmallHelpIcon fill={buttons.buttonSecondaryColor} />
          <span className="visually-hidden">Help</span>
        </BpkButton>
        <BpkButton className={buttonClassName} iconOnly destructive>
          <AlignedBpkSmallTrashIcon fill={buttons.buttonDestructiveColor} />
          <span className="visually-hidden">Delete</span>
        </BpkButton>
      </div>,
      <div className={buttonContainerClassName}>
        <BpkButton large className={buttonClassName} iconOnly>
          <AlignedBpkLargeArrowIcon fill={colors.colorWhite} />
          <span className="visually-hidden">Search</span>
        </BpkButton>
        <BpkButton large className={buttonClassName} iconOnly secondary>
          <AlignedBpkLargeHelpIcon fill={buttons.buttonSecondaryColor} />
          <span className="visually-hidden">Help</span>
        </BpkButton>
        <BpkButton large className={buttonClassName} iconOnly destructive>
          <AlignedBpkLargeTrashIcon fill={buttons.buttonDestructiveColor} />
          <span className="visually-hidden">Delete</span>
        </BpkButton>
      </div>,
    ],
  },
  {
    id: 'link-buttons',
    title: 'Link buttons',
    blurb: [
      <Paragraph>
        Link buttons follow the same style as links and are used as a tertiary
        means of triggering actions. Like all other buttons, these are available
        in two sizes and have hover, active and disabled states.
      </Paragraph>,
    ],
    examples: [
      <BpkButton link>Link</BpkButton>,
      ' ',
      <BpkButton link disabled>
        Disabled
      </BpkButton>,
      <br />,
      <br />,
      <BpkButton link large>
        Link
      </BpkButton>,
      ' ',
      <BpkButton link large disabled>
        Disabled
      </BpkButton>,
    ],
  },
  {
    id: 'icon-alignment',
    title: 'Icon alignment within buttons',
    blurb: [
      <Paragraph>
        The <BpkLink href={ROUTES.ALIGNMENT}>Alignment</BpkLink> page gives
        examples of icon alignment using HOCs provided in the{' '}
        <Code>bpk-component-icon</Code> package.
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
        Loading buttons support all the same props as the{' '}
        <BpkRouterLink to={ROUTES.BUTTON}>button</BpkRouterLink> component. They
        are distinct in that they encapsulate the composition of{' '}
        <BpkRouterLink to={ROUTES.ICON}>icons</BpkRouterLink> as well as{' '}
        <BpkRouterLink to={ROUTES.SPINNER}>spinners</BpkRouterLink> to form a
        nice, compelling call to action.
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

const ButtonsPage = ({ ...rest }: { [string]: any }) => (
  <DocsPageBuilder
    title="Buttons"
    components={components}
    sassdocId="buttons"
    readme={buttonReadme}
    customSections={customSections}
    {...rest}
  />
);

export default ButtonsPage;
