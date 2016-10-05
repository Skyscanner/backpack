import Portal from 'react-portal'
import React, { PropTypes } from 'react'
import focusScope from 'a11y-focus-scope'
import focusStore from 'a11y-focus-store'

import BpkHeading from './../../bpk-component-heading'
import { BpkButtonLink } from './../../bpk-component-link'
import CloseIcon from './../../bpk-component-icon/sm/close'
import { withButtonAlignment } from './../../bpk-component-icon'

import './bpk-modal.scss'
import { lockScroll, unlockScroll } from './scroll-utils'
import TransitionInitialMount from './TransitionInitialMount'

const CloseButtonIcon = withButtonAlignment(CloseIcon)

const ModalScrim = () => {
  const className = 'bpk-modal-scrim'

  return (
    <TransitionInitialMount classNamePrefix={className} transitionTimeout={200}>
      <div className={className}/>
    </TransitionInitialMount>
  )
}

const CloseButton = (props) => (
  <button
    title={props.label}
    aria-label={props.label}
    className='bpk-modal__dialog-close-button'
    onClick={props.onClick}
  >
    <CloseButtonIcon className='bpk-modal__dialog-close-icon'/>
  </button>
)

const shiftFocusToModal = (element) => {
  if (element) {
    focusStore.storeFocus()
    focusScope.scopeFocus(element)
  } else {
    focusScope.unscopeFocus()
    focusStore.restoreFocus()
  }
}

const ModalInner = (props) => {
  const stopPropagation = (e) => {
    e.stopPropagation()
  }

  const closePortal = (e) => {
    stopPropagation(e)
    props.closePortal() // this prop is exposed from react-portal
  }

  const dialogClassName = 'bpk-modal__dialog'
  const dialogClassNames = [ dialogClassName ]

  props.wide ? dialogClassNames.push('bpk-modal__dialog--wide') : null

  return (
    <div className='bpk-modal' onClick={closePortal} tabIndex='-1' ref={shiftFocusToModal}>
      <div className='bpk-modal__outer'>
        <div className='bpk-modal__inner'>
          <TransitionInitialMount classNamePrefix={dialogClassName} transitionTimeout={300}>
            <section className={dialogClassNames.join(' ')} onClick={stopPropagation}>
              <header className='bpk-modal__dialog-header'>
                {props.closeText
                  ? <BpkButtonLink onClick={closePortal}>{props.closeText}</BpkButtonLink>
                  : <CloseButton label={props.closeLabel} onClick={closePortal}/>
                }
                <BpkHeading level='h4' bottomMargin={false}>{props.title}</BpkHeading>
              </header>
              <div className='bpk-modal__dialog-content'>
                {props.children}
              </div>
            </section>
          </TransitionInitialMount>
        </div>
      </div>
    </div>
  )
}

const BpkModal = (props) => {
  const onOpen = () => {
    lockScroll()

    let applicationElement
    if (applicationElement = props.getApplicationElement()) {
      applicationElement.setAttribute('aria-hidden', 'true')
    }
  }

  const onClose = () => {
    unlockScroll()
    props.onClose()

    let applicationElement
    if (applicationElement = props.getApplicationElement()) {
      applicationElement.removeAttribute('aria-hidden')
    }
  }

  return (
    <div>
      <Portal isOpened={props.isOpen}>
        <ModalScrim />
      </Portal>
      <Portal isOpened={props.isOpen} onOpen={onOpen} onClose={onClose} closeOnEsc>
        <ModalInner
          title={props.title}
          wide={props.wide}
          closeLabel={props.closeLabel}
          closeText={props.closeText}
        >
          {props.children}
        </ModalInner>
      </Portal>
    </div>
  )
}

BpkModal.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  getApplicationElement: PropTypes.func.isRequired,
  wide: PropTypes.bool,
  closeLabel: PropTypes.string,
  closeText: PropTypes.string
}

BpkModal.defaultProps = {
  wide: false,
  closeLabel: null,
  closeText: null
}

export default BpkModal
