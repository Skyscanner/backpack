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

import { PureComponent } from 'react';

import BpkInput from '../../bpk-component-input';
import { cssModules, getDataComponentAttribute } from '../../bpk-react-utils';

import STYLES from './BpkInputField.module.scss';

const getClassName = cssModules(STYLES);

export type Props = DefaultProps;

type DefaultProps = {
  id: string;
  label: string;
  value: string | number;
  focus: boolean;
  index: number;
  name: string;
  [key: string]: any;
}

class BpkInputField extends PureComponent<Props> {
  static defaultProps = {
    value: '',
    name: ''
  };

  componentDidUpdate(prevProps: Props) {
    const { focus } = this.props;
    if (prevProps.focus !== focus && this.input && focus) {
      this.input.focus();
      this.input.select();
    }
  }

  private input: HTMLInputElement | null = null;

  render() {
    const { focus, id, index, label, name, value, ...rest } = this.props;
    return (
      <div key={index} className={getClassName('bpk-input-field')} {...getDataComponentAttribute('InputField')}>
        <BpkInput
          id={id}
          autoComplete="off"
          name={name}
          maxLength={1}
          aria-label={`${label} ${index}`}
          inputRef={(input: HTMLInputElement) => {
            this.input = input;
          }}
          value={value}
          {...rest}
        />
      </div>
    );
  }
}

export default BpkInputField;
