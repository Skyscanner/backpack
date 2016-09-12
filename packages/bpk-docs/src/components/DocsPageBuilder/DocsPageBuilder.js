import marked from 'marked'
import keys from 'lodash/keys'
import Helmet from 'react-helmet'
import isString from 'lodash/isString'
import React, { Children, PropTypes } from 'react'

import BpkLink from 'bpk-component-link'
import BpkHeading from 'bpk-component-heading'
import BpkParagraph from 'bpk-component-paragraph'
import { BpkList, BpkListItem } from 'bpk-component-list'
import BpkContentContainer from 'bpk-component-content-container'
import { BpkTable, BpkTableHead, BpkTableBody, BpkTableRow, BpkTableHeadCell, BpkTableCell } from 'bpk-component-table'

import PresentationBlock from './../../components/PresentationBlock'
import { formatTokenName, formatTokenValue } from './../../helpers/tokens-helper'

const flatten = Children.toArray
const renderer = new marked.Renderer()

const ExampleNavListItem = (component) => (
  <BpkListItem>
    <BpkLink href={`#${component.id}`}>{component.title}</BpkLink>
  </BpkListItem>
)

const ComponentExample = (component) => {
  const heading = <BpkHeading id={component.id} level='h2'>{component.title}</BpkHeading>

  const examples = component.examples.length
    ? <PresentationBlock>{flatten(component.examples)}</PresentationBlock>
    : null

  const blurb = component.blurb ? toNodes(component.blurb) : null

  const readme = component.readme ? flatten([
    <BpkHeading id={`${component.id}-readme`} level='h3'>{component.title} readme</BpkHeading>,
    <BpkContentContainer dangerouslySetInnerHTML={{ __html: markdownToHTML(component.readme) }} bareHtml />
  ]) : null

  const tokenMap = component.tokenMap ? toTokenTable(component.tokenMap) : null

  return [ heading, blurb, examples, readme, tokenMap ]
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

const markdownToHTML = (readmeString) => {
  readmeString = readmeString.replace(/^#.*$/m, '') // remove first h1
  readmeString = readmeString.replace(/^>.*$/m, '') // remove first blockquote
  readmeString = readmeString.replace(/^(#|##|###) /gm, '#### ') // replace h1, h2, h3 with h4
  return marked(readmeString, { renderer: renderer })
}

const toTokenTable = (tokens) => (
  <BpkTable>
    <BpkTableHead>
      <BpkTableRow>
        <BpkTableHeadCell>Bond</BpkTableHeadCell>
        <BpkTableHeadCell>Value</BpkTableHeadCell>
      </BpkTableRow>
    </BpkTableHead>
    <BpkTableBody>
      {keys(tokens).map((token) => (
        <BpkTableRow key={formatTokenName(token)}>
          <BpkTableCell>{formatTokenName(token)}</BpkTableCell>
          <BpkTableCell>{formatTokenValue(tokens[ token ])}</BpkTableCell>
        </BpkTableRow>
      ))}
    </BpkTableBody>
  </BpkTable>
)

const DocsPageBuilder = (props) => (
  <BpkContentContainer>
    <Helmet title={props.title} />
    <BpkHeading level='h1'>{props.title}</BpkHeading>
    {flatten(toNodes(props.blurb))}
    <BpkList>{flatten(props.components.map(ExampleNavListItem))}</BpkList>
    {flatten(props.components.map(ComponentExample))}
    {props.readme ? flatten([
      <BpkHeading id='readme' level='h2'>Readme</BpkHeading>,
      <BpkContentContainer dangerouslySetInnerHTML={{ __html: markdownToHTML(props.readme) }} bareHtml />
    ]) : null
    }
    {props.tokenMap ? toTokenTable(props.tokenMap) : null}
    {flatten(props.customSections.map(CustomSection))}
    {props.sassdocId ? (
      <BpkParagraph>
        <em>
          Looking for Sass variables and mixins? Check
          out <BpkLink href={`/sassdoc/#${props.sassdocId}`} blank>Backpack's Sassdoc</BpkLink>.
        </em>
      </BpkParagraph>
    ) : null
    }
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
      tokenMap: PropTypes.object
    })
  ),
  readme: PropTypes.string,
  tokenMap: PropTypes.object,
  customSections: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      content: PropTypes.arrayOf(contentShape)
    })
  ),
  sassdocId: PropTypes.string
}

DocsPageBuilder.defaultProps = {
  blurb: null,
  components: [],
  readme: null,
  tokenMap: null,
  customSections: [],
  sassdocId: null
}

export default DocsPageBuilder
