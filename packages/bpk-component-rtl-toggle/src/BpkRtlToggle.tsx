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

import type { MouseEvent } from 'react';
import { Component } from 'react';

import BpkLink from '../../bpk-component-link';

import { getHtmlElement, DIRECTIONS, DIRECTION_CHANGE_EVENT } from './utils';

const getDirection = () => {
  const htmlElement = getHtmlElement();
  return htmlElement instanceof HTMLElement ? htmlElement.dir : DIRECTIONS.LTR;
};

const setDirection = (direction: string) => {
  const htmlElement = getHtmlElement();

  if (htmlElement instanceof HTMLElement) {
    htmlElement.dir = direction;
    htmlElement.dispatchEvent(new Event(DIRECTION_CHANGE_EVENT));
  }
};

type State = {
  direction: string;
};

type Props = {};

type InteractionEvents =
  | KeyboardEvent
  | MouseEvent<HTMLButtonElement>
  | TouchEvent;

class BpkRtlToggle extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      direction: getDirection(),
    };
  }

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = (e: KeyboardEvent) => {
    if (e.ctrlKey && e.metaKey && e.key.toLowerCase() === 'r') {
      this.toggleRtl(e);
    }
  };

  toggleRtl = (e: InteractionEvents) => {
    e.preventDefault();

    const direction =
      getDirection() === DIRECTIONS.RTL ? DIRECTIONS.LTR : DIRECTIONS.RTL;

    setDirection(direction);

    this.setState({ direction });
  };

  render() {
    const onOrOff = this.state.direction === DIRECTIONS.RTL ? 'off' : 'on';

    return (
      <BpkLink
        as="button"
        title="Keyboard Shortcut: ctrl + cmd + r"
        onClick={this.toggleRtl}
      >
        RTL {onOrOff}
      </BpkLink>
    );
  }
}

export default BpkRtlToggle;
