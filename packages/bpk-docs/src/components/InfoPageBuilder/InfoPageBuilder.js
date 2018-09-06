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

import React, { type Node } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import marked from 'marked';
import BpkAnimateHeight from 'bpk-animate-height';
import BpkButton from 'bpk-component-button';
import BpkContentContainer from 'bpk-component-content-container';
import { cssModules } from 'bpk-react-utils';
import ChevronDownIcon from 'bpk-component-icon/lg/chevron-down';
import { withButtonAlignment } from 'bpk-component-icon';

import HeroSection from '../HeroSection';
import Heading from '../Heading';
import STYLES from './InfoPageBuilder.css';
import AlternatingPageContent from '../AlternatingPageContent';

const getClassName = cssModules(STYLES);
const renderer = new marked.Renderer();
const AlignedChevronDownIcon = withButtonAlignment(ChevronDownIcon);

const markdownToHTML = (input: string): string =>
  marked(
    input
      .replace(/^#### /gm, '##### ') // replace h4 with h5
      .replace(/^### /gm, '#### ') // replace h3 with h4
      .replace(/^## /gm, '### ') // replace h2 with h3
      .replace(/^# /gm, '## '), // replace h1 with h2
    { renderer },
  );

type SectionType = {
  id: string,
  title: string,
  markdown: ?string,
  content: ?Node,
};

type SectionProps = {
  ...SectionType,
  expanded: boolean,
};

type InfoPageBuilderProps = {
  hero: any,
  sections: Array<SectionType>,
  title: string,
};

class Section extends React.Component<SectionProps, { expanded: boolean }> {
  static propTypes = {
    expanded: PropTypes.bool,
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    markdown: PropTypes.string,
    content: PropTypes.node,
  };

  static defaultProps = {
    expanded: false,
    markdown: null,
    content: null,
  };

  constructor(props) {
    super(props);
    this.state = { expanded: this.props.expanded };
  }

  toggleExpand = () => {
    this.setState(prevState => ({ expanded: !prevState.expanded }));
  };

  render() {
    const { id, content, markdown, title } = this.props;
    const { expanded } = this.state;
    return (
      <section>
        <button
          type="button"
          aria-expanded={expanded}
          aria-controls={id}
          onClick={this.toggleExpand}
          className={getClassName('bpk-docs-info-page__expansion-toggle')}
        >
          <Heading
            id={id}
            level="h2"
            className={getClassName('bpk-docs-info-page__heading')}
          >
            {title}
          </Heading>
          <BpkButton secondary iconOnly large>
            <AlignedChevronDownIcon
              className={getClassName(
                'bpk-docs-info-page__icon',
                expanded && 'bpk-docs-info-page__icon--expanded',
              )}
            />
          </BpkButton>
        </button>
        {markdown && (
          <BpkAnimateHeight height={expanded ? 'auto' : 0} duration={200}>
            <BpkContentContainer
              dangerouslySetInnerHTML={{ __html: markdownToHTML(markdown) }}
              bareHtml
              className={getClassName('bpk-docs-info-page__section')}
            />
          </BpkAnimateHeight>
        )}
        {content && (
          <BpkAnimateHeight height={expanded ? 'auto' : 0} duration={200}>
            {content}
          </BpkAnimateHeight>
        )}
      </section>
    );
  }
}

const InfoPageBuilder = (props: InfoPageBuilderProps) => {
  const { hero, sections, title } = props;
  const generatedSections = sections.map(section => <Section {...section} />);
  return (
    <BpkContentContainer>
      <Helmet title={title} />
      {hero && <HeroSection {...hero} />}
      <AlternatingPageContent sections={generatedSections} invert={false} />
    </BpkContentContainer>
  );
};

InfoPageBuilder.propTypes = {
  hero: PropTypes.shape({
    imageUrl: PropTypes.string.isRequired,
    heading: PropTypes.string.isRequired,
    subHeading: PropTypes.node.isRequired,
  }).isRequired,
  sections: PropTypes.arrayOf(
    PropTypes.shape({
      expanded: PropTypes.bool,
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      markdown: PropTypes.string,
      content: PropTypes.node,
    }),
  ).isRequired,
  title: PropTypes.string.isRequired,
};

export default InfoPageBuilder;
