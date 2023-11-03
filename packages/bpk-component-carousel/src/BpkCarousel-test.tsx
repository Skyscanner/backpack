import { render, screen, getAllByRole } from '@testing-library/react';
import { axe } from 'jest-axe';
import userEvent from '@testing-library/user-event';
import type { ReactNode } from 'react';

import BpkCarousel from './BpkCarousel';


describe('BpkCarousel', () => {
  let images: ReactNode[]

  const DemoImages = () => (
    <img src="http://content.skyscnr.com/available/949043373/949043373_343x132.jpg" alt='hotel bedroom' />
  )

  function generateDemoImages(count: number) {
    return Array.from({ length: count }, (_, i) => (<DemoImages />));
  }

  type TestCase = [
    expectedCount: 7 | 5 | 4 | 12,
    actualCount: number,
    props: React.ComponentProps<typeof BpkCarousel>,
  ];

  beforeAll(() => {

    window.HTMLElement.prototype.scrollIntoView = jest.fn();

    (window as any).IntersectionObserver = class IntersectionObserver {
      observe = jest.fn();

      disconnect = jest.fn();

      unobserve = jest.fn();
    };
    images = [<DemoImages />, <DemoImages />, <DemoImages />, <DemoImages />, <DemoImages />];
  });

  it('should render correctly', () => {
    const { asFragment } = render(<BpkCarousel images={images} />);

    expect(asFragment()).toMatchSnapshot();
  });

  it.each<TestCase>([
    [12, 10, { images: generateDemoImages(10) }],
    [7, 5, { images: generateDemoImages(5) }],
    [5, 3, { images: generateDemoImages(3) }],
    [4, 2, { images: generateDemoImages(2) }],
  ])(
    'renders %i image(s) when there are %i image(s) available',
    (expectedCount, actualCount, props) => {
      render(<BpkCarousel {...props} />);

      expect(screen.getByTestId('image-gallery-scroll-container').childElementCount).toBe(expectedCount);
    },
  );

  it('renders only one image when only one available (no fake images for the infinite scroll)', async () => {
    render(<BpkCarousel images={[images[0]]} />);

    expect(screen.getByTestId('image-gallery-scroll-container').childElementCount).toBe(1);
  });
});
