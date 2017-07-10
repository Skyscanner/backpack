import React from 'react';
import PropTypes from 'prop-types';
import BpkLink from 'bpk-component-link';
import { cssModules } from 'bpk-react-utils';

import sassdocLogoSvg from './../../static/sassdoc-logo.svg';

import STYLES from './sassdoc-link.scss';

const getClassName = cssModules(STYLES);

const SassdocLink = props => (
  <aside className={getClassName('bpkdocs-sassdoc-link')}>
    <img className={getClassName('bpkdocs-sassdoc-link__logo')} src={`/${sassdocLogoSvg}`} alt="Sass docs logo" />
    Looking for &quot;{props.category}&quot; Sass variables and mixins? Check
    out <BpkLink href={`/sassdoc/#${props.sassdocId}`} blank>Backpack&apos;s Sassdoc</BpkLink>.
  </aside>
);

SassdocLink.propTypes = {
  sassdocId: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
};

export default SassdocLink;
