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

  onDocumentMouseDown(event) {
    const clickEventProperties = this.getClickEventProperties(event);
    if (clickEventProperties.isNotLeftClick ||
      clickEventProperties.isTargetClick ||
      clickEventProperties.isPortalClick) {
      this.shouldClose = false;
      return;
    }

    this.shouldClose = true;
  }

  onDocumentMouseUp(event) {
    const clickEventProperties = this.getClickEventProperties(event);

    if (clickEventProperties.isNotLeftClick ||
      clickEventProperties.isTargetClick ||
      clickEventProperties.isPortalClick) {
      this.shouldClose = false;
      return;
    }

    if (this.shouldClose) {
      this.props.onClose(event, { source: 'DOCUMENT_CLICK' });
    }
  }

  onDocumentKeyDown(event) {
    if (event.keyCode === KEYCODES.ESCAPE && this.props.isOpen) {
      this.props.onClose(event, { source: 'ESCAPE' });
    }
  }

  onDocumentMouseMove() {
    this.shouldClose = false;
  }

  getClickEventProperties(event) {
    const isNotLeftClick = event.button && event.button !== 0;

    const targetElement = this.getTargetElement();
    const isTargetClick = targetElement &&
      (event.target === targetElement || targetElement.contains(event.target));

    const isPortalClick = this.portalElement &&
      (event.target === this.portalElement || this.portalElement.contains(event.target));

    return {
      isNotLeftClick,
      isTargetClick,
      isPortalClick,
    };
  }

  getTargetElement() {
    if (typeof this.props.target === 'function') {
      return this.props.target();
    }

    // Whilst findDOMNode is planned for deprecation in a future implementation of react, since this is the only usage
    // in backpack, we have decided to ignore this instance as it'll be deleted in favour of React 16 first class portal
    // implementation (see https://reactjs.org/docs/portals.html).
    // eslint-disable-next-line react/no-find-dom-node
    return this.props.target && findDOMNode(this);
  }

  getRenderTarget() {
    if (this.props.renderTarget) {
      if (typeof this.props.renderTarget === 'function') return this.props.renderTarget();
      return this.props.renderTarget;
    }
    return document.body;
  }

  open() {
    if (this.portalElement) {
      return;
    }

    const passiveArgs = this.supportsPassiveEvents() ? { passive: true } : false;

    this.portalElement = document.createElement('div');
    this.getRenderTarget().appendChild(this.portalElement);
    document.addEventListener('touchstart', this.onDocumentMouseDown, passiveArgs);
    document.addEventListener('touchmove', this.onDocumentMouseMove, passiveArgs);
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

    this.renderPortal();
    this.props.onOpen(this.portalElement, this.getTargetElement());
  }

  close() {
    if (!this.portalElement) {
      return;
    }

    unmountComponentAtNode(this.portalElement);
    this.getRenderTarget().removeChild(this.portalElement);
    document.removeEventListener('touchstart', this.onDocumentMouseDown);
    document.removeEventListener('touchmove', this.onDocumentMouseMove);
    document.removeEventListener('touchend', this.onDocumentMouseUp);
    document.removeEventListener('mousedown', this.onDocumentMouseDown);
    document.removeEventListener('mouseup', this.onDocumentMouseUp);
    document.removeEventListener('keydown', this.onDocumentKeyDown);
    this.portalElement = null;
  }

  // This function is taken from modernizr
  // See https://github.com/modernizr/modernizr
  supportsPassiveEvents() { // eslint-disable-line
    let supportsPassiveOption = false;
    try {
      const opts = Object.defineProperty({}, 'passive', {
        get() { // eslint-disable-line getter-return
          supportsPassiveOption = true;
        },
      });
      window.addEventListener('test', null, opts);
    } catch (e) {
      return false;
    }
    return supportsPassiveOption;
  }

  renderPortal() {
    // If the `target` prop is null, it's fine that there is no targetElement
    // Otherwise, if a `target` is provided, we don't render if we cannot find the respective element
    const missesExpectedTarget = this.props.target && !this.getTargetElement();

    if (this.portalElement && !missesExpectedTarget) {
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
  beforeClose: PropTypes.func, // eslint-disable-line react/no-unused-prop-types
  className: PropTypes.string,
  onClose: PropTypes.func,
  onOpen: PropTypes.func,
  onRender: PropTypes.func,
  renderTarget: PropTypes.oneOfType([PropTypes.instanceOf(Element), PropTypes.func]),
  style: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  target: PropTypes.oneOfType([PropTypes.func, PropTypes.element]),
  targetRef: PropTypes.func,
};

Portal.defaultProps = {
  beforeClose: null,
  className: null,
  onClose: () => null,
  onOpen: () => null,
  onRender: () => null,
  renderTarget: null,
  style: null,
  target: null,
  targetRef: null,
};

export default Portal;
