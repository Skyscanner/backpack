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

import marked from 'marked';
import isString from 'lodash/isString';
import PropTypes from 'prop-types';
import React, { Children } from 'react';
import BpkContentContainer from 'bpk-component-content-container';
import { cssModules } from 'bpk-react-utils';

import TokenSwitcher from './TokenSwitcher';
import PageHead from '../../components/neo/PageHead';
import AlternatingPageContent from '../../components/neo/AlternatingPageContent';
import Heading from './../../components/neo/Heading';
import Paragraph from './../../components/neo/Paragraph';
import UsageTable from './../../components/UsageTable';
import SassdocLink from './../../components/SassdocLink';
import ComponentScreenshots from './ComponentScreenshots';
import PresentationBlock from './../../components/PresentationBlock';

import STYLES from './NeoDocsPageBuilder.scss';

const getClassName = cssModules(STYLES);

const renderer = new marked.Renderer();

const toNodes = children => {
  if (!children) {
    return null;
  }

  return isString(children) ? [<Paragraph>{children}</Paragraph>] : children;
};

const markdownToHTML = (readmeString, headerPrefix = '') =>
  marked(
    readmeString
      .replace(/^#.*$/m, '') // remove first h1
      .replace(/^>.*$/m, '') // remove first blockquote
      .replace(/^#### /gm, '##### ') // replace h4 with h5
      .replace(/^### /gm, '#### ') // replace h3 with h4
      .replace(/^## /gm, '### ') // replace h2 with h3
      .replace(/^# /gm, '## '), // replace h1 with h2
    { renderer, headerPrefix },
  );

const toSassdocLink = props => (
  <SassdocLink
    sassdocId={props.sassdocId}
    category={props.category}
    transparentBackground
  />
);

toSassdocLink.propTypes = {
  sassdocId: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
};

const ComponentExample = component => {
  const heading = (
    <Heading id={component.id} level="h2">
      {component.title}
    </Heading>
  );

  const examples = (component.examples || []).length ? (
    <PresentationBlock whiteBackground>
      {Children.toArray(component.examples)}
    </PresentationBlock>
  ) : null;

  const screenshots = (component.screenshots || []).length ? (
    <ComponentScreenshots screenshots={component.screenshots} />
  ) : null;

  const blurb = component.blurb ? toNodes(component.blurb) : null;

  const readme = component.readme
    ? Children.toArray([
        <Heading id={`${component.id}-readme`} level="h2">
          {component.title} readme
        </Heading>,
        <BpkContentContainer
          dangerouslySetInnerHTML={{
            __html: markdownToHTML(component.readme, `${component.id}-`),
          }}
          bareHtml
          alternate
        />,
      ])
    : null;

  const tokenMap = component.tokenMap ? (
    <TokenSwitcher tokens={component.tokenMap} />
  ) : null;

  const sassdocLink = component.sassdocId
    ? toSassdocLink({
        sassdocId: component.sassdocId,
        category: component.title,
      })
    : null;

  return (
    <div>
      {heading}
      {blurb}
      {tokenMap}
      {screenshots}
      {examples}
      {readme}
      {sassdocLink}
    </div>
  );
};

const CustomSection = section => [
  <Heading id={section.id} level="h2">
    {section.title}
  </Heading>,
  Children.toArray(section.content.map(toNodes)),
  section.examples ? (
    <PresentationBlock whiteBackground>
      {Children.toArray(section.examples)}
    </PresentationBlock>
  ) : null,
  section.readme
    ? Children.toArray([
        <Heading id="readme" level="h2">
          Readme
        </Heading>,
        <BpkContentContainer
          dangerouslySetInnerHTML={{
            __html: markdownToHTML(section.readme, `${section.id}-`),
          }}
          bareHtml
          alternate
        />,
      ])
    : null,
];

const NeoDocsPageBuilder = props => {
  const sections = [
    props.tokenMap ? <TokenSwitcher tokens={props.tokenMap} /> : null,
    props.usageTable
      ? Children.toArray([
          <Heading id="usage" level="h2">
            Do&apos;s & Dont&apos;s
          </Heading>,
          <UsageTable data={props.usageTable} />,
        ])
      : null,
    ...Children.toArray(props.components.map(ComponentExample)),
    props.readme
      ? Children.toArray([
          <Heading id="readme" level="h2">
            Readme
          </Heading>,
          <BpkContentContainer
            dangerouslySetInnerHTML={{
              __html: markdownToHTML(props.readme),
            }}
            bareHtml
            alternate
          />,
        ])
      : null,
    props.customSections &&
      Children.toArray(props.customSections.map(CustomSection)),
    props.sassdocId
      ? toSassdocLink({
          sassdocId: props.sassdocId,
          category: props.title,
        })
      : null,
  ];

  return (
    <BpkContentContainer
      className={getClassName(
        `bpkdocs-content-page--${
          sections.length % 2 === 0 ? 'even' : 'odd'
        }-sections`,
      )}
    >
      <PageHead
        blurb={props.blurb}
        menu={[...props.components, ...(props.customSections || [])].map(
          ({ id, title }) => ({
            href: `#${id}`,
            title,
          }),
        )}
        wrapped={props.wrapped}
      />
      <AlternatingPageContent sections={sections} />
    </BpkContentContainer>
  );
};

const childrenPropType = PropTypes.oneOfType([
  PropTypes.arrayOf(PropTypes.node),
  PropTypes.node,
]);

const contentShape = PropTypes.oneOfType([PropTypes.string, childrenPropType]);

NeoDocsPageBuilder.propTypes = {
  title: PropTypes.string.isRequired,
  blurb: contentShape,
  components: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      blurb: contentShape,
      screenshots: PropTypes.arrayOf(
        PropTypes.shape({
          title: PropTypes.string.isRequired,
          src: PropTypes.string.isRequired,
          width: PropTypes.number.isRequired,
          height: PropTypes.number.isRequired,
          altText: PropTypes.string.isRequired,
          subText: PropTypes.string.isRequired,
        }),
      ),
      examples: PropTypes.arrayOf(childrenPropType),
      readme: PropTypes.string,
      tokenMap: PropTypes.shape({
        web: PropTypes.object,
        ios: PropTypes.object,
        android: PropTypes.object,
      }),
      sassdocId: PropTypes.string,
    }),
  ),
  readme: PropTypes.string,
  tokenMap: PropTypes.shape({
    web: PropTypes.object,
    ios: PropTypes.object,
    android: PropTypes.object,
  }),
  customSections: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      content: PropTypes.arrayOf(contentShape),
    }),
  ),
  sassdocId: PropTypes.string,
  usageTable: PropTypes.shape({
    data: PropTypes.shape({
      dos: PropTypes.arrayOf(PropTypes.string.isRequired),
      donts: PropTypes.arrayOf(PropTypes.string.isRequired),
    }),
  }),
  wrapped: PropTypes.bool,
};

NeoDocsPageBuilder.defaultProps = {
  blurb: null,
  components: [],
  screenshots: [],
  readme: null,
  tokenMap: null,
  customSections: null,
  sassdocId: null,
  usageTable: null,
  wrapped: false,
};

export default NeoDocsPageBuilder;
