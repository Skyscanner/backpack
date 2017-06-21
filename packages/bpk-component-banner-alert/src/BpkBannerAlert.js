import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { withButtonAlignment } from 'bpk-component-icon';
import TickCircleIcon from 'bpk-component-icon/sm/tick-circle';
import ChevronDownIcon from 'bpk-component-icon/sm/chevron-down';
import InfoCircleIcon from 'bpk-component-icon/sm/information-circle';
import { cssModules } from 'bpk-react-utils';

import STYLES from './bpk-banner-alert.scss';

const getClassName = cssModules(STYLES);

const WarnIcon = withButtonAlignment(InfoCircleIcon);
const ErrorIcon = withButtonAlignment(InfoCircleIcon);
const SuccessIcon = withButtonAlignment(TickCircleIcon);
const ExpandIcon = withButtonAlignment(ChevronDownIcon);

export const ALERT_TYPES = {
  SUCCESS: 'success',
  WARN: 'warn',
  ERROR: 'error',
};

const getIconForType = (type) => {
  const map = {
    [ALERT_TYPES.SUCCESS]: <SuccessIcon className={getClassName('bpk-banner-alert__success-icon')} />,
    [ALERT_TYPES.WARN]: <WarnIcon className={getClassName('bpk-banner-alert__warn-icon')} />,
    [ALERT_TYPES.ERROR]: <ErrorIcon className={getClassName('bpk-banner-alert__error-icon')} />,
  };

  return map[type];
};

const ToggleButton = (props) => {
  const classNames = [getClassName('bpk-banner-alert__expand-icon')];

  if (props.expanded) { classNames.push(getClassName('bpk-banner-alert__expand-icon--flipped')); }

  return (
    <button
      className={getClassName('bpk-banner-alert__toggle-button')}
      aria-label={props.label}
      aria-expanded={props.expanded}
      title={props.label}
    >
      <ExpandIcon
        className={classNames.join(' ')}
      />
    </button>
  );
};

ToggleButton.propTypes = {
  label: PropTypes.string.isRequired,
  expanded: PropTypes.bool.isRequired,
};

class BpkBannerAlert extends Component {
  constructor(props) {
    super(props);

    this.state = {
      expanded: false,
    };

    this.onExpand = this.onExpand.bind(this);
  }

  onExpand() {
    this.setState({
      expanded: !this.state.expanded,
    });
  }

  render() {
    const isExpanded = this.state.expanded;
    const isExpandable = this.props.children;
    const showChildren = isExpandable && isExpanded;

    const headerClassNames = [getClassName('bpk-banner-alert__header')];
    const sectionClassNames = ['bpk-banner-alert', `bpk-banner-alert--${this.props.type}`]
      .map(className => getClassName(className));

    if (isExpandable) { headerClassNames.push(getClassName('bpk-banner-alert__header--expandable')); }

    /* eslint-disable jsx-a11y/no-static-element-interactions */
    return (
      <section className={sectionClassNames.join(' ')}>
        <header className={headerClassNames.join(' ')} onClick={this.onExpand}>
          <span className={getClassName('bpk-banner-alert__icon')}>{getIconForType(this.props.type)}</span>
          &nbsp;
          <span className={getClassName('bpk-banner-alert__message')}>{this.props.message}</span>
          &nbsp;
          {isExpandable ? (
            <span className={getClassName('bpk-banner-alert__toggle')}>
              <ToggleButton expanded={isExpanded} label={this.props.toggleButtonLabel} />
            </span>
          ) : null}
        </header>
        {
          showChildren ?
            <div className={getClassName('bpk-banner-alert__children-container')}>{this.props.children}</div>
            : null
        }
      </section>
    );
    /* eslint-enable */
  }
}

BpkBannerAlert.propTypes = {
  type: PropTypes.oneOf([
    ALERT_TYPES.SUCCESS,
    ALERT_TYPES.WARN,
    ALERT_TYPES.ERROR,
  ]).isRequired,
  message: PropTypes.node.isRequired,
  children: PropTypes.node,
  toggleButtonLabel: PropTypes.string,
};

BpkBannerAlert.defaultProps = {
  children: null,
  toggleButtonLabel: null,
};

export default BpkBannerAlert;
