import PropTypes from 'prop-types';
import React from 'react';
import { cssModules } from 'bpk-react-utils';

import { BpkButtonLink } from 'bpk-component-link';

import STYLES from './bpk-grid-toggle.scss';

const getClassName = cssModules(STYLES);

const GRID_CLASS_NAME = getClassName('bpk-vertical-grid--on');

class BpkGridToggle extends React.Component {
  constructor(props) {
    super(props);

    this.toggleGrid = this.toggleGrid.bind(this);

    this.state = {
      gridEnabled: false,
    };
  }

  componentWillUnmount() {
    document.querySelector(this.props.targetContainer)
      .classList.remove(GRID_CLASS_NAME);
  }

  toggleGrid(e) {
    e.preventDefault();

    document.querySelector(this.props.targetContainer)
      .classList.toggle(GRID_CLASS_NAME);

    this.setState({
      gridEnabled: !this.state.gridEnabled,
    });
  }

  render() {
    const { gridEnabled } = this.state;
    const onOrOff = gridEnabled ? 'off' : 'on';

    return <BpkButtonLink onClick={this.toggleGrid}>Toggle baseline grid {onOrOff}</BpkButtonLink>;
  }
}

BpkGridToggle.propTypes = {
  targetContainer: PropTypes.string,
};

BpkGridToggle.defaultProps = {
  targetContainer: 'body',
};

export default BpkGridToggle;

