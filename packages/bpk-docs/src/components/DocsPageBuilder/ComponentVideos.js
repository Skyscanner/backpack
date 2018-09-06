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

/* eslint-disable jsx-a11y/media-has-caption */
import React from 'react';
import PropTypes from 'prop-types';
import BpkText from 'bpk-component-text';
import BpkPanel from 'bpk-component-panel';
import { cssModules } from 'bpk-react-utils';

import STYLES from './ComponentVideos.css';

const getClassName = cssModules(STYLES);

let counter = 0;
const generateId = (title = '') => {
  counter += 1;
  return `${title.toLowerCase().replace(' ', '-')}-${counter}`;
};

const ComponentVideo = ({ title, subText, src, ...rest }) => {
  const subTextId = generateId(title);

  return (
    <div key={title} className={getClassName('bpkdocs-component-videos__item')}>
      <dt className={getClassName('bpkdocs-component-videos__item-title')}>
        <BpkText tagName="h3">{title}</BpkText>
      </dt>
      <dd
        className={getClassName(
          'bpkdocs-component-videos__item-video-container',
        )}
      >
        <BpkPanel>
          <video
            playsInline
            muted
            loop
            controls
            className={getClassName('bpkdocs-component-videos__item-video')}
            {...rest}
          >
            <source src={src} type="video/mp4" />
          </video>
        </BpkPanel>
        <BpkText id={subTextId} textStyle="xs">
          {subText}
        </BpkText>
      </dd>
    </div>
  );
};

ComponentVideo.propTypes = {
  src: PropTypes.string.isRequired,
  subText: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

const ComponentVideos = ({ videos, ...rest }) => (
  <dl className={getClassName('bpkdocs-component-videos')} {...rest}>
    {videos.map(ComponentVideo)}
  </dl>
);

ComponentVideos.propTypes = {
  videos: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      src: PropTypes.string.isRequired,
      width: PropTypes.number.isRequired,
      subText: PropTypes.string.isRequired,
    }),
  ),
};

ComponentVideos.defaultProps = {
  videos: [],
};

export default ComponentVideos;
