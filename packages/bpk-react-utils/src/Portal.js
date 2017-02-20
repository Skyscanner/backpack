import { Component, PropTypes } from 'react';
import { render, unmountComponentAtNode, findDOMNode } from 'react-dom';

const KEYCODES = {
  ESCAPE: 27,
};

class Portal extends Component {
  constructor() {
    super();

    this.portalElement = null;

    this.close = this.close.bind(this);
    this.onDocumentClick = this.onDocumentClick.bind(this);
    this.onDocumentKeyDown = this.onDocumentKeyDown.bind(this);
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

  onDocumentClick(e) {
    const isNotLeftClick = e.button && e.button !== 0;

    const targetElement = this.getTargetElement();
    const isTargetClick = targetElement &&
      (e.target === targetElement || targetElement.contains(e.target));

    const isPortalClick = this.portalElement &&
      (e.target === this.portalElement || this.portalElement.contains(e.target));

    if (isNotLeftClick || isTargetClick || isPortalClick) {
      return;
    }

    this.props.onClose();
  }

  onDocumentKeyDown(e) {
    if (e.keyCode === KEYCODES.ESCAPE && this.props.isOpen) {
      this.props.onClose();
    }
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
    document.addEventListener('mouseup', this.onDocumentClick, false);
    document.addEventListener('touchend', this.onDocumentClick, false);
    document.addEventListener('keydown', this.onDocumentKeyDown, false);

    this.componentDidUpdate();
    this.props.onOpen(this.portalElement, this.getTargetElement());
  }

  close() {
    if (!this.portalElement) {
      return;
    }

    unmountComponentAtNode(this.portalElement);
    document.body.removeChild(this.portalElement);
    document.removeEventListener('mouseup', this.onDocumentClick, false);
    document.removeEventListener('touchend', this.onDocumentClick, false);
    document.removeEventListener('keydown', this.onDocumentKeyDown, false);
    this.portalElement = null;
  }

  render() {
    return this.props.target;
  }
}

Portal.propTypes = {
  children: PropTypes.node.isRequired,
  isOpen: PropTypes.bool.isRequired,
  target: PropTypes.element,
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
