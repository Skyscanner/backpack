import PropTypes from 'prop-types';
import React from 'react';
import { TransitionInitialMount } from 'bpk-react-utils';

import './bpk-tooltip.scss';
import { ARROW_ID } from './constants';

const BpkTooltip = (props) => {
  const {
    id,
    children,
    className,
    padded,
    ...rest
  } = props;

  const classNames = ['bpk-tooltip'];
  const innerClassNames = ['bpk-tooltip__inner'];

  // outer classNames
  if (className) { classNames.push(className); }

  // inner classNames
  if (padded) { innerClassNames.push('bpk-tooltip__inner--padded'); }

  return (
    <TransitionInitialMount classNamePrefix={'bpk-tooltip'} transitionTimeout={200}>
      <section
        id={id}
        tabIndex="-1"
        role="dialog"
        className={classNames.join(' ')}
        {...rest}
      >
        <span id={ARROW_ID} className="bpk-tooltip__arrow" role="presentation" />
        <div className={innerClassNames.join(' ')}>
          {children}
        </div>
      </section>
    </TransitionInitialMount>
  );
};

BpkTooltip.propTypes = {
  id: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  padded: PropTypes.bool,
};

BpkTooltip.defaultProps = {
  className: null,
  padded: true,
};

export default BpkTooltip;
