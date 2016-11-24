import React, { PropTypes } from 'react';
import { cssModules } from 'bpk-react-utils';

import STYLES from './bpk-autosuggest.scss';

const getClassName = cssModules(STYLES);

const BpkSuggestion = (props) => {
  const classNames = [getClassName('bpk-autosuggest__suggestion')];

  if (props.indent) { classNames.push(getClassName('bpk-autosuggest__suggestion--indent')); }

  return (
    <section className={classNames.join(' ')}>
      {props.icon
        ? <props.icon className={getClassName('bpk-autosuggest__suggestion-icon')} />
        : null
      }
      <div className={getClassName('bpk-autosuggest__suggestion-inner')}>
        <span className={getClassName('bpk-autosuggest__suggestion-value')}>{props.value}</span>
        {props.subHeading
          ? <small className={getClassName('bpk-autosuggest__suggestion-sub-heading')}>{props.subHeading}</small>
          : null
        }
        {props.tertiaryLabel
          ? <aside className={getClassName('bpk-autosuggest__suggestion-tertiary-label')}>{props.tertiaryLabel}</aside>
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
