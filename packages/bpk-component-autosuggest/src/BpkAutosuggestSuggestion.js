import PropTypes from 'prop-types';
import React from 'react';
import { cssModules } from 'bpk-react-utils';

import STYLES from './bpk-autosuggest.scss';

const getClassName = cssModules(STYLES);

const BpkSuggestion = (props) => {
  const classNames = [getClassName('bpk-autosuggest__suggestion')];
  const { indent, className, icon, subHeading, tertiaryLabel, value, ...rest } = props;
  const Icon = icon;

  if (indent) { classNames.push(getClassName('bpk-autosuggest__suggestion--indent')); }
  if (className) { classNames.push(className); }

  return (
    <section className={classNames.join(' ')} {...rest}>
      {icon
        ? <Icon className={getClassName('bpk-autosuggest__suggestion-icon')} />
        : null
      }
      <div className={getClassName('bpk-autosuggest__suggestion-inner')}>
        <span className={getClassName('bpk-autosuggest__suggestion-value')}>{value}</span>
        {subHeading || tertiaryLabel
          ? <small className={getClassName('bpk-autosuggest__suggestion-sub-heading')}>{subHeading}</small>
          : null
        }
        {tertiaryLabel
          ? <aside className={getClassName('bpk-autosuggest__suggestion-tertiary-label')}>{tertiaryLabel}</aside>
          : null
        }
      </div>
    </section>
  );
};

BpkSuggestion.propTypes = {
  value: PropTypes.string.isRequired,
  subHeading: PropTypes.string,
  tertiaryLabel: PropTypes.string,
  icon: PropTypes.func,
  indent: PropTypes.bool,
  className: PropTypes.string,
};

BpkSuggestion.defaultProps = {
  subHeading: null,
  tertiaryLabel: null,
  icon: null,
  indent: false,
  className: null,
};

export default BpkSuggestion;
