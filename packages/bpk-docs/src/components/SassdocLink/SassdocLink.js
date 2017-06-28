import React from 'react';
import PropTypes from 'prop-types';
import BpkLink from 'bpk-component-link';
import { cssModules } from 'bpk-react-utils';

/* eslint-disable import/no-webpack-loader-syntax */
import rawSassdocLogoSvg from 'raw!./../../static/sassdoc-logo.svg';
/* eslint-enable */

import STYLES from './sassdoc-link.scss';

const getClassName = cssModules(STYLES);
const sassdocLogoSvg = { __html: rawSassdocLogoSvg };

/* eslint-disable react/no-danger */
const SassdocLink = props => (
  <aside className={getClassName('bpkdocs-sassdoc-link')}>
    <span className={getClassName('bpkdocs-sassdoc-link__logo')} dangerouslySetInnerHTML={sassdocLogoSvg} />
    Looking for &quot;{props.category}&quot; Sass variables and mixins? Check
    out <BpkLink href={`/sassdoc/#${props.sassdocId}`} blank>Backpack&apos;s Sassdoc</BpkLink>.
  </aside>
);
/* eslint-enable */

SassdocLink.propTypes = {
  sassdocId: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
};

export default SassdocLink;
