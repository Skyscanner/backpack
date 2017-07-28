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

import marked from 'marked';
import keys from 'lodash/keys';
import Helmet from 'react-helmet';
import isString from 'lodash/isString';
import BpkLink from 'bpk-component-link';
import PropTypes from 'prop-types';
import React, { Children } from 'react';
import { BpkList, BpkListItem } from 'bpk-component-list';
import BpkContentContainer from 'bpk-component-content-container';
import { BpkTable, BpkTableHead, BpkTableBody, BpkTableRow, BpkTableHeadCell, BpkTableCell } from 'bpk-component-table';

import SassdocLink from './../../components/SassdocLink';
import PresentationBlock from './../../components/PresentationBlock';
import Heading from './../../components/Heading';
import Paragraph from './../../components/Paragraph';
import { formatTokenName, formatTokenValue } from './../../helpers/tokens-helper';

const flatten = Children.toArray;
const renderer = new marked.Renderer();

const ExampleNavListItem = component => (
  <BpkListItem>
    <BpkLink href={`#${component.id}`}>{component.title}</BpkLink>
  </BpkListItem>
);

const toNodes = (children) => {
  if (!children) {
    return null;
  }

  return isString(children) ? [<Paragraph>{children}</Paragraph>] : children;
};


const markdownToHTML = readmeString => marked(readmeString
  .replace(/^#.*$/m, '') // remove first h1
  .replace(/^>.*$/m, '') // remove first blockquote
  .replace(/^#### /gm, '##### ') // replace h4 with h5
  .replace(/^### /gm, '#### ') // replace h3 with h4
  .replace(/^## /gm, '### ') // replace h2 with h3
  .replace(/^# /gm, '## ') // replace h1 with h2
, { renderer });

const toTokenTable = tokens => (
  <BpkTable>
    <BpkTableHead>
      <BpkTableRow>
        <BpkTableHeadCell>Bond</BpkTableHeadCell>
        <BpkTableHeadCell>Value</BpkTableHeadCell>
      </BpkTableRow>
    </BpkTableHead>
    <BpkTableBody>
      {keys(tokens).map(token => (
        <BpkTableRow key={formatTokenName(token)}>
          <BpkTableCell>{formatTokenName(token)}</BpkTableCell>
          <BpkTableCell>{formatTokenValue(tokens[token])}</BpkTableCell>
        </BpkTableRow>
      ))}
    </BpkTableBody>
  </BpkTable>
);

const toSassdocLink = props => <SassdocLink sassdocId={props.sassdocId} category={props.category} />;
toSassdocLink.propTypes = {
  sassdocId: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
};

const ComponentExample = (component) => {
  const heading = <Heading id={component.id} level="h2">{component.title}</Heading>;

  const examples = component.examples.length
    ? <PresentationBlock>{flatten(component.examples)}</PresentationBlock>
    : null;

  const blurb = component.blurb ? toNodes(component.blurb) : null;

  const readme = component.readme ? flatten([
    <Heading id={`${component.id}-readme`} level="h2">{component.title} readme</Heading>,
    <BpkContentContainer dangerouslySetInnerHTML={{ __html: markdownToHTML(component.readme) }} bareHtml />,
  ]) : null;

  const tokenMap = component.tokenMap ? toTokenTable(component.tokenMap) : null;

  const sassdocLink = component.sassdocId ? toSassdocLink({
    sassdocId: component.sassdocId,
    category: component.title,
  }) : null;

  return [heading, blurb, tokenMap, examples, readme, sassdocLink];
};

const CustomSection = section => [
  <Heading id={section.id} level="h2">{section.title}</Heading>,
  flatten(section.content.map(toNodes)),
  section.examples
    ? <PresentationBlock>{flatten(section.examples)}</PresentationBlock>
    : null,
  section.readme
    ? flatten([
      <Heading id="readme" level="h2">Readme</Heading>,
      <BpkContentContainer dangerouslySetInnerHTML={{ __html: markdownToHTML(section.readme) }} bareHtml />,
    ])
    : null,
];

const DocsPageBuilder = props => (
  <BpkContentContainer>
    <Helmet title={props.title} />
    <Heading level="h1">{props.title}</Heading>
    {flatten(toNodes(props.blurb))}
    {props.showMenu && (
      <BpkList>{flatten([...props.components, ...props.customSections].map(ExampleNavListItem))}</BpkList>
    )}
    {props.tokenMap ? toTokenTable(props.tokenMap) : null}
    {flatten(props.components.map(ComponentExample))}
    {props.readme ? flatten([
      <Heading id="readme" level="h2">Readme</Heading>,
      <BpkContentContainer dangerouslySetInnerHTML={{ __html: markdownToHTML(props.readme) }} bareHtml />,
    ]) : null
    }
    {flatten(props.customSections.map(CustomSection))}
    {props.sassdocId ? toSassdocLink({
      sassdocId: props.sassdocId,
      category: props.title,
    }) : null}
  </BpkContentContainer>
);

const childrenPropType = PropTypes.oneOfType([
  PropTypes.arrayOf(PropTypes.node),
  PropTypes.node,
]);

const contentShape = PropTypes.oneOfType([
  PropTypes.string,
  childrenPropType,
]);

DocsPageBuilder.propTypes = {
  title: PropTypes.string.isRequired,
  blurb: contentShape,
  components: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      blurb: contentShape,
      examples: PropTypes.arrayOf(childrenPropType),
      readme: PropTypes.string,
      tokenMap: PropTypes.object,
      sassdocId: PropTypes.string,
    }),
  ),
  showMenu: PropTypes.bool,
  readme: PropTypes.string,
  tokenMap: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  customSections: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      content: PropTypes.arrayOf(contentShape),
    }),
  ),
  sassdocId: PropTypes.string,
};

DocsPageBuilder.defaultProps = {
  blurb: null,
  components: [],
  showMenu: true,
  readme: null,
  tokenMap: null,
  customSections: [],
  sassdocId: null,
};

export default DocsPageBuilder;
