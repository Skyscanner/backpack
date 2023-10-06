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

import { render } from '@testing-library/react';
import ReactDOMServer from 'react-dom/server';

import { BREAKPOINTS } from './BpkBreakpoint';

describe('BpkBreakpoint', () => {
  it('should render if the breakpoint is matched', () => {
    jest.resetModules();
    const BpkBreakpoint = require('./BpkBreakpoint').default; // eslint-disable-line global-require
    jest.mock('react-responsive', () => (props: any) => props.children(true));

    const { asFragment } = render(
      <BpkBreakpoint query={BREAKPOINTS.MOBILE}>
        {(matches: boolean) =>
          matches ? <div>matches</div> : <div>does not match</div>
        }
      </BpkBreakpoint>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render if the breakpoint is not matched', () => {
    jest.resetModules();
    const BpkBreakpoint = require('./BpkBreakpoint').default; // eslint-disable-line global-require
    jest.mock('react-responsive', () => (props: any) => props.children(false));

    const { asFragment } = render(
      <BpkBreakpoint query={BREAKPOINTS.MOBILE}>
        {(matches: boolean) =>
          matches ? <div>matches</div> : <div>does not match</div>
        }
      </BpkBreakpoint>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  describe('SSR mode', () => {
    let windowSpy: any;

    beforeEach(() => {
      // The following spy/mock removes the createElement function to fool the BpkBreakpoint into
      // thinking that is being rendered on server-side. Unfortunately react-testing-library has no
      // better mechanism for this.
      windowSpy = jest.spyOn(window, 'window', 'get');
      windowSpy.mockImplementation(() => ({
        document: {
          createElement: undefined,
        },
      }));

      // This mock replaces react-responsive to be a bypass that matches against any breakpoint
      jest.mock('react-responsive', () => (props: any) => props.children(true));

      jest.resetModules();
    });

    afterEach(() => {
      jest.restoreAllMocks();
    });

    it('should render when matchSSR=true', () => {
      const BpkBreakpoint = require('./BpkBreakpoint').default; // eslint-disable-line global-require

      const html = ReactDOMServer.renderToString(
        <BpkBreakpoint query={BREAKPOINTS.MOBILE} matchSSR>
          {(matches: boolean) =>
            matches ? <div>matches</div> : <div>does not match</div>
          }
        </BpkBreakpoint>,
      );

      expect(html).toMatchSnapshot();
    });

    it('should not render on SSR until hydrated when matchSSR=false', async () => {
      const BpkBreakpoint = require('./BpkBreakpoint').default; // eslint-disable-line global-require

      const components = (
        <BpkBreakpoint query={BREAKPOINTS.MOBILE} matchSSR={false}>
          {(matches: boolean) =>
            matches ? <div>matches</div> : <div>does not match</div>
          }
        </BpkBreakpoint>
      );

      // Checking SSR
      const html = ReactDOMServer.renderToString(components);

      // Here we want to restore the window object - as we're now pretending to be
      // on the browser.
      windowSpy.mockRestore();

      expect(html).toMatchSnapshot('server rendered');

      const container = document.createElement('div');
      document.body.appendChild(container);
      container.innerHTML = html;

      // Hydrating and CSR
      const { asFragment } = render(components, { hydrate: true, container });

      expect(asFragment()).toMatchSnapshot('hydrated');
    });

    it('should not render when matchSSR is not defined', () => {
      const BpkBreakpoint = require('./BpkBreakpoint').default; // eslint-disable-line global-require

      const html = ReactDOMServer.renderToString(
        <BpkBreakpoint query={BREAKPOINTS.MOBILE}>
          {(matches: boolean) =>
            matches ? <div>matches</div> : <div>does not match</div>
          }
        </BpkBreakpoint>,
      );

      expect(html).toMatchSnapshot();
    });
  });

  describe('PropType validation', () => {
    let errorOrWarningSpy = jest.fn();
    let oldError: any = null;
    let oldWarning: any = null;
    let BpkBreakpoint = require('./BpkBreakpoint').default; // eslint-disable-line global-require

    beforeEach(() => {
      jest.resetModules();
      BpkBreakpoint = require('./BpkBreakpoint').default; // eslint-disable-line global-require
      jest.mock('react-responsive', () => (props: any) => props.children());

      errorOrWarningSpy = jest.fn();
      oldError = window.console.error;
      oldWarning = window.console.warn;
      window.console.error = errorOrWarningSpy;
      window.console.warn = errorOrWarningSpy;
    });

    afterEach(() => {
      window.console.error = oldError;
      window.console.warn = oldWarning;
    });

    it("should not error if the 'query' prop is an allowed value", () => {
      render(
        <BpkBreakpoint query={BREAKPOINTS.MOBILE}>
          {() => <div />}
        </BpkBreakpoint>,
      );
      expect(errorOrWarningSpy.mock.calls.length).toBe(0);
    });

    it("should error if the 'query' prop is not an allowed value", () => {
      render(
        <BpkBreakpoint query="A RANDOM STRING">{() => <div />}</BpkBreakpoint>,
      );
      expect(errorOrWarningSpy.mock.calls.length).toBe(1);
    });

    it("should not error if the 'query' prop is not an allowed value but 'legacy' prop is true", () => {
      render(
        <BpkBreakpoint query="A RANDOM STRING" legacy>
          {() => <div />}
        </BpkBreakpoint>,
      );
      expect(errorOrWarningSpy.mock.calls.length).toBe(0);
    });
  });
});
