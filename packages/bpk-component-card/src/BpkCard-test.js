import React from 'react';
import renderer from 'react-test-renderer';
import BpkCard from './BpkCard';

describe('BpkCard', () => {
  it('should render BpkCardSimple', () => {
    const tree = renderer.create(
      <BpkCard>
        Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum
        sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.
      </BpkCard>,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render BpkCardTicket with a "stub" attribute', () => {
    const tree = renderer.create(
      <BpkCard stub="Ticket stub">
        Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum
        sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.
      </BpkCard>,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
