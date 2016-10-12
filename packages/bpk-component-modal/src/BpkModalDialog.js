import focusScope from 'a11y-focus-scope'
import focusStore from 'a11y-focus-store'
import BpkHeading from 'bpk-component-heading'
import { BpkButtonLink } from 'bpk-component-link'
import React, { PropTypes, Component } from 'react'

import './bpk-modal.scss'
import BpkModalCloseButton from './BpkModalCloseButton'
import { lockScroll, unlockScroll } from './scroll-utils'
import TransitionInitialMount from './TransitionInitialMount'

const stopPropagation = (e) => {
  e.stopPropagation()
}

class BpkModalDialog extends Component {
  constructor () {
    super()

    this.onClose = this.onClose.bind(this)
    this.getReferenceToDialogElement = this.getReferenceToDialogElement.bind(this)
  }

  componentDidMount () {
    const { isMobileSafari, getApplicationElement } = this.props

    lockScroll({ isMobileSafari })
    focusStore.storeFocus()

    if (this.dialogElement) {
      focusScope.scopeFocus(this.dialogElement)
    }

    const applicationElement = getApplicationElement()

    if (applicationElement) {
      applicationElement.setAttribute('aria-hidden', 'true')
    }
  }

  componentWillUnmount () {
    const { isMobileSafari, getApplicationElement } = this.props

    unlockScroll({ isMobileSafari })
    focusScope.unscopeFocus()
    focusStore.restoreFocus()

    const applicationElement = getApplicationElement()

    if (applicationElement) {
      applicationElement.removeAttribute('aria-hidden')
    }
  }

  getReferenceToDialogElement (ref) {
    this.dialogElement = ref
  }

  onClose (e) {
    stopPropagation(e)
    this.props.onClose()
  }

  renderDialog () {
    const dialogClassName = 'bpk-modal__dialog'
    const dialogClassNames = [ dialogClassName ]

    this.props.wide ? dialogClassNames.push('bpk-modal__dialog--wide') : null

    return (
      <TransitionInitialMount classNamePrefix={dialogClassName} transitionTimeout={300}>
        <section
          tabIndex='-1'
          role='dialog'
          aria-labelledby='aria-label-heading'
          aria-describedby='aria-label-content'
          onClick={stopPropagation}
          className={dialogClassNames.join(' ')}
          ref={this.getReferenceToDialogElement}
        >
          <header className='bpk-modal__dialog-header'>
            <BpkHeading id='aria-label-heading' level='h4' bottomMargin={false}>
              {this.props.title}
            </BpkHeading>
            {this.props.closeText
              ? <BpkButtonLink onClick={this.onClose}>{this.props.closeText}</BpkButtonLink>
              : <BpkModalCloseButton label={this.props.closeLabel} onClick={this.onClose} />
            }
          </header>
          <div id='aria-label-content' className='bpk-modal__dialog-content'>
            {this.props.children}
          </div>
        </section>
      </TransitionInitialMount>
    )
  }

  render () {
    const classNames = [ 'bpk-modal' ]

    !this.props.isMobileSafari ? classNames.push('bpk-modal--center-dialog') : null

    return (
      <div className={classNames.join(' ')} onClick={this.onClose}>
        {this.renderDialog()}
      </div>
    )
  }
}

BpkModalDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  getApplicationElement: PropTypes.func.isRequired,
  isMobileSafari: PropTypes.bool,
  closeLabel: PropTypes.string,
  closeText: PropTypes.string,
  wide: PropTypes.bool
}

BpkModalDialog.defaultProps = {
  isMobileSafari: /iPhone|iPad/i.test(typeof window !== 'undefined' ? window.navigator.platform : ''),
  closeLabel: null,
  closeText: null,
  wide: false
}

export default BpkModalDialog
