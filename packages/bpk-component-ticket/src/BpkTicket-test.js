import React from 'react';
import renderer from 'react-test-renderer';
import BpkTicket from './BpkTicket';

describe('BpkTicket', () => {
  it('should render correctly', () => {
    const tree = renderer.create(
      <BpkTicket stub="Ticket stub">
        Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum
        sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.
      </BpkTicket>,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly with an "href" attribute', () => {
    const tree = renderer.create(
      <BpkTicket stub="Ticket stub" href="//www.skyscanner.net">
        Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum
        sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.
      </BpkTicket>,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly with "padded" attribute equal to "false"', () => {
    const tree = renderer.create(
      <BpkTicket stub="Ticket stub" padded={false}>
        Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum
        sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.
      </BpkTicket>,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly with a "vertical" attribute', () => {
    const tree = renderer.create(
      <BpkTicket stub="Ticket stub" vertical>
        Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum
        sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.
      </BpkTicket>,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly with a "className" attribute', () => {
    const tree = renderer.create(
      <BpkTicket stub="Ticket stub" className="custom-class">
        Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum
        sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.
      </BpkTicket>,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
