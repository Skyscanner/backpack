import _ from 'lodash';
import React from 'react';
import BpkHeading from 'bpk-component-heading';

import './IconSearchResults.scss';
import customPropTypes from './propTypes';
import IconSearchResult from './IconSearchResult';

const IconSearchResults = (props) => {
  const categories = _.groupBy(props.icons, 'categoryName');
  const categoryNames = Object.keys(categories);

  return (
    <div>
      <BpkHeading level="h3" className="bpkdocs-icon-search-results__heading">Results</BpkHeading>
      <dl className="bpkdocs-icon-search-results__list">
        {categoryNames.length > 0
          ? categoryNames.map(categoryName => (
            <IconSearchResult
              key={categoryName}
              categoryName={categoryName}
              icons={categories[categoryName]}
            />
          ))
          : <div>There are no icons by that name.</div>
        }
      </dl>
    </div>
  );
};

IconSearchResults.propTypes = {
  icons: customPropTypes.icons.isRequired,
};

export default IconSearchResults;
