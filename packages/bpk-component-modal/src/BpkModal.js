import Portal from 'react-portal'
import React, { PropTypes } from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

import { BpkButtonLink } from './../../bpk-component-link'
import CloseIcon from './../../bpk-component-icon/sm/close'
import { withButtonAlignment } from './../../bpk-component-icon'

import './bpk-modal.scss'

const CloseButtonIcon = withButtonAlignment(CloseIcon)

const getScrollBarWidth = () => {
  let scrollBarWidth = 0

  if (typeof document !== 'undefined' && document.body.clientWidth < window.innerWidth) {
    const scrollDiv = document.createElement('div')
    scrollDiv.className = 'bpk-modal-scroll-bar-measure'
    document.body.appendChild(scrollDiv)
    scrollBarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth
    document.body.removeChild(scrollDiv)
  }

  return scrollBarWidth
}

const addRightPaddingToBody = (paddingRight) => {
  if (typeof document !== 'undefined') {
    document.body.style.paddingRight = `${paddingRight}px`
  }
}

const NO_SCROLL_CLASS = 'bpk-modal-body-no-scroll'

const FirstChild = (props) => {
  const children = React.Children.toArray(props.children)
  return children[ 0 ] || null
}

const TransitionInitialMount = (props) => (
  <ReactCSSTransitionGroup
    component={FirstChild}
    transitionName={props.classNamePrefix}
    transitionAppear={true}
    transitionAppearTimeout={props.transitionTimeout}
    transitionEnterTimeout={0}
    transitionLeaveTimeout={0}>
    {props.children}
  </ReactCSSTransitionGroup>
)

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
    <div className='bpk-modal' onClick={closePortal}>
      <div className='bpk-modal__outer'>
        <div className='bpk-modal__inner'>
          <TransitionInitialMount classNamePrefix={dialogClassName} transitionTimeout={300}>
            <section className={dialogClassNames.join(' ')} onClick={stopPropagation}>
              <header className='bpk-modal__dialog-header'>
                <span className='bpk-modal__dialog-title'>{props.title}</span>
                {props.closeText
                  ? <BpkButtonLink onClick={closePortal}>{props.closeText}</BpkButtonLink>
                  : <CloseButton label={props.closeLabel} onClick={closePortal}/>
                }
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
    addRightPaddingToBody(getScrollBarWidth())
    document.querySelector('body').classList.add(NO_SCROLL_CLASS)
  }

  const onClose = () => {
    document.querySelector('body').classList.remove(NO_SCROLL_CLASS)
    addRightPaddingToBody(0)
    props.onClose()
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
