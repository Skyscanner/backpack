import React from 'react';
import { BpkButtonLink } from 'bpk-component-link';
import { getHtmlElement, DIRECTIONS, DIRECTION_CHANGE_EVENT } from './utils';

const getDirection = () => getHtmlElement().dir || DIRECTIONS.LTR;

const setDirection = (direction) => {
  const htmlElement = getHtmlElement();

  htmlElement.dir = direction;
  htmlElement.dispatchEvent(new Event(DIRECTION_CHANGE_EVENT));
};

class BpkRtlToggle extends React.Component {
  constructor(props) {
    super(props);

    this.toggleRtl = this.toggleRtl.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);

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

  handleKeyDown(e) {
    if (e.ctrlKey && e.metaKey && e.key.toLowerCase() === 'r') {
      this.toggleRtl(e);
    }
  }

  toggleRtl(e) {
    e.preventDefault();

    const direction = getDirection() === DIRECTIONS.RTL ? DIRECTIONS.LTR : DIRECTIONS.RTL;

    setDirection(direction);

    this.setState({ direction });
  }

  render() {
    const onOrOff = this.state.direction === DIRECTIONS.RTL ? 'off' : 'on';

    return (
      <BpkButtonLink
        title="Keyboard Shortcut: ctrl + cmd + r"
        onClick={this.toggleRtl}
      >
        Toggle RTL {onOrOff}
      </BpkButtonLink>
    );
  }
}

export default BpkRtlToggle;
