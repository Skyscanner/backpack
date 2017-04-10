import _ from 'lodash';
import React from 'react';
import BpkHeading from 'bpk-component-heading';

import './IconSearchResults.scss';
import customPropTypes from './propTypes';
import IconSearchResult from './IconSearchResult';

const IconSearchResults = (props) => {
  const iconCategories = _.groupBy(props.icons, 'category');

  return (
    <div>
      <BpkHeading level="h3" className="bpkdocs-icon-search-results__heading">Results</BpkHeading>
      <dl className="bpkdocs-icon-search-results__list">
        {Object.keys(iconCategories).map(category => (
          <IconSearchResult
            key={category}
            category={category}
            icons={iconCategories[category]}
          />
        ))}
      </dl>
    </div>
  );
};

IconSearchResults.propTypes = {
  icons: customPropTypes.icons.isRequired,
};

export default IconSearchResults;
