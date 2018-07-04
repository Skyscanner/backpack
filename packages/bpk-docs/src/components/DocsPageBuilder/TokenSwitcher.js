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

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import BpkHorizontalNav, {
  BpkHorizontalNavItem,
} from 'bpk-component-horizontal-nav';

const platforms = {
  web: {
    id: 'web',
    name: 'Web',
  },
  ios: {
    id: 'ios',
    name: 'iOS',
  },
  android: {
    id: 'android',
    name: 'Android',
  },
};

const nextId = () => {
  let id = 0;
  return () => id++; // eslint-disable-line no-plusplus
};

const listeners = {};

const addListener = (switcher, callback) => {
  const switcherListeners = listeners[`${switcher.id}`] || [];
  switcherListeners.push(callback);
  listeners[`${switcher.id}`] = switcherListeners;
};

const removeListener = (switcher, toRemove) => {
  const switcherListeners = listeners[`${switcher.id}`] || [];
  listeners[`${switcher.id}`] = switcherListeners.filter(
    callback => callback !== toRemove,
  );
};

const onSwitch = (switcher, id) => {
  const switcherListeners = listeners[`${switcher.id}`] || [];
  switcherListeners.forEach(listener => listener(id));
};

class TokenSwitcher extends Component {
  constructor(props) {
    super(props);
    this.internalId = nextId();
    this.state = {
      selectedPlatform: platforms.web.id,
    };
  }

  componentWillUnmount() {
    delete listeners[`${this.id}`];
  }

  onChange = selectedPlatform => {
    onSwitch(this.id, selectedPlatform);
    this.setState(() => ({
      selectedPlatform,
    }));
  };

  get id() {
    return this.internalId;
  }

  render() {
    const { className } = this.props;
    return (
      <BpkHorizontalNav className={className}>
        {Object.keys(platforms).map(platform => {
          const { id, name } = platforms[platform];

          return (
            <BpkHorizontalNavItem
              key={id}
              selected={this.state.selectedPlatform === id}
              onClick={() => this.onChange(id)}
            >
              {name}
            </BpkHorizontalNavItem>
          );
        })}
      </BpkHorizontalNav>
    );
  }
}

TokenSwitcher.propTypes = {
  className: PropTypes.string,
};

TokenSwitcher.defaultProps = {
  className: null,
};

export default TokenSwitcher;

export const connect = (tokenSwitcher, table) => {
  /* eslint-disable react/no-multi-comp, react/no-this-in-sfc */
  class SwitchAwareTable extends Component {
    constructor(props) {
      super(props);

      this.state = { platform: null };
      this.onSwitch = platform => this.setState({ platform });

      addListener(tokenSwitcher, this.onSwitch);
    }

    componentWillUnmount() {
      removeListener(tokenSwitcher, this.onSwitch);
    }

    render() {
      const { platform } = this.state;

      return React.cloneElement(table, {
        platform: platform || platforms.web.id,
      });
    }
  }

  return <SwitchAwareTable />;
  /* eslint-enable */
};
