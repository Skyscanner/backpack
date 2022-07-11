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

import React, { useState, useEffect, createRef } from 'react';
import { render, waitFor, fireEvent } from '@testing-library/react';

import Portal from './Portal';

const KEYCODES = {
  ESCAPE: 'Escape',
};

describe('Portal', () => {
  beforeEach(() => {
    jest.resetAllMocks();
    jest.clearAllMocks();
  });

  it('should render correctly with no target', () => {
    const { container } = render(
      <Portal isOpen={false} onClose={jest.fn()}>
        <div>My portal content</div>
      </Portal>,
    );
    expect(container).toMatchSnapshot();
  });

  it('should render correctly with target', () => {
    const target = document.createElement('div');
    const { container } = render(
      <Portal isOpen={false} target={target} onClose={jest.fn()}>
        <div>My portal content</div>
      </Portal>,
    );

    expect(container).toMatchSnapshot();
  });

  it('should render correctly with renderTarget', () => {
    const renderTarget = document.createElement('div');
    const { container } = render(
      <Portal isOpen renderTarget={renderTarget} onClose={jest.fn()}>
        <div>My portal content</div>
      </Portal>,
    );

    expect(container).toMatchSnapshot();
    expect(renderTarget).toMatchSnapshot();
  });

  it('should render with a custom style property', () => {
    const renderTarget = document.createElement('div');
    const customStyle = {
      // eslint-disable-next-line backpack/use-tokens
      color: 'red',
    };

    render(
      <Portal
        isOpen
        style={customStyle}
        renderTarget={renderTarget}
        onClose={jest.fn()}
      >
        <div>My portal content</div>
      </Portal>,
    );
    const portalElement = renderTarget.firstChild;

    if (!portalElement || !(portalElement instanceof HTMLElement)) {
      throw new Error('portalElement not defined or is of wrong type');
    }

    expect(portalElement.style.color).toEqual(customStyle.color);
  });

  it('should render with a custom className property', () => {
    const renderTarget = document.createElement('div');
    const customClassname = 'my-custom-classname';
    render(
      <Portal
        isOpen
        className={customClassname}
        renderTarget={renderTarget}
        onClose={jest.fn()}
      >
        <div>My portal content</div>
      </Portal>,
    );
    const portalElement = renderTarget.firstChild;

    if (!portalElement || !(portalElement instanceof HTMLElement)) {
      throw new Error('portalElement not defined or is of wrong type');
    }

    expect(portalElement.classList.contains(customClassname)).toBe(true);
  });

  it('should render portal children to document.body', () => {
    render(
      <Portal isOpen onClose={jest.fn()}>
        <div>My portal content</div>
      </Portal>,
    );

    expect(document.body && document.body.textContent).toEqual(
      'My portal content',
    );
  });

  it('should remove portal children from document.body on close', () => {
    const renderTarget = document.createElement('div');
    const text = document.createElement('h1');
    text.textContent = 'Not a portal';
    renderTarget.appendChild(text);

    expect(renderTarget).toMatchInlineSnapshot(`
      <div>
        <h1>
          Not a portal
        </h1>
      </div>
    `);

    const { rerender } = render(
      <Portal isOpen renderTarget={renderTarget} onClose={jest.fn()}>
        <div>My portal content</div>
      </Portal>,
    );

    expect(renderTarget).toMatchInlineSnapshot(`
      <div>
        <h1>
          Not a portal
        </h1>
        <div>
          <div>
            My portal content
          </div>
        </div>
      </div>
    `);

    rerender(
      <Portal isOpen={false} renderTarget={renderTarget} onClose={jest.fn()}>
        <div>My portal content</div>
      </Portal>,
    );

    expect(renderTarget).toMatchInlineSnapshot(`
      <div>
        <h1>
          Not a portal
        </h1>
      </div>
    `);
  });

  it('should not remove portal children if render target no longer exists', () => {
    const { body } = document;

    if (!body) {
      throw new Error('failed to setup test');
    }

    const renderTarget = document.createElement('div');
    renderTarget.id = 'render-target';
    body.appendChild(renderTarget);
    const { baseElement, container, rerender } = render(
      <Portal isOpen renderTarget={renderTarget} onClose={jest.fn()}>
        <div>My portal content</div>
      </Portal>,
    );

    expect(container.firstChild).toBe(null);
    expect(baseElement).toMatchInlineSnapshot(`
      <body>
        <div
          id="render-target"
        >
          <div>
            <div>
              My portal content
            </div>
          </div>
        </div>
        <div />
      </body>
    `);

    body.removeChild(renderTarget);
    rerender(
      <Portal isOpen={false} renderTarget={renderTarget} onClose={jest.fn()}>
        <div>My portal content</div>
      </Portal>,
    );

    expect(baseElement).toMatchInlineSnapshot(`
      <body>
        <div />
      </body>
    `);
  });

  it('should call the onClose handler on click outside', async () => {
    const renderTarget = document.createElement('div');
    const target = document.createElement('div');
    target.ref = createRef();
    const onCloseSpy = jest.fn();
    const { getByText } = render(
      <>
        <h1>My other content</h1>
        <Portal
          isOpen
          onClose={onCloseSpy}
          target={target}
          renderTarget={renderTarget}
        >
          <div>My portal content</div>
        </Portal>
      </>,
    );

    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'where' implicitly has an 'any' type.
    const click = (where, right, drag = false) => {
      fireEvent(
        where,
        new MouseEvent('mousedown', {
          bubbles: true,
          cancelable: true,
          button: right ? 2 : 0,
        }),
      );

      if (drag) {
        fireEvent(
          where,
          new MouseEvent('touchmove', {
            bubbles: true,
            cancelable: true,
            button: right ? 2 : 0,
          }),
        );
      }

      fireEvent(
        where,
        new MouseEvent('mouseup', {
          bubbles: true,
          cancelable: true,
          button: right ? 2 : 0,
        }),
      );
    };

    const outOfPortal = getByText('My other content');

    expect(onCloseSpy).toHaveBeenCalledTimes(0);

    click(outOfPortal, true);

    expect(onCloseSpy).toHaveBeenCalledTimes(0);

    click(target, false);

    expect(onCloseSpy).toHaveBeenCalledTimes(0);

    click(renderTarget, false);

    expect(onCloseSpy).toHaveBeenCalledTimes(0);

    click(outOfPortal, false, true);

    expect(onCloseSpy).toHaveBeenCalledTimes(0);

    click(outOfPortal, false);

    expect(onCloseSpy).toHaveBeenCalledTimes(1);
  });

  it('does not have a race condition if the portal is opened then closed quickly', async () => {
    const renderTarget = document.createElement('div');
    const target = document.createElement('div');
    const onCloseSpy = jest.fn();

    const MyApp = () => {
      const [visible, setVisible] = useState(true);
      useEffect(() => {
        setVisible(false);
      }, []);
      return (
        <>
          <h1>My other content</h1>
          {visible && (
            <Portal
              isOpen
              onClose={onCloseSpy}
              target={target}
              renderTarget={renderTarget}
            >
              <div>My portal content</div>
            </Portal>
          )}
        </>
      );
    };

    const { getByText } = render(<MyApp />);

    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'where' implicitly has an 'any' type.
    const click = (where) => {
      fireEvent(
        where,
        new MouseEvent('mousedown', {
          bubbles: true,
          cancelable: true,
          button: 0,
        }),
      );
      fireEvent(
        where,
        new MouseEvent('mouseup', {
          bubbles: true,
          cancelable: true,
          button: 0,
        }),
      );
    };

    const outOfPortal = getByText('My other content');
    click(outOfPortal);

    expect(onCloseSpy).toHaveBeenCalledTimes(0);
  });

  it('should propagate the click event to the onClose handler', () => {
    const target = document.createElement('div');
    target.ref = createRef();
    const onCloseSpy = jest.fn();
    const { getByText } = render(
      <>
        <h1>My other content</h1>
        <Portal isOpen onClose={onCloseSpy} target={target}>
          <div>My portal content</div>
        </Portal>
      </>,
    );

    const outOfPortal = getByText('My other content');

    expect(onCloseSpy).toHaveBeenCalledTimes(0);

    fireEvent(
      outOfPortal,
      new MouseEvent('mousedown', {
        bubbles: true,
        cancelable: true,
        button: 0,
      }),
    );
    fireEvent(
      outOfPortal,
      new MouseEvent('mouseup', {
        bubbles: true,
        cancelable: true,
        button: 0,
      }),
    );

    expect(onCloseSpy.mock.calls).toMatchInlineSnapshot(`
      Array [
        Array [
          MouseEvent {
            "isTrusted": false,
          },
          Object {
            "source": "DOCUMENT_CLICK",
          },
        ],
      ]
    `);
  });

  it('should call the onClose handler on escape key', () => {
    const target = document.createElement('div');
    target.ref = createRef();
    const onCloseSpy = jest.fn();
    render(
      <Portal isOpen onClose={onCloseSpy} target={target}>
        <div>My portal content</div>
      </Portal>,
    );

    expect(onCloseSpy).toHaveBeenCalledTimes(0);

    const event = new KeyboardEvent('keydown', {
      key: KEYCODES.ESCAPE,
    });

    document.dispatchEvent(event);

    expect(onCloseSpy).toHaveBeenCalledTimes(1);
  });

  it('should call targetRef with the target', () => {
    const targetRef = jest.fn();
    const target = jest.fn();
    const targetElement = <div>target</div>;
    target.mockReturnValue(targetElement);
    render(
      <>
        {target}
        <Portal isOpen target={target} targetRef={targetRef}>
          <div>My portal content</div>
        </Portal>
      </>,
    );

    expect(targetRef).toHaveBeenCalledWith(targetElement);
  });

  it('should not close on escape key if closeOnEscPressed is false', () => {
    const target = document.createElement('div');
    target.ref = createRef();
    const onCloseSpy = jest.fn();
    render(
      <Portal
        isOpen
        onClose={onCloseSpy}
        target={target}
        closeOnEscPressed={false}
      >
        <div>My portal content</div>
      </Portal>,
    );

    expect(onCloseSpy).toHaveBeenCalledTimes(0);

    const event = new KeyboardEvent('keydown', {
      key: KEYCODES.ESCAPE,
    });

    document.dispatchEvent(event);

    expect(onCloseSpy).toHaveBeenCalledTimes(0);
  });

  it('should propagate the escape key event to the onClose handler', () => {
    const target = document.createElement('div');
    target.ref = createRef();
    const onCloseSpy = jest.fn();
    render(
      <Portal isOpen onClose={onCloseSpy} target={target}>
        <div>My portal content</div>
      </Portal>,
    );

    expect(onCloseSpy).toHaveBeenCalledTimes(0);

    const event = new KeyboardEvent('keydown', {
      key: KEYCODES.ESCAPE,
    });

    document.dispatchEvent(event);

    expect(onCloseSpy.mock.calls[0][0]).toEqual(event);
    expect(onCloseSpy.mock.calls[0][1]).toEqual({
      source: 'ESCAPE',
    });
  });

  it('should not call the onClose handler on escape key if portal is closed', () => {
    const target = document.createElement('div');
    const onCloseSpy = jest.fn();
    render(
      <Portal isOpen={false} onClose={onCloseSpy} target={target}>
        <div>My portal content</div>
      </Portal>,
    );

    expect(onCloseSpy).toHaveBeenCalledTimes(0);

    const event = new KeyboardEvent('keydown', {
      key: KEYCODES.ESCAPE,
    });

    document.dispatchEvent(event);

    expect(onCloseSpy).toHaveBeenCalledTimes(0);
  });

  it('should not call the onClose handler again on escape key if portal is unmounted', () => {
    const target = document.createElement('div');
    target.ref = createRef();
    const onCloseSpy = jest.fn();
    const { rerender } = render(
      <Portal isOpen onClose={onCloseSpy} target={target}>
        <div>My portal content</div>
      </Portal>,
    );

    expect(onCloseSpy).toHaveBeenCalledTimes(0);

    const event = new KeyboardEvent('keydown', {
      key: KEYCODES.ESCAPE,
    });

    document.dispatchEvent(event);

    expect(onCloseSpy).toHaveBeenCalledTimes(1);

    rerender(
      <Portal isOpen={false} onClose={onCloseSpy} target={target}>
        <div>My portal content</div>
      </Portal>,
    );
    document.dispatchEvent(event);

    expect(onCloseSpy).toHaveBeenCalledTimes(1);
  });

  it('should call the onRender handler when props are updated', () => {
    const onRenderSpy = jest.fn();
    const { rerender } = render(
      <Portal isOpen onRender={onRenderSpy} onClose={jest.fn()}>
        <div>My portal content</div>
      </Portal>,
    );

    expect(onRenderSpy).toHaveBeenCalledTimes(1);

    rerender(
      <Portal isOpen onRender={onRenderSpy} onClose={jest.fn()}>
        <div>My portal content changed</div>
      </Portal>,
    );

    expect(onRenderSpy).toHaveBeenCalledTimes(2);

    rerender(
      <Portal isOpen onRender={onRenderSpy} onClose={jest.fn()}>
        <div>My portal content changed again</div>
      </Portal>,
    );

    expect(onRenderSpy).toHaveBeenCalledTimes(3);
  });

  it('should call the onRender handler before the onOpen handler handler when props are updated', () => {
    const handler = jest.fn();
    const { rerender } = render(
      <Portal
        isOpen={false}
        onRender={() => handler('onRender')}
        onOpen={() => handler('onOpen')}
        onClose={jest.fn()}
      >
        <div>My portal content</div>
      </Portal>,
    );

    expect(handler.mock.calls).toMatchInlineSnapshot('Array []');

    jest.clearAllMocks();
    rerender(
      <Portal
        isOpen
        onRender={() => handler('onRender')}
        onOpen={() => handler('onOpen')}
        onClose={jest.fn()}
      >
        <div>My portal content</div>
      </Portal>,
    );

    expect(handler.mock.calls).toMatchInlineSnapshot(`
      Array [
        Array [
          "onRender",
        ],
        Array [
          "onOpen",
        ],
      ]
    `);
  });

  it('should call the onRender handler before the onOpen handler handler when component is mounted', () => {
    const handler = jest.fn();
    render(
      <Portal
        isOpen
        onRender={() => handler('onRender')}
        onOpen={() => handler('onOpen')}
        onClose={jest.fn()}
      >
        <div>My portal content</div>
      </Portal>,
    );

    expect(handler.mock.calls).toMatchInlineSnapshot(`
      Array [
        Array [
          "onRender",
        ],
        Array [
          "onOpen",
        ],
      ]
    `);
  });

  it('should not call the onRender handler when isOpen is false', () => {
    const onRenderSpy = jest.fn();
    const { rerender } = render(
      <Portal isOpen={false} onRender={onRenderSpy} onClose={jest.fn()}>
        <div>My portal content</div>
      </Portal>,
    );

    expect(onRenderSpy).toHaveBeenCalledTimes(0);

    rerender(
      <Portal isOpen onRender={onRenderSpy} onClose={jest.fn()}>
        <div>My portal content</div>
      </Portal>,
    );

    expect(onRenderSpy).toHaveBeenCalledTimes(1);

    rerender(
      <Portal isOpen={false} onRender={onRenderSpy} onClose={jest.fn()}>
        <div>My portal content</div>
      </Portal>,
    );

    expect(onRenderSpy).toHaveBeenCalledTimes(1);
  });

  describe('lifecycle methods', () => {
    // @ts-expect-error ts-migrate(7034) FIXME: Variable 'rerender' implicitly has type 'any' in s... Remove this comment to see the full error message
    let rerender;

    const openSpy = jest.fn();
    const closeSpy = jest.fn((close) => close());

    describe('componentDidMount()', () => {
      it('should open the portal on mount', () => {
        expect(openSpy).toHaveBeenCalledTimes(0);
        expect(closeSpy).toHaveBeenCalledTimes(0);

        ({ rerender } = render(
          <Portal
            isOpen
            onOpen={openSpy}
            beforeClose={closeSpy}
            onClose={jest.fn()}
          >
            <div>My portal content</div>
          </Portal>,
        ));

        expect(openSpy).toHaveBeenCalledTimes(1);
        expect(closeSpy).toHaveBeenCalledTimes(0);
      });
    });

    describe('UNSAFE_componentWillReceiveProps()', () => {
      it('should close the portal when isOpen is removed', () => {
        expect(openSpy).toHaveBeenCalledTimes(0);
        expect(closeSpy).toHaveBeenCalledTimes(0);

        // @ts-expect-error ts-migrate(7005) FIXME: Variable 'rerender' implicitly has an 'any' type.
        rerender(
          <Portal
            isOpen={false}
            onOpen={openSpy}
            beforeClose={closeSpy}
            onClose={jest.fn()}
          >
            <div>My portal content</div>
          </Portal>,
        );
        waitFor(() => {
          expect(openSpy).toHaveBeenCalledTimes(0);
          expect(closeSpy).toHaveBeenCalledTimes(1);
        });
      });

      it('should open the portal again when isOpen is added', () => {
        expect(openSpy).toHaveBeenCalledTimes(0);
        expect(closeSpy).toHaveBeenCalledTimes(0);

        // @ts-expect-error ts-migrate(7005) FIXME: Variable 'rerender' implicitly has an 'any' type.
        rerender(
          <Portal
            isOpen
            onOpen={openSpy}
            beforeClose={closeSpy}
            onClose={jest.fn()}
          >
            <div>My portal content</div>
          </Portal>,
        );

        expect(openSpy).toHaveBeenCalledTimes(1);
        expect(closeSpy).toHaveBeenCalledTimes(0);
      });
    });
  });

  it('should remove all items from the dom when unmounted', () => {
    const { body } = document;

    if (!body) {
      throw new Error('failed to setup test');
    }

    const addEventListener = jest.spyOn(document, 'addEventListener');
    const removeEventListener = jest.spyOn(document, 'removeEventListener');
    const { baseElement, rerender } = render(
      <Portal isOpen onClose={jest.fn()}>
        <div>My portal content</div>
      </Portal>,
    );

    expect(baseElement).toMatchInlineSnapshot(`
      <body>
        <div />
        <div>
          <div>
            My portal content
          </div>
        </div>
      </body>
    `);

    rerender(<h1>My replacement content</h1>);

    expect(baseElement).toMatchInlineSnapshot(`
      <body>
        <div>
          <h1>
            My replacement content
          </h1>
        </div>
      </body>
    `);

    // The first two argments should be the same
    addEventListener.mock.calls.forEach((_, index) => {
      expect(addEventListener.mock.calls[index][0]).toEqual(
        removeEventListener.mock.calls[index][0],
      );
      expect(addEventListener.mock.calls[index][1]).toEqual(
        removeEventListener.mock.calls[index][1],
      );
    });

    expect(addEventListener.mock.calls.length).toEqual(
      removeEventListener.mock.calls.length,
    );
    expect(addEventListener.mock.calls.length).toEqual(6);
  });
});
