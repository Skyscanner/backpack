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
import type { MouseEvent } from 'react';
import { Component } from 'react';

import BpkLink from '../../bpk-component-link';
import { cssModules } from '../../bpk-react-utils';

import STYLES from './BpkGridToggle.module.scss';

const getClassName = cssModules(STYLES);

const GRID_CLASS_NAME = getClassName('bpk-vertical-grid--on');

type Props = {
  targetContainer?: string;
  className?: string | null;
};

type State = {
  gridEnabled: boolean;
};

class BpkGridToggle extends Component<Props, State> {
  static defaultProps = {
    targetContainer: 'body',
    className: null,
  };

  constructor(props: Props) {
    super(props);

    this.state = {
      gridEnabled: false,
    };
  }

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    const target = document.querySelector(this.props.targetContainer ?? 'body');
    if (target) {
      target.classList.remove(GRID_CLASS_NAME);
    }
    document.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = (e: KeyboardEvent) => {
    if (e.ctrlKey && e.metaKey && e.key.toLowerCase() === 'g') {
      this.toggleGrid(e);
    }
  };

  toggleGrid = (e: KeyboardEvent | MouseEvent) => {
    e.preventDefault();

    const target = document.querySelector(this.props.targetContainer ?? 'body');
    if (target) {
      target.classList.toggle(GRID_CLASS_NAME);
    }

    this.setState((state) => ({
      gridEnabled: !state.gridEnabled,
    }));
  };

  render() {
    const { className } = this.props;
    const { gridEnabled } = this.state;
    const onOrOff = gridEnabled ? 'off' : 'on';

    return (
      <span className={className ?? undefined}>
        <BpkLink
          as="button"
          title="Keyboard Shortcut: ctrl + cmd + g"
          onClick={this.toggleGrid}
        >
          Baseline grid {onOrOff}
        </BpkLink>
      </span>
    );
  }
}

// @ts-expect-error - propTypes are kept for backwards compatibility
BpkGridToggle.propTypes = {
  targetContainer: PropTypes.string,
  className: PropTypes.string,
};

export default BpkGridToggle;
