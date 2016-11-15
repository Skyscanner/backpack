import React, { PropTypes } from 'react';

import './bpk-autosuggest.scss';

const BpkSuggestion = (props) => {
  const classNames = ['bpk-autosuggest__suggestion'];

  if (props.indent) { classNames.push('bpk-autosuggest__suggestion--indent'); }

  return (
    <section className={classNames.join(' ')}>
      {props.icon
        ? <props.icon className="bpk-autosuggest__suggestion-icon" />
        : null
      }
      <div className="bpk-autosuggest__suggestion-inner">
        <span className="bpk-autosuggest__suggestion-value">{props.value}</span>
        {props.subHeading
          ? <small className="bpk-autosuggest__suggestion-sub-heading">{props.subHeading}</small>
          : null
        }
        {props.tertiaryLabel
          ? <aside className="bpk-autosuggest__suggestion-tertiary-label">{props.tertiaryLabel}</aside>
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
};

BpkSuggestion.defaultProps = {
  subHeading: null,
  tertiaryLabel: null,
  icon: null,
  indent: false,
};

export default BpkSuggestion;
