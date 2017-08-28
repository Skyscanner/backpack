/*
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2017 Skyscanner Ltd
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
import BpkInput from 'bpk-component-input';
import BpkChip from './BpkChip';

import STYLES from './bpk-chip-input.scss';

const getClassName = cssModules(STYLES);

class BpkChipInput extends React.Component {
  constructor(props) {
    super(props);

    this.textInput = null;

    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.selectLast = this.selectLast.bind(this);
    this.moveSelectLeft = this.moveSelectLeft.bind(this);
    this.moveSelectRight = this.moveSelectRight.bind(this);
    this.removeSelected = this.removeSelected.bind(this);

    this.deleteKeyPressed = this.deleteKeyPressed.bind(this);
    this.backspaceKeyPressed = this.backspaceKeyPressed.bind(this);
    this.leftKeyPressed = this.leftKeyPressed.bind(this);
    this.rightKeyPressed = this.rightKeyPressed.bind(this);
    this.enterKeyPressed = this.enterKeyPressed.bind(this);

    this.onComponentFocused = this.onComponentFocused.bind(this);
    this.onComponentBlurred = this.onComponentBlurred.bind(this);
    this.onInputFocused = this.onInputFocused.bind(this);
    this.onInputBlurred = this.onInputBlurred.bind(this);
    this.focusInput = this.focusInput.bind(this);

    this.state = {
      inputFocused: false,
      componentFocused: false,
    };
  }

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyDown);
  }

  onComponentFocused() {
    this.setState({ componentFocused: true });
  }

  onComponentBlurred() {
    this.setState({ componentFocused: false });
  }

  onInputFocused() {
    this.setState({ inputFocused: true });
  }

  onInputBlurred() {
    this.setState({ inputFocused: false });
  }

  getSelectedIndex() {
    return this.props.values.indexOf(this.props.selectedItem);
  }

  enterKeyPressed() {
    if (this.props.textInputValue !== '') {
      this.props.valueAdded(this.props.textInputValue);
    }
    this.props.onTextInputChanged('');
  }

  rightKeyPressed() {
    if (this.props.selectedItem === this.props.values[this.props.values.length - 1]) {
      this.props.onSelectionChanged(null);
      this.focusInput();
    } else if (this.props.selectedItem != null) {
      this.moveSelectRight();
    }
  }

  focusInput() {
    console.log(this.myTextInput);
    if (this.myTextInput !== null) {
      this.myTextInput.focus();
    }
  }

  leftKeyPressed() {
    if (this.props.selectedItem === null && this.props.textInputValue === '') {
      this.selectLast();
    } else if (this.props.selectedItem != null && this.getSelectedIndex() !== 0) {
      this.moveSelectLeft();
    }
  }

  backspaceKeyPressed() {
    if (this.props.selectedItem != null) {
      this.removeSelected();
    } else if (this.props.selectedItem === null && this.props.textInputValue === '') {
      this.selectLast();
    }
  }

  deleteKeyPressed() {
    if (this.props.selectedItem != null) {
      this.removeSelected();
    }
  }

  handleKeyDown(event) {
    if (event.keyCode === 8) {
      this.backspaceKeyPressed();
    } else if (event.keyCode === 46) {
      this.deleteKeyPressed();
    } else if (event.keyCode === 37) {
      this.leftKeyPressed();
    } else if (event.keyCode === 39) {
      this.rightKeyPressed();
    } else if (event.keyCode === 13 || event.keyCode === 9) {
      this.enterKeyPressed();
    }
  }

  removeSelected() {
    this.props.valueRemoved(this.props.selectedItem);
    this.props.onSelectionChanged(null);
  }

  moveSelectLeft() {
    this.props.onSelectionChanged(this.props.values[this.getSelectedIndex() - 1]);
  }

  moveSelectRight() {
    this.props.onSelectionChanged(this.props.values[this.getSelectedIndex() + 1]);
  }

  selectLast() {
    this.props.onSelectionChanged(this.props.values[this.props.values.length - 1]);
  }

  removeValue(chipName) {
    if (this.props.selectedItem === chipName) {
      this.props.onSelectionChanged(null);
    }
    this.props.valueRemoved(chipName);
  }


  render() {
    const classNames = [getClassName('bpk-chip-input')];
    const inputClassNames = [getClassName('bpk-chip-input__input')];
    const {
      values, className, placeholderText,
      textInputValue, onTextInputChanged,
      selectedItem, onSelectionChanged,
      valueAdded, valueRemoved, closeLabel,
      ...rest
    } = this.props;

    if (className) { classNames.push(className); }

    let inputTextValue = null;
    if ((this.state.inputFocused && selectedItem === null) || textInputValue !== '') {
      inputTextValue = textInputValue;
    } else {
      inputClassNames.push(getClassName('bpk-chip-input__input--placeholder'));
      inputTextValue = placeholderText;
    }

    // let inputTextValue = textInputValue === '' ? placeholderText : textInputValue;
    // if (this.state.inputFocused && selectedItem === null && inputTextValue === placeholderText) {
    //   inputTextValue = '';
    // } else {
    // }

    return (
      <div
        className={classNames.join(' ')}
        onFocus={() => this.onComponentFocused()}
        onBlur={() => this.onComponentBlurred()}
        {...rest}
      >
        {values.map((chipName, index) => (
          <BpkChip
            key={index.toString()}
            onClick={() => onSelectionChanged(chipName)}
            className={getClassName('bpk-chip-input__chip')}
            selected={selectedItem === chipName}
            onClose={() => this.removeValue(chipName)}
            closeLabel={closeLabel(chipName)}
          >
            {chipName.toString()}
          </BpkChip>
        ))}
        <BpkInput
          ref={(i) => { this.textInput = i; }}
          onFocus={() => this.onInputFocused()}
          onBlur={() => this.onInputBlurred()}
          className={inputClassNames.join(' ')}
          id="input"
          name="input"
          value={inputTextValue}
          onChange={e => onTextInputChanged(e.target.value)}
          readOnly={selectedItem !== null}
          onClick={() => onSelectionChanged(null)}
        />
      </div>
    );
  }
}

BpkChipInput.propTypes = {
  placeholderText: PropTypes.string.isRequired,
  textInputValue: PropTypes.string.isRequired,
  valueAdded: PropTypes.func.isRequired,
  closeLabel: PropTypes.func.isRequired,
  valueRemoved: PropTypes.func.isRequired,
  values: PropTypes.arrayOf(PropTypes.string).isRequired,
  className: PropTypes.string,
  onSelectionChanged: PropTypes.func,
  onTextInputChanged: PropTypes.func,
  selectedItem: PropTypes.string,
};

BpkChipInput.defaultProps = {
  className: null,
  onSelectionChanged: null,
  onTextInputChanged: null,
  selectedItem: null,
};

export default BpkChipInput;
