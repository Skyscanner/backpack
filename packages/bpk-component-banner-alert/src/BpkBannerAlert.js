import React, { Component, PropTypes } from 'react'

import './bpk-banner-alert.scss'
import { withButtonAlignment } from 'bpk-component-icon'
import TickCircleIcon from 'bpk-component-icon/sm/tick-circle'
import ChevronDownIcon from 'bpk-component-icon/sm/chevron-down'
import InfoCircleIcon from 'bpk-component-icon/sm/information-circle'

const WarnIcon = withButtonAlignment(InfoCircleIcon)
const ErrorIcon = withButtonAlignment(InfoCircleIcon)
const SuccessIcon = withButtonAlignment(TickCircleIcon)
const ExpandIcon = withButtonAlignment(ChevronDownIcon)

export const ALERT_TYPES = {
  SUCCESS: 'success',
  WARN: 'warn',
  ERROR: 'error'
}

const getIconForType = (type) => {
  const map = {
    [ALERT_TYPES.SUCCESS]: <SuccessIcon className='bpk-banner-alert__icon-success' />,
    [ALERT_TYPES.WARN]: <WarnIcon className='bpk-banner-alert__icon-warn' />,
    [ALERT_TYPES.ERROR]: <ErrorIcon className='bpk-banner-alert__icon-error' />
  }

  return map[ type ]
}

const ToggleButton = (props) => (
  <button
    className='bpk-banner-alert__toggle-button'
    aria-label={props.label}
    aria-expanded={props.expanded}
    title={props.label}
  >
    <ExpandIcon
      className={`bpk-banner-alert__expand-icon ${props.expanded ? 'bpk-banner-alert__expand-icon--flipped' : ''}`}
    />
  </button>
)

class BpkBannerAlert extends Component {
  constructor (props) {
    super(props)

    this.state = {
      expanded: false
    }
  }

  onExpand () {
    this.setState({
      expanded: !this.state.expanded
    })
  }

  render () {
    const isExpanded = this.state.expanded
    const isExpandable = this.props.children
    const showChildren = isExpandable && isExpanded

    const headerClassNames = [ 'bpk-banner-alert__header' ]

    isExpandable ? headerClassNames.push('bpk-banner-alert__header--expandable') : null

    return (
      <section className={`bpk-banner-alert bpk-banner-alert--${this.props.type}`}>
        <header className={headerClassNames.join(' ')} onClick={this.onExpand.bind(this)}>
          <span className='bpk-banner-alert__icon'>{getIconForType(this.props.type)}</span>
          &nbsp;
          <span className='bpk-banner-alert__message'>{this.props.message}</span>
          &nbsp;
          {isExpandable ? (
            <span className='bpk-banner-alert__toggle'>
              <ToggleButton expanded={isExpanded} label={this.props.toggleButtonLabel} />
            </span>
          ) : null}
        </header>
        {showChildren ? <div className='bpk-banner-alert__children-container'>{this.props.children}</div> : null}
      </section>
    )
  }
}

BpkBannerAlert.propTypes = {
  type: PropTypes.oneOf([
    ALERT_TYPES.SUCCESS,
    ALERT_TYPES.WARN,
    ALERT_TYPES.ERROR
  ]).isRequired,
  message: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]),
  toggleButtonLabel: PropTypes.string
}

BpkBannerAlert.defaultProps = {
  children: null,
  toggleButtonLabel: null
}

export default BpkBannerAlert
