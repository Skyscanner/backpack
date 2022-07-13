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

import { Component } from 'react';
import { createPortal } from 'react-dom';
import assign from 'object-assign';
import PropTypes from 'prop-types';

const KEYCODES = {
  ESCAPE: 'Escape',
};

class Portal extends Component {
  constructor() {
    super();

    this.portalElement = null;

    this.state = {
      isVisible: false,
    };

    // shouldClose is used to keep track of the user's mouse-down events in order to
    // prevent the dialog closing if the mouse leaves / enters the portal during the click
    this.shouldClose = false;

    this.close = this.close.bind(this);
    this.onDocumentMouseUp = this.onDocumentMouseUp.bind(this);
    this.onDocumentMouseDown = this.onDocumentMouseDown.bind(this);
    this.onDocumentKeyDown = this.onDocumentKeyDown.bind(this);
    this.onDocumentMouseMove = this.onDocumentMouseMove.bind(this);
    this.getClickEventProperties = this.getClickEventProperties.bind(this);
    this.supportsPassiveEvents = this.supportsPassiveEvents.bind(this);
  }

  componentDidMount() {
    if (this.props.isOpen) {
      this.open();
    }

    if (this.props.targetRef) {
      this.props.targetRef(this.getTargetElement());
    }
  }

  // When the consumer updates `isOpen` to be `false`, we
  // call their beforeClose function so that they can trigger the close.
  // If they don't provide `beforeClose` we just call `close` directly.
  componentDidUpdate(prevProps) {
    if (this.props.isOpen) {
      if (!prevProps.isOpen) {
        this.open();
      } else {
        this.props.onRender(this.portalElement, this.getTargetElement());
      }
    } else if (prevProps.isOpen) {
      if (this.props.beforeClose) {
        this.props.beforeClose(this.close);
      } else {
        this.close();
      }
    }
  }

  componentWillUnmount() {
    this.close();
  }

  onDocumentMouseDown(event) {
    const clickEventProperties = this.getClickEventProperties(event);
    if (
      clickEventProperties.isNotLeftClick ||
      clickEventProperties.isTargetClick ||
      clickEventProperties.isPortalClick
    ) {
      this.shouldClose = false;
      return;
    }

    this.shouldClose = true;
  }

  onDocumentMouseUp(event) {
    const clickEventProperties = this.getClickEventProperties(event);

    if (
      clickEventProperties.isNotLeftClick ||
      clickEventProperties.isTargetClick ||
      clickEventProperties.isPortalClick
    ) {
      this.shouldClose = false;
      return;
    }

    if (this.shouldClose) {
      // `onClose` tells the consumer that they should change `isOpen` to false.
      // Once the consumer has responded to `onClose`, `beforeClose` and `close` will be called.
      this.props.onClose(event, { source: 'DOCUMENT_CLICK' });
    }
  }

  onDocumentKeyDown(event) {
    if (
      event.key === KEYCODES.ESCAPE &&
      this.props.isOpen &&
      this.props.closeOnEscPressed
    ) {
      // `onClose` tells the consumer that they should change `isOpen` to false.
      // Once the consumer has responded to `onClose`, `beforeClose` and `close` will be called.
      this.props.onClose(event, { source: 'ESCAPE' });
    }
  }

  onDocumentMouseMove() {
    this.shouldClose = false;
  }

  getClickEventProperties(event) {
    const isNotLeftClick = event.button && event.button !== 0;

    const targetElement = this.getTargetElement();
    const isTargetClick =
      targetElement &&
      event.target instanceof Node &&
      (event.target === targetElement || targetElement.contains(event.target));

    const isPortalClick =
      this.portalElement &&
      event.target instanceof Node &&
      (event.target === this.portalElement ||
        this.portalElement.contains(event.target));

    return {
      isNotLeftClick: !!isNotLeftClick,
      isTargetClick: !!isTargetClick,
      isPortalClick: !!isPortalClick,
    };
  }

  getTargetElement() {
    return typeof this.props.target === 'function'
      ? this.props.target()
      : this.props.target?.ref.current;
  }

  getRenderTarget() {
    const target =
      typeof this.props.renderTarget === 'function'
        ? this.props.renderTarget()
        : this.props.renderTarget;

    if (target) {
      return target;
    }
    if (document.body) {
      return document.body;
    }

    throw new Error('Render target and fallback unavailable');
  }

  open() {
    if (this.portalElement) {
      return;
    }

    this.portalElement = document.createElement('div');
    this.getRenderTarget().appendChild(this.portalElement);

    const passiveArgs = this.supportsPassiveEvents()
      ? { passive: true }
      : false;
    document.addEventListener(
      'touchstart',
      this.onDocumentMouseDown,
      passiveArgs,
    );
    document.addEventListener(
      'touchmove',
      this.onDocumentMouseMove,
      passiveArgs,
    );
    document.addEventListener('touchend', this.onDocumentMouseUp, passiveArgs);
    document.addEventListener('mousedown', this.onDocumentMouseDown, false);
    document.addEventListener('mouseup', this.onDocumentMouseUp, false);
    document.addEventListener('keydown', this.onDocumentKeyDown, false);

    if (this.props.style) {
      assign(this.portalElement.style, this.props.style);
    }

    if (this.props.className) {
      this.portalElement.className = this.props.className;
    }
    this.setState({ isVisible: true }, () =>
      this.props.onOpen(this.portalElement, this.getTargetElement()),
    );
  }

  close() {
    if (!this.portalElement) {
      return;
    }

    const renderTarget = this.getRenderTarget();
    if (renderTarget) {
      renderTarget.removeChild(this.portalElement);
    }

    document.removeEventListener('touchstart', this.onDocumentMouseDown);
    document.removeEventListener('touchmove', this.onDocumentMouseMove);
    document.removeEventListener('touchend', this.onDocumentMouseUp);
    document.removeEventListener('mousedown', this.onDocumentMouseDown);
    document.removeEventListener('mouseup', this.onDocumentMouseUp);
    document.removeEventListener('keydown', this.onDocumentKeyDown);

    this.portalElement = null;
    this.setState({ isVisible: false });
  }

  // This function is taken from modernizr
  // See https://github.com/modernizr/modernizr
  // eslint-disable-next-line class-methods-use-this
  supportsPassiveEvents() {
    let supportsPassiveOption = false;
    try {
      const opts = Object.defineProperty({}, 'passive', {
        // eslint-disable-next-line getter-return
        get() {
          supportsPassiveOption = true;
        },
      });
      window.addEventListener('test', null, opts);
    } catch (e) {
      return false;
    }
    return supportsPassiveOption;
  }

  render() {
    const {
      portalElement,
      props: { children },
      state: { isVisible },
    } = this;

    if (!isVisible || !portalElement) {
      return null;
    }

    return createPortal(children, portalElement);
  }
}

Portal.propTypes = {
  children: PropTypes.node.isRequired,
  isOpen: PropTypes.bool.isRequired,
  beforeClose: PropTypes.func,
  className: PropTypes.string,
  onClose: PropTypes.func,
  onOpen: PropTypes.func,
  onRender: PropTypes.func,
  style: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  renderTarget: PropTypes.func,
  target: PropTypes.oneOfType([PropTypes.func, PropTypes.node]),
  targetRef: PropTypes.func,
  closeOnEscPressed: PropTypes.bool,
};

Portal.defaultProps = {
  beforeClose: null,
  className: null,
  onClose: () => null,
  onOpen: () => null,
  onRender: () => null,
  style: null,
  renderTarget: null,
  target: null,
  targetRef: null,
  closeOnEscPressed: true,
};

export default Portal;
