import BpkButton from 'bpk-component-button';
import { storiesOf } from '@kadira/storybook';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

import AnimateHeight from './index';

class AnimateHeightContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      height: this.props.fromHeight,
    };

    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    this.setState((prevState) => {
      const height = prevState.height !== this.props.fromHeight
        ? this.props.fromHeight
        : this.props.toHeight;

      return { height };
    });
  }

  render() {
    const { fromHeight, toHeight, ...rest } = this.props;
    return (
      <div>
        <AnimateHeight {...rest} height={this.state.height} />
        <br />
        <BpkButton onClick={this.onClick}>Toggle height!</BpkButton>
      </div>
    );
  }
}


AnimateHeightContainer.propTypes = {
  fromHeight: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
  toHeight: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
};

storiesOf('bpk-animate-height', module)
  .add('Example', () => (
    <AnimateHeightContainer fromHeight="auto" toHeight={0} duration={300}>
      Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum
      sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.
    </AnimateHeightContainer>
  ));
