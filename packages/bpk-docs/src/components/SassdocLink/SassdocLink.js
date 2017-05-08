import React from 'react';
import BpkLink from 'bpk-component-link';

import PropTypes from 'prop-types';

/* eslint-disable import/no-webpack-loader-syntax */
import rawSassdocLogoSvg from 'raw!./../../static/sassdoc-logo.svg';
/* eslint-enable */

import './sassdoc-link.scss';

const sassdocLogoSvg = { __html: rawSassdocLogoSvg };

/* eslint-disable react/no-danger */
const SassdocLink = props => (
  <aside className="bpkdocs-sassdoc-link">
    <span className="bpkdocs-sassdoc-link__logo" dangerouslySetInnerHTML={sassdocLogoSvg} />
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
