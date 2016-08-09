import Helmet from 'react-helmet'
import isString from 'lodash/isString'
import React, { Children, PropTypes } from 'react'

import BpkLink from 'bpk-component-link'
import BpkHeading from 'bpk-component-heading'
import BpkParagraph from 'bpk-component-paragraph'
import { BpkList, BpkListItem } from 'bpk-component-list'
import BpkContentContainer from 'bpk-component-content-container'
import PresentationBlock from './../../components/PresentationBlock'

const toArray = Children.toArray

const ExampleNavListItem = (component) => (
  <BpkListItem>
    <BpkLink href={`#${component.id}`}>{component.title}</BpkLink>
  </BpkListItem>
)

const ComponentExample = (component) => {
  const heading = <BpkHeading id={component.id} level='h3'>{component.title}</BpkHeading>

  const examples = component.examples.length
    ? <PresentationBlock>{toArray(component.examples)}</PresentationBlock>
    : null

  const blurb = component.blurb
    ? <BpkParagraph>{component.blurb}</BpkParagraph>
    : null

  return [ heading, blurb, examples ]
}

const CustomSection = (section) => [
  <BpkHeading id={section.id} level='h2'>{section.title}</BpkHeading>,
  toArray(section.content.map(toNodes))
]

const toNodes = (children) => {
  if (!children) {
    return null
  }

  return isString(children) ? [ <BpkParagraph>{children}</BpkParagraph> ] : children
}

const ComponentPageBuilder = ({ title, blurb, components, usage, customSections }) => (
  <BpkContentContainer>
    <Helmet title={title} />
    <BpkHeading level='h1'>{title}</BpkHeading>
    {toArray(toNodes(blurb))}
    <BpkHeading id='examples' level='h2'>Examples</BpkHeading>
    <BpkList>{toArray(components.map(ExampleNavListItem))}</BpkList>
    {toArray(components.map(ComponentExample))}
    <BpkHeading id='usage' level='h2'>Usage</BpkHeading>
    {toArray(toNodes(usage))}
    {toArray(customSections.map(CustomSection))}
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
      examples: PropTypes.arrayOf(childrenPropType),
      blurb: PropTypes.string
    })
  ),
  usage: contentShape,
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
  usage: null,
  customSections: []
}

export default ComponentPageBuilder
