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
import userEvent from '@testing-library/user-event';

import BpkExpand from './BpkExpand';

describe('BpkExpand', () => {
  it('should render correctly', () => {
    const { asFragment } = render(
      <BpkExpand
        collapsed
        hideContent={jest.fn()}
        setCollapsed={jest.fn()}
        showContent={jest.fn()}
      >
        Show More
      </BpkExpand>,
    );

    expect(asFragment()).toMatchSnapshot();
  });

  it('should call call support functions when button is clicked', async () => {
    const hideContent = jest.fn();
    const setCollapsed = jest.fn();
    const showContent = jest.fn();

    const { asFragment, getByTestId } = render(
      <BpkExpand
        collapsed
        hideContent={hideContent}
        setCollapsed={setCollapsed}
        showContent={showContent}
      >
        Show More
      </BpkExpand>,
    );

    expect(asFragment()).toMatchSnapshot();

    await userEvent.click(getByTestId('button'))

    expect(showContent).toHaveBeenCalled()
    expect(setCollapsed).toHaveBeenCalledWith(false)

    await userEvent.click(getByTestId('button'))

    expect(hideContent).toHaveBeenCalled()
    expect(setCollapsed).toHaveBeenCalledWith(true)
  });
});
