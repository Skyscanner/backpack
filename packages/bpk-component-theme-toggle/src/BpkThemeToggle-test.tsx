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

import BpkThemeToggle from './BpkThemeToggle';

describe('BpkThemeToggle', () => {
  it('should render correctly', () => {
    render(<BpkThemeToggle />);

    expect(screen.getByLabelText('Change theme')).toBeInTheDocument();
    expect(screen.getByRole('combobox')).toBeInTheDocument();
    expect(screen.getByText('None')).toBeInTheDocument();
    expect(screen.getByText('London')).toBeInTheDocument();
    expect(screen.getByText('Hong Kong')).toBeInTheDocument();
    expect(screen.getByText('Doha')).toBeInTheDocument();
  });
});
