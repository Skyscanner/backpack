import PropTypes from 'prop-types';
import React from 'react';
import { cssModules } from 'bpk-react-utils';

import STYLES from './IconSearchResult.scss';
import customPropTypes from './propTypes';

const getClassName = cssModules(STYLES);

const IconSearchResult = props => (
  <div>
    <dt className={getClassName('bpkdocs-icon-search-result__title')}>
      {props.categoryName}
    </dt>
    <dd className={getClassName('bpkdocs-icon-search-result__content')}>
      <ul className={getClassName('bpkdocs-icon-search-result__list')}>
        {props.icons.map(icon => (
          <li key={icon.name} className={getClassName('bpkdocs-icon-search-result__list-item')}>
            <span className={getClassName('bpkdocs-icon-search-result__icon-container')}>
              <icon.component
                className={
                  ['bpkdocs-icon-search-result__icon', `bpkdocs-icon-search-result__icon--${icon.categoryId}`]
                    .map(getClassName)
                    .join(' ')
                }
              />
            </span>
            <span className={getClassName('bpkdocs-icon-search-result__name-container')}>{icon.name}</span>
          </li>
          ))}
      </ul>
    </dd>
  </div>
);

IconSearchResult.propTypes = {
  categoryName: PropTypes.string.isRequired,
  icons: customPropTypes.icons.isRequired,
};

export default IconSearchResult;
