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
// @ts-nocheck

import { renderToString } from 'react-dom/server';
import '@testing-library/jest-dom';

import { render } from '@testing-library/react';

import { type BpkDialogWrapper as WrapperType } from './BpkDialogWrapper';

describe('BpkDialogWrapper', () => {
  const props = {
    id: "bpk-dialog-wrapper",
    ariaLabelledby: "bpk-dialog-wrapper",
    isOpen: true,
    onClose: jest.fn()
  }

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('dialog is supported', () => {
    let BpkDialogWrapper: typeof WrapperType;

    beforeEach(() => {
      jest.isolateModules(() => {
        ({ BpkDialogWrapper } = jest.requireActual('./BpkDialogWrapper'));
      })
    })

    it('renders without crashing with all props', () => {
      expect(() => renderToString(
        <BpkDialogWrapper
          closeOnEscPressed
          closeOnScrimClick
          dialogClassName='test-class'
          exiting={false}
          transitionClassNames={{
            appear: "appear-class",
            appearActive: "active-class",
            exit: "exit-class"
          }}
          timeout={{ appear: 0, exit: 0 }}
          {...props}
        >
          Dialog content
        </BpkDialogWrapper>
      )).not.toThrow();
    })
    it('renders without crashing with minimum props', () => {
      expect(() => renderToString(
        <BpkDialogWrapper {...props}>
          Dialog content
        </BpkDialogWrapper>
      )).not.toThrow();
    })
    it('renders correctly with minimum prop', () => {
      const { asFragment } = render(
        <BpkDialogWrapper {...props}>
          Dialog content
        </BpkDialogWrapper>
      );
      expect(asFragment()).toMatchSnapshot();
    });
    it('renders correctly with closeOnX props', () => {
      const { asFragment } = render(
        <BpkDialogWrapper
          closeOnEscPressed
          closeOnScrimClick
          {...props}
        >
          Dialog content
        </BpkDialogWrapper>
      );
      expect(asFragment()).toMatchSnapshot();
    });
    it('renders correctly with class prop', () => {
      const { asFragment } = render(
        <BpkDialogWrapper
          dialogClassName="test-class"
          {...props}
        >
          Dialog content
        </BpkDialogWrapper>
      );
      expect(asFragment()).toMatchSnapshot();
    });
    it('renders correctly with ariaLabelledBy prop', () => {
      const { container } = render(
        <BpkDialogWrapper
          {...props}
          ariaLabelledby='my-title-id'
        >
          Dialog content
        </BpkDialogWrapper>
      );

      expect(container.querySelector('dialog[aria-labelledby="my-title-id"]')).toBeInTheDocument();
    });
    it('renders correctly with ariaLabel prop', () => {
      const { container } = render(
        <BpkDialogWrapper
          {...props}
          ariaLabel='my a11y title'
        >
          Dialog content
        </BpkDialogWrapper>
      );

      expect(container.querySelector('dialog[aria-label="my a11y title"]')).toBeInTheDocument();
    });
    it('renders correctly with animation props', () => {
      const { asFragment } = render(
        <BpkDialogWrapper
          exiting={false}
          transitionClassNames={{
            appear: "appear-class",
            appearActive: "active-class",
            exit: "exit-class"
          }}
          timeout={{ appear: 0, exit: 0 }}
          {...props}
        >
          Dialog content
        </BpkDialogWrapper>
      );
      expect(asFragment()).toMatchSnapshot();
    });
  })

  describe('dialog is not supported', () => {
    let htmlDialogElement: typeof window.HTMLDialogElement;
    let BpkDialogWrapper: typeof WrapperType;

    beforeEach(() => {
      htmlDialogElement = window.HTMLDialogElement;
      window.HTMLDialogElement = undefined!;
      jest.isolateModules(() => {
        ({ BpkDialogWrapper } = jest.requireActual('./BpkDialogWrapper'));
      });
    });

    afterEach(() => {
      window.HTMLDialogElement = htmlDialogElement;
    });

    it('renders without crashing with all props', () => {
      expect(() => renderToString(
        <BpkDialogWrapper
          closeOnEscPressed
          closeOnScrimClick
          dialogClassName='test-class'
          exiting={false}
          transitionClassNames={{
            appear: "appear-class",
            appearActive: "active-class",
            exit: "exit-class"
          }}
          timeout={{ appear: 0, exit: 0 }}
          {...props}
        >
          Dialog content
        </BpkDialogWrapper>
      )).not.toThrow();
    })
    it('renders without crashing with minimum props', () => {
      expect(() => renderToString(
        <BpkDialogWrapper {...props}>
          Dialog content
        </BpkDialogWrapper>
      )).not.toThrow();
    })
    it('renders correctly with minimum prop', () => {
      const { asFragment } = render(
        <BpkDialogWrapper {...props}>
          Dialog content
        </BpkDialogWrapper>
      );
      expect(asFragment()).toMatchSnapshot();
    });
    it('should call use the polyfill to open the dialog', () => {
      render(
        <BpkDialogWrapper {...props}>
          Dialog content
        </BpkDialogWrapper>
      );

      expect(
        document
          .getElementById(`${props.id}-polyfill`)
          ?.getAttribute('data-open'),
      ).toEqual('true');
      expect(document.body.style.position).toEqual('fixed');
      expect(document.body.style.width).toEqual('100%');
    });
    it('renders correctly with closeOnX props', () => {
      const { asFragment } = render(
        <BpkDialogWrapper
          closeOnEscPressed
          closeOnScrimClick
          {...props}
        >
          Dialog content
        </BpkDialogWrapper>
      );
      expect(asFragment()).toMatchSnapshot();
    });
    it('renders correctly with class prop', () => {
      const { asFragment } = render(
        <BpkDialogWrapper
          dialogClassName="test-class"
          {...props}
        >
          Dialog content
        </BpkDialogWrapper>
      );
      expect(asFragment()).toMatchSnapshot();
    });
    it('renders correctly with animation props', () => {
      const { asFragment } = render(
        <BpkDialogWrapper
          exiting={false}
          transitionClassNames={{
            appear: "appear-class",
            appearActive: "active-class",
            exit: "exit-class"
          }}
          timeout={{ appear: 0, exit: 0 }}
          {...props}
        >
          Dialog content
        </BpkDialogWrapper>
      );
      expect(asFragment()).toMatchSnapshot();
    });
    it('should reset position and width when dialog is closed', () => {
      render(
        <BpkDialogWrapper {...props} isOpen={false}>
          <div>Dialog content</div>
        </BpkDialogWrapper>,
      );

      expect(document.body.style.position).toEqual('relative');
      expect(document.body.style.width).toEqual('auto');
    });
  })
})
