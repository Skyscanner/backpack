/*
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2016 Skyscanner Ltd
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
import { Component } from 'react';

import { BpkButtonLink } from '../../bpk-component-link';
import { cssModules } from '../../bpk-react-utils';

import STYLES from './BpkGridToggle.module.scss';

const getClassName = cssModules(STYLES);

const GRID_CLASS_NAME = getClassName('bpk-vertical-grid--on');

class BpkGridToggle extends Component {
  constructor(props: any) {
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
      // @ts-expect-error TS(2339) FIXME: Property 'targetContainer' does not exist on type ... Remove this comment to see the full error message
      .querySelector(this.props.targetContainer)
      .classList.remove(GRID_CLASS_NAME);
    document.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = (e: any) => {
    if (e.ctrlKey && e.metaKey && e.key.toLowerCase() === 'g') {
      this.toggleGrid(e);
    }
  };

  toggleGrid = (e: any) => {
    e.preventDefault();

    document
      // @ts-expect-error TS(2339) FIXME: Property 'targetContainer' does not exist on type ... Remove this comment to see the full error message
      .querySelector(this.props.targetContainer)
      .classList.toggle(GRID_CLASS_NAME);

    this.setState((state) => ({
      // @ts-expect-error TS(2339) FIXME: Property 'gridEnabled' does not exist on type 'Rea... Remove this comment to see the full error message
      gridEnabled: !state.gridEnabled,
    }));
  };

  render() {
    // @ts-expect-error TS(2339) FIXME: Property 'className' does not exist on type 'Reado... Remove this comment to see the full error message
    const { className } = this.props;
    // @ts-expect-error TS(2339) FIXME: Property 'gridEnabled' does not exist on type 'Rea... Remove this comment to see the full error message
    const { gridEnabled } = this.state;
    const onOrOff = gridEnabled ? 'off' : 'on';

    return (
      <span className={className}>
        <BpkButtonLink
          // @ts-expect-error TS(2322) FIXME: Type '{ children: string[]; title: string; onClick... Remove this comment to see the full error message
          title="Keyboard Shortcut: ctrl + cmd + g"
          onClick={this.toggleGrid}
        >
          Baseline grid {onOrOff}
        </BpkButtonLink>
      </span>
    );
  }
}

// @ts-expect-error TS(2339) FIXME: Property 'propTypes' does not exist on type 'typeo... Remove this comment to see the full error message
BpkGridToggle.propTypes = {
  targetContainer: PropTypes.string,
  className: PropTypes.string,
};

// @ts-expect-error TS(2339) FIXME: Property 'defaultProps' does not exist on type 'ty... Remove this comment to see the full error message
BpkGridToggle.defaultProps = {
  targetContainer: 'body',
  className: null,
};

export default BpkGridToggle;
