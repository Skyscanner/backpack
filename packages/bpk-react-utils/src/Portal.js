import { Component, PropTypes } from 'react';
import { render, unmountComponentAtNode, findDOMNode } from 'react-dom';

class Portal extends Component {
  constructor() {
    super();

    this.portalElement = null;

    this.close = this.close.bind(this);
    this.onBodyClick = this.onBodyClick.bind(this);
  }

  componentDidMount() {
    if (this.props.isOpen) {
      this.open();
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.isOpen) {
      if (!this.props.isOpen) {
        this.open();
      }

      return;
    }

    if (this.props.isOpen) {
      if (nextProps.beforeClose) {
        nextProps.beforeClose(this.close);
      } else {
        this.close();
      }
    }
  }

  componentDidUpdate() {
    if (this.portalElement) {
      render(this.props.children, this.portalElement);
    }
  }

  componentWillUnmount() {
    this.close();
  }

  onBodyClick(e) {
    const notLeftClick = e.button && e.button !== 0;

    const targetElement = this.getTargetElement();
    const isTargetClick = targetElement &&
      (e.target === targetElement || targetElement.contains(e.target));

    const isPortalClick = this.portalElement &&
      (e.target === this.portalElement || this.portalElement.contains(e.target));

    if (notLeftClick || isTargetClick || isPortalClick) {
      return;
    }

    this.props.onClose();
  }

  getTargetElement() {
    return this.props.target && findDOMNode(this);
  }

  open() {
    if (this.portalElement) {
      return;
    }

    this.portalElement = document.createElement('div');
    document.body.appendChild(this.portalElement);
    document.body.addEventListener('click', this.onBodyClick, false);

    this.componentDidUpdate();
    this.props.onOpen(this.portalElement, this.getTargetElement());
  }

  close() {
    if (!this.portalElement) {
      return;
    }

    unmountComponentAtNode(this.portalElement);
    document.body.removeChild(this.portalElement);
    document.body.removeEventListener('click', this.onBodyClick, false);
    this.portalElement = null;
  }

  render() {
    return this.props.target;
  }
}

Portal.propTypes = {
  children: PropTypes.node.isRequired,
  isOpen: PropTypes.bool.isRequired,
  target: PropTypes.node,
  onOpen: PropTypes.func,
  onClose: PropTypes.func,
  beforeClose: PropTypes.func, // eslint-disable-line react/no-unused-prop-types
};

Portal.defaultProps = {
  target: null,
  onOpen: () => null,
  onClose: () => null,
  beforeClose: null,
};

export default Portal;
