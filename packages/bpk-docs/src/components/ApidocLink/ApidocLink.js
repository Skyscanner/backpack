/*
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2016-2019 Skyscanner Ltd
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import React from 'react';
import PropTypes from 'prop-types';
import BpkLink from 'bpk-component-link';
import { cssModules } from 'bpk-react-utils';

import sassdocLogoSvg from '../../static/sassdoc-logo.svg';

import STYLES from './ApidocLink.scss';

const getClassName = cssModules(STYLES);

const SassdocLink = ({ sassdocId, category, ...rest }) => (
  <ApidocLink
    logo={{ src: sassdocLogoSvg, alt: 'Sass docs logo' }}
    renderLink={() => (
      <span>
        Looking for &quot;{category}&quot; Sass variables and mixins? Check out{' '}
        <BpkLink href={`/sassdoc/#${sassdocId}`} blank>
          Backpack&apos;s Sassdoc
        </BpkLink>
        .
      </span>
    )}
    {...rest}
  />
);

SassdocLink.propTypes = {
  sassdocId: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
};

const AndroidDocLink = ({ package: pkg, title, ...rest }) => (
  <ApidocLink
    renderLink={() => (
      <span>
        Check out{' '}
        <BpkLink href={`/android/versions/latest/${pkg}`} blank>
          {title} on Backpack&apos;s Android docs
        </BpkLink>{' '}
        for more.
      </span>
    )}
    {...rest}
  />
);

AndroidDocLink.propTypes = {
  title: PropTypes.string.isRequired,
  package: PropTypes.string.isRequired,
};

const IosDocLink = ({ component, title, ...rest }) => (
  <ApidocLink
    renderLink={() => (
      <span>
        Check out{' '}
        <BpkLink href={`/ios/versions/latest/Classes/${component}.html`} blank>
          {title} on Backpack&apos;s iOS docs
        </BpkLink>{' '}
        for more.
      </span>
    )}
    {...rest}
  />
);

IosDocLink.propTypes = {
  title: PropTypes.string.isRequired,
  component: PropTypes.string.isRequired,
};

const BY_TYPE = {
  sass: SassdocLink,
  android: AndroidDocLink,
  ios: IosDocLink,
};

export const createFromType = (type, defProps) => {
  const Link = BY_TYPE[type];
  if (!Link) {
    throw TypeError(`Invalid arguments: type ${type} not supported`);
  }
  return props => <Link {...defProps} {...props} />;
};

const ApidocLink = ({ logo, renderLink }) => (
  <aside className={getClassName('bpkdocs-apidoc-link')}>
    {logo && (
      <img
        className={getClassName('bpkdocs-apidoc-link__logo')}
        src={`/${logo.src}`}
        alt={logo.alt}
      />
    )}
    {renderLink()}
  </aside>
);

ApidocLink.propTypes = {
  renderLink: PropTypes.func.isRequired,
  logo: PropTypes.shape({
    alt: PropTypes.string.isRequired,
    src: PropTypes.string.isRequired,
  }),
};

ApidocLink.defaultProps = {
  logo: null,
};

export default ApidocLink;
