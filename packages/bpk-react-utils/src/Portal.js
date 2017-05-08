import assign from 'object-assign';
import PropTypes from 'prop-types';
import { Component } from 'react';
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

    if (this.props.targetRef) {
      this.props.targetRef(this.getTargetElement());
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.isOpen) {
      if (!prevProps.isOpen) {
        this.open();
        return;
      }
    } else if (prevProps.isOpen) {
      if (this.props.beforeClose) {
        this.props.beforeClose(this.close);
      } else {
        this.close();
      }
      return;
    }

    this.renderPortal();
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
    if (typeof this.props.target === 'function') {
      return this.props.target();
    }
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

    if (this.props.style) {
      assign(this.portalElement.style, this.props.style);
    }
    if (this.props.className) {
      this.portalElement.className = this.props.className;
    }

    this.renderPortal();
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

  renderPortal() {
    if (this.portalElement) {
      render(this.props.children, this.portalElement, () => {
        if (this.props.isOpen) {
          this.props.onRender(this.portalElement, this.getTargetElement());
        }
      });
    }
  }

  render() {
    return typeof this.props.target === 'function' ? null : this.props.target;
  }
}

Portal.propTypes = {
  children: PropTypes.node.isRequired,
  isOpen: PropTypes.bool.isRequired,
  target: PropTypes.oneOfType([PropTypes.func, PropTypes.element]),
  onOpen: PropTypes.func,
  onClose: PropTypes.func,
  onRender: PropTypes.func,
  targetRef: PropTypes.func,
  beforeClose: PropTypes.func, // eslint-disable-line react/no-unused-prop-types
  style: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  className: PropTypes.string,
};

Portal.defaultProps = {
  target: null,
  onOpen: () => null,
  onClose: () => null,
  onRender: () => null,
  targetRef: null,
  beforeClose: null,
  style: null,
  className: null,
};

export default Portal;
