import React from 'react';
import { render, screen } from '@testing-library/react';

import BpkContentCards from './BpkContentCards';

describe('Content Card widget', () => {
  const contentContainerTestProps: React.ComponentProps<
    typeof BpkContentCards
  > = {
    headerText: 'Header for the component',
    cards: [
      {
        imageLink: 'http://skyscanner.net/card-1-image-link.jpg',
        imageAlt: '',
        headline: 'Card 1 headline',
        description: 'Card 1 description',
        ctaLink: 'http://skyscanner.net/card-1-cta-link.html',
      },
      {
        imageLink: 'http://skyscanner.net/card-2-image-link.jpg',
        imageAlt: '',
        headline: 'Card 2 headline',
        description: 'Card 2 description',
        ctaLink: 'http://skyscanner.net/card-2-cta-link.html',
      },
      {
        imageLink: 'http://skyscanner.net/card-3-image-link.jpg',
        imageAlt: '',
        headline: 'Card 3 headline',
        description: 'Card 3 description',
        ctaLink: 'http://skyscanner.net/card-3-cta-link.html',
      },
    ],
  };

  it('renders correctly with 1 card', async () => {
    const { asFragment } = render(
      <BpkContentCards
        headerText={contentContainerTestProps.headerText}
        cards={contentContainerTestProps.cards.slice(0, 1)}
      />,
    );

    expect(asFragment()).toMatchSnapshot();
  });

  it('renders correctly with 2 cards', async () => {
    const { asFragment } = render(
      <BpkContentCards
        headerText={contentContainerTestProps.headerText}
        cards={contentContainerTestProps.cards.slice(0, 2)}
      />,
    );

    expect(asFragment()).toMatchSnapshot();
  });

  it('renders correctly with 3 cards', async () => {
    const { asFragment } = render(
      <BpkContentCards
        headerText={contentContainerTestProps.headerText}
        cards={contentContainerTestProps.cards}
      />,
    );

    expect(asFragment()).toMatchSnapshot();
  });

  it('renders the title, the headline and the description for each card', async () => {
    render(
      <BpkContentCards
        headerText={contentContainerTestProps.headerText}
        cards={contentContainerTestProps.cards}
      />,
    );

    const expectedElements = [
      'Header for the component',
      'Card 1 headline',
      'Card 1 description',
      'Card 2 headline',
      'Card 2 description',
      'Card 3 headline',
      'Card 3 description',
    ];

    expectedElements.forEach((element) =>
      expect(screen.getByText(element)).toBeTruthy(),
    );
  });

  it('does not render anything if the cards are not defined', () => {
    const { container } = render(
      <BpkContentCards
        headerText={contentContainerTestProps.headerText}
        cards={[]}
      />,
    );

    expect(container.firstChild).toBe(null);
  });
});
