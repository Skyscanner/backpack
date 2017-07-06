import PropTypes from 'prop-types';
import React from 'react';
import BpkHeading from 'bpk-component-heading';
import { cssModules } from 'bpk-react-utils';
import STYLES from './bpk-tile.scss';

const getClassName = cssModules(STYLES);


const BpkTile = (props) => {
  const classNames = [getClassName('bpk-tile')];
  const { dark, backgroundColor, imageSource, className, cta, heading, ...rest } = props;

  if (className) { classNames.push(className); }
  const classNameFinal = classNames.join(' ');

  const scrimClassNames = [getClassName('bpk-tile__scrim')];
  scrimClassNames.push(dark
    ? getClassName('bpk-tile__scrim--dark')
    : getClassName('bpk-tile__scrim--light'));

  const headingClassNames = [getClassName('bpk-tile__heading')];
  headingClassNames.push(dark
  ? getClassName('bpk-tile__heading--black')
  : getClassName('bpk-tile__heading'));

  if (backgroundColor) {
    return (
      <div className={classNameFinal} style={{ backgroundColor }} {...rest}>
        <div className={getClassName('bpk-tile__illustration')} style={{ backgroundImage: `url(${imageSource})` }} />
        <div className={scrimClassNames.join(' ')}>
          <BpkHeading level="h3" bottomMargin={false} className={headingClassNames.join(' ')}>{ heading }</BpkHeading>
          <p className={getClassName('bpk-tile__cta')}>{cta}</p>
        </div>
      </div>
    );
  }

  return (
    <div className={classNameFinal} style={{ backgroundImage: `url(${imageSource})` }} {...rest}>
      <div className={scrimClassNames.join(' ')}>
        <BpkHeading level="h3" bottomMargin={false} className={headingClassNames.join(' ')}>{ heading }</BpkHeading>
        <p className={getClassName('bpk-tile__cta')}>{cta}</p>
      </div>
    </div>
  );
};

BpkTile.propTypes = {
  className: PropTypes.string,
  imageSource: PropTypes.string,
  backgroundColor: PropTypes.string,
  heading: PropTypes.string,
  cta: PropTypes.string,
  dark: PropTypes.bool,
};

BpkTile.defaultProps = {
  className: null,
  imageSource: PropTypes.string,
  backgroundColor: null,
  heading: PropTypes.string,
  cta: PropTypes.string,
  dark: true,
};

export default BpkTile;
