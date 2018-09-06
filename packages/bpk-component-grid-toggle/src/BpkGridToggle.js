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
import { cssModules } from 'bpk-react-utils';

import { BpkButtonLink } from 'bpk-component-link';

import STYLES from './bpk-grid-toggle.css';

const getClassName = cssModules(STYLES);

const GRID_CLASS_NAME = getClassName('bpk-vertical-grid--on');

class BpkGridToggle extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      gridEnabled: false,
    };
  }

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    document
      .querySelector(this.props.targetContainer)
      .classList.remove(GRID_CLASS_NAME);
    document.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = e => {
    if (e.ctrlKey && e.metaKey && e.key.toLowerCase() === 'g') {
      this.toggleGrid(e);
    }
  };

  toggleGrid = e => {
    e.preventDefault();

    document
      .querySelector(this.props.targetContainer)
      .classList.toggle(GRID_CLASS_NAME);

    this.setState(state => ({
      gridEnabled: !state.gridEnabled,
    }));
  };

  render() {
    const { className } = this.props;
    const { gridEnabled } = this.state;
    const onOrOff = gridEnabled ? 'off' : 'on';

    return (
      <BpkButtonLink
        title="Keyboard Shortcut: ctrl + cmd + g"
        onClick={this.toggleGrid}
        className={className}
      >
        Baseline grid {onOrOff}
      </BpkButtonLink>
    );
  }
}

BpkGridToggle.propTypes = {
  targetContainer: PropTypes.string,
  className: PropTypes.string,
};

BpkGridToggle.defaultProps = {
  targetContainer: 'body',
  className: null,
};

export default BpkGridToggle;
