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

import ReactDOMServer from 'react-dom/server';

import { render } from '@testing-library/react';

import { BREAKPOINTS } from './BpkBreakpoint';

describe('BpkBreakpoint', () => {
  describe('children as component', () => {
    it('should render when breakpoint matches', () => {
      jest.resetModules();
      const BpkBreakpoint = require('./BpkBreakpoint').default; // eslint-disable-line global-require
      jest.mock('./useMediaQuery', () => () => true);

      const { asFragment } = render(
        <BpkBreakpoint query={BREAKPOINTS.MOBILE}>
          <div>matches</div>
        </BpkBreakpoint>,
      );
      expect(asFragment()).toMatchSnapshot();
    });

    it('should not render when breakpoint does not match', () => {
      jest.resetModules();
      const BpkBreakpoint = require('./BpkBreakpoint').default; // eslint-disable-line global-require
      jest.mock('./useMediaQuery', () => () => false);

      const { asFragment } = render(
        <BpkBreakpoint query={BREAKPOINTS.MOBILE}>
          <div>matches</div>
        </BpkBreakpoint>,
      );
      expect(asFragment()).toMatchSnapshot();
    });
  });

  describe('children as a callback function', () => {
    it('should call function with matches=false if the breakpoint is not matched', () => {
      jest.resetModules();
      const BpkBreakpoint = require('./BpkBreakpoint').default; // eslint-disable-line global-require
      jest.mock('./useMediaQuery', () => () => false);

      const { asFragment } = render(
        <BpkBreakpoint query={BREAKPOINTS.MOBILE}>
          {(matches: boolean) =>
            matches ? <div>matches</div> : <div>does not match</div>
          }
        </BpkBreakpoint>,
      );
      expect(asFragment()).toMatchSnapshot();
    });

    it('should call function with matches=true if the breakpoint is matched', () => {
      jest.resetModules();
      const BpkBreakpoint = require('./BpkBreakpoint').default; // eslint-disable-line global-require
      jest.mock('./useMediaQuery', () => () => true);

      const { asFragment } = render(
        <BpkBreakpoint query={BREAKPOINTS.MOBILE}>
          {(matches: boolean) =>
            matches ? <div>matches</div> : <div>does not match</div>
          }
        </BpkBreakpoint>,
      );
      expect(asFragment()).toMatchSnapshot();
    });
  });

  describe('SSR mode', () => {
    beforeEach(() => {
      jest.mock('./useMediaQuery', () => () => true);

      jest.resetModules();
    });

    afterEach(() => {
      jest.restoreAllMocks();
    });

    it('should pass matchSSR=true to useMediaQuery when matchSSR=true', () => {
      const mockUseMediaQuery = jest.fn();
      jest.mock('./useMediaQuery', () => mockUseMediaQuery);
      const BpkBreakpoint = require('./BpkBreakpoint').default; // eslint-disable-line global-require

      ReactDOMServer.renderToString(
        <BpkBreakpoint query={BREAKPOINTS.MOBILE} matchSSR>
          rendered
        </BpkBreakpoint>,
      );

      expect(mockUseMediaQuery).toHaveBeenCalledWith(BREAKPOINTS.MOBILE, true);
    });

    it('should pass matchSSR=false to useMediaQuery when matchSSR=false', () => {
      const mockUseMediaQuery = jest.fn();
      jest.mock('./useMediaQuery', () => mockUseMediaQuery);
      const BpkBreakpoint = require('./BpkBreakpoint').default; // eslint-disable-line global-require

      ReactDOMServer.renderToString(
        <BpkBreakpoint query={BREAKPOINTS.MOBILE} matchSSR={false} />,
      );

      expect(mockUseMediaQuery).toHaveBeenCalledWith(BREAKPOINTS.MOBILE, false);
    });

    it('should pass matchSSR=false to useMediaQuery when matchSSR not defined', () => {
      const mockUseMediaQuery = jest.fn();
      jest.mock('./useMediaQuery', () => mockUseMediaQuery);
      const BpkBreakpoint = require('./BpkBreakpoint').default; // eslint-disable-line global-require

      ReactDOMServer.renderToString(
        <BpkBreakpoint query={BREAKPOINTS.MOBILE} />,
      );

      expect(mockUseMediaQuery).toHaveBeenCalledWith(BREAKPOINTS.MOBILE, false);
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
      jest.mock('./useMediaQuery', () => () => true);

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
