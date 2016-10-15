import React from 'react';
import renderer from 'react/lib/ReactTestRenderer';
import BpkContentContainer from './BpkContentContainer';

describe('BpkContentContainer', () => {
  it('should render correctly', () => {
    const tree = renderer.create(
      <BpkContentContainer>
        <h1>Heading</h1>
        <p>My paragraph.</p>
        <ul>
          <li>Item 1</li>
          <li>Item 2</li>
          <li>Item 3
          </li>
        </ul>
      </BpkContentContainer>,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly with a "bareHtml" attribute ', () => {
    const tree = renderer.create(
      <BpkContentContainer bareHtml>
        <h1>Heading</h1>
        <p>My paragraph.</p>
        <ul>
          <li>Item 1</li>
          <li>Item 2</li>
          <li>Item 3
          </li>
        </ul>
      </BpkContentContainer>,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
