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

import PropTypes from 'prop-types';
import React from 'react';
import BpkContentContainer from 'bpk-component-content-container';
import BpkHorizontalNav, {
  BpkHorizontalNavItem,
} from 'bpk-component-horizontal-nav';
import BpkSmallMobileIcon from 'bpk-component-icon/sm/mobile';
import BpkSmallWindowIcon from 'bpk-component-icon/sm/window';
import { withButtonAlignment } from 'bpk-component-icon';
import { cssModules } from 'bpk-react-utils';

import Heading from './../Heading';
import Blurb from './Blurb';
import STYLES from './DocsPageWrapper.scss';

const getClassName = cssModules(STYLES);

const AlignedBpkSmallMobileIcon = withButtonAlignment(BpkSmallMobileIcon);
const AlignedBpkSmallWindowIcon = withButtonAlignment(BpkSmallWindowIcon);

const childrenPropType = PropTypes.oneOfType([
  PropTypes.arrayOf(PropTypes.node),
  PropTypes.node,
]);

const contentShape = PropTypes.oneOfType([PropTypes.string, childrenPropType]);

class DocsPageWrapper extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    blurb: contentShape,
    webSubpage: PropTypes.element,
    nativeSubpage: PropTypes.element,
  };

  static defaultProps = {
    blurb: null,
    webSubpage: null,
    nativeSubpage: null,
  };

  constructor(props) {
    super(props);

    this.state = {
      selected: this.props.nativeSubpage ? 'native' : 'web',
    };
  }

  componentWillMount = () => {
    if (typeof window !== 'undefined') {
      const url = new URL(window.location);
      const platform = url.searchParams.get('platform');
      if (platform) {
        this.state = {
          selected: platform === 'native' ? 'native' : 'web',
        };
      }
    }
  };

  onClick = selected => {
    if (typeof window !== 'undefined') {
      const simpleWindowLocation = `${window.location}`.split('?')[0];
      window.history.pushState(
        `platform${selected}`,
        'Title',
        `${simpleWindowLocation}?platform=${selected}`,
      );
    }
    this.setState({ selected });
  };

  render() {
    const { blurb, nativeSubpage, title, webSubpage } = this.props;

    return (
      <BpkContentContainer className={getClassName('bpkdocs-page-wrapper')}>
        <div className={getClassName('bpkdocs-page-wrapper__inner')}>
          <Heading level="h1">{title}</Heading>
          {blurb && <Blurb content={blurb} />}
        </div>
        <div>
          <BpkHorizontalNav
            className={getClassName('bpkdocs-page-wrapper__platform-switcher')}
          >
            <BpkHorizontalNavItem
              name="native"
              disabled={!nativeSubpage}
              selected={this.state.selected === 'native'}
              onClick={() => this.onClick('native')}
            >
              <AlignedBpkSmallMobileIcon
                className={getClassName('bpkdocs-page-wrapper__platform-icon')}
              />
              Native
            </BpkHorizontalNavItem>
            <BpkHorizontalNavItem
              name="web"
              disabled={!webSubpage}
              selected={this.state.selected === 'web'}
              onClick={() => this.onClick('web')}
            >
              <AlignedBpkSmallWindowIcon
                className={getClassName('bpkdocs-page-wrapper__platform-icon')}
              />
              Web
            </BpkHorizontalNavItem>
          </BpkHorizontalNav>
          <div>
            {this.state.selected === 'native' && nativeSubpage}
            {this.state.selected === 'web' && webSubpage}
          </div>
        </div>
      </BpkContentContainer>
    );
  }
}

export default DocsPageWrapper;
