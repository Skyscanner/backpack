import React from 'react';
import renderer from 'react-test-renderer';
import BpkSelect from './BpkSelect';

describe('BpkSelect', () => {
  it('should render correctly', () => {
    const tree = renderer.create(
      <BpkSelect
        id="fruits"
        name="fruits"
        value="oranges"
        onChange={() => null}
      >
        <option value="apples">Apples</option>
        <option value="oranges">Oranges</option>
        <option value="pears">Pears</option>
        <option value="tomatos" disabled>Tomatos</option>
      </BpkSelect>,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly with "className" attribute', () => {
    const tree = renderer.create(
      <BpkSelect
        id="fruits"
        name="fruits"
        value="oranges"
        onChange={() => null}
        className="test"
      >
        <option value="apples">Apples</option>
        <option value="oranges">Oranges</option>
        <option value="pears">Pears</option>
        <option value="tomatos" disabled>Tomatos</option>
      </BpkSelect>,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly with a "valid" attribute equal to false', () => {
    const tree = renderer.create(
      <BpkSelect
        id="fruits"
        name="fruits"
        value="oranges"
        onChange={() => null}
        valid={false}
      >
        <option value="apples">Apples</option>
        <option value="oranges">Oranges</option>
        <option value="pears">Pears</option>
        <option value="tomatos" disabled>Tomatos</option>
      </BpkSelect>,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly with "large" attribute', () => {
    const tree = renderer.create(
      <BpkSelect
        id="fruits"
        name="fruits"
        value=""
        onChange={() => null}
        large
      >
        <option value="apples">Apples</option>
        <option value="oranges">Oranges</option>
        <option value="pears">Pears</option>
        <option value="tomatos" disabled>Tomatos</option>
      </BpkSelect>,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly with "docked" attribute', () => {
    const tree = renderer.create(
      <BpkSelect
        id="fruits"
        name="fruits"
        value=""
        onChange={() => null}
        docked
      >
        <option value="apples">Apples</option>
        <option value="oranges">Oranges</option>
        <option value="pears">Pears</option>
        <option value="tomatos" disabled>Tomatos</option>
      </BpkSelect>,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly with "dockedFirst" attribute', () => {
    const tree = renderer.create(
      <BpkSelect
        id="fruits"
        name="fruits"
        value=""
        onChange={() => null}
        dockedFirst
      >
        <option value="apples">Apples</option>
        <option value="oranges">Oranges</option>
        <option value="pears">Pears</option>
        <option value="tomatos" disabled>Tomatos</option>
      </BpkSelect>,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly with "dockedMiddle" attribute', () => {
    const tree = renderer.create(
      <BpkSelect
        id="fruits"
        name="fruits"
        value=""
        onChange={() => null}
        dockedMiddle
      >
        <option value="apples">Apples</option>
        <option value="oranges">Oranges</option>
        <option value="pears">Pears</option>
        <option value="tomatos" disabled>Tomatos</option>
      </BpkSelect>,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly with "dockedLast" attribute', () => {
    const tree = renderer.create(
      <BpkSelect
        id="fruits"
        name="fruits"
        value=""
        onChange={() => null}
        dockedLast
      >
        <option value="apples">Apples</option>
        <option value="oranges">Oranges</option>
        <option value="pears">Pears</option>
        <option value="tomatos" disabled>Tomatos</option>
      </BpkSelect>,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
