/*
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2016-2019 Skyscanner Ltd
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

import Helmet from 'react-helmet';
import isString from 'lodash/isString';
import PropTypes from 'prop-types';
import React, { Children } from 'react';
import BpkContentContainer from 'bpk-component-content-container';
import { cssModules } from 'bpk-react-utils';

import AlternatingPageContent from '../AlternatingPageContent';
import Heading from '../Heading';
import PageHead from '../PageHead';
import Paragraph from '../Paragraph';
import PresentationBlock from '../PresentationBlock';
import { createFromType } from '../ApidocLink';
import UsageTable from '../UsageTable';

import TokenSwitcher, { connect } from './TokenSwitcher';
import TokenTable from './TokenTable';
import ComponentVideos from './ComponentVideos';
import ComponentScreenshots from './ComponentScreenshots';
import STYLES from './DocsPageBuilder.scss';
import PlatformSwitchingContent from './PlatformSwitchingContent';
import BpkMarkdownRenderer from './BpkMarkdownRenderer';

const getClassName = cssModules(STYLES);

const toNodes = children => {
  if (!children) {
    return null;
  }

  return isString(children) ? [<Paragraph>{children}</Paragraph>] : children;
};

const getMarkdownString = readmeString =>
  readmeString
    .replace(/^#.*$/m, '') // remove first h1
    .replace(/^>.*$/m, '') // remove first blockquote
    .replace(/^#### /gm, '##### ') // replace h4 with h5
    .replace(/^### /gm, '#### ') // replace h3 with h4
    .replace(/^## /gm, '### ') // replace h2 with h3
    .replace(/^# /gm, '## '); // replace h1 with h2

const toSassdocLink = createFromType('sass');
const toIosDocLink = createFromType('ios');
const toAndroidDocLink = createFromType('android');

const ComponentExample = (component, registerPlatformSwitchingContent) => {
  // FIXME: we're getting a missing "key" warning from this component
  const heading = (
    <Heading id={component.id} level="h2">
      {component.title}
    </Heading>
  );

  const examples = (component.examples || []).length ? (
    <PresentationBlock
      darkBackground={component.dark}
      whiteBackground={!component.dark}
    >
      {Children.toArray(component.examples)}
    </PresentationBlock>
  ) : null;

  const screenshots = (component.screenshots || []).length ? (
    <ComponentScreenshots screenshots={component.screenshots} />
  ) : null;

  const videos = (component.videos || []).length ? (
    <ComponentVideos videos={component.videos} />
  ) : null;
  const blurb = component.blurb ? toNodes(component.blurb) : null;

  const readme = component.readme
    ? Children.toArray([
        <Heading id={`${component.id}-readme`} level="h2">
          {component.title} readme
        </Heading>,
        <BpkContentContainer id="md-container" bareHtml alternate>
          <BpkMarkdownRenderer source={getMarkdownString(component.readme)} />
        </BpkContentContainer>,
      ])
    : null;

  const tokenMap = component.tokenMap
    ? registerPlatformSwitchingContent(
        <TokenTable tokens={component.tokenMap} />,
      )
    : null;

  const platformSwitchingContent = component.platformSwitchingContent
    ? registerPlatformSwitchingContent(
        <PlatformSwitchingContent
          content={component.platformSwitchingContent}
        />,
      )
    : null;

  const sassdocLink = component.sassdocId
    ? toSassdocLink({
        sassdocId: component.sassdocId,
        category: component.title,
      })
    : null;

  const androidDocLink = component.androidDocId
    ? toAndroidDocLink({
        package: component.androidDocId,
        title: component.title,
      })
    : null;

  const iosDocLink = component.iosDocId
    ? toIosDocLink({
        component: component.iosDocId,
        title: component.title,
      })
    : null;

  return (
    <div>
      {heading}
      {blurb}
      {tokenMap}
      {platformSwitchingContent}
      {screenshots}
      {videos}
      {examples}
      {readme}
      {sassdocLink}
      {androidDocLink}
      {iosDocLink}
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
        <BpkContentContainer id="md-container" bareHtml alternate>
          <BpkMarkdownRenderer source={getMarkdownString(section.readme)} />
        </BpkContentContainer>,
      ])
    : null,
];

const DocsPageBuilder = props => {
  let readmeLandsOnEven = true;
  if (props.tokenMap) {
    readmeLandsOnEven = !readmeLandsOnEven;
  }
  if (props.usageTable) {
    readmeLandsOnEven = !readmeLandsOnEven;
  }
  if (props.components.length % 2 === 1) {
    readmeLandsOnEven = !readmeLandsOnEven;
  }

  const tokenSwitcher = (
    <TokenSwitcher
      className={getClassName('bpkdocs-content-page__token-switcher')}
    />
  );
  let hasTokens = !!props.tokenMap;
  const components = Children.toArray(
    props.components.map(component =>
      ComponentExample(component, platformSwitching => {
        hasTokens = true;
        return connect(
          tokenSwitcher,
          platformSwitching,
        );
      }),
    ),
  );

  const tokenTable = props.tokenMap
    ? connect(
        tokenSwitcher,
        <TokenTable tokens={props.tokenMap} />,
      )
    : null;

  const sections = [
    tokenTable,
    props.usageTable
      ? Children.toArray([
          <Heading id="usage" level="h2">
            Do&apos;s & Dont&apos;s
          </Heading>,
          <UsageTable data={props.usageTable} />,
        ])
      : null,
    ...components,
    props.readme
      ? Children.toArray([
          <Heading id="readme" level="h2">
            Readme
          </Heading>,
          <BpkContentContainer id="md-container" bareHtml alternate>
            <BpkMarkdownRenderer
              oddAlternatingSection={readmeLandsOnEven}
              source={getMarkdownString(props.readme)}
            />
          </BpkContentContainer>,
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
    props.androidDocId
      ? toAndroidDocLink({
          package: props.androidDocId,
          title: props.title,
        })
      : null,
    props.iosDocId
      ? toIosDocLink({
          component: props.iosDocId,
          title: props.title,
        })
      : null,
  ];

  const menu = [...props.components, ...(props.customSections || [])];
  const showPageHead = props.tokenMap || props.blurb || menu.length > 0;

  return (
    <BpkContentContainer
      className={getClassName(
        `bpkdocs-content-page--${
          sections.length % 2 === (props.wrapped ? 1 : 0) ? 'even' : 'odd'
        }-sections`,
      )}
    >
      <Helmet title={props.title} />
      {showPageHead && (
        <div
          className={getClassName('bpkdocs-content-page__page-head-wrapper')}
        >
          <PageHead
            className={getClassName(
              'bpkdocs-content-page__page-head',
              hasTokens && 'bpkdocs-content-page__page-head--with-swicher',
            )}
            title={props.wrapped ? null : props.title}
            blurb={props.blurb}
            menu={menu.map(({ id, title }) => ({
              href: `#${id}`,
              title,
            }))}
            wrapped={props.wrapped}
          />
          {hasTokens && tokenSwitcher}
        </div>
      )}
      <AlternatingPageContent sections={sections} invert={props.wrapped} />
    </BpkContentContainer>
  );
};

const contentShape = PropTypes.oneOfType([PropTypes.string, PropTypes.node]);

DocsPageBuilder.propTypes = {
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
      videos: PropTypes.arrayOf(
        PropTypes.shape({
          title: PropTypes.string.isRequired,
          src: PropTypes.string.isRequired,
          width: PropTypes.number.isRequired,
          subText: PropTypes.string.isRequired,
        }),
      ),
      examples: PropTypes.arrayOf(PropTypes.node),
      readme: PropTypes.string,
      tokenMap: PropTypes.shape({
        web: PropTypes.object,
        ios: PropTypes.object,
        android: PropTypes.object,
      }),
      platformSwitchingContent: PropTypes.shape({
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
  iosDocId: PropTypes.string,
  sassdocId: PropTypes.string,
  androidDocId: PropTypes.string,
  usageTable: PropTypes.shape({
    data: PropTypes.shape({
      dos: PropTypes.arrayOf(PropTypes.string.isRequired),
      donts: PropTypes.arrayOf(PropTypes.string.isRequired),
    }),
  }),
  wrapped: PropTypes.bool,
};

DocsPageBuilder.defaultProps = {
  blurb: null,
  components: [],
  readme: null,
  tokenMap: null,
  customSections: null,
  iosDocId: null,
  sassdocId: null,
  androidDocId: null,
  usageTable: null,
  wrapped: false,
};

export default DocsPageBuilder;
