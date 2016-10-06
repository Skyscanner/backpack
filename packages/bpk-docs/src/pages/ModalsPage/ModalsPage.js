import React, { Component } from 'react'

import BpkModal from 'bpk-component-modal'
import BpkButton from 'bpk-component-button'
import BpkParagraph from 'bpk-component-paragraph'
import { BpkButtonLink } from 'bpk-component-link'
import DocsPageBuilder from './../../components/DocsPageBuilder'

class ModalContainer extends Component {
  constructor () {
    super()

    this.onOpen = this.onOpen.bind(this)
    this.onClose = this.onClose.bind(this)
    this.toggleWidth = this.toggleWidth.bind(this)

    this.state = {
      isOpen: false,
      wide: false
    }
  }

  onOpen () {
    this.setState({
      isOpen: true
    })
  }

  onClose () {
    this.setState({
      isOpen: false
    })
  }

  toggleWidth () {
    this.setState((state) => ({
      wide: !state.wide
    }))
  }

  render () {
    const { buttonText, children, ...rest } = this.props

    return (
      <div>
        <BpkButton onClick={this.onOpen}>{buttonText}</BpkButton>
        <BpkModal isOpen={this.state.isOpen} onClose={this.onClose} wide={this.state.wide} {...rest}>
          <BpkParagraph>{children}</BpkParagraph>
          <BpkButtonLink onClick={this.toggleWidth}>Toggle width</BpkButtonLink>
        </BpkModal>
      </div>
    )
  }
}

const components = [
  {
    id: 'default',
    title: 'Default modal',
    blurb: 'The default modal has a title and a close button and comes in 2 widths, regular and wide.',
    examples: [
      <ModalContainer
        title='Modal title'
        closeLabel='Close modal'
        buttonText='Open modal'
        getApplicationElement={() => document.getElementById('react-root')}
      >
        This is a default modal. You can put anything you want in here.
      </ModalContainer>
    ]
  },
  {
    id: 'text-button',
    title: 'Text button',
    blurb: 'The default modal can be configured to display the close button as text - useful for when a close icon doesn\'t fit the context.',
    examples: [
      <ModalContainer
        title='Modal title'
        closeText='Done'
        buttonText='Open modal'
        getApplicationElement={() => document.getElementById('react-root')}
      >
        You can put anything you want in here.
      </ModalContainer>
    ]
  }
]

const ModalsPage = () => <DocsPageBuilder
  title='Modals'
  blurb={[
    <BpkParagraph>
      Modals are used to display content or views that are separate from the rest of the app or page. When triggered,
      modals will emerge from the centre of the viewport with a backdrop to indicate their separation from everything
      else. On mobile viewports, they occupy the entire screen.
    </BpkParagraph>
  ]}
  components={components}
  readme={require('raw!bpk-component-modal/readme.md')}
  sassdocId='modals'
/>

export default ModalsPage
