import React from 'react';
import renderer from 'react-test-renderer';
import BpkNudger from './BpkNudger';

describe('BpkNudger', () => {
  it('should render correctly', () => {
    const tree = renderer.create(
      <BpkNudger
        id="nudger"
        min={1}
        max={9}
        value={2}
        onChange={() => null}
        decreaseButtonLabel="Decrease"
        increaseButtonLabel="Increase"
      />,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly with a "className" attribute', () => {
    const tree = renderer.create(
      <BpkNudger
        id="nudger"
        min={1}
        max={9}
        value={2}
        onChange={() => null}
        decreaseButtonLabel="Decrease"
        increaseButtonLabel="Increase"
        className="my-nudger"
      />,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly with a value = min', () => {
    const tree = renderer.create(
      <BpkNudger
        id="nudger"
        min={1}
        max={9}
        value={1}
        onChange={() => null}
        decreaseButtonLabel="Decrease"
        increaseButtonLabel="Increase"
      />,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly with a value = max', () => {
    const tree = renderer.create(
      <BpkNudger
        id="nudger"
        min={1}
        max={9}
        value={9}
        onChange={() => null}
        decreaseButtonLabel="Decrease"
        increaseButtonLabel="Increase"
      />,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly with a value < min', () => {
    const tree = renderer.create(
      <BpkNudger
        id="nudger"
        min={1}
        max={9}
        value={0}
        onChange={() => null}
        decreaseButtonLabel="Decrease"
        increaseButtonLabel="Increase"
      />,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly with a value > max', () => {
    const tree = renderer.create(
      <BpkNudger
        id="nudger"
        min={1}
        max={9}
        value={10}
        onChange={() => null}
        decreaseButtonLabel="Decrease"
        increaseButtonLabel="Increase"
      />,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should return a number up/down on change', () => {
    const onChangeSpy = jest.fn();
    const tree = renderer.create(
      <BpkNudger
        id="nudger"
        min={1}
        max={9}
        value={3}
        onChange={onChangeSpy}
        decreaseButtonLabel="Decrease"
        increaseButtonLabel="Increase"
      />,
    ).toJSON();

    tree.children[0].props.onClick();
    expect(onChangeSpy).toHaveBeenCalledWith(2);

    tree.children[2].props.onClick();
    expect(onChangeSpy).toHaveBeenCalledWith(4);
  });
});
