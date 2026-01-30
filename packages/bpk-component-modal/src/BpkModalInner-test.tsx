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

import { render, screen } from '@testing-library/react';

import BpkModalInner from './BpkModalInner';

import { BpkNavigationBarButtonLink } from '@backpack/bpk-component-navigation-bar';


describe('BpkModalInner', () => {
  it('should render correctly', () => {
    const { asFragment } = render(
      <BpkModalInner
        id="my-modal"
        title="Modal title"
        closeLabel="Close"
        dialogRef={jest.fn()}
        onClose={jest.fn()}
        isIphone={false}
      >
        Modal content
      </BpkModalInner>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly when it has a className', () => {
    const { asFragment } = render(
      <BpkModalInner
        id="my-modal"
        title="Modal title"
        closeLabel="Close"
        dialogRef={jest.fn()}
        onClose={jest.fn()}
        isIphone={false}
        className="my-classname"
      >
        Modal content
      </BpkModalInner>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly with wide prop', () => {
    const { asFragment } = render(
      <BpkModalInner
        id="my-modal"
        title="Modal title"
        closeLabel="Close"
        dialogRef={jest.fn()}
        onClose={jest.fn()}
        isIphone={false}
        wide
      >
        Modal content
      </BpkModalInner>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly with closeText prop', () => {
    const { asFragment } = render(
      <BpkModalInner
        id="my-modal"
        title="Modal title"
        dialogRef={jest.fn()}
        onClose={jest.fn()}
        isIphone={false}
        closeText="Dismiss"
      >
        Modal content
      </BpkModalInner>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly when is iPhone', () => {
    const { asFragment } = render(
      <BpkModalInner
        id="my-modal"
        title="Modal title"
        closeLabel="Close"
        dialogRef={jest.fn()}
        onClose={jest.fn()}
        isIphone
      >
        Modal content
      </BpkModalInner>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly when it does not fills the screen on mobile', () => {
    const { asFragment } = render(
      <BpkModalInner
        id="my-modal"
        title="Modal title"
        closeLabel="Close"
        dialogRef={jest.fn()}
        onClose={jest.fn()}
        isIphone={false}
        fullScreenOnMobile={false}
      >
        Modal content
      </BpkModalInner>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly when it is fullscreen', () => {
    const { asFragment } = render(
      <BpkModalInner
        id="my-modal"
        title="Modal title"
        closeLabel="Close"
        dialogRef={jest.fn()}
        onClose={jest.fn()}
        isIphone={false}
        fullScreen
      >
        Modal content
      </BpkModalInner>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly with no padding', () => {
    const { asFragment } = render(
      <BpkModalInner
        id="my-modal"
        title="Modal title"
        closeLabel="Close"
        dialogRef={jest.fn()}
        onClose={jest.fn()}
        isIphone={false}
        padded={false}
      >
        Modal content
      </BpkModalInner>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly with a custom content classname', () => {
    const { asFragment } = render(
      <BpkModalInner
        id="my-modal"
        title="Modal title"
        closeLabel="Close"
        dialogRef={jest.fn()}
        onClose={jest.fn()}
        isIphone={false}
        contentClassName="my-classname"
      >
        Modal content
      </BpkModalInner>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly with an accessory view', () => {
    const { asFragment } = render(
      <BpkModalInner
        id="my-modal"
        title="Modal title"
        closeLabel="Close"
        dialogRef={jest.fn()}
        onClose={jest.fn()}
        isIphone={false}
        contentClassName="my-classname"
        accessoryView={
          <BpkNavigationBarButtonLink
            label="Close"
            onClick={jest.fn()}
            className="bpk-modal__leading-button"
          >
            <div>Testing</div>
          </BpkNavigationBarButtonLink>
        }
      >
        Modal content
      </BpkModalInner>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly with showHeader false', () => {
    render(
      <BpkModalInner
        id="my-modal"
        ariaLabel="Modal title"
        showHeader={false}
        dialogRef={jest.fn()}
        isIphone={false}
      >
        Modal content
      </BpkModalInner>,
    );

    expect(screen.queryAllByRole('heading')).toHaveLength(0);
    expect(screen.getByRole('dialog')).toHaveAttribute('aria-label', 'Modal title');
  });

  it('should render with a11y labelled-by when showHeader true', () => {
    render(
      <BpkModalInner
        id="my-modal"
        title="Actual title"
        ariaLabel="Ignored title"
        showHeader
        dialogRef={jest.fn()}
        isIphone={false}
      >
        Modal content
      </BpkModalInner>,
    );

    expect(screen.getByRole('heading')).toHaveTextContent('Actual title');
    expect(screen.getByRole('dialog')).toHaveAccessibleName('Actual title');
  });
});
