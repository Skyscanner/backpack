import marked from 'marked'
import Helmet from 'react-helmet'
import isString from 'lodash/isString'
import includes from 'lodash/includes'
import React, { Children, PropTypes } from 'react'

import BpkLink from 'bpk-component-link'
import BpkHeading from 'bpk-component-heading'
import BpkParagraph from 'bpk-component-paragraph'
import { BpkList, BpkListItem } from 'bpk-component-list'
import BpkContentContainer from 'bpk-component-content-container'
import PresentationBlock from './../../components/PresentationBlock'

const flatten = Children.toArray
const renderer = new marked.Renderer()

renderer.heading = (text, level) => {
  return includes([ 1, 2 ], level) ? '' : `<h${level}>${text}</h${level}>`
}

const ExampleNavListItem = (component) => (
  <BpkListItem>
    <BpkLink href={`#${component.id}`}>{component.title}</BpkLink>
  </BpkListItem>
)

const ComponentExample = (component) => {
  const heading = <BpkHeading id={component.id} level='h3'>{component.title}</BpkHeading>

  const examples = component.examples.length
    ? <PresentationBlock>{flatten(component.examples)}</PresentationBlock>
    : null

  const blurb = component.blurb
    ? <BpkParagraph>{component.blurb}</BpkParagraph>
    : null

  const readme = component.readme ? flatten([
    <BpkHeading id={`${component.id}-readme`} level='h3'>{component.title} readme</BpkHeading>,
    <PresentationBlock>
      <BpkContentContainer dangerouslySetInnerHTML={{ __html: markdownToHTML(component.readme) }} />
    </PresentationBlock>
  ]) : null

  return [ heading, blurb, examples, readme ]
}

const CustomSection = (section) => [
  <BpkHeading id={section.id} level='h2'>{section.title}</BpkHeading>,
  flatten(section.content.map(toNodes))
]

const toNodes = (children) => {
  if (!children) {
    return null
  }

  return isString(children) ? [ <BpkParagraph>{children}</BpkParagraph> ] : children
}

const markdownToHTML = (readmeString) => marked(readmeString, { renderer: renderer })

const ComponentPageBuilder = ({ title, blurb, components, readme, customSections }) => (
  <BpkContentContainer>
    <Helmet title={title} />
    <BpkHeading level='h1'>{title}</BpkHeading>
    {flatten(toNodes(blurb))}
    <BpkHeading id='examples' level='h2'>Examples</BpkHeading>
    <BpkList>{flatten(components.map(ExampleNavListItem))}</BpkList>
    {flatten(components.map(ComponentExample))}
    {readme ? flatten([
      <BpkHeading id='readme' level='h2'>Readme</BpkHeading>,
      <PresentationBlock>
        <BpkContentContainer dangerouslySetInnerHTML={{ __html: markdownToHTML(readme) }} />
      </PresentationBlock>
    ]) : null
    }
    {flatten(customSections.map(CustomSection))}
  </BpkContentContainer>
)

const childrenPropType = PropTypes.oneOfType([
  PropTypes.arrayOf(PropTypes.node),
  PropTypes.node
])

const contentShape = PropTypes.oneOfType([
  PropTypes.string,
  childrenPropType
])

ComponentPageBuilder.propTypes = {
  title: PropTypes.string.isRequired,
  blurb: contentShape,
  components: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      blurb: PropTypes.string,
      examples: PropTypes.arrayOf(childrenPropType),
      readme: PropTypes.string
    })
  ),
  readme: PropTypes.string,
  customSections: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      content: PropTypes.arrayOf(contentShape)
    })
  )
}

ComponentPageBuilder.defaultProps = {
  blurb: null,
  components: [],
  readme: null,
  customSections: []
}

export default ComponentPageBuilder
