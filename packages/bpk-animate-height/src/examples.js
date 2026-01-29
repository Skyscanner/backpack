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

/* @flow strict */

import { Component } from 'react';
import type { Node } from 'react';

import AnimateHeight, { BpkButton } from '../index';

type Props = {
  fromHeight: string | number,
  toHeight: string | number,
  buttonText: Node,
};
type State = {
  height: string | number,
};

class AnimateHeightExample extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      height: this.props.fromHeight,
    };
  }

  onClick = () => {
    this.setState((prevState) => {
      const height =
        prevState.height !== this.props.fromHeight
          ? this.props.fromHeight
          : this.props.toHeight;

      return { height };
    });
  };

  render() {
    const { buttonText, fromHeight, toHeight, ...rest } = this.props;
    return (
      <div>
        <AnimateHeight {...rest} height={this.state.height} />
        <br />
        <BpkButton onClick={this.onClick}>{buttonText}</BpkButton>
      </div>
    );
  }
}

export default AnimateHeightExample;
