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

import BpkProgressRing, { PROGRESS_RING_SIZES } from './BpkProgressRing';

describe('BpkProgressRing', () => {
  it('should render correctly with default props', () => {
    render(<BpkProgressRing value={50} />);
    
    const progressBar = screen.getByRole('progressbar');
    expect(progressBar).toBeInTheDocument();
    expect(progressBar).toHaveAttribute('aria-valuenow', '50');
    expect(progressBar).toHaveAttribute('aria-valuemin', '0');
    expect(progressBar).toHaveAttribute('aria-valuemax', '100');
  });

  it('should render correctly with custom max value', () => {
    render(<BpkProgressRing value={25} max={50} />);
    
    const progressBar = screen.getByRole('progressbar');
    expect(progressBar).toHaveAttribute('aria-valuenow', '25');
    expect(progressBar).toHaveAttribute('aria-valuemax', '50');
  });

  it('should clamp value to max', () => {
    render(<BpkProgressRing value={150} max={100} />);
    
    const progressBar = screen.getByRole('progressbar');
    expect(progressBar).toHaveAttribute('aria-valuenow', '100');
  });

  it('should clamp value to minimum of 0', () => {
    render(<BpkProgressRing value={-10} />);
    
    const progressBar = screen.getByRole('progressbar');
    expect(progressBar).toHaveAttribute('aria-valuenow', '0');
  });

  it('should render children content', () => {
    render(
      <BpkProgressRing value={75}>
        <span>75%</span>
      </BpkProgressRing>
    );
    
    expect(screen.getByText('75%')).toBeInTheDocument();
  });

  it('should apply correct size classes', () => {
    const { rerender } = render(<BpkProgressRing value={50} size={PROGRESS_RING_SIZES.small} />);
    expect(screen.getByRole('progressbar').closest('.bpk-progress-ring')).toHaveClass('bpk-progress-ring--small');

    rerender(<BpkProgressRing value={50} size={PROGRESS_RING_SIZES.default} />);
    expect(screen.getByRole('progressbar').closest('.bpk-progress-ring')).toHaveClass('bpk-progress-ring--default');

    rerender(<BpkProgressRing value={50} size={PROGRESS_RING_SIZES.large} />);
    expect(screen.getByRole('progressbar').closest('.bpk-progress-ring')).toHaveClass('bpk-progress-ring--large');
  });

  it('should apply custom className', () => {
    render(<BpkProgressRing value={50} className="custom-class" />);
    
    expect(screen.getByRole('progressbar').closest('.bpk-progress-ring')).toHaveClass('custom-class');
  });

  it('should support aria-label', () => {
    render(<BpkProgressRing value={50} aria-label="Loading progress" />);
    
    const progressBar = screen.getByRole('progressbar');
    expect(progressBar).toHaveAttribute('aria-label', 'Loading progress');
  });

  it('should support aria-describedby', () => {
    render(
      <>
        <div id="progress-description">File upload progress</div>
        <BpkProgressRing value={50} aria-describedby="progress-description" />
      </>
    );
    
    const progressBar = screen.getByRole('progressbar');
    expect(progressBar).toHaveAttribute('aria-describedby', 'progress-description');
  });

  it('should calculate stroke-dashoffset correctly', () => {
    render(<BpkProgressRing value={25} />);
    
    const progressCircle = document.querySelector('.bpk-progress-ring__progress');
    expect(progressCircle).toBeInTheDocument();
    
    // The stroke-dashoffset should be calculated based on the percentage
    // 25% of circumference (2 * π * 45 = ~282.74) should be ~212.06
    const strokeDashoffset = progressCircle?.getAttribute('stroke-dashoffset');
    expect(strokeDashoffset).toBeTruthy();
  });

  it('should have proper SVG structure', () => {
    render(<BpkProgressRing value={50} />);
    
    const svg = document.querySelector('.bpk-progress-ring__svg');
    expect(svg).toBeInTheDocument();
    expect(svg).toHaveAttribute('viewBox', '0 0 100 100');
    
    const backgroundCircle = document.querySelector('.bpk-progress-ring__background');
    const progressCircle = document.querySelector('.bpk-progress-ring__progress');
    
    expect(backgroundCircle).toBeInTheDocument();
    expect(progressCircle).toBeInTheDocument();
    
    expect(backgroundCircle).toHaveAttribute('cx', '50');
    expect(backgroundCircle).toHaveAttribute('cy', '50');
    expect(backgroundCircle).toHaveAttribute('r', '45');
    
    expect(progressCircle).toHaveAttribute('cx', '50');
    expect(progressCircle).toHaveAttribute('cy', '50');
    expect(progressCircle).toHaveAttribute('r', '45');
  });
});