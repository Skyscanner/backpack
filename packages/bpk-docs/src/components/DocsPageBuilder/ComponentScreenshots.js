/*
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2018 Skyscanner Ltd
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
import BpkText from 'bpk-component-text';
import BpkPanel from 'bpk-component-panel';
import { cssModules } from 'bpk-react-utils';
import BpkImage, {
  withLazyLoading,
  withLoadingBehavior,
} from 'bpk-component-image';

import STYLES from './ComponentScreenshots.css';

const getClassName = cssModules(STYLES);
const documentIfExists = typeof window !== 'undefined' ? document : null;
const LazyLoadingImage = withLoadingBehavior(
  withLazyLoading(BpkImage, documentIfExists),
);

let counter = 0;
const generateId = (title = '') => {
  counter += 1;
  return `${title.toLowerCase().replace(' ', '-')}-${counter}`;
};

const ComponentScreenshot = ({ title, subText, ...rest }) => {
  const subTextId = generateId(title);

  return (
    <div
      key={title}
      className={getClassName('bpkdocs-component-screenshots__item')}
    >
      <dt className={getClassName('bpkdocs-component-screenshots__item-title')}>
        <BpkText tagName="h3" textStyle="xs">
          {title}
        </BpkText>
      </dt>
      <dd
        className={getClassName(
          'bpkdocs-component-screenshots__item-image-container',
        )}
      >
        <BpkPanel>
          <LazyLoadingImage {...rest} aria-describedby={subTextId} />
        </BpkPanel>
        <BpkText id={subTextId} textStyle="xs">
          {subText}
        </BpkText>
      </dd>
    </div>
  );
};

ComponentScreenshot.propTypes = {
  title: PropTypes.string.isRequired,
  subText: PropTypes.string.isRequired,
};

const ComponentScreenshots = ({ screenshots, ...rest }) => (
  <dl className={getClassName('bpkdocs-component-screenshots')} {...rest}>
    {screenshots.map(ComponentScreenshot)}
  </dl>
);

ComponentScreenshots.propTypes = {
  screenshots: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      src: PropTypes.string.isRequired,
      width: PropTypes.number.isRequired,
      height: PropTypes.number.isRequired,
      altText: PropTypes.string.isRequired,
      subText: PropTypes.string.isRequired,
    }),
  ),
};

ComponentScreenshots.defaultProps = {
  screenshots: [],
};

export default ComponentScreenshots;
